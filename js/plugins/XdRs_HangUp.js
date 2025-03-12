//==================================================================================================================
// Hang up
//==================================================================================================================
/*:
 * @plugindesc 真·在线挂机
 * 
 * @author 芯☆淡茹水
 * 
 * @help 
 * 〓 插件命令 〓
 * 1，启用挂机功能 => EnableHangUp
 *
 * 2，禁用挂机功能 => ProhibitHangUp
 *
 * 〓 说明 〓
 * 1，该挂机系统在点击挂机时，会记录角色位置，以该位置为原点，在设置的挂机半径内随机移动遇敌（暗雷怪）或
 *    主动靠近并触发进入范围内的敌人事件（明雷怪）。
 *
 * 2，在地图编辑里没有设置敌人（暗雷怪）的情况下，战斗完成后，角色会自动回到原点。
 *
 * 3，地图上明暗两种类型敌人都没有时，无法启动挂机。
 *
 * 4，地图上同时设置两种类型敌人（暗雷怪+明雷怪），挂机并无影响。
 *
 * 5，判定为明雷怪的事件需要四个条件：
 *    A：事件必须为 可见的 （当前事件页有行走图，并且未 暂时移除 的）。
 *    B：事件需备注 => <Enemy>
 *    C：事件当前页必须有一项为 战斗事件 项 。
 *    D：事件触发条件为：与角色接触 或 与事件接触 。
 *
 * 6，挂机时的战斗AI，为系统自带的自动战斗AI。若工程里有某类自动战斗AI插件，并且插件写法正常，
 *    衔接上默认系统接口，将会以插件的AI来战斗。
 *
 * 7，明雷怪挂机时，角色锁定了一个敌人事件并往其移动，在 (挂机范围 * 1) 秒内未接触到锁定的事件时，该事件会在
 *    往后的 60 + (挂机范围 * 1) 秒内判别为 不是敌人事件 ，时间过后(不包括中途战斗时间)恢复其 是敌人事件 的判断。
 *    该功能杜绝了一些因地形环境而无法接触的敌人事件，锁定它后无法接触到且又无法解除锁定后选择其他敌人事件，
 *    一直锁定一个无法接触的敌人事件，从而导致挂机无效果的情况。
 * 
 * @param keyVal
 * @desc 挂机快捷键键值（例：键盘G键是：71，其他请自行百度键盘各个按键键值）。
 * @default 71
 *
 * @param waitCount
 * @desc 为减少帧率消耗，每隔多少帧搜寻一次明雷怪敌人（最小 1 帧）。
 * @default 10
 *
 * @param maxRange
 * @desc 挂机时角色最大侦测/随机移动的范围半径（格）。
 * @default 20
 *
 * @param messageCount
 * @desc 自动战斗时，信息窗口显示时间（帧）。
 * @default 60
 *
 * @param saveId
 * @desc 开启自动储存后，储存的档位ID。
 * @default 1
 * 
 * @param saveMnt
 * @desc 开启自动储存后，间隔多少时间储存一次（分钟， 最低 1 分钟）。
 * @default 10
 *
 * @param saveWord
 * @desc 自动储存后的提示用语。
 * @default \c[1]游戏已经储存！
 *
 * @param uiPath
 * @desc UI图片储存路径。
 * @default img/pictures
 *
 * @param nmText
 * @desc 当前地图没有敌人的提示用语。
 * @default \c[2]这个地图没有敌人 \i[84]！
 *
 * @param huY
 * @desc 挂机提示界面 Y 坐标。
 * @default 100
 *
 * @param hu0pacity
 * @desc 挂机提示界面透明度。
 * @default 160
 *
 * @param huColor
 * @desc 挂机提示界面文字颜色（格式：红,绿,蓝）。
 * @default 255,100,0
 * 
 * @param huWord
 * @desc 挂机提示界面语言。
 * @default 挂机中.....
 *
 * @param tipPlace
 * @desc 挂机快捷界面位置（格式：x,y）。
 * @default 20,10
 * 
 * @param tipWord
 * @desc 挂机快捷界面用语。
 * @default 开启/关闭挂机:G
 *
 * @param tipColor
 * @desc 挂机快捷界面文字颜色（格式：红,绿,蓝）。
 * @default 0,200,0
 *
 * @param rcColor
 * @desc 设置界面描绘范围方格的颜色。（格式：红,绿,蓝）
 * @default 255,0,200
 *
 * @param WDrange
 * @desc 挂机范围的选项名与说明。（格式： 选项名:选项说明）
 * @default 挂机范围:挂机时角色随机移动/侦测范围半径。
 *
 * @param WDshowInter
 * @desc 挂机快捷界面的选项名与说明。（格式： 选项名:选项说明）
 * @default 快捷界面:是否显示快捷界面。
 *
 * @param WDfastFt
 * @desc 挂机快速战斗的选项名与说明。（格式： 选项名:选项说明）
 * @default 快速战斗:是否快速战斗。
 *
 * @param WDdeathStop
 * @desc 挂机死亡停止的选项名与说明。（格式： 选项名:选项说明）
 * @default 死亡停止:队伍任一队员死亡，是否停止挂机。
 *
 * @param WDautoSave
 * @desc 挂机自动储存的选项名与说明。（格式： 选项名:选项说明； \f：设置的存档ID。）
 * @default 自动储存:挂机时，是否自动储存游戏到 \f 号档位。
 *
 * @param WDRareEscape
 * @desc 遇到稀有逃跑的选项名与说明。（格式： 选项名:选项说明）
 * @default 稀有逃跑:遇到稀有怪物，是否逃跑。
 *
 * @param WDUnprecedentedEscape
 * @desc 遇到前所未有的选项名与说明。（格式： 选项名:选项说明）
 * @default 前所未有逃跑:遇到前所未有怪物，是否逃跑。
 *
 * @param WDCommonEscape
 * @desc 遇到普通怪的选项名与说明。（格式： 选项名:选项说明）
 * @default 小怪逃跑:遇到普通怪物，是否逃跑。
 *
 * @param WDSetSkilllist
 * @desc 设置技能使用的次数的选项名与说明。（格式： 选项名:选项说明）
 * @default 技能次数:设置技能使用的次数。
 *
 * @param WDSetSkillNum
 * @desc 设置技能使用的顺序的选项名与说明。（格式： 选项名:选项说明）
 * @default 技能顺序:设置技能使用的顺序。
 *
 * @param WDAutomaticMedication
 * @desc 设置战斗结束吃药顺序的选项名与说明。（格式： 选项名:选项说明）
 * @default 自动吃药:设置战斗结束药品的使用顺序。
 *
 * @param WDAutomaticSellWeapon
 * @desc 设置战斗结束自动出售的选项名与说明。（格式： 选项名:选项说明）
 * @default 自动卖出:设置战斗结束自动卖出武器。
 *
 * @param WDDropShield
 * @desc 设置战斗结束屏蔽掉落的选项名与说明。（格式： 选项名:选项说明）
 * @default 屏蔽掉落:挂机战斗不掉落白蓝绿装备。
*/
//==================================================================================================================
;var XdRsData = XdRsData || {};
var Star = Star || {};
Star.XdRsData_hangUp = Star.XdRsData_hangUp || {};
Star.XdRsData_hangUp.ActSkilltemporary = Star.XdRsData_hangUp.ActSkilltemporary || {};// 使用顺序-临时
XdRsData.hangUp = {};
XdRsData.hangUp.parameters = PluginManager.parameters('XdRs_HangUp');
XdRsData.hangUp.saveSec    = Math.max(1, +XdRsData.hangUp.parameters['saveMnt'] || 1) * 3600;
//==================================================================================================================
// 增加挂机快捷按键。
Input.keyMapper[+XdRsData.hangUp.parameters['keyVal']] = 'HangUp';
//==================================================================================================================
// 读取游戏后，关闭挂机。
XdRsData.hangUp.DMMloadGame = DataManager.loadGame;
DataManager.loadGame = function(savefileId) {
	var isLoad = XdRsData.hangUp.DMMloadGame.call(this, savefileId);
	isLoad && $gameParty.clearHangUpData();
	return isLoad;
};
//==================================================================================================================
// 获取UI图片名。
XdRsData.hangUp.uiName = function() {
	return 'Ui_HangUp';
};
// 获取UI图像。
XdRsData.hangUp.getImage = function() {
	var path = ''+(this.parameters['uiPath'] || 'img/pictures')+'/';
	return ImageManager.loadBitmap(path, this.uiName(), 0, true);
};
// 依照挂机状态与间隔时间判断是否可储存。
XdRsData.hangUp.canSave = function() {
	if (!$gameParty.isHangUp()) return false;
	var count = $gameParty.hangUpCount();
	return count >= this.saveSec && !(count % this.saveSec);
};
// 挂机的 开/关 。
XdRsData.hangUp.set = function() {
	$gameParty.isHangUp() ? $gameParty.stopHangUp() : $gameParty.readyStart();
};
// 信息提示。
XdRsData.hangUp.tip = function(sym) {
	$gameMessage.hangUpTip(this.parameters[sym]);
};
// 两点 X 方向距离。
XdRsData.hangUp.distanceX = function(x, ox) {
	return Math.abs(x - ox);
};
// 两点 Y 方向距离。
XdRsData.hangUp.distanceY = function(y, oy) {
	return Math.abs(y - oy);
};
// 判断敌人事件是否在范围内。
XdRsData.hangUp.enemyInRange = function(event) {
	var range = $gameParty.hangUpData().range;
	var ox = $gameParty.hangUpData().origin[0];
	var oy = $gameParty.hangUpData().origin[1];
	return this.inRange(ox, oy, event.x, event.y, range);
};
XdRsData.hangUp.inRange = function(ox, oy, x, y, range) {
	return (this.distanceX(x, ox) + this.distanceY(y, oy)) <= range;
};
// 当前地图所有敌人事件。
XdRsData.hangUp.allEnemyEvents = function() {
	return $gameMap.events().filter(function(e){return e.isHangUpEnemy();});
};
// 判断侦测的间隔时间。
XdRsData.hangUp.needFind = function() {
	var count = Math.max(+this.parameters['waitCount'], 1);
	return !(Graphics.frameCount % count);
};
// 获取离角色最近的敌人事件。
XdRsData.hangUp.recentEnemy = function() {
	if (!this.needFind() || !$gameParty.isHangUp() || !$gameMap.hasSurfaceEnemy()) return null;
	var events = this.allEnemyEvents().filter(function(e){return this.enemyInRange(e);}, this);
	if (!events.length) return null;
	return events.sort(function(e1, e2){
		var r1 =  Math.abs($gamePlayer.x - e1.x) + Math.abs($gamePlayer.y - e1.y);
		var r2 =  Math.abs($gamePlayer.x - e2.x) + Math.abs($gamePlayer.y - e2.y);
		return r1 - r2;
	}).shift();
};
// 获取设置项用语。
XdRsData.hangUp.getOptWord = function(sym) {
	return this.parameters['WD'+sym] || '';
};
// 图块宽。
XdRsData.hangUp.tileWidth = function() {
	return $gameMap ? $gameMap.tileWidth() : 48;
};
// 图块高。
XdRsData.hangUp.tileHeight = function() {
	return $gameMap ? $gameMap.tileHeight() : 48;
};
// X方向图块数。
XdRsData.hangUp.latticeX = function() {
	return Math.floor(Graphics.boxWidth / this.tileWidth());
};
// Y方向图块数。
XdRsData.hangUp.latticeY = function() {
	return Math.floor(Graphics.boxHeight / this.tileHeight());
};
// 挂机范围窗口宽。
XdRsData.hangUp.srWidth = function() {
	return Graphics.boxWidth * 2 / 3;
};
// 挂机范围窗口高。
XdRsData.hangUp.srHeight = function() {
	return Graphics.boxHeight * 2 / 3;
};
// 挂机列表窗口宽。
XdRsData.hangUp.listWidth = function() {
	return Graphics.boxWidth - this.srWidth();
};
// 挂机范围的位图，描绘好范围方格后直接 blt 到显示窗口里。
XdRsData.hangUp.rangeBitmap = function() {
	if (!SceneManager.hangUpBitmap()) return null;
	var bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
	this.drawLattice(bitmap);
	return bitmap;
};
// 描绘当前范围方格。
XdRsData.hangUp.drawLattice = function(bitmap) {
	var x = 0, y = 0, maxX = this.latticeX(), maxY = this.latticeY();
	for (var i=0;i<maxX;i++){
		for (var j=0;j<maxY;j++){
			if (!this.isRangeRect(i, j)) continue;
			var rx = i * this.tileWidth(), ry = j * this.tileHeight();
			this.drawRect(rx, ry, bitmap);
		}
	}
};
// 判断方格坐标是否在范围内。
XdRsData.hangUp.isRangeRect = function(i, j) {
	var px = $gameMap.adjustX($gamePlayer.x);
	var py = $gameMap.adjustY($gamePlayer.y);
	if (i === px && j === py) return false;
	var range = $gameParty.hangUpData().range;
	return this.inRange(px, py, i, j, range);
};
// 描绘方格。
XdRsData.hangUp.drawRect = function(x, y, bitmap) {
	if (x < 0 || y < 0) return;
	var w = this.tileWidth() - 2;
	var h = this.tileHeight() - 2;
	var color = this.parameters['rcColor'] || '255,0,200';
    bitmap.fillRect(x,y,w,h,'rgba('+color+',0.5)');
};
//==================================================================================================================
// 截取专门用于挂机设置的地图背景。
SceneManager.snapForHangUp = function() {
    this._hangUpBitmap = this.snap();
};
// 获取地图背景。
SceneManager.hangUpBitmap = function() {
    return this._hangUpBitmap;
};
//==================================================================================================================
// 快速战斗时，跳过开始的信息。
XdRsData.hangUp.BMdisplayStartMessages = BattleManager.displayStartMessages;
BattleManager.displayStartMessages = function() {
    !$gameParty.isFastFighting() && XdRsData.hangUp.BMdisplayStartMessages.call(this);
};
// 快速战斗时，跳过胜利的信息。
XdRsData.hangUp.BMdisplayVictoryMessage = BattleManager.displayVictoryMessage;
BattleManager.displayVictoryMessage = function() {
    !$gameParty.isFastFighting() && XdRsData.hangUp.BMdisplayVictoryMessage.call(this);
};
// 快速战斗时，跳过失败的信息。
XdRsData.hangUp.BMdisplayDefeatMessage = BattleManager.displayDefeatMessage;
BattleManager.displayDefeatMessage = function() {
    !$gameParty.isFastFighting() && XdRsData.hangUp.BMdisplayDefeatMessage.call(this);
};
// 快速战斗时，跳过获得物品的信息。
XdRsData.hangUp.BMdisplayRewards = BattleManager.displayRewards;
BattleManager.displayRewards = function() {
    !$gameParty.isFastFighting() && XdRsData.hangUp.BMdisplayRewards.call(this);
};
//==================================================================================================================
// 挂机总时间数记录（帧数），可用于数据统计，实际中并没有什么卵用。
Game_System.prototype.hangUpTimeTotal = function() {
    return this._hangUpTimeTotal || 0;
};
// 增加挂机总时间数。
Game_System.prototype.addHangUpTime = function(count) {
    this._hangUpTimeTotal = this._hangUpTimeTotal || 0;
	this._hangUpTimeTotal += count;
};
//==================================================================================================================
// 挂机提示。
Game_Message.prototype.hangUpTip = function(text) {
	if (!text) return;
	this.setPositionType(1);
    this.add(text);
};
//==================================================================================================================
// 挂机时，判别为 自动战斗。
XdRsData.hangUp.GBBisAutoBattle = Game_BattlerBase.prototype.isAutoBattle;
Game_BattlerBase.prototype.isAutoBattle = function() {
    return $gameParty.isHangUp() || XdRsData.hangUp.GBBisAutoBattle.call(this);
};
//==================================================================================================================
// 判断当前地图是否有敌人。
Game_Map.prototype.hasEnemy = function() {
    return this.hasSurfaceEnemy() || this.hasSecretEnemy();
};
// 判断当前地图是否有 明雷怪 敌人。
Game_Map.prototype.hasSurfaceEnemy = function() {
    return this.events().some(function(e){return e.isHangUpEnemy();});
};
// 判断当前地图是否有 暗雷怪 敌人。
Game_Map.prototype.hasSecretEnemy = function() {
    return this.encounterList().length > 0;
};
//==================================================================================================================
// 初始化挂机各种数据。
XdRsData.hangUp.GPinitialize = Game_Party.prototype.initialize;
Game_Party.prototype.initialize = function() {
    XdRsData.hangUp.GPinitialize.call(this);
	this._huSaveData = false;
	this._hangUpCount = 0;
	this.setHangUpSwitch(true);
	this.initHangUpData();
};
// 初始化挂机基本数据。
Game_Party.prototype.initHangUpData = function() {
    this._hangUpData = {};
	this._hangUpData.state     = false;
	this._hangUpData.range     = 10;
	this._hangUpData.origin    = null;
	this._hangUpData.showInter = true;
	this._hangUpData.fastFt    = false;
	this._hangUpData.deathStop = true;
	if (Utils.isNwjs()){
		this._hangUpData.autoSave  = true;
	}else{
		this._hangUpData.autoSave  = false;
	}
	this._hangUpData.RareEscape = false;
	this._hangUpData.UnprecedentedEscape  = false;
	this._hangUpData.CommonEscape  = false;
	this._hangUpData.DropShield = false;
};
// 挂机禁用/启用开关。
Game_Party.prototype.hangUpSwitch = function() {
    return this._hangUpSiwitch;
};
// 设置挂机禁用/启用开关。
Game_Party.prototype.setHangUpSwitch = function(state) {
    this._hangUpSiwitch = state;
};
// 获取挂机基本数据。
Game_Party.prototype.hangUpData = function() {
    return this._hangUpData;
};
// 挂机持续时间（帧）。
Game_Party.prototype.hangUpCount = function() {
    return this._hangUpCount;
};
// 再次锁定持续时间。
Game_Party.prototype.relockingCount = function() {
    return this._hangUpData.range * 60;
};
// 判断是否在挂机中。
Game_Party.prototype.isHangUp = function() {
    return this._hangUpSiwitch && this._hangUpData.state &&
	this._hangUpData.origin;
};
// 是否显示地图快捷界面。
Game_Party.prototype.isInterShow = function() {
    return this._hangUpSiwitch && this._hangUpData.showInter;
};
// 是否快速战斗。
Game_Party.prototype.isFastFighting = function() {
    return this.isHangUp() && this._hangUpData.fastFt;
};
// 是否屏蔽掉落。
Game_Party.prototype.isDropShield = function() {
    return this.isHangUp() && this._hangUpData.DropShield;
};
XdRsData.hangUp._Game_Enemy_prototype_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
	var r = XdRsData.hangUp._Game_Enemy_prototype_makeDropItems.call(this);
	if($gameParty.isDropShield() && r.length > 0){
		for(var i = 0;i < r.length;i++){
			if((DataManager.isWeapon(r[i]) || DataManager.isArmor(r[i])) && (r[i].meta.quality == '1' || r[i].meta.quality == '2' || r[i].meta.quality == '3')){
				r.remove(r[i]);
				i--;
				if(r.length == 0) break;
			}
		}
	}
	return r;
}
// 是否需要结束挂机(用于队伍成员死亡结束)。
Game_Party.prototype.needStopHangUp = function() {
    return this._hangUpData.deathStop && !!this.deadMembers().length;
};
// 是否需要自动储存。
Game_Party.prototype.needAutoSave = function() {
    if (!this._hangUpData.autoSave) return false;
	var count = XdRsData.hangUp.saveMnt * 3600;
	return this._hangUpCount >= count && !(this._hangUpCount % count);
};
// 设置挂机基本数据。
Game_Party.prototype.setHangUpData = function(key, val) {
    try{
		this._hangUpData[key] = val;
	}catch(e){
		this._huSaveData = false;
	    this._hangUpCount = 0;
	    this.setHangUpSwitch(true);
	    this.initHangUpData();
		this._hangUpData[key] = val;
	}
};
// 准备开始挂机。
Game_Party.prototype.readyStart = function() {
	if (!this._hangUpSiwitch) {
		this.clearHangUpData();
		return;
	}
    $gameMap.hasEnemy() ? this.startHangUp() : this.noEnemyTip();
};
// 无敌人时的提示。
Game_Party.prototype.noEnemyTip = function() {
	SoundManager.playBuzzer();
	XdRsData.hangUp.tip('nmText');
};
// 开始挂机。
Game_Party.prototype.startHangUp = function() {
	SoundManager.playOk();
	this.setHangUpData('state', true);
	this.setHangUpData('origin', [$gamePlayer.x, $gamePlayer.y]);
	// 打开挂机-判断
	XdRsData.hangUp.GuaJiStartBettleOk = true;
	XdRsData.hangUp.BetterFrequency = 0;
	if(!!ConfigManager.ghostButtons){
	    XdRsData.hangUp.ghostButtons = true;
        ConfigManager.ghostButtons = false;
        SceneManager._scene.clearGhostButtons && SceneManager._scene.clearGhostButtons();
	}else{
	    XdRsData.hangUp.ghostButtons = false;
	}
};

