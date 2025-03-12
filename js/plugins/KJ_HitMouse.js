/*:
 * @plugindesc HitMouse v1.01.
 * @author Kong Jing
 *
 * @param GameTime
 * @desc the time of a game (seconds)
 * @default 30
 *
 * @param Message1
 * @desc the message of the first animal
 * @default 获得xxxxxxx
 *
 * @param Message2
 * @desc the message of the second animal
 * @default 获得xxxxxxx
 *
 * @param Message3
 * @desc the message of the third animal
 * @default 获得xxxxxxx
 *
 * @param Message4
 * @desc the message of the fourth animal
 * @default 获得xxxxxxx
 *
 * @param Message5
 * @desc the message of the fifth animal
 * @default 获得xxxxxxx
 *
 * @param Possibility1
 * @desc the possibility of the first animal
 * @default 10
 *
 * @param Possibility2
 * @desc the possibility of the second animal
 * @default 10
 *
 * @param Possibility3
 * @desc the possibility of the third animal
 * @default 10
 *
 * @param Possibility4
 * @desc the possibility of the fourth animal
 * @default 10
 *
 * @param Possibility5
 * @desc the possibility of the fifth animal
 * @default 10
 *
 * @param VariableId1
 * @desc the VariableId to save the hit count of the first animal
 * @default 1
 *
 * @param VariableId2
 * @desc the VariableId to save the hit count of the second animal
 * @default 1
 *
 * @param VariableId3
 * @desc the VariableId to save the hit count of the third animal
 * @default 1
 *
 * @param VariableId4
 * @desc the VariableId to save the hit count of the fourth animal
 * @default 1
 *
 * @param VariableId5
 * @desc the VariableId to save the hit count of the fifth animal
 * @default 1
 *
 * @param HitSound
 * @desc Se, when hit mouse.
 * @default
 *
 * @param NotHitSound
 * @desc Se, when not hit mouse.
 * @default
 *
 * @help
 * 参数说明：
 * GameTime 游戏时长，以秒为单位
 * Message1~5分别对应五种动物的游戏说明信息
 * Possibility1~5分别对应五种动物的出现可能性，具体几率为该动物Possibility除以总Possibility
 * VariableId1~5分别对应游戏结束后，将五种动物砸中次数存储的变量Id
 * HitSound可选，砸中音效
 * NotHitSound可选，砸却没砸中音效
 *
 * 使用方法
 * 插件命令
 * HitMouse
 * 如HitMouse
 *
 * 
 */

// Imported
var Imported = Imported || {};
Imported.KJ_HitMouse = true;

// Parameter Variables
var KJ = KJ || {};
KJ.HitMouse = KJ.HitMouse || {};

KJ.HitMouse.Parameters = PluginManager.parameters('KJ_HitMouse');
KJ.HitMouse.Param = KJ.HitMouse.Param || {};

