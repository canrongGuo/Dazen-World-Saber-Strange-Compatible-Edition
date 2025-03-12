//=============================================================================
// GT50 Plugins - SuperShopSystem - ShopItemExchange
// GT_X_ShopItemExchange.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_ShopItemExchange = true;

var GT = GT || {};
GT.SIE = GT.SIE || {};
GT.SIE.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        物品 - 超级商店系统 - 商店兑换物品扩展
 * @author ganfly
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 * 这个插件是GT_SuperShopSystem的商店兑换物品扩展
 * 需要安装GT_SuperShopSystem才能运行
 * 请将此插件置于GT_SuperShopSystem的下方。
 *
 * 这个插件允许你使用变量或者物品来兑换物品
 *
 * ============================================================================
 *  说明 - 将变量作为兑换媒介
 * ============================================================================
 *
 * 对于那些你想要用其来兑换物品的变量，
 * 你可以用以下命名来确定其图标。
 * 
 * \i[x]变量名
 *
 * 如果希望隐藏变量名，可以使用以下写法
 *
 * \i[x]<<变量名>>
 *
 * 这种情况下， << >>之间的文字将不会显示在货币窗口内
 *
 * ============================================================================
 *  备注
 * ============================================================================
 *
 * ---物品/武器/防具备注
 * 
 *   <Item Exchange: i1 2 w2 4 a3 6 v4 8>
 *    设置该物品可以用2个1号物品， 4个2号武器，6个3号防具
 *    8个4号变量来兑换，可以继续增加各种需要的物品/变量
 *    可以使用多个该备注来确定多种兑换方式
 *    物品用i加上物品id来表示，武器用w加上武器id来表示
 *    防具用a加上防具id来表示，变量用v加上变量id来表示
 *    用来兑换物品的物品/武器/防具不能是独立物品
 *
 * ============================================================================
 *  插件指令
 * ============================================================================
 *
 *  EnableShopItemExchange
 *  EnableShopItemExchange i1 w2 a3
 *        这样会使得带有Item Exchange备注的物品在商店中
 *        只能被特定物品/变量兑换而不是用货币购买。
 *        如果不填影响的物品范围，则会影响所有物品
 *        否则只影响后面列出的物品
 *        物品用i加上物品id来表示，武器用w加上武器id来表示
 *        防具用a加上防具id来表示
 *        例如 EnableShopItemExchange i1 w2 a3
 *        代表物品1，武器2，防具3在商店中只能兑换不能购买
 *
 *  DisableShopItemExchange
 *  DisableShopItemExchange i1 w2 a3
 *        这样会使得带有Item Exchange备注的物品在商店中
 *        不能被特定物品/变量兑换而是用货币购买。
 *        如果不填影响的物品范围，则会影响所有物品
 *        否则只影响后面列出的物品
 *        物品用i加上物品id来表示，武器用w加上武器id来表示
 *        防具用a加上防具id来表示
 *        例如 DisableShopItemExchange i1 w2 a3
 *        代表物品1，武器2，防具3在商店中只能购买不能兑换
 *  
 *  SetItemExchangeIndex index i1 w2 a3
 *        默认情况下，对于有多个Item Exchange备注的物品
 *        其在商店中兑换时使用其第一个备注的兑换方式
 *        这条指令会切换指定物品的兑换方式
 *        index替换为兑换方式序号，1号为默认的第一种
 *        后面的表示影响的物品
 *        物品用i加上物品id来表示，武器用w加上武器id来表示
 *        防具用a加上防具id来表示
 *        例如 SetItemExchangeIndex 2 i1 w2 a3
 *        代表物品1，武器2，防具3在商店中将会使用第二种方式兑换
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
 * @param General
 * @text ----常规设置----
 * @default
 *
 * @param Currency Padding
 * @text 兑换物与货币之间的空格长度
 * @parent General
 * @type number
 * @min 0
 * @desc 兑换物与货币之间的空格长度
 * @default 10
 *
 * @param Font Size
 * @text 兑换物字体大小
 * @parent General
 * @type number
 * @min 1
 * @desc 兑换物字体大小
 * 默认: 28
 * @default 20
 *
 * @param Enable Item Exchange
 * @text 初始允许商店物品兑换
 * @parent General
 * @type boolean
 * @on 允许
 * @off 禁止
 * @desc 是否初始允许商店物品兑换
 * @default false
 *
 */
