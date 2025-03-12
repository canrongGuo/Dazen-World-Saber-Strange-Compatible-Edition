//=============================================================================
// GT50 Plugins - RandomItemAffix
// GT_X_RandomItemAffix.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_RandomItemAffix = true;

var GT = GT || {};
GT.RIA = GT.RIA || {};
GT.RIA.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        物品 - 随机物品系统 - 随机前后缀扩展
 * @author ganfly
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 * 本插件为随机物品系统的随机前后缀扩展，可以给物品添加随机前后缀。
 * 必须安装GT_RandomItemSystem才能运行。
 * 请将本插件置于GT_RandomItemSystem下方。
 *
 * 随机前后缀，允许将一个基础独立物品同一些前后缀物品组合在一起
 * 形成一个新的独立物品，这个新的独立物品的大部分参数将会是基础
 * 物品和前后缀物品的‘加和’或者‘乘积’，并根据备注决定用某些前后
 * 缀物品的参数替代基础物品参数，随机前后缀将根据基础物品的备注
 * 去随机选择前后缀物品，允许为一个基础物品添加多个前后缀。
 *
 * 例如前缀物品‘无敌的’(攻击+10)与基础物品‘大剑’(攻击+20)组合后
 * 得到新物品‘无敌的大剑’(攻击+30)
 * 
 * ============================================================================
 *  备注
 * ============================================================================
 * 
 * 以下备注请置于基础物品的备注栏中
 *
 * ----武器/防具备注
 *
 *     <Prefixes>
 *     affix item list
 *     affix item list
 *     </Prefixes>
 *
 *     <Suffixes>
 *     affix item list
 *     affix item list
 *     </Suffixes>
 * 
 *     这将会设置该物品绑定的前缀物品或后缀物品，
 *      <Prefixes>为前缀，<Suffixes>为后缀
 *     每行代表一个新的前后缀物品或者是物品设置
 *     affix item list替换为以下语句：
 *
 * ----affix item list------
 *
 *     x x y% x x y%
 *     
 *     这将会给该物品添加一个新的前后缀物品，
 *     x替换为武器/防具id或id范围，其中范围用a-b表示，
 *     如果基础物品是武器，则x为武器id，否则为防具id
 *     每一组x后的y%代表这一组id的概率占比，
 *     如果这一行的概率之和小于100%，则剩余的概率代表不添加
 *     最终的前后缀物品id将会从这一行中
 *     所有的id组中按y%概率随机选择一个，
 *     然后从这个id组中随机选择一个id
 *
 *     例如 2-5 8 50% 9-13 30%
 *     意思是有50%概率从2,3,4,5,8中选择一个，
 *     有30%概率从9,10,11,12,13中选择一个，
 *     还有20%概率不选择。
 * ----
 *
 *     Use Weapon Affix
 *     Use Armor Affix
 *     这将会设置该基础物品会从武器或防具中选择前后缀物品
 *     默认情况下，基础物品是武器的话，
 *     前后缀物品会从武器中选择，防具同理
 *     而加上这条备注后，将会强制从设定的武器/防具中选择
 * 
 * ----------------------------------------------------------------------------
 *
 * 以下备注请置于前后缀物品的备注栏中
 * 
 * ----武器/防具备注
 *
 *     <Affix Item Set>
 *      set list
 *      set list
 *     </Affix Item Set>
 *
 *     这可以设置一些前后缀物品的特性，
 *     每一行代表一种特性，set list替换为以下语句：
 *
 * ----set list----
 *
 *     Add Name: true
 *     Add Name: false
 *
 *     - 这使得该物品被选择为前后缀物品时强制/禁止将物品名
 *     作为前后缀加到基础物品的物品名上面。
 *     这个设置会覆盖插件参数中的是否加入前后缀名称
 * ----
 *
 *     Affix Name: x
 *     
 *     - 默认情况下，前后缀物品将会把物品名称加入到
 *     基础物品名前后缀中。
 *     这条备注将会设置加入到基础物品名前后缀中的文字
 *     x替换为要设置的文字
 * ----
 *
 *     Replace Animation
 *
 *     - 这将会用该前后缀物品的动画来替代基础物品的动画
 * ----
 *
 *     Replace Type
 *
 *     - 这将会用该前后缀物品的武器/防具类型来替代
 *     基础物品的武器/防具类型
 * ----
 *
 *     Replace Icon
 *     Overlay Icon
 *     
 *     - 这将会设置是用前后缀物品的图标替代基础物品的图标
 *     还是覆盖基础物品的图标，如果有多个前后缀物品图标
 *     覆盖到基础物品上，则会按照备注中的前后缀物品顺序
 *     依次覆盖。
 * ----
 *
 *     Replace Color
 *     
 *     - 这将会用前后缀物品的颜色代替基础物品的颜色
 *     目前只支持YEP_ItemCore的颜色
 * ----
 *
 *     Affix Type: prefix
 *     Affix Type: suffix
 *
 *     - 这将会强制指定该前后缀物品是前缀还是后缀
 *     无视基础物品的设定
 * ----
 *
 *     Linked Equip Suit: x
 *
 *     - 这条备注需要GT_EquipSuitCore的支持
 *     这将会设定该前后缀物品关联的套装
 *     其中x替换为套装id
 *     注意：每个套装最多关联一个前后缀物品
 *     被关联的套装将会变成前后缀随机型套装
 *     具体内容请参阅GT_EquipSuitCore的帮助
 *     的随机前后缀套装部分。
 *
 * ---------------------------
 *
 *     <Custom Affix Requirement>
 *      enable = true;
 *     </Custom Affix Requirement>
 *
 *     这可以设置该物品被选择为前后缀物品需要满足的条件
 *     中间填js代码，enable的值代表是否满足条件
 *
 * ---------------------------
 *
 *     <Custom Affix Effect>
 *      var atkBonus = Math.floor((Math.random() * 100) + 50);
 *      newItem.params[2] += atkBonus;
 *      newItem.name += " +" + atkBonus;
 *      newItem.price += atkBonus;
 *     </Custom Affix Effect>
 *
 *     这可以设置该物品作为前后缀物品被加到基础物品上时
 *     提供的额外效果，中间填js代码。
 *     其中affixItem 代表前后缀物品，
 *     baseItem 代表基础物品
 *     newItem 代表最终生成的新物品
 *     
 *
 * ---------------------------
 * -----老notetags兼容
 *
 * 以下是DreamX_RandomPrefixesSuffixes插件中的一些备注，已经被替代,
 * 仍然可以使用但不建议使用，建议使用上面的标准备注
 *
 *     <prefixSuffixParameters: param min|max param min|max>
 *
 *     这可以设置前后缀物品被加到基础物品上时附加的随机属性，
 *     每行填一种随机属性。
 *     param 替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     min和max 替换为数值，表示随机的范围，必须满足min <= max
 *     例如 <prefixSuffixParameters: ATK 5|10 DEF -10|20>
 *
 * ============================================================================
 *  插件指令
 * ============================================================================
 *
 *    ForceItemPrefix x x y% x x y%
 *    ForceItemSuffix x x y% x x y%
 *
 *    这将会强制指定带有前后缀的基础物品的前缀或后缀
 *    其中x x y% x x y%按照备注中的写法设置
 *    如果要设置多个前后缀，只需要多次使用指令
 *    
 *    注意：这将会影响接下来获得的所有带有前后缀的物品，
 *          如果要消除影响，使用下面的指令
 * ----
 * 
 *    ResetItemAffix
 *    
 *    这将会清空强制指定的前后缀，物品将会按照默认备注变化
 *
 * ============================================================================
 *  脚本
 * ============================================================================
 * 
 * $gameSystem.averagePartyLevel()
 *     返回队伍中所有成员的平均等级
 * 
 * $gameSystem.averageBattleLevel()
 *     返回队伍中所有参战成员的平均等级
 *
 * $gameSystem.combineAffixWithBaseItem(affixItem, newItem, affixType)
 *     将一个武器/防具作为前后缀加到另一个武器/防具上
 *     其中affixItem为前后缀物品，newItem为目标物品
 *     affixType为前后缀类型，填'prefix'或者'suffix'，
 *     不填的话默认为'prefix'
 *
 * ============================================================================
 *  兼容性
 * ============================================================================ 
 * 
 * 目前已经兼容绝大多数YEP插件
 * 请将本插件置于以下所有插件下方。
 *
 *     YEP_VictoryAftermath
 *     Olivia_VictorySequenceUI
 *         
 * ============================================================================
 *  用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 *  更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 *
 * ============================================================================
 *  帮助结束
 * ============================================================================
 *
 *
 * @param AddAffixName
 * @text 加入前后缀名称?
 * @type boolean
 * @on 加入
 * @off 不加入
 * @desc 是否将前后缀名称加入物品前后缀中？
 * @default true
 *
 */