// 停止挂机。
Game_Party.prototype.stopHangUp = function() {
	SoundManager.playCancel();
	this.clearHangUpData();
	// 关闭挂机-判断
	XdRsData.hangUp.GuaJiStartBettleOk = false;
	XdRsData.hangUp.BetterFrequency = 0;
	Input._currentState.ok = false;
	if(!!XdRsData.hangUp.ghostButtons){
        ConfigManager.ghostButtons = true;
        SceneManager._scene.createGhostButtons && SceneManager._scene.createGhostButtons();
	}
};
// 清除挂机数据。
Game_Party.prototype.clearHangUpData = function() {
	this.setHangUpData('state', false);
	this.setHangUpData('origin', null);
	$gameSystem.addHangUpTime(this._hangUpCount);
	this._hangUpCount = 0;
	$gamePlayer.clearHangUpTriget();
};
// 战斗结束时，刷新挂机状态。
Game_Party.prototype.refrishHangUp = function() {
	$gamePlayer.clearHangUpTriget();
	this.needStopHangUp() && this.stopHangUp();
};
// 刷新挂机时间。
Game_Party.prototype.refreshHuTime = function(isMapScene) {
	if (!this.isHangUp()) return;
	this._hangUpCount++;
	if (XdRsData.hangUp.canSave()) this._huSaveData = true;
	isMapScene && this.saveHuangUp();
};
// 挂机时间（秒）。
Game_Party.prototype.hangUpTime = function() {
	return Math.floor(this._hangUpCount / 60);
};
// 挂机时间文本。
Game_Party.prototype.hangUpTimeText = function() {
	if (!this.isHangUp()) return '---';
	var hour = Math.floor(this.hangUpTime() / 60 / 60);
    var min = Math.floor(this.hangUpTime() / 60) % 60;
    var sec = this.hangUpTime() % 60;
    return hour.padZero(2)+':'+min.padZero(2)+':'+sec.padZero(2);
};
// 挂机自动储存。
Game_Party.prototype.saveHuangUp = function() {
	if (!this._huSaveData) return;
	this._huSaveData = false;
	// 非PC停用挂机存储功能
	// if (!Utils.isNwjs()) return;
	if ($gameParty._hangUpData && !$gameParty._hangUpData.autoSave) return;
	$gameSystem.onBeforeSave();
	$gamePlayer.SaveGameId = Number(XdRsData.hangUp.parameters['saveId']) || 1;
    if (DataManager.saveGame($gamePlayer.SaveGameId)) {
      SoundManager.playSave(); // 保存成功播放音效
      StorageManager.cleanBackup($gamePlayer.SaveGameId); // 删除备份存档
      $.toaster({ message : '存档成功，储存到了' + $gamePlayer.SaveGameId + '号存档！'});
    } else {
      SoundManager.playBuzzer(); // 保存失败播放音效
      $.toaster({ message : '存档到' + $gamePlayer.SaveGameId + '号存档失败'});
    }
	/* $gameSystem.onBeforeSave();
	// var fileId = XdRsData.hangUp.parameters['saveId'] || 1;
	var saved = DataManager.saveGame($gamePlayer.SaveGameId);
	// var saved = HWGOE.save.cloudSaveGame(HWGOE.save.latestSavefileId());
	saved && SoundManager.playSave();
	saved && XdRsData.hangUp.tip('saveWord'); */
};
//==================================================================================================================
// 靠近指定坐标。
Game_Character.prototype.moveTowardPosition = function(x, y) {
    var sx = this.deltaXFrom(x);
    var sy = this.deltaYFrom(y);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }
};
//==================================================================================================================
// 挂机中，角色无法操作移动。
XdRsData.hangUp.GPmoveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
    !$gameParty.isHangUp() && XdRsData.hangUp.GPmoveByInput.call(this);
};
// 添加挂机中的刷新。
XdRsData.hangUp.GPupdate = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
    XdRsData.hangUp.GPupdate.call(this, sceneActive);
	this.updateHangUp();
};
// 挂机中的刷新。
Game_Player.prototype.updateHangUp = function() {
    if (!$gameParty.isHangUp()) return;
	this.updateHangUpAction();
	this.updateRelockingCount();
	this.hangUpMoveRandom();
};
// 刷新挂机中的一系列行动。
Game_Player.prototype.updateHangUpAction = function() {
	this.lockingTriget();
	this.needMoveToOrigin() && this.moveToOrigin();
	this.needMoveToTriget() && this.moveTowardCharacter(this._hangUpTriget);
};
// 刷新再次锁定计时。
Game_Player.prototype.updateRelockingCount = function() {
    if (this._reLockingCount) this._reLockingCount--;
};
// 锁定敌人事件目标。
Game_Player.prototype.lockingTriget = function() {
	if (this._hangUpTriget && !!this._reLockingCount) return;
	this._hangUpTriget && this._hangUpTriget.reLocking();
	this._hangUpTriget = XdRsData.hangUp.recentEnemy();
	if (this._hangUpTriget) this._reLockingCount = $gameParty.relockingCount();
};
// 当前地图有暗雷怪时，角色在范围内随机移动。
Game_Player.prototype.hangUpMoveRandom = function() {
	if (this.isMoving() || this._hangUpTriget || !$gameMap.hasSecretEnemy()) return;
	XdRsData.hangUp.enemyInRange(this) ? this.moveRandom() : this.moveToOrigin();
};
// 挂机原点 X 坐标。
Game_Player.prototype.originX = function() {
	return $gameParty.hangUpData().origin[0];
};
// 挂机原点 Y 坐标。
Game_Player.prototype.originY = function() {
	return $gameParty.hangUpData().origin[1];
};
// 是否需要移动回原点。
Game_Player.prototype.needMoveToOrigin = function() {
	return !this._hangUpTriget && !$gameMap.hasSecretEnemy();
};
// 是否需要移动到目标。
Game_Player.prototype.needMoveToTriget = function() {
	return this._hangUpTriget && !this.isMoving();
};
// 是否站在原点。
Game_Player.prototype.isStandingAtOrigin = function() {
	return this._x === this.originX() && this._y === this.originY();
};
// 移动到原点。
Game_Player.prototype.moveToOrigin = function() {
	if (this.isStandingAtOrigin() || this.isMoving()) return;
	this.moveTowardPosition(this.originX(), this.originY());
};
// 清除挂机锁定的目标。
Game_Player.prototype.clearHangUpTriget = function() {
	this._hangUpTriget = null;
	this._reLockingCount = 0;
};
//==================================================================================================================
// 是否是挂机的敌人事件。
Game_Event.prototype.isHangUpEnemy = function() {
    return this.isVisible() && this.isHangUpNotes() &&
	       this.isEnemyTrigger() && this.hasBattleCode();
};
// 是否备注了挂机敌人的信息。
Game_Event.prototype.isHangUpNotes = function() {
    return /<Enemy>/.test(this.event().note);
};
// 事件触发类型以及暂时排除判断。
Game_Event.prototype.isEnemyTrigger = function() {
    return [1,2].contains(this.page().trigger) && !this._reLockingCount;
};
// 是否有 战斗事件项。
Game_Event.prototype.hasBattleCode = function() {
    return this.list().some(function(l){return l.code === 301;});
};
// 是否可见。
Game_Event.prototype.isVisible = function() {
    return this._characterName !== '' && !this._erased;
};
// 设定为 非敌人 以及计数时间。
Game_Event.prototype.reLocking = function() {
    return this._reLockingCount = 3600 + $gameParty.relockingCount();
};
// 添加刷新计数时间。
XdRsData.hangUp.GEupdate = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    XdRsData.hangUp.GEupdate.call(this);
    this.updateReLocking();
};
// 刷新 非敌 计数时间。
Game_Event.prototype.updateReLocking = function() {
    if (this._reLockingCount) this._reLockingCount--;
};
//==================================================================================================================
// 增加插件命令。
XdRsData.hangUp.GIpluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    XdRsData.hangUp.GIpluginCommand.call(this, command, args);
	command === 'EnableHangUp'   && $gameParty.setHangUpSwitch(true);
	command === 'ProhibitHangUp' && $gameParty.setHangUpSwitch(false);
};
//==================================================================================================================
// 挂机提示窗口。
function HangUp_Tip() {
    this.initialize.apply(this, arguments);
}
HangUp_Tip.prototype = Object.create(Sprite.prototype);
HangUp_Tip.prototype.constructor = HangUp_Tip;
HangUp_Tip.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.opacity = +XdRsData.hangUp.parameters['hu0pacity'] || 160;
    this.setBitmap();
	var x = (Graphics.boxWidth - 560) / 2;
	var y = +XdRsData.hangUp.parameters['huY'] || 100;
	this.move(x, y);
};
HangUp_Tip.prototype.setBitmap = function() {
    this.bitmap = XdRsData.hangUp.getImage();
	this.setFrame(0,0,560,88);
	this.bitmap.addLoadListener(function(){this.drawWord();}.bind(this));
};
HangUp_Tip.prototype.drawWord = function() {
	var data = XdRsData.hangUp.parameters['huColor'] || '255,255,255';
	this.bitmap.textColor = 'rgb('+data+')';
	var text = ''+XdRsData.hangUp.parameters['huWord'];
    this.bitmap.drawText(text,0,30,560,30,'center');
};
//==================================================================================================================
// 挂机快捷界面窗口。
function HangUp_Inter() {
    this.initialize.apply(this, arguments);
}
HangUp_Inter.prototype = Object.create(Sprite.prototype);
HangUp_Inter.prototype.constructor = HangUp_Inter;
HangUp_Inter.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.setFrame(0,0,240,74);
	this._pressCount = 0;
    this.createAll();
	this.drawHuText();
	this.drawTimeword();
	var data = XdRsData.hangUp.parameters['tipPlace'].split(',');
	this.move(+data[0] || 20, +data[1] || 10);
};
HangUp_Inter.prototype.createAll = function() {
	this._panel  = new Sprite(XdRsData.hangUp.getImage());
    this._button = new Sprite(XdRsData.hangUp.getImage());
	this._cont = new Sprite(new Bitmap(240,74));
	this._contHM = new Sprite(new Bitmap(240,222));
	this._button.anchor.x = this._button.anchor.y = 0.5;
	this._panel.setFrame(64,88,200,44);
	this._button.setFrame(0,88,64,64);
	this._button.move(32, 42);
	this._panel.move(10, 28);
	this.addChild(this._panel);
	this.addChild(this._button);
	this.addChild(this._cont);
	this.addChild(this._contHM);
};
HangUp_Inter.prototype.getTextColor = function() {
    var data = XdRsData.hangUp.parameters['tipColor'] || '255,255,255';
	return 'rgb('+data+')';
};
HangUp_Inter.prototype.drawHuText = function() {
    this._cont.bitmap.fontSize = 18;
	this._cont.bitmap.textColor = this.getTextColor();
	var text = ''+XdRsData.hangUp.parameters['tipWord'];
	this._cont.bitmap.drawText(text,64,28,136,44);
};
HangUp_Inter.prototype.drawTimeword = function() {
    this._cont.bitmap.clearRect(0,0,120,28);
	this._cont.bitmap.fontSize = 14;
	this._cont.bitmap.textColor = this.getTextColor();
	this._cont.bitmap.drawText('挂机时间:',0,12,120,16,'right');
};
HangUp_Inter.prototype.drawHuTime = function() {
	this._dataTime = $gameParty.hangUpTime();
    this._cont.bitmap.clearRect(120,0,120,28);
	this._cont.bitmap.fontSize = 14;
	this._cont.bitmap.textColor = 'rgb(255,255,255)';
	var text = $gameParty.hangUpTimeText();
	this._cont.bitmap.drawText(text,126,12,120,18);
};
HangUp_Inter.prototype.needRefreshTime = function() {
    return this._dataTime !== $gameParty.hangUpTime();
};
HangUp_Inter.prototype.press = function() {
    this._button.scale.x = this._button.scale.y = 0.9;
	this._pressCount = 8;
};
HangUp_Inter.prototype.pressEnd = function() {
    this._button.scale.x = this._button.scale.y = 1;
};
HangUp_Inter.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateHuTime();
	this.drawHMPU();
    this.updateTouch();
	this.updatePress();
};
HangUp_Inter.prototype.updateHuTime = function() {
    this.needRefreshTime() && this.drawHuTime();
};
Array.prototype.DelRepeatNum = function () {
    var temp = {}, len = this.length;
    for (var i = 0; i < len; i++) {
        var tmp = this[i];
        if (!temp.hasOwnProperty(tmp)) {//hasOwnProperty用来判断一个对象是否有你给出名称的属性或对象
            temp[this[i]] = "yes";
        }
    }
    len = 0;
    var tempArr = [];
    for (var i in temp) {
        tempArr[len++] = Number(i);
    }
    return tempArr;
}
HangUp_Inter.prototype.drawHMPU = function() {
    this._contHM.bitmap.clearRect(120,0,120,28);
	this._contHM.bitmap.fontSize = 14;
	this._contHM.bitmap.textColor = 'rgb(255,255,255)';
	var Hy = 80;
	$gameParty._XdRsData_hangUp_RecoveryHMP = $gameParty._XdRsData_hangUp_RecoveryHMP || {};
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems = $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems || [];
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems = $gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems || [];
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetHMpArrItems = [];
	for(var i = 0;i < $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.length;i++){
		if($gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems[i][0]){
			$gameParty._XdRsData_hangUp_RecoveryHMP.GetHMpArrItems.push($gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems[i][1]);
		}
	};
	for(var i = 0;i < $gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems.length;i++){
		if($gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems[i][0]){
			$gameParty._XdRsData_hangUp_RecoveryHMP.GetHMpArrItems.push($gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems[i][1]);
		}
	};
	var GXHRGD = $gameParty._XdRsData_hangUp_RecoveryHMP.GetHMpArrItems.DelRepeatNum();
	for(var i = 0;i < GXHRGD.length;i++){
		if(XdRsData.hangUp.GuaJiStartBettleOk && $gameParty._items[GXHRGD[i]]){
			this._contHM.bitmap.drawText($dataItems[GXHRGD[i]].name + " 剩余: " + $gameParty._items[GXHRGD[i]],5,Hy,120,18);
	    	Hy += 20;
		}
	}
};
HangUp_Inter.prototype.updatePress = function() {
    if (!this._pressCount) return;
	this._pressCount--;
	!this._pressCount && this.pressEnd();
};
HangUp_Inter.prototype.updateTouch = function() {
    if (!TouchInput.isTriggered() || !this.touchButton()) return;
	this.press();
	XdRsData.hangUp.set();
};
HangUp_Inter.prototype.touchButton = function() {
    var tx = TouchInput.x, ty = TouchInput.y;
	var bx = this._button.x - 27 + this.x;
	var by = this._button.y - 27 + this.y;
	return tx > bx && tx < (bx+54) && ty > by && ty < (by+54);
};
//==================================================================================================================
// 挂机选项说明窗口。
function Window_HuTitle() {
    this.initialize.apply(this, arguments);
}
Window_HuTitle.prototype = Object.create(Window_Base.prototype);
Window_HuTitle.prototype.constructor = Window_HuTitle;
Window_HuTitle.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, 64);
};
Window_HuTitle.prototype.standardPadding = function() {
    return 10;
};
Window_HuTitle.prototype.lineHeight = function() {
    return 44;
};
Window_HuTitle.prototype.refreshText = function(text) {
    var lastText = this._text;
	this._text = text;
	lastText !== this._text && this.drawCnot();
};
Window_HuTitle.prototype.drawCnot = function() {
    this.contents.clear();
	if (!this._text) return;
	this.changeTextColor('rgb(255,255,255)'); // 颜色
	this.drawText(this._text, 0, 0, this.contentsWidth(), 'center');
};
//=====================================================================================================================================
// 挂机列表窗口综合操作。
function HuList() {
    this.initialize.apply(this, arguments);
}
HuList.prototype.constructor = HuList;
HuList.prototype.initialize = function() {
	this._index = 0;
    this.createAllList();
};
HuList.prototype.listWindows = function() {
    return this._windows;
};
HuList.prototype.syms = function() {
    return ['range','showInter','fastFt','deathStop','autoSave','RareEscape','UnprecedentedEscape', 'CommonEscape','SetSkilllist','SetSkillNum', 'AutomaticMedication', 'AutomaticSellWeapon', 'DropShield'];
};
HuList.prototype.maxSize = function() {
	return this.syms().length;
};
HuList.prototype.listHeight = function() {
    var height = Window_HuList.prototype.lineHeight.apply(this);
	var sp = Window_HuList.prototype.standardPadding.apply(this);
	return height + sp * 2;
};
HuList.prototype.setHandler = function(symbol, method) {
    this._windows.forEach(function(l){l.setHandler(symbol, method);});
};
// 位置排列
HuList.prototype.createAllList = function() {
    this._windows = [];
	var height = this.listHeight();
	for (var i=0;i<this.maxSize();i++){
		if(i == 8){
		    var x = Graphics.boxWidth / 3, y = (i - 1) * height + 64;
		}else if(i == 9){
			var x = Graphics.boxWidth * 2 / 3, y = (i - 2) * height + 64;
		}else if(i == 10){
		    var x = 0, y = (i - 2) * height + 64;
		}else if(i == 11){
		    var x = Graphics.boxWidth / 3, y = (i - 3) * height + 64;
		}else if(i == 12){
		    var x = Graphics.boxWidth * 2 / 3, y = (i - 4) * height + 64;
	    }else{
	    	var x = 0, y = i * height + 64;
		};
		this._windows[i] = new Window_HuList(x, y,this.syms()[i]);
	}
	this.refreshList();
};
HuList.prototype.activated = function() {
	return this._windows[this._index];
};
HuList.prototype.cotnWord = function() {
	return this.activated() ? this.activated().cotnWord() : '';
};
HuList.prototype.refreshList = function() {
    this._windows.forEach(function(l){l.silence();});
	this.activated() && this.activated().awaken();
};
HuList.prototype.setIndex = function(index) {
    var lastIndex = this._index;
	this._index = index;
	lastIndex !== this._index && this.indexChanged();
};
HuList.prototype.indexChanged = function() {
    SoundManager.playCursor();
	this.refreshList();
};
HuList.prototype.update = function() {
    Input.isTriggered('down') && this.changeIndexByInput(1);
	Input.isTriggered('up')   && this.changeIndexByInput(0);
	this.changeIndexByTouch();
};
HuList.prototype.changeIndexByInput = function(type) {
    var n = type ? 1 : this.maxSize() - 1;
	this.setIndex((this._index + n) % this.maxSize());
};
HuList.prototype.changeIndexByTouch = function() {
    if (!TouchInput.isTriggered()) return;
	var index = this.getTouchIndex();
	index !== null && this.setIndex(index);
};
HuList.prototype.getTouchIndex = function() {
    for (var i=0;i<this._windows.length;i++){
		if (this._windows[i].isTouchedInsideFrame()) return i;
	}
	return null;
};
//=====================================================================================================================================
// 挂机设置项目列表窗口。
function Window_HuList() {
    this.initialize.apply(this, arguments);
}
Window_HuList.prototype = Object.create(Window_Command.prototype);
Window_HuList.prototype.constructor = Window_HuList;
Window_HuList.prototype.initialize = function(x, y, sym) {
	this._huSym = sym;
	this.initWord();
    Window_Command.prototype.initialize.call(this, x, y);
};
Window_HuList.prototype.initWord = function() {
    var data = XdRsData.hangUp.getOptWord(this._huSym).split(':');
	this._listWord = data[0] || '';
	this._cotnWord = data[1] || '';
	if (this._huSym === 'autoSave') {
		var fileId = XdRsData.hangUp.parameters['saveId'] || 1;
		this._cotnWord = this._cotnWord.replace(/\\f/g, ''+fileId);
	}
};
Window_HuList.prototype.windowWidth = function() {
    return XdRsData.hangUp.listWidth();
};
Window_HuList.prototype.lineHeight = function() {
    return 48;
};
Window_HuList.prototype.standardPadding = function() {
    return 10;
};
Window_HuList.prototype.isRange = function() {
    return this._huSym === 'range';
};
Window_HuList.prototype.maxRange = function() {
	return XdRsData.hangUp.parameters['maxRange'] || 20;
};
Window_HuList.prototype.getVal = function() {
    return $gameParty.hangUpData()[this._huSym];
};
Window_HuList.prototype.setVal = function(val) {
	var lastVal = this.getVal();
    $gameParty.setHangUpData(this._huSym, val);
	if (lastVal !== this.getVal()){
		SoundManager.playCursor();
		this.redrawItem(0);
	}
};
Window_HuList.prototype.changeRange = function(type) {
	var add = type ? 1 : this.maxRange() - 1;
	var val = (this.getVal() + add - 1) % this.maxRange();
	this.setVal(val+1);
};
Window_HuList.prototype.cotnWord = function() {
    return this._cotnWord;
};
Window_HuList.prototype.makeCommandList = function() {
    this.addCommand(this._listWord, this._huSym);
};
Window_HuList.prototype.statusWidth = function() {
    return this.contentsWidth() / 2;
};
Window_HuList.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(), titleWidth, rect.y, statusWidth, 'right');
};
Window_HuList.prototype.statusText = function() {
    var value = this.getVal();
	if(this._huSym == "SetSkilllist" || this._huSym == "SetSkillNum" || this._huSym == "AutomaticMedication" || this._huSym == "AutomaticSellWeapon"){
		return 'open';
	}
	return this.isRange() ? ''+value : value ? 'YES' : 'NO';
};
Window_HuList.prototype.processOk = function() {
    this.isRange() ? this.changeRange(1) : this.setVal(!this.getVal());
	if(this._huSym == "SetSkilllist"){
		Star.XdRsData_hangUp.IsActSkill = true;
        SceneManager.push(Star_Scene_AutomaticCombat);
	}else if(this._huSym == "SetSkillNum"){
		Star.XdRsData_hangUp.IsActSkill = false;
		SceneManager.push(Star_Scene_AutomaticCombat);
	}else if(this._huSym == "AutomaticMedication"){
		// 自动洽药
		SceneManager.push(Star_Scene_AutomaticMedication);
	}else if(this._huSym == "AutomaticSellWeapon"){
		// 自动卖武器
		SceneManager.push(Star_Scene_AutomaticSellWeapon);
	}
};
Window_HuList.prototype.cursorRight = function(wrap) {
    this.processOk();
};
Window_HuList.prototype.cursorLeft = function(wrap) {
    this.isRange() ? this.changeRange(0) : this.setVal(!this.getVal());
};
Window_HuList.prototype.silence = function() {
    this.deactivate();
	this.deselect();
};
Window_HuList.prototype.awaken = function() {
    this.activate();
	this.select(0);
};
//==================================================================================================================
// 挂机范围演示窗口。
function Window_HuRange() {
    this.initialize.apply(this, arguments);
}
Window_HuRange.prototype = Object.create(Window_Base.prototype);
Window_HuRange.prototype.constructor = Window_HuRange;
Window_HuRange.prototype.initialize = function() {
	var x = XdRsData.hangUp.listWidth(), y = 64;
	var w = XdRsData.hangUp.srWidth(), h = XdRsData.hangUp.srHeight();
    Window_Base.prototype.initialize.call(this, x, y, w, h);
	this.drawRange();
};
Window_HuRange.prototype.standardPadding = function() {
    return 10;
};
Window_HuRange.prototype.drawRange = function() {
	this.contents.clear();
	this._rangeData = $gameParty.hangUpData().range;
	var rw = this.contents.width, rh = this.contents.height;
	var bg = SceneManager.hangUpBitmap();
	var rg = XdRsData.hangUp.rangeBitmap();
	this.contents.blt(bg,0,0,bg.width,bg.height,0,0,rw,rh);
	this.contents.blt(rg,0,0,rg.width,rg.height,0,0,rw,rh);
};
Window_HuRange.prototype.update = function() {
	Window_Base.prototype.update.call(this);
	this.isRangeChanged() && this.drawRange();
};
Window_HuRange.prototype.isRangeChanged = function() {
	return this._rangeData !== $gameParty.hangUpData().range;
};
//==================================================================================================================
// 是否需要添加 挂机 设置项。
Window_Options.prototype.needAddHangUp = function() {
	if (SceneManager.isPreviousScene(Scene_Title)) return false;
	return $gameParty.hangUpSwitch();
};
// 增加 挂机设置 选项。
XdRsData.hangUp.WOTmakeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
	this.needAddHangUp() && this.addCommand('挂机设置', 'HangUp');
    XdRsData.hangUp.WOTmakeCommandList.call(this);
};
// 更改挂机设置的状态文字为 空 。
XdRsData.hangUp.WOTstatusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
	if (this.commandSymbol(index) === 'HangUp') return '';
    return XdRsData.hangUp.WOTstatusText.call(this, index);
};
// 屏蔽挂机设置项更改数据。
XdRsData.hangUp.WOTchangeValue = Window_Options.prototype.changeValue;
Window_Options.prototype.changeValue = function(symbol, value) {
    symbol !== 'HangUp' && XdRsData.hangUp.WOTchangeValue.call(this, symbol, value);
};
// 确定键进入 挂机设置界面 。
XdRsData.hangUp.WOTprocessOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
	var symbol = this.commandSymbol(this.index());
    symbol === 'HangUp' ? this.optionHangUp() : XdRsData.hangUp.WOTprocessOk.call(this);
};
// 进入 挂机设置界面 。
Window_Options.prototype.optionHangUp = function() {
	SoundManager.playOk();
    SceneManager.push(Scene_HangUpOptions);
};
//==================================================================================================================
// 快速战斗时，跳过动作，动画。
XdRsData.hangUp.WBLstartAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    !$gameParty.isFastFighting() && XdRsData.hangUp.WBLstartAction.call(this, subject, action, targets);
};
// 挂机状态遇见标识敌人自动逃跑
XdRsData.hangUp.BattleManager_processTurn = BattleManager.updateTurn;
BattleManager.updateTurn = function() {
	var NameisT = false;
	var isBreak = false;
	for(var i = 0;i < $gameTroop.members().length;i++){
		for(var a = 0;a<$gameTroop.members()[i].notetags().length;a++){// CommonEscape
		    // 挂机状态 且精英怪逃跑或普通怪逃跑
			if(XdRsData.hangUp.GuaJiStartBettleOk && (
			((($gameTroop.members()[i].notetags()[a] == "HangUp Rare") && $gameParty._hangUpData.RareEscape) ||
			(($gameTroop.members()[i].notetags()[a] == "HangUp Unprecedented") && $gameParty._hangUpData.UnprecedentedEscape)) ||
			$gameParty._hangUpData.CommonEscape)){
				if($gameParty._hangUpData.CommonEscape){
					// console.log(!$gameParty._hangUpData.UnprecedentedEscape)
					// console.log($gameTroop.members()[i].notetags()[a] == "HangUp Unprecedented")
					if(!$gameParty._hangUpData.UnprecedentedEscape && $gameTroop.members()[i].notetags()[a] == "HangUp Unprecedented") isBreak = true;
					if(!$gameParty._hangUpData.RareEscape && $gameTroop.members()[i].notetags()[a] == "HangUp Rare") isBreak = true;
					if(isBreak){
				        var NameisT = false;
						break;
					}
				}
				var NameisT = true;
			    this._escapeRatio = 1;
			}
		}
	};
	for(var i = 0;i < $gameTroop.members().length;i++){
		if($gameTroop.members()[i].enemy().meta.DontEsc) NameisT = false;
	}
	if(XdRsData.hangUp.GuaJiStartBettleOk && NameisT){
		BattleManager.processEscape();
	}else {
	    XdRsData.hangUp.BattleManager_processTurn.call(this);
	}
};
// XdRsData.hangUp.SBchangeInputWindow = Scene_Battle.prototype.changeInputWindow;
// Scene_Battle.prototype.changeInputWindow = function() {
	// XdRsData.hangUp.SBchangeInputWindow.call(this);
	// if(XdRsData.hangUp.GuaJiStartBettleOk){
      // Input._currentState.ok = true;
	// }
