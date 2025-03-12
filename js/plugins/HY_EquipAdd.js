//=============================================================================
// Scene_EquipAdd
//=============================================================================
Game_Party.prototype.hecheng = function() {
    if(!this._hecheng)this._hecheng = [0,0,0]
};
Game_Party.prototype.qianghua = function() {
	if(!this._qianghua)this._qianghua = [0]
};
function Scene_EquipAdd() {
    this.initialize.apply(this, arguments);
}

Scene_EquipAdd.prototype = Object.create(Scene_MenuBase.prototype);
Scene_EquipAdd.prototype.constructor = Scene_EquipAdd;

Scene_EquipAdd.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	$gameParty.hecheng();
	this._com = 0;
};

Scene_EquipAdd.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createSlotWindow();
    this.createItemWindow();
	if (eval(GT.Param.OIWSceneShopSet.ShowWindow)) { 
	    this.getObjInfoWindowSet();
		this.createObjInfoWindow();
	}	
};

Scene_EquipAdd.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_EquipAddCommand(400, 120, 240);
    this._commandWindow.setHandler('cailiaoA', this.commandEquipA.bind(this));
	this._commandWindow.setHandler('cailiaoB', this.commandEquipB.bind(this));
    this._commandWindow.setHandler('hecheng', this.commandhecheng.bind(this));
	this._commandWindow.setHandler('tiqu', this.commandtiqu.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};
Scene_EquipAdd.prototype.commandEquipA = function() {
	this._com = 0;
    this._itemWindow.activate();
    this._itemWindow.select(0);
};
Scene_EquipAdd.prototype.commandEquipB = function() {
	this._com = 1;
    this._itemWindow.activate();
    this._itemWindow.select(0);
};
Scene_EquipAdd.prototype.commandhecheng = function() {
	

	$gameParty.gainItem($dataItems[40], -1);//$gameParty.loseItem($dataItems[40])//这里是材料
	$gameParty.loseGold(200000)//这里是金币
	var itemAdd = $gameParty._hecheng[0];
	var itemNew = $dataArmors[itemAdd.baseItemId];
	if(DataManager.isWeapon(itemAdd))itemNew = $dataWeapons[itemAdd.baseItemId];
	var newItem = DataManager.registerNewItem(itemNew);
	var newlist = $gameParty._hecheng[0].paramsList.concat($gameParty._hecheng[1].paramsList)
	var newlistV = $gameParty._hecheng[0].paramsListV.concat($gameParty._hecheng[1].paramsListV)
	for(var i = 0;i<2;i++){
		var r = Math.randomInt(newlist.length)
		newlist.splice(r,1)
		newlistV.splice(r,1)
	}
	newItem.paramsList = newlist;
	newItem.paramsListV = newlistV;
	
		for(var i = 0;i<newItem.params.length;i++){
		newItem.params[i] = itemNew.params[i] 
	}
	for(var i = 0;i<newlist.length;i++){
		newItem.params[newlist[i]] += newlistV[i]
	}
		var lv = Math.max($gameParty._hecheng[0].equipRequirements.atLeast[8],$gameParty._hecheng[1].equipRequirements.atLeast[8]);
	newItem.equipRequirements.atLeast[8] = lv;//这里改等级规则
	        var qh = 15;
		newItem.upgradeSlots = qh;
	    newItem.originalUpgradeSlots = qh;//这里改强化规则
	
	
	if(DataManager.isWeapon(newItem)){
		$gameSystem._drill_ITC_weapons[ newItem.id ] = $gameSystem._drill_ITC_armors[ 997 ]
	}else{
		$gameSystem._drill_ITC_armors[ newItem.id ] = $gameSystem._drill_ITC_armors[ 997 ]
	}
	$gameParty._hecheng[2] = newItem;
	this._commandWindow.refresh();
	this._commandWindow.select(3);
	this._slotWindow.refresh();
	this.commandtiqu();
	//this.popScene();//点击合成后退出界面
	$gameVariables.setValue(97,newItem.baseItemId); //这里
	$gameTemp.reserveCommonEvent(68);//执行公共事件68
};
Scene_EquipAdd.prototype.commandtiqu = function() {
    this._slotWindow.activate();
    this._slotWindow.select(2);
	this.onSlotOk();
};

