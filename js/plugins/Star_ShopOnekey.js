//=============================================================================
// Star_ShopOnekey.js
//=============================================================================
/*
* @plugindesc 商店界面添加一键卖出
* @author Star
*
* @help 
* 物品卖出以默认出售价格出售(无插件影响下MV默认原价1/2)
* 添加新按钮修改以下两个函数
* Window_OnekeySellCommand.prototype.makeCommandList
* Scene_Shop.prototype.createShopOnekeySellWindow
*
*/
var Star = Star || {};
Star.ShopOnekey = Star.ShopOnekey || {};
var Star_Scene_Shop_prototype_createCommandWindow =Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function() {
	Star_Scene_Shop_prototype_createCommandWindow.apply(this, arguments);
    this._commandWindow.setHandler('Onekeysell',   this.commandOnekeySell.bind(this));
    this.addWindow(this._commandWindow);
};

function Window_OnekeySellCommand() {
    this.initialize.apply(this, arguments);
}
Window_OnekeySellCommand.prototype = Object.create(Window_Command.prototype);
Window_OnekeySellCommand.prototype.constructor = Window_OnekeySellCommand;

Window_OnekeySellCommand.prototype.initialize = function() {
    var x = 350;
    var y = 300;
    Window_Command.prototype.initialize.call(this, x, y);
};
Window_OnekeySellCommand.prototype.makeCommandList = function () {
    this.addCommand('出售粗糙品质', 'Onekey0');
    this.addCommand('出售普通品质', 'Onekey1');
    this.addCommand('出售优秀品质', 'Onekey2');
    this.addCommand('出售精良品质', 'Onekey3');
    this.addCommand('出售史诗品质', 'Onekey4');
    this.addCommand('出售神器品质', 'Onekey5');
};

Scene_Shop.prototype.OnekeyWPSell = function(quality){
	//武器中含有<quality:quality>
	for (var i = 0; i < $dataWeapons.length; i++) {
        if ($dataWeapons[i] && $dataWeapons[i].meta.quality == quality) {
			// 物品拥有数
			// console.log($gameParty.numItems($dataWeapons[i]));
			this._item = $dataWeapons[i];
			if(this._item.price > 0 && this._item.name.indexOf("[锁定]") == -1){
				for (var aceq = 0; aceq < $gameParty.members().length; aceq++) {
					var aceqnum = 0;
				    //当前队伍  $gameParty.members()
					// console.log($gameActors.actor($gameParty.members()[aceq]._actorId).hasWeapon(this._item))
			    	if($gameActors.actor($gameParty.members()[aceq]._actorId).hasWeapon(this._item)){
						aceqnum += 1;
				    }
				}
				for(var sell = 0; sell < ($gameParty.numItems(this._item) - aceqnum); sell++){
				this.doSell(1);
				}
			}
        }
    };
	//防具中含有<quality:quality>
	for (var i = 0; i < $dataArmors.length; i++) {
        if ($dataArmors[i] && $dataArmors[i].meta.quality == quality) {
			// 物品拥有数
			// console.log($gameParty.numItems($dataArmors[i]));
			this._item = $dataArmors[i];
			if(this._item.price > 0 && this._item.name.indexOf("[锁定]") == -1){
				for (var aceq = 0; aceq < $gameParty.members().length; aceq++) {
					var aceqnum = 0;
				    //当前队伍  $gameParty.members()
					// console.log($gameActors.actor($gameParty.members()[aceq]._actorId).hasArmor(this._item))
			    	if($gameActors.actor($gameParty.members()[aceq]._actorId).hasArmor(this._item)){
						aceqnum += 1;
				    }
				}
				for(var sell = 0; sell < ($gameParty.numItems(this._item) - aceqnum); sell++){
				this.doSell(1);
				}
			}
        }
    };
	this.OnekeySellDe();
    this._goldWindow.refresh();
    this._statusWindow.refresh();
};

Scene_Shop.prototype.OnekeySellDe = function(){
	this._ShopOnekeySellWindow.hide();
	this._ShopOnekeySellWindow.deactivate();
	this.onBuyCancel();
};

