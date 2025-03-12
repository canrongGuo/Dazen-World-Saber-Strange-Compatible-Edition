var krz = krz || {};
krz.menu_tip = krz.menu_tip || {};
krz.menu_tip = 0.02;
krz._mt = krz._mt || {};
krz._mt.Scene_Menu_create = Scene_Menu.prototype.create;
//=============================================================================
 /*:
 * @plugindesc v0.02  菜单里显示的神奇小提示。
 * 适用于1.5.1以及以上。
 * 
 * @author KRZ
 *
 * @param ---General---
 * @default
 *
 * @param tips on map
 * @type boolean
 * @on YES
 * @off NO
 * @desc 是否在地图上也显示
 *  NO - false     YES - true
 * @default false
 *
 * @param refresh time
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 刷新帧数
 * Default: 600
 * @default 600
 *
 * @param map x
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 地图上窗口x轴位置
 * Default: 500
 * @default 500
 *
 * @param map y
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 地图上窗口y轴位置
 * Default: 500
 * @default 500
 *
 * @param window x
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 窗口x轴位置
 * Default: 500
 * @default 500
 *
 * @param window y
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 窗口y轴位置
 * Default: 500
 * @default 500
 *
 * @param window height
 * @parent ---General---
 * @desc 窗口高度 可以是代码
 * Default: this.fittingHeight(1);
 * @default this.fittingHeight(1);
 *
 * @param window width
 * @parent ---General---
 * @desc 窗口宽度 可以是代码
 * Default: 240;
 * @default 240;
 *
 * @param tips
 * @parent ---General---
 * @type note[]
 * @desc 默认小提示数组
 * @default []
 *
 * @param length
 * @parent ---General---
 * @desc 默认随机数组长度,下面那句就是全部都会随机到的意思。
 * Default: this._list.length   你也可以设置为其他数字比如3，以后根据游戏进程加上去
 * @default this._list.length;  
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 每次刷新菜单/打开菜单时在指定位置会显示一个小贴士哟！
 * 贴士随机的数量可以通过修改$gameSystem._mtlength来控制，比如游戏解锁了什么东西，
 * 有10个贴士，默认长度是4时，只会显示前4个，但可以$gameSystem._mtlength+=1,使
 * 它变成5来随机更多个。
 *
 * $gameSystem._opentips 开关小贴士，$gameSystem._opentips = false则是关闭
 *
 *
 *
 */
//=============================================================================

//=============================================================================
// 
//=============================================================================
krz.Parameters = PluginManager.parameters('krz_menu_tips');
krz.Param = krz.Param || {};
krz.Param.tipsonmap = eval(String(krz.Parameters['tips on map']));
krz.Param.tipsrefresh = Number(krz.Parameters['refresh time']);
krz.Param.tipswindowx = Number(krz.Parameters['window x']);
krz.Param.tipswindowy = Number(krz.Parameters['window y']);
krz.Param.tipsmapx = Number(krz.Parameters['map x']);
krz.Param.tipsmapy = Number(krz.Parameters['map y']);
krz.Param.tipswindoww = String(krz.Parameters['window width']);
krz.Param.tipswindowh = String(krz.Parameters['window height']);
krz.Param.tipswindowtips = JSON.parse(krz.Parameters['tips']);
krz.Param.tipswindowlength = String(krz.Parameters['length']);

Scene_Menu.prototype.create = function() {
    krz._mt.Scene_Menu_create.call(this);
    this.createtipWindow();
};
Scene_Menu.prototype.createtipWindow = function() {
    this._tipWindow = new Window_tip(0, 0);
    this._tipWindow.y = krz.Param.tipswindowy;
	this._tipWindow.x = krz.Param.tipswindowx;
    this.addWindow(this._tipWindow);
};

krz._mt.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
  krz._mt.Scene_Map_createAllWindows.call(this);
  this.createmaptipsWindow();
};

Scene_Map.prototype.createmaptipsWindow = function() {
  this._tipsWindow = new Window_tip();
  this._tipsWindow.y = krz.Param.tipsmapy;
  this._tipsWindow.x = krz.Param.tipsmapx;
  this.addWindow(this._tipsWindow);
};


//-----------------------------------------------------------------------------
// Window_tip
//
// The window for displaying the party's tip.

function Window_tip() {
    this.initialize.apply(this, arguments);
}

Window_tip.prototype = Object.create(Window_Base.prototype);
Window_tip.prototype.constructor = Window_tip;

Window_tip.prototype.initialize = function(x, y) {
	this._refreshtime = 0;
    var width = eval(krz.Param.tipswindoww);
    var height = eval(krz.Param.tipswindowh);
	this._list = eval(krz.Param.tipswindowtips);
	$gameSystem._mtlength = $gameSystem._mtlength  || eval(krz.Param.tipswindowlength);
	this._index = Math.floor(Math.random()*$gameSystem._mtlength);
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Window_tip.prototype.windowWidth = function() {
    return eval(krz.Param.tipswindoww);
};

Window_tip.prototype.windowHeight = function() {
    return eval(krz.Param.tipswindowh);
};
krz._mt.Window_tip_update = Window_tip.prototype.update;
Window_tip.prototype.update = function(){
	krz._mt.Window_tip_update.call(this);
	this._refreshtime += 1;
	if(this._refreshtime>=krz.Param.tipsrefresh){
		this._refreshtime = 0;
		this._index = Math.floor(Math.random()*$gameSystem._mtlength);
		this.refresh();
	}	
	if(!krz.Param.tipsonmap && SceneManager._scene._tipsWindow){this.contents.clear();}
	if($gameSystem._opentips == false){this.contents.clear();}
}

Window_tip.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();
	if($gameSystem._opentips != false){
		if(krz.Param.tipsonmap && SceneManager._scene._tipsWindow){
	text = "金币："+$gameParty.gold()+"   体力："+$gameVariables.value(37);
	this.drawText(text, x, 0, width , 'center');
		}else if(!SceneManager._scene._tipsWindow){
	text = "金币："+$gameParty.gold()+"   体力："+$gameVariables.value(37);
	this.drawText(text, x, 0, width , 'center');			
		}
	}
};

Window_tip.prototype.open = function() {
	this._index = 0;
    this.refresh();
    Window_Base.prototype.open.call(this);
};




