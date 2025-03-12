 //===============================================================================
 //===============================================================================
 /*:
 * @plugindesc  内置<接金币>小游戏。
 *
 * @author 芯☆淡茹水
 * 
 * @help ____________________________________________________________________
 *1，插件命令： 进入接金币场景：Receive_Gold
 * 
 *              改变背景图片：Rv_Back 图片名
 *                           注：命令 Rv_Back 后面一个空格接着是背景图片名，
 *                           图片名不要打引号。 背景图片为工程目录 img/battlebacks1
 *                           的背景图片，也可自己制作相同格式图片，
 *                           存到 img\battlebacks1 目录下。
 *                                             
 *              改变地面类型：Rv_Floor 编号
 *                          注：格式同上面。编号为 1-3，分别为游戏UI图片下面的三种地面。
 *____________________________________________________________________
 *2，关于背景音乐 ：可以在进入 接金币 游戏前播放BGM，
 *                               该游戏内就不提供背景音乐的播放。
 *____________________________________________________________________
 *3，        其它 ：进行 接金币 游戏的角色始终为队伍第一人。
 *
 *                               进行游戏 接金币 需要的条件可以在事件中设置。
 *                               
 *                               游戏结束后，分数会代入变量，需要给予奖励可根据变量判断。
 *                               
 *                               MV默认动画实在不适合用于接到物件时显示，若不想播放动画
 *                               可以在设置里写 0 。自己做的动画，效果肯定很好。
 *____________________________________________________________________
 * 
 *---------------------------------------------------------------
 * @param varId
 * @desc 游戏结束后，该场积分所代入的变量ID。
 * @default 10
 *---------------------------------------------------------------
 * @param messPos
 * @desc 显示信息的窗口位置。靠左：0 ; 靠右：1 。
 * @default 1
 *---------------------------------------------------------------
 * @param difficultyTime
 * @desc 每隔多少时间增加一次难度（物件添加频率和落下速度，单位：秒）。
 * @default 30
 *---------------------------------------------------------------
 * @param anm1
 * @desc 接到1号物件“镰刀”所显示的动画ID。
 * @default 16
 *---------------------------------------------------------------
 * @param anm2
 * @desc 接到2号物件“炸弹”所显示的动画ID。
 * @default 66
 *---------------------------------------------------------------
 * @param anm3
 * @desc 接到3号物件“小金币”所显示的动画ID。
 * @default 97
 *---------------------------------------------------------------
 * @param anm4
 * @desc 接到4号物件“大金币”所显示的动画ID。
 * @default 97
 *---------------------------------------------------------------
 * @param anm5
 * @desc 接到5号物件“钱袋”所显示的动画ID。
 * @default 97
 *---------------------------------------------------------------
 * @param anm6
 * @desc 接到6号物件“宝石”所显示的动画ID。
 * @default 97
 *---------------------------------------------------------------
 * @param anm7
 * @desc 接到7号物件“医疗”所显示的动画ID。
 * @default 41
 *---------------------------------------------------------------
 * @param anm8
 * @desc 接到8号物件“骷髅”所显示的动画ID。
 * @default 59
 */
 //========================================================================
