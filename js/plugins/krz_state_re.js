
//=============================================================================
// Yanfly Engine Plugins - buffstatecore - fix
// krz_state_re.js
//=============================================================================
var Imported = Imported || {};
Imported.krz_state_re = true;
//=============================================================================
 /*:
 * @plugindesc 优化状态核心了呀，每帧刷新调整至手动指定时间点刷新，当然你会代码
 *  能自己决定啥时候刷新最好，提高帧数用的。
 * 
 * @author KRZ
 *
 * @help
 * 请置于插件最下方
 * 这个插件将优化mv的部分系统：各色属性(基础属性，属性rate，元素，攻击属性，状态
 * 抗性，额外属性，特殊属性，等大量数据）
 * 同时也会优化yep的相关插件：护甲分级 自动被动 KRZ改伤害核心 KRZ技能禁用
 * 能够大幅优化游戏帧数（F2）
 * 具体刷新时间点在前半部分，可手动去除/添加 //// 这个注释符号来修改
 * 部分内容可能需要手动适配。
 * 2.07：配套修复的atbspeedimprove
  备注：
  Game_Battler.prototype.processDamageOverTimeStates 被覆盖，出现问题的话手动去掉
 */
 
 
 
 
//=============================================================================
var krz = krz || {};
krz.krz_state_re = krz.krz_state_re || {};
krz.krz_state_re = 2.08;
krz.restate = krz.restate || {};

krz.restate.Game_Battler_onTurnStart = Game_Battler.prototype.onTurnStart;
Game_Battler.prototype.onTurnStart = function() {
	krz.restate.Game_Battler_onTurnStart.call(this);
	this.need_refresh_bhud_states = true;
	this.need_refresh = true;
};
krz.restate.Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
	this.need_refresh_bhud_states = true;
	this.need_refresh = true;
	krz.restate.Game_Battler_onTurnEnd.call(this);
	this.need_refresh_bhud_states = true;
	this.need_refresh = true;
};
krz.restate.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
	this.need_refresh_states = true;	
	krz.restate.Game_Actor_changeEquip.call(this, slotId, item);
	this.need_refresh = true;
};

krz.restate.Game_Actor_forceChangeEquip  = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
	krz.restate.Game_Actor_forceChangeEquip.call(this, slotId, item);
	this.need_refresh = true;
};


if(Imported.YEP_EquipBattleSkills){
krz.restate.Game_Actor_equipSkill = Game_Actor.prototype.equipSkill;
Game_Actor.prototype.equipSkill = function(skillId, slotId) {
	krz.restate.Game_Actor_equipSkill.call(this, skillId, slotId);
	this.need_refresh = true;
};
}

//////////ginHpMp effect

krz.restate.Game_Battler_gainHp =Game_Battler.prototype.gainHp;
Game_Battler.prototype.gainHp = function(value) {
    krz.restate.Game_Battler_gainHp.call(this,value);
	if(value != 0) this.need_refresh = true;
};
krz.restate.Game_Actor_gainHp =Game_Battler.prototype.gainHp;
Game_Actor.prototype.gainHp = function(value) {
    krz.restate.Game_Actor_gainHp.call(this,value);
	if(value != 0) this.need_refresh = true;
};
krz.restate.Game_Battler_gainMp =Game_Battler.prototype.gainMp;
Game_Battler.prototype.gainMp = function(value) {
    krz.restate.Game_Battler_gainMp.call(this,value);
	if(value != 0) this.need_refresh = true;
};
krz.restate.Game_Battler_gainTp =Game_Battler.prototype.gainTp;
Game_Battler.prototype.gainTp = function(value) {
    krz.restate.Game_Battler_gainTp.call(this,value);
	if(value != 0) this.need_refresh = true;
};
krz.restate.Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
	this.need_refresh = true;
	krz.restate.Game_Battler_regenerateAll.call(this);
};
//////////buff effect
krz.restate.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
krz.restate.Game_Battler_onBattleStart.call(this);
this.need_refresh = true;
};
krz.restate.Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
krz.restate.Game_Battler_onBattleEnd.call(this);
this.need_refresh = true;
};

krz.restate.Game_Action_prepare = Game_Action.prototype.prepare
Game_Action.prototype.prepare = function() {	
	krz.restate.Game_Action_prepare.call(this);
	////this.subject().need_refresh = true;
};
krz.restate.Game_Action_apply = Game_Action.prototype.apply
Game_Action.prototype.apply = function(target) {	
	krz.restate.Game_Action_apply.call(this,target);
	////this.subject().need_refresh = true;
};

krz.restate.Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState
Game_BattlerBase.prototype.eraseState = function(stateId) {
	krz.restate.Game_BattlerBase_eraseState.call(this,stateId);
//	this.need_refresh = true;
};
krz.restate.Game_Battler_addState = Game_Enemy.prototype.addState
Game_Battler.prototype.addState = function(stateId) {
    krz.restate.Game_Battler_addState.call(this,stateId);
	this.need_refresh = true;
};

krz.restate.Game_Enemy_removeState = Game_Enemy.prototype.removeState
Game_Enemy.prototype.removeState = function(stateId) {
    krz.restate.Game_Enemy_removeState.call(this,stateId);
	this.need_refresh = true;
};
krz.restate.Game_Actor_removeState = Game_Actor.prototype.removeState
Game_Actor.prototype.removeState = function(stateId) {
    krz.restate.Game_Actor_removeState.call(this,stateId);
	this.need_refresh = true;
};
krz.restate.Game_Battler_addBuff = Game_Battler.prototype.addBuff
Game_Battler.prototype.addBuff = function(paramId, turns) {
    krz.restate.Game_Battler_addBuff.call(this, paramId, turns);
	this.need_refresh = true;
};
krz.restate.Game_Battler_removeBuff = Game_Battler.prototype.removeBuff
Game_Battler.prototype.removeBuff = function(paramId) {
    krz.restate.Game_Battler_removeBuff.call(this, paramId);
	this.need_refresh = true;
};

