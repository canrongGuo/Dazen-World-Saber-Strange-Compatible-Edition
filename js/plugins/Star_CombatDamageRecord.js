//=============================================================================
// Star_CombatDamageRecord.js
// Version: 1.0
//=============================================================================
 /*:
 * @plugindesc v1.0 战斗伤害记录.
 * @author Star
 *
 * @help
 * 开启后在战斗界面右下角记录本局伤害。
 */
 
// Imported
var Imported = Imported || {};
Imported.Star_CombatDamageRecord = true;

var Star = Star || {};
var Star_Window_BattleLog_prototype_initialize_CombatDamageRecord = Window_BattleLog.prototype.initialize;
Window_BattleLog.prototype.initialize = function() {
	Star_Window_BattleLog_prototype_initialize_CombatDamageRecord.apply(this, arguments);
	if(ConfigManager['CombatDamageRecordKey']){
        BattleDamageLog = 0;
        BattleDamageLog1 = 0;
        BattleDamageLog2 = 0;
        BattleDamageLog3 = 0;
        BattleDamageLog4 = 0;
    	Record = new Star_Record(Graphics.width - 300, Graphics.height - 175/* 200 */, 300,175/* 200 */);
    	SceneManager._scene.children.splice(2,0,Record);
    	Record.parent = SceneManager._scene;
	};
};

var Star_Window_BattleLog_prototype_displayActionResults_CombatDamageRecord = Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    Star_Window_BattleLog_prototype_displayActionResults_CombatDamageRecord.call(this, subject, target);
	//刷新统计
	if(ConfigManager['CombatDamageRecordKey']){
            SceneManager._scene.removeChild(Record);
	    	// BattleDamageLog = BattleDamageLog + target.result().hpDamage;
	        if($gameParty.battleMembers()[0] && target.name() !== $gameParty.battleMembers()[0].name() && subject.name() == $gameParty.battleMembers()[0].name()){
	    	    if(BattleDamageLog1 + target.result().hpDamage > 0) BattleDamageLog1 = BattleDamageLog1 + target.result().hpDamage;
	    	};
	        if($gameParty.battleMembers()[1] && target.name() !== $gameParty.battleMembers()[1].name() && subject.name() == $gameParty.battleMembers()[1].name()){
		        if(BattleDamageLog1 + target.result().hpDamage > 0) BattleDamageLog2 = BattleDamageLog2 + target.result().hpDamage;
		    };
	        if($gameParty.battleMembers()[2] && target.name() !== $gameParty.battleMembers()[2].name() && subject.name() == $gameParty.battleMembers()[2].name()){
		        if(BattleDamageLog1 + target.result().hpDamage > 0) BattleDamageLog3 = BattleDamageLog3 + target.result().hpDamage;
	    	};
	        if($gameParty.battleMembers()[3] && target.name() !== $gameParty.battleMembers()[3].name() && subject.name() == $gameParty.battleMembers()[3].name()){
	    	    if(BattleDamageLog1 + target.result().hpDamage > 0) BattleDamageLog4 = BattleDamageLog4 + target.result().hpDamage;
	    	};
	    	BattleDamageLog = BattleDamageLog1 + BattleDamageLog2 + BattleDamageLog3 + BattleDamageLog4;
		    Record = new Star_Record(Graphics.width - 300, Graphics.height - 200, 300,200);
	        SceneManager._scene.children.splice(2,0,Record);
	        Record.parent = SceneManager._scene;
	};
};

var Star_BattleManager_endBattle_CombatDamageRecord = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
	if(ConfigManager['CombatDamageRecordKey']){
	    SceneManager._scene.removeChild(Record);
    };
    Star_BattleManager_endBattle_CombatDamageRecord.call(this, result);
};

function Star_Record() {
    this.initialize.apply(this, arguments);
};

Star_Record.prototype = Object.create(Window_Base.prototype);

Star_Record.prototype.constructor = Star_Record;

Star_Record.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.opacity = 0;
    this.showBackgroundDimmer();
    this.Showtext();
};