// };

// 挂机状态胜利自动点击结算页面
// XdRsData.hangUp.BattleManagerProcessVictory = BattleManager.processVictory;
// BattleManager.processVictory = function() {
	// XdRsData.hangUp.BattleManagerProcessVictory.call(this);
	// if(XdRsData.hangUp.GuaJiStartBettleOk) setTimeout("SceneManager.pop();this._phase = null;",500);
// }
//==================================================================================================================
// 挂机时，信息自动显示。
XdRsData.hangUp.WMupdate = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
    XdRsData.hangUp.WMupdate.call(this);
	this.updateHangUpAuto();
};
XdRsData.hangUp.WMnewPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    XdRsData.hangUp.WMnewPage.call(this, textState);
	if ($gameParty.isHangUp()) {
		var count = XdRsData.hangUp.parameters['messageCount'] || 60;
		this._hangUpCount = +count;
	}
};
Window_Message.prototype.updateHangUpAuto = function() {
    if (!this._hangUpCount) return;
	this._hangUpCount--;
	if (!this._hangUpCount) {
		this.pause = false;
		this._textState ? this.newPage(this._textState) : this.terminateMessage();
	}
};
//==================================================================================================================
// 是否地图场景。
Scene_Base.prototype.isMapScene = function() {
    return this.constructor === Scene_Map;
};
// 是否挂机时的场景（地图+战斗场景）。
Scene_Base.prototype.isHangUpScene = function() {
    return this.isMapScene() || this.constructor === Scene_Battle;
};
// 生成提示窗口。
Scene_Base.prototype.createHuTip = function() {
    if (!this.isHangUpScene()) return;
	this._hangUpTip = new HangUp_Tip();
	this.addChild(this._hangUpTip);
};
// 生成快捷窗口。
Scene_Base.prototype.createHuInter = function() {
    if (!this.isHangUpScene()) return;
	this._hangUpInter = new HangUp_Inter();
	this.addChild(this._hangUpInter);
};
// 移除提示窗口。
Scene_Base.prototype.removeHuTip = function() {
    if (!this._hangUpTip) return;
	this.removeChild(this._hangUpTip);
	this._hangUpTip = null;
};
// 移除快捷窗口。
Scene_Base.prototype.removeHuInter = function() {
    if (!this._hangUpInter) return;
	this.removeChild(this._hangUpInter);
	this._hangUpInter = null;
};
// 添加挂机时的刷新。
XdRsData.hangUp.SSBupdate = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
    XdRsData.hangUp.SSBupdate.call(this);
	this.updateHangUp();
};
// 挂机时的刷新。
Scene_Base.prototype.updateHangUp = function() {
    if (!this.isHangUpScene()) return;
	this.updateHangUpInput();
	this._dataHuTip   !== $gameParty.isHangUp()    && this.setHuTip();
	this._dataHuInter !== $gameParty.isInterShow() && this.setHuInter();
	$gameParty.refreshHuTime(this.isMapScene());
};
// 侦测挂机按键。
Scene_Base.prototype.updateHangUpInput = function() {
    Input.isTriggered('HangUp') && XdRsData.hangUp.set();
};
// 设置挂机提示窗口。
Scene_Base.prototype.setHuTip = function() {
	this._dataHuTip = $gameParty.isHangUp();
	this._dataHuTip ? this.createHuTip() : this.removeHuTip();
};
// 设置挂机快捷窗口。
Scene_Base.prototype.setHuInter = function() {
	this._dataHuInter = $gameParty.isInterShow();
	this._dataHuInter ? this.createHuInter() : this.removeHuInter();
};
//==================================================================================================================
XdRsData.hangUp.SMterminate = Scene_Map.prototype.terminate;
Scene_Map.prototype.terminate = function() {
    XdRsData.hangUp.SMterminate.call(this);
	SceneManager.snapForHangUp();
};
// 挂机时，屏蔽呼叫菜单。
XdRsData.hangUp.SMisMenuCalled = Scene_Map.prototype.isMenuCalled;
Scene_Map.prototype.isMenuCalled = function() {
    return !$gameParty.isHangUp() && XdRsData.hangUp.SMisMenuCalled.call(this);
};
// 鼠标点击到挂机快捷窗口判断。
Scene_Map.prototype.isTouchHuInter = function() {
	if (!TouchInput.isTriggered()) return false;
    return this._hangUpInter && this._hangUpInter.touchButton();
};
// 屏蔽点击到快捷界面时，角色的鼠标点击移动。
XdRsData.hangUp.SMprocessMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
	!this.isTouchHuInter() && XdRsData.hangUp.SMprocessMapTouch.call(this);
};
//==================================================================================================================
// 战斗结束时，刷新挂机目标数据。
XdRsData.hangUp.SBterminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
    XdRsData.hangUp.SBterminate.call(this);
    $gameParty.refrishHangUp();
	// 自动回血
	if(XdRsData.hangUp.GuaJiStartBettleOk){
	var BreakHPTrue = [true,true,true,true];
	var BreakMPTrue = [true,true,true,true];
	  $gameParty._XdRsData_hangUp_RecoveryHMP = $gameParty._XdRsData_hangUp_RecoveryHMP || {};
	  $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems = $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems || [];
	  for(var i = 0;i < $gameParty.battleMembers().length;i++){
	    if($gameParty.battleMembers()[i]._actorId){
		  if($gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() < 1 && $gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() > 0){
			// 如果比例设置 且角色血量低于比例
			//  console.log($gameActors.actor($gameParty.battleMembers()[i]._actorId)._name + "Hp:" + $gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() * 100)
			if(!!$gameParty._XdRsData_hangUp_RecoveryHMP.HpV && $gameParty._XdRsData_hangUp_RecoveryHMP.HpV > $gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() * 100 && BreakHPTrue[i]){
				BreakHPTrue[i] = false;
			}else if(!BreakHPTrue[i]){
			    $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.forEach(function(arr){
				    // 如果物品不够关闭该物品使用
			        if(!$gameParty._items[arr[1]]) arr[0] = false;
					// 如果是复活药跳过使用
					for(var a = 0; a < $dataItems[arr[1]].effects.length;a++){
			            if(arr[0] && $dataItems[arr[1]].effects[a].code == "22") return;
					};
				    if(arr[0] && $gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() < 1 && $gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() > 0){
				        $gameActors.actor($gameParty.battleMembers()[i]._actorId).useItem($dataItems[arr[1]]);
				    	XdRsData.hangUp.HMPapplyItem($gameActors.actor($gameParty.battleMembers()[i]._actorId), $dataItems[arr[1]]);
			            if(!$gameParty._items[arr[1]]) arr[0] = false;
				    }
			    })
			}
		  }else if($gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() == 0){
			    var FhY = false;
				BreakHPTrue[i] = false;
			    $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.forEach(function(arr){
				    // 如果物品不够关闭该物品使用
			        if(!$gameParty._items[arr[1]]) arr[0] = false;
					for(var a = 0; a < $dataItems[arr[1]].effects.length;a++){
			            if(arr[0] && $dataItems[arr[1]].effects[a].code == "22") FhY = true;
					};
				    if(FhY && arr[0] && $gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() == 0){
				        $gameActors.actor($gameParty.battleMembers()[i]._actorId).useItem($dataItems[arr[1]]);
				    	XdRsData.hangUp.HMPapplyItem($gameActors.actor($gameParty.battleMembers()[i]._actorId), $dataItems[arr[1]]);
			            if(!$gameParty._items[arr[1]]) arr[0] = false;
				    }
			    });
				if($gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() == 0) BreakHPTrue[i] = true;
			  
		  };
		  //如果没回满进行新一轮回血
		  if($gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() < 1 && $gameActors.actor($gameParty.battleMembers()[i]._actorId).hpRate() > 0 && !BreakHPTrue[i]){
			// 如果药物不足停止功能
			for(var a = 0;a < $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.length;a++){
				if($gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems[a][0]){
				    for(var b = 0;b < $dataItems[$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems[a][1]].effects.length;b++){
						if($dataItems[$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems[a][1]].effects[b].code == "22") $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems[a][2] = "FH"
				    }
				}
			}
			// 有个为true就停止 -相反
			if(!($gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.findIndex(target=>(target[0]===true))==-1) && ($gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.findIndex(target=>(target[0]===true && target[2] != "FH"))==-1 || !($gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.findIndex(target=>(target[0]===true && target[2] == "ZL"))==-1))){
				var ZLY = false;
				for(var a = 0;a < $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.length;a++){
					if($gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems[a][0] && $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems[a][2] == "ZL"){
						ZLY = true;
					}
				};
				if(ZLY) i--;
			}
		  }
	    };
  	  };
	  // 自动回蓝
	  $gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems = $gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems || [];
	  for(var i = 0;i < $gameParty.battleMembers().length;i++){
	    if($gameParty.battleMembers()[i]._actorId){
		  if($gameActors.actor($gameParty.battleMembers()[i]._actorId).mpRate() < 1){
			// 如果比例设置 且角色蓝量低于比例
			// console.log($gameActors.actor($gameParty.battleMembers()[i]._actorId)._name + "Mp:" + $gameActors.actor($gameParty.battleMembers()[i]._actorId).mpRate() * 100)
			if(!!$gameParty._XdRsData_hangUp_RecoveryHMP.MpV && $gameParty._XdRsData_hangUp_RecoveryHMP.MpV > $gameActors.actor($gameParty.battleMembers()[i]._actorId).mpRate() * 100 && BreakMPTrue[i]){
				BreakMPTrue[i] = false;
			}else if(!BreakMPTrue[i]){
			    $gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems.forEach(function(arr){
			    	// 如果物品不够关闭该物品使用
			        if(!$gameParty._items[arr[1]]) arr[0] = false;
			    	if(arr[0] && $gameActors.actor($gameParty.battleMembers()[i]._actorId).mpRate() < 1){
			    	    $gameActors.actor($gameParty.battleMembers()[i]._actorId).useItem($dataItems[arr[1]]);
			    		XdRsData.hangUp.HMPapplyItem($gameActors.actor($gameParty.battleMembers()[i]._actorId), $dataItems[arr[1]]);
			    		if(!$gameParty._items[arr[1]]) arr[0] = false;
			    	}
			    });
			}
		  };
		  //如果没回满进行新一轮回蓝
		  if($gameActors.actor($gameParty.battleMembers()[i]._actorId).mpRate() < 1 && !BreakMPTrue[i]){
			// 如果药物不足停止功能
			if(!($gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems.findIndex(target=>target[0]===true)==-1)){
				i--;
			}
		  }
	    };
  	  };
	  // 自动卖武器
	  $gameParty._XdRsData_hangUp_SellWeapon = $gameParty._XdRsData_hangUp_SellWeapon || {};
	  XdRsData.hangUp.BetterFrequency += 1;
	  if(!!$gameParty._XdRsData_hangUp_SellWeapon.SellQuality && $gameParty._XdRsData_hangUp_SellWeapon.SellQuality == XdRsData.hangUp.BetterFrequency){
	    if(!!$gameParty._XdRsData_hangUp_SellWeapon.quality0) XdRsData.hangUp.OnekeyWPSell(0);
	    if(!!$gameParty._XdRsData_hangUp_SellWeapon.quality1) XdRsData.hangUp.OnekeyWPSell(1);
	    if(!!$gameParty._XdRsData_hangUp_SellWeapon.quality2) XdRsData.hangUp.OnekeyWPSell(2);
	    if(!!$gameParty._XdRsData_hangUp_SellWeapon.quality3) XdRsData.hangUp.OnekeyWPSell(3);
        if(!!$gameParty._XdRsData_hangUp_SellWeapon.quality4) XdRsData.hangUp.OnekeyWPSell(4);
		if($ && $.toaster) $.toaster({ message : '装备出售完成'});
		XdRsData.hangUp.BetterFrequency = 0;
	  }
	};
};
// 自动卖出装备
XdRsData.hangUp.OnekeyWPSell = function(quality){
	//武器中含有<quality:quality>
	for (var i = 0; i < $dataWeapons.length; i++) {
        if ($dataWeapons[i] && $dataWeapons[i].meta.quality == quality) {
			// 物品拥有数
			// console.log($gameParty.numItems($dataWeapons[i]));
			var SellWeapon_item = $dataWeapons[i];
			if(SellWeapon_item.price >  0 && SellWeapon_item.name.indexOf("[锁定]") == -1){
				for (var aceq = 0; aceq < $gameParty.members().length; aceq++) {
					var aceqnum = 0;
				    //当前队伍  $gameParty.members()
					// console.log($gameActors.actor($gameParty.members()[aceq]._actorId).hasWeapon(this._item))
					// if(aceq == 0) console.log($gameActors.actor($gameParty.members()[0]._actorId)._equips[0])
			    	if($gameActors.actor($gameParty.members()[aceq]._actorId).hasWeapon(SellWeapon_item)){
						aceqnum += 1;
				    }
				}
				for(var sell = 0; sell < ($gameParty.numItems(SellWeapon_item) - aceqnum); sell++){
				  XdRsData.hangUp.doSell(1, SellWeapon_item);
				}
			}
        }
    };
	//防具中含有<quality:quality>
	for (var i = 0; i < $dataArmors.length; i++) {
        if ($dataArmors[i] && $dataArmors[i].meta.quality == quality) {
			// 物品拥有数
			// console.log($gameParty.numItems($dataArmors[i]));
			var SellWeapon_item = $dataArmors[i];
			if(SellWeapon_item.price > 0 && SellWeapon_item.name.indexOf("[锁定]") == -1){
				for (var aceq = 0; aceq < $gameParty.members().length; aceq++) {
					var aceqnum = 0;
				    //当前队伍  $gameParty.members()
					// console.log($gameActors.actor($gameParty.members()[aceq]._actorId).hasArmor(this._item))
			    	if($gameActors.actor($gameParty.members()[aceq]._actorId).hasArmor(SellWeapon_item)){
						aceqnum += 1;
				    }
				}
				for(var sell = 0; sell < ($gameParty.numItems(SellWeapon_item) - aceqnum); sell++){
				  XdRsData.hangUp.doSell(1, SellWeapon_item);
				}
			}
        }
    };
};
// 自动卖出装备- 基于YEP
XdRsData.hangUp.doSell = function(number, SellWeapon_item) {
	if (SellWeapon_item && SellWeapon_item.sellPrice !== undefined) {
	  $gameParty.gainGold(number * SellWeapon_item.sellPrice);
    }else{
	  $gameParty.gainGold(number * Math.floor(SellWeapon_item.price / 2));
	};
	// Variables
    if (SellWeapon_item.variableSellPrices) {
      var length = SellWeapon_item.variableSellPrices.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = SellWeapon_item.variableSellPrices[i];
          var value = $gameVariables.value(varId);
          var price = SellWeapon_item.variableSellPrice[varId];
          $gameVariables.setValue(varId, value + price * number);
        }
      }
    }
    // Items
    if (SellWeapon_item.itemSellPrices) {
      var length = SellWeapon_item.itemSellPrices.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = SellWeapon_item.itemSellPrices[i];
          var value = $gameParty.numItems($dataItems[varId]);
          var price = SellWeapon_item.itemSellPrice[varId];
          $gameParty.gainItem($dataItems[varId], price * number);
        }
      }
    }
    // Weapons
    if (SellWeapon_item.weaponSellPrices) {
      var length = SellWeapon_item.weaponSellPrices.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = SellWeapon_item.weaponSellPrices[i];
          var value = $gameParty.numItems($dataWeapons[varId]);
          var price = SellWeapon_item.weaponSellPrice[varId];
          $gameParty.gainItem($dataWeapons[varId], price * number);
        }
      }
    }
    // Armors
    if (SellWeapon_item.armorSellPrices) {
      var length = SellWeapon_item.armorSellPrices.length;
      if (length > 0) {
        for (var i = 0; i < length; ++i) {
          var varId = SellWeapon_item.armorSellPrices[i];
          var value = $gameParty.numItems($dataArmors[varId]);
          var price = SellWeapon_item.armorSellPrice[varId];
          $gameParty.gainItem($dataArmors[varId], price * number);
        }
      }
    }
	$gameParty.loseItem(SellWeapon_item, number);
    if (!Imported.YEP_ItemCore) return;
    if (!DataManager.isIndependent(SellWeapon_item)) return;
    DataManager.removeIndependentItem(SellWeapon_item);
};