Scene_EquipAdd.prototype.createSlotWindow = function() {
    var wy = this._commandWindow.y + this._commandWindow.height;
    var ww = this._commandWindow.width;
    var wh = 72;
    this._slotWindow = new Window_EquipAddSlot(400, wy, ww, wh);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
    this.addWindow(this._slotWindow);
};
Scene_EquipAdd.prototype.onSlotOk = function() {
	$gameParty.gainItem(this._slotWindow.item(),1);	
	if(this._slotWindow.index() != 0)DataManager.removeIndependentItem($gameParty._hecheng[0]);
	if(this._slotWindow.index() != 1)DataManager.removeIndependentItem($gameParty._hecheng[1]);
	if(this._slotWindow.index() != 2)DataManager.removeIndependentItem($gameParty._hecheng[2]);
	$gameParty._hecheng = [0,0,0];
	this._commandWindow.refresh();
	this._slotWindow.refresh();
	this._itemWindow.refresh();
	this.onSlotCancel();
	this.popScene();
};
Scene_EquipAdd.prototype.onSlotCancel = function() {
	this._commandWindow.activate();
	this._commandWindow.select(0)
	this._slotWindow.select(-1);
};
Scene_EquipAdd.prototype.createItemWindow = function() {
    var wy = this._slotWindow.y+ this._slotWindow.height;
    var ww = this._commandWindow.width;
    var wh = 36*8;
    this._itemWindow = new Window_EquipAddItem(400, wy, ww, wh);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._slotWindow.setItemWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
};
Scene_EquipAdd.prototype.onItemOk = function() {
    SoundManager.playEquip();
	var ee = $gameParty._hecheng;
	var ii = this._itemWindow.item();
	if(ee[this._com] != 0)$gameParty.gainItem(ee[this._com], 1);
	ee[this._com] = ii;
	if(ii==null)ee[this._com]=0;
	$gameParty.gainItem(ii, -1);	
	this._commandWindow.refresh();
    this._slotWindow.refresh();
    this._itemWindow.refresh();
	this.onItemCancel();
};
Scene_EquipAdd.prototype.onItemCancel = function() {
	this._commandWindow.activate();
	this._commandWindow.select(0)
	this._itemWindow.select(-1);
};
//-----------------------------------------------------------------------------
// Window_EquipAddCommand
//

function Window_EquipAddCommand() {
    this.initialize.apply(this, arguments);
}

Window_EquipAddCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_EquipAddCommand.prototype.constructor = Window_EquipAddCommand;

Window_EquipAddCommand.prototype.initialize = function(x, y, width) {
    this._windowWidth = width;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
};

Window_EquipAddCommand.prototype.windowWidth = function() {
    return 480;
};

Window_EquipAddCommand.prototype.maxCols = function() {
    return 3;
};
Window_EquipAddCommand.prototype.numVisibleRows = function() {
    return 1;
};
Window_EquipAddCommand.prototype.makeCommandList = function() {
	var hechengeYN = false
	var hecheng1 = 0;var hecheng2 = 0;
	if($gameParty._hecheng[0])hecheng1 = $gameParty._hecheng[0].baseItemId
	if($gameParty._hecheng[1])hecheng2 = $gameParty._hecheng[1].baseItemId
	if(hecheng1 != 0 && hecheng2 != 0 && hecheng1 == hecheng2 && $gameParty.gold() >= 200000) hechengeYN = true;
    this.addCommand('装备A',   'cailiaoA',$gameParty._hecheng[2] == 0);
    this.addCommand('装备B',   'cailiaoB',$gameParty._hecheng[2] == 0);
    this.addCommand('熔炼',    'hecheng',$gameParty._hecheng[0] != 0 && $gameParty._hecheng[1] != 0 && $gameParty._hecheng[2] == 0 && $gameParty.hasItem($dataItems[40]) && hechengeYN);
	//this.addCommand('提取',    'tiqu',$gameParty._hecheng[2] != 0);
};
//-----------------------------------------------------------------------------
// Window_EquipAddSlot
//

