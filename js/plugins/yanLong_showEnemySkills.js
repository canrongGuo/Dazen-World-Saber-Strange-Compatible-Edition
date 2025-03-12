var yanLong = yanLong || {};
yanLong.PinZhao = yanLong.PinZhao||{};

//==========================================================
//Scene_Battle
//==========================================================
//此处随时增加玩家的指令
yanLong.PinZhao.Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
	yanLong.PinZhao.Scene_Battle_createActorCommandWindow.call(this);
	  var win = this._actorCommandWindow;
	  win.setHandler('enemySkills', this.commandEnemySkills.bind(this));
};

Scene_Battle.prototype.commandEnemySkills = function() {
	this._isEnemySkills = true;
	//Scene_Battle.prototype.commandItem.call(this);//待改
	Scene_Battle.prototype.commandSkill.call(this);
};

yanLong.PinZhao.Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk; 
Scene_Battle.prototype.onSkillOk = function() {
	if(this._isEnemySkills==false){
		yanLong.PinZhao.Scene_Battle_onSkillOk.call(this);
	}else{
		this.onSkillCancel();
	}
};

yanLong.PinZhao.Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel; 
Scene_Battle.prototype.onSkillCancel = function() {
	this._isEnemySkills = false;
	yanLong.PinZhao.Scene_Battle_onSkillCancel.call(this);
};
//==========================================================
//Window_ActorCommand
//==========================================================
yanLong.PinZhao.Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
	  yanLong.PinZhao.Window_ActorCommand_makeCommandList.call(this);
	  this.createEnemySkillsCommand();
};

Window_ActorCommand.prototype.createEnemySkillsCommand = function() {
	  var enabled = true;
	  var text = '侦查敌技';
	  this.addCommand(text, 'enemySkills', enabled);
};

//==========================================================
//Window_SkillList
//==========================================================
yanLong.PinZhao.Window_SkillList_makeItemList = Window_SkillList.prototype.makeItemList;
Window_SkillList.prototype.makeItemList = function() {
	SceneManager._scene._isEnemySkills = SceneManager._scene._isEnemySkills || false;
	if(SceneManager._scene._isEnemySkills==true){
		this._data = $gameTroop._enemies[0].allSkills();
	}else{
		yanLong.PinZhao.Window_SkillList_makeItemList.call(this);
	}
};

yanLong.PinZhao.Window_SkillList_drawCooldown = Window_SkillList.prototype.drawCooldown;
Window_SkillList.prototype.drawCooldown = function(skill, wx, wy, dw) {
	SceneManager._scene._isEnemySkills = SceneManager._scene._isEnemySkills || false;
	if(SceneManager._scene._isEnemySkills==false){
		yanLong.PinZhao.Window_SkillList_drawCooldown.call(this, skill, wx, wy, dw);
	}else{
		this.drawCooldown2(skill, wx, wy, dw);
	}
};

yanLong.PinZhao.Window_SkillList_drawWarmup = Window_SkillList.prototype.drawWarmup;
Window_SkillList.prototype.drawWarmup = function(skill, wx, wy, dw) {
	SceneManager._scene._isEnemySkills = SceneManager._scene._isEnemySkills || false;
	if(SceneManager._scene._isEnemySkills==false){
		yanLong.PinZhao.Window_SkillList_drawWarmup.call(this, skill, wx, wy, dw);
	}else{
		this.drawWarmup2(skill, wx, wy, dw);
	}
};

//怪的消耗显示
Window_SkillList.prototype.drawCooldown2 = function(skill, wx, wy, dw) {
	var enemy = $gameTroop._enemies[0];
    if (Yanfly.Icon.Cooldown > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Cooldown, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.CDTextColor));
    var fmt = Yanfly.Param.CDFmt;
    var value = enemy.cooldown(skill.id);
    if (value % 1 !== 0) value = value.toFixed(2);
    if (value <= 0.009) value = 0.01;
    var text = fmt.format(Yanfly.Util.toGroup(value));
    this.contents.fontSize = Yanfly.Param.CDFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawWarmup2 = function(skill, wx, wy, dw) {
	var enemy = $gameTroop._enemies[0];
    if (Yanfly.Icon.Warmup > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Warmup, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.WUTextColor));
    var fmt = Yanfly.Param.WUFmt;
    var value = enemy.warmup(skill.id);
    if (value % 1 !== 0) value = value.toFixed(2);
    if (value <= 0.009) value = 0.01;
    var text = fmt.format(Yanfly.Util.toGroup(value));
    this.contents.fontSize = Yanfly.Param.WUFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, width) {
	SceneManager._scene._isEnemySkills = SceneManager._scene._isEnemySkills || false;
	if(SceneManager._scene._isEnemySkills==false){
		if (this._actor.warmup(skill.id) > 0) {
		      return this.drawWarmup(skill, wx, wy, width);
		    } else if (this._actor.cooldown(skill.id) > 0) {
		      return this.drawCooldown(skill, wx, wy, width);
		    } else {
		      return Yanfly.SCD.Window_SkillList_drawCost.call(this, skill, wx, wy, width);
		    }
	}else{
		var enemy = $gameTroop._enemies[0];
		if (enemy.warmup(skill.id) > 0) {
		      return this.drawWarmup2(skill, wx, wy, width);
		} else if (enemy.cooldown(skill.id) > 0) {
		      return this.drawCooldown2(skill, wx, wy, width);
		} else {
			var dw = width;
		    dw = this.drawTpCost2(skill, wx, wy, dw);
		    dw = this.drawMpCost2(skill, wx, wy, dw);
		    dw = this.drawHpCost2(skill, wx, wy, dw);
		    dw = this.drawCustomDisplayCost(skill, wx, wy, dw);
		    dw = this.drawOtherCost(skill, wx, wy, dw);
		    return dw;
		} 
	}
};