XdRsData.hangUp.HMPitemTargetActors = function(actor, item) {
    var action = new Game_Action(actor);
    action.setItemObject(item);
    if (!action.isForFriend()) {
        return [];
    } else if (action.isForAll()) {
        return $gameParty.members();
    } else {
        return [actor];
    }
};
XdRsData.hangUp.HMPapplyItem = function(actor, item) {
    var action = new Game_Action(actor);
    action.setItemObject(item);
    XdRsData.hangUp.HMPitemTargetActors(actor, item).forEach(function(target) {
        for (var i = 0; i < action.numRepeats(); i++) {
            action.apply(target);
        }
    }, this);
    action.applyGlobal();
};
//==================================================================================================================
// 挂机设置场景。
function Scene_HangUpOptions() {
    this.initialize.apply(this, arguments);
}
Scene_HangUpOptions.prototype = Object.create(Scene_Base.prototype);
Scene_HangUpOptions.prototype.constructor = Scene_HangUpOptions;
Scene_HangUpOptions.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};
Scene_HangUpOptions.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
	this.createTitle();
    this.createList();
	this.createRange();
};
Scene_HangUpOptions.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._backgroundSprite);
};
Scene_HangUpOptions.prototype.createTitle = function() {
    this._title = new Window_HuTitle();
	this.addChild(this._title);
};
Scene_HangUpOptions.prototype.createList = function() {
    this._list = new HuList();
	this._list.setHandler('cancel', this.popScene.bind(this));
	this._list.listWindows().forEach(function(w){
		this.addChild(w);
	}, this);
};
Scene_HangUpOptions.prototype.createRange = function() {
    this._range = new Window_HuRange();
	this.addChild(this._range);
};
Scene_HangUpOptions.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
	this._list.update();
	this._title.refreshText(this._list.cotnWord());
};