function Window_EquipAddSlot() {
    this.initialize.apply(this, arguments);
}

Window_EquipAddSlot.prototype = Object.create(Window_Selectable.prototype);
Window_EquipAddSlot.prototype.constructor = Window_EquipAddSlot;

Window_EquipAddSlot.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = $gameParty.leader();
    this.refresh();
};

Window_EquipAddSlot.prototype.maxItems = function() {
    return 3;
};
Window_EquipAddSlot.prototype.numVisibleRows = function() {
    return 1;
};
Window_EquipAddSlot.prototype.maxCols = function() {
    return 3;
};
Window_EquipAddSlot.prototype.item = function() {
    return this._actor ? $gameParty._hecheng[this.index()] : null;
};

Window_EquipAddSlot.prototype.drawItem = function(index) {
    if (this._actor) {
        var rect = this.itemRect(index);
		var ww2 = rect.width;
		var item = $gameParty._hecheng[index];
		if (item) {
		  this.drawItemName(item, rect.x, rect.y, ww2);
		} else {
		  this.drawEmptySlot(rect.x , rect.y, ww2,index);
		}
    }
	this.drawIcon(1374, 206, 0); //+号
	//this.drawIcon(125, 240, 0);//等于号
	//this.drawIcon(124, 360, 0);//问号
};
Window_EquipAddSlot.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
    }
};
Window_EquipAddSlot.prototype.drawEmptySlot = function(wx, wy, ww,index) {
    this.changePaintOpacity(false);
    var ibw = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(16, wx + 2, wy + 2);
	this.changePaintOpacity(true);
};
Window_EquipAddSlot.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    rect.width = 36;
    rect.height = 36;
	rect.y = 0;
    if(index == 0)rect.x = 92;
	if(index == 1)rect.x = 314;
	if(index == 2)rect.x = 350;
    return rect;
};
Window_EquipAddSlot.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};
//-----------------------------------------------------------------------------
// Window_EquipAddItem
//

function Window_EquipAddItem() {
    this.initialize.apply(this, arguments);
}

Window_EquipAddItem.prototype = Object.create(Window_ItemList.prototype);
Window_EquipAddItem.prototype.constructor = Window_EquipAddItem;

Window_EquipAddItem.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._actor = $gameParty.leader();
	this.refresh();
};

Window_EquipAddItem.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_EquipAddItem.prototype.maxCols = function() {
    return 1;
};
Window_EquipAddItem.prototype.includes = function(item) {
    if (item === null) {
        return true;
    }
    if (item.etypeId < 0) {
        return false;
    }
	
    return item.baseItemId%4 == 0 && item.baseItemId<399 && item.paramsList.length == 4;//这里修改能合成的东西
};

Window_EquipAddItem.prototype.isEnabled = function(item) {
    return true;
};

Window_EquipAddItem.prototype.selectLast = function() {
};

Window_EquipAddItem.prototype.playOkSound = function() {
};


//=============================================================================
// Scene_EquipUp
//=============================================================================
function Scene_EquipUp() {
    this.initialize.apply(this, arguments);
}

Scene_EquipUp.prototype = Object.create(Scene_MenuBase.prototype);
Scene_EquipUp.prototype.constructor = Scene_EquipUp;

Scene_EquipUp.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	$gameParty.qianghua();
};

Scene_EquipUp.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createSlotWindow();
    this.createItemWindow();
	if (eval(GT.Param.OIWSceneShopSet.ShowWindow)) { 
	    this.getObjInfoWindowSet();
		this.createObjInfoWindow();
	}	
};

Scene_EquipUp.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_EquipUpCommand(400, 120, 240);
    this._commandWindow.setHandler('fangzhi', this.commandfangzhi.bind(this));
	this._commandWindow.setHandler('qianghua', this.commandqianghua.bind(this));
	this._commandWindow.setHandler('jinjie', this.commandjinjie.bind(this));
	this._commandWindow.setHandler('tiqu', this.commandtiqu.bind(this));
    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_EquipUp.prototype.commandfangzhi = function() {
    this._itemWindow.activate();
    this._itemWindow.select(0);
};

