//=============================================================================
// Star_ItemTop.js
//=============================================================================
/*
* @plugindesc 背包道具置顶
* @author Star
*
* @help 
*
*/
var Star = Star || {};
Star.ItemTop = Star.ItemTop || {};
// 设置道具置顶
Star.ItemTop.Window_ItemActionCommand_prototype_addCancelCommand = Window_ItemActionCommand.prototype.addCancelCommand;
Window_ItemActionCommand.prototype.addCancelCommand = function() {
    if(DataManager.isItem(this._item)) this.addCommand("道具置顶", 'ItemToTop');
	Star.ItemTop.Window_ItemActionCommand_prototype_addCancelCommand.call(this);
};
Star.ItemTop.Scene_Item_createActionWindow = Scene_Item.prototype.createActionWindow;
Scene_Item.prototype.createActionWindow = function() {
  Star.ItemTop.Scene_Item_createActionWindow.call(this);
  this._itemActionWindow.setHandler('ItemToTop', this.onItemTop.bind(this));
};
Scene_Item.prototype.onItemTop = function() {
  $gameParty.TopItem = $gameParty.TopItem || [];
  if($gameParty.TopItem.indexOf(this.item().id) == -1){
  	$gameParty.TopItem.push(this.item().id);
	if($ && $.toaster) $.toaster({ message : '置顶完成'});
  }else{
	$gameParty.TopItem.remove(this.item().id);
	if($ && $.toaster) $.toaster({ message : '取消置顶'});
  }
  this._itemActionWindow.activate();
  this._itemActionWindow.refresh();
  this._itemWindow.refresh();
};

Star.ItemTop.Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
Window_ItemList.prototype.makeItemList = function() {
    $gameParty.TopItem = $gameParty.TopItem || [];
    Star.ItemTop.Window_ItemList_makeItemList.call(this);
	this.Top = [];
	var Length = this._data.length;
    for(var i = 0;i< Length;i++){
      if(this._data[i] && $gameParty.TopItem.indexOf(this._data[i].id) != -1){
		if(this._data[i].name.indexOf("[置顶]") == -1){
		  this._data[i].name += "[置顶]";
		}
        this.Top.push(this._data[i]);
        this._data.splice(i,1);
		Length--;
		i--;
      }else if(this._data[i]){
		  this._data[i].name = this._data[i].name.replace("[置顶]", "");
	  }
    };
    for(var i = 0;i< this.Top.length;i++){
      this._data.unshift(this.Top[i]);
	}
};