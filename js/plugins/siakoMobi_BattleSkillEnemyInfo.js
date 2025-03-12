//--------------------------------------------------------------------------------------
// siakoMobi_BattleSkillEnemyInfo.js
//--------------------------------------------------------------------------------------
//======================================================================================
/*:
* @plugindesc siakoMobi plugins #7：v0.80 Battle Skill Enemy Info 戰鬥畫面查看敵人屬性 - SIAKO.Mobi for RMMV Plugins Development
* 
* @author siakoMobi 

* @help
* ======================================================================================
* 插件 - 戰鬥畫面查看敵人屬性 - 說明
* Plugin  : siakoMobi Battle Skill Enemy Info (siakoMobi_BattleSkillEnemyInfo.js)
* Author  : siakoMobi
* Version : v0.80
* ======================================================================================
*
*   【插件介紹】
*   是否覺得如果可以在戰鬥中使用技能來查看敵人屬性，是不是方便許多，所
*   謂知己知彼、百戰敗勝，這個插件可以如您所願。
*
*   【插件功能】
*   - 可調整敵人屬性文字顯示
*
*   【插件使用方法】
*   - 將 js 資料夾內的 plugins 目錄的 siakoMobi_BattleSkillEnemyInfo.js 
*     複製至您的遊戲對應目錄內。
*
*   【插件指令】
*   - EnemyInfo Active   開啟敵人屬性狀態視窗
*   - EnemyInfo Disabled 關閉敵人屬性狀態視窗
*
*   【關於 siakoMobi】
*   ★ SIAKO.Mobi RPG Maker MV engine Games 官方網站
*     https://app.siako.mobi
*
*   ★ SIAKO.Mobi：RPG Maker MV 遊戲製作教學 YT實況 
*     https://www.youtube.com/channel/UC8qJ2P8FC4uKzTrSVxE_dEg
*
*   ★ SIAKO.Mobi：RPG Maker MV 遊戲製作教學
*     https://www.youtube.com/playlist?list=PLaT5a8b-evLGkql_g6HkCs4pHK_62a1fB
*
*   ★ SIAKO.Mobi：RPG Maker MV Plugin Scripting 腳本教學漸進篇
*     https://www.youtube.com/playlist?list=PLaT5a8b-evLHPRhWhsp12bKlKLoalyji8
*
*   ★ SIAKO.Mobi：RPG Maker MV Plugin Scripting 腳本教學進階篇
*     https://www.youtube.com/playlist?list=PLaT5a8b-evLELNWRf6N6B72q1xDM8yVzJ
*
*   ★ SIAKO.Mobi：RPG Maker MV Plugin Scripting 腳本教學 PIXI V4 運用篇
*     https://www.youtube.com/playlist?list=PLaT5a8b-evLG1M6RWSLqppETPVBePQI1P
*
*   ★ 巴哈社團「掛RM賣其他」
*     http://guild.gamer.com.tw/guild.php?sn=11222
*
*
*   非常感謝您使用 siakoMobi MV 插件，希望對您製作遊戲有更大的幫助！
*
* ======================================================================================
* 更新日誌 - siakoMobi Battle Skill Enemy Info  Plugin
* ======================================================================================
*
* 2016.11.03 : Version 0.80: 
* - 插件完成
*
* ======================================================================================
* End
* ======================================================================================
*
* @param -- 敵人狀態屬性名調整 --
*
* @param ★最大ＨＰ
* @desc 更改最大ＨＰ文字
* 預設值：最大ＨＰ
* @default 最大ＨＰ
*
* @param ★最大ＭＰ
* @desc 更改最大ＭＰ文字
* 預設值：最大ＭＰ
* @default 最大ＭＰ
*
* @param ★攻擊力
* @desc 更改攻擊力文字
* 預設值：攻 擊 力
* @default 攻 擊 力
*
* @param ★防禦力
* @desc 更改防禦力文字
* 預設值：防 禦 力
* @default 防 禦 力
*
* @param ★魔法攻擊
* @desc 更改魔法攻擊文字
* 預設值：魔法攻擊
* @default 魔法攻擊
*
* @param ★魔法防禦
* @desc 更改魔法防禦文字
* 預設值：魔法防禦
* @default 魔法防禦
*
* @param ★敏捷度
* @desc 更改敏捷度文字
* 預設值：敏 捷 度
* @default 敏 捷 度
*
* @param ★幸運值
* @desc 更改幸運值文字
* 預設值：幸 運 值
* @default 幸 運 值
*
* @param ★經驗值
* @desc 更改經驗值文字
* 預設值：經 驗 值
* @default 經 驗 值
*
* @param ★金錢數
* @desc 更改金錢數文字
* 預設值：金 錢 數
* @default 金 錢 數
*
*/
//======================================================================================