//自动战斗技能设置
// $gameParty._XdRsData_hangUp_ActSkill //使用顺序表

/**制作动作*/
Game_Actor.prototype.makeAction = function() {
    var action = new Game_Action(this);
    action.setAttack();
	var IsRepSkill = 1;
	var IsSkill = false;
	var NewTurnCount = $gameTroop._turnCount;
	// console.log($gameTroop._turnCount) // 当前回合
	$gameParty._XdRsData_hangUp_ActSkill = $gameParty._XdRsData_hangUp_ActSkill || {};
	$gameActors.actor(this._actorId).usableSkills().forEach(function(skill) {
		// console.log(this.name())
		// $gameActors.actor(this._classId).replaceAttackSkillId()
		if($gameParty._XdRsData_hangUp_ActSkill[this.name() + Star.NumToThreeNum(NewTurnCount)] == skill.id || $gameParty._XdRsData_hangUp_ActSkill[this.name() + Star.NumToThreeNum(NewTurnCount)] == 1 || $gameParty._XdRsData_hangUp_ActSkill[this.name() + Star.NumToThreeNum(NewTurnCount)] == 2) IsSkill = true;
		if($gameParty._XdRsData_hangUp_ActSkill[this.name() + Star.NumToThreeNum(NewTurnCount)] == 1) IsRepSkill = this.attackSkillId();
    }, this);
	// 当战斗技能顺序未设置或未拥有该技能或Mp/Tp不足使用时执行旧Ai
	if($gameParty._XdRsData_hangUp_ActSkill[this.name() + Star.NumToThreeNum(NewTurnCount)] && IsSkill && this.skillMpCost($dataSkills[$gameParty._XdRsData_hangUp_ActSkill[this.name() + Star.NumToThreeNum(NewTurnCount)]]) <= this._mp && this.skillTpCost($dataSkills[$gameParty._XdRsData_hangUp_ActSkill[this.name() + Star.NumToThreeNum(NewTurnCount)]]) <= this._tp){
		if(IsRepSkill == 1){
			var Skid = $gameParty._XdRsData_hangUp_ActSkill[this.name() + Star.NumToThreeNum(NewTurnCount)] || 1;
		    action.setSkill(Number(Skid));
		}else{
			action.setSkill(IsRepSkill);
		}
	}else{
		// action.IsOldAi = true;
		action.setSkill(this.attackSkillId());
	}
	action.decideRandomTarget();
    return action;
};
/**制作自动战斗动作*/
// XdRsData.hangUp.GAmakeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
Game_Actor.prototype.makeAutoBattleActions = function() {
    //循环(开始时 i = 0 ;当 i < 动作组总个数 ; 每一次 i++)
    for (var i = 0; i < this.numActions(); i++) {
		var MakAct = this.makeAction();
		if(!MakAct.IsOldAi){
			this.setAction(i, MakAct);
		}else{
			var list = this.makeActionList();
            var maxValue = Number.MIN_VALUE;
            for (var j = 0; j < list.length; j++) {
                var value = list[j].evaluate();
                if (value > maxValue) {
                    maxValue = value;
                    this.setAction(i, list[j]);
                }
            }
		}
    }
    //设置动作状态( "waiting"//等待 ) 
    this.setActionState('waiting');
};