Scene_EquipUp.prototype.commandqianghua = function() {
	var item = $gameParty._qianghua[0];
	var effectItem = $dataItems[2];
	ItemManager.applyIUSEffects(item, effectItem);
	$gameParty.loseItem(effectItem, 1);
	this._commandWindow.refresh();
	this._slotWindow.refresh();
	this._commandWindow.activate();
};

Scene_EquipUp.prototype.commandjinjie = function() {
	var item = $gameParty._qianghua[0];
	var effectItem = $dataItems[13];
	ItemManager.applyIUSEffects(item, effectItem);
	$gameParty.loseItem(effectItem, 1);
	this._commandWindow.refresh();
	this._slotWindow.refresh();
	this._commandWindow.activate();
};

Scene_EquipUp.prototype.commandtiqu = function() {
    this._slotWindow.activate();
    this._slotWindow.select(0);
	this.onSlotOk();
};

Scene_EquipUp.prototype.createSlotWindow = function() {
    var wy = this._commandWindow.y + this._commandWindow.height;
    var ww = this._commandWindow.width;
    var wh = 36*4;
    this._slotWindow = new Window_EquipUpSlot(400, wy, ww, wh);
    this._slotWindow.setHandler('ok',       this.onSlotOk.bind(this));
    this._slotWindow.setHandler('cancel',   this.onSlotCancel.bind(this));
    this.addWindow(this._slotWindow);
};
Scene_EquipUp.prototype.onSlotOk = function() {
	$gameParty.gainItem(this._slotWindow.item(),1);	
	$gameParty._qianghua = [0];
	this._commandWindow.refresh();
	this._slotWindow.refresh();
	this._itemWindow.refresh();
	this.onSlotCancel();
	//this.popScene();
	//$gameTemp.reserveCommonEvent(99);//执行的公共事件ID
};
Scene_EquipUp.prototype.onSlotCancel = function() {
	this._commandWindow.activate();
	this._commandWindow.select(0)
	this._slotWindow.select(-1);
};
Scene_EquipUp.prototype.createItemWindow = function() {
    var wy = this._slotWindow.y+ this._slotWindow.height;
    var ww = this._commandWindow.width;
    var wh = 36*8;
    this._itemWindow = new Window_EquipUpItem(400, wy, ww, wh);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._slotWindow.setItemWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
};
Scene_EquipUp.prototype.onItemOk = function() {
    SoundManager.playEquip();
	var ee = $gameParty._qianghua;
	var ii = this._itemWindow.item();
	if(ee[0] != 0)$gameParty.gainItem(ee[0], 1);
	ee[0] = ii;
	if(ii==null)ee[0]=0;
	$gameParty.gainItem(ii, -1);	
	this._commandWindow.refresh();
    this._slotWindow.refresh();
    this._itemWindow.refresh();
	this.onItemCancel();
};
Scene_EquipUp.prototype.onItemCancel = function() {
	this._commandWindow.activate();
	this._commandWindow.select(0)
	this._itemWindow.select(-1);
};
//-----------------------------------------------------------------------------
// Window_EquipUpCommand

function Window_EquipUpCommand() {
    this.initialize.apply(this, arguments);
}

Window_EquipUpCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_EquipUpCommand.prototype.constructor = Window_EquipUpCommand;


Window_EquipUpCommand.prototype.windowWidth = function() {
    return 480;
};