Window_SkillList.prototype.drawTpCost2 = function(skill, wx, wy, dw) {
	var enemy = $gameTroop._enemies[0];
    if (enemy.skillTpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Tp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Tp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCTpTextColor));
    var fmt = Yanfly.Param.SCCTpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(enemy.skillTpCost(skill)),
      TextManager.tpA);
    this.contents.fontSize = Yanfly.Param.SCCTpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawMpCost2 = function(skill, wx, wy, dw) {
	var enemy = $gameTroop._enemies[0];
    if (enemy.skillMpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Mp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Mp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCMpTextColor));
    var fmt = Yanfly.Param.SCCMpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(enemy.skillMpCost(skill)),
      TextManager.mpA);
    this.contents.fontSize = Yanfly.Param.SCCMpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawHpCost2 = function(skill, wx, wy, dw) {
	var enemy = $gameTroop._enemies[0];
    if (enemy.skillHpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Hp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Hp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCHpTextColor));
    var fmt = Yanfly.Param.SCCHpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(enemy.skillHpCost(skill)),
      TextManager.hpA);
    this.contents.fontSize = Yanfly.Param.SCCHpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

yanLong.PinZhao.Window_SkillList_isEnabled = Window_SkillList.prototype.isEnabled;
Window_SkillList.prototype.isEnabled = function(item) {
	SceneManager._scene._isEnemySkills = SceneManager._scene._isEnemySkills || false;
	if(SceneManager._scene._isEnemySkills == true){
		var enemy = $gameTroop._enemies[0];
		return enemy.canUse(item);
	}else{
		return yanLong.PinZhao.Window_SkillList_isEnabled.call(this, item);
	}
};

//==========================================================
//Game_Enemy 
//==========================================================
yanLong.PinZhao.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	yanLong.PinZhao.Game_Enemy_setup.call(this, enemyId, x, y);
	$gameTemp._enemyShowSkills = {};
	this._showSkillsData = [];
	var len = this.enemy().actions.length;
	var obj = this.enemy().actions;
	for(var i=0;i<len;i++){
		var skillId = obj[i].skillId;
		if(this._showSkillsData.indexOf(skillId)<0){
			this._showSkillsData.push(skillId);
			$gameTemp._enemyShowSkills[skillId] = false;
		};
	};
};

//获取敌人显示的技能 9号技能为不能显示的技能 请将9号技能设置为技能不可见的说明
Game_Enemy.prototype.allSkills = function(){
	var data = [];
	var skillIds = this._showSkillsData;
	var len = skillIds.length;
	for(var i=0;i<len;i++){
		var skillId = skillIds[i];
		var obj = $dataSkills[skillId];
		if($gameTemp._enemyShowSkills[skillId]==true || obj.name=="待机"){
			data.push(obj);
		}else{
			obj = $dataSkills[9];
			data.push(obj);
		};
	}
	return data;
};

//==========================================================
//BattleManager  
//==========================================================
yanLong.PinZhao.BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    yanLong.PinZhao.BattleManager_startAction.call(this);
    var subject = this._subject;
    if(!subject.isActor()){
    	var action = subject.currentAction();
    	var skillId = action.item().id;
		$gameTemp._enemyShowSkills[skillId] = true;
    };
};

//==========================================================
//调用部分 
//==========================================================
//yanLong.PinZhao.showEnemyAllSkills();//
//显示怪物的所有技能
yanLong.PinZhao.showEnemyAllSkills = function(){
	for(key in $gameTemp._enemyShowSkills){
		$gameTemp._enemyShowSkills[key] = true;
	}
};