//=============================================================================
// 选择卡组 By.目眩
//=============================================================================

var MuXuan = MuXuan || {};

MuXuan.Kxkz = [1,2,3,4,5,6]; // 可选卡组的数组
MuXuan.Kxkz2 = MuXuan.Kxkz2 || [];

// ===============================
// 可选卡组
// ===============================

function Window_ShopKz() {
    this.initialize.apply(this, arguments);
}

Window_ShopKz.prototype = Object.create(Window_Selectable.prototype);
Window_ShopKz.prototype.constructor = Window_ShopKz;

Window_ShopKz.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
};

Window_ShopKz.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_ShopKz.prototype.item = function() {
    return this._data[this.index()];
};

Window_ShopKz.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_ShopKz.prototype.isEnabled = function(item) {
    return item;
};

Window_ShopKz.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_ShopKz.prototype.makeItemList = function() {
    this._data = [];
	for (var i=0;i<MuXuan.Kxkz.length;i++){
		var id = MuXuan.Kxkz[i];
		var kp = $dataSkills[id];
        if (kp) {
            this._data.push(kp);
        }
	}
};

Window_ShopKz.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    var priceWidth = 96;
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
    this.changePaintOpacity(true);
};

Window_ShopKz.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_ShopKz.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setItem(this.item());
    }
};

// ===============================
// 已选卡组
// ===============================

function Window_itemKz() {
    this.initialize.apply(this, arguments);
}

Window_itemKz.prototype = Object.create(Window_Selectable.prototype);
Window_itemKz.prototype.constructor = Window_itemKz;

Window_itemKz.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
    this.select(0);
};

Window_itemKz.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_itemKz.prototype.item = function() {
    return this._data[this.index()];
};

Window_itemKz.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_itemKz.prototype.isEnabled = function(item) {
    return item;
};

Window_itemKz.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_itemKz.prototype.makeItemList = function() {
    this._data = [];
	for (var i=0;i<MuXuan.Kxkz2.length;i++){
		var id = MuXuan.Kxkz2[i];
		var kp = $dataSkills[id];
        if (kp) {
            this._data.push(kp);
        }
	}
};

Window_itemKz.prototype.drawItem = function(index) {
    var item = this._data[index];
    var rect = this.itemRect(index);
    var priceWidth = 96;
    rect.width -= this.textPadding();
    this.changePaintOpacity(this.isEnabled(item));
    this.drawItemName(item, rect.x, rect.y, rect.width - priceWidth);
    this.changePaintOpacity(true);
};

Window_itemKz.prototype.setStatusWindow = function(statusWindow) {
    this._statusWindow = statusWindow;
    this.callUpdateHelp();
};

Window_itemKz.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
    if (this._statusWindow) {
        this._statusWindow.setItem(this.item());
    }
};

//=============================================================================
// 显示窗口
//=============================================================================

function Window_xphelp() {
    this.initialize.apply(this, arguments);
}
2
Window_xphelp.prototype = Object.create(Window_Base.prototype);
Window_xphelp.prototype.constructor = Window_xphelp;

Window_xphelp.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
	this._item = null;
    this.refresh();
};

Window_xphelp.prototype.setItem = function(item) {
    if (this._item === item) return;
    this._item = item;
    this.refresh();
};

Window_xphelp.prototype.refresh = function() {
	if (!this._item) return;
    this.contents.clear();
	// === 下面写显示内容
	
	var wjm = ImageManager.loadPicture(this._item.id);
	this.contents.blt(wjm, 0, 0, 360, 640, 0, 0);
	
	this.drawItemName(this._item, 20, 20, 300);
	
	
	
	
	
	
};

// ===============================
// 创建场景
// ===============================

function Scene_Xpcd() {
    this.initialize.apply(this, arguments);
}

Scene_Xpcd.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Xpcd.prototype.constructor = Scene_Xpcd;

Scene_Xpcd.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Xpcd.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    //this.createHelpWindow();
    this.createxsWindow();
    this.createXpWindow();
    this.createYxWindow();
	this._xpWindow.activate();
	this._yxWindow.activate();
};

Scene_Xpcd.prototype.createxsWindow = function() {
    this._xsWindow = new Window_xphelp(450, 120, 300, 400);
    this.addWindow(this._xsWindow);
};

Scene_Xpcd.prototype.createXpWindow = function() {
    this._xpWindow = new Window_ShopKz(20, 120, 300, 400);
    this._xpWindow.setHelpWindow(this._xsWindow);
    this._xpWindow.setHandler('ok',     this.xpOk.bind(this));
    this._xpWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._xpWindow);
};

Scene_Xpcd.prototype.createYxWindow = function() {
    this._yxWindow = new Window_itemKz(850, 120, 300, 400);
    this._yxWindow.setHelpWindow(this._xsWindow);
    this._yxWindow.setHandler('ok',     this.yxOk.bind(this));
    this._yxWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._yxWindow);
};

Scene_Xpcd.prototype.xpOk = function() {
    this._item = this._xpWindow.item();
	for (var i=0;i<MuXuan.Kxkz.length;i++){
		var id = MuXuan.Kxkz[i];
		var kp = $dataSkills[id];
		if (kp == this._item){
			MuXuan.Kxkz.splice(i,1);
			MuXuan.Kxkz2.push(id);
		}
	}
	this._xpWindow.activate();
	this._xpWindow.refresh();
	this._yxWindow.refresh();
};

Scene_Xpcd.prototype.yxOk = function() {
    this._item = this._yxWindow.item();
	for (var i=0;i<MuXuan.Kxkz2.length;i++){
		var id = MuXuan.Kxkz2[i];
		var kp = $dataSkills[id];
		if (kp == this._item){
			MuXuan.Kxkz2.splice(i,1);
			MuXuan.Kxkz.push(id);
		}
	}
	this._yxWindow.activate();
	this._xpWindow.refresh();
	this._yxWindow.refresh();
};