//=============================================================================

if (Imported.YEP_ItemCore && Imported.GT_RandomItemSystem) {
	
//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_X_RandomItemAffix');
GT.Param = GT.Param || {};

GT.Param.RIAAddAffixName = eval(GT.Parameters['AddAffixName']);

//=============================================================================
// DataManager
//=============================================================================

GT.RIA.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
	if (!GT.RIA.DataManager_isDatabaseLoaded.call(this))
		return false;
	if (!GT._loaded_GT_RIA) {
		this.processRIAffixNotetags($dataWeapons);
		this.processRIAffixNotetags($dataArmors);
		GT._loaded_GT_RIA = true;
	}
	return true;
};

DataManager.processRIAffixNotetags = function (group) {
	for (var i = 1; i < group.length; i++) {
		var obj = group[i];
		this.setupRIAffixNotetags(obj);
	}
};

DataManager.setupRIAffixNotetags = function (obj) {
	var note1 = /<(?:CUSTOM AFFIX REQUIREMENT)>/i;
	var note2 = /<\/(?:CUSTOM AFFIX REQUIREMENT)>/i;
	var note3 = /<(?:CUSTOM AFFIX EFFECT)>/i;
	var note4 = /<\/(?:CUSTOM AFFIX EFFECT)>/i;
	var note5 = /<(?:SUFFIXES)>/i;
	var note6 = /<\/(?:SUFFIXES)>/i;
	var note7 = /<(?:PREFIXES)>/i;
	var note8 = /<\/(?:PREFIXES)>/i;
	var note9 = /<(?:AFFIX ITEM SET)>/i;
	var note10 = /<\/(?:AFFIX ITEM SET)>/i;
	
	var notedata = obj.note.split(/[\r\n]+/);
	obj.affixItemRequire = true;
	obj.customAffixEffect = '';
	obj.combineItemList = [];
	obj.affixItemSet = {};
	obj.affixItemSet.addName = GT.Param.RIAAddAffixName;
	var evalMode = 'none';

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			evalMode = 'custom requirement';
			obj.affixItemRequire = '';
		} 
		else if (line.match(note2)) {
			evalMode = 'none';
		} 
		else if (line.match(note3)) {
			evalMode = 'custom effect';
		} 
		else if (line.match(note4)) {
			evalMode = 'none';
		}
		else if (line.match(note5)) {
			evalMode = 'suffix';
		} 
		else if (line.match(note6)) {
			evalMode = 'none';
		} 
		else if (line.match(note7)) {
			evalMode = 'prefix';
		} 
		else if (line.match(note8)) {
			evalMode = 'none';
		}
		else if (line.match(note9)) {
			evalMode = 'affix item set';
		} 
		else if (line.match(note10)) {
			evalMode = 'none';
		}
		else if (evalMode === 'custom requirement') {
			obj.affixItemRequire = obj.affixItemRequire + line + '\n';
		}
		else if (evalMode === 'custom effect') {
			obj.customAffixEffect = obj.customAffixEffect + line + '\n';
		}
		else if (evalMode === 'suffix' || evalMode === 'prefix') {
			if (line.contains("%")) 
				obj.combineItemList.push(this.processCombineItem(line, evalMode));
			else
				this.processBaseItemAffix(obj, line);
		}
		else if (evalMode === 'affix item set') {
			this.processAffixItemSet(obj, line);
		}
	}
};