// SceneManager.push(Star_Scene_AutomaticCombat);
function Star_Scene_AutomaticCombat() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Scene_AutomaticCombat.prototype = Object.create(Scene_MenuBase.prototype);
/**设置创造者 */
Star_Scene_AutomaticCombat.prototype.constructor = Star_Scene_AutomaticCombat;
/**初始化 */
Star_Scene_AutomaticCombat.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
/**创建 */
Star_Scene_AutomaticCombat.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAutomaticCombatActWindow();
};
/**创建选项窗口 */
Star_Scene_AutomaticCombat.prototype.createAutomaticCombatActWindow = function() {
    this._AutomaticCombatActWindow = new Star_Window_AutomaticCombatAct();
    this._AutomaticCombatActWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._AutomaticCombatActWindow);
};
/**-----------------------------------------------------------------------------   
 * Star_Window_AutomaticCombatAct   
 * 窗口选项   
 * The window for changing various settings on the options screen.   
 * 在选项画面改变一些设置的窗口 */

function Star_Window_AutomaticCombatAct() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Window_AutomaticCombatAct.prototype = Object.create(Window_Command.prototype);
/**设置创造者 */
Star_Window_AutomaticCombatAct.prototype.constructor = Star_Window_AutomaticCombatAct;
/**初始化 */
Star_Window_AutomaticCombatAct.prototype.initialize = function() {
    this.GetBetActor = [];
    for(var i = 0;i<$gameParty.battleMembers().length;i++){
		if($gameParty.battleMembers()[i]._actorId !== 0) this.GetBetActor.push($gameActors.actor($gameParty.battleMembers()[i]._actorId));
    }
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};
/**窗口宽 */
Star_Window_AutomaticCombatAct.prototype.windowWidth = function() {
    return 400;
};
/**窗口高 */
Star_Window_AutomaticCombatAct.prototype.windowHeight = function() {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};
/**更新位置 */
Star_Window_AutomaticCombatAct.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};
/**制作命令列表 */
Star_Window_AutomaticCombatAct.prototype.makeCommandList = function() {
	for(var i = 0;i < this.GetBetActor.length;i++){
		this.addCommand(this.GetBetActor[i]._name, "Actor" + i);
	}
};
/**绘制项目 */
Star_Window_AutomaticCombatAct.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
};
/**状态宽 */
Star_Window_AutomaticCombatAct.prototype.statusWidth = function() {
    return 120;
};
/**处理确定 */
Star_Window_AutomaticCombatAct.prototype.processOk = function() {
    var index = this.index();
	Star.XdRsData_hangUp.ActSkilllist = this.GetBetActor[index];
	if(Star.XdRsData_hangUp.IsActSkill){
    	SceneManager.push(Star_Scene_AutomaticCombatSkills);
	}else{
		SceneManager.push(Star_Scene_AutomaticCombatSkill);
	}
	this.refresh();
};
// 获取战斗可用技能
Game_Actor.prototype.usaBetSkills = function() {
	var GetSkills = [];
    var Skills = this.skills().filter(function(skill) {
        return (this.canMove() && (skill.occasion === 0 || skill.occasion === 1) &&
            this.isSkillWtypeOk(skill) && this.canPaySkillCost(skill) &&
            !this.isSkillSealed(skill.id) && !this.isSkillTypeSealed(skill.stypeId));
    }, this);
	GetSkills.push($dataSkills[1]);
	GetSkills.push($dataSkills[2]);
	for(var i = 0;i < Skills.length;i++){
		GetSkills.push(Skills[i]);
	}
	return GetSkills;
};
/*
XdRsData.hangUp.BattleManager_onEncounter = BattleManager.onEncounter;
BattleManager.onEncounter = function() {
    XdRsData.hangUp.BattleManager_onEncounter.call(this);
	// 挂机开始后关闭偷袭
    if(XdRsData.hangUp.GuaJiStartBettleOk) this._surprise = !false;
};
*/
/**-----------------------------------------------------------------------------   
 * Star_Scene_AutomaticCombatSkill   
 * 场景选项   
 * The scene class of the options screen.   
 * 处理 选项画面 的类 */

function Star_Scene_AutomaticCombatSkill() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Scene_AutomaticCombatSkill.prototype = Object.create(Scene_MenuBase.prototype);
/**设置创造者 */
Star_Scene_AutomaticCombatSkill.prototype.constructor = Star_Scene_AutomaticCombatSkill;
/**初始化 */
Star_Scene_AutomaticCombatSkill.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
/**创建 */
Star_Scene_AutomaticCombatSkill.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAutomaticCombatSkillWindow();
};
/**创建选项窗口 */
Star_Scene_AutomaticCombatSkill.prototype.createAutomaticCombatSkillWindow = function() {
    this._AutomaticCombatSkill = new Star_Window_AutomaticCombatSkill();
    this._AutomaticCombatSkill.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._AutomaticCombatSkill);
};

/**-----------------------------------------------------------------------------   
 * Star_Window_AutomaticCombatSkill   
 * 窗口选项   
 * The window for changing various settings on the options screen.   
 * 在选项画面改变一些设置的窗口 */

function Star_Window_AutomaticCombatSkill() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Window_AutomaticCombatSkill.prototype = Object.create(Window_Command.prototype);
/**设置创造者 */
Star_Window_AutomaticCombatSkill.prototype.constructor = Star_Window_AutomaticCombatSkill;
/**初始化 */
Star_Window_AutomaticCombatSkill.prototype.initialize = function() {
	this.IndexBol = {};
    this.GetActSkills = [];
	// this.RefActSkills = [];
	var b = 0;
	$gameParty._XdRsData_hangUp_ActSkills = $gameParty._XdRsData_hangUp_ActSkills || {};
	var NewTp = Star.XdRsData_hangUp.ActSkilllist._tp;
	Star.XdRsData_hangUp.ActSkilllist._tp = 100;
    for(var i = 0;i<Star.XdRsData_hangUp.ActSkilllist.usaBetSkills().length;i++){
		if(typeof $gameParty._XdRsData_hangUp_ActSkills[Star.XdRsData_hangUp.ActSkilllist._name + Star.XdRsData_hangUp.ActSkilllist.usaBetSkills()[i].id] !== "number"){
			$gameParty._XdRsData_hangUp_ActSkills[Star.XdRsData_hangUp.ActSkilllist._name + Star.XdRsData_hangUp.ActSkilllist.usaBetSkills()[i].id] = 1;
		};
		if($gameParty._XdRsData_hangUp_ActSkills[Star.XdRsData_hangUp.ActSkilllist._name + Star.XdRsData_hangUp.ActSkilllist.usaBetSkills()[i].id] > 0){
		    for(var a = 0;a < $gameParty._XdRsData_hangUp_ActSkills[Star.XdRsData_hangUp.ActSkilllist._name + Star.XdRsData_hangUp.ActSkilllist.usaBetSkills()[i].id];a++){
				this.GetActSkills.push(JSON.parse(JSON.stringify(Star.XdRsData_hangUp.ActSkilllist.usaBetSkills()[i])));
				this.GetActSkills[b]._GetId = a;
				b++;
			}
		}
    };
	Star.XdRsData_hangUp.ActSkilllist._tp = NewTp;
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};
/**窗口宽 */
Star_Window_AutomaticCombatSkill.prototype.windowWidth = function() {
    return 400;
};
/**窗口高 */
Star_Window_AutomaticCombatSkill.prototype.windowHeight = function() {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};
/**更新位置 */
Star_Window_AutomaticCombatSkill.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};
/*
Star.XdRsData_hangUp.IsActSkill = false;
SceneManager.push(Star_Scene_AutomaticCombat);
*/
/**制作命令列表 */
Star_Window_AutomaticCombatSkill.prototype.makeCommandList = function() {
	Ref = false;
	for(var i = 0;i < this.GetActSkills.length;i++){
		this.addCommand(this.GetActSkills[i].name, "Skill" + i);
		if(typeof this.IndexBol["Skill" + i] == "undefined"){
			if(typeof Star.XdRsData_hangUp.ActSkilltemporary[Star.XdRsData_hangUp.ActSkilllist._name + Star.NumToThreeNum(this.GetActSkills[i].id) + Star.NumToThreeNum(this.GetActSkills[i]._GetId)] == "undefined"){
				Ref = true;
			}
		}
	}
	for(var i = 0;i < this.GetActSkills.length;i++){
		if(Ref){
			this.IndexBol["Skill" + i] = i+1;
			Star.XdRsData_hangUp.ActSkilltemporary[Star.XdRsData_hangUp.ActSkilllist._name + Star.NumToThreeNum(this.GetActSkills[i].id) + Star.NumToThreeNum(this.GetActSkills[i]._GetId)] = this.IndexBol["Skill" + i];
		}else{
			this.IndexBol["Skill" + i] = Star.XdRsData_hangUp.ActSkilltemporary[Star.XdRsData_hangUp.ActSkilllist._name + Star.NumToThreeNum(this.GetActSkills[i].id) + Star.NumToThreeNum(this.GetActSkills[i]._GetId)];
		}
	};
	this.RefmakeCommandList();
};
/**刷新命令列表 */
Star_Window_AutomaticCombatSkill.prototype.RefmakeCommandList = function() {
	$gameParty._XdRsData_hangUp_ActSkill = $gameParty._XdRsData_hangUp_ActSkill || {};
	for(var i = 0;i < this.GetActSkills.length;i++){
		for(var a = 0;a < this.GetActSkills.length;a++){
		    if(i !== a && this.IndexBol["Skill" + i] == this.IndexBol["Skill" + a]){
		        if(this.setBol && this.setBol !== ("Skill" + i)){
					this.IndexBol["Skill" + i] = this.IndexBol["Skill" + a] + 1;
				};
			};
			Star.XdRsData_hangUp.ActSkilltemporary[Star.XdRsData_hangUp.ActSkilllist._name + Star.NumToThreeNum(this.GetActSkills[i].id) + Star.NumToThreeNum(this.GetActSkills[i]._GetId)] = this.IndexBol["Skill" + i];
			// 角色名+顺序 : 技能ID
			$gameParty._XdRsData_hangUp_ActSkill[Star.XdRsData_hangUp.ActSkilllist._name + Star.NumToThreeNum(this.IndexBol["Skill" + i])] =  this.GetActSkills[i].id;
		}
	};
	// this.RefActSkills = this.GetActSkills;
	// for(var i = 0;i < this.RefActSkills;i++) this.GetActSkills = this.RefActSkills;
	if(this.GetActSkills.length == 0){
		Input._currentState['escape']=true;
		setTimeout("Input._currentState['escape']=false;", 100);
		// alert("技能获取为空")
	}
};
/**绘制项目 */
Star_Window_AutomaticCombatSkill.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};
/**状态宽 */
Star_Window_AutomaticCombatSkill.prototype.statusWidth = function() {
    return 120;
};
/**显示文本 */
Star_Window_AutomaticCombatSkill.prototype.statusText = function(index) {
    if(typeof this._list[index] !== "undefined"){
		var symbol = this.commandSymbol(index);
	    return String(this.IndexBol[symbol]);
	}else{
		return "";
	}
};
/**处理确定 */
Star_Window_AutomaticCombatSkill.prototype.processOk = function() {
    var index = this.index();
	if(typeof this._list[index] !== "undefined"){
        var symbol = this.commandSymbol(index);
	    //设置技能使用顺序
	    if(this.IndexBol[symbol] > 1){
	    	this.IndexBol[symbol] -= 1;
		    this.setBol = symbol;
	    }
	}
	this.RefmakeCommandList();
	    // 设置结束
	this.refresh();
};
/**更新变量 */
Star_Window_AutomaticCombatSkill.prototype.update = function() {
	Window_Command.prototype.update.call(this);
    var index = this.index();
	if(typeof this._list[index] !== "undefined"){
        var symbol = this.commandSymbol(index);
        if (Input.isRepeated('right') && this.IndexBol[symbol] > 1) {
		    this.IndexBol[symbol] -= 1;
		    this.setBol = symbol;
        };
		// 增加值出现问题
        // if (Input.isRepeated('left') && this.IndexBol[symbol] < this.GetActSkills.length) {
		    // this.IndexBol[symbol] += 1;
		    // this.setBol = symbol;
        // }
	}else{
		Input._currentState['escape']=true;
		setTimeout("Input._currentState['escape']=false;", 100);
	}
	this.RefmakeCommandList();
	this.refresh();
};
// SceneManager.push(Star_Scene_AutomaticCombat);


