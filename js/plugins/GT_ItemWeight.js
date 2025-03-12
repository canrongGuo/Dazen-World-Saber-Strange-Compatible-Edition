//=============================================================================
// GT50 Plugins - ItemWeight
// GT_ItemWeight.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_ItemWeight = true;

var GT = GT || {};
GT.IWeight = GT.IWeight || {};
GT.IWeight.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        物品 - 重量系统
 * @author ganfly
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 * 
 * 物品重量系统，可以限制背包中的物品数量
 * 背包最大承重 = 队伍基础最大承重 + 所有角色最大承重之和 + 增益
 * 可以设置超重时队伍附加的状态以及行走速度和禁止跑步
 * 物品/武器/防具/货币均可以设置重量
 * 物品/武器/防具/技能/状态均可以增加队伍的承重上限
 *      
 * ============================================================================
 *  备注
 * ============================================================================
 *
 * ----物品/武器/防具备注
 * 
 *       <Weight: x>
 *       确定该物品/武器/防具的重量，x替换为重量
 *       例如 <Weight: 10>
 *
 * ----物品/武器/防具/技能/状态备注
 *
 *       <Weight Limit: +x>
 *       <Weight Limit: -x>
 *       改变队伍背包的最大承重，x替换为重量，正数增加，负数减少
 *       对于可使用的物品，使用后会永久改变最大承重
 *       对于不可使用的物品，只要该物品在背包里，最大承重就会改变
 *       对于武器/防具，装备以后改变最大承重
 *       对于技能，习得后改变最大承重
 *       对于状态，角色被状态影响时改变最大承重
 *       例如 <Weight Limit: +50>
 *
 * ----角色备注
 *
 *      <Weight Limit: x>
 *      设置该角色最大承重，x替换为重量
 *      例如 <Weight Limit: 100>
 *
 *      <Custom Weight Limit>
 *       limit = 20;
 *      </Custom Weight Limit>
 *      设置该角色的最大承重公式
 *      可以使用以下变量：
 *          atk, def, mat, mdf, agi, luk, hit, eva, hp, mp, tp, mhp, mmp, ...
 *      例如 
 *          <Custom Weight Limit>
 *           limit = actor.atk*10;
 *          </Custom Weight Limit>
 *              在这个例子中，该角色的最大承重为其攻击力的10倍
 *          
 *      注意: 最大承重最少为0.
 *
 *
 * ============================================================================
 *  脚本
 * ============================================================================
 * 
 *    $gameParty.getAllItemWeight()
 *               获取目前的背包重量  
 *     
 *    $gameParty.getItemWeightLimit()    
 *               获取背包的重量上限
 *
 * ============================================================================
 *  兼容性
 * ============================================================================
 * 
 * 本插件已经与以下插件兼容
 * 请将此插件置于以下所有插件的下方
 *      YEP_ItemCore
 *      YEP_X_ItemDiscard
 *
 * 请将此插件置于以下所有插件的上方
 *      GT_ObjectInfoWindow
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
 * @param General
 * @text ----基本设置----
 * @default
 *
 * @param Party Weight Limit
 * @text 队伍最大承重
 * @parent General
 * @type number
 * @min 0
 * @desc 整个队伍能够承受的基础重量
 * @default 0
 *
 * @param Actor Weight Limit
 * @text 单个角色最大承重
 * @parent General
 * @type number
 * @min 0
 * @desc 单个角色能够承受的默认最大重量
 * @default 100
 * 
 * @param Item Weight
 * @text 单个物品默认重量
 * @parent General
 * @desc 单个物品的默认重量
 * @default 1
 * 
 * @param Gold Per Weight
 * @text 单位重量的货币数
 * @parent General
 * @type number
 * @min 0
 * @desc 单位重量的货币数
 * @default 0
 *
 * @param WeightWindow
 * @text ----重量窗口----
 * @default
 * 
 * @param Show In ItemWindow
 * @text 是否显示重量窗口
 * @parent WeightWindow
 * @type boolean
 * @on 是
 * @off 否
 * @desc 是否在物品界面显示重量窗口
 * @default true
 *
 * @param Weight Text Fmt 
 * @text 重量显示的格式
 * @parent WeightWindow
 * @desc 菜单中重量窗口显示的格式
 * @default 重量:%1/%2
 *  
 * @param Weight Number Fmt
 * @text 重量数值显示的格式
 * @parent WeightWindow
 * @desc 重量数值显示的格式
 * @default %1
 * 
 * @param Number Point
 * @text 重量数值小数位数
 * @parent WeightWindow
 * @type number
 * @min 0
 * @desc 重量数值小数点后保留的位数
 * @default 2
 *
 * @param OverWeight
 * @text ----超重影响----
 * @default
 *
 * @param Overweight Text Color
 * @text 超重时的字体颜色
 * @parent OverWeight
 * @desc 超重时的重量显示字体颜色
 * @default 17
 *
 * @param Disable Dash
 * @text 超重时禁止跑步
 * @parent OverWeight
 * @type boolean
 * @on 是
 * @off 否
 * @desc 是否在超重时禁止跑步
 * @default true
 * 
 * @param Normal Speed
 * @text 正常速度
 * @parent OverWeight
 * @type number
 * @min 1
 * @desc 没有超重时候的走路速度.
 * 可填: 1,2,3,4,5,6
 * @default 4
 * 
 * @param Overweight Speed
 * @text 超重速度
 * @parent OverWeight
 * @type number
 * @min 1
 * @desc 超重时候的走路速度.
 * 可填: 1,2,3,4,5,6
 * @default 2
 *  
 * @param Overweight State
 * @text 超重时全队附加的状态
 * @parent OverWeight
 * @type state
 * @desc 超重时全队附加的状态
 * @default 0
 *
 * @param InfoWindow
 * @text ----模块信息窗口----
 * @default !!需要GT_ObjectInfoWindow!!
 *
 * @param ItemWeightText
 * @text 物品重量用语
 * @parent InfoWindow
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"重量","Show":"true"}
 *
 * @param ItemWeightlimitText
 * @text 承重上限用语
 * @parent InfoWindow
 * @type struct<ParamText>
 * @desc 参数的显示设置。
 * @default {"Name":"承重上限","Show":"true"}
 *
 */