KJ.HitMouse.Param.GameTime = parseInt(KJ.HitMouse.Parameters['GameTime']);
KJ.HitMouse.Param.Message = [];
KJ.HitMouse.Param.Possibility = [];
KJ.HitMouse.Param.VariableId = [];
for(var i = 1; i <= 5; i++){
	KJ.HitMouse.Param.Message.push(String(KJ.HitMouse.Parameters['Message' + i]));
	KJ.HitMouse.Param.Possibility.push(parseInt(KJ.HitMouse.Parameters['Possibility' + i]));
	KJ.HitMouse.Param.VariableId.push(parseInt(KJ.HitMouse.Parameters['VariableId' + i]));
};
KJ.HitMouse.Param.HitSound = String(KJ.HitMouse.Parameters['HitSound']);
KJ.HitMouse.Param.NotHitSound = String(KJ.HitMouse.Parameters['NotHitSound']);
KJ.HitMouse.picx = [264, 421, 586, 238, 421, 591, 233, 421, 609];
KJ.HitMouse.picy = [264, 263, 268, 342, 343, 342, 424, 429, 431];
// Interpreter
KJ.HitMouse.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	KJ.HitMouse.Game_Interpreter_pluginCommand.call(this, command, args);
	if (command === 'HitMouse') {
		SceneManager.push(Scene_HitMouse);
	}
};
Window_Base.prototype.standardFontFace = function() {
    if ($gameSystem.isChinese()) {
        return 'Zcoolkuaile, Heiti TC, sans-serif';
    } else if ($gameSystem.isKorean()) {
        return 'Dotum, AppleGothic, sans-serif';
    } else {
        return 'GameFont';
    }
};
ImageManager.loadHitMouse = function(filename, hue) {
	return this.loadBitmap('img/HitMouse/', filename, hue, true);
};
function Scene_HitMouse() {
    this.initialize.apply(this, arguments);
}
Scene_HitMouse.prototype = Object.create(Scene_Base.prototype);
Scene_HitMouse.prototype.constructor = Scene_HitMouse;
Scene_HitMouse.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
	this._start = true;
	this._startAnimation = false;
	this._totalTime = KJ.HitMouse.Param.GameTime * 60;
	this._time = 0;
	this._current = -1;
	this._result = true;
	this._animationTime = 30;
	this._sound1 = {"name":KJ.HitMouse.Param.HitSound,"pan":0,"pitch":100,"volume":90};
	this._sound2 = {"name":KJ.HitMouse.Param.NotHitSound,"pan":0,"pitch":100,"volume":90};
	this._scaleX = Graphics.boxWidth / 1280;
	this._scaleY = Graphics.boxHeight / 624;
	if(this._scaleX > this._scaleY){
		this._scaleX = this._scaleY;
	}
	else{
		this._scaleY = this._scaleX;
	}
	this._timeBitmap = ImageManager.loadHitMouse("time_roller");
	this._iconBitmap = ImageManager.loadHitMouse("icon");
	this._mouseBitmap = ImageManager.loadHitMouse("mouse");
	this._miniBitmap = ImageManager.loadHitMouse("mouse_icon");
	this._backgroundBitmap = ImageManager.loadHitMouse("bg_canvas");
	this._dizzyBitmap = ImageManager.loadHitMouse("star");
	this._hammerBitmap = ImageManager.loadHitMouse("hammer");
	this._hole = [];
	this._picIndex = [];
	this._timeLast = [];
	for(var i = 0; i < 9; i++){
		this._hole.push(-1);
		this._picIndex.push(0);
		this._timeLast.push(0);
	}
	this._possible = [];
	this._count = [];
	for(var i = 0; i < 5; i++){
		for(var j = 0; j < KJ.HitMouse.Param.Possibility[i]; j++){
			this._possible.push(i);
		}
		this._count.push(0);
		
	}
};
Scene_HitMouse.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.createSprite();
    this.createWindowLayer();
	// this.createMessageWindow();
};
Scene_HitMouse.prototype.adjustSprite = function(sprite) {
	sprite.scale.x = this._scaleX * 0.85;
	sprite.scale.y = this._scaleY * 0.85;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
	this.addChild(sprite);
};
Scene_HitMouse.prototype.createSprite = function(){
	this._backgroundSprite = new Sprite(null);
	this._backgroundSprite.bitmap = new Bitmap(750, 550);
	this._backgroundSprite.x = Graphics.boxWidth * 0.32;
	this._backgroundSprite.y = Graphics.boxHeight / 2.3;
	this.adjustSprite(this._backgroundSprite);
	
	this._helpSprite = new Sprite(ImageManager.loadHitMouse("help"));
	this._helpSprite.x = Graphics.boxWidth * 0.32;
	this._helpSprite.y = Graphics.boxHeight / 2.3;
	this.adjustSprite(this._helpSprite);
	
	this._timeSprite1 = new Sprite(null);
	this._timeSprite1.bitmap = new Bitmap(373, 70);
	this._timeSprite1.x = Graphics.boxWidth * 0.8;
	this._timeSprite1.y = Graphics.boxHeight * 0.5;
	this.adjustSprite(this._timeSprite1);
	
	this._timeSprite2 = new Sprite(null);
	this._timeSprite2.bitmap = new Bitmap(373, 60);
	this._timeSprite2.x = Graphics.boxWidth * 0.8;
	this._timeSprite2.y = Graphics.boxHeight * 0.5;
	this.adjustSprite(this._timeSprite2);
	
	this._messSprite = new Sprite(null);
	this._messSprite.bitmap = new Bitmap(100, 500);
	this._messSprite.x = Graphics.boxWidth * 0.8;
	this._messSprite.y = Graphics.boxHeight * 0.2;
	this.adjustSprite(this._messSprite);
	
	var name = ["_mouseSprite", "_dizzySprite"];
	for(var i = 0; i < 9; i++){
		for(var j = 0; j < 2; j++){
			this[name[j] + i] = new Sprite(null);
			this[name[j] + i].bitmap = new Bitmap(131, 140);
			this[name[j] + i].x = KJ.HitMouse.picx[i] * this._scaleX;
			this[name[j] + i].y = KJ.HitMouse.picy[i] * this._scaleY;
			this.adjustSprite(this[name[j] + i]);
		}
	}
	this._lowX = -60 * this._scaleX;
	this._highX = 20 * this._scaleX;
	this._lowY = -50 * this._scaleY;
	this._highY = 35 * this._scaleY;
	
	this._hammerSprite = new Sprite(null);
	this._hammerSprite.bitmap = new Bitmap(100 ,80);
	this._hammerSprite.anchor.x = 0.3;
	this._hammerSprite.anchor.y = 0.6;
	this.addChild(this._hammerSprite);
	
	this._resultSprite = new Sprite(null);
	this._resultSprite.bitmap = new Bitmap(500 ,50);
	this._resultSprite.x = Graphics.boxWidth * 0.7;
	this._resultSprite.y = Graphics.boxHeight * 0.1;
	this.adjustSprite(this._resultSprite);
	
	this._infoSprite = new Sprite(null);
	this._infoSprite.bitmap = new Bitmap(400, 80);
	this._infoSprite.x = Graphics.boxWidth / 2;
	this._infoSprite.y = Graphics.boxHeight / 2;
	this.adjustSprite(this._infoSprite);
};
Scene_HitMouse.prototype.drawMouseIcon = function(sprite, index, x, y){
	var sx = index * 50;
	var sy = 0;
	var size = 50;
	sprite.bitmap.blt(this._miniBitmap, sx, sy, size, size, x, y, size, size);
};
Scene_HitMouse.prototype.drawMouse = function(index){
	var sx = this._picIndex[index] * 131;
	var sy = this._hole[index] * 140;
	var sizeX = 131;
	var sizeY = 140;
	this._timeLast[index]++;
	if(this._timeLast[index] > 12 && this._picIndex[index] != 3){
		this["_mouseSprite" + index].bitmap.clear();
		this._hole[index] = -1;
		this._timeLast[index] = 0;
		return;
	}
	this["_mouseSprite" + index].bitmap.clear();
	this["_mouseSprite" + index].bitmap.blt(this._mouseBitmap, sx, sy, sizeX, sizeY, 0, 0, sizeX, sizeY);
	if(this._picIndex[index] === 3){
		this._hole[index] = -1;
		this._hammerSprite.bitmap.clear();
		this._hammerSprite.bitmap.blt(this._hammerBitmap, 100, 0, 100, 80, 0, 0, 100, 80);
		this.drawDizzy(index);
		this._timeLast[index] = 0;
	}

};
Scene_HitMouse.prototype.drawDizzy = function(index){
	var i = - this._hole[index] - 1;
	if(i === 3){
		this._hammerSprite.bitmap.clear();
		this._hammerSprite.bitmap.blt(this._hammerBitmap, 0, 0, 100, 80, 0, 0, 100, 80);
	}
	var sx = (i % 4) * 120;
	var sy = Math.floor(i / 4) * 70;
	var sizeX = 120;
	var sizeY = 70;
	this["_dizzySprite" + index].bitmap.clear();
	this["_dizzySprite" + index].bitmap.blt(this._dizzyBitmap, sx, sy, sizeX, sizeY, 5, 30, sizeX, sizeY);
};
Scene_HitMouse.prototype.showHelp = function(){
	var text = "地鼠出洞的瞬间将其击晕，根据被击晕种类获得相应奖励或惩罚。";
	this._helpSprite.bitmap.drawText(text, 100, 180, 600, 10, 'center');
	text = "按下确认键，或者点击开始游戏。";
	this._helpSprite.bitmap.drawText(text, 100, 500, 550, 10, 'center');
	for(var i = 0; i < 5; i++){
		this.drawMouseIcon(this._helpSprite, i, 140, 220 + i * 50);
		text = KJ.HitMouse.Param.Message[i];
		this._helpSprite.bitmap.drawText(text, 190, 245 + i * 50, 550, 10, 'left');
	}
};
Scene_HitMouse.prototype.start = function() {
    this._active = true;
	this._time = this._totalTime;
	this.showHelp();
	this._timeSprite1.bitmap.blt(this._timeBitmap, 0, 0, 373, 70, 0, 0, 373, 70);
	this._timeSprite1.bitmap.blt(this._timeBitmap, 0, 80, 373, 70, 0, 5, 373, 70);
	this._timeSprite2.bitmap.blt(this._timeBitmap, 0, 140, 373, 50, 0, 14, 373, 50);
	this._hammerSprite.bitmap.blt(this._hammerBitmap, 0, 0, 100, 80, 0, 0, 100, 80);
	this.updateResult();
	this._helpSprite.opacity = 255;
	KJ.HitMouse.Move = document.onmousemove;
	document.onmousemove = function(e){
       e = e || window.event;
       if(e.pageX || e.pageY)
       {
			KJ.HitMouse.x = Graphics.pageToCanvasX(e.pageX);
			KJ.HitMouse.y = Graphics.pageToCanvasY(e.pageY); 
       } 
	};
	KJ.HitMouse.MoveStyle = document.body.style.cursor;
	document.body.style.cursor = "none";
};
Scene_HitMouse.prototype.popScene = function() {
	document.onmousemove = KJ.HitMouse.Move;
	document.body.style.cursor = "auto";
	document.body.style.cursor = KJ.HitMouse.MoveStyle;
    SceneManager.pop();
};
Scene_HitMouse.prototype.update = function(){
	Scene_Base.prototype.update.call(this);
	var width = 373 * this._time / this._totalTime;
	if(this._start){
		if(this._startAnimation)
		{
			if(this._number === 210){
				this._infoSprite.bitmap.blt(this._iconBitmap, 450, 0, 50, 80, 175, 0, 50, 80);
			}
			else if(this._number === 150){
				this._infoSprite.bitmap.clear();
				this._infoSprite.bitmap.blt(this._iconBitmap, 390, 0, 50, 80, 175, 0, 50, 80);
			}
			else if(this._number === 90){
				this._infoSprite.bitmap.clear();
				this._infoSprite.bitmap.blt(this._iconBitmap, 330, 0, 50, 80, 175, 0, 50, 80);
			}
			else if(this._number === 30){
				this._infoSprite.bitmap.clear();
				this._infoSprite.bitmap.blt(this._iconBitmap, 0, 0, 320, 80, 40, 0, 320, 80);
			}
			else if(this._number === 0){
				this._infoSprite.bitmap.clear();
				this._start = false;
			}
			this._number--;
		}
		else if(TouchInput.isTriggered() || Input.isTriggered('ok')){
			this._backgroundSprite.bitmap.clear();
			this._backgroundSprite.bitmap.blt(this._backgroundBitmap, 0, 0, 750, 550, 0, 0, 750, 550);
			this._startAnimation = true;
			this._number = 210;
			this._helpSprite.opacity = 0;
		}
	}
	else{
		if(width > 68){
			this._time--;
			this._timeSprite2.bitmap.clear();
			this._timeSprite2.bitmap.blt(this._timeBitmap, 0, 140, width, 50, 0, 15, width, 50);
			this.updateControl();
			if(this._time % 10 === 0){
				this.updateMouse();
			}
			if(this._current != -1){
				var i = this._current;
				if(this._hole[i] != -1){
					this._picIndex[i] = 3;
					this._count[this._hole[i]]++;
					this.drawMouse(i);
					AudioManager.playSe(this._sound1);
					this.updateResult();
					this._hole[i] = -1;
				}
				else{
					AudioManager.playSe(this._sound2);
				}
				this._current = -1;
			}
		}
		else if(this._result){
			this._infoSprite.bitmap.blt(this._iconBitmap, 0, 100, 400, 70, 0, 0, 400, 70);
			this._result = false;
			this._stopTime = 60;
			for(var i = 0; i < 5; i++){
				$gameVariables.setValue(KJ.HitMouse.Param.VariableId[i], this._count[i]);
			}
		}
		else if(this._stopTime === 0){
				if(TouchInput.isTriggered() || Input.isTriggered('ok')){
					this.popScene();
				}
			}
		else {
			this._stopTime--;
			if(this._stopTime === 0){
				var text = "按下确认键，或者点击退出游戏。";
				this._backgroundSprite.bitmap.drawText(text, 100, 500, 550, 10, 'center');
			}
		}
	}
	this._hammerSprite.x = KJ.HitMouse.x;
	this._hammerSprite.y = KJ.HitMouse.y;
};
Scene_HitMouse.prototype.updateControl = function(){
	var deltax, deltay;
	if(TouchInput.isTriggered()){
		for(var i = 8; i >= 0; i--){
			deltax = TouchInput.x - KJ.HitMouse.picx[i] * this._scaleX;
			deltay = TouchInput.y - KJ.HitMouse.picy[i] * this._scaleY;
			if(deltax > this._lowX && deltax < this._highX && deltay < this._highY && deltay > this._lowY){
				this._current = i;
				KJ.HitMouse.x = TouchInput.x;
				KJ.HitMouse.y = TouchInput.y;
				break;
			}
		}
	}
	else AudioManager.playSe(this._sound2);
};
Scene_HitMouse.prototype.updateResult = function(){
	this._resultSprite.bitmap.clear();
	for(var i = 0; i < 5; i++){
		this.drawMouseIcon(this._resultSprite, i,  i * 100, 0);
		this._resultSprite.bitmap.drawText(this._count[i]+'', 50 + i * 100, 25, 50, 10, 'center');
	}
};
Scene_HitMouse.prototype.updateMouse = function(){
	for(var i = 0; i < 9; i++){
		if(this._picIndex[i] === 3){
			this._hole[i]--;
			this.drawDizzy(i);
			if(this._hole[i] === -13){
				this["_mouseSprite" + i].bitmap.clear();
				this["_dizzySprite" + i].bitmap.clear();
				this._picIndex[i] = 0;
			}
		}
		else if(this._hole[i] < 0){
			var random = Math.random();
			if(random < 0.07){
				random = Math.floor(Math.random() * this._possible.length);
				this._hole[i] = this._possible[random];
				this._picIndex[i] = 0;
				this.drawMouse(i);
				this._picIndex[i] = 1;
			}
		}
		else{
			this.drawMouse(i);
			this._picIndex[i]++;
			this._picIndex[i]%=3;
		}
	}
};