DataManager.processAffixItemSet = function (obj, line) {
	var set = obj.affixItemSet;
	if (line.match(/ADD NAME:[ ](.*)/i)) {
		set.addName = eval(RegExp.$1);
	}
	else if (line.match(/AFFIX NAME:[ ](.*)/i)) {
		set.affixName = String(RegExp.$1);
	}
	else if (line.match(/REPLACE ANIMATION/i)) {
		set.replaceAnimation = true;
	}
	else if (line.match(/REPLACE TYPE/i)) {
		set.replaceType = true;
	}
	else if (line.match(/REPLACE ICON/i)) {
		set.replaceIcon = true;
	}
	else if (line.match(/OVERLAY ICON/i)) {
		set.overlayIcon = true;
	}
	else if (line.match(/REPLACE COLOR/i)) {
		set.replaceColor = true;
	}
	else if (line.match(/AFFIX TYPE:[ ](.*)/i)) {
		var type = String(RegExp.$1);
		if (type === 'prefix' || type === 'suffix')
			set.affixType = type;
	}
	else if (line.match(/LINKED EQUIP SUIT:[ ](\d+)/i)) {
		set.linkedESuit = parseInt(RegExp.$1);
	}
};

DataManager.processBaseItemAffix = function (obj, line) {
	if (line.match(/USE WEAPON AFFIX/i) && this.isArmor(obj))
		obj.useWeaponAffix = true;
	if (line.match(/USE ARMOR AFFIX/i) && this.isWeapon(obj))
		obj.useArmorAffix = true;
};

DataManager.processCombineItem = function (line, affixType) {
	var lineSplit = line.trim().split(/\s+/i);
	var numberLine = "";
	var lineChoices = [];
	for (var j = 0; j < lineSplit.length; j++) {
		var split = lineSplit[j];
		if (split.contains("%")) {
			var chance = parseInt(split.replace('%', ''));
			lineChoices.push({chance: chance, line: numberLine.trim()});
			numberLine = '';
		} 
		else {
			numberLine += split + ' ';
		}
	}
	return {lineChoices: lineChoices, affixType: affixType};
};

GT.RIA.DataManager_addNewIndependentItem = DataManager.addNewIndependentItem;
DataManager.addNewIndependentItem = function (baseItem, newItem) {
	GT.RIA.DataManager_addNewIndependentItem.call(this, baseItem, newItem);
	if (!newItem.combineItemList || !newItem.combineItemList.length) return;
	$gameTemp.lastCreatedAffixItem = newItem;
};

DataManager.isNewAffixItem = function (item) {
	if (!item) return false;
	if (item.baseItemId) return false;
	if (!item.combineItemList || !item.combineItemList.length) return false;
	if (item.wtypeId) 
		return Yanfly.Param.ItemMaxWeapons > 0;
	else if (item.atypeId) 
		return Yanfly.Param.ItemMaxArmors > 0;
	else 
		return Yanfly.Param.ItemMaxItems > 0;
};

//=============================================================================
// ItemManager
//=============================================================================

GT.RIA.ItemManager_processRandomItemParamList = ItemManager.processRandomItemParamList;
ItemManager.processRandomItemParamList = function(baseItem, newItem) {
	this.applyItemCombineEffect(baseItem, newItem);
    GT.RIA.ItemManager_processRandomItemParamList.call(this, baseItem, newItem);
};

ItemManager.applyItemCombineEffect = function (baseItem, newItem) {
	if (!newItem.combineItemList || !newItem.combineItemList.length) return;
	if ($gameTemp.varianceStock()) return;
	var dataType = this.getRIAItemDataType(newItem);
	var forceItemAffix = $gameSystem.forceItemAffix();
	if (forceItemAffix && forceItemAffix.length) {
		for (var i = 0; i < forceItemAffix.length; i++) {
			var line = forceItemAffix[i];
			var affixType = line.affixType;
			var id = this.getRandomObj(line, dataType);
			if (!id) continue;
			var affixItem = dataType[id];
			this.combineWithBaseItem(affixItem, baseItem, newItem, affixType);
		}
		return;
	}
	for (var i = 0; i < newItem.combineItemList.length; i++) {
		var line = newItem.combineItemList[i];
		var affixType = line.affixType;
		var id = this.getRandomObj(line, dataType);
		if (!id) continue;
		var affixItem = dataType[id];
		this.combineWithBaseItem(affixItem, baseItem, newItem, affixType);
	}
};

ItemManager.combineWithBaseItem = function (affixItem, baseItem, newItem, affixType) {
	this.combineSettedParam(affixItem, newItem, affixType);
	this.combineNormalParam(affixItem, newItem);
	this.combinePluginParam(affixItem, newItem);
	this.combineCustomEffect(affixItem, baseItem, newItem);
};

ItemManager.combineCustomEffect = function (affixItem, baseItem, newItem) {
	if (affixItem.customAffixEffect === '') return;
	eval(affixItem.customAffixEffect);
};

ItemManager.combineSettedParam = function (affixItem, newItem, affixType) {
	var set = affixItem.affixItemSet;
	if (set.affixType) 
		affixType = set.affixType;
	if (set.addName) {
		var affixName = set.affixName ? set.affixName : affixItem.name;
		if (affixType === "prefix") {
			this.setNamePrefix(newItem, affixName + newItem.namePrefix.trim());
		} 
		else if (affixType === "suffix") {
			this.setNameSuffix(newItem, newItem.nameSuffix.trim() + affixName);
		}
		this.updateItemName(newItem);
	}
	if (set.replaceAnimation) {
		newItem.animationId = affixItem.animationId;
	}
	if (set.replaceIcon) {
		newItem.iconIndex = affixItem.iconIndex;
	}
	else if (set.overlayIcon) {
		newItem.overlayIcons = newItem.overlayIcons || [];
		newItem.overlayIcons.push(affixItem.iconIndex);
	}
	if (set.replaceType) {
		if (newItem.wtypeId && affixItem.wtypeId) 
			newItem.wtypeId = affixItem.wtypeId;
		if (newItem.atypeId && affixItem.atypeId) 
			newItem.atypeId = affixItem.atypeId;
	}
};