Game_Enemy.prototype.changeLevel = function(level) {
    if (level === this._level) return;
    if (Yanfly.Param.ELVPreserveRate) {
      var hpRate = this.hp / Math.max(1, this.mhp);
      var mpRate = this.mp / Math.max(1, this.mmp);
      var prevHp = Math.min(this.hp, 1);
    }
    this._level = level.clamp(1, Yanfly.Param.ELVMaxCap);
    this._cacheBaseParam = {};
	this.need_refresh = true;
    this.refresh();
    if (Yanfly.Param.ELVPreserveRate) {
      var max = this.isDead() ? 0 : prevHp;
      var hpAmount = Math.max(max, parseInt(this.mhp * hpRate));
      this.setHp(hpAmount);
      this.setMp(Math.min(this.mmp,parseInt(this.mmp * mpRate)));
    }
};


//////////////////////////////////////////////////////////////////////////////////////全部刷新开关

krz.restate.Game_Actor_refresh = Game_Actor.prototype.refresh
Game_Actor.prototype.refresh = function() {
	this.need_refresh_armorscaling = this.need_refresh_armorscaling || [0,0,0,0,0,0,0]
	this.need_refresh_debuffRate = this.need_refresh_debuffRate || [0,0,0,0,0,0,0,0,0,0];
	this.need_refresh_paramrate = this.need_refresh_paramrate || [1,1,1,1,1,1,1,1,1];
	this.need_refresh_param = this.need_refresh_param || [1,1,1,1,1,1,1,1,1];
	if(this.need_refresh){
		this._baseParamCache = undefined;
		this.need_refresh_dotstates = true;
		this.need_refresh_atbspeed = true;
		this.need_refresh_ym = true;
		this.need_refresh_range = true;
		this.need_refresh_xm = true;
		this.need_refresh_states = true;
		this.need_refresh_passiveStatesRaw = true;
		this.need_refresh_passiveStates = true;
		this.need_refresh_basestates = true;
		this.need_refresh_forbiddenskill = true;
		this.need_refresh_atbSpeedTick = true;
		this.need_refresh_pymf = true
		this.need_refresh_pydf = true;
		this.need_refresh_attackSpeed = true;
		this.need_refresh_attackStatesRate = true;
		this.need_refresh_attackStates = true;
		this.need_refresh_attackElements = true;
		this.need_refresh_debuffRate = [1,1,1,1,1,1,1,1,1];
		this.need_refresh_paramrate = [1,1,1,1,1,1,1,1,1];
		this.need_refresh_param = [1,1,1,1,1,1,1,1,1];
		this.need_refresh_xparam = [1,1,1,1,1,1,1,1,1,1];
		this.need_refresh_sparam = [1,1,1,1,1,1,1,1,1,1];
		this.need_refresh_armorscaling = [1,1,1,1,1,1,1];
		this._regenTprefresh = true;
		this._regenMprefresh = true;
		this._regenHprefresh = true;
    this.need_refresh_lifesteal = {
      hpPhysicalRate: true,
      hpMagicalRate: true,
      hpCertainRate: true,
      hpPhysicalFlat: true,
      hpMagicalFlat: true,
      hpCertainFlat: true,

      mpPhysicalRate: true,
      mpMagicalRate: true,
      mpCertainRate: true,
      mpPhysicalFlat: true,
      mpMagicalFlat: true,
      mpCertainFlat: true,	
	}	  
		this.need_refreshstatelist = {'initiateState':true,  'concludeState':true, 'establishState':true,  'respondState':true, 'reactState':true, 'confirmState':true, 'deselectState':true, 'selectState':true, 'initiateState':true, 'actionStartState':true, 'actionEndState':true, 'regenerateState':true, 'turnEndState':true, 'turnStartState':true };			
	}
	krz.restate.Game_Actor_refresh.call(this);
	this.need_refresh=false;
};
krz.restate.Game_Enemy_refresh = Game_Enemy.prototype.refresh
Game_Enemy.prototype.refresh = function() {
	this.need_refresh_armorscaling = this.need_refresh_armorscaling || [0,0,0,0,0,0,0]
	this.need_refresh_debuffRate = this.need_refresh_debuffRate || [0,0,0,0,0,0,0,0,0,0];
	this.need_refresh_paramrate = this.need_refresh_paramrate || [1,1,1,1,1,1,1,1,1];
	this.need_refresh_param = this.need_refresh_param || [1,1,1,1,1,1,1,1,1];
	if(this.need_refresh){
		this._baseParamCache = undefined;
		this.need_refresh_dotstates = true;
		this.need_refresh_atbspeed = true;
		this.need_refresh_range = true;
		this.need_refresh_states = true;
		this.need_refresh_basestates = true;
		this.need_refresh_passiveStatesRaw = true;
		this.need_refresh_passiveStates = true;
		this.need_refresh_forbiddenskill = true;
		this.need_refresh_atbSpeedTick = true;
		this.need_refresh_pymf = true
		this.need_refresh_pydf = true;
		this.need_refresh_attackSpeed = true;
		this.need_refresh_attackStatesRate = true;
		this.need_refresh_attackStates = true;
		this.need_refresh_attackElements = true;
		this.need_refresh_debuffRate = [1,1,1,1,1,1,1,1,1];
		this.need_refresh_paramrate = [1,1,1,1,1,1,1,1,1];
		this.need_refresh_param = [1,1,1,1,1,1,1,1,1];
		this.need_refresh_xparam = [1,1,1,1,1,1,1,1,1,1];
		this.need_refresh_sparam = [1,1,1,1,1,1,1,1,1,1];
		this.need_refresh_armorscaling = [1,1,1,1,1,1,1];	
		this._regenTprefresh = true;
		this._regenMprefresh = true;
		this._regenHprefresh = true;
    this.need_refresh_lifesteal = {
      hpPhysicalRate: true,
      hpMagicalRate: true,
      hpCertainRate: true,
      hpPhysicalFlat: true,
      hpMagicalFlat: true,
      hpCertainFlat: true,

      mpPhysicalRate: true,
      mpMagicalRate: true,
      mpCertainRate: true,
      mpPhysicalFlat: true,
      mpMagicalFlat: true,
      mpCertainFlat: true,	
	}	
		this.need_refreshstatelist = {'initiateState':true,  'concludeState':true, 'establishState':true,  'respondState':true, 'reactState':true, 'confirmState':true, 'deselectState':true, 'selectState':true, 'initiateState':true, 'actionStartState':true, 'actionEndState':true, 'regenerateState':true, 'turnEndState':true, 'turnStartState':true };
		
	}
	krz.restate.Game_Enemy_refresh.call(this);
		this.need_refresh=false;
};