/***************************************************************************************
 @ plugins  : Battle Skill Enemy Info
 @ filename : siakoMobi_BattleSkillEnemyInfo.js
 @ version  : v0.80
 @ author   : siakoMobi  
 @ release  : 2016.11.03 
 @ comment  : 戰鬥畫面查看敵人屬性
***************************************************************************************/ 

//====================================================================================== 
// comment  : 宣告物件變數定義
//====================================================================================== 
var Imported = Imported || {};
Imported.siakoMobi_BattleSkillEnemyInfo = true;

var siakoMobi = siakoMobi || {};  
siakoMobi.Plugins_BattleSkillEnemyInfo = {};

siakoMobi._lastIndexOf        = document.currentScript.src.lastIndexOf( '/' );
siakoMobi._indexOf            = document.currentScript.src.indexOf( '.js' );
siakoMobi._getJSName          = document.currentScript.src.substring( siakoMobi._lastIndexOf + 1, siakoMobi._indexOf );
siakoMobi._isEnemyInfo        = false;
siakoMobi._removeEnemyInfo    = false;
siakoMobi._EnemyInfoHelpText1 = '按下［';
siakoMobi._EnemyInfoHelpText2 = 'Ｅｎｔｅｒ';
siakoMobi._EnemyInfoHelpText3 = '］or［';
siakoMobi._EnemyInfoHelpText4 = 'Ｅｓｃ';
siakoMobi._EnemyInfoHelpText5 = '］返回戰鬥';