ItemManager.combineNormalParam = function (affixItem, newItem) {
	newItem.randomParamList = newItem.randomParamList.concat(affixItem.randomParamList);
	newItem.price += affixItem.price;
	newItem.description += affixItem.description;
	newItem.traits = newItem.traits.concat(affixItem.traits);
	for (var i = 0; i < affixItem.params.length; i++) {
		newItem.params[i] += affixItem.params[i];
	}
	if (affixItem.meta.prefixSuffixParameters) {
		this.randomizeBonusParams(affixItem.meta.prefixSuffixParameters, newItem);
	}
};

ItemManager.randomizeBonusParams = function (notetag, newItem) {
	var parameterSplit = notetag.trim().split(/\s+/i);
	var i = 0;
	var boostCount = 0;
	while (i < parameterSplit.length) {
		var paramId = this.interpretParamNote(parameterSplit[i])[0];
		i++;
		var min = parseInt(parameterSplit[i].split("|")[0]) || 0;
		var max = parseInt(parameterSplit[i].split("|")[1]) || 0;
		if (paramId !== null) {
			var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);
			newItem.params[paramId] += randomValue;
			newItem.price += randomValue * GT.Param.RISParamPriceAdd;
			newItem.boostCount += GT.Param.RISBoostPointAdd * (randomValue > 0 ? 1 : -1);
		}
		i++;
	}
};

ItemManager.getRIAItemDataType = function (newItem) {
	var dataType;
	if (newItem.wtypeId) 
		dataType = $dataWeapons;
	else if (newItem.atypeId) 
		dataType = $dataArmors;
	if (newItem.useArmorAffix) 
		dataType = $dataArmors;
	else if (newItem.useWeaponAffix) 
		dataType = $dataWeapons;
	return dataType;
};

ItemManager.isCombinedItem = function (item) {
	if (!item) return false;
	var enable = true;
	eval(item.affixItemRequire);
	return enable;
};

ItemManager.getRandomObj = function (choiceObj, dataType) {
	var diceRoll = Math.floor(Math.random() * 100) + 1;
	var lineChoices = choiceObj.lineChoices;
	var validChoices = [];
	for (var i = 0; i < lineChoices.length; i++) {
		var lineChoice = lineChoices[i];
		var itemIdList = this.getNumberList(lineChoice.line).filter(function (id) {
			return this.isCombinedItem(dataType[id]);
		}, this);
		if (itemIdList.length <= 0) continue;
		validChoices.push({chance: lineChoice.chance, itemIdList: itemIdList});
	}
	validChoices.sort(function (a, b) {
		if (a.chance === b.chance) {
			return Math.randomInt(2) === 0;
		}
		else {
			return a.chance - b.chance;
		}
	});
	for (var i = 0; i < validChoices.length; i++) {
		var chance = validChoices[i].chance;
		var itemIdList = validChoices[i].itemIdList;
		if (diceRoll <= chance) {
			return this.getRandomIdInList(itemIdList);
		} 
		else {
			diceRoll -= chance;
		}
	}
};

