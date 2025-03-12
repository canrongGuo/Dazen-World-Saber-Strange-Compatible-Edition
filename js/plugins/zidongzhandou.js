/*:
 * zidongzhandou.js
 * @plugindesc 自定义战斗与撤退
 * @author 魏玉龙 & Fanzi完善美化加Debug
 * @since 2019.05.23
 * @version 2.0
 * 
 * @param 自动战斗
 * @desc 开启自动战斗，否 - false 是 - true
 * @default true
 * @type boolean
 * @on 是
 * @off 否
 * 
 * @param 指令命名
 * @desc 命令显示文字
 * @default 自动
 * 
 * @param 持续自动
 * @desc 是否连续的自动战斗，否 - false 是 - true
 * @default false
 * @type boolean
 * @on 是
 * @off 否
 * 
 * @param 跳过信息
 * @desc 跳过战斗中的消息，否 - false 是 - true
 * @default false
 * @type boolean
 * @on 是
 * @off 否
 * 
 * @param 自动按钮
 * @desc 自动按钮图片名，不使用可留空。
 * @default AutoBattle
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 自动坐标
 * @desc 显示在战斗场景的自定义位置，格式如：888,666
 * @default 100,384
 * 
 * @param 手动按钮
 * @desc 手动按钮图片名，不使用可留空。
 * @default MenBattle
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 手动坐标
 * @desc 显示在战斗场景的自定义位置，格式如：888,666
 * @default 400,450
 * 
 * @param 撤退按钮
 * @desc 撤退按钮图片名，不使用可留空。
 * @default cancel
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param 撤退坐标
 * @desc 显示在战斗场景的自定义位置，格式如：888,666
 * @default 756,384
 * 
 * @param 撤退判定
 * @desc 系统判定成功率 - false 强制撤离 - true
 * @default false
 * @type boolean
 * @on 是
 * @off 否
 * 
 * @param 按钮声效
 * @desc 声效文件名，不使用可留空。
 * @default Cancel2
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @help
 * 此插件提供以下插件命令：
 * 
 * AutoBattle enable
 *   开启自动战斗
 * 
 * AutoBattle disable
 *   关闭自动战斗
 * 
 * AutoBattle continous true/false
 *   是否开启连续的自动战斗
 * 
 * AutoBattle skipMessage true/false
 *   是否跳过战斗中的消息
 *
 * 使用本插件进入战斗场景将直接进入战斗选择。保留撤退判定的话
 * 一旦撤退失败将要重新撤退直至成功或者自动战斗一回合，才能手动
 */
 