//=============================================================================

if (Imported.GT_SuperShopSystem) {

//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_X_ShopItemExchange');
GT.Param = GT.Param || {};

GT.Param.SIECurrencyPadding = Number(GT.Parameters['Currency Padding']);
GT.Param.SIECurrencyFontSize = Number(GT.Parameters['Font Size']);
GT.Param.SIEEnableItemExchange = eval(GT.Parameters['Enable Item Exchange']);

//=============================================================================
// DataManager
//=============================================================================

GT.SIE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!GT.SIE.DataManager_isDatabaseLoaded.call(this))
        return false;
    if (!GT._loaded_GT_X_ShopItemExchange) {
        this.processSIEIdNameNotetags($dataItems, 0);
        this.processSIEIdNameNotetags($dataWeapons, 1);
        this.processSIEIdNameNotetags($dataArmors, 2);
        this.processSIENotetags($dataItems);
        this.processSIENotetags($dataWeapons);
        this.processSIENotetags($dataArmors);
        GT._loaded_GT_X_ShopItemExchange = true;
    }
    return true;
};

DataManager.processSIEIdNameNotetags = function (group, itemType) {
	var code = ['ItemIdRef', 'WeaponIdRef', 'ArmorIdRef'][itemType];
    if (GT[code] || Yanfly[code]) return;
    GT[code] = {};
    for (var n = 1; n < group.length; n++) {
        var obj = group[n];
        if (obj.name.length <= 0) continue;
        GT[code][obj.name.toUpperCase()] = n;
    }
};

DataManager.processSIENotetags = function (group) {
    for (var i = 1; i < group.length; i++) {
        var obj = group[i];
        this.setupSIENotetags(obj);
    }
};

DataManager.setupSIENotetags = function (obj) {
	var note1 = /<ITEM EXCHANGE:[ ](.*)>/i;
	
	var notedata = obj.note.split(/[\r\n]+/);
	obj.exchangeItem = [];
	obj.enableExchange = false;
	obj.exchangeItemIndex = 1;

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		if (line.match(note1)) {
			obj.exchangeItem.push(RegExp.$1);
		}
	}
};

//=============================================================================
// Game_Interpreter
//=============================================================================

GT.SIE.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    GT.SIE.Game_Interpreter_pluginCommand.call(this, command, args);
	switch (command) {
	case 'EnableShopItemExchange':
		this.setEnableItemExchange(args, true);
		break;
	case 'DisableShopItemExchange':
		this.setEnableItemExchange(args, false);
		break;
	case 'SetItemExchangeIndex':
		this.setItemExchangeIndex(args);
		break;
	}
};

Game_Interpreter.prototype.setItemExchangeIndex = function (args) {
	var index = parseInt(args[0]);
	if (!index) index = 1;
	for (var i = 1; i < args.length; ++i) {
		if (args[i].match(/I(\d+)/i)) {
			var item = $dataItems[parseInt(RegExp.$1)];
			item.exchangeItemIndex = index;
		}
		else if (args[i].match(/W(\d+)/i)) {
			var item = $dataWeapons[parseInt(RegExp.$1)];
			item.exchangeItemIndex = index;
		}
		else if (args[i].match(/A(\d+)/i)) {
			var item = $dataArmors[parseInt(RegExp.$1)];
			item.exchangeItemIndex = index;
		}
	}
};

Game_Interpreter.prototype.setEnableItemExchange = function (args, enable) {
	if (!args || !args.length) {
		$gameSystem.setEnableItemExchange(enable);
	} else {
		for (var i = 0; i < args.length; ++i) {
			if (args[i].match(/I(\d+)/i)) {
				var item = $dataItems[parseInt(RegExp.$1)];
				item.enableExchange = enable;
			}
			else if (args[i].match(/W(\d+)/i)) {
				var item = $dataWeapons[parseInt(RegExp.$1)];
				item.enableExchange = enable;
			}
			else if (args[i].match(/A(\d+)/i)) {
				var item = $dataArmors[parseInt(RegExp.$1)];
				item.enableExchange = enable;
			}
		}
	}
};
//=============================================================================
// Game_System
//=============================================================================

GT.SIE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    GT.SIE.Game_System_initialize.call(this);
    this._enableItemExchange = GT.Param.SIEEnableItemExchange;
};