ItemManager.combinePluginParam = function (affixItem, newItem) {
	var set = affixItem.affixItemSet;
	newItem.randomVariance += affixItem.randomVariance;
	if (set.replaceColor) {
		newItem.textColor = affixItem.textColor;
	}
    //newItem.setPriorityName = affixItem.setPriorityName;
    newItem.infoEval += affixItem.infoEval;
    newItem.infoTextTop += affixItem.infoTextTop;
    newItem.infoTextBottom += affixItem.infoTextBottom;
    newItem.onCreationEval += affixItem.onCreationEval;
	
	if (Imported.GT_EquipSuitCore) {
		if (set.linkedESuit) {
			var id = set.linkedESuit;
			if (newItem.equipSuit && newItem.equipSuit.contains(id)) {
				newItem.equipSuit = [id];
			}
		}
	}
	if (Imported.GT_ObjectInfoWindow) {
		newItem.preInfos = newItem.preInfos.concat(affixItem.preInfos);
		newItem.afterInfos = newItem.afterInfos.concat(affixItem.afterInfos);
		newItem.topInfoText = newItem.topInfoText.concat(affixItem.topInfoText);
		newItem.bottomInfoText = newItem.bottomInfoText.concat(affixItem.bottomInfoText);
	}
	
	if (Imported.YEP_AbsorptionBarrier) {
		newItem.barrierPenetrationRate += affixItem.barrierPenetrationRate;
		newItem.barrierPenetrationFlat += affixItem.barrierPenetrationFlat;
		//newItem.battleStartBarrierPoints = affixItem.battleStartBarrierPoints;
		//newItem.barrierRegen = affixItem.barrierRegen;
		newItem.barrierPenetrationRateEval += affixItem.barrierPenetrationRateEval;
		newItem.barrierPenetrationFlatEval += affixItem.barrierPenetrationFlatEval;
		//newItem.battleStartBarrierPointsEval = affixItem.battleStartBarrierPointsEval;
		//newItem.barrierRegenEval = affixItem.barrierRegenEval;
	}
	if (Imported.YEP_AutoPassiveStates) {
		newItem.passiveStates = newItem.passiveStates.concat(affixItem.passiveStates);
	}
	if (Imported.YEP_BaseParamControl) {
		for (var i = 0; i < 8; i++) {
			newItem.plusParams[i] += affixItem.plusParams[i];
			newItem.rateParams[i] *= affixItem.rateParams[i];
			newItem.flatParams[i] += affixItem.flatParams[i];
			//if (!!affixItem.maxParams[i])
			//	newItem.maxParams[i] = affixItem.maxParams[i];
			//if (!!affixItem.minParams[i])
			//	newItem.minParams[i] = affixItem.minParams[i];
		}
	}
	if (Imported.YEP_BattleEngineCore) {
		//newItem.reflectAnimationId = affixItem.reflectAnimationId;
		//newItem.spriteCannotMove = affixItem.spriteCannotMove;
		//newItem.anchorX = affixItem.anchorX;
		//newItem.anchorY = affixItem.anchorY;
	}
	if (Imported.YEP_BuffsStatesCore) {
		for (var i = 0; i < 8; i++) {
			newItem.maxBuff[i] += affixItem.maxBuff[i];
			newItem.maxDebuff[i] += affixItem.maxDebuff[i];
			
		}
	}
	if (Imported.YEP_DamageCore) {
		//newItem.breakDamageCap = affixItem.breakDamageCap;
		if (!!affixItem.damageCap) {
			if (!!newItem.damageCap)
				newItem.damageCap += affixItem.damageCap;
			else
				newItem.damageCap = affixItem.damageCap;
		}
		if (!!affixItem.healCap) {
			if (!!newItem.healCap)
				newItem.healCap += affixItem.healCap;
			else
				newItem.healCap = affixItem.healCap;
		}
	}
	if (Imported.YEP_DashToggle) {
		//newItem.disableDashing = affixItem.disableDashing;
	}
	if (Imported.YEP_ElementCore) {
		newItem.elementAbsorb = newItem.elementAbsorb.concat(affixItem.elementAbsorb);
		//newItem.elementReflect = affixItem.elementReflect;
		//newItem.elementAmplify = affixItem.elementAmplify;
		//newItem.elementMagnify = affixItem.elementMagnify;
		//newItem.elementNull = affixItem.elementNull;
		//newItem.elementForcedRate = affixItem.elementForcedRate;
	}
	if (Imported.YEP_EquipBattleSkills) {
		newItem.equipSkillSlots += affixItem.equipSkillSlots;
	}
	if (Imported.YEP_EquipCore) {
		newItem.parameterEval += affixItem.parameterEval;
	}
	if (Imported.YEP_ExtraParamFormula) {
		for (var i = 0; i < 10; i++) {
			newItem.plusXParams[i] += affixItem.plusXParams[i];
			newItem.rateXParams[i] *= affixItem.rateXParams[i];
			newItem.flatXParams[i] += affixItem.flatXParams[i];
		}
	}
	if (Imported.YEP_InstantCast) {
		newItem.instantSkill = newItem.instantSkill.concat(affixItem.instantSkill);
		newItem.instantItem = newItem.instantItem.concat(affixItem.instantItem);
		newItem.cancelInstantSkill = newItem.cancelInstantSkill.concat(affixItem.cancelInstantSkill);
		newItem.cancelInstantItem = newItem.cancelInstantItem.concat(affixItem.cancelInstantItem);
	}
	if (Imported.YEP_JobPoints) {
		newItem.jpRate *= affixItem.jpRate;
	}
	if (Imported.YEP_LifeSteal) {
		newItem.lifeSteal.hpPhysicalRate *= affixItem.lifeSteal.hpPhysicalRate;
		newItem.lifeSteal.hpMagicalRate *= affixItem.lifeSteal.hpMagicalRate;
		newItem.lifeSteal.hpCertainRate *= affixItem.lifeSteal.hpCertainRate;
		newItem.lifeSteal.hpPhysicalFlat += affixItem.lifeSteal.hpPhysicalFlat;
		newItem.lifeSteal.hpMagicalFlat += affixItem.lifeSteal.hpMagicalFlat;
		newItem.lifeSteal.hpCertainFlat += affixItem.lifeSteal.hpCertainFlat;
		newItem.lifeSteal.mpPhysicalRate *= affixItem.lifeSteal.mpPhysicalRate;
		newItem.lifeSteal.mpMagicalRate *= affixItem.lifeSteal.mpMagicalRate;
		newItem.lifeSteal.mpCertainRate *= affixItem.lifeSteal.mpCertainRate;
		newItem.lifeSteal.mpPhysicalFlat += affixItem.lifeSteal.mpPhysicalFlat;
		newItem.lifeSteal.mpMagicalFlat += affixItem.lifeSteal.mpMagicalFlat;
		newItem.lifeSteal.mpCertainFlat += affixItem.lifeSteal.mpCertainFlat;
		//newItem.lifeSteal.allGuard = affixItem.lifeSteal.allGuard;
		//newItem.lifeSteal.hpGuard = affixItem.lifeSteal.hpGuard;
		//newItem.lifeSteal.mpGuard = affixItem.lifeSteal.mpGuard;
		//newItem.lifeSteal.allNull = affixItem.lifeSteal.allNull;
		//newItem.lifeSteal.hpNull = affixItem.lifeSteal.hpNull;
		//newItem.lifeSteal.mpNull = affixItem.lifeSteal.mpNull;
	}
	if (Imported.YEP_RowFormation) {
		//newItem.rowLock = affixItem.rowLock;
	}
	if (Imported.YEP_ShopMenuCore || Imported.GT_SuperShopSystem) {
		//newItem.cannotSell = affixItem.cannotSell;
		//newItem.canSell = affixItem.canSell;
		if (!!affixItem.sellPrice) newItem.sellPrice += affixItem.sellPrice;
	}
	if (Imported.YEP_SkillCore) {
		//newItem.gauge1 = affixItem.gauge1;
		//newItem.gauge2 = affixItem.gauge2;
		//newItem.gauge3 = affixItem.gauge3;
		//newItem.gaugeIcon1 = affixItem.gaugeIcon1;
		//newItem.gaugeIcon2 = affixItem.gaugeIcon2;
		//newItem.gaugeIcon3 = affixItem.gaugeIcon3;
	}
	if (Imported.YEP_SpecialParamFormula) {
		for (var i = 0; i < 10; i++) {
			newItem.plusSParams[i] += affixItem.plusSParams[i];
			newItem.rateSParams[i] *= affixItem.rateSParams[i];
			newItem.flatSParams[i] += affixItem.flatSParams[i];
		}
	}
	if (Imported.YEP_StealSnatch) {
		//newItem.autoDebuff = affixItem.autoDebuff;
		newItem.afterStealEval += affixItem.afterStealEval;
		for (var i = 0; i < 5; i++) {
			newItem.stealRateBonus[i] += affixItem.stealRateBonus[i];
		}
	}
	if (Imported.YEP_Taunt) {
		//newItem.physTaunt = affixItem.physTaunt;
		//newItem.magicTaunt = affixItem.magicTaunt;
		//newItem.certainTaunt = affixItem.certainTaunt;
		//newItem.nullPhysTaunt = affixItem.nullPhysTaunt;
		//newItem.nullMagicTaunt = affixItem.nullMagicTaunt;
		//newItem.nullCertainTaunt = affixItem.nullCertainTaunt;
		//newItem.ignorePhysTaunt = affixItem.ignorePhysTaunt;
		//newItem.ignoreMagicTaunt = affixItem.ignoreMagicTaunt;
		//newItem.ignoreCertainTaunt = affixItem.ignoreCertainTaunt;
	}
	if (Imported.YEP_WeaponAnimation) {
		//newItem.weaponImageIndex = affixItem.weaponImageIndex;
		//newItem.weaponAttackMotion = affixItem.weaponAttackMotion;
		//newItem.weaponAnimationId = affixItem.weaponAnimationId;
		//newItem.weaponHue = affixItem.weaponHue;
	}
	if (Imported.YEP_WeaponUnleash) {
		//newItem.attackReplace = affixItem.attackReplace;
		newItem.attackReplaceEval += affixItem.attackReplaceEval;
		//newItem.guardReplace = affixItem.guardReplace;
		newItem.guardReplaceEval += affixItem.guardReplaceEval;
		newItem.weaponUnleash = newItem.weaponUnleash.concat(affixItem.weaponUnleash);
		newItem.guardUnleash = newItem.guardUnleash.concat(affixItem.guardUnleash);
		//newItem.weaponUnleashRate = affixItem.weaponUnleashRate;
		//newItem.guardUnleashRate = affixItem.guardUnleashRate;
	}
	if (Imported.YEP_X_ArmorScaling) {
		newItem.physArmorRedFlat += affixItem.physArmorRedFlat;
		newItem.physArmorRedRate += affixItem.physArmorRedRate;
		newItem.physArmorPenRate += affixItem.physArmorPenRate;
		newItem.physArmorPenFlat += affixItem.physArmorPenFlat;
		newItem.magArmorRedFlat += affixItem.magArmorRedFlat;
		newItem.magArmorRedRate += affixItem.magArmorRedRate;
		newItem.magArmorPenRate += affixItem.magArmorPenRate;
		newItem.magArmorPenFlat += affixItem.magArmorPenFlat;
		newItem.cerArmorRedFlat += affixItem.cerArmorRedFlat;
		newItem.cerArmorRedRate += affixItem.cerArmorRedRate;
		newItem.cerArmorPenRate += affixItem.cerArmorPenRate;
		newItem.cerArmorPenFlat += affixItem.cerArmorPenFlat;
	}
	if (Imported.YEP_X_AttachAugments) {
		//newItem.augmentSlots = newItem.augmentSlots.concat(affixItem.augmentSlots);
		//newItem.augmentTypes = newItem.augmentTypes.concat(affixItem.augmentTypes);
		for (var i = 0; i < affixItem.augmentTypes.length; i++) {
			var evalType = affixItem.augmentTypes[i];
			//newItem.augmentDataAttach[evalType] = affixItem.augmentDataAttach[evalType];
			//newItem.augmentDataDetach[evalType] = affixItem.augmentDataDetach[evalType];
			//newItem.augmentEvalAttach[evalType] = affixItem.augmentEvalAttach[evalType];
			//newItem.augmentEvalDetach[evalType] = affixItem.augmentEvalDetach[evalType];
		}
	}
	if (Imported.YEP_X_BattleSysATB) {
		newItem.atbStartFlat += affixItem.atbStartFlat;
		newItem.atbStartRate += affixItem.atbStartRate;
		newItem.atbTurnFlat += affixItem.atbTurnFlat;
		newItem.atbTurnRate += affixItem.atbTurnRate;
		if (!!affixItem.atbHelp) {
			newItem.atbHelp = newItem.atbHelp || '';
			newItem.atbHelp += affixItem.atbHelp;
		}
	}
	if (Imported.YEP_X_BattleSysCTB) {
		newItem.ctbStartFlat += affixItem.ctbStartFlat;
		newItem.ctbStartRate += affixItem.ctbStartRate;
		newItem.ctbTurnFlat += affixItem.ctbTurnFlat;
		newItem.ctbTurnRate += affixItem.ctbTurnRate;
		if (!!affixItem.ctbHelp) {
			newItem.ctbHelp = newItem.ctbHelp || '';
			newItem.ctbHelp += affixItem.ctbHelp;
		}
	}
	if (Imported.YEP_X_ChangeBattleEquip) {
		//newItem.changeBattleEquipCooldown = affixItem.changeBattleEquipCooldown;
		//newItem.disableChangeBattleEquip = affixItem.disableChangeBattleEquip;
	}
	if (Imported.YEP_X_CriticalControl) {
		newItem.critMultBonus += affixItem.critMultBonus;
		newItem.flatCritBonus += affixItem.flatCritBonus;
		newItem.physicalCritRateBonus += affixItem.physicalCritRateBonus;
		newItem.magicalCritRateBonus += affixItem.magicalCritRateBonus;
		newItem.certainCritRateBonus += affixItem.certainCritRateBonus;
	}
	if (Imported.YEP_X_EquipRequirements) {
		//newItem.equipRequirements.atLeast = affixItem.equipRequirements.atLeast;
		//newItem.equipRequirements.atMost = affixItem.equipRequirements.atMost;
		newItem.equipRequirements.classes = newItem.equipRequirements.classes.concat(affixItem.equipRequirements.classes);
		newItem.equipRequirements.skills = newItem.equipRequirements.skills.concat(affixItem.equipRequirements.skills);
		newItem.equipRequirements.switches = newItem.equipRequirements.switches.concat(affixItem.equipRequirements.switches);
		//newItem.equipRequirements.unique = affixItem.equipRequirements.unique;
		newItem.customEquipReqText += affixItem.customEquipReqText;
		newItem.customEquipReqCondition += affixItem.customEquipReqCondition;
	}
	if (Imported.YEP_X_EquipSkillTiers) {
		//newItem.equipTierSlot = affixItem.equipTierSlot;
	}
	if (Imported.YEP_X_ItemDurability) {
		//newItem.repairWeaponType = affixItem.repairWeaponType;
		//newItem.repairArmorType = affixItem.repairArmorType;
		//newItem.repairSound = affixItem.repairSound;
		//newItem.repairWeaponUnbreakable = affixItem.repairWeaponUnbreakable;
		//newItem.repairArmorUnbreakable = affixItem.repairArmorUnbreakable;
		newItem.repairDurabilityEval += affixItem.repairDurabilityEval;
		
		//if (newItem.durability !== -1) 
		//	newItem.durability += affixItem.durability;
		newItem.durVariance += affixItem.durVariance;
		//newItem.durMax += affixItem.durMax;
		//newItem.breakSound = affixItem.breakSound;
		newItem.breakEval += affixItem.breakEval;
	}
	if (Imported.YEP_X_ItemUpgrades) {
		//newItem.upgradeSlots += affixItem.upgradeSlots;
		//newItem.originalUpgradeSlots = newItem.upgradeSlots;
		newItem.upgradeSlotsVariance += affixItem.upgradeSlotsVariance;
		//newItem.upgradeSound = affixItem.upgradeSound;
		newItem.upgradeEffect = newItem.upgradeEffect.concat(affixItem.upgradeEffect);
		newItem.boostCountValue += affixItem.boostCountValue;
		newItem.upgradeSlotCost += affixItem.upgradeSlotCost;
		newItem.upgradeItemType = newItem.upgradeItemType.concat(affixItem.upgradeItemType);
		if (affixItem.upgradeWeaponType !== [0])
			newItem.upgradeWeaponType = newItem.upgradeWeaponType.concat(affixItem.upgradeWeaponType);
		if (affixItem.upgradeArmorType !== [0])
			newItem.upgradeArmorType = newItem.upgradeArmorType.concat(affixItem.upgradeArmorType);
	}
	if (Imported.YEP_X_LimitedSkillUses) {
		newItem.globalUseMax += affixItem.globalUseMax;
		//newItem.stypeUseMax = affixItem.stypeUseMax;
		//newItem.skillUseMax = affixItem.skillUseMax;
		newItem.globalUseMaxEval += affixItem.globalUseMaxEval;
		//newItem.stypeUseMaxEval = affixItem.stypeUseMaxEval;
		//newItem.skillUseMaxEval = affixItem.skillUseMaxEval;
	}
	if (Imported.YEP_X_PartyLimitGauge) {
		newItem.partyLimitGaugePlus += affixItem.partyLimitGaugePlus;
		newItem.partyLimitGaugeRate *= affixItem.partyLimitGaugeRate;
	}
	if (Imported.YEP_X_SelectionControl) {
		newItem.cannotSelect = newItem.cannotSelect.concat(affixItem.cannotSelect);
	}
	if (Imported.YEP_X_SkillCostItems) {
		//newItem.itemGaugeColor1 = affixItem.itemGaugeColor1;
		//newItem.itemGaugeColor2 = affixItem.itemGaugeColor2;
		//newItem.itemGaugeText = affixItem.itemGaugeText;
		//newItem.itemGaugeTextColor = affixItem.itemGaugeTextColor;
		
		/*newItem.itemGaugeColor1 = affixItem.itemGaugeColor1;
		newItem.itemGaugeColor2 = affixItem.itemGaugeColor2;
		newItem.useItemCostSet = affixItem.useItemCostSet;
		newItem.useWeaponCostSet = affixItem.useWeaponCostSet;
		newItem.useArmorCostSet = affixItem.useArmorCostSet;
		newItem.useItemCostRate = affixItem.useItemCostRate;
		newItem.useWeaponCostRate = affixItem.useWeaponCostRate;
		newItem.useArmorCostRate = affixItem.useArmorCostRate;
		newItem.replaceItemCost = affixItem.replaceItemCost;*/
	}
	if (Imported.YEP_X_SkillCooldowns) {
		//newItem.cooldownChange = affixItem.cooldownChange;
		//newItem.stypeCooldownChange = affixItem.stypeCooldownChange;
		newItem.globalCooldownChange += affixItem.globalCooldownChange;
		//newItem.warmupChange = affixItem.warmupChange;
		//newItem.stypeWarmupChange = affixItem.stypeWarmupChange;
		newItem.globalWarmupChange += affixItem.globalWarmupChange;
		
		//newItem.cooldownDuration = affixItem.cooldownDuration;
		//newItem.stypeCooldownDuration = affixItem.stypeCooldownDuration;
		newItem.globalCooldownDuration *= affixItem.globalCooldownDuration;
		//newItem.cooldownRate = affixItem.cooldownRate;
		//newItem.stypeCooldownRate = affixItem.stypeCooldownRate;
		newItem.globalCooldownRate *= affixItem.globalCooldownRate;
	}
	if (Imported.YEP_X_CounterControl) {
		newItem.counterSkills = newItem.counterSkills.concat(affixItem.counterSkills);
		newItem.counterTotal += affixItem.counterTotal;
		newItem.targetCounterRate *= affixItem.targetCounterRate;
		newItem.targetCounterFlat += affixItem.targetCounterFlat;
		//newItem.evadeCounter = affixItem.evadeCounter;
		//newItem.hitCounter = affixItem.hitCounter;
		newItem.counterTotalEval += affixItem.counterTotalEval;
		newItem.counterSkillsEval += affixItem.counterSkillsEval;
		newItem.targetCounterRateEval += affixItem.targetCounterRateEval;
	}
};

