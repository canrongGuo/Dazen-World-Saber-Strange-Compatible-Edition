var RJO = RJO || {};
RJO.IQ = RJO.IQ || {};
RJO.IQ.version = 1.00;

// ItemQuality
//
// 物品品质
/*:
 * @plugindesc 物品品质系统
 * @author RJO (804173948)
 *
 * @param QualitiesName
 * @desc 品质名称
 * @default ["粗糙","平庸","普通","优良","完美","卓越","极品","传说"]

 * @param QualitiesColor
 * @desc 品质颜色
 * @default ['rgba(176,176,176,1)','rgba(255,255,255,1)','rgba(128,255,128,1)','rgba(128,128,255,1)','rgba(128,255,255,1)','rgba(255,128,255,1)','rgba(255,128,76,1)','rgba(255,255,0,1)']

 * @param DrawOutline
 * @desc 绘制边框（-1为不绘制，0为绘制内边框，1为绘制中边框，2为绘制外边框）
 * @default 1

 Item/Weapon/Armor/Skill 备注:
   <quality:数值>  品质编号（默认为0）
   eg. <quality:3>

 */

RJO.Parameters = PluginManager.parameters('ItemQuality');
RJO.Param = RJO.Param || {};

RJO.IQ.QualitiesName = String(RJO.Parameters['QualitiesName']);
RJO.IQ.QualitiesName = eval(RJO.IQ.QualitiesName);
RJO.IQ.QualitiesColor = String(RJO.Parameters['QualitiesColor']);
RJO.IQ.QualitiesColor = eval(RJO.IQ.QualitiesColor);
RJO.IQ.DrawOutline = Number(RJO.Parameters['DrawOutline']);

RJO.IQ.getItemExtraDescParams2 = RJO.HE.getItemExtraDescParams2;
RJO.HE.normalcolor = function(item){return RJO.IQ.QualitiesColor[item.meta.quality||0];}
RJO.HE.namecolor = function(item){return RJO.IQ.QualitiesColor[item.meta.quality||0];}
RJO.HE.getItemExtraDescParams2 = function(item,type){
    RJO.IQ.getItemExtraDescParams2.call(this,item,type);
    var text="<pos=AD text=品质："+RJO.IQ.QualitiesName[item.meta.quality||0]+" size=18 color=normalcolor line=false align=0>";
    this.processExtraDescParams(item,text);
}
Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        var color = RJO.IQ.QualitiesColor[item.meta.quality||0];
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.changeTextColor(color);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
        if(RJO.IQ.DrawOutline>=0){this.drawOutline(x + 2, y + 2, Window_Base._iconWidth, Window_Base._iconHeight, color, RJO.IQ.DrawOutline);}
    }
};

Sprite_ItemHelp.prototype.standardLineColor = function() {return this.item ? RJO.IQ.QualitiesColor[this.item.meta.quality||0] : RJO.HE.ItemDescLineColor;};

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