/* ---------------------------------------------------------------------------
 * struct<ParamText>
 * ---------------------------------------------------------------------------
 */
/*~struct~ParamText:
 *
 * @param Name
 * @text 参数用语
 * @desc 参数的显示名称。
 * @default 
 *
 * @param Show
 * @text 参数是否显示
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 参数是否显示。
 * @default true
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_ItemWeight');
GT.Param = GT.Param || {};

GT.Param.IWPartyWeightLimit = Number(GT.Parameters['Party Weight Limit']);
GT.Param.IWActorWeightLimit = Number(GT.Parameters['Actor Weight Limit']);
GT.Param.IWItemWeight = Number(GT.Parameters['Item Weight']);
GT.Param.IWGoldPerWeight = Number(GT.Parameters['Gold Per Weight']);

GT.Param.IWShowInItemWindow = eval(GT.Parameters['Show In ItemWindow']);
GT.Param.IWWeightTextFmt = String(GT.Parameters['Weight Text Fmt']);
GT.Param.IWWeightNumberFmt = String(GT.Parameters['Weight Number Fmt']);
GT.Param.IWNumberPoint = Number(GT.Parameters['Number Point']);

GT.Param.IWOverweightTextColor = Number(GT.Parameters['Overweight Text Color']);
GT.Param.IWDisableDash = eval(GT.Parameters['Disable Dash']);
GT.Param.IWNormalSpeed = Number(GT.Parameters['Normal Speed']);
GT.Param.IWOverweightSpeed = Number(GT.Parameters['Overweight Speed']);
GT.Param.IWOverweightStateID = Number(GT.Parameters['Overweight State']);

GT.Param.IWItemWeightText = JSON.parse(GT.Parameters['ItemWeightText']);
GT.Param.IWItemWeightlimitText = JSON.parse(GT.Parameters['ItemWeightlimitText']);

//=============================================================================
// DataManager
//=============================================================================

GT.IWeight.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!GT.IWeight.DataManager_isDatabaseLoaded.call(this)) 
		return false;
    if (!GT._loaded_GT_ItemWeight) {
		this.processItemWeightNotetags1($dataItems, true);
		this.processItemWeightNotetags1($dataWeapons, true);
		this.processItemWeightNotetags1($dataArmors, true);
		this.processItemWeightNotetags1($dataSkills);
		this.processItemWeightNotetags1($dataStates);
		this.processItemWeightNotetags2($dataActors);
        GT._loaded_GT_ItemWeight = true;
    }
    return true;
};

DataManager.processItemWeightNotetags1 = function (group, weight) {
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        this.setupItemWeightNotetags(obj, weight);
    }
};

DataManager.processItemWeightNotetags2 = function (group) {
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        this.setupActorWLimitNotetags(obj);
    }
};

DataManager.setupItemWeightNotetags = function (obj, weight) {
	var note1 = /<(?:WEIGHT):[ ](\d+)>/i;
	var note2 = /<(?:WEIGHT):[ ](\d+).(\d+)>/i;
	var note3 = /<(?:WEIGHT LIMIT):[ ]([\+\-]\d+)>/i;
	var note4 = /<(?:WEIGHT LIMIT):[ ]([\+\-]\d+).(\d+)>/i;
	
    var notedata = obj.note.split(/[\r\n]+/);
	if (weight) obj.weight = GT.Param.IWItemWeight;
	obj.weightLimit = 0.0;
	
    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (weight && line.match(note1)) {
            obj.weight = parseFloat(RegExp.$1);
        } 
		else if (weight && line.match(note2)) {
            obj.weight = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
        }
		else if (line.match(note3)) {
            obj.weightLimit = parseFloat(RegExp.$1);
        } 
		else if (line.match(note4)) {
            obj.weightLimit = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
        }		
    }
};

DataManager.setupActorWLimitNotetags = function (obj) {
	var note1 = /<(?:WEIGHT LIMIT):[ ](\d+)>/i;
	var note2 = /<(?:WEIGHT LIMIT):[ ](\d+).(\d+)>/i;
	var note3 = /<(?:CUSTOM WEIGHT LIMIT)>/i;
	var note4 = /<\/(?:CUSTOM WEIGHT LIMIT)>/i;
	
    var notedata = obj.note.split(/[\r\n]+/);
	obj.weightLimit = GT.Param.IWActorWeightLimit;
	obj.weightLimitEval = '';
	var evalMode = 'none';
	
    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(note1)) {
            obj.weightLimit = parseFloat(RegExp.$1);
        } 
		else if (line.match(note2)) {
            obj.weightLimit = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
        }
		else if (line.match(note3)) {
            evalMode = 'weight limit eval';
        } 
		else if (line.match(note4)) {
            evalMode = 'none';
        }		
		else if (evalMode === 'weight limit eval') {
            obj.weightLimitEval = obj.weightLimitEval + line + '\n';
        }
    }
};

//=============================================================================
// Game_Party
//=============================================================================

Game_Party.prototype.getAllItemWeight = function () {
	this.refreshWeightValues();
	return this.itemWeight();
};

Game_Party.prototype.getItemWeightLimit = function () {
	this.refreshWeightValues();
	return this.itemWeightLimit();
};

GT.IWeight.Game_Party_initialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function () {
    GT.IWeight.Game_Party_initialize.call(this);
	this.setupWeightLimit();
};

Game_Party.prototype.setupWeightLimit = function () {
    this._itemWeight = 0.0;
    this._itemWeightLimit = 0.0;
    this._weightLimitBonus = 0.0;
};

Game_Party.prototype.itemWeight = function () {
	var weight = this._itemWeight;
	if (weight) {
		weight = Math.max(weight, 0);
		return weight;
	}
    return 0.0;
};

Game_Party.prototype.itemWeightLimit = function () {
	var limit = this._itemWeightLimit + this._weightLimitBonus;
	if (limit) {
		limit = Math.max(limit, 0);
		return limit;
	}
	return 0.0;
};

Game_Party.prototype.checkOverWeight = function () {
	if (this.isOverWeight()) {
        $gamePlayer.setMoveSpeed(GT.Param.IWOverweightSpeed);
    } else {
        $gamePlayer.setMoveSpeed(GT.Param.IWNormalSpeed);
    }
};

Game_Party.prototype.refreshWeightValues = function () {
    this.calculateItemWeightLimit();
    this.calculateItemWeight();
    this.checkOverWeight();
};

Game_Party.prototype.calculateItemWeightLimit = function () {
    var limit = GT.Param.IWPartyWeightLimit;
    for (var i = 0; i < this.allMembers().length; i++) {
        limit += this.allMembers()[i].calculateWeightLimit();
    }
    for (var i = 0; i < this.items().length; i++) {
        if (this.items()[i].consumable === false) {
            limit += this.items()[i].weightLimit || 0.0;
        }
    }
    this._itemWeightLimit = limit;
};

Game_Party.prototype.calculateItemWeight = function () {
    var weight = 0;
	if (GT.Param.IWGoldPerWeight) {
		weight += this.gold() / GT.Param.IWGoldPerWeight;
	}
    for (var i = 0; i < this.allItems().length; i++) {
        weight += this.calculateTotalItemWeight(this.allItems()[i]);
    }
	for (var i = 0; i < this.allMembers().length; i++) {
		weight += this.allMembers()[i].calculateEquipWeight();
	}
    this._itemWeight = weight;
};

Game_Party.prototype.calculateTotalItemWeight = function (item) {
	if (!item) return;
    var itemWeight = item.weight || 0.0;
	var itemCount = item.baseItemId ? 1 : this.numItems(item);
    return itemWeight * itemCount;
};

Game_Party.prototype.isOverWeight = function () {
    return this.itemWeight() > this.itemWeightLimit();
};

Game_Party.prototype.addWeightLimitBonus = function (amount) {
	this._weightLimitBonus = this._weightLimitBonus || 0.0;
    this._weightLimitBonus += amount;
};

GT.IWeight.Game_Party_consumeItem = Game_Party.prototype.consumeItem;
Game_Party.prototype.consumeItem = function (item) {    
	GT.IWeight.Game_Party_consumeItem.call(this, item);
    if (DataManager.isItem(item) && item.consumable) {
        var amountToAdd = item.weightLimit || 0.0;
        this.addWeightLimitBonus(amountToAdd);
    }	
};

GT.IWeight.Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
    GT.IWeight.Game_Party_gainItem.call(this, item, amount, includeEquip);
	this.refreshWeightValues();
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.calculateEquipWeight = function () {
    var weight = 0;
	for (var i = 0; i < this.equips().length; i++) {
		if (this.equips()[i] && this.equips()[i].weight)
			weight += this.equips()[i].weight;
	}
    return weight;
};

Game_Actor.prototype.calculateWeightLimit = function () {
	var limit = this.actor().weightLimit || 0.0;
	var limitEval = this.actor().weightLimitEval || '';
	var actor = this;
    if (limitEval !== '') {
        eval(limitEval);
	}
	for (var i = 0; i < this.equips().length; i++) {
        if (this.equips()[i] && this.equips()[i].weightLimit) 
            limit += this.equips()[i].weightLimit;
    }
	for (var i = 0; i < this.states().length; i++) {
        if (this.states()[i] && this.states()[i].weightLimit) 
            limit += this.states()[i].weightLimit;
    }
	for (var i = 0; i < this.skills().length; i++) {
        if (this.skills()[i] && this.skills()[i].weightLimit) 
            limit += this.skills()[i].weightLimit;
    }
    return limit;
};

GT.IWeight.Game_Actor_states = Game_Actor.prototype.states;
Game_Actor.prototype.states = function() {
    var array = GT.IWeight.Game_Actor_states.call(this);
    if ($gameParty.isOverWeight()) {
		this.addOverWeightStates(array);
		this.sortOverweightStates(array);
    }
    return array;
};

Game_Actor.prototype.addOverWeightStates = function(array) {
	var stateId = GT.Param.IWOverweightStateID;
	if (stateId) {
		var state = $dataStates[stateId];
		array.push(state);
	}
};
	
Game_Actor.prototype.sortOverweightStates = function(array) {
    array.sort(function(a, b) {
		var p1 = a.priority;
		var p2 = b.priority;
		if (p1 !== p2) return p2 - p1;
		return a - b;
    });
};	

GT.IWeight.Game_Actor_isStateAffected = Game_Actor.prototype.isStateAffected;
Game_Actor.prototype.isStateAffected = function(stateId) {
    if (stateId == GT.Param.IWOverweightStateID) return true;
    return GT.IWeight.Game_Actor_isStateAffected.call(this, stateId);
};

Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
	if (newItem && !$gameParty.hasItem(newItem)) {
		return false;
	} else {
		GT.IWeight.Game_Party_gainItem.call($gameParty, oldItem, 1);
		GT.IWeight.Game_Party_gainItem.call($gameParty, newItem, -1);
		return true;
	}
};

//=============================================================================
// Game_Map
//=============================================================================

GT.IWeight.Game_Map_isDashDisabled = Game_Map.prototype.isDashDisabled;
Game_Map.prototype.isDashDisabled = function () {
    if (GT.Param.IWDisableDash && $gameParty.isOverWeight()) {
        return true;
    }
    return GT.IWeight.Game_Map_isDashDisabled.call(this);
};

//=============================================================================
// Window_ItemWeight
//=============================================================================

function Window_ItemWeight() {
    this.initialize.apply(this, arguments);
}

Window_ItemWeight.prototype = Object.create(Window_Base.prototype);
Window_ItemWeight.prototype.constructor = Window_ItemWeight;

Window_ItemWeight.prototype.initialize = function (x, y, w, h) {
    Window_Base.prototype.initialize.call(this, x, y, w, h);
    this.refresh();
};

Window_ItemWeight.prototype.refresh = function () {
    this.contents.clear();
    $gameParty.refreshWeightValues();
    this.drawItemWeightValue();
};

Window_ItemWeight.prototype.drawItemWeightValue = function () {
	var x = this.textPadding();
	var current = GT.Param.IWWeightNumberFmt.format(GT.Util.sortValueDD($gameParty.itemWeight()));
    var limit = GT.Param.IWWeightNumberFmt.format(GT.Util.sortValueDD($gameParty.itemWeightLimit()));
    var weightText = GT.Param.IWWeightTextFmt.format(current, limit);
    if ($gameParty.isOverWeight()) 
        this.changeTextColor(this.textColor(GT.Param.IWOverweightTextColor));
    this.drawText(weightText, x, 0);
    this.resetTextColor();
};

Window_ItemWeight.prototype.standardPadding = function () {
	return (this.height - this.standardFontSize() - 12) / 2;
};

Window_ItemWeight.prototype.standardFontSize = function () {
	return 20;
};

//=============================================================================
// Scene_Item
//=============================================================================

GT.IWeight.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
Scene_Item.prototype.createItemWindow = function () {
    GT.IWeight.Scene_Item_createItemWindow.call(this);
	if (GT.Param.IWShowInItemWindow)
		this.createWeightLimitWindow();
};

Scene_Item.prototype.createWeightLimitWindow = function () {
    var wx = this._itemWindow.x;
    var ww = this._itemWindow.width;
    var wh = 50;
	if (Imported.YEP_ItemCore && Yanfly.Param.ItemSceneItem) {
		wx = this._infoWindow.x;
		this._infoWindow.height = this._infoWindow.height - wh;
		this._infoWindow.refresh();
		var wy = this._infoWindow.y + this._infoWindow.height;
	} else {
		this._itemWindow.height = this._itemWindow.height - wh;
		this._itemWindow.refresh();
		var wy = this._itemWindow.y + this._itemWindow.height;
	}
    this._weightLimitWindow = new Window_ItemWeight(wx, wy, ww, wh);
    this.addChild(this._weightLimitWindow);
};

GT.IWeight.Scene_Item_useItem = Scene_Item.prototype.useItem;
Scene_Item.prototype.useItem = function () {
    GT.IWeight.Scene_Item_useItem.call(this);
    if (this._weightLimitWindow) {
        this._weightLimitWindow.refresh();
    }
};

if (Imported.YEP_X_ItemDiscard) {
	
GT.IWeight.Scene_Item_performDiscardItem = Scene_Item.prototype.performDiscardItem;
Scene_Item.prototype.performDiscardItem = function(item, quantity) {
	GT.IWeight.Scene_Item_performDiscardItem.call(this, item, quantity);
	if (this._weightLimitWindow) {
		this._weightLimitWindow.refresh();
	}
};

}

//=============================================================================
// Utilities
//=============================================================================

GT.Util = GT.Util || {};

GT.Util.sortValueDD = function(value) {
	return value.toFixed(GT.Param.IWNumberPoint);
};

//=============================================================================
// End of File
//=============================================================================