var Imported = Imported || {};
Imported.KRZ_effecrapply = true;

var KRZ = KRZ || {};
KRZ.EFFECTAPPLY = KRZ.EFFECTAPPLY || {};
KRZ.EFFECTAPPLY.version = 0.01;

//=============================================================================
 /*:
 * @plugindesc v0.01 这个是额外伤害插件，让你的额外伤害能够被yep状态核心的伤害获取
 * 等获取，可以手动设置伤害类型属性等，计算命中率，暴击率(yep暴击插件)，吸血等。
 * @author KRZ
 *
 * @param ---Skill Settings---
 * @default
 *
 * @param Damage Skill
 * @parent ---Skill Settings---
 * @desc 马甲技能所使用的技能ID.
 * 
 * @default 100
  * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * user.applyDamage(target, damageFormula, hittype, damagetype, element, hitRate, criticalRate, variance)
 * user：使用者  target：目标  damageFormula：伤害公式  hittype：技能类型(必中 物理 魔法)
 * damagetype：伤害类型(HP伤害 MP伤害 HP恢复 MP恢复 HP吸收 MP吸收)
 * element：伤害元素  hitRate：技能成功率  
 * criticalRate：技能自身暴击，默认都为0，需要yep暴击控制
 * variance：伤害浮动 animationId：技能动画
 *
 * 备注：伤害公式尽量用手动输入的字符串，比如'a.def-b.mhp'之类的
 *       那些想要指定用什么技能作为额外伤害效果啥的用炎龙那个yep targetextend就行了
 *       由于这个会触发buffstatecore里的respond react等大量效果，所以当心死循环
 *       此处的额外伤害行动为反击属性(可加入判断当前action是不是反击来防止死循环)
 *       
 *       目前animationId可能无法生效
 * 
 * ============================================================================
 */

KRZ.Parameters = PluginManager.parameters('krz_effectapply');
KRZ.Param = KRZ.Param || {};

KRZ.Param.effectskillId = Number(KRZ.Parameters['Damage Skill']);





////$gameActors._data[10].applyDamage($gameTroop._enemies[0],'500',0,1,1,100,10,10);
////target.applyDamage(actor,'a._jssh',0,1,-1,100,0,5);
//////user.applyDamage(target,'500',0,1,1,100,10,10);
/////////////KRZ.Param.effectskillId为给予伤害的马甲技能，需要手动改成你所想设的马甲技能
//////////////////////////////////////////////////////////////////必中物理魔法 HP伤害,MP伤害...    其中element如果设为-1则是普攻属性
/////////////////////////////////////////////(target,  '100',        (0,1,2),(0,1,2,3,4,5,6),1,   100,    100,          100)
////比如200点伤害必中2号元素15%暴击95%成功率10伤害浮   '200',        0,         1,           2,   95,      15,           10
Game_Battler.prototype.applyDamage = function(target, damageFormula, hittype, damagetype, element, hitRate, criticalRate, variance, animationId){
	var action = new Game_Action(this);
	$dataSkills[KRZ.Param.effectskillId].animationId=0;$dataSkills[KRZ.Param.effectskillId].hitType=1;$dataSkills[KRZ.Param.effectskillId].battleDisplayText="";$dataSkills[KRZ.Param.effectskillId].name="";$dataSkills[KRZ.Param.effectskillId].successRate=100;$dataSkills[KRZ.Param.effectskillId].critRate='rate = 0';
	$dataSkills[KRZ.Param.effectskillId].damage.type=1;$dataSkills[KRZ.Param.effectskillId].damage.formula='0';$dataSkills[KRZ.Param.effectskillId].damage.elementId=1;$dataSkills[KRZ.Param.effectskillId].damage.critical=true;$dataSkills[KRZ.Param.effectskillId].damage.variance=0;
	if(hitRate!=undefined) $dataSkills[KRZ.Param.effectskillId].successRate = hitRate;
	if(criticalRate!=undefined) $dataSkills[KRZ.Param.effectskillId].critRate = 'rate = ' + parseFloat(eval(criticalRate) * 0.01);
	if(damageFormula!=undefined) $dataSkills[KRZ.Param.effectskillId].damage.formula = damageFormula;
	if(hittype!=undefined) $dataSkills[KRZ.Param.effectskillId].hitType = hittype;
	if(damagetype!=undefined) $dataSkills[KRZ.Param.effectskillId].damage.type = damagetype;
	if(element!=undefined) $dataSkills[KRZ.Param.effectskillId].damage.elementId = element;
	if(variance!=undefined) $dataSkills[KRZ.Param.effectskillId].damage.variance = variance;
	if(animationId!=undefined) $dataSkills[KRZ.Param.effectskillId].animationId = animationId;
    action.setSkill(KRZ.Param.effectskillId);
	action._isCounter = true;
	action.apply(target);
}