/////////////////////下面为刷新本体

krz.restate.Game_BattlerBase_states = Game_BattlerBase.prototype.states;
Game_BattlerBase.prototype.states = function(){
	this.need_refresh_passiveStates = true;
	//this.passiveStates();
	this._statescache2 = krz.restate.Game_BattlerBase_states.call(this);
	return this._statescache2;
}



krz.restate.Game_Enemy_states = Game_Enemy.prototype.states;
Game_Enemy.prototype.states = function(){
	if(this.need_refresh_states || (!this._statescache2)){
		if(Imported.YEP_AutoPassiveStates){this.passiveStates()};
	this._statescache2 = krz.restate.Game_Enemy_states.call(this);
		this.need_refresh_states = false;
	return this._statescache2;
	}else{
	return	this._statescache2;	
	}

}
Game_BattlerBase.prototype.basestates = function() {
	if(this.need_refresh_basestates || !this._basestatecache){
    var array = this._states.map(function(id) {
        return $dataStates[id];
    });
	this._basestatecache = array;
	this.need_refresh_basestates = false;
	return this._basestatecache;
	}else{
    return this._basestatecache;
	}
};

krz.restate.Game_Actor_states = Game_Actor.prototype.states;
Game_Actor.prototype.states = function(){
	if(this.need_refresh_states || !this._statescache2){
		if(Imported.YEP_AutoPassiveStates){this.passiveStates()};
	this._statescache2 = krz.restate.Game_Actor_states.call(this);
		this.need_refresh_states = false;
	return this._statescache2;
	}else{
	return	this._statescache2;	
	}
	
}

/////////////////////////////////////////
krz.restate.Game_Actor_debuffRate = Game_Actor.prototype.debuffRate;
Game_Actor.prototype.debuffRate = function(paramId) {
    if (this.need_refresh_debuffRate[paramId]==1 || this.debuffRatecache == undefined){ 
    var array = krz.restate.Game_Actor_debuffRate.call(this, paramId);
	this.debuffRatecache = array;
	this.need_refresh_debuffRate[paramId] = 0;
    return this.debuffRatecache;
	}else{
	return this.debuffRatecache;
	}
};
// krz.restate.Game_Actor_stateRate = Game_Actor.prototype.stateRate;
// Game_Actor.prototype.stateRate = function(stateId) {
    // if (this.need_refresh_stateRate || this.stateRatecache == undefined){ 
    // var array = krz.restate.Game_Actor_stateRate.call(this);
	// this.stateRatecache = array;
	// this.need_refresh_stateRate = false;
    // return this.stateRatecache;
	// }else{
	// return this.stateRatecache;
	// }
// };
krz.restate.Game_Actor_attackElements = Game_Actor.prototype.attackElements;
Game_Actor.prototype.attackElements = function() {
    if (this.need_refresh_attackElements || this.attackElementscache == undefined){ 
    var array = krz.restate.Game_Actor_attackElements.call(this);
	this.attackElementscache = array;
	this.need_refresh_attackElements = false;
    return this.attackElementscache;
	}else{
	return this.attackElementscache;
	}
};
krz.restate.Game_Actor_attackStates = Game_Actor.prototype.attackStates;
Game_Actor.prototype.attackStates = function() {
    if (this.need_refresh_attackStates || this.attackStatescache == undefined){ 
    var array = krz.restate.Game_Actor_attackStates.call(this);
	this.attackStatescache = array;
	this.need_refresh_attackStates = false;
    return this.attackStatescache;
	}else{
	return this.attackStatescache;
	}
};
/* krz.restate.Game_Actor_attackStatesRate - Game_Actor.prototype.attackStatesRate;
Game_Actor.prototype.attackStatesRate = function(stateId) {
    if (this.need_refresh_attackStatesRate || this.attackStatesRatecache == undefined){ 
    var array = krz.restate.Game_Actor_attackStatesRate.call(this, stateId);
	this.attackStatesRatecache = array;
	this.need_refresh_attackStatesRate = false;
    return this.attackStatesRatecache;
	}else{
	return this.attackStatesRatecache;
	}
}; */
krz.restate.Game_Actor_attackSpeed = Game_Actor.prototype.attackSpeed;
Game_Actor.prototype.attackSpeed = function() {
    if (this.need_refresh_attackSpeed || this.attackSpeedcache == undefined){ 
    var array = krz.restate.Game_Actor_attackSpeed.call(this);
	this.attackSpeedcache = array;
	this.need_refresh_attackSpeed = false;
    return this.attackSpeedcache;
	}else{
	return this.attackSpeedcache;
	}
};