// 设置战斗技能使用次数
/**-----------------------------------------------------------------------------   
 * Star_Scene_AutomaticCombatSkills   
 * 场景选项   
 * The scene class of the options screen.   
 * 处理 选项画面 的类 */

function Star_Scene_AutomaticCombatSkills() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Scene_AutomaticCombatSkills.prototype = Object.create(Scene_MenuBase.prototype);
/**设置创造者 */
Star_Scene_AutomaticCombatSkills.prototype.constructor = Star_Scene_AutomaticCombatSkills;
/**初始化 */
Star_Scene_AutomaticCombatSkills.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
/**创建 */
Star_Scene_AutomaticCombatSkills.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAutomaticCombatSkillWindow();
};
/**创建选项窗口 */
Star_Scene_AutomaticCombatSkills.prototype.createAutomaticCombatSkillWindow = function() {
    this._AutomaticCombatSkill = new Star_Window_AutomaticCombatSkills();
    this._AutomaticCombatSkill.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._AutomaticCombatSkill);
};

/**-----------------------------------------------------------------------------   
 * Star_Window_AutomaticCombatSkills   
 * 窗口选项   
 * The window for changing various settings on the options screen.   
 * 在选项画面改变一些设置的窗口 */

function Star_Window_AutomaticCombatSkills() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Window_AutomaticCombatSkills.prototype = Object.create(Window_Command.prototype);
/**设置创造者 */
Star_Window_AutomaticCombatSkills.prototype.constructor = Star_Window_AutomaticCombatSkills;
/**初始化 */
Star_Window_AutomaticCombatSkills.prototype.initialize = function() {
	this.IndexBol = {};
    this.GetActSkills = [];
	$gameParty._XdRsData_hangUp_ActSkills = $gameParty._XdRsData_hangUp_ActSkills || {};
	var NewTp = Star.XdRsData_hangUp.ActSkilllist._tp;
	Star.XdRsData_hangUp.ActSkilllist._tp = 100;
    for(var i = 0;i<Star.XdRsData_hangUp.ActSkilllist.usaBetSkills().length;i++){
		this.GetActSkills.push(Star.XdRsData_hangUp.ActSkilllist.usaBetSkills()[i]);
    };
	Star.XdRsData_hangUp.ActSkilllist._tp = NewTp;
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};
/**窗口宽 */
Star_Window_AutomaticCombatSkills.prototype.windowWidth = function() {
    return 400;
};
/**窗口高 */
Star_Window_AutomaticCombatSkills.prototype.windowHeight = function() {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};
/**更新位置 */
Star_Window_AutomaticCombatSkills.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};
/**制作命令列表 */
Star_Window_AutomaticCombatSkills.prototype.makeCommandList = function() {
	for(var i = 0;i < this.GetActSkills.length;i++){
		this.addCommand(this.GetActSkills[i].name, "Skills" + i);
	    if(typeof this.IndexBol["Skills" + i] == "undefined" && typeof $gameParty._XdRsData_hangUp_ActSkills[Star.XdRsData_hangUp.ActSkilllist._name + this.GetActSkills[i].id] == "undefined"){
			this.IndexBol["Skills" + i] = 0;
		}else{
			this.IndexBol["Skills" + i] = $gameParty._XdRsData_hangUp_ActSkills[Star.XdRsData_hangUp.ActSkilllist._name + this.GetActSkills[i].id];
		}
	};
	this.RefCommandList();
};
/**刷新命令列表 */
Star_Window_AutomaticCombatSkills.prototype.RefCommandList = function() {
	for(var i = 0;i < this.GetActSkills.length;i++){
		$gameParty._XdRsData_hangUp_ActSkills[Star.XdRsData_hangUp.ActSkilllist._name + this.GetActSkills[i].id] = this.IndexBol["Skills" + i];
	};
	if(this.GetActSkills.length == 0){
		Input._currentState['escape']=true;
		setTimeout("Input._currentState['escape']=false;", 100);
		// alert("技能获取为空");
	}
};
/**绘制项目 */
Star_Window_AutomaticCombatSkills.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};
/**状态宽 */
Star_Window_AutomaticCombatSkills.prototype.statusWidth = function() {
    return 120;
};
/**显示文本 */
Star_Window_AutomaticCombatSkills.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    return String(this.IndexBol[symbol]);
};
/**处理确定 */
Star_Window_AutomaticCombatSkills.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
	    //设置技能使用次数
		if(this.IndexBol[symbol] < 20){
	        this.IndexBol[symbol] += 1;
		}else{
			this.IndexBol[symbol] = 0;
		}
	    // 设置结束
	this.RefCommandList();
	this.refresh();
};
/**更新变量 */
Star_Window_AutomaticCombatSkills.prototype.update = function() {
	Window_Command.prototype.update.call(this);
    var index = this.index();
    var symbol = this.commandSymbol(index);
        if (Input.isRepeated('right') && this.IndexBol[symbol] < 20) {
            this.IndexBol[symbol]++;
        }else if(Input.isRepeated('right')){
			this.IndexBol[symbol] = 0;
		}
        if (Input.isRepeated('left') && this.IndexBol[symbol] > 0) {
            this.IndexBol[symbol]--;
        }else if(Input.isRepeated('left')){
			this.IndexBol[symbol] = 20;
		}
	this.RefCommandList();
	this.refresh();
};

Star.NumToThreeNum = function(Num){
	if(Num >= 0 && Num < 10){
		return "00" + Num;
	}else if(Num >= 10 && Num < 100){
		return "0" + Num;
	}else{
		return Num;
	}
};
/*
Star.XdRsData_hangUp.IsActSkill = true;
SceneManager.push(Star_Scene_AutomaticCombat);
*/


// 战斗结束自动洽药
// HP跟MP恢复
// SceneManager.push(Star_Scene_AutomaticMedication);
function Star_Scene_AutomaticMedication() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Scene_AutomaticMedication.prototype = Object.create(Scene_MenuBase.prototype);
/**设置创造者 */
Star_Scene_AutomaticMedication.prototype.constructor = Star_Scene_AutomaticMedication;
/**初始化 */
Star_Scene_AutomaticMedication.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
/**创建 */
Star_Scene_AutomaticMedication.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAutomaticCombatActWindow();
};
/**创建选项窗口 */
Star_Scene_AutomaticMedication.prototype.createAutomaticCombatActWindow = function() {
    this._AutomaticCombatActWindow = new Star_Window_AutomaticMedication();
    this._AutomaticCombatActWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._AutomaticCombatActWindow);
};
/**-----------------------------------------------------------------------------   
 * Star_Window_AutomaticMedication   
 * 窗口选项   
 * The window for changing various settings on the options screen.   
 * 在选项画面改变一些设置的窗口 */

function Star_Window_AutomaticMedication() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Window_AutomaticMedication.prototype = Object.create(Window_Command.prototype);
/**设置创造者 */
Star_Window_AutomaticMedication.prototype.constructor = Star_Window_AutomaticMedication;
/**初始化 */
Star_Window_AutomaticMedication.prototype.initialize = function() {
	$gameParty._XdRsData_hangUp_RecoveryHMP = $gameParty._XdRsData_hangUp_RecoveryHMP || {};
	$gameParty._XdRsData_hangUp_RecoveryHMP.HpV = $gameParty._XdRsData_hangUp_RecoveryHMP.HpV || 50;
	$gameParty._XdRsData_hangUp_RecoveryHMP.MpV = $gameParty._XdRsData_hangUp_RecoveryHMP.MpV || 50;
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};
/**窗口宽 */
Star_Window_AutomaticMedication.prototype.windowWidth = function() {
    return 400;
};
/**窗口高 */
Star_Window_AutomaticMedication.prototype.windowHeight = function() {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};
/**更新位置 */
Star_Window_AutomaticMedication.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};
/**制作命令列表 */
Star_Window_AutomaticMedication.prototype.makeCommandList = function() {
	this.addCommand("Hp恢复开关", "HpS");
	this.addCommand("Mp恢复开关", "MpS");
	this.addCommand("Hp恢复比例", "HpV");
	this.addCommand("Mp恢复比例", "MpV");
};
/**绘制项目 */
Star_Window_AutomaticMedication.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};
/**状态宽 */
Star_Window_AutomaticMedication.prototype.statusWidth = function() {
    return 120;
};
Star_Window_AutomaticMedication.prototype.statusText = function(index) {
	var symbol = this.commandSymbol(index);
    return this.booleanStatusText(symbol);
};

Star_Window_AutomaticMedication.prototype.booleanStatusText = function(symbol) {
	if(symbol == "HpS" || symbol == "MpS"){
		return 'Open';
	}else{
	    return $gameParty._XdRsData_hangUp_RecoveryHMP[symbol];
	}
};
/**处理确定 */
Star_Window_AutomaticMedication.prototype.processOk = function() {
    var index = this.index();
	var symbol = this.commandSymbol(index);
	if(symbol == "HpS"){
		// Hp恢复设置
		SceneManager.push(Star_Scene_GetHpItems);
	}else if(symbol == "MpS"){
		// Mp恢复设置
    	SceneManager.push(Star_Scene_GetMpItems);
	}else if(symbol == "HpV" || symbol == "MpV"){
		// Hp恢复比例
		if($gameParty._XdRsData_hangUp_RecoveryHMP[symbol] < 100){
	    	$gameParty._XdRsData_hangUp_RecoveryHMP[symbol] += 10;
		}else{
			$gameParty._XdRsData_hangUp_RecoveryHMP[symbol] = 10;
		}
	};
	this.refresh();
};

// 回血药物设置
function Star_Scene_GetHpItems() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Scene_GetHpItems.prototype = Object.create(Scene_MenuBase.prototype);
/**设置创造者 */
Star_Scene_GetHpItems.prototype.constructor = Star_Scene_GetHpItems;
/**初始化 */
Star_Scene_GetHpItems.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
/**创建 */
Star_Scene_GetHpItems.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAutomaticCombatSkillWindow();
};
/**创建选项窗口 */
Star_Scene_GetHpItems.prototype.createAutomaticCombatSkillWindow = function() {
    this._GetHpItems = new Star_Window_GetHpItems();
    this._GetHpItems.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._GetHpItems);
};

function Star_Window_GetHpItems() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Window_GetHpItems.prototype = Object.create(Window_Command.prototype);
/**设置创造者 */
Star_Window_GetHpItems.prototype.constructor = Star_Window_GetHpItems;
/**初始化 */
Star_Window_GetHpItems.prototype.initialize = function() {
	this.IndexBol = {};
    this.GetHPItems = [];
	// 获取回血药物
	// code 11 回血
	// code 12 回蓝
	// $gameParty.items() //获取当前拥有物品
	// $gameParty._items //获取当前拥有物品ID及数量
	// $gameParty._items[$gameParty.items()[0].id] // 获取拥有物品的数量
	// $gameParty.items()[0].effects[0].code // 获取物品的code功效
	// 如果code为11/12 加入数组
	$gameParty._XdRsData_hangUp_RecoveryHMP = $gameParty._XdRsData_hangUp_RecoveryHMP || {};
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems = $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems || {};
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems = $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems || [];
	for(var i = 0;i < $gameParty.items().length;i++){
		for(var a = 0;a < $gameParty.items()[i].effects.length;a++){
		    if($gameParty.items()[i].effects[a].code == "11"){
				this.GetHPItems.push({id : $gameParty.items()[i].id, num : $gameParty._items[$gameParty.items()[i].id]});
			}
	    }
	};
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};
/**窗口宽 */
Star_Window_GetHpItems.prototype.windowWidth = function() {
    return 400;
};
/**窗口高 */
Star_Window_GetHpItems.prototype.windowHeight = function() {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};
/**更新位置 */
Star_Window_GetHpItems.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};
/*
Star.XdRsData_hangUp.IsActSkill = false;
SceneManager.push(Star_Scene_AutomaticCombat);
*/
/**制作命令列表 */
Star_Window_GetHpItems.prototype.makeCommandList = function() {
	// 生成回血药物
	for(var i = 0;i < this.GetHPItems.length;i++){
		this.addCommand($dataItems[this.GetHPItems[i].id].name + " 剩余:" + this.GetHPItems[i].num, "Hp" +  i);
		$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems[$dataItems[this.GetHPItems[i].id].name + Star.NumToThreeNum(this.GetHPItems[i].id)] = !!$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems[$dataItems[this.GetHPItems[i].id].name + Star.NumToThreeNum(this.GetHPItems[i].id)];
	};
	this.RefmakeCommandList();
};
/**刷新命令列表 */
Star_Window_GetHpItems.prototype.RefmakeCommandList = function() {
	if(this.GetHPItems.length == 0){
		Input._currentState['escape']=true;
		setTimeout("Input._currentState['escape']=false;", 100);
		return;
		// alert("回血物品获取为空")
	};
	// console.log(this.index())
	if(typeof this.index() == "number" && this.index() >= 0){
		$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems[$dataItems[this.GetHPItems[this.index()].id].name + Star.NumToThreeNum(this.GetHPItems[this.index()].id)] = !!$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems[$dataItems[this.GetHPItems[this.index()].id].name + Star.NumToThreeNum(this.GetHPItems[this.index()].id)];
	};
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems = [];
	for(i = 0;i < this.GetHPItems.length;i++){
	    $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpArrItems.push([$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems[$dataItems[this.GetHPItems[i].id].name + Star.NumToThreeNum(this.GetHPItems[i].id)], this.GetHPItems[i].id, "ZL"]);
	}
};
/**绘制项目 */
Star_Window_GetHpItems.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};
/**状态宽 */
Star_Window_GetHpItems.prototype.statusWidth = function() {
    return 120;
};
Star_Window_GetHpItems.prototype.statusText = function(index) {
    return this.booleanStatusText($gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems[$dataItems[this.GetHPItems[index].id].name  + Star.NumToThreeNum(this.GetHPItems[index].id)]);
};