var Star_Scene_Shop_prototype_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    Star_Scene_Shop_prototype_create.call(this);
        this.createShopOnekeySellWindow();
};
	
Scene_Shop.prototype.commandOnekeySell = function() {
    this._ShopOnekeySellWindow.show();
    this._ShopOnekeySellWindow.activate();
};

Scene_Shop.prototype.createShopOnekeySellWindow = function() {
    this._ShopOnekeySellWindow = new Window_OnekeySellCommand();
    this._ShopOnekeySellWindow.hide();
    this._ShopOnekeySellWindow.setHandler('Onekey0',     this.OnekeyWPSell.bind(this, 0));
    this._ShopOnekeySellWindow.setHandler('Onekey1',     this.OnekeyWPSell.bind(this,1));
    this._ShopOnekeySellWindow.setHandler('Onekey2',     this.OnekeyWPSell.bind(this,2));
    this._ShopOnekeySellWindow.setHandler('Onekey3',     this.OnekeyWPSell.bind(this,3));
    this._ShopOnekeySellWindow.setHandler('Onekey4',     this.OnekeyWPSell.bind(this,4));
    this._ShopOnekeySellWindow.setHandler('Onekey5',     this.OnekeyWPSell.bind(this,5));
    this._ShopOnekeySellWindow.setHandler('cancel',      this.OnekeySellDe.bind(this));
    this._ShopOnekeySellWindow.deactivate();
    this.addWindow(this._ShopOnekeySellWindow);
};

//var Star_Window_ShopCommand_prototype_maxCols = Window_ShopCommand.prototype.maxCols;
//Window_ShopCommand.prototype.maxCols = function() {
//    return Star_Window_ShopCommand_prototype_maxCols.call(this) + 1;
//};
//var Star_Window_ShopCommand_prototype_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
//Window_ShopCommand.prototype.makeCommandList = function() {
//	Star_Window_ShopCommand_prototype_makeCommandList.apply(this, arguments);
//    this.addCommand('一键出售',   'Onekeysell',   !this._purchaseOnly);
//};

// 存档清理调用
Star.SaveCdFileClear = function() {
	alert("存档垃圾数据清理开始");
	alert("重要:使用前请把所有仓库里的武器/防具取出, 否则后果自负");
	alert("重要:精简完成后请主动选择存档位进行存档");
	if(confirm("是否已完成前置操作")){
		Star.SaveCdFileClearStart();
	}
};
Star.SaveCdFileClearStart = function(){
	alert("开始载入存档文件");
	var a = DataManager.makeSaveContents();//JsonEx.parse(StorageManager.load(1));//
	alert("开始清理多余的武器数据.....请耐心等待....");
	clearWeapon(a);
	alert("开始清理多余的防具数据.....请耐心等待....");
	clearArmor(a);
	alert("精简完成,前往菜单进行云存档即可.");
	/*StorageManager.save(5, JsonEx.stringify(a));
	DataManager._lastAccessedId = 5;
    var globalInfo = DataManager.loadGlobalInfo() || [];
    globalInfo[5] = DataManager.makeSavefileInfo();
    DataManager.saveGlobalInfo(globalInfo);*/
};
// 存档清理函数
function clearArmor(f) {
	var h = 0;
	var k = f.armors;
	var c = f.party;
	var d = f.actors;
	for (var g = 0; g < k.length; g++) {
		if (k[g]) {
			var a = false;
			for (var e = 0; e < c._actors.length; e++) {
				if (hasArmor(d._data[c._actors[e]], k[g].id)) {
					a = true;
					break
				}
			}
			if (!a) {
				for (var b in c._armors) {
					if (k[g].id == b) {
						a = true;
						break
					}
				}
			}
			if (!a) {
				h++;
				k[g] = null
			}
		}
	}
	alert("成功清理掉了" + h + "件防具数据")
}
function hasArmor(b, c) {
	for (var a = 0; a < b._equips.length; a++) {
		if (b._equips[a]._dataClass != "weapon" && b._equips[a]._itemId == c) {
			return true
		}
	}
	return false
}
function hasWeapon(b, c) {
	for (var a = 0; a < b._equips.length; a++) {
		if (b._equips[a]._dataClass == "weapon" && b._equips[a]._itemId == c) {
			return true
		}
	}
	return false
}
function clearWeapon(f) {
	var h = 0;
	var k = f.weapons;
	var c = f.party;
	var d = f.actors;
	for (var g = 0; g < k.length; g++) {
		if (k[g]) {
			var a = false;
			for (var e = 0; e < c._actors.length; e++) {
				if (hasWeapon(d._data[c._actors[e]], k[g].id)) {
					a = true;
					break
				}
			}
			if (!a) {
				for (var b in c._weapons) {
					if (k[g].id == b) {
						a = true;
						break
					}
				}
			}
			if (!a) {
				h++;
				k[g] = null
			}
		}
	}
	alert("成功清理掉了" + h + "件武器数据")
}