Star_Record.prototype.refreshDimmerBitmap = function() {
    if (this._dimmerSprite) {
        var bitmap = this._dimmerSprite.bitmap;
        var w = this.width;
        var h = this.height;
        var m = this.standardPadding();
        var w1 = Math.ceil(w / 2);
        var h1 = h - m * 2;
        var c1 = this.dimColor1();
        var c2 = this.dimColor2();
        bitmap.resize(w, h);
        bitmap.gradientFillRect(0, m, w1, h1, c2, c1);
        bitmap.fillRect(w1, m, w1, h1, c1);
        this._dimmerSprite.setFrame(0, 0, w, h);
    }
};

Star_Record.prototype.Showtext = function () {
	var height = 1;
	this.contents.fontSize = 21;// 28
	Star.EX = this;
	var DisplayText1 = "伤害统计:" + (BattleDamageLog > 1000 ? /* Math.round */(BattleDamageLog/1000) + "k" : BattleDamageLog)
    this.drawText(DisplayText1, 0, height, this.width, "left");
    height += 24;// 30
	if(/* $gameParty.members().length > 1 &&  */$gameParty.battleMembers()[0]){
	var DisplayText2 = "" + $gameParty.battleMembers()[0].name() + ":" + (BattleDamageLog1 > 1000 ? /* Math.round */(BattleDamageLog1/1000) + "k" : BattleDamageLog1) + "(" + Math.round(BattleDamageLog1/(BattleDamageLog ? BattleDamageLog : 1)*100) + "%)";
    this.drawText(DisplayText2, 0, height, this.width, "left");
    height += 24;// 30
	};
	if(/* $gameParty.members().length > 1 &&  */$gameParty.battleMembers()[1]){
	var DisplayText3 = "" + $gameParty.battleMembers()[1].name() + ":" + (BattleDamageLog2 > 1000 ? /* Math.round */(BattleDamageLog2/1000) + "k" : BattleDamageLog2) + "(" + Math.round(BattleDamageLog2/(BattleDamageLog ? BattleDamageLog : 1)*100) + "%)";
    this.drawText(DisplayText3, 0, height, this.width, "left");
    height += 24;// 30
    };
	if(/* $gameParty.members().length > 2 &&  */$gameParty.battleMembers()[2]){
	var DisplayText4 = "" + $gameParty.battleMembers()[2].name() + ":" + (BattleDamageLog3 > 1000 ? /* Math.round */(BattleDamageLog3/1000) + "k" : BattleDamageLog3) + "(" + Math.round(BattleDamageLog3/(BattleDamageLog ? BattleDamageLog : 1)*100) + "%)";
    this.drawText(DisplayText4, 0, height, this.width, "left");
    height += 24;// 30
    };
	if(/* $gameParty.members().length > 3 &&  */$gameParty.battleMembers()[3]){
	var DisplayText5 = "" + $gameParty.battleMembers()[3].name() + ":" + (BattleDamageLog4 > 1000 ? /* Math.round */(BattleDamageLog4/1000) + "K" : BattleDamageLog4) + "(" + Math.round(BattleDamageLog4/(BattleDamageLog ? BattleDamageLog : 1)*100) + "%)";
    this.drawText(DisplayText5, 0, height, this.width, "left");
    };
};

//=============================================================================
// ConfigManager
//=============================================================================

Star_CombatDamageRecord_ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Star_CombatDamageRecord_ConfigManager_makeData.call(this);
    config.CombatDamageRecordKey = this.CombatDamageRecordKey;
    return config;
};

Star_CombatDamageRecord_ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Star_CombatDamageRecord_ConfigManager_applyData.call(this, config);
    this.CombatDamageRecordKey = this.readFlag(config, 'CombatDamageRecordKey');
};

//=============================================================================
// Window_Options
//=============================================================================

Star_Window_Options_prototype_addGeneralOptions_CombatDamageRecordKey = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function(){
Star_Window_Options_prototype_addGeneralOptions_CombatDamageRecordKey.call(this);
this.addCommand('战斗伤害记录', 'CombatDamageRecordKey');
};