Star_Window_GetHpItems.prototype.booleanStatusText = function(value) {
    return value ? 'ON' : 'OFF';
};
/**处理确定 */
Star_Window_GetHpItems.prototype.processOk = function() {
    var index = this.index();
	if(typeof this._list[index] !== "undefined"){
	    $gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems[$dataItems[this.GetHPItems[index].id].name + Star.NumToThreeNum(this.GetHPItems[index].id)] = !$gameParty._XdRsData_hangUp_RecoveryHMP.GetHpItems[$dataItems[this.GetHPItems[index].id].name + Star.NumToThreeNum(this.GetHPItems[index].id)];
	}
	this.RefmakeCommandList();
	    // 设置结束
	this.refresh();
};
/**更新变量 */
Star_Window_GetHpItems.prototype.update = function() {
	Window_Command.prototype.update.call(this);
    var index = this.index();
	if(typeof this._list[index] == "undefined"){
		if($ && $.toaster) $.toaster({ message : '没药了'});
		Input._currentState['escape']=true;
		setTimeout("Input._currentState['escape']=false;", 100);
	}
	this.RefmakeCommandList();
	this.refresh();
};

// 回蓝药物设置
function Star_Scene_GetMpItems() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Scene_GetMpItems.prototype = Object.create(Scene_MenuBase.prototype);
/**设置创造者 */
Star_Scene_GetMpItems.prototype.constructor = Star_Scene_GetMpItems;
/**初始化 */
Star_Scene_GetMpItems.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
/**创建 */
Star_Scene_GetMpItems.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAutomaticCombatSkillWindow();
};
/**创建选项窗口 */
Star_Scene_GetMpItems.prototype.createAutomaticCombatSkillWindow = function() {
    this._GetMpItems = new Star_Window_GetMpItems();
    this._GetMpItems.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._GetMpItems);
};

function Star_Window_GetMpItems() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Window_GetMpItems.prototype = Object.create(Window_Command.prototype);
/**设置创造者 */
Star_Window_GetMpItems.prototype.constructor = Star_Window_GetMpItems;
/**初始化 */
Star_Window_GetMpItems.prototype.initialize = function() {
	this.IndexBol = {};
    this.GetMPItems = [];
	// 获取回血药物
	// code 11 回血
	// code 12 回蓝
	// $gameParty.items() //获取当前拥有物品
	// $gameParty._items //获取当前拥有物品ID及数量
	// $gameParty._items[$gameParty.items()[0].id] // 获取拥有物品的数量
	// $gameParty.items()[0].effects[0].code // 获取物品的code功效
	// 如果code为11/12 加入数组
	$gameParty._XdRsData_hangUp_RecoveryHMP = $gameParty._XdRsData_hangUp_RecoveryHMP || {};
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems = $gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems || {};
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems = $gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems || [];
	for(var i = 0;i < $gameParty.items().length;i++){
		for(var a = 0;a < $gameParty.items()[i].effects.length;a++){
		    if($gameParty.items()[i].effects[a].code == "12"){
				this.GetMPItems.push({id : $gameParty.items()[i].id, num : $gameParty._items[$gameParty.items()[i].id]});
			}
	    }
	};
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};
/**窗口宽 */
Star_Window_GetMpItems.prototype.windowWidth = function() {
    return 400;
};
/**窗口高 */
Star_Window_GetMpItems.prototype.windowHeight = function() {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};
/**更新位置 */
Star_Window_GetMpItems.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};
/*
Star.XdRsData_hangUp.IsActSkill = false;
SceneManager.push(Star_Scene_AutomaticCombat);
*/
/**制作命令列表 */
Star_Window_GetMpItems.prototype.makeCommandList = function() {
	// 生成回血药物
	for(var i = 0;i < this.GetMPItems.length;i++){
		this.addCommand($dataItems[this.GetMPItems[i].id].name + " 剩余:" + this.GetMPItems[i].num, "Hp" +  i);
		$gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems[$dataItems[this.GetMPItems[i].id].name + Star.NumToThreeNum(this.GetMPItems[i].id)] = !!$gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems[$dataItems[this.GetMPItems[i].id].name + Star.NumToThreeNum(this.GetMPItems[i].id)];
	};
	this.RefmakeCommandList();
};
/**刷新命令列表 */
Star_Window_GetMpItems.prototype.RefmakeCommandList = function() {
	if(this.GetMPItems.length == 0){
		Input._currentState['escape']=true;
		setTimeout("Input._currentState['escape']=false;", 100);
		return;
		// alert("回血物品获取为空")
	};
	// console.log(this.index())
	if(typeof this.index() == "number" && this.index() >= 0){
		$gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems[$dataItems[this.GetMPItems[this.index()].id].name + Star.NumToThreeNum(this.GetMPItems[this.index()].id)] = !!$gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems[$dataItems[this.GetMPItems[this.index()].id].name + Star.NumToThreeNum(this.GetMPItems[this.index()].id)];
	};
	$gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems = [];
	for(i = 0;i < this.GetMPItems.length;i++){
	    $gameParty._XdRsData_hangUp_RecoveryHMP.GetMpArrItems.push([$gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems[$dataItems[this.GetMPItems[i].id].name + Star.NumToThreeNum(this.GetMPItems[i].id)], this.GetMPItems[i].id]);
	}
};
/**绘制项目 */
Star_Window_GetMpItems.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};
/**状态宽 */
Star_Window_GetMpItems.prototype.statusWidth = function() {
    return 120;
};
Star_Window_GetMpItems.prototype.statusText = function(index) {
    return this.booleanStatusText($gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems[$dataItems[this.GetMPItems[index].id].name  + Star.NumToThreeNum(this.GetMPItems[index].id)]);
};

Star_Window_GetMpItems.prototype.booleanStatusText = function(value) {
    return value ? 'ON' : 'OFF';
};
/**处理确定 */
Star_Window_GetMpItems.prototype.processOk = function() {
    var index = this.index();
	if(typeof this._list[index] !== "undefined"){
	    $gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems[$dataItems[this.GetMPItems[index].id].name + Star.NumToThreeNum(this.GetMPItems[index].id)] = !$gameParty._XdRsData_hangUp_RecoveryHMP.GetMPItems[$dataItems[this.GetMPItems[index].id].name + Star.NumToThreeNum(this.GetMPItems[index].id)];
	}
	this.RefmakeCommandList();
	    // 设置结束
	this.refresh();
};
/**更新变量 */
Star_Window_GetMpItems.prototype.update = function() {
	Window_Command.prototype.update.call(this);
    var index = this.index();
	if(typeof this._list[index] == "undefined"){
		if($ && $.toaster) $.toaster({ message : '没药了'});
		Input._currentState['escape']=true;
		setTimeout("Input._currentState['escape']=false;", 100);
	}
	this.RefmakeCommandList();
	this.refresh();
};

// 自动卖出武器设置
function Star_Scene_AutomaticSellWeapon() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Scene_AutomaticSellWeapon.prototype = Object.create(Scene_MenuBase.prototype);
/**设置创造者 */
Star_Scene_AutomaticSellWeapon.prototype.constructor = Star_Scene_AutomaticSellWeapon;
/**初始化 */
Star_Scene_AutomaticSellWeapon.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
/**创建 */
Star_Scene_AutomaticSellWeapon.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createAutomaticCombatSkillWindow();
};
/**创建选项窗口 */
Star_Scene_AutomaticSellWeapon.prototype.createAutomaticCombatSkillWindow = function() {
    this._SellWeapon = new Star_Window_SellWeapon();
    this._SellWeapon.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._SellWeapon);
};

function Star_Window_SellWeapon() {
    this.initialize.apply(this, arguments);
}

/**设置原形  */
Star_Window_SellWeapon.prototype = Object.create(Window_Command.prototype);
/**设置创造者 */
Star_Window_SellWeapon.prototype.constructor = Star_Window_SellWeapon;
/**初始化 */
Star_Window_SellWeapon.prototype.initialize = function() {
	this.IndexBol = {};
	$gameParty._XdRsData_hangUp_SellWeapon = $gameParty._XdRsData_hangUp_SellWeapon || {};
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
};
/**窗口宽 */
Star_Window_SellWeapon.prototype.windowWidth = function() {
    return 400;
};
/**窗口高 */
Star_Window_SellWeapon.prototype.windowHeight = function() {
    return this.fittingHeight(Math.min(this.numVisibleRows(), 12));
};
/**更新位置 */
Star_Window_SellWeapon.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};
/*
Star.XdRsData_hangUp.IsActSkill = false;
SceneManager.push(Star_Scene_AutomaticCombat);
*/
/**制作命令列表 */
Star_Window_SellWeapon.prototype.makeCommandList = function() {
	// 是否贩卖
	this.addCommand("自动卖灰装", "quality0");
	this.addCommand("自动卖白装", "quality1");
	this.addCommand("自动卖绿装", "quality2");
	this.addCommand("自动卖蓝装", "quality3");
	this.addCommand("自动卖紫装", "quality4");
	this.addCommand("自动卖出回合", "SellQuality");
	this.RefmakeCommandList();
};
/**刷新命令列表 */
Star_Window_SellWeapon.prototype.RefmakeCommandList = function() {
	if(typeof this.index() == "number" && this.index() >= 0){
		var symbol = this.commandSymbol(this.index());
		if(symbol == "SellQuality"){
			$gameParty._XdRsData_hangUp_SellWeapon[symbol] = Number($gameParty._XdRsData_hangUp_SellWeapon[symbol]);
			if(String($gameParty._XdRsData_hangUp_SellWeapon[symbol]) == "NaN") $gameParty._XdRsData_hangUp_SellWeapon[symbol] = 1;
		}else{
			$gameParty._XdRsData_hangUp_SellWeapon[symbol] = !!$gameParty._XdRsData_hangUp_SellWeapon[symbol];
		}
	};
};
/**绘制项目 */
Star_Window_SellWeapon.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var statusWidth = this.statusWidth();
    var titleWidth = rect.width - statusWidth;
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, titleWidth, 'left');
    this.drawText(this.statusText(index), titleWidth, rect.y, statusWidth, 'right');
};
/**状态宽 */
Star_Window_SellWeapon.prototype.statusWidth = function() {
    return 120;
};
Star_Window_SellWeapon.prototype.statusText = function(index) {
	var symbol = this.commandSymbol(index);
    return this.booleanStatusText(symbol);
};

Star_Window_SellWeapon.prototype.booleanStatusText = function(symbol) {
	if(symbol == "SellQuality"){
		$gameParty._XdRsData_hangUp_SellWeapon[symbol] = Number($gameParty._XdRsData_hangUp_SellWeapon[symbol]);
		if(String($gameParty._XdRsData_hangUp_SellWeapon[symbol]) == "NaN") $gameParty._XdRsData_hangUp_SellWeapon[symbol] = 1;
	    return $gameParty._XdRsData_hangUp_SellWeapon[symbol];
	}else{
		return $gameParty._XdRsData_hangUp_SellWeapon[symbol] ? 'ON' : 'OFF';
	}
};
/**处理确定 */
Star_Window_SellWeapon.prototype.processOk = function() {
    var index = this.index();
	if(typeof this._list[index] !== "undefined"){
	    var symbol = this.commandSymbol(index);
		if(symbol == "SellQuality"){
			if($gameParty._XdRsData_hangUp_SellWeapon[symbol] > 10){
		    	$gameParty._XdRsData_hangUp_SellWeapon[symbol] = 0;
			}else{
				$gameParty._XdRsData_hangUp_SellWeapon[symbol] = Number($gameParty._XdRsData_hangUp_SellWeapon[symbol]) + 1;
			}
		}else{
			$gameParty._XdRsData_hangUp_SellWeapon[symbol] = !$gameParty._XdRsData_hangUp_SellWeapon[symbol];
		}
	}
	this.RefmakeCommandList();
	    // 设置结束
	this.refresh();
};
/**更新变量 */
Star_Window_SellWeapon.prototype.update = function() {
	Window_Command.prototype.update.call(this);
	this.RefmakeCommandList();
	this.refresh();
};

//==================================================================================================================
// end
//==================================================================================================================