krz.restate.Game_Enemy_param = Game_Enemy.prototype.param;
Game_Enemy.prototype.param = function(paramId) {
  this._ParamCache2 = this._ParamCache2 || [0,0,0,0,0,0,0,0,0,0];
  this.need_refresh_param = this.need_refresh_param || [1,1,1,1,1,1,1,1];
	this._ParamCache2[paramId] = this._ParamCache2[paramId] || 1;
	if(!$gameParty.inBattle() || (this.need_refresh_param[paramId] || !this._ParamCache2[paramId])){
	this._ParamCache2[paramId] = krz.restate.Game_Enemy_param.call(this, paramId);
	this.need_refresh_param[paramId] = 0;
	return this._ParamCache2[paramId];
	}
  return this._ParamCache2[paramId];
};

krz.restate.Game_Enemy_xparam = Game_Enemy.prototype.xparam;
Game_Enemy.prototype.xparam = function(xparamId) {
  this._xparamCache2 = this._xparamCache2 || [];
  this.need_refresh_xparam = this.need_refresh_xparam || [1,1,1,1,1,1,1,1,1,1];
	if(!$gameParty.inBattle() || (this.need_refresh_xparam[xparamId] || this._xparamCache2[xparamId]==undefined )){
	this._xparamCache2[xparamId] = krz.restate.Game_Enemy_xparam.call(this, xparamId);
	this.need_refresh_xparam[xparamId] = 0;
	return this._xparamCache2[xparamId];
	}

  return this._xparamCache2[xparamId];
};
krz.restate.Game_Enemy_sparam = Game_Enemy.prototype.sparam;
Game_Enemy.prototype.sparam = function(sparamId) {
  this._sparamCache2 = this._sparamCache2 || [];
  this.need_refresh_sparam = this.need_refresh_sparam || [1,1,1,1,1,1,1,1,1,1];
	if(!$gameParty.inBattle() || (this.need_refresh_sparam[sparamId] || this._sparamCache2[sparamId]==undefined)){
	this._sparamCache2[sparamId] = krz.restate.Game_Enemy_sparam.call(this, sparamId);
	this.need_refresh_sparam[sparamId] = 0;
	return this._sparamCache2[sparamId];
	}
  return this._sparamCache2[sparamId];
};






krz.restate.Game_Actor_param = Game_Actor.prototype.param;
Game_Actor.prototype.param = function(paramId) {
  this._ParamCache2 = this._ParamCache2 || [];
  this.need_refresh_param = this.need_refresh_param || [1,1,1,1,1,1,1,1,1,1];
	this._ParamCache2[paramId] = this._ParamCache2[paramId] || 1;
	if(!$gameParty.inBattle() || (this.need_refresh_param[paramId] || !this._ParamCache2[paramId])){

	this._ParamCache2[paramId] = krz.restate.Game_Actor_param.call(this, paramId);
	this.need_refresh_param[paramId] = 0;
	////if(paramId ==0 ) alert(this._ParamCache2[paramId])
	return this._ParamCache2[paramId];
	}

  return this._ParamCache2[paramId];
};

krz.restate.Game_Actor_xparam = Game_Actor.prototype.xparam;
Game_Actor.prototype.xparam = function(xparamId) {
  this._xparamCache2 = this._xparamCache2 || [];
  ////this._xparamCache2[xparamId] = this._xparamCache2[xparamId] || 1;
  this.need_refresh_xparam = this.need_refresh_xparam || [1,1,1,1,1,1,1,1,1,1];

	if(!$gameParty.inBattle() || (this.need_refresh_xparam[xparamId] || this._xparamCache2[xparamId] == undefined)){

	this._xparamCache2[xparamId] = krz.restate.Game_Actor_xparam.call(this, xparamId);
	this.need_refresh_xparam[xparamId] = 0;
	return this._xparamCache2[xparamId];
	}

  return this._xparamCache2[xparamId];
};
krz.restate.Game_Actor_sparam = Game_Actor.prototype.sparam;
Game_Actor.prototype.sparam = function(sparamId) {
  this._sparamCache2 = this._sparamCache2 || [];
  ////this._sparamCache2[sparamId] = this._sparamCache2[sparamId] || 0;
  this.need_refresh_sparam = this.need_refresh_sparam || [1,1,1,1,1,1,1,1,1,1];

	if(!$gameParty.inBattle() || (this.need_refresh_sparam[sparamId] || this._sparamCache2[sparamId] == undefined)){

	this._sparamCache2[sparamId] = krz.restate.Game_Actor_sparam.call(this, sparamId);
	this.need_refresh_sparam[sparamId] = 0;
	return this._sparamCache2[sparamId];
	}

  return this._sparamCache2[sparamId];
};





