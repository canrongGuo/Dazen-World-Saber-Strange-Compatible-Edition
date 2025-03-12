//***********************自制战斗显示窗口******************************
//-----------------------------------------------------------------------------
//Window_BattlerMess
//
//战斗场景中，角色脚下的窗口

function Window_BattlerMess() {
 this.initialize.apply(this, arguments);
}

Window_BattlerMess.prototype = Object.create(Window_Base.prototype);
Window_BattlerMess.prototype.constructor = Window_BattlerMess;

Window_BattlerMess.prototype.initialize = function(battler,sprite) {
 var width = this.windowWidth();
 var height = this.windowHeight();
 this._data = [];
 this._battler = battler;
 this._sprite = sprite;
 this.setCalculationConstants();
 var offsetX = 128;
 if(battler.isActor()){
	offsetX *= -1;
 }
 //console.log(battler)
 //console.log(sprite)
 Window_Base.prototype.initialize.call(this, sprite.x + offsetX, sprite.y-height/2, width, height);
 this.setBackgroundType(2);//这里是设置窗口样式，0是默认WINODWS图片，1是带阴影，2是透明
 //this.opacity = 255;
 this.refresh();
};

Window_BattlerMess.prototype.windowWidth = function() {
 return 400;
};

Window_BattlerMess.prototype.windowHeight = function() {
 return this.fittingHeight(4);//这里修改窗口高度
};

Window_BattlerMess.prototype.refresh = function() {
 var x = this.textPadding();
 var width = this.contents.width - this.textPadding() * 2;
 this.contents.clear();
 //this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
 var battler = this._battler;
//这里设置4个数字位置和大小，测试的时候再弄
 this._text1 ="\\fs[16]"+this._battler.atk;
 this._text2 ="\\fs[16]"+this._battler.mat;
 this._text3 ="\\fs[16]"+this._battler.def;
 this._text4 ="\\fs[16]"+this._battler.mdf;
 this.drawTextEx(this._text1,22,24);
 this.drawTextEx(this._text2,77,24);
 this.drawTextEx(this._text3,22,55);
 this.drawTextEx(this._text4,77,55);
};

Window_BattlerMess.prototype.open = function() {
 this.refresh();
 Window_Base.prototype.open.call(this);
};

Window_BattlerMess.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!!this._battler) {
        this.updatePosition();
        //this.updateOpacity();
    }
};

//这里x,y可以调整整个窗口的相对位置
Window_BattlerMess.prototype.updatePosition = function () {
	var width = this.width;
	var height = this.height;
	var offsetX = -300;//这里修改窗口X轴位置
	var x = Graphics.width - width + offsetX;
	if(!this._battler.isActor()){
		x = -offsetX;
	}
	this.x = x + this._factorX;
	this.y = this._sprite.y + this._factorY-height/2+200;//这里修改窗口Y轴位置

	if(!this._battler.isActor()){//这里修改坐标
		this.x = 911;//敌人的
		this.y = -22;
	}else{
        this.x = 4;//玩家的
		this.y = 498;
	}
};

//这里的_factorX和_factorY可以调整虚弱窗口内容的相对位置
Window_BattlerMess.prototype.setCalculationConstants = function() {
    this._factorX = 0//-1 * Math.ceil(Graphics.boxWidth * 0.25);
   // this._factorY = -1 * Math.round(this.lineHeight() * 0.75);
    this._factorY = 0//36;
};

var yanLong = yanLong || {};
yanLong.PinZhaoUi = yanLong.PinZhaoUi || {};
yanLong.PinZhaoUi.Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;

Spriteset_Battle.prototype.createLowerLayer = function() {
	yanLong.PinZhaoUi.Spriteset_Battle_createLowerLayer.call(this);
    this.createBattleMessWindow();
};

Spriteset_Battle.prototype.createBattleMessWindow = function() {
	var spriteset = this;
	var actor = $gameParty.leader();
	var actorSprite = spriteset._actorSprites[0];
    this._abmWindow = new Window_BattlerMess(actor,actorSprite);
    
    var enemy = $gameTroop._enemies[0];
	var enemySprite = spriteset._enemySprites[0];
    this._ebmWindow = new Window_BattlerMess(enemy,enemySprite);
    
    this.addChild(this._ebmWindow);
    this.addChild(this._abmWindow);
};
/*
yanLong.PinZhaoUi.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
	yanLong.PinZhaoUi.Sprite_Battler_initMembers.call(this);
	this.createBattlerMessWindow();
};

Sprite_Battler.prototype.createBattlerMessWindow = function() {
this._battleMessWindow = new Window_BattlerMess(this._battler, this);
this._battleMessWindow._battler = this._battler;
this._battleMessWindow.refresh();
this.addChild(this._battleMessWindow);
};*/

/*
yanLong.PinZhaoUi.Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
	yanLong.PinZhaoUi.Sprite_Battler_setBattler.call(this, battler);
	if (!!this._battleMessWindow) {
	    this._battleMessWindow._battler=battler;
	}
	//console.log(battler)
};*/
yanLong.PinZhaoUi.Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function(){
	yanLong.PinZhaoUi.Scene_Battle_update.call(this);
	var sp = SceneManager._scene._spriteset;
	if(BattleManager._phase == 'input'){
		sp._abmWindow.show();
		sp._ebmWindow.show();
		if(Input.isPressed("left") || Input.isPressed("right") || Input.isPressed("up") || Input.isPressed("down")){
			sp._abmWindow.refresh();
			sp._ebmWindow.refresh();
		}
	}else{
		if(sp._abmWindow.visible == true) sp._abmWindow.show();//这里修改显示窗口时间点 hide隐藏 show显示
		if(sp._ebmWindow.visible == true) sp._ebmWindow.show();
	}
};


yanLong.PinZhaoUi.BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function(){
	yanLong.PinZhaoUi.BattleManager_startInput.call(this);
	var sp = SceneManager._scene._spriteset;
	sp._abmWindow.refresh();
	sp._ebmWindow.refresh();
	//$gameTemp._as = 0;
	//$gameTemp._es = 0;
};