Window_EquipUpCommand.prototype.maxCols = function() {
    return 4;
};
Window_EquipUpCommand.prototype.numVisibleRows = function() {
    return 1;
};
Window_EquipUpCommand.prototype.makeCommandList = function() {
	var qh = false;
	if($gameParty._qianghua[0] != 0 && $gameParty.hasItem($dataItems[2])&& $gameParty._qianghua[0].upgradeSlots >= 1) qh = true
	
	var jj = false;
	if($gameParty._qianghua[0] != 0 && $gameParty.hasItem($dataItems[13])&& ($gameParty._qianghua[0].boostCount+$gameParty._qianghua[0].upgradeSlots) < 20) jj = true
		
    this.addCommand('放置',   'fangzhi');
    this.addCommand('强化',   'qianghua',qh);
	this.addCommand('进阶',   'jinjie',jj);
	this.addCommand('提取',    'tiqu',$gameParty._qianghua[0] != 0);
};

//-----------------------------------------------------------------------------
// Window_EquipUpSlot

function Window_EquipUpSlot() {
    this.initialize.apply(this, arguments);
}

Window_EquipUpSlot.prototype = Object.create(Window_Selectable.prototype);
Window_EquipUpSlot.prototype.constructor = Window_EquipUpSlot;

Window_EquipUpSlot.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._actor = $gameParty.leader();
    this.refresh();
};

Window_EquipUpSlot.prototype.maxItems = function() {
    return 1;
};

Window_EquipUpSlot.prototype.itemRect = function(index) {
    var rect = new Rectangle();
    rect.width = 72;
    rect.height = 72;
	rect.x = 36
	rect.y = this.height/2 - 36;
    return rect;
};

Window_EquipUpSlot.prototype.item = function() {
    return this._actor ? $gameParty._qianghua[this.index()] : null;
};

Window_EquipUpSlot.prototype.drawItem = function(index) {
	var rect = this.itemRect(index);
	var item = $gameParty._qianghua[0];
	if(item){
	this.changeTextColor(this.systemColor())
	this.drawText($dataItems[2].name,180,0)
	this.drawText($dataItems[13].name,180,36)
	this.drawText('强化上限：',180,72)
	this.changeTextColor(this.normalColor())
	var bb = item.upgradeSlots;
	this.drawText($gameParty.numItems($dataItems[2]),280,0)
	this.drawText($gameParty.numItems($dataItems[13]),280,36)
	this.drawText(bb,280,72)
	}
	if (item) {
	  this.drawItemName(item, rect.x, rect.y, 480);
	} else {
	  this.drawEmptySlot(rect.x, rect.y, 480);
	}

};
Window_EquipUpSlot.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 4, y + 4);
		var itemb = item.id;
		if(item.baseItemId && !$gameSystem._drill_ITC_armors[itemb]) itemb = item.baseItemId;
		var cc = $gameSystem._drill_ITC_armors[itemb];//这里关羽颜色的
		this.changeTextColor(cc)
		this.drawText(item.name, x-240+36, y-36, width,'center');
		this.resetTextColor();
    }
};
Window_EquipUpSlot.prototype.drawEmptySlot = function(wx, wy, ww) {
    this.changePaintOpacity(false);
    var ibw = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.drawIcon(16, wx + 4, wy + 4);
	this.changePaintOpacity(true);
};

Window_EquipUpSlot.prototype.drawIcon = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y,pw*2,ph*2);
};

Window_EquipUpSlot.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

//-----------------------------------------------------------------------------
// Window_EquipUpItem
//

function Window_EquipUpItem() {
    this.initialize.apply(this, arguments);
}

Window_EquipUpItem.prototype = Object.create(Window_ItemList.prototype);
Window_EquipUpItem.prototype.constructor = Window_EquipUpItem;

Window_EquipUpItem.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this._actor = $gameParty.leader();
	this.refresh();
};

Window_EquipUpItem.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_EquipUpItem.prototype.maxCols = function() {
    return 1;
};
Window_EquipUpItem.prototype.includes = function(item) {
    if (item === null) {
        return true;
    }
    if (item.etypeId < 0) {
        return false;
    }
    return item.etypeId > 0 && item.atypeId > 0 && item.baseItemId<490;//这里修改可以强化的东西
};

Window_EquipUpItem.prototype.isEnabled = function(item) {
    return true;
};

Window_EquipUpItem.prototype.selectLast = function() {
};

Window_EquipUpItem.prototype.playOkSound = function() {
};