(function(){

    //==================================================================================
    // comment  : 插件參數定義
    //==================================================================================    
    siakoMobi.Plugins_BattleSkillEnemyInfo              = PluginManager.parameters( siakoMobi._getJSName );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyMaxHP  = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★最大ＨＰ'] || '最大ＨＰ' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyMaxMP  = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★最大ＭＰ'] || '最大ＭＰ' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyAP     = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★攻擊力'] || '攻 擊 力' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyDP     = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★防禦力'] || '防 禦 力' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyMAP    = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★魔法攻擊'] || '魔法攻擊' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyMDP    = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★魔法防禦'] || '魔法防禦' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemySP     = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★敏捷度'] || '敏 捷 度' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyLP     = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★幸運值'] || '幸 運 值' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyEXP    = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★經驗值'] || '經 驗 值' );
    siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyGold   = String( siakoMobi.Plugins_BattleSkillEnemyInfo['★金錢數'] || '金 錢 數' );

    //==================================================================================
    // comment  : 插件命令定義
    //==================================================================================     
	siakoMobi._InterpreterCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args){

	    siakoMobi._InterpreterCommand.call(this, command, args);

	    if( command == 'EnemyInfo' ){

	        switch( args[0] ){

	            case 'Active':   siakoMobi._isEnemyInfo     = true; break;           
	            case 'Disabled': siakoMobi._removeEnemyInfo = true; break;           
	                                                     
	        }

	    }

	}

    //==================================================================================
    // comment  : Scene_Battle 呼叫敵人狀態視窗並以別名擴充戰鬥場景的更新方法
    //==================================================================================     
    var siakoMobi_create = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        
        siakoMobi_create.call(this);

        if( siakoMobi._isEnemyInfo == true ){

	        this._customWindow = new Window_Enemyinfo();      
	        this.addWindow( this._customWindow );
	        siakoMobi._isEnemyInfo = false;

	    }

	    if( siakoMobi._removeEnemyInfo == true ){

	        SoundManager.playCancel();
	        this._customWindow.close();
	        siakoMobi._removeEnemyInfo = false;

	    }	    

    };

    //==================================================================================
    // comment  : Window_Enemyinfo 建立敵人狀態視窗
    //================================================================================== 
    function Window_Enemyinfo() {

        this.initialize.apply(this, arguments);

    }

    Window_Enemyinfo.prototype = Object.create(Window_Base.prototype);
    Window_Enemyinfo.prototype.constructor = Window_Enemyinfo;

    Window_Enemyinfo.prototype.initialize = function(x, y) {

        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();

    };

    //==================================================================================
    // comment  : Window_Enemyinfo 視窗寬度
    //================================================================================== 
    Window_Enemyinfo.prototype.windowWidth = function() { return 816; };

    //==================================================================================
    // comment  : Window_Enemyinfo 視窗高度
    //================================================================================== 
    Window_Enemyinfo.prototype.windowHeight = function() { return 624; };

    //==================================================================================
    // comment  : Window_Enemyinfo 更新敵人狀態視窗動態
    //==================================================================================     
    Window_Enemyinfo.prototype.refresh = function() {

        var x = this.textPadding();
        var width = this.contents.width - this.textPadding() * 2;
        this.contents.clear();

        //載入敵人對應之圖片名
        this._showEnemySprite = new Sprite();
        this._showEnemySprite.bitmap = ImageManager.loadSvEnemy(siakoMobi._getEnemyBattlerName, siakoMobi._getEnemyBattlerHue);
        this._showEnemySprite.anchor.x = 0.5;
        this._showEnemySprite.anchor.y = 0.5;
        this._showEnemySprite.scale.x = 1;
        this._showEnemySprite.scale.y = 1;
        this._showEnemySprite.x = 380;
        this._showEnemySprite.y = 180;
        this.addChildAt(this._showEnemySprite, 1);

        //顯示上方操作說明
		this.contents.fontSize = 18;
	        this.drawText( siakoMobi._EnemyInfoHelpText1, 220, 0 );
		        this.changeTextColor(this.textColor(17));
		        	this.drawText( siakoMobi._EnemyInfoHelpText2, 270, 0 );
		        this.resetTextColor();
	        this.drawText( siakoMobi._EnemyInfoHelpText3, 355, 0 );
		        this.changeTextColor(this.textColor(17));
		        	this.drawText( siakoMobi._EnemyInfoHelpText4, 405, 0 );
		        this.resetTextColor();
	        this.drawText( siakoMobi._EnemyInfoHelpText5, 455, 0 );

        //顯示敵人名稱
        this.contents.fontSize = 32;
	        this.changeTextColor(this.textColor(17));
	       		this.drawText( siakoMobi._getEnemyName, 340, 280 );
	        this.resetTextColor();
        this.contents.fontSize = 24;
             
        //顯示敵人所有狀愛值
        this.changeTextColor(this.textColor(1)); 
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyMaxHP, 100, 340 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyMaxMP, 100, 380 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyAP, 450, 340 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyDP, 450, 380 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyMAP, 450, 420 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyMDP, 450, 460 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemySP, 100, 420 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyLP, 100, 460 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyEXP, 100, 500 );
	        this.drawText( siakoMobi.Plugins_BattleSkillEnemyInfo._EnemyGold, 450, 500 );
        this.resetTextColor();

		this.changeTextColor(this.textColor(14)); 
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].params[0], 250, 340 );        
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].params[1], 250, 380 );
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].params[2], 600, 340 );
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].params[3], 600, 380 );
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].params[4], 600, 420 );
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].params[5], 600, 460 );
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].params[6], 250, 420 );
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].params[7], 250, 460 );
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].exp, 250, 500 );
	        this.drawText( $dataEnemies[siakoMobi._getEnemyId].gold, 600, 500 );        
        this.resetTextColor();

    };

    //==================================================================================
    // comment  : Window_Enemyinfo 視窗基底呼叫
    //==================================================================================     
    Window_Enemyinfo.prototype.open = function() { this.refresh(); Window_Base.prototype.open.call(this); };

    //==================================================================================
    // comment  : Scene_Battle 技能確認後並取得使用的技能 ID 值
    //==================================================================================   
	Scene_Battle.prototype.onSkillOk = function() {

	    var skill = this._skillWindow.item();
	    var action = BattleManager.inputtingAction();

	    siakoMobi._getSkillId = skill.id;
	    action.setSkill(skill.id);
	    BattleManager.actor().setLastBattleSkill(skill);
	    this.onSelectAction();

	};

    //==================================================================================
    // comment  : Scene_Battle 敵人選定後並判斷使用的技能 ID 值
    //================================================================================== 
	Scene_Battle.prototype.onEnemyOk = function() {

	    var action = BattleManager.inputtingAction();
	    action.setTarget(this._enemyWindow.enemyIndex());
	    this._enemyWindow.hide();
	    this._skillWindow.hide();
	    this._itemWindow.hide();
	    this.selectNextCommand();

	    //如果使用的技能ID值不等於空，往下執行
		if( siakoMobi._getSkillId != null ){

			//如果使用的技能ID之註解資訊 isEnemyView 等於 1，往下執行
		    if( $dataSkills[siakoMobi._getSkillId].meta.isEnemyView == 1 ){

		    	//取得該選取敵人之ID、名稱、圖片名、色調名
			    siakoMobi._getEnemyId = $gameTroop._enemies[this._enemyWindow.enemyIndex()]._enemyId;
			    siakoMobi._getEnemyName = $dataEnemies[$gameTroop._enemies[this._enemyWindow.enemyIndex()]._enemyId].name;
			    siakoMobi._getEnemyBattlerName = $dataEnemies[$gameTroop._enemies[this._enemyWindow.enemyIndex()]._enemyId].battlerName;
			    siakoMobi._getEnemyBattlerHue = $dataEnemies[$gameTroop._enemies[this._enemyWindow.enemyIndex()]._enemyId].battlerHue;
				
			    //最後將取得使用的技能 ID 值設定為無
				siakoMobi._getSkillId = null;

			}

		}

	};

})();