//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.averagePartyLevel = function () {
	return this.averageLevelUtility($gameParty.allMembers());
};

Game_System.prototype.averageBattleLevel = function () {
	return this.averageLevelUtility($gameParty.battleMembers());
};

Game_System.prototype.averageLevelUtility = function (members) {
	if (members.length <= 0) return 0;
	var sum = 0;
	members.forEach(function (member) {
		sum += member.level;
	});
	return sum / members.length;
};

Game_System.prototype.clearForceItemAffix = function () {
	this._forceItemAffix = [];
};

Game_System.prototype.getForceItemAffix = function (evalMode, args) {
	var line = args.join(' ');
	this._forceItemAffix = this._forceItemAffix || [];
	this._forceItemAffix.push(DataManager.processCombineItem(line, evalMode));
};

Game_System.prototype.forceItemAffix = function () {
	return this._forceItemAffix || [];
};

Game_System.prototype.combineAffixWithBaseItem = function (affixItem, newItem, affixType) {
	if (!affixItem || !newItem) return;
	if (!affixItem.wtypeId && !affixItem.atypeId) return;
	if (!newItem.wtypeId && !newItem.atypeId) return;
	if (!affixType || !['prefix', 'suffix'].contains(affixType))
		affixType = 'prefix';
	ItemManager.combineSettedParam(affixItem, newItem, affixType);
	ItemManager.combineNormalParam(affixItem, newItem);
	ItemManager.combinePluginParam(affixItem, newItem);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

GT.RIA.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    GT.RIA.Game_Interpreter_pluginCommand.call(this, command, args);
	switch(command) {
    case 'ForceItemPrefix':
	    $gameSystem.getForceItemAffix('prefix', args);
		break;
	case 'ForceItemSuffix':
	    $gameSystem.getForceItemAffix('suffix', args);
		break;
	case 'ResetItemAffix':
	    $gameSystem.clearForceItemAffix();
		break;
	}
};