krz.restate.Game_Actor_paramRate = Game_Battler.prototype.paramRate;
Game_Actor.prototype.paramRate = function(paramId) {
		this._paramratecache = this._paramratecache || [];
		this._paramratecache[paramId] = this._paramratecache[paramId] || 999;
		this.need_refresh_paramrate = this.need_refresh_paramrate || [1,1,1,1,1,1,1,1];
	if(this.need_refresh_paramrate[paramId] || !this._paramratecache[paramId]){

	this._paramratecache[paramId] = krz.restate.Game_Actor_paramRate.call(this, paramId);
	this.need_refresh_paramrate[paramId] = 0;
	return this._paramratecache[paramId];
	}else{
	return	this._paramratecache[paramId];	
	}	
	
	
};
krz.restate.Game_Enemy_paramRate = Game_Battler.prototype.paramRate;
Game_Enemy.prototype.paramRate = function(paramId) {

		this._paramratecache = this._paramratecache || [];
		this.need_refresh_paramrate = this.need_refresh_paramrate || [1,1,1,1,1,1,1,1];
		this._paramratecache[paramId] = this._paramratecache[paramId] || 999;
	if(this.need_refresh_paramrate[paramId] || !this._paramratecache[paramId]){

	this._paramratecache[paramId] = krz.restate.Game_Enemy_paramRate.call(this, paramId);
	this.need_refresh_paramrate[paramId] = 0;
	return this._paramratecache[paramId];
	}else{
	return	this._paramratecache[paramId];	
	}	
	
	
};
/////////////////下面是额外的插件附加计算

if(Imported.YEP_AutoPassiveStates){
krz.restate.Game_Actor_isStateAffected = Game_Actor.prototype.isStateAffected;
Game_Actor.prototype.isStateAffected = function(stateId){
	if (this.passiveStatesRaw().contains(stateId)) return true;
	return krz.restate.Game_Actor_isStateAffected.call(this, stateId);
}

krz.restate.Game_Enemy_passiveStates = Game_Enemy.prototype.passiveStates;
Game_Enemy.prototype.passiveStates = function() {
	this._passiveStates2 = this._passiveStates2|| [];
	if(this.need_refresh_passiveStates || !this._passiveStates2){
	this._passiveStates2 = krz.restate.Game_Enemy_passiveStates.call(this);
	this.need_refresh_passiveStates = false;
    return this._passiveStates2;		
	}else{	
	return this._passiveStates2;
	}
};
krz.restate.Game_Actor_passiveStates = Game_Actor.prototype.passiveStates;
Game_Actor.prototype.passiveStates = function() {
	this._passiveStates2 = this._passiveStates2|| [];
	if(this.need_refresh_passiveStates || !this._passiveStates2){
	this._passiveStates2 = krz.restate.Game_Actor_passiveStates.call(this);
	this.need_refresh_passiveStates = false;
    return this._passiveStates2;		
	}else{	
	return this._passiveStates2;
	}
};

krz.restate.Game_Enemy_passiveStatesRaw = Game_Enemy.prototype.passiveStatesRaw;
Game_Enemy.prototype.passiveStatesRaw = function() {
    if (this.need_refresh_passiveStatesRaw|| this._passiveStatesRaw == undefined){ 
	this.need_refresh_passiveStatesRaw = false;
    var array = krz.restate.Game_Enemy_passiveStatesRaw.call(this);
    this._passiveStatesRaw = array.filter(Yanfly.Util.onlyUnique);
    return this._passiveStatesRaw;
	}else{		
		return this._passiveStatesRaw;
	}
};
krz.restate.Game_Actor_passiveStatesRaw = Game_Actor.prototype.passiveStatesRaw;
Game_Actor.prototype.passiveStatesRaw = function() {
    if (this.need_refresh_passiveStatesRaw|| this._passiveStatesRaw == undefined){ 
	this.need_refresh_passiveStatesRaw = false;
    var array = krz.restate.Game_Actor_passiveStatesRaw.call(this);
    this._passiveStatesRaw = array.filter(Yanfly.Util.onlyUnique);
    return this._passiveStatesRaw;
	}else{		
		return this._passiveStatesRaw;
	}
};

}

if(Imported.krz_skill_forbidden){
krz.restate.Game_Actor_forbiddenskill = Game_Actor.prototype.forbiddenskill;
Game_Actor.prototype.forbiddenskill = function(){
	if(this.need_refresh_forbiddenskill || !this._cachefbskill2){
	this.need_refresh_forbiddenskill = false;
	this._cachefbskill2 = krz.restate.Game_Actor_forbiddenskill.call(this);
	return this._cachefbskill2;
	}else{
	return	this._cachefbskill2;	
	}

}
krz.restate.Game_Enemy_forbiddenskill = Game_Enemy.prototype.forbiddenskill;
Game_Enemy.prototype.forbiddenskill = function(){
	if(this.need_refresh_forbiddenskill || !this._cachefbskill2){
	this.need_refresh_forbiddenskill = false;
	this._cachefbskill2 = krz.restate.Game_Enemy_forbiddenskill.call(this);
	return this._cachefbskill2;
	}else{
	return	this._cachefbskill2;	
	}

}
}
		