Sprite_ItemHelp.prototype.drawBackground = function(){
    RJO.SW.clear();
    if(RJO.HE.ItemDescLineColor == this.standardLineColor()){
        RJO.SW.drawFillRect(0,0,this.width,this.height,RJO.HE.ItemDescBackgroundColor,true, this.standardLineColor(),0);
    }else{
		if(typeof Star_ItemHelp !== 'undefined'){
			SceneManager._scene.removeChild(Star_ItemHelp);
			SceneManager._scene.removeChild(Star_ItemHelp1);
			SceneManager._scene.removeChild(Star_ItemHelp2);
			SceneManager._scene.removeChild(Star_ItemHelp3);
			// SceneManager._scene.removeChild(Star_ItemHelp4);
			// SceneManager._scene.removeChild(Star_ItemHelp5);
			// SceneManager._scene.removeChild(Star_ItemHelp6);
			// SceneManager._scene.removeChild(Star_ItemHelp7);
			// SceneManager._scene.removeChild(Star_ItemHelp8);
			// SceneManager._scene.removeChild(Star_ItemHelp9);
        };
		var Length = SceneManager._scene.children.length - 1;
        if(SceneManager._scene.constructor != Scene_Battle){
		Star_ItemHelp = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        SceneManager._scene.children.splice(Length,0,Star_ItemHelp);
        Star_ItemHelp.parent = SceneManager._scene;
		Star_ItemHelp1 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        SceneManager._scene.children.splice(Length,0,Star_ItemHelp1);
        Star_ItemHelp1.parent = SceneManager._scene;
		Star_ItemHelp2 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        SceneManager._scene.children.splice(Length,0,Star_ItemHelp2);
        Star_ItemHelp2.parent = SceneManager._scene;
		Star_ItemHelp3 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        SceneManager._scene.children.splice(Length,0,Star_ItemHelp3);
        Star_ItemHelp3.parent = SceneManager._scene;
		// Star_ItemHelp4 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        // SceneManager._scene.children.splice(Length,0,Star_ItemHelp4);
        // Star_ItemHelp4.parent = SceneManager._scene;
		// Star_ItemHelp5 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        // SceneManager._scene.children.splice(Length,0,Star_ItemHelp5);
        // Star_ItemHelp5.parent = SceneManager._scene;
		// Star_ItemHelp6 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        // SceneManager._scene.children.splice(Length,0,Star_ItemHelp6);
        // Star_ItemHelp6.parent = SceneManager._scene;
		// Star_ItemHelp7 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        // SceneManager._scene.children.splice(Length,0,Star_ItemHelp7);
        // Star_ItemHelp7.parent = SceneManager._scene;
		// Star_ItemHelp8 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        // SceneManager._scene.children.splice(Length,0,Star_ItemHelp8);
        // Star_ItemHelp8.parent = SceneManager._scene;
		// Star_ItemHelp9 = new Window_ItemHelp(Star_helpWindow.x-10, Star_helpWindow.y - 10, this.width + 20, this.height + 20, this.item.meta.quality);
        // SceneManager._scene.children.splice(Length,0,Star_ItemHelp9);
        // Star_ItemHelp9.parent = SceneManager._scene;
	    }
    }
};

function Window_ItemHelp() {
    this.initialize.apply(this, arguments);
};

Window_ItemHelp.prototype = Object.create(Window_Base.prototype);

Window_ItemHelp.prototype.constructor = Window_ItemHelp;

Window_ItemHelp.prototype.initialize = function (x, y, width, height, windowppng) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.loadWindowskin(windowppng);
    this.contents.paintOpacity = 255;
    this.backOpacity = 255;
    this.opacity = 255;
    this.openness = 255;
    this.hideBackgroundDimmer();
};

Window_ItemHelp.prototype.loadWindowskin = function(windowppng) {
	if(String(windowppng) == 'undefined'){
		windowppng = '';
	}
    this.windowskin = ImageManager.loadSystem('Window' + windowppng);
};
Window_ItemHelp.prototype.refreshDimmerBitmap = function() {
    if (this._dimmerSprite) {
        var bitmap = this._dimmerSprite.bitmap;
        var w = this.width;
        var h = this.height;
        bitmap.resize(w, h);
        this._dimmerSprite.setFrame(0, 0, w, h);
    }
};
Window_ItemHelp.prototype.setBackgroundType = function(type) {
    this.opacity = 255;
    this.hideBackgroundDimmer();
};
Window_ItemHelp.prototype.standardBackOpacity = function() {
    return 255;
};
Window_ItemHelp.prototype.updateBackOpacity = function() {
    this.backOpacity = 255;
};
Window_ItemHelp.prototype.translucentOpacity = function() {
    return 255;
};
Window_ItemHelp.prototype.changePaintOpacity = function() {
    this.contents.paintOpacity = 255;
};







