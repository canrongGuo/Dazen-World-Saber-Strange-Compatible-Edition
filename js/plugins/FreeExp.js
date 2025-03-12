/*:
 * @plugindesc FreeExp Ver 1.00
 * @author Morpho(dongdongDJH)
 * 
 * @help 
 * 在需要自定义升级经验值的职业备注里添加 <FreeExp>;
 * 通过修改项目工程下data文件夹内的ExpInfos.json文件内容设定自定义经验值，格式详见范例;
 * 注1：ExpInfos.json的职业id与Classes.json内一致;
 * 注2：未添加备注或者未在ExpInfos.json内添加自定义经验值的按系统默认。
 * 注3：expParams内参数依次为等级1至n升级需要的经验值;
 */

var $dataExpInfos = null;

DataManager._databaseFiles = [
    { name: '$dataActors',       src: 'Actors.json'       },
    { name: '$dataClasses',      src: 'Classes.json'      },
    { name: '$dataSkills',       src: 'Skills.json'       },
    { name: '$dataItems',        src: 'Items.json'        },
    { name: '$dataWeapons',      src: 'Weapons.json'      },
    { name: '$dataArmors',       src: 'Armors.json'       },
    { name: '$dataEnemies',      src: 'Enemies.json'      },
    { name: '$dataTroops',       src: 'Troops.json'       },
    { name: '$dataStates',       src: 'States.json'       },
    { name: '$dataAnimations',   src: 'Animations.json'   },
    { name: '$dataTilesets',     src: 'Tilesets.json'     },
    { name: '$dataCommonEvents', src: 'CommonEvents.json' },
    { name: '$dataSystem',       src: 'System.json'       },
    { name: '$dataMapInfos',     src: 'MapInfos.json'     },
    { name: '$dataExpInfos',     src: 'ExpInfos.json'     }
];

Game_Actor.prototype.expForLevel = function(level) {
    if (this.currentClass().meta.FreeExp && $dataExpInfos[this._classId]) {
        var c = $dataExpInfos[this._classId];
        var n = 0, exp = 0;
        while (n < level) {
            n += 1;
            exp += c.expParams[n-1];
        };
        return exp;
    } else {
        var c = this.currentClass();
        var basis = c.expParams[0];
        var extra = c.expParams[1];
        var acc_a = c.expParams[2];
        var acc_b = c.expParams[3];
        return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*(level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);
    };
};
