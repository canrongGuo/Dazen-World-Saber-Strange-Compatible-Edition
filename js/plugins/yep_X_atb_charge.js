//=============================================================================
// yep_X_atb_charge.js
//=============================================================================

/*:
* @plugindesc YEP-ATB战斗系统吟唱值设定插件
* @author 奇奇
*
*
* @help 注意事项:使用时请放在YEP_BattleSysATB插件下面
* 此插件将改变YEP的ATB插件吟唱速度计算公式
* 把吟唱速度本来受到自身速度或者敏捷影响变更为只受到技能设定中的速度补正影响
* 这样可以实现极端情况下高敏捷人物低吟唱速度或者相反的更多变化的ATB战斗系统玩法
* 技能中的速度补正越大时吟唱速度越快,范围为1~2000
* 举例:1技能500速度补正,2技能1500速度补正,那么2技能吟唱速度就是1技能的3倍
* 吟唱条总数值请在YEP_BattleSysATB插件参数ATB Settings里的Charge Gauge调整
* 同时此插件遵循YEP_BattleSysATB插件参数Rubberband的速度限制
* 请自行设定Rubberband的三个参数"是否限制,最大,最小速度限制",false为不限制
* 此插件用来学习,如需帮助或发现BUG请联系我
*
*
* Version 1.0:
* 完成初步功能
*/



Game_Battler.prototype.updateATB = function() {
    if (this.isDead()) return this.resetAllATB();
    if (!this.canMove()) {
      this.updateATBStates();
      return;
    }
    if (this.isATBCharging()) {
      if (!this.currentAction()) this.resetAllATB();
      if (this.currentAction() && this.currentAction().item() === null) {
        this.resetAllATB();
      }
    }
    if (this.isATBCharging()) {
      // var value = this.atbCharge() + this.atbSpeedTick();
      var speed = 1;
      if(this.numActions() > 0){
        var qiqispeed = 2000/((2000/this.action(0).item().speed)*(1-Math.min(1, this.elementAmplifyRate(18))));//蓄力
        //Math.min(1, this.elementAmplifyRate(18))
          speed = Math.max(1, qiqispeed);
          //这里是修改速度，this为user  elementAmplifyRate(18)
      }
      if (BattleManager.atbRubberband()) {
          var min = BattleManager.atbMinimumSpeed();
          var max = BattleManager.atbMaximumSpeed();
          speed = speed.clamp(min, max) * BattleManager.tickRate();
      }
      var value = this.atbCharge() + speed;
      this.setATBCharge(value);
    } else if (this.atbRate() < 1) {
      var value = this.atbSpeed() + this.atbSpeedTick();
      this.setATBSpeed(value);
    } 
};