if(Imported.YEP_X_BattleSysATB){
krz.restate.Game_Actor_atbSpeedTick = Game_Actor.prototype.atbSpeedTick;
	Game_Actor.prototype.atbSpeedTick = function(){
    if (this.need_refresh_atbSpeedTick || this._atbSpeedTickcache == undefined){ 
    var array = krz.restate.Game_Actor_atbSpeedTick.call(this);
	this._atbSpeedTickcache = array;
	this.need_refresh_atbSpeedTick = false;
    return this._atbSpeedTickcache;
	}else{
	return this._atbSpeedTickcache;
	}				
	};
/* Game_Battler.prototype.atbTickValue = function() {
    if (this._atbTickValue !== undefined) return this._atbTickValue;
    var a = this;
    var user = this;
    var subject = this;
    this._atbTickValue = eval(Yanfly.Param.ATBPerTick);
    return this._atbTickValue;
}; */
krz.restate.Game_Enemy_atbSpeedTick = Game_Enemy.prototype.atbSpeedTick;
	Game_Enemy.prototype.atbSpeedTick = function(){
    if (this.need_refresh_atbSpeedTick || this._atbSpeedTickcache == undefined){ 
    var array = krz.restate.Game_Enemy_atbSpeedTick.call(this);
	this._atbSpeedTickcache = array;
	this.need_refresh_atbSpeedTick = false;
    return this._atbSpeedTickcache;
	}else{
	return this._atbSpeedTickcache;
	}				
	};	
}
	
if(Imported.krz_DamageCore_plus){
krz.restate.Game_Actor_pydf = Game_Actor.prototype.pydf;
Game_Actor.prototype.pydf = function() {
    if (this.need_refresh_pydf || this._pydfcache == undefined){ 
    var array = krz.restate.Game_Actor_pydf.call(this);
	this._pydfcache = array;
	this.need_refresh_pydf = false;
    return this._pydfcache;
	}else{
	return this._pydfcache;
	}
};
krz.restate.Game_Actor_pymf = Game_Actor.prototype.pymf;
Game_Actor.prototype.pymf = function() {
    if (this.need_refresh_pymf || this._pymfcache == undefined){ 
    var array = krz.restate.Game_Actor_pymf.call(this);
	this._pymfcache = array;
	this.need_refresh_pymf = false;
    return this._pymfcache;
	}else{
	return this._pymfcache;
	}
};	
krz.restate.Game_Enemy_pydf = Game_Enemy.prototype.pydf;
Game_Enemy.prototype.pydf = function() {
    if (this.need_refresh_pydf || this._pydfcache == undefined){ 
    var array = krz.restate.Game_Enemy_pydf.call(this);
	this._pydfcache = array;
	this.need_refresh_pydf = false;
    return this._pydfcache;
	}else{
	return this._pydfcache;
	}
};
krz.restate.Game_Enemy_pymf = Game_Enemy.prototype.pymf;
Game_Enemy.prototype.pymf = function() {
    if (this.need_refresh_pymf || this._pymfcache == undefined){ 
    var array = krz.restate.Game_Enemy_pymf.call(this);
	this._pymfcache = array;
	this.need_refresh_pymf = false;
    return this._pymfcache;
	}else{
	return this._pymfcache;
	}
};		
}
	