Game_System.prototype.enableItemExchange = function() {
    return this._enableItemExchange;
};

Game_System.prototype.setEnableItemExchange = function(enable) {
    this._enableItemExchange = enable;
};

//=============================================================================
// Window_Base
//=============================================================================

GT.SIE.Window_Base_drawCurrencyValue = Window_Base.prototype.drawCurrencyValue;
Window_Base.prototype.drawCurrencyValue = function (value, unit, wx, wy, ww) {
    if (unit !== TextManager.currencyUnit) {
        this.drawAltCurrency(value, unit, wx, wy, ww);
    }
    GT.SIE.Window_Base_drawCurrencyValue.call(this, value, unit, wx, wy, ww);
};

Window_Base.prototype.drawAltCurrency = function (value, unit, wx, wy, ww) {
    this.resetTextColor();
    var iconIndex = 0;
    var unitText = '';
    if (DataManager.isItem(unit) || DataManager.isWeapon(unit) ||
        DataManager.isArmor(unit)) {
        var iconIndex = unit.iconIndex;
    } else if (unit.match(/VARIABLE[ ](\d+)/i)) {
        var name = $dataSystem.variables[parseInt(RegExp.$1)];
        if (name.match(/\\I\[(\d+)\]/i)) {
            var iconIndex = parseInt(RegExp.$1);
        }
        name = name.replace(/\\I\[(\d+)\]/gi, '');
        unitText = name.replace(/<<(.*?)>>/gi, '');
    }
    // Draw Text
    this.contents.fontSize = GT.Param.SIECurrencyFontSize;
    if (unitText !== '') {
        this.changeTextColor(this.systemColor());
        this.drawText(unitText, wx, wy, ww, 'right');
        ww -= this.textWidth(unitText);
    }
    // Draw Icon
    if (iconIndex > 0) {
        if (unitText !== '')
            ww -= 6;
        ww -= Window_Base._iconWidth;
        this.drawIcon(iconIndex, wx + ww, wy + 2);
    }
    this.resetTextColor();
    this.drawText(GT.Util.toGroup(value), wx, wy, ww, 'right');
    ww -= this.textWidth(GT.Util.toGroup(value));
    this.resetFontSettings();
    return ww;
};

//=============================================================================
// Window_Gold
//=============================================================================

GT.SIE.Window_Gold_refresh = Window_Gold.prototype.refresh;
Window_Gold.prototype.refresh = function () {
    var x = this.textPadding();
    var ww = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
    if (this.isDrawExGoldCurrency()) {
		this.drawItemCurrencies(x, ww);
    } else {
		GT.SIE.Window_Gold_refresh.call(this);
	}
    this.resetFontSettings();
};

Window_Gold.prototype.isDrawExGoldCurrency = function () {
    if (this._item && this._buyMode) {
        var item = this._item;
		if (item.exchangeItem && item.exchangeItem.length) {
			if (item.enableExchange || $gameSystem.enableItemExchange())
				return true;
		}
    }
    return false;
};

Window_Gold.prototype.setItemBuy = function (item) {
    if (this._item === item) return;
    this._item = item;
    this._buyMode = true;
    this.refresh();
};

Window_Gold.prototype.setItemSell = function (item) {
    if (this._item === item) return;
    this._item = item;
    this._buyMode = false;
    this.refresh();
};