//=============================================================================
// Game_Party
//=============================================================================

GT.RIA.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
	if (!item || item.hasBeenGained) return;
	GT.RIA.Game_Party_gainItem.call(this, item, amount, includeEquip);
};

if (Yanfly.Param.ItemSceneItem) {
//=============================================================================
// Window_ItemStatus
//=============================================================================

GT.RIA.Window_ItemStatus_drawItemIcon = Window_ItemStatus.prototype.drawItemIcon;
Window_ItemStatus.prototype.drawItemIcon = function () {
	GT.RIA.Window_ItemStatus_drawItemIcon.call(this);
	this.drawMultipleLargeIcon();
};

}

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.drawMultipleLargeIcon = function () {
	var item = this._item;
	if (!item) return;
	if (!item.overlayIcons || !item.overlayIcons.length) return;
	var overlayIcons = item.overlayIcons;
	for (var i = 0; i < overlayIcons.length; i++) {
		var iconIndex = overlayIcons[i];
		this.drawMultipleLargeIconOverlay(iconIndex);
	}
};

Window_Base.prototype.drawMultipleLargeIconOverlay = function (iconIndex) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	var dw = Yanfly.Param.ItemIconSize;
	var dh = Yanfly.Param.ItemIconSize;
	var dx = (Window_Base._faceWidth - dw) / 2;
	var dy = (Window_Base._faceHeight - dh) / 2;
	this.contents._context.imageSmoothingEnabled = false;
	this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
	this.contents._context.imageSmoothingEnabled = true;
};