if(Imported.YEP_X_ArmorScaling){
		
krz.restate.Game_Actor_certainArmorPenetrationFlat = Game_Actor.prototype.certainArmorPenetrationFlat;
Game_Actor.prototype.certainArmorPenetrationFlat = function() {
    if (this.need_refresh_armorscaling[0]==1 || this._certainArmorPenetrationFlatcache == undefined){ 
    var array = krz.restate.Game_Actor_certainArmorPenetrationFlat.call(this);
	this._certainArmorPenetrationFlatcache = array;
	this.need_refresh_armorscaling[0] = 0;
    return this._certainArmorPenetrationFlatcache;
	}else{
	return this._certainArmorPenetrationFlatcache;
	}
}
krz.restate.Game_Actor_physicalArmorPenetrationFlat = Game_Actor.prototype.physicalArmorPenetrationFlat;
Game_Actor.prototype.physicalArmorPenetrationFlat = function() {
    if (this.need_refresh_armorscaling[1]==1 || this._physicalArmorPenetrationFlatcache == undefined){ 
    var array = krz.restate.Game_Actor_physicalArmorPenetrationFlat.call(this);
	this._physicalArmorPenetrationFlatcache = array;
	this.need_refresh_armorscaling[1] = 0;
    return this._physicalArmorPenetrationFlatcache;
	}else{
	return this._physicalArmorPenetrationFlatcache;
	}
}
krz.restate.Game_Actor_magicalArmorPenetrationFlat = Game_Actor.prototype.magicalArmorPenetrationFlat;
Game_Actor.prototype.magicalArmorPenetrationFlat = function() {
    if (this.need_refresh_armorscaling[2]==1 || this._magicalArmorPenetrationFlatcache == undefined){ 
    var array = krz.restate.Game_Actor_magicalArmorPenetrationFlat.call(this);
	this._magicalArmorPenetrationFlatcache = array;
	this.need_refresh_armorscaling[2] = 0;
    return this._magicalArmorPenetrationFlatcache;
	}else{
	return this._magicalArmorPenetrationFlatcache;
	}
}
krz.restate.Game_Actor_certainArmorPenetrationRate = Game_Actor.prototype.certainArmorPenetrationRate;
Game_Actor.prototype.certainArmorPenetrationRate = function() {
    if (this.need_refresh_armorscaling[3]==1 || this._certainArmorPenetrationRatecache == undefined){ 
    var array = krz.restate.Game_Actor_certainArmorPenetrationRate.call(this);
	this._certainArmorPenetrationRatecache = array;
	this.need_refresh_armorscaling[3] = 0;
    return this._certainArmorPenetrationRatecache;
	}else{
	return this._certainArmorPenetrationRatecache;
	}
}
krz.restate.Game_Actor_physicalArmorPenetrationRate = Game_Actor.prototype.physicalArmorPenetrationRate;
Game_Actor.prototype.physicalArmorPenetrationRate = function() {
    if (this.need_refresh_armorscaling[4]==1 || this._physicalArmorPenetrationRatecache == undefined){ 
    var array = krz.restate.Game_Actor_physicalArmorPenetrationRate.call(this);
	this._physicalArmorPenetrationRatecache = array;
	this.need_refresh_armorscaling[4] = 0;
    return this._physicalArmorPenetrationRatecache;
	}else{
	return this._physicalArmorPenetrationRatecache;
	}
}
krz.restate.Game_Actor_magicallArmorPenetrationRate = Game_Actor.prototype.magicallArmorPenetrationRate;
Game_Actor.prototype.magicallArmorPenetrationRate = function() {
    if (this.need_refresh_armorscaling[5]==1 || this._magicallArmorPenetrationRatecache == undefined){ 
    var array = krz.restate.Game_Actor_magicallArmorPenetrationRate.call(this);
	this._magicallArmorPenetrationRatecache = array;
	this.need_refresh_armorscaling[5] = 0;
    return this._magicallArmorPenetrationRatecache;
	}else{
	return this._magicallArmorPenetrationRatecache;
	}
}

krz.restate.Game_Enemy_certainArmorPenetrationFlat = Game_Enemy.prototype.certainArmorPenetrationFlat;
Game_Enemy.prototype.certainArmorPenetrationFlat = function() {
    if (this.need_refresh_armorscaling[0]==1 || this._certainArmorPenetrationFlatcache == undefined){ 
    var array = krz.restate.Game_Enemy_certainArmorPenetrationFlat.call(this);
	this._certainArmorPenetrationFlatcache = array;
	this.need_refresh_armorscaling[0] = 0;
    return this._certainArmorPenetrationFlatcache;
	}else{
	return this._certainArmorPenetrationFlatcache;
	}
}
krz.restate.Game_Enemy_physicalArmorPenetrationFlat = Game_Enemy.prototype.physicalArmorPenetrationFlat;
Game_Enemy.prototype.physicalArmorPenetrationFlat = function() {
    if (this.need_refresh_armorscaling[1]==1 || this._physicalArmorPenetrationFlatcache == undefined){ 
    var array = krz.restate.Game_Enemy_physicalArmorPenetrationFlat.call(this);
	this._physicalArmorPenetrationFlatcache = array;
	this.need_refresh_armorscaling[1] = 0;
    return this._physicalArmorPenetrationFlatcache;
	}else{
	return this._physicalArmorPenetrationFlatcache;
	}
}
krz.restate.Game_Enemy_magicalArmorPenetrationFlat = Game_Enemy.prototype.magicalArmorPenetrationFlat;
Game_Enemy.prototype.magicalArmorPenetrationFlat = function() {
    if (this.need_refresh_armorscaling[2]==1 || this._magicalArmorPenetrationFlatcache == undefined){ 
    var array = krz.restate.Game_Enemy_magicalArmorPenetrationFlat.call(this);
	this._magicalArmorPenetrationFlatcache = array;
	this.need_refresh_armorscaling[2] = 0;
    return this._magicalArmorPenetrationFlatcache;
	}else{
	return this._magicalArmorPenetrationFlatcache;
	}
}
krz.restate.Game_Enemy_certainArmorPenetrationRate = Game_Enemy.prototype.certainArmorPenetrationRate;
Game_Enemy.prototype.certainArmorPenetrationRate = function() {
    if (this.need_refresh_armorscaling[3]==1 || this._certainArmorPenetrationRatecache == undefined){ 
    var array = krz.restate.Game_Enemy_certainArmorPenetrationRate.call(this);
	this._certainArmorPenetrationRatecache = array;
	this.need_refresh_armorscaling[3] = 0;
    return this._certainArmorPenetrationRatecache;
	}else{
	return this._certainArmorPenetrationRatecache;
	}
}
krz.restate.Game_Enemy_physicalArmorPenetrationRate = Game_Enemy.prototype.physicalArmorPenetrationRate;
Game_Enemy.prototype.physicalArmorPenetrationRate = function() {
    if (this.need_refresh_armorscaling[4]==1 || this._physicalArmorPenetrationRatecache == undefined){ 
    var array = krz.restate.Game_Enemy_physicalArmorPenetrationRate.call(this);
	this._physicalArmorPenetrationRatecache = array;
	this.need_refresh_armorscaling[4] = 0;
    return this._physicalArmorPenetrationRatecache;
	}else{
	return this._physicalArmorPenetrationRatecache;
	}
}
krz.restate.Game_Enemy_magicallArmorPenetrationRate = Game_Enemy.prototype.magicallArmorPenetrationRate;
Game_Enemy.prototype.magicallArmorPenetrationRate = function() {
    if (this.need_refresh_armorscaling[5]==1 || this._magicallArmorPenetrationRatecache == undefined){ 
    var array = krz.restate.Game_Enemy_magicallArmorPenetrationRate.call(this);
	this._magicallArmorPenetrationRatecache = array;
	this.need_refresh_armorscaling[5] = 0;
    return this._magicallArmorPenetrationRatecache;
	}else{
	return this._magicallArmorPenetrationRatecache;
	}
}
	
	
}
krz.restate.Game_Battler_spriteHeight = Game_Battler.prototype.spriteHeight;
Game_Battler.prototype.spriteHeight = function() {
	if(this.hasDragonBone){

    if ((this.need_refresh_spriteheight==true || this._spriteheightcache == undefined)){ 
    var array = krz.restate.Game_Battler_spriteHeight.call(this);
	this._spriteheightcache = array;
	this.need_refresh_spriteheight = false;
    return this._spriteheightcache;
	}else{
	return this._spriteheightcache;
	}	
	}else{
		return krz.restate.Game_Battler_spriteHeight.call(this);
	}
}