Window_Gold.prototype.drawItemCurrencies = function (wx, ww) { 
    var item = this._item;
    var wy = 0;
    var currenciesList = item.exchangeItem;
	var index = Math.max(item.exchangeItemIndex - 1, 0);
	index = Math.min(index, currenciesList.length - 1);
	var currencies = currenciesList[index].trim().split(/\s+/i);
	if (!currencies || !currencies.length) return;
	for (var i = 0; i < currencies.length; ++i) {
		if (currencies[i].match(/V(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var value = $gameVariables.value(varId);
			var unit = 'VARIABLE ' + varId;
			ww = this.drawAltCurrency(value, unit, wx, wy, ww);
			ww -= GT.Param.SIECurrencyPadding;
		}
        else if (currencies[i].match(/I(\d+)/i)) {
			var costItem = $dataItems[parseInt(RegExp.$1)];
			var value = $gameParty.numItems(costItem);
			ww = this.drawAltCurrency(value, costItem, wx, wy, ww);
			ww -= GT.Param.SIECurrencyPadding;
		}
        else if (currencies[i].match(/W(\d+)/i)) {
			var costItem = $dataWeapons[parseInt(RegExp.$1)];
			var value = $gameParty.numItems(costItem);
			ww = this.drawAltCurrency(value, costItem, wx, wy, ww);
			ww -= GT.Param.SIECurrencyPadding;
		}
		else if (currencies[i].match(/A(\d+)/i)) {
			var costItem = $dataArmors[parseInt(RegExp.$1)];
			var value = $gameParty.numItems(costItem);
			ww = this.drawAltCurrency(value, costItem, wx, wy, ww);
			ww -= GT.Param.SIECurrencyPadding;
		}
	}
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

GT.SIE.Window_ShopBuy_drawAllCurrency = Window_ShopBuy.prototype.drawAllCurrency;
Window_ShopBuy.prototype.drawAllCurrency = function (item, rect) {
    if (!item) return;
    if (this.isDrawExGoldCurrency(item)) {
		this.drawExchangeItemPrices(item, rect, rect.width);
	}
	else if (this.price(item) > 0) {
        GT.SIE.Window_ShopBuy_drawAllCurrency.call(this, item, rect);
    }
};

Window_ShopBuy.prototype.isDrawExGoldCurrency = function (item) {
	if (item.exchangeItem && item.exchangeItem.length) {
		if (item.enableExchange || $gameSystem.enableItemExchange())
			return true;
	}
    return false;
};

Window_ShopBuy.prototype.drawExchangeItemPrices = function (item, rect, ww) {
	var currenciesList = item.exchangeItem;
	var index = Math.max(item.exchangeItemIndex - 1, 0);
	index = Math.min(index, currenciesList.length - 1);
	var currencies = currenciesList[index].trim().split(/\s+/i);
	if (!currencies || !currencies.length) return;
	if (currencies.length % 2) return;
    for (var i = 0; i < currencies.length / 2; ++i) {
		if (currencies[2 * i].match(/V(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var value = parseInt(currencies[2 * i + 1]);
			ww = this.drawVariablePrice(varId, value, rect, ww);
		}
		else if (currencies[2 * i].match(/I(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var value = parseInt(currencies[2 * i + 1]);
			ww = this.drawItemBuyPrice(varId, value, rect, ww, 0);
		}
		else if (currencies[2 * i].match(/W(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var value = parseInt(currencies[2 * i + 1]);
			ww = this.drawItemBuyPrice(varId, value, rect, ww, 1);
		}
		else if (currencies[2 * i].match(/A(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var value = parseInt(currencies[2 * i + 1]);
			ww = this.drawItemBuyPrice(varId, value, rect, ww, 2);
		}
    }
};

Window_ShopBuy.prototype.drawVariablePrice = function (varId, value, rect, ww) {
    var unit = 'VARIABLE ' + varId;
    ww = this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
    ww -= GT.Param.SIECurrencyPadding;
    return ww;
};

Window_ShopBuy.prototype.drawItemBuyPrice = function (varId, value, rect, ww, type) {
	var unitList = [$dataItems, $dataWeapons, $dataArmors];
    var unit = unitList[type][varId];
    ww = this.drawAltCurrency(value, unit, rect.x, rect.y, ww);
    ww -= GT.Param.SIECurrencyPadding;
    return ww;
};

Window_ShopBuy.prototype.textWidthEx = function (text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

GT.SIE.Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function (item) {
	var enable = GT.SIE.Window_ShopBuy_isEnabled.call(this, item);
	if (!item) return false;
    if ($gamePlayer.isDebugThrough()) return true;
	if (!this.isDrawExGoldCurrency(item)) return enable;
	var currenciesList = item.exchangeItem;
	var index = Math.max(item.exchangeItemIndex - 1, 0);
	index = Math.min(index, currenciesList.length - 1);
	var currencies = currenciesList[index].trim().split(/\s+/i);
	if (!currencies || !currencies.length) return enable;
	if (currencies.length % 2) return enable;
	for (var i = 0; i < currencies.length / 2; ++i) {
		if (currencies[2 * i].match(/V(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameVariables.value(varId);
			if (value < price) return false;
		}
		else if (currencies[2 * i].match(/I(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataItems[varId]);
			if (value < price) return false;
		}
		else if (currencies[2 * i].match(/W(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataWeapons[varId]);
			if (value < price) return false;
		}
		else if (currencies[2 * i].match(/A(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataArmors[varId]);
			if (value < price) return false;
		}
	}
    return true;
};

GT.SIE.Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
Window_ShopBuy.prototype.updateHelp = function () {
    GT.SIE.Window_ShopBuy_updateHelp.call(this);
    if (SceneManager._scene._goldWindow) {
        SceneManager._scene._goldWindow.setItemBuy(this.item());
    }
};

//=============================================================================
// Window_ShopSell
//=============================================================================

GT.SIE.Window_ShopSell_updateHelp = Window_ShopSell.prototype.updateHelp;
Window_ShopSell.prototype.updateHelp = function () {
    GT.SIE.Window_ShopSell_updateHelp.call(this);
    if (SceneManager._scene._goldWindow) {
        SceneManager._scene._goldWindow.setItemSell(this.item());
    }
};

//=============================================================================
// Window_ShopNumber
//=============================================================================

Window_ShopNumber.prototype.isDrawExGoldCurrency = function () {
    var item = this._item;
	if (this.isSelling()) return false;
    if (item.exchangeItem && item.exchangeItem.length) {
		if (item.enableExchange || $gameSystem.enableItemExchange())
			return true;
    }
    return false;
};

GT.SIE.Window_ShopNumber_drawTotalPrice = Window_ShopNumber.prototype.drawTotalPrice;
Window_ShopNumber.prototype.drawTotalPrice = function () {
    if (this.isDrawExGoldCurrency()) {
		var ww = this.contents.width - this.textPadding();
		var wy = this.itemY();
		this.drawHorzLine(this.lineHeight() * 3);
		this.drawHorzLine(wy + this.lineHeight() * 3);
		this.drawExchangeItemPrices(ww, wy);
		   
    } else {
		GT.SIE.Window_ShopNumber_drawTotalPrice.call(this);
	}
};

Window_ShopNumber.prototype.drawExchangeItemPrices = function (ww, wy) {
	var currenciesList = this._item.exchangeItem;
    var index = Math.max(this._item.exchangeItemIndex - 1, 0);
	index = Math.min(index, currenciesList.length - 1);
	var currencies = currenciesList[index].trim().split(/\s+/i);
	if (!currencies || !currencies.length) return;
	if (currencies.length % 2) return;
	for (var i = 0; i < currencies.length / 2; ++i) {
		if (currencies[2 * i].match(/V(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			ww = this.drawVariablePrice(ww, wy, varId, price);
		}
        else if (currencies[2 * i].match(/I(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			ww = this.drawItemCostPrice(ww, wy, varId, price, 0);
		}
        else if (currencies[2 * i].match(/W(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			ww = this.drawItemCostPrice(ww, wy, varId, price, 1);
		}
		else if (currencies[2 * i].match(/A(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			ww = this.drawItemCostPrice(ww, wy, varId, price, 2);
		}
	}
	this.resetFontSettings();
};

Window_ShopNumber.prototype.drawVariablePrice = function (ww, wy, varId, price) {
    var fw = ww;
    var fy = wy + this.lineHeight() * 1;
    var value = $gameVariables.value(varId);
    var unit = 'VARIABLE ' + varId;
    fw = Math.min(fw, this.drawAltCurrency(value, unit, 0, fy, ww));
    fy += this.lineHeight();
	value = this._number * price;
	value = GT.Util.toGroup(value * -1);
    fw = Math.min(fw, this.drawAltCurrency(value, unit, 0, fy, ww));
    fy += this.lineHeight();
    value = $gameVariables.value(varId) - price * this._number;
    fw = Math.min(fw, this.drawAltCurrency(value, unit, 0, fy, ww));
	fw -= GT.Param.SIECurrencyPadding;
    return fw;
};

Window_ShopNumber.prototype.drawItemCostPrice = function (ww, wy, varId, price, type) {
    var fw = ww;
    var fy = wy + this.lineHeight() * 1;
	var unitList = [$dataItems, $dataWeapons, $dataArmors];
    var unit = unitList[type][varId];
    var value = $gameParty.numItems(unit);
    fw = Math.min(fw, this.drawAltCurrency(value, unit, 0, fy, ww));
    fy += this.lineHeight();
	value = this._number * price;
	value = GT.Util.toGroup(value * -1);
    fw = Math.min(fw, this.drawAltCurrency(value, unit, 0, fy, ww));
    fy += this.lineHeight();
    value = $gameParty.numItems(unit) - price * this._number;
    fw = Math.min(fw, this.drawAltCurrency(value, unit, 0, fy, ww));
	fw -= GT.Param.SIECurrencyPadding;
    return fw;
};

//=============================================================================
// Scene_Shop
//=============================================================================

GT.SIE.Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
Scene_Shop.prototype.maxBuy = function () {
    var max = GT.SIE.Scene_Shop_maxBuy.call(this);
	var item = this._item;
	if (!this._buyWindow.isDrawExGoldCurrency(item)) return max;
	var currenciesList = item.exchangeItem;
	var index = Math.max(item.exchangeItemIndex - 1, 0);
	index = Math.min(index, currenciesList.length - 1);
	var currencies = currenciesList[index].trim().split(/\s+/i);
	if (!currencies || !currencies.length) return max;
	if (currencies.length % 2) return max;
	max = $gameParty.maxItems(item) - $gameParty.numItems(item);
	if (this._shop) {
		var stock = this._shop.getStockQuantity(item);
		if (stock > -1)
			max = Math.min(max, stock);
	}
    for (var i = 0; i < currencies.length / 2; ++i) {
		if (currencies[2 * i].match(/V(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameVariables.value(varId);
			max = Math.min(max, Math.floor(value / price));
		}
		else if (currencies[2 * i].match(/I(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataItems[varId]);
			max = Math.min(max, Math.floor(value / price));
		}
		else if (currencies[2 * i].match(/W(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataWeapons[varId]);
			max = Math.min(max, Math.floor(value / price));
		}
		else if (currencies[2 * i].match(/A(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataArmors[varId]);
			max = Math.min(max, Math.floor(value / price));
		}
	}
    return Math.max(max, 0);
};

GT.SIE.Scene_Shop_doBuyGold = Scene_Shop.prototype.doBuyGold;
Scene_Shop.prototype.doBuyGold = function (number) {
	var item = this._item;
	if (!this._buyWindow.isDrawExGoldCurrency(item)) 
		return GT.SIE.Scene_Shop_doBuyGold.call(this, number);
	var currenciesList = item.exchangeItem;
	var index = Math.max(item.exchangeItemIndex - 1, 0);
	index = Math.min(index, currenciesList.length - 1);
	var currencies = currenciesList[index].trim().split(/\s+/i);
	if (!currencies || !currencies.length) 
		return GT.SIE.Scene_Shop_doBuyGold.call(this, number);
	if (currencies.length % 2) 
		return GT.SIE.Scene_Shop_doBuyGold.call(this, number);
    for (var i = 0; i < currencies.length / 2; ++i) {
		if (currencies[2 * i].match(/V(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameVariables.value(varId);
			$gameVariables.setValue(varId, value - price * number);
		}
		else if (currencies[2 * i].match(/I(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataItems[varId]);
			$gameParty.gainItem($dataItems[varId], -price * number);
		}
		else if (currencies[2 * i].match(/W(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataWeapons[varId]);
			$gameParty.gainItem($dataWeapons[varId], -price * number);
		}
		else if (currencies[2 * i].match(/A(\d+)/i)) {
			var varId = parseInt(RegExp.$1);
			var price = parseInt(currencies[2 * i + 1]);
			var value = $gameParty.numItems($dataArmors[varId]);
			$gameParty.gainItem($dataArmors[varId], -price * number);
		}
	}
};

GT.SIE.Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
Scene_Shop.prototype.onBuyCancel = function () {
    GT.SIE.Scene_Shop_onBuyCancel.call(this);
    this._goldWindow.setItemBuy(null);
};

GT.SIE.Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
Scene_Shop.prototype.onSellCancel = function () {
    GT.SIE.Scene_Shop_onSellCancel.call(this);
    this._goldWindow.setItemSell(null);
};

//=============================================================================
// Utilities
//=============================================================================

GT.Util = GT.Util || {};

if (!GT.Util.toGroup) {
    GT.Util.toGroup = function (inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
} else {

Imported.GT_X_ShopItemExchange = false;	
var text = '警告，你试图在没有安装GT_SuperShopSystem的情况下运行GT_X_ShopItemExchange，\n请安装GT_SuperShopSystem';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_SuperShopSystem