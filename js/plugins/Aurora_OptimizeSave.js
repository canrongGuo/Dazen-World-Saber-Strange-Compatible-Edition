/*:
 * @plugindesc v1.0.0 存档优化插件
 * @author Aurora
 *
 * @help
 * 调用优化通过事件->脚本
 * Aurora.optimizeSave();// 默认模式
 * Aurora.optimizeSave(true);// 严格模式
 * 返回值:true 优化完成, false 优化失败
 */
var Aurora = Aurora || {};
Aurora.optimizeSave = function (strict) {
  "use strict";
  try {
    var beforeSaveSize = null;
    var afterSaveSize = null;
    try {
      beforeSaveSize = JsonEx.stringify(DataManager.makeSaveContents()).length;
    } catch (error) {
      beforeSaveSize = "无法统计";
    }
    $gameActors._data = $gameActors._data.map(function (actor) {
      if (!actor) {
        return null;
      }
      var conditionA = !actor._name && !actor._nickname && !actor._profile;
      var conditionB =
        !actor._faceIndex && !actor._faceName && !actor._battlerName;
      var conditionC = !actor._characterName && !actor._characterIndex;
      var conditionD = !actor._skills.length && !actor._states.length;
      if (conditionA && conditionB && conditionC && conditionD) {
        return null;
      }
      return actor;
    });
    fixSkills();
    fixStates();
    fixItems();
    fixWeapons();
    fixArmors();
    fixBaseItemWeapons(strict);
    fixBaseItemArmors(strict);
    try {
      afterSaveSize = JsonEx.stringify(DataManager.makeSaveContents()).length;
    } catch (error) {
      afterSaveSize = "无法统计";
    }
    beforeSaveSize && console.info("优化前存档大小" + beforeSaveSize);
    afterSaveSize && console.info("优化后存档大小" + afterSaveSize);
    $gameMessage.add('清理完成');
    return true;
  } catch (err) {
   $gameMessage.add('清理失败');
    return false;
  }

  function fixSkills() {
    $gameParty &&
      $gameParty.members().forEach(function (actor) {
        actor._skills = actor._skills.filter(function (id) {
          return (
            $dataSkills[id] &&
            ($dataSkills[id].name || $dataSkills[id].iconIndex)
          );
        });
      });
  }

  function fixStates() {
    $gameParty &&
      $gameParty.members().forEach(function (actor) {
        actor._states = actor._states.filter(function (id) {
          return (
            $dataStates[id] &&
            ($dataStates[id].name || $dataStates[id].iconIndex)
          );
        });
      });
  }

  function fixItems() {
    var _items = Object.keys($gameParty._items);
    var invalidItems = _items.filter(function (id) {
      return (
        !$dataItems[id] || (!$dataItems[id].name && !$dataItems[id].iconIndex)
      );
    });
    for (var id of invalidItems) {
      delete $gameParty._items[id];
    }
  }

  function fixWeapons(strict, startingId) {
    var _weapons = Object.keys($gameParty._weapons);
    var invalidWeapons = _weapons.filter(function (id) {
      return (
        !$dataWeapons[id] ||
        (!$dataWeapons[id].name && !$dataWeapons[id].iconIndex)
      );
    });
    for (var id of invalidWeapons) {
      delete $gameParty._weapons[id];
    }
  }

  function fixArmors(strict, startingId) {
    var _armors = Object.keys($gameParty._armors);
    var invalidArmors = _armors.filter(function (id) {
      return (
        !$dataArmors[id] ||
        (!$dataArmors[id].name && !$dataArmors[id].iconIndex)
      );
    });
    for (var id of invalidArmors) {
      delete $gameParty._armors[id];
    }
  }

  function fixBaseItemWeapons(strict) {
    if (!DataManager._independentWeapons || !Yanfly.Param.ItemStartingId) {
      return;
    }
    var unrealWeapons = DataManager._independentWeapons.filter(function (
      weapon
    ) {
      return !!weapon;
    });
    var WeaponsID = unrealWeapons.map(function (weapon) {
      return weapon.id;
    });
    var equipWeapons = [];
    $gameParty.members().map(function (actor) {
      var weapons = actor.equips().filter(function (item) {
        return DataManager.isWeapon(item) && WeaponsID.contains(item.id);
      });
      equipWeapons = equipWeapons.concat(weapons);
    });
    var allWeapons = equipWeapons.concat(
      $gameParty.weapons().filter(function (item) {
        return item && WeaponsID.contains(item.id);
      })
    );
    var independentWeapons = allWeapons.map(function (weapon) {
      var baseWeapon = $dataWeapons[weapon.baseItemId];
      if (!baseWeapon || (baseWeapon && !baseWeapon.baseItemId)) {
        return weapon;
      }
      var baseItemId = baseWeapon.baseItemId;
      var realBaseItemId = baseItemId;
      while (baseItemId) {
        baseItemId = $dataWeapons[baseItemId].baseItemId;
        realBaseItemId = baseItemId || realBaseItemId;
      }
      weapon.baseItemId = realBaseItemId;
      return weapon;
    });
    DataManager._independentWeapons = $dataWeapons
      .slice(Yanfly.Param.ItemStartingId + 1, $dataWeapons.length)
      .map(function (weapon) {
        if (!weapon || !independentWeapons.contains(weapon)) {
          return null;
        }
        return weapon;
      });
    $dataWeapons = $dataWeapons
      .slice(0, Yanfly.Param.ItemStartingId + 1)
      .concat(DataManager._independentWeapons);
    fixWeapons(strict, Yanfly.Param.ItemStartingId);
  }

  function fixBaseItemArmors(strict) {
    if (!DataManager._independentArmors) {
      return;
    }
    var unrealArmors = DataManager._independentArmors.filter(function (armor) {
      return !!armor;
    });
    var ArmorsID = unrealArmors.map(function (armors) {
      return armors.id;
    });
    var equipArmors = [];
    $gameParty.members().map(function (actor) {
      var armors = actor.equips().filter(function (item) {
        return DataManager.isArmor(item) && ArmorsID.contains(item.id);
      });
      equipArmors = equipArmors.concat(armors);
    });
    var allArmors = equipArmors.concat(
      $gameParty.armors().filter(function (item) {
        return item && ArmorsID.contains(item.id);
      })
    );
    var independentArmors = allArmors.map(function (armor) {
      var baseWeapon = $dataArmors[armor.baseItemId];
      if (!baseWeapon || (baseWeapon && !baseWeapon.baseItemId)) {
        return armor;
      }
      var baseItemId = baseWeapon.baseItemId;
      var realBaseItemId = baseItemId;
      while (baseItemId) {
        baseItemId = $dataArmors[baseItemId].baseItemId;
        realBaseItemId = baseItemId || realBaseItemId;
      }
      armor.baseItemId = realBaseItemId;
      return armor;
    });
    DataManager._independentArmors = $dataArmors
      .slice(Yanfly.Param.ItemStartingId + 1, $dataArmors.length)
      .map(function (armor) {
        if (!armor || !independentArmors.contains(armor)) {
          return null;
        }
        return armor;
      });
    $dataArmors = $dataArmors
      .slice(0, Yanfly.Param.ItemStartingId + 1)
      .concat(DataManager._independentArmors);
    fixArmors(strict, Yanfly.Param.ItemStartingId);
  }
};