GT.RIA.Window_Base_drawItemName = Window_Base.prototype.drawItemName;
Window_Base.prototype.drawItemName = function (item, x, y, width) {
	GT.RIA.Window_Base_drawItemName.call(this, item, x, y, width);
	if (item && item.overlayIcons && item.overlayIcons.length) {
		var overlayIcons = item.overlayIcons;
		for (var i = 0; i < overlayIcons.length; i++) {
			var iconIndex = overlayIcons[i];
			this.drawIcon(iconIndex, x + 2, y + 2);
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_VictoryAftermath || Imported.Olivia_VictorySequenceUI) {
	
GT.RIA.BattleManager_gainDropItems = BattleManager.gainDropItems;
BattleManager.gainDropItems = function () {
	this.convertAffixItems();
	GT.RIA.BattleManager_gainDropItems.call(this);
};

}//Imported.YEP_VictoryAftermath || Imported.Olivia_VictorySequenceUI

GT.RIA.BattleManager_displayDropItems = BattleManager.displayDropItems;
BattleManager.displayDropItems = function () {
	this.convertAffixItems();
	GT.RIA.BattleManager_displayDropItems.call(this);
};

BattleManager.convertAffixItems = function () {
	for (var i = 0; i < this._rewards.items.length; i++) {
		var item = this._rewards.items[i];
		if (DataManager.isNewAffixItem(item)) {
			$gameParty.gainItem(item, 1);
			var newItem = JsonEx.makeDeepCopy($gameTemp.lastCreatedAffixItem);
			newItem.hasBeenGained = true;
			$gameTemp.lastCreatedAffixItem = undefined;
			this._rewards.items[i] = newItem;
		}
	}
};

//=============================================================================
// End of File
//=============================================================================
} else {

Imported.GT_X_RandomItemAffix = false;	
var text = '警告，你试图在没有安装GT_RandomItemSystem的情况下运行GT_X_RandomItemAffix，请安装GT_RandomItemSystem。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_ItemCore && Imported.GT_RandomItemSystem