(function() {
var XdrsRvGoldDate = XdrsRvGoldDate || {};
var xrpepr = PluginManager.parameters('Receive_gold');
XdrsRvGoldDate.varId = parseInt(xrpepr['varId']) || 50;
XdrsRvGoldDate.mesX = parseInt(xrpepr['messPos']) || 0;
XdrsRvGoldDate.dfTime = parseInt(xrpepr['difficultyTime']) || 30;
XdrsRvGoldDate.anms = [];
XdrsRvGoldDate.anms.push(parseInt(xrpepr['anm1']) || 0);
XdrsRvGoldDate.anms.push(parseInt(xrpepr['anm2']) || 0);
XdrsRvGoldDate.anms.push(parseInt(xrpepr['anm3']) || 0);
XdrsRvGoldDate.anms.push(parseInt(xrpepr['anm4']) || 0);
XdrsRvGoldDate.anms.push(parseInt(xrpepr['anm5']) || 0);
XdrsRvGoldDate.anms.push(parseInt(xrpepr['anm6']) || 0);
XdrsRvGoldDate.anms.push(parseInt(xrpepr['anm7']) || 0);
XdrsRvGoldDate.anms.push(parseInt(xrpepr['anm8']) || 0);
//===================================================================
var XdrsRvGinPluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    XdrsRvGinPluginCommand.call(this, command, args);
    if (command === 'Receive_Gold') {SceneManager.goto(Scene_RvGold);}
    if (command === 'Rv_Back') {
        var name = args || 'Sky';
        $gameSystem.setRvGoldBack(name);}
    if (command === 'Rv_Floor') {
        var index = parseInt(args) || 1;
        index = Math.max(index, 1);
        $gameSystem.setFloorType(index);}
};
//===================================================================
Game_System.prototype.rvGoldBack = function() {
    return this._rvGoldBack || 'Sky';
};
Game_System.prototype.setRvGoldBack = function(name) {
    this._rvGoldBack = name;
};
Game_System.prototype.iniAcSpeed = function() {
    this._acSpeed = 2;
};
Game_System.prototype.acSpeed = function() {
    return this._acSpeed;
};
Game_System.prototype.addAcSpeed = function() {
    this._acSpeed++;
};
Game_System.prototype.rvFloorType = function() {
    return this._floorType || 0;
};
Game_System.prototype.setFloorType = function(type) {
    this._floorType = type-1;
    this._floorType = Math.max(this._floorType, 0);
};
//===================================================================
function Scene_RvGold() {
    this.initialize.apply(this, arguments);
}
Scene_RvGold.prototype = Object.create(Scene_Base.prototype);
Scene_RvGold.prototype.constructor = Scene_RvGold;

Scene_RvGold.prototype.initialize = function() {
    this._uiName = 'Ui_Receive_gold';
    this._hp = 100;
    this._gold = 0;
    this._data = 0;
    this._index = 0;
    this._tipWindow = null;
    this._articles = [];
    this._createSpeed = 10;
    this._dfTime = XdrsRvGoldDate.dfTime * 60;
    this._count = -180;
    this._onOver = false;
    $gameSystem.iniAcSpeed();
    Scene_Base.prototype.initialize.call(this);
};
Scene_RvGold.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.centerRectes();
    this.centerBack();
    this.centerWindows();
};
Scene_RvGold.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
};
Scene_RvGold.prototype.centerBack = function() {
    this._back = new Sprite(ImageManager.loadBattleback1($gameSystem.rvGoldBack(),0));
    this._road1 = new Sprite(ImageManager.loadPicture(this._uiName));
    this._road2 = new Sprite(ImageManager.loadPicture(this._uiName));
    var ny = $gameSystem.rvFloorType() * 90 + 460;
    this._road1.setFrame(0, ny, 500, 90);   
    this._road2.setFrame(0, ny, 500, 90);
    this._road1.move(0,535); this._road2.move(500,535);
    this.addChild(this._back);
    this.addChild(this._road1);
    this.addChild(this._road2);  
};
Scene_RvGold.prototype.centerRectes = function() {
    this._mesRect       = new Rectangle(0,0,160,460);
    this._tipRect       = new Rectangle(160,0,200,210);
    this._pauseRect     = new Rectangle(160,360,172,38);
    this._continueRect1 = new Rectangle(361,0,56,30);
    this._continueRect2 = new Rectangle(361,30,56,30);
    this._exitRect1     = new Rectangle(361,60,56,30);
    this._exitRect2     = new Rectangle(361,90,56,30);
    this._overRect      = new Rectangle(160,398,178,24);
    this._numRect       = new Rectangle(160,422,82,22);
    this._surRect       = new Rectangle(26,128,56,30);
    this._celRect1      = new Rectangle(120,128,56,30);
    this._celRect2      = new Rectangle(70,128,56,30);
    this._titRect       = new Rectangle(202,210,230,100);
};
Scene_RvGold.prototype.centerWindows = function() {
    var mx = XdrsRvGoldDate.mesX === 0 ? 5 : 645;
    var tx = XdrsRvGoldDate.mesX === 0 ? 365 : 200;
    this._mesWindow = new Xr_RvWindow(mx, 8, this._uiName, this._mesRect);
    this._titWindow = new Xr_RvWindow(tx, 210, this._uiName, this._titRect);
    this._mesWindow.setTxtSize(20);
    this.showMess();
    this._rver = new Sprite_Rver();
    this.addChild(this._mesWindow);
    this.addChild(this._titWindow);
    this.addChild(this._rver);
};
Scene_RvGold.prototype.showMess = function() {
    this._mesWindow.clear();
    this._mesWindow.setTxtColor(24);
    this._mesWindow.drawText(String(this._hp),62,348,80,24,'right');
    this._mesWindow.setTxtColor(6);
    this._mesWindow.drawText(String(this._gold),62,386,80,24,'right');
};
Scene_RvGold.prototype.centerTip = function() {  
    this._tipWindow = new Xr_RvWindow(300, 160, this._uiName, this._tipRect);
    this.showPause();  
    this.addChild(this._tipWindow);
};
Scene_RvGold.prototype.removeTip = function() {
    this.removeChild(this._tipWindow);
    this._tipWindow = null;
};
Scene_RvGold.prototype.randNum = function(min, max) { 
    var r1 = max - min, r2 = Math.random();   
    return (Math.round(r2 * r1) + min);   
};
Scene_RvGold.prototype.minX = function() { 
    return XdrsRvGoldDate.mesX === 0 ? 165 : 0;   
};
Scene_RvGold.prototype.maxX = function() { 
    return XdrsRvGoldDate.mesX === 0 ? (810 - 32) : (810 - 165 - 32);  
};
Scene_RvGold.prototype.centerArticles = function() {
     var type = this.centerType();
     var ax = this.randNum(this.minX(), this.maxX());
     var aic = new Rv_Article(type, ax);
     this._articles.push(aic);
     this.addChild(aic);
};
Scene_RvGold.prototype.deleteArticles = function(act) {
    act.hide();
    var index = this._articles.indexOf(act);
    this._articles.splice(index,act);
    this.removeChild(act);
};
Scene_RvGold.prototype.centerType = function() {
     var num = this.randNum(0, 100);
     switch (true) {
     case num >= 0 && num < 2    :return 6;
     case num >= 2 && num < 6    :return 5;
     case num >= 6 && num < 14   :return 7;
     case num >= 14 && num < 26  :return 4;
     case num >= 26 && num < 42  :return 3;
     case num >= 42 && num < 62  :return 2;
     case num >= 62 && num < 76  :return 1;
     case num >= 76 && num < 101 :return 0;
     }
};
Scene_RvGold.prototype.setDifficulty = function() {
    $gameSystem.addAcSpeed();
    this._createSpeed -= 1;
    this._createSpeed = Math.max(this._createSpeed, 1);
};
Scene_RvGold.prototype.update = function() {
    if (this._titWindow.visible && this._count === 0){this._titWindow.hide();}
    if (this._tipWindow){this.updateShow();return;}
    this._count++;
    if (this._count >= 0){
        this.updateInput();
        if (this._count % this._createSpeed === 0){this.centerArticles();}
        if (this._count % this._dfTime === 0){this.setDifficulty();}
    }
    this.updateArticles();
    Scene_Base.prototype.update.call(this);
};
Scene_RvGold.prototype.updateArticles = function() {
    if (this._articles === []) {return;}
    for (var i=0; i< this._articles.length;i++) {
        var act = this._articles[i];
        if (act.y > 700){this.deleteArticles(act); continue;}
        if (this._rver.touchAct(act)){this.applyEffect(act);this.deleteArticles(act);}
    }
};
Scene_RvGold.prototype.applyEffect = function(act) {
    this._rver.setAnm(act.anmId());
    switch (true) {
        case act.type() === 0 : this._hp -= 10;break;
        case act.type() === 1 : this._hp -= 50;break;
        case act.type() === 2 : this._gold += 5;break;
        case act.type() === 3 : this._gold += 10;break;
        case act.type() === 4 : this._gold += 50;break;
        case act.type() === 5 : this._gold += 100;break;
        case act.type() === 6 : this._hp += 100;break;
        case act.type() === 7 : this._gold -= 100;this._hp -= 30;break;
    }
    this._gold = Math.max(0, this._gold);
    this._hp = Math.min(Math.max(0, this._hp), 100);
    if (this._dataHp !== this._hp || this._dataGold !== this._gold) {
        this._dataHp = this._hp;
        this._dataGold = this._gold;
        this.showMess();
    }
    if (this._hp === 0){this.gameOver();}
};
Scene_RvGold.prototype.updateShow = function() {
    if (!this._onOver) {
        if (this.inputSur(this._surRect)) {
            if (this._index > 0) {this._index = 0;}
            else {SoundManager.playOk();this.removeTip();return;}
        }
        if (this.inputSur(this._celRect1)) {
            if (this._index === 0) {this._index = 1;}
            else {SoundManager.playOk();this.gameOver();return;}
        }
        if (Input.isRepeated('ok')) {
            if (this._index === 0) {SoundManager.playOk();this.removeTip();return;}
            else {SoundManager.playOk();this.gameOver();return;}
        }
        if (Input.isRepeated('left')) {this._index -= 1;}
        if (Input.isRepeated('right')) {this._index += 1;}
    }
    else { if (this.inputSur(this._celRect2) || Input.isRepeated('ok')) {
           SoundManager.playOk();this.exit();}
    }
    if (this._index < 0) {this._index = 1;}
    if (this._index > 1) {this._index = 0;}
    if (this._data !== this._index) {
        this._data = this._index;
        SoundManager.playCursor();
        this.showIndex();
    } 
};
Scene_RvGold.prototype.inputSur = function(rect) {
    return this._tipWindow.touchedInRect(rect) && TouchInput.isTriggered();
};
Scene_RvGold.prototype.updateInput = function() {
    if (TouchInput.isCancelled() || Input.isRepeated('cancel')) {
        SoundManager.playCancel();
        this.centerTip();
    }
};
Scene_RvGold.prototype.showPause = function() {
    if (!this._onOver){this._tipWindow.bltBitmap(15, 50, this._pauseRect);}
    this.showIndex();
};
Scene_RvGold.prototype.showIndex = function() {
    if (this._onOver){
    this._tipWindow.bltBitmap(10, 45, this._overRect);
    this._tipWindow.bltBitmap(10, 80, this._numRect);
    this._tipWindow.setTxtSize(16);
    this._tipWindow.setTxtColor(6);
    this._tipWindow.drawText(String(this._gold),100,80,90,20,'left');
    this._tipWindow.bltBitmap(70, 128, this._exitRect1);
    }
    else {var cont = this._index === 0 ? this._continueRect1 : this._continueRect2;
    var exit = this._index === 1 ? this._exitRect1 : this._exitRect2;
    this._tipWindow.bltBitmap(26, 128, cont);
    this._tipWindow.bltBitmap(120, 128, exit);}
};
Scene_RvGold.prototype.gameOver = function() {
    this._onOver = true;
    if (this._tipWindow){this.removeTip();}
    this.centerTip();
};
Scene_RvGold.prototype.exit = function() {
    $gameVariables.setValue(XdrsRvGoldDate.varId, this._gold);
    SceneManager.goto(Scene_Map);
};
//======================================================================
//======================================================================
function Sprite_Rver() {
    this.initialize.apply(this, arguments);
}
Sprite_Rver.prototype = Object.create(Sprite_Base.prototype);
Sprite_Rver.prototype.constructor = Sprite_Rver;
Sprite_Rver.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this._pattern = 1;
    this._direction = 6;
    this._count = 10;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._destination = 0;
    this._anmId = 0;
    var ax = XdrsRvGoldDate.mesX === 0 ? 500 : 330;
    this.move(ax, 540);
    this.setBitmap();  
};
Sprite_Rver.prototype.characterName = function() {
    return $gameParty.leader().characterName();
};
Sprite_Rver.prototype.characterIndex = function() {
    return $gameParty.leader().characterIndex();
};
Sprite_Rver.prototype.setBitmap = function() {
    this.bitmap = ImageManager.loadCharacter(this.characterName());
    this._isBigCharacter = ImageManager.isBigCharacter(this.characterName());
    this.updateFrame();
};
Sprite_Rver.prototype.updateFrame = function() {
    var addx = parseInt(this.characterIndex() % 4) * this.bitmap.width / 4;
    var addy = parseInt(this.characterIndex() / 4) * this.bitmap.height / 2;
    if (this._isBigCharacter){addx = 0; addy = 0;}
    var pw = this.patternWidth();
    var ph = this.patternHeight();
    var sx = this.characterPatternX() * pw + addx;
    var sy = this.characterPatternY() * ph + addy;
    this.setFrame(sx, sy, pw, ph);
};
Sprite_Rver.prototype.characterPatternX = function() {
    return this._pattern;
};
Sprite_Rver.prototype.characterPatternY = function() {
    return (this._direction - 2) / 2;
};
Sprite_Rver.prototype.patternWidth = function() {
    if (this._isBigCharacter) {return this.bitmap.width / 3;}
    else {return this.bitmap.width / 12;}
};
Sprite_Rver.prototype.patternHeight = function() {
    if (this._isBigCharacter) {return this.bitmap.height / 4;}
    else {return this.bitmap.height / 8;}
};
Sprite_Rver.prototype.setAnm = function(anmId) {
    this._anmId = anmId;
};
Sprite_Rver.prototype.anmPlay = function() {
    var animation = $dataAnimations[this._anmId];
    this.startAnimation(animation, true, 0);
    this._anmId = 0;
};
Sprite_Rver.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateInput();
    if (this._dataDc !== this._direction){
        this._dataDc = this._direction;
        this.updateFrame();
    }
    if (this._destination > 0){this.autoMove();}
    if (this.moveing()) {this.setMove();}
    else {this.setStop();}
    if (this._anmId > 0){this.anmPlay();}
};
Sprite_Rver.prototype.updateInput = function() {
    if (Input.isPressed('left')){
        this._destination = 0;
        this._direction = 4;
        this.updateMove(-3);}
    else if (Input.isPressed('right')){
        this._destination = 0;
        this._direction = 6;
        this.updateMove(3);}
    else {if (TouchInput.isTriggered() && !this.txInThis(TouchInput.x)){this.setDestination();}}
};
Sprite_Rver.prototype.moveing = function() {
    return (this._destination > 0 || Input.isPressed('left') ||
            Input.isPressed('right'));
};
Sprite_Rver.prototype.setMove = function() {
    this._count = (this._count + 1) % 45;
   if (this._dataCount !== parseInt(this._count / 15)) {
        this._pattern = this._dataCount = parseInt(this._count / 15);
        this.updateFrame();
    }
};
Sprite_Rver.prototype.setStop = function() {
    this._count = 29;
    this._pattern = 1;
    this.updateFrame();
};
Sprite_Rver.prototype.updateMove = function(num) {
    if (this.isMaxX() && Input.isPressed('right') ||
        this.isMinX() && Input.isPressed('left')){return;}
    this.x += num;
};
Sprite_Rver.prototype.autoMove = function() {
    if (this.txInThis(this._destination)){this._destination = 0; return;}
    if (this.isMinX() && this._destination < this.x) {
        this._destination = 0;
        return;
    }
    if (this.isMaxX() && this._destination > this.x) {
        this._destination = 0;
        return;
    }
    var num = (this._destination - this.x) > 0 ? 3 : -3;
    this._direction = (this._destination - this.x) > 0 ? 6 : 4;
    this.updateMove(num);
};
Sprite_Rver.prototype.isMinX = function() {
    var minx = XdrsRvGoldDate.mesX === 0 ? 165 : 0;
    return (this.x - this.patternWidth() / 2) <= minx;
};
Sprite_Rver.prototype.isMaxX = function() {
    var maxx = XdrsRvGoldDate.mesX === 0 ? 820 : (820-165);
    return (this.x + this.patternWidth() / 2) >= maxx;
};
Sprite_Rver.prototype.touchAct = function(act) {
    if (!act.visible){return false;}
    var minx = this.x - this.patternWidth() / 2 + 5,
    maxx = this.x + this.patternWidth() / 2 - 5,
    miny = this.y - this.patternHeight() + 5, maxy = this.y;
    if (minx > act.x+32 || maxx < act.x) {return false;}
    if (miny > act.y+32 || maxy < act.y) {return false;}
    return true;
};
Sprite_Rver.prototype.txInThis = function(tx) {
    var minX = this.x - this.patternWidth() / 2,
    maxX = this.x + this.patternWidth() / 2;
    return (tx >= minX && tx < maxX);
};
Sprite_Rver.prototype.setDestination = function() {
    this._destination = TouchInput.x;
};
Sprite_Rver.prototype.touchX = function(mx) {
    if (mx > this.x){return this.x + this.patternWidth();}
    else {return this.x - this.patternWidth();}
    return null;
};
//======================================================================
function Rv_Article() {
    this.initialize.apply(this, arguments);
}
Rv_Article.prototype = Object.create(Sprite.prototype);
Rv_Article.prototype.constructor = Rv_Article;
Rv_Article.prototype.initialize = function(type, ax) {
    Sprite.prototype.initialize.call(this);
    this._type = type;
    this._rect = new Rectangle(162,315,32,32);
    this._rect.x += this._type * 32;
    this.move(ax, -32);
    this.setBitmap();
    this.setFarm();
};
Rv_Article.prototype.hide = function() {
    this.visible = false;
};
Rv_Article.prototype.type = function() {
    return this._type;
};
Rv_Article.prototype.anmId = function() {
    return XdrsRvGoldDate.anms[this._type] || 0;
};
Rv_Article.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateMove();
};
Rv_Article.prototype.updateMove = function() {
    this.y += this.speed();
};
Rv_Article.prototype.speed = function() {
    return $gameSystem.acSpeed() + this.speedAdd();
};
Rv_Article.prototype.speedAdd = function() {
    return[0.4,0,0,0.6,1,1.5,2.5,1][this._type];
};
Rv_Article.prototype.setBitmap = function() {
    this.bitmap = ImageManager.loadPicture('Ui_Receive_gold');
};
Rv_Article.prototype.setFarm = function() {
    this.setFrame(this._rect.x, this._rect.y, this._rect.width, this._rect.height);
};
//======================================================================
function Xr_RvWindow() {
    this.initialize.apply(this, arguments);
}
Xr_RvWindow.prototype = Object.create(Sprite.prototype);
Xr_RvWindow.prototype.constructor = Xr_RvWindow;
Xr_RvWindow.prototype.initialize = function(x, y, uiName, rect) {
    Sprite.prototype.initialize.call(this);
    this.move(x, y);
    this._uiName = uiName;
    this.windowskin = ImageManager.loadSystem('Window');
    this.setBitmap();
    this.setRect(rect);
    this.createContents(rect);
};
Xr_RvWindow.prototype.createContents = function(rect) {
    this.contents = new Sprite(new Bitmap(rect.width, rect.height));
    this.addChild(this.contents);
};
Xr_RvWindow.prototype.update = function() {
   Sprite.prototype.update.call(this);
};
Xr_RvWindow.prototype.setBitmap = function () {
    this.bitmap = ImageManager.loadPicture(this._uiName);
};
Xr_RvWindow.prototype.setRect = function(rect) {
    this.setFrame(rect.x, rect.y, rect.width, rect.height);
};
Xr_RvWindow.prototype.show = function() {
    this.visible = this.contents.visible = true;
};
Xr_RvWindow.prototype.hide = function() {
    this.visible = this.contents.visible = false;
};
Xr_RvWindow.prototype.clear = function() {
    this.contents.bitmap.clear();
};
Xr_RvWindow.prototype.setTxtSize = function(n) {
    this.contents.bitmap.fontSize = n;
};
Xr_RvWindow.prototype.setTxtColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    var color = this.windowskin.getPixel(px, py);
    this.contents.bitmap.textColor = color;
};
Xr_RvWindow.prototype.drawText = function(text, x, y, width, height, align) {
    this.contents.bitmap.drawText(text, x, y, width, height, align);
};
Xr_RvWindow.prototype.bltBitmap = function(x, y, rect) {
    var bitmap = ImageManager.loadPicture(this._uiName);
    this.contents.bitmap.blt(bitmap, rect.x, rect.y, rect.width, rect.height, x, y);
};
Xr_RvWindow.prototype.touchedInRect = function(rect) {
    var x = rect.x + this.x,  y = rect.y + this.y,
    maxX = x + rect.width,  maxY = y + rect.height;
    return TouchInput.x >= x && TouchInput.y >= y && TouchInput.x < maxX && TouchInput.y < maxY;
};
Xr_RvWindow.prototype.touchedInThis = function() {
    var x = this.canvasToLocalX(TouchInput.x);
    var y = this.canvasToLocalY(TouchInput.y);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};
Xr_RvWindow.prototype.canvasToLocalX = function(x) {
    var node = this;
    while (node) {
        x -= node.x;
        node = node.parent;
    }
    return x;
};
Xr_RvWindow.prototype.canvasToLocalY = function(y) {
    var node = this;
    while (node) {
        y -= node.y;
        node = node.parent;
    }
    return y;
};
})();
//================================================================
//================================================================