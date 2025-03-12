//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - extra skill action
// yep_krz_extraskillaction.js
//=============================================================================



//=============================================================================
 /*:
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 需要yep的反击增强插件，使用方法举例：user.extraaction(user, 5, target);
 * 这个是让user对target使用5号技能，不会计算回合数的立即释放。
 * 其他说明：target需要是目标，而不是编号，是对象/物体，不是编号
 * 其实原本可以更简单的，但是由于yep的动作拆分所以我只能用加强反击的来改了。
 * 目前还有bug: 
 *
 *  user.extraaction(user, 5, target)请使用单体技能,如果是使用在state下的话用这个
 *  user.extraaction2(user, 5, target)可使用aoe技能,如果是使用在skill下的话用这个
 *
 *
 * 其实我并没有测试上面一个如果用aoe技能会不会造成两次伤害，所以随意啦！
 * 适用范围:skill state item
 * 备注：如果用在state里比如confirm的时候，记得加一条判断:
 * if(!BattleManager._action._isCounter){ ... ... 不然会不断地触发这个confirm里的
 * 举例：
 * 余震：每次攻击后对目标范围内敌人再造成额外一次伤害
 * 连锁反应: 下一次施法将作用于所有目标
 * 无限斩: 随机攻击一个目标，结束后95%再次随机攻击一个目标，直到停止或者没有蓝/TP
 * 缠雷: 每次攻击或者施法将对目标额外造成一次 雷电 技能
 * 子母雷： 对主目标造成x伤害，然后对其余敌人造成一次x技能（可以使伤害也可以是眩晕）
 */
//=============================================================================


if (Imported.YEP_X_CounterControl) {
BattleManager.actionPerformCounterPhase2 = function(action,target) {
    this._countering = true;
    this._subject.removeCounterAction();
    this._subject = action.subject();
    this._action = action;
    var subject = this._subject;
    var targets = [];
	targets[0] = target;
	targets[1] = target;
    this.setTargets(targets);
    this._allTargets = targets.slice();
    this._individualTargets = targets.slice();
    this._phase = 'phaseChange';
    this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
    this._returnPhase = '';
    this._actionList = [];
    subject.useItem(this._action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(this._subject, this._action, this._targets);
};
BattleManager.actionPerformCounterPhase3 = function(action,target) {
    this._countering = true;
    this._subject.removeCounterAction();
    this._subject = action.subject();
    this._action = action;
    var subject = this._subject;
    var targets = [];
	targets[0] = target;
    this.setTargets(targets);
    this._allTargets = targets.slice();
    this._individualTargets = targets.slice();
    this._phase = 'phaseChange';
    this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
    this._returnPhase = '';
    this._actionList = [];
    subject.useItem(this._action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(this._subject, this._action, this._targets);
};

Game_Battler.prototype.extraaction = function(user, skill, target) {
var action = new Game_Action(user);
action._isCounter = true;
action.setSkill(skill);
BattleManager.actionPerformCounterPhase2(action, target);
};
Game_Battler.prototype.extraaction2 = function(user, skill, target) {
var action = new Game_Action(user);
action._isCounter = true;
action.setSkill(skill);
BattleManager.actionPerformCounterPhase3(action, target);
};
}