// 设置装备锁定
Star.ShopOnekey.Window_ItemActionCommand_prototype_addCancelCommand = Window_ItemActionCommand.prototype.addCancelCommand;
Window_ItemActionCommand.prototype.addCancelCommand = function() {
    /* if(DataManager.isEquip(this._item)) */ this.addCommand("出售锁定", 'ToLockEq');
	Star.ShopOnekey.Window_ItemActionCommand_prototype_addCancelCommand.call(this);
};
Star.ShopOnekey.Scene_Item_createActionWindow = Scene_Item.prototype.createActionWindow;
Scene_Item.prototype.createActionWindow = function() {
  Star.ShopOnekey.Scene_Item_createActionWindow.call(this);
  this._itemActionWindow.setHandler('ToLockEq', this.onSetLock.bind(this));
};
Scene_Item.prototype.onSetLock = function() {
	$gameParty.ItemSpLock = $gameParty.ItemSpLock || [];
	if(DataManager.isItem(this.item())){
      if($gameParty.ItemSpLock.indexOf(this.item().id) == -1){
     	$gameParty.ItemSpLock.push(this.item().id);
  	    this.item().name += "[锁定]";
      }else{
	    $gameParty.ItemSpLock.remove(this.item().id);
	    this.item().name = this.item().name.replace("[锁定]", "");
	  }
	}else{
	  if(this.item().name.indexOf("[锁定]") == -1){
  	    this.item().name += "[锁定]";
	    if($ && $.toaster) $.toaster({ message : '锁定完成'});
      }else{
	    this.item().name = this.item().name.replace("[锁定]", "");
	    if($ && $.toaster) $.toaster({ message : '取消锁定'});
      }
	}
      
  this._itemActionWindow.activate();
  this._itemActionWindow.refresh();
  this._itemWindow.refresh();
};

Star.ShopOnekey.Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
Window_ItemList.prototype.makeItemList = function() {
    $gameParty.ItemSpLock = $gameParty.ItemSpLock || [];
    Star.ShopOnekey.Window_ItemList_makeItemList.call(this);
	// this.LockItem = [];
	var Length = this._data.length;
    for(var i = 0;i< Length;i++){
      if(this._data[i] && $gameParty.ItemSpLock.indexOf(this._data[i].id) != -1){
		if(this._data[i].name.indexOf("[锁定]") == -1){
		  this._data[i].name += "[锁定]";
		}
        // this.LockItem.push(this._data[i]);
        // this._data.splice(i,1);
		// Length--;
		// i--;
      }else if(this._data[i]){
		if(DataManager.isItem(this._data[i])) this._data[i].name = this._data[i].name.replace("[锁定]", "");
	  }
    };
    // for(var i = 0;i< this.LockItem.length;i++){
      // this._data.unshift(this.LockItem[i]);
	// }
};
Star.ShopOnekey.Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
Scene_Shop.prototype.onSellOk = function() {
    if(this._sellWindow.item().name.indexOf("[锁定]") == -1){
		Star.ShopOnekey.Scene_Shop_onSellOk.call(this);
	}else{
		if($ && $.toaster) $.toaster({ message : '已锁定 无法出售'});
		this._sellWindow.activate();
	}
};