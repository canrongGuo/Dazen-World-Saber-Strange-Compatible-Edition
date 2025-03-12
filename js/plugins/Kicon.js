Battle_Hud.prototype.create_states2 = function() {
	//我方状态图标窗口坐标
	var x = (Graphics.width - 500)/2;
	var y = Graphics.height/2 +100;	
	this._stateIconsWindow = new Window_StateIconsWindow(this._battler,x,y);
	this.addChild(this._stateIconsWindow);	

		//敌方状态图标窗口坐标
	var x2 = (Graphics.width - 500)/2;
	var y2 = Graphics.height/2 -275;	
	this._stateIconsWindow2 = new Window_StateIconsWindow($gameTroop.members()[0],x2,y2);
	
	this.addChild(this._stateIconsWindow2);
};

//=============================================================================
// Window_StateIconsWindow 
//=============================================================================

function Window_StateIconsWindow() {
    this.initialize.apply(this, arguments);
}

Window_StateIconsWindow.prototype = Object.create(Window_Base.prototype);
Window_StateIconsWindow.prototype.constructor = Window_StateIconsWindow;

Window_StateIconsWindow.prototype.initialize = function(battler,x,y) {
    Window_Base.prototype.initialize.call(this, x, y-16, 500, 70);
	this._battler = battler;
	//是否显示背景窗口
    this.opacity = 0;
};

Window_StateIconsWindow.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!!this._battler && !!this.tooltipWindow() && this.isMouseOverStates()) {
    this.updateStateIconTooltipWindow();
    }	
    this.refresh();
};
Window_StateIconsWindow.prototype.refresh = function() {
	this.contents.clear();//这里是修复没清除图标
    var icons = this._battler.allIcons();
    var ww = icons.length * Window_Base._iconWidth;
	this.drawActorIcons(this._battler, 0, 0, ww);

};