(function () {
  var parameters = PluginManager.parameters('zidongzhandou');
  var ButtenName1 = String(parameters['自动按钮']);
  var ButtenName2 = String(parameters['撤退按钮']);
  var ButtenName3 = String(parameters['手动按钮']);
  var CancelSound = String(parameters['按钮声效']);
  var BattlePosition1 = parameters['自动坐标'].split(",");
  var BattlePosition2 = parameters['撤退坐标'].split(",");
  var BattlePosition3 = parameters['手动坐标'].split(",");
  var CancelMode = JSON.parse(parameters['撤退判定'] || false);
  var autoBattle = {
    enabled: JSON.parse(parameters['自动战斗'] || true),
    command: String(parameters['指令命名'] || '自动'),
    continous: JSON.parse(parameters['持续自动'] || false),
    skipMessage: JSON.parse(parameters['跳过信息'] || false)
  };
 
  var Game_Temp_prototype_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    Game_Temp_prototype_initialize.call(this);
    this._continousAutoBattle = false;
  };

  var Scene_Battle_prototype_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    Scene_Battle_prototype_update.call(this);
	var ax = parseInt(BattlePosition1[0]);
    var ay = parseInt(BattlePosition1[1]);
	var sx = parseInt(BattlePosition2[0]);
    var sy = parseInt(BattlePosition2[1]);
	var mx = parseInt(BattlePosition3[0]);
    var my = parseInt(BattlePosition3[1]);
    var mw = parseInt(BattlePosition3[0]) + this._manbutten.bitmap.width;
    var mh = parseInt(BattlePosition3[1]) + this._manbutten.bitmap.height;
    var aw = parseInt(BattlePosition1[0]) + this._autobutten.bitmap.width;
    var ah = parseInt(BattlePosition1[1]) + this._autobutten.bitmap.height;
    var sw = parseInt(BattlePosition2[0]) + this._cancelbutten.bitmap.width;
    var sh = parseInt(BattlePosition2[1]) + this._cancelbutten.bitmap.height;
    if (TouchInput.isTriggered()) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        if (x >= ax && y >= ay && x <= aw && y <= ah && this._actorCommandWindow.active) {
            if (CancelSound)
                AudioManager.playSe({"name":CancelSound,"volume":90,"pitch":100,"pan":0});
			this.commandAutoBattle();
			this._actorCommandWindow.close();
			this._actorCommandWindow.deactivate();
        } else if (x >= mx && y >= my && x <= mw && y <= mh && $gameTemp._continousAutoBattle) {
            if (CancelSound)
                AudioManager.playSe({"name":CancelSound,"volume":90,"pitch":100,"pan":0});
            $gameTemp._continousAutoBattle = false;
        } else if (x >= sx && y >= sy && x <= sw && y <= sh) {
            if (CancelSound)
                AudioManager.playSe({"name":CancelSound,"volume":90,"pitch":100,"pan":0});
			if (CancelMode) {
			    BattleManager._preemptive = true;
			    $gameParty.performEscape();
			    SoundManager.playEscape();
			    BattleManager._escaped = true;
			    BattleManager.processAbort();
            } else this.commandEscape();
        }
    }
    if ($gameTemp._continousAutoBattle && (Input.isTriggered('menu') || TouchInput._cancelled)) {
        SoundManager.playCancel();
        $gameTemp._continousAutoBattle = false;
    }
  }
  
  Scene_Battle.prototype.createAutoButten = function() {
    if (ButtenName1) {
        this._autobutten = new Sprite(ImageManager.loadPicture(ButtenName1));
        this.addChild(this._autobutten);
        this._autobutten.move(BattlePosition1[0], BattlePosition1[1]);
    }
  };
  
  Scene_Battle.prototype.createManButten = function() {
    if (ButtenName3) {
        this._manbutten = new Sprite(ImageManager.loadPicture(ButtenName3));
        this.addChild(this._manbutten);
        this._manbutten.move(BattlePosition3[0], BattlePosition3[1]);
    }
  };

  Scene_Battle.prototype.createCancelButten = function() {
    if (ButtenName2) {
        this._cancelbutten = new Sprite(ImageManager.loadPicture(ButtenName2));
        this.addChild(this._cancelbutten);
        this._cancelbutten.move(BattlePosition2[0], BattlePosition2[1]);
    }
  };

  var Scene_Battle_prototype_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    if (!autoBattle.continous) {
      $gameTemp._continousAutoBattle = false;
    }
    Scene_Battle_prototype_createAllWindows.call(this);
	if (BattlePosition1[1]) this.createAutoButten();
	if (BattlePosition3[1]) this.createManButten();
	if (BattlePosition2[1]) this.createCancelButten();
  };
 
  var Scene_Battle_prototype_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
  Scene_Battle.prototype.createPartyCommandWindow = function () {
    Scene_Battle_prototype_createPartyCommandWindow.call(this);
    if (autoBattle.enabled) {
      this._partyCommandWindow.setHandler('auto', this.commandAutoBattle.bind(this));
    }
  };
 
  Scene_Battle.prototype.changeInputWindow = function() {
    if (BattleManager.isInputting()) {
        if (BattleManager.actor()) {
            this.startActorCommandSelection();
        } else {
            this.startPartyCommandSelection();
			this._partyCommandWindow.deactivate();
			this.selectNextCommand();
        }
    } else {
        this.endCommandSelection();
    }
  };
 
  var Scene_Battle_prototype_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
  Scene_Battle.prototype.startPartyCommandSelection = function () {
    if ($gameTemp._continousAutoBattle && !SceneManager.isSceneChanging()) {
      this.commandAutoBattle.call(this);
    } else {
      Scene_Battle_prototype_startPartyCommandSelection.call(this);
    }
  };
  
  Scene_Battle.prototype.commandAutoBattle = function () {
    $gameParty.battleMembers().forEach(function (member) {
      if (member.canInput()) {
        member.makeAutoBattleActions();
      }
    });
    $gameTemp._continousAutoBattle = true;
    this._partyCommandWindow.deactivate();
    BattleManager.startTurn();
  };
  
  Scene_Battle.prototype.refreshAutobattlerStatusWindow = function () {
    $gameParty.battleMembers().forEach(function (member) {
      if (member.isAutoBattle()) {
        this._statusWindow.drawItem(member.index)
      }
    });
  };
 
  var Window_Message_prototype_startPause = Window_Message.prototype.startPause;
  Window_Message.prototype.startPause = function () {
    if ($gameParty.inBattle() && $gameTemp._continousAutoBattle && autoBattle.skipMessage) {
      this.terminateMessage();
    } else {
      Window_Message_prototype_startPause.call(this);
    }
  }
 
  var Window_PartyCommand_prototype_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
  Window_PartyCommand.prototype.makeCommandList = function () {
    Window_PartyCommand_prototype_makeCommandList.call(this);
    if (autoBattle.enabled) {
      this.addCommand(autoBattle.command, 'auto');
    }
  };

  BattleManager.displayStartMessages = function() {
    if (this._preemptive) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
  };
 
  var Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Game_Interpreter_prototype_pluginCommand.call(this, command, args);
    if (command === "AutoBattle") {
      switch (args) {
        case 'enable':
          autoBattle.enabled = true;
          break
        case 'disable':
          autoBattle.enabled = false;
          break
        case 'continous':
          autoBattle.continous = JSON.parse(args[1]);
          break
        case 'skipMessage':
          autoBattle.continous = JSON.parse(args[1]);
          break
      }
    }
  };
})();