krz.restate.Game_Battler_spriteWidth = Game_Battler.prototype.spriteWidth;
Game_Battler.prototype.spriteWidth = function() {
	if(this.hasDragonBone){

    if ((this.need_refresh_spriteWidth==true || this._spriteWidthcache == undefined)){ 
    var array = krz.restate.Game_Battler_spriteWidth.call(this);
	this._spriteWidthcache = array;
	this.need_refresh_spriteWidth = false;
    return this._spriteWidthcache;
	}else{
	return this._spriteWidthcache;
	}	
	}else{
		return krz.restate.Game_Battler_spriteWidth.call(this);
	}
}


Game_Battler.prototype.typestates = function(type) {
	var list = [];
	this._statelist = this._statelist || {'initiateState':[],  'concludeState':[], 'establishState':[],  'establishState':[],   'respondState':[], 'reactState':[], 'confirmState':[], 'deselectState':[], 'selectState':[], 'initiateState':[], 'actionStartState':[], 'actionEndState':[], 'regenerateState':[], 'turnEndState':[], 'turnStartState':[] };
    this.need_refreshstatelist = this.need_refreshstatelist || {'initiateState':true,  'concludeState':true, 'establishState':true,  'respondState':true, 'reactState':true, 'confirmState':true, 'deselectState':true, 'selectState':true, 'initiateState':true, 'actionStartState':true, 'actionEndState':true, 'regenerateState':true, 'turnEndState':true, 'turnStartState':true };;
	if(this.need_refreshstatelist[type]){
			var length = this.states().length;
			for(var i = 0;i<length;i++){
			var state = this.states()[i];
			if (!state) return;
			if (state.customEffectEval[type] != '') list.push(state);
			}
	this._statelist[type] = list;
	this.need_refreshstatelist[type] = false;
	return list;
	}else{
	return this._statelist[type];
	}

};
	/* .regenerateTp(); */

if(Imported.YEP_LifeSteal){
krz.restate.Game_Actor_getLifeStealRate = Game_Actor.prototype.getLifeStealRate;
	Game_Actor.prototype.getLifeStealRate = function(type, target) {
		this._lifestealcache = this._lifestealcache || {};
		if (this.need_refresh_lifesteal[type] || this._lifestealcache[type] == undefined){ 
		this._lifestealcache[type] = krz.restate.Game_Actor_getLifeStealRate.call(this, type, target);
		this.need_refresh_lifesteal[type] = false;
		return this._lifestealcache[type];
		}else{
		return this._lifestealcache[type];
		}	
	
	}
krz.restate.Game_Enemy_getLifeStealRate = Game_Enemy.prototype.getLifeStealRate;
	Game_Enemy.prototype.getLifeStealRate = function(type, target) {
		this._lifestealcache = this._lifestealcache || {};
		if (this.need_refresh_lifesteal[type] || this._lifestealcache[type] == undefined){ 
		this._lifestealcache[type] = krz.restate.Game_Enemy_getLifeStealRate.call(this, type, target);
		this.need_refresh_lifesteal[type] = false;
		return this._lifestealcache[type];
		}else{
		return this._lifestealcache[type];
		}	
	
	}
};


Game_Battler.prototype.processDamageOverTimeStates = function() {
 /// if (!$gameParty.inBattle()) return;
  var result = JsonEx.makeDeepCopy(this._result);
  var states = JsonEx.makeDeepCopy(this.dotstates());
  while (states.length > 0) {
    var state = states.shift();
    if (state) {
      this.processDamageOverTimeStateEffect(state);
    }
  }
  this._result = result;
};

Game_Battler.prototype.dotstates = function() {
	if(!this._dotstates || this.need_refresh_dotstates){
		this.need_refresh_dotstates = false;
		this._dotstates =[];
	var length = this.states().length;
	for(var i = 0;i<length;i++){
		if(this.states()[i].dotFormula != '') this._dotstates.push(this.states()[i])
	}
	}
	return this._dotstates;
}


Game_Battler.prototype.regenerateHp = function() {
	if(this._regenHprefresh || this._regenHpcache==undefined){
    var value = Math.floor(this.mhp * this.hrg * this.rec);
	this._regenHpcache = value;
	}else{
	var value = this._regenHpcache;	
	}
    value = Math.max(value, -this.maxSlipDamage());
    if (value !== 0) {
        this._hp += Math.min(value,Math.floor(this.mhp-this.hp));
    }
};

Game_Battler.prototype.regenerateMp = function() {
	if(this._regenMprefresh || this._regenMpcache==undefined){
    var value = Math.floor(this.mmp * this.mrg);
	this._regenMpcache = value;
	}else{
	var value = this._regenMpcache;	
	}
    if (value !== 0 && this.mp<this.mmp) {
        this._mp += Math.min(value,Math.floor(this.mmp-this.mp));
    }
};


