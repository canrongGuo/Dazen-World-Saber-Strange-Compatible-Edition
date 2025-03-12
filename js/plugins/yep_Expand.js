//=============================================================================
// yep_Expand.js
//=============================================================================

/*:
* @plugindesc YEP插件的自用多功能拓展功能
* @author 奇奇、炎龙
*
* @param ---升级增加装备技能槽位---
* @default
* 
* @param per_level
* @parent ---升级增加装备技能槽位---
* @type number
* @desc 设置每升多少级增加一次技能装备槽位
* @default 0
*
* @param per_SBSlots
* @parent ---升级增加装备技能槽位---
* @type number
* @desc 设置每一次增加多少个技能装备槽位
* @default 0
* 
* @param levelUpInfo
* @parent ---升级增加装备技能槽位---
* @type boolean
* @on 显示
* @off 隐藏
* @desc 增加技能槽位时是否显示提示信息?
* 隐藏 - false     显示 - true
* @default true
* 
* @param equipSkillSlotText
* @parent ---升级增加装备技能槽位---
* @type string
* @desc 设置显示信息时“技能携带栏”的文字显示
* @default 技能携带栏
* 
* @param msgColor
* @parent ---升级增加装备技能槽位---
* @type number
* @desc 设置显示信息的颜色色号
* @default 0
* 
* @param nameColor
* @parent ---升级增加装备技能槽位---
* @type number
* @desc 设置显示信息时角色名字的颜色色号
* @default 2
* 
* @param slotsNumColor
* @parent ---升级增加装备技能槽位---
* @type number
* @desc 设置显示信息时槽位数量的颜色色号
* @default 14
*
* @param ---战斗胜利动作定义---
* @default
* 
* @param isVMotionOn
* @parent ---战斗胜利动作定义---
* @type boolean
* @on 开启
* @off 关闭
* @desc 是否开启战斗结束胜利动作?
* 开启 - false     关闭 - true
* @default true
* 
* @param cusVmotion
* @parent ---战斗胜利动作定义---
* @type string
* @desc 自定义战斗胜利动作。如item、swing等动作
* @default victory
* 
* @param ---简易召唤---
* @default
* 
* @param summonNum
* @parent ---简易召唤---
* @type number
* @desc 召唤物最多召唤几只？
* @default 4
* 
* @help 注意事项:使用时请将本插件放到Yep系列插件的最下方
* 此插件用简易设置目标核心的拓展类内容,丢进技能备注里,格式为:
* <Custom Target Eval>
* var members = qiqiyo.getMinProperties(foes.aliveMembers(), '属性', 数量);
* targets = members;
* </Custom Target Eval>
* 注:Min是最少,替换成Max时是最多
*    foes.aliveMembers()为对方活着的人目标数组,可以替换其他目标组
* 
* 举例:
* <Custom Target Eval>
* var members = qiqiyo.getMinProperties(foes.aliveMembers(), 'hp', 1);
* targets = members;
* </Custom Target Eval>
* 以上是目标为对方血最少的1个单位
* 
* <Custom Target Eval>
* var members = qiqiyo.getMaxProperties(foes.aliveMembers(), 'atk', 3);
* targets = members;
* </Custom Target Eval>
* 以上是目标为对方攻击最高的3个单位
*
* 关于目标调控选择数量的例子：
* <Custom Target Eval>
* if(foes.aliveMembers().length>1){
* targets =qiqiyo.getRandoms(foes.aliveMembers(),4);
* } else {
* targets =qiqiyo.getRandoms(foes.aliveMembers(),1);
* }
* 以上是对方人数大于1时随机攻击4个目标，对方人数1时攻击1个目标
* </Custom Target Eval>
* 
* 查找目标组中第x排的目标并返回：
* <Custom Target Eval>
* if(foes.aliveMembers().length>1){
* targets =qiqiyo.getMembersOfRow(foes.aliveMembers(),2);
* } 
* </Custom Target Eval>
* 
* 其他脚本：
* 阵列系统中，获取最靠前一列的敌人:
* qiqiyo.getMembersOfMinRow(targets);
* 阵列系统中，获取最靠前一列的敌人:
* qiqiyo.getMembersOfMaxRow(targets);
* ctb系统中，获取目标组中最先行动的行动者:
* qiqiyo.getClosestMembersOfCTB(targets);
* ctb系统中，获取目标组中最后行动的行动者: 
* qiqiyo.getFurthestMembersOfCTB(targets);
* atb系统中，获取目标组中最先行动的行动者:
* qiqiyo.getClosestMembersOfATB(targets);
* atb系统中，获取目标组中最后行动的行动者: 
* qiqiyo.getFurthestMembersOfATB(targets);
* $gameParty.aliveMembers()    活着的玩家
* $gameParty.deadMembers()     死掉的玩家
* $gameTroop.aliveMembers()    活着的敌人
* $gameTroop.deadMembers()     死掉的敌人
* user.opponentsUnit().aliveMembers() 活着的敌对目标
* user.opponentsUnit().deadMembers() 死掉的敌对目标
* user.friendsUnit().aliveMembers() 活着的队友目标
* user.friendsUnit().deadMembers() 死掉的队友目标
* 注意 队友是自己同伴，敌人的队友还是敌人
*      敌对是敌对玩家，敌人的敌对是玩家
* battler.isFighting()        判断该战斗者是否处于战场内
* ============================================================================
* 新增多武器类型功能
* 
* 比如可以把法杖定义为既是法杖类型又是棍棒类型
* （虽然感觉这功能没啥太大用）
* Notetags
* ============================================================================
*
* 武器(weapons) Notetags:
* <weapon Type: x>
* <weapon Types: x, x, x>
* <weapon Types: x to y>
* 说明： 为某把武器新增x武器类型
* 
* Version 3.7:
* 新增慢镜头脚本：
* yanLong.SlowMotion.startSlowMotion(slowLevel,frames);//(慢放倍率,慢放持续帧数)
* 例如:序列中使用：
* eval: yanLong.SlowMotion.startSlowMotion(3,60);
* 动作、动画以原速的3分之一速度，持续60帧
* 
* Version 3.6:
* 新增范围计算脚本：
* yanLong.addAoeCircleTargets(中心点战斗者,需要判断的所有战斗者,圆像素范围,圆高)
* yanLong.addAoeCircleTargets(target, targets, radiusValue, heightRate)
* 可将指定目标群自动按范围添加为目标
* 例如：yanLong.addAoeCircleTargets(targets[0],targets[0].friendsUnit().aliveMembers(),128,0.43);
* 
* Version 3.5:
* 新增简易召唤功能。可在右侧参数栏设置最大召唤物数量。
* 注意：召唤功能在【战斗测试】中会报错，但游戏内进行战斗可正常使用
* 召唤：
* yanLong.summon.summonActor(角色Id, 等级, 持续回合, 召唤时的动画id, 持续时间到时的动画id, SV战斗图名称, 脸图名称, 脸图索引【0-7】)
* 例如：yanLong.summon.summonActor(901,99,2,1,1,"yangfeng1")
* 
* 移除某个召唤物:
* yanLong.summon.removeSummonActor(角色Id)
* 例如：yanLong.summon.removeSummonActor(901)
* 
* 获取所有召唤物：
* yanLong.summon.getSummonActors()
* 
* 判断本召唤物是否在场
* battler.isSummon();
* 
* 场景内召唤物数量:
* yanLong.summon.dataActorNumConter
* 
* 信息窗口中追加：SK[skillId]    获取指定技能的冷却间隔时间//辣鸡功能
* Version 3.4:
* 新增变量：
* battler._forcePayHp;
* true时代表可以强制扣HP使用技能，即便是当前HP不足。
* false时和常规一样，HP不足时无法使用技能。
* 
* 新增升级自动增加可装备技能槽位功能，需要YEP_EquipBattleSkills前置插件，请将本插件放到Yep系列插件的最下方
* 战斗者每x级增加x个可装备技能槽位
* Version 3.3:
* 新增战斗者风火轮转动脚本：（角度，帧数，方向）
* batller.battler().startRotate(angle, angleFrame, rotatedirection);//
* 例如：序列中使用：eval: user.battler().startRotate(360,60,-1);//
* 
* 新增打断动画功能脚本：
* battler.breakAnimationOn(boolearn);//true时为开启动画打断，false为关闭动画打断
* 可使作用于当前战斗者的动画不予显示或恢复显示（不包括状态动画）
* 例:
* ①：user.breakAnimationOn(true);//关闭user身上的动画显示
* ②：user.breakAnimationOn(false);//开启user身上的动画显示
* 
* Version 3.2:
* 新增了立即改变目标某技能x%比率冷却时间的功能
* 
* ①立即按a号技能冷却间隔时间的x%比率增加该技能的当前冷却时间
* battler.addCDRate1(skillId,rate);
* 例如: target.addCDRate1(20,0.5);//增加目标20号技能50%比率的冷却间隔时间：
* 如20号技能设置的冷却时间为10，此时还剩5回合冷却结束，则使用该脚本后，实际
* 冷却为：5+10*0.5=10回合。rate为负数时，可降低冷却
* ★全部技能则使用脚本：
* battler.addCDRate1ForAllskills(rate);
* 
* ②立即按a号技能当前冷却时间的x%比率增加该技能的当前冷却时间
* battler.addCDRate2(skillId,rate);
* 例如: target.addCDRate2(20,0.5);//增加目标20号技能50%比率的所剩冷却时间：
* 如20号技能设置的冷却时间为10，此时还剩5回合冷却结束，则使用该脚本后，实际
* 冷却为：5+5*0.5=7.5回合。rate为负数时，可降低冷却
* ★全部技能则使用脚本：
* battler.addCDRate2ForAllskills(rate);
* 
* ③为目标增加指定技能id的冷却时间x回合
* battler.addCooldown(skillId, value);
* ★全部技能则使用脚本：全部技能则使用脚本：
* battler.addCDValueForAllskills(value);
* 
* Version 3.1:
* 新增升级版强制技能脚本：
* BattleManager.queueForceAction2(user, skillId, target)
* 强制技能，该脚本和原版BattleManager.queueForceAction(user, skillId, target)相比，
* 不会产生额外回合
* 现在敌人也可以使用脚本：
* battler.setBattlerImage(图片名称)
* 例如：
* 序列里使用时：eval: target.setBattlerImage("Actor1_1")
* 会变成霍尔德
* 图片所在文件夹名称：\img\sv_actors
* 数组去重：
* yanLong.unique1(array);
* 例如：
* var skillId=[1,2,3,1,3];
* var skillId=yanLong.unique1(skillId);
* console.log(skillId)//输出[2]
* Version 3.0:
* 新增标签：user.isFighting() 用来判断被动状态使用者是否在战场
* 说明：由于YEP被动状态插件会将所有玩家不管是否上阵都进行被动状态
* 条件的判断，造成没上阵角色被动状态里有friendsUint()时报错，因此修复
* 举例：
* <Custom Passive Condition>
* if (user.friendsUnit().aliveMembers().length==1) {
*    condition = true;
*  } else {
*    condition = false;
*  }
* </Custom Passive Condition>
* 以上是原版  会报错
* 以下是最新版 不会报错
* <Custom Passive Condition>
* if (user.isFighting()) {
* if (user.friendsUnit().aliveMembers().length==1) {
*     condition = true;
*   } else {
*     condition = false;
*   }
* } else {
*     condition = false;
* }
</Custom Passive Condition>
* Version 2.5:
* 修复描述错误;
* Version 2.0:
* 增加新目标自定义选择方式
* Version 1.0:
* 完成初步功能
* 更新预告:未来会添加各种不同目标组供大家无脑选择
*/




var qiqiyo = {
	getMinProperty: function(array, property){
		var member = array[0];
		for (var a = 1; a< array.length; a++) {
		        var member1 = array[a];
				if(member1[property] < member[property]){
				    member = member1;
				}
		}
		return member;
	},
	getMaxProperty: function(array, property){
		var member = array[0];
		for (var a = 1; a< array.length; a++) {
		        var member1 = array[a];
				if(member1[property] > member[property]){
				    member = member1;
				}
		}
		return member;
	},
	getMinProperties: function(array, property, count){
		var tlist = [];
		for (var a = 0; a< array.length; a++) {
	        var member = array[a];
			tlist.push(member);
		}
		tlist = tlist.sort(function(a, b){return a[property] - b[property];});
		if(tlist.length > count){
		    tlist.splice(count, (tlist.length - count));
		}
		return tlist;
	},
	getMaxProperties: function(array, property, count){
		var tlist = [];
		for (var a = 0; a< array.length; a++) {
	        var member = array[a];
			tlist.push(member);
		}
		tlist = tlist.sort(function(a, b){return b[property] - a[property];});
		if(tlist.length > count){
		    tlist.splice(count, (tlist.length - count));
		}
		return tlist;
	},
	getRandomEnemies: function(){
		var result = [];
		var array = foes.aliveMembers();
		var count = array.length;
		switch(count){
			case 0:
				break;
			case 1:
				result = this.getRandoms(array, 6);
				break;
			default:
				result = this.getRandoms(array, 12);
				break;
		}
		return result;
	},
	// 辅助函数
	getRandoms: function(array, count){
		var result = [];
		for(var i = 0;i < count;++i){
			result[i] = array[Math.floor(Math.random() * array.length)];
		}
		return result;
	},
	getAllMember: function(foes, friends, self){
		var result = foes;
    	var length = friends.length;
    	for (var i = 0; i < length; ++i) {
      		var member = friends[i];
      		if (member && member !== self){
      			result.push(member);
      		}
    	}
    	return result;
	},
	//阵列相关
	//查找targets中第row排的目标们并返回
	getMembersOfRow: function(targets, row){
		var ts=targets;
		var len=ts.length;
		var result = [];
		for(var i=0;i<len;i++){
			if(ts[i]._row==row){
				result.push(ts[i]);
			}
		}
		return result;
	},
	//查找targets中最靠后的目标们并返回
	getMembersOfMaxRow: function(targets){
		var arr=[];
		var len=targets.length;
		for(var i=0;i<len;i++){
			arr.push(targets[i]._row);
		}
		var maxRow =eval("Math.max(" +arr.toString()+")");
		var result = [];
		result=this.getMembersOfRow(targets, parseInt(maxRow));
		return result;
	},
	//查找targets中最靠前的目标们并返回
	getMembersOfMinRow: function(targets){
		var arr=[];
		var len=targets.length;
		for(var i=0;i<len;i++){
			arr.push(targets[i]._row);
		}
		var minRow =eval("Math.min(" +arr.toString()+")");
		var result = [];
		result=this.getMembersOfRow(targets, parseInt(minRow));
		return result;
	},
	//ctb系统中，获取最目标组中最先行动的行动者:qiqiyo.getClosestMembersOfCTB(targets);
	getClosestMembersOfCTB: function(targets){
		var arr=[];
		var len=targets.length;
		for(var i=0;i<len;i++){
			arr.push(targets[i]._ctbSpeed);
		}
		var value =eval("Math.max(" +arr.toString()+")");
		var result = [];
		for(var i=0;i<targets.length;i++){
			if(targets[i]._ctbSpeed==value){
				result.push(targets[i]);
				break;
			}
		}
		return result;
	},
	//ctb系统中，获取最目标组中最后行动的行动者: qiqiyo.getFurthestMembersOfCTB(targets);
	getFurthestMembersOfCTB: function(targets){
		var arr=[];
		var len=targets.length;
		for(var i=0;i<len;i++){
			arr.push(targets[i]._ctbSpeed);
		}
		var value =eval("Math.min(" +arr.toString()+")");
		var result = [];
		for(var i=0;i<targets.length;i++){
			if(targets[i]._ctbSpeed==value){
				result.push(targets[i]);
				break;
			}
		}
		return result;
	},
	//atb系统中，获取最目标组中最先行动的行动者:qiqiyo.getClosestMembersOfATB(targets);
	getClosestMembersOfATB: function(targets){
		var arr=[];
		var len=targets.length;
		for(var i=0;i<len;i++){
			arr.push(targets[i]._atbSpeed);
		}
		var value =eval("Math.max(" +arr.toString()+")");
		var result = [];
		for(var i=0;i<targets.length;i++){
			if(targets[i]._atbSpeed==value){
				result.push(targets[i]);
				break;
			}
		}
		return result;
	},
	//atb系统中，获取最目标组中最后行动的行动者: qiqiyo.getFurthestMembersOfATB(targets);
	getFurthestMembersOfATB: function(targets){
		var arr=[];
		var len=targets.length;
		for(var i=0;i<len;i++){
			arr.push(targets[i]._atbSpeed);
		}
		var value =eval("Math.min(" +arr.toString()+")");
		var result = [];
		for(var i=0;i<targets.length;i++){
			if(targets[i]._atbSpeed==value){
				result.push(targets[i]);
				break;
			}
		}
		return result;
	},
};

//yanLong+
var qiqiyo = qiqiyo || {};
qiqiyo.Game_Battler_isFighting = Game_Battler.prototype.isFighting;
Game_Battler.prototype.isFighting = function() {
	if($gameParty._inBattle){
		if(!this.isActor()){
			return true;
		}else{
			var flag=false;
		    var fightingMembers=$gameParty.aliveMembers();
		    for(var i=0;i<fightingMembers.length;i++){
		    	if(this==fightingMembers[i]){
		    		flag=true;
		    		break;
		    	}
		    }
		    return flag;
		}
	}else{
	 return false;	
	}
};

//new action,然后setskill maketarget apply
BattleManager.queueForceAction2=function(user, skillId, target){
	Window_BattleLog.oldFunction=Window_BattleLog.prototype.displayText;
	Window_BattleLog.prototype.displayText = function(item) {
	    	return item.name;
	};
	var action = new Game_Action(user);
	action.setSkill(skillId);
	action.setCounter();
	action.setTarget(target.index());
	this._counterQueue = this._counterQueue || [];
	this._counterQueue.push(action); 
	this._counterOriginalSubject = this._counterOriginalSubject || user;
	this._counterOriginalAction = this._counterOriginalAction || this._action; 
	Window_BattleLog.prototype.displayText($dataSkills[skillId]);
	setTimeout("Window_BattleLog.prototype.displayText=Window_BattleLog.oldFunction",1000);
};

Game_Enemy.prototype.setBattlerImage = function(battlerName) {
	this._svBattlerName=battlerName;
};



//===================================================================
//技能冷却追加脚本
//===================================================================

/*
//冷却CD相关
例1：for循环中可以用var skillId=target.allSkills()[i].id得到技能id
//获取角色指定技能id的剩余冷却回合数
battler._cooldownTurns[skillId];
//获取角色所有技能
battler.allSkills();
//获取角色指定技能id的冷却间隔
battler.cooldown(skillId);
//改变/设置指定技能id的冷却时间
battler.addCooldown(skillId, value);
battler.setCooldown(skillId, value);
*/

//立即增加目标各个技能的冷却时间x回合
Game_Battler.prototype.addCDValueForAllskills = function(value){
	var targetSkills = this.allSkills();
	var len=targetSkills.length;
	for(var i=0;i<len;i++){
		var skillId=targetSkills[i].id;
		if (this._cooldownTurns[skillId] === undefined) {
		      this._cooldownTurns[skillId] = 0;
		}
		this.addCooldown(skillId,value);
	}
};

//立即改变目标a技能x%比率的冷却间隔时间【按冷却间隔的百分比】。
Game_Battler.prototype.addCDRate1 = function(skillId,rate){
	if (this._cooldownTurns[skillId] === undefined) {
	      this._cooldownTurns[skillId] = 0;
	}
	var cd=$dataSkills[skillId].cooldown[skillId];
	var value=cd*rate;
	this._cooldownTurns[skillId] += value;
};

//按各个技能冷却间隔时间的x%比率，立即增加目标各个技能的当前冷却时间【按冷却间隔的百分比】
Game_Battler.prototype.addCDRate1ForAllskills = function(rate){
	var targetSkills = this.allSkills();
	var len=targetSkills.length;
	for(var i=0;i<len;i++){
		var skillId=targetSkills[i].id;
		this.addCDRate1(skillId,rate);
	}
};

//立即改变目标a技能x%比率的剩余冷却时间【按所剩冷却的百分比】。
Game_Battler.prototype.addCDRate2  = function(skillId,rate){
	if (this._cooldownTurns[skillId] === undefined) {
	      this._cooldownTurns[skillId] = 0;
	}
	var value=this.cooldown(skillId)*rate;
	this._cooldownTurns[skillId] += value;
};

//按各个技能当前剩余冷却时间的x%比率，立即增加目标各个技能的当前冷却时间【按冷却间隔的百分比】
Game_Battler.prototype.addCDRate2ForAllskills = function(rate){
	var targetSkills = this.allSkills();
	var len=targetSkills.length;
	for(var i=0;i<len;i++){
		var skillId=targetSkills[i].id;
		this.addCDRate2(skillId,rate);
	}
};



//理解改变目标所有技能的剩余
//打断动画功能
Sprite_Base.prototype.isAnimationBreak;
Sprite_Base.prototype.updateAnimationSprites = function() {
	this.isAnimationBreak=this.isAnimationBreak||false;
    if (this._animationSprites.length > 0) {
        var sprites = this._animationSprites.clone();
        this._animationSprites = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            if (sprite.isPlaying()) {
            	if(!this.isAnimationBreak){
            		 this._animationSprites.push(sprite);
                } else {
                	 sprite.remove();
                }
            } else {
                sprite.remove();
            }
            
            
        }
    }
};
//===================================================================
//开启/关闭打断动画
//===================================================================
yanLong = yanLong||{};
yanLong.AS = yanLong.AS || {};
Sprite_Base.prototype.startAnimation = function(animation, mirror, delay) {
    var sprite = new Sprite_Animation();
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
    yanLong.AS._duration = sprite._duration;
};

Game_Actor.prototype.startAnimation = function(animationId, mirror, delay) {
    mirror = !mirror;
    Game_Battler.prototype.startAnimation.call(this, animationId, mirror, delay);
};

Game_BattlerBase.prototype.breakAnimationOn = function(boolearn){
	if(boolearn==false){
		this.battler().isAnimationBreak=false;
	}else{
		this.battler().isAnimationBreak=true;
	}
};
//===================================================================
// 战斗者精灵旋转功能
//===================================================================

var yanLong = yanLong || {};
var Imported = Imported || {};

//数组去重复[不限于战斗]
yanLong.unique1=function (arr){
	  var hash=[];
	  for (var i = 0; i < arr.length; i++) {
	     if(hash.indexOf(arr[i])==-1){
	      hash.push(arr[i]);
	     }
	  }
	  return hash;
};

//计算攻击范围
yanLong.addAoeCircleTargets = function(target, targets, radiusValue, heightRate) {
    var main = target;
    if (!main) return;
    var group = targets;
    var targetsArray=new Array();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (yanLong.isInsideAoeCircle_yanLong(main, member, radiusValue, heightRate)) {
    	 targetsArray.push(member);
      }
    }
    return targetsArray;
};

yanLong.isInsideAoeCircle_yanLong = function (main, target, radiusValue, heightRate) {
    //var skill = $dataSkills[skillId];
    var radius = radiusValue;
    var height = heightRate;
    var mainX = main.aoeX();
    var mainY = main.aoeY();
    var targetX = target.aoeX();
    var targetY = target.aoeY();
    if (mainX > targetX) {
      targetX = Math.min(mainX, target.aoeX() + target.aoeWidth() / 2);
    } else if (mainX < targetX) {
      targetX = Math.max(mainX, target.aoeX() - target.aoeWidth() / 2);
    }
    if (mainY > targetY) {
      targetY = Math.min(mainY, target.aoeY());
    } else if (mainY < targetY) {
      targetY = Math.max(mainY, target.aoeY() - target.aoeHeight());
    }
    var x =  (targetX - mainX) * Math.cos(0) + (targetY - mainY) * Math.sin(0);
    var y = -(targetX - mainX) * Math.sin(0) + (targetY - mainY) * Math.cos(0);
    var a = radius; var b = radius * Math.max(height, 0.001);
    var c = (Math.pow(x, 2) / Math.pow(a, 2));
    c += (Math.pow(y, 2) / Math.pow(b, 2));
    return c <= 1;
};

//===================================================================
//Sprite_Battler
//===================================================================
//初始化时添加角度属性
yanLong.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
	yanLong.Sprite_Battler_initMembers.call(this);
	this._oldAngle = 0;
	this._angle = 0;
	this._angleFrame = 0;
	this._rotatedirection = 0;//对玩家方而言：1为顺时针，-1为逆时针。对敌群方反之。
	this._isChangeAngle = false;
	this._isChangeAngleFrame = false;
	this._speed = 0;
};

yanLong.Sprite_Battler_update=Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
	yanLong.Sprite_Battler_update.call(this);
	//console.log(1);
	//this._effectTarget.rotation = (this._angle++) * Math.PI / 180;
	if(this.isChangeAngle()){
		this._shadowSprite.opacity = 0;
		if(this._rotatedirection==1){
			//顺时针旋转
			var zangle = this._oldAngle += this._speed;
			this._effectTarget.rotation = zangle * Math.PI / 180;
			this._angleFrame--;
			if(this._angleFrame==0){
				//this._oldAngle = this._angle;
				this._angle = 0;
				this._isChangeAngle = false;
				this._isChangeAngleFrame = false;
				this._speed = 0;
				this._rotatedirection = 0;
			}
		}else{
			//逆时针旋转
			var zangle = this._oldAngle -= this._speed;
			this._effectTarget.rotation = zangle * Math.PI / 180;
			
			this._angleFrame--;
			if(this._angleFrame==0){
				//this._oldAngle = this._angle;
				this._angle = 0;
				this._isChangeAngle = false;
				this._isChangeAngleFrame = false;
				this._speed = 0;
				this._rotatedirection = 0;
			}
		}
	}else{
		this._shadowSprite.opacity = 255;
	}
};

//开始旋转
Sprite_Battler.prototype.startRotate = function(angle, angleFrame, rotatedirection){
	this._isChangeAngle = true;
	this._isChangeAngleFrame = true;
	this.setAngle(angle);
	this.setAngleFrame(angleFrame);
	this.setRotatedirection(rotatedirection);
	this._speed = angle/angleFrame;
};

//取得旋转方向
Sprite_Battler.prototype.rotatedirection = function() {
	this._rotatedirection;
};

//设置旋转方向
Sprite_Battler.prototype.setRotatedirection = function(rotatedirection) {
	this._rotatedirection=rotatedirection;
};

//取得角度
Sprite_Battler.prototype.angle = function() {
	this._angle;
};

//设置角度
Sprite_Battler.prototype.setAngle = function(angle) {
	this._angle=angle;
};

//取得角度帧数
Sprite_Battler.prototype.angleFrame = function() {
	this._angleFrame;
};

//设置角度帧数
Sprite_Battler.prototype.setAngleFrame = function(angleFrame) {
	this._angleFrame=angleFrame;
};

//是设置了角度
Sprite_Battler.prototype.isChangeAngle = function() {
	return this._isChangeAngle;
};

//是设置了角度帧数
Sprite_Battler.prototype.isChangeAngleFrame = function() {
	return this._isChangeAngleFrame;
};

if (Imported.YEP_EquipBattleSkills) {

//=============================================================================
//慢动作
//=============================================================================
//战斗内
yanLong.SlowMotion = yanLong.SlowMotion || {};
yanLong.SlowMotion.frames = yanLong.SlowMotion.frames || 0;
yanLong.SlowMotion.Scene_Base_update = Scene_Base.prototype.update;
yanLong.SlowMotion.isSlowMotion = false;
Scene_Base.prototype.update = function() {
	if(yanLong.SlowMotion.isSlowMotion){
		yanLong.SlowMotion.slowLevel = yanLong.SlowMotion.slowLevel || 1;
		yanLong.SlowMotion.sbCounter = yanLong.SlowMotion.sbCounter || 0;
		if(yanLong.SlowMotion.sbCounter == yanLong.SlowMotion.slowLevel){
			if(yanLong.SlowMotion.frames>0){
				yanLong.SlowMotion.frames--;
			}else{
				yanLong.SlowMotion.slowLevel = 1;
				yanLong.SlowMotion.isSlowMotion = false;
			}
			yanLong.SlowMotion.sbCounter = 0;
			yanLong.SlowMotion.Scene_Base_update.call(this);
		}
		yanLong.SlowMotion.sbCounter++;
	}else{
		yanLong.SlowMotion.Scene_Base_update.call(this);
	}
};

//战斗外
yanLong.SlowMotion.frames2 = yanLong.SlowMotion.frames2 || 0;
yanLong.SlowMotion.Scene_Map_update = Scene_Map.prototype.update;
yanLong.SlowMotion.isSlowMotion2 = false;
Scene_Map.prototype.update = function() {
	if(yanLong.SlowMotion.isSlowMotion2){
		yanLong.SlowMotion.slowLevel2 = yanLong.SlowMotion.slowLevel2 || 1;
		yanLong.SlowMotion.sbCounter2 = yanLong.SlowMotion.sbCounter2 || 0;
		if(yanLong.SlowMotion.sbCounter2 == yanLong.SlowMotion.slowLevel2){
			if(yanLong.SlowMotion.frames2>0){
				yanLong.SlowMotion.frames2--;
			}else{
				yanLong.SlowMotion.slowLevel2 = 1;
				yanLong.SlowMotion.isSlowMotion2 = false;
			}
			yanLong.SlowMotion.sbCounter2 = 0;
			yanLong.SlowMotion.Scene_Map_update.call(this);
		}
		yanLong.SlowMotion.sbCounter2++;
	}else{
		yanLong.SlowMotion.Scene_Map_update.call(this);
	}
};

yanLong.SlowMotion.startSlowMotion = function(slowLevel,frames) {
	if($gameParty.inBattle()){
		//战斗内
		yanLong.SlowMotion.isSlowMotion = true;
		yanLong.SlowMotion.slowLevel = slowLevel;
		yanLong.SlowMotion.frames = Math.round(frames/slowLevel);
	}else{
		//战斗外
		yanLong.SlowMotion.isSlowMotion2 = true;
		yanLong.SlowMotion.slowLevel2 = slowLevel;
		yanLong.SlowMotion.frames2 = Math.round(frames/slowLevel);
	}
};

//修复Olivia状态窗口刷新问题
if (Imported.YEP_BuffsStatesCore && Imported.Olivia_StateOlivia_StateTooltipDisplay) {
yanLong.Game_Battler_onActionEndStateEffects = Game_Battler.prototype.onActionEndStateEffects;
Game_Battler.prototype.onActionEndStateEffects = function() {
	yanLong.Game_Battler_onActionEndStateEffects.call(this);
	SceneManager._scene._stateIconTooltipWindow.updateNewData();
	
};

yanLong.Game_Battler_onTurnStartStateEffects = Game_Battler.prototype.onTurnStartStateEffects;
Game_Battler.prototype.onTurnStartStateEffects = function() {
	yanLong.Game_Battler_onTurnStartStateEffects.call(this);
	SceneManager._scene._stateIconTooltipWindow.updateNewData();
	
};

}
//修复使用多技能类型插件后其他类型依旧无法装备技能的问题
if (Imported.YEP_MultiTypeSkills) {
Game_Actor.prototype.canEquipSkill = function(skill) {
	  if (this._cachedEquippableBattleSkills === undefined) {
	    this.createEquippableBattleSkillsCache();
	  }
	  if (!this._cachedEquippableBattleSkills.contains(skill.id)) return false;
	  if (!skill.equippable) return false;
	  if (skill.allEquippable) return true;
	  var flag=false;
	  for(var i=0;i<skill.skillTypes.length;i++){
		 flag = this.addedSkillTypes().contains(skill.skillTypes[i]);
		 if(flag){
			 break;
		 }
	  }
	  return flag;
	};
}
}

//修复切换职业后不允许携带的技能依旧在身上的问题（每次切换职业直接去掉所有技能）
if (Imported.YEP_ClassChangeCore) {
yanLong.Game_Actor_changeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp) {
	yanLong.Game_Actor_changeClass.call(this,classId, keepExp);
	this.clearEquipBattleSkills();
};
}

//修复装备槽超限后返回没提示音的BUG
/*
if (Imported.YEP_X_EquipSkillTiers) {
Yanfly.ESTier.Game_Actor_equipSkill = function (skillId, slotId) {
    if (this._battleSkills.indexOf(skillId) >= 0) {
      var index = this._battleSkills.indexOf(skillId);
      this._battleSkills[index] = 0;
    }
    this._battleSkills[slotId] = skillId;
    this.clearUnequippableSkills();
    this.refresh();
};
Game_Actor.prototype.equipSkill = function(skillId, slotId) {
    if (this._learningSkill) {
      var skill = $dataSkills[skillId]; 
      if (skill) {
        var tier = skill.equipTier;
        var cur = this.getEquipSkillTierCount(tier);
        var max = this.getEquipSkillTierMax(tier);
        if (cur >= max){
        	return;
        }
      }
    }
    Yanfly.ESTier.Game_Actor_equipSkill.call(this, skillId, slotId);
};
Game_Actor.prototype.equipSkillTiersOk = function() {
    var tiers = $gameSystem.usedSkillTiers();
    for (var i = 0; i < tiers.length; ++i) {
      var tier = tiers[i];
      var cur = this.getEquipSkillTierCount(tier);
      var max = this.getEquipSkillTierMax(tier);
      if (cur >= max){
      	return false;
      }else{
    	  SoundManager.playCancel();
    	return false;
      }
    }
    return true;
};
}
*/
//=============================================================================
// 多装备类型功能     
//=============================================================================
// DataManager
//=============================================================================
/*
Yanfly.MTS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.MTS.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_MultiTypeSkills) {
    this.processMTSNotetags1($dataSkills);
    Yanfly._loaded_YEP_MultiTypeSkills = true;
  }
  
  return true;
};*/

yanLong.MTE = yanLong.MTE || {};

yanLong.MTE.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
	if (!yanLong.MTE.DataManager_isDatabaseLoaded.call(this)) return false;
	this.processMTENotetags1($dataWeapons);	  
	//this.processMTENotetags2($dataArmors);	
	return true;
};

//Weapons:wtypeIds数组用于代替原先的wtypeId变量
DataManager.processMTENotetags1 = function(group) {
	var note1 = /<WEAPON[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	var note2 = /<WEAPON[ ](?:TYPE|TYPES):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
	    var obj = group[n];
	    var notedata = obj.note.split(/[\r\n]+/);
		obj.wtypeIds = [obj.wtypeId];
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
		    if (line.match(note1)) {
		        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
		        obj.wtypeIds = obj.wtypeIds.concat(array);
		     } else if (line.match(note2)) {
		        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
		        parseInt(RegExp.$2));
		        obj.wtypeIds = obj.wtypeIds.concat(range);
		     }
	    }
	}
};

//Armors:etypeIds数组用于代替原先的etypeId变量
/*
DataManager.processMTENotetags2 = function(group) {
	var note1 = /<ARMOR[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
	var note2 = /<ARMOR[ ](?:TYPE|TYPES):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
	for (var n = 1; n < group.length; n++) {
	    var obj = group[n];
	    var notedata = obj.note.split(/[\r\n]+/);
		obj.etypeIds = [obj.etypeId];
		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
		    if (line.match(note1)) {
		        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
		        obj.etypeIds = obj.etypeIds.concat(array);
		     } else if (line.match(note2)) {
		        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
		        parseInt(RegExp.$2));
		        obj.etypeIds = obj.etypeIds.concat(range);
		     }
	    }
	}
};
*/
Game_BattlerBase.prototype.canEquipWeapon = function(item) {
	item.wtypeIds=item.wtypeIds||[item.wtypeId];
	item.etypeIds=item.etypeIds||[item.etypeId];
	var value=false;//this.isEquipWtypeOk(item.wtypeId)
	var len=item.wtypeIds.length;
	for(var i=0;i<len;i++){
		if(this.isEquipWtypeOk(item.wtypeIds[i])){
			value=true;
			break;
		}
	}
    return value && !this.isEquipTypeSealed(item.etypeId[0]);
};
/*
Game_BattlerBase.prototype.canEquipArmor = function(item) {
	item.etypeIds=item.etypeIds||[item.etypeId];
	var value = this.isEquipTypeSealed(item.etypeId);
	var len=item.etypeIds.length;
	console.log(item)
	console.log(item.etypeIds)
	for(var i=0;i<len;i++){
		if(this.isEquipTypeSealed(item.etypeIds[i])){
			value=true;
			break;
		}
	}
	console.log(this.isEquipAtypeOk(item.atypeId) && !value)
	return this.isEquipAtypeOk(item.atypeId) && !value;
};
*/
/*
Window_EquipItem.prototype.includes = function(item) {
	console.log(item)
	var value = false;
    if (item === null) {
        return true;
    }
    item.etypeIds = item.etypeIds||[item.etypeIds]; 
    var len=item.etypeIds.length;
    for(var i=0;i<len;i++){
    	if (this._slotId < 0 || item.etypeIds[i] !== this._actor.equipSlots()[this._slotId]) {
            value = false;
        }else{
        	value = true;
        	break;
        }
    }
    return this._actor.canEquip(item);
};*/




//=============================================================================
//Game_Actor
//=============================================================================

//自用，请无视
BattleManager.actionMove = function(name, actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['HOME', 'ORIGIN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('walk');
        mover.spriteFaceHome();
      });
    } else if (['RETURN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        if($gameActors.actor(1).mainAgiStateId==78){
        	mover.requestMotion('walk');
        }else{
        	mover.requestMotion('evade');
        }
        mover.spriteFaceForward();
      });
    } else if (['FORWARD', 'FORWARDS', 'BACKWARD',
    'BACKWARDS'].contains(cmd)) {
      var distance = actionArgs[1] || Yanfly.Param.BECStepDist;
      if (['BACKWARD', 'BACKWARDS'].contains(cmd)) distance *= -1;
      var frames = actionArgs[2] || 12;
      movers.forEach(function(mover) {
        mover.battler().moveForward(distance, frames);
        if($gameActors.actor(1).mainAgiStateId==78){
        }else{
        	 mover.requestMotion('walk');
        } 
        if (['FORWARD', 'FORWARDS'].contains(cmd)) {
          mover.spriteFaceForward();
        } else {
          mover.spriteFaceBackward();
        }
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',//标记
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      var frames = actionArgs[3] || 12;
      movers.forEach(function(mover) {
        var offsetX = BattleManager.actionMoveOffsetX(actionArgs, mover, mover);
        var offsetY = BattleManager.actionMoveOffsetY(actionArgs, mover, mover);
        mover.battler().moveToPoint(destX + offsetX, destY + offsetY, frames);
        if($gameActors.actor(1).mainAgiStateId==78){
        }else{
        	 mover.requestMotion('walk');
        }
        mover.spriteFacePoint(destX, destY);
      });
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      var frames = actionArgs[2] || 12;
      var type = actionArgs[1].toUpperCase();
      if (targets.length < 1) return false;
      for (var i = 0; i < movers.length; ++i) {
      	var mover = movers[i];
      	if (!mover) continue;
      	if (['BASE', 'FOOT', 'FEET'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['CENTER', 'MIDDLE'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['HEAD', 'TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      } else if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
	      'FRONT'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
	      'BACK'].contains(type)) {
	      	var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      }
        var offsetX = this.actionMoveOffsetX(actionArgs, mover, targets[0]);
        var offsetY = this.actionMoveOffsetY(actionArgs, mover, targets[0]);
	      mover.battler().moveToPoint(destX + offsetX, destY + offsetY, frames);
        mover.spriteFacePoint(destX, destY);
      }
    }
    return true;
};

//=============================================================================
//增加强制扣血后死亡功能
//=============================================================================
if (Imported.YEP_SkillCore) {
Game_BattlerBase.prototype._forcePayHp = false;
Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
	if(this._forcePayHp==false){
		var cost = this.skillHpCost(skill);
	    if (cost <= 0) return true;
	    return this._hp > cost;
	}else{
		return true;
	} 
};
}

//if (Imported.YEP_BattleEngineCore) {
////=============================================================================
////帧停顿效果
////=============================================================================
//yanLong.fw = yanLong.fw || {};
//yanLong.fw.mmSpeed = yanLong.fw.mmSpeed||1;
//yanLong.fw.save_aniCount = 0;//开始慢动作时保存动画帧数
//yanLong.fw.isAniFwStart = false;
//yanLong.fw.isAniFwEnd = false;
//yanLong.fw.save_moveCount = 0;//开始慢动作时保存移动帧数
//yanLong.fw.save_waitCount = 0;//开始慢动作时保存等待帧数
//yanLong.fw.framesCounter = 0;//记录慢动作持续了的帧数
//yanLong.fw.isChangeSpeed = false;
//yanLong.fw.fwing = false;
//
//yanLong.fw.jumpFw = false;
//yanLong.fw.floatFw = false;
//yanLong.fw.endjumpFw = false;
//yanLong.fw.endfloatFw = false;
////帧停帧数
//yanLong.fw.extraFrames=-1;//开始慢动作时设置的等待帧数
//
////动作速率可变
//var $yanLong_motionSpeed = $yanLong_motionSpeed || 12;
//Sprite_Actor.prototype.motionSpeed = function() {
//    return $yanLong_motionSpeed;
//};
//}
//
//BattleManager.startFw = function(mmSpeed,frames){
//	yanLong.fw.jumpFw = true;
//	yanLong.fw.floatFw = true;
//	yanLong.fw.isAniFwStart = true;
//	$yanLong_motionSpeed *= mmSpeed;
//	yanLong.fw.extraFrames = frames;
//	yanLong.fw.save_waitCount = BattleManager._logWindow._waitCount;
//	BattleManager._logWindow._waitCount += frames*mmSpeed;
//	yanLong.fw.isChangeSpeed = true;
//	yanLong.fw.mmSpeed = mmSpeed;
//};
//BattleManager.stopFw = function(){
//	yanLong.fw.save_moveCount = 0;
//	yanLong.fw.save_waitCount = 0;
//	$yanLong_motionSpeed = 12;
//	yanLong.fw.fwing = true;
//	yanLong.fw.isAniFwEnd = true;
//	yanLong.fw.endjumpFw = true;
//	yanLong.fw.endfloatFw = true;
//};
////+
//Game_CharacterBase.prototype.updateJump = function() {
//	if(yanLong.fw.jumpFw == true){
//		yanLong.fw.jumpFw = false;
//		this._jumpCount *= yanLong.fw.mmSpeed;
//	}
//	if(yanLong.fw.endjumpFw == true){
//		yanLong.fw.endjumpFw = false;
//		this._jumpCount = this._jumpCount/yanLong.fw.mmSpeed;
//	}
//    this._jumpCount--;
//    this._realX = (this._realX * this._jumpCount + this._x) / (this._jumpCount + 1.0);
//    this._realY = (this._realY * this._jumpCount + this._y) / (this._jumpCount + 1.0);
//    this.refreshBushDepth();
//    if (this._jumpCount === 0) {
//        this._realX = this._x = $gameMap.roundX(this._x);
//        this._realY = this._y = $gameMap.roundY(this._y);
//    }
//};
//Sprite_Battler.prototype.updateFloat = function() {
//	if(yanLong.fw.floatFw == true){
//		yanLong.fw.floatFw = false;
//		this._floatDur *= yanLong.fw.mmSpeed;
//		this._jumpDur *= yanLong.fw.mmSpeed;
//	}
//	if(yanLong.fw.endfloatFw == true){
//		yanLong.fw.endfloatFw = false;
//		this._floatDur = this._floatDur/yanLong.fw.mmSpeed;
//		this._jumpDur = this._jumpDur/yanLong.fw.mmSpeed;
//	}
//    if (!this._battler) return;
//    if (this._floatDur > 0) this._floatDur--;
//    if (this._jumpDur > 0) this._jumpDur--;
//    var baseY = this._battler.anchorY();
//    var floatHeight = this.getFloatHeight();
//    var jumpHeight = this.getJumpHeight();
//    var height = floatHeight + jumpHeight;
//    if (this._mainSprite && this._mainSprite.bitmap) {
//      var rate = this._battler.spriteHeight() / this._mainSprite.height;
//      this._mainSprite.anchor.y = (baseY + height * rate);
//      this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
//    } else {
//      this.anchor.y = (baseY + height);
//    }
//};
////-
//Sprite_Animation.prototype.updateMain = function() {
//	if(yanLong.fw.isAniFwStart == true){
//		yanLong.fw.save_aniCount = this._duration;
//		this._duration *= yanLong.fw.mmSpeed;
//		yanLong.fw.isAniFwStart=false;
//	}
//	if(yanLong.fw.isAniFwEnd == true){
//		yanLong.fw.isAniFwEnd = false;
//		this._duration = this._duration/yanLong.fw.mmSpeed;
//	}
//    if (this.isPlaying() && this.isReady()) {
//        if (this._delay > 0) {
//            this._delay--;
//        } else {
//            this._duration--;
//            this.updatePosition();
//            if (this._duration % this._rate === 0) {
//                this.updateFrame();
//            }
//        }
//    }
//};
//
//Sprite_Battler.prototype.updateMove = function() {
//	if(yanLong.fw.isChangeSpeed == true){
//		yanLong.fw.save_moveCount = this._movementDuration;
//		this._movementDuration *= yanLong.fw.mmSpeed;
//		yanLong.fw.isChangeSpeed=false;
//	}
//	if(yanLong.fw.fwing == true){
//		yanLong.fw.fwing = false;
//		this._movementDuration = this._movementDuration/yanLong.fw.mmSpeed;
//	}
//	if(yanLong.fw.save_moveCount==this._movementDuration){
//		BattleManager.stopFw();
//	}
//    if (this._movementDuration > 0) {
//        var d = this._movementDuration;
//        this._offsetX = (this._offsetX * (d - 1) + this._targetOffsetX) / d;
//        this._offsetY = (this._offsetY * (d - 1) + this._targetOffsetY) / d;
//        this._movementDuration--;
//        if (this._movementDuration === 0) {
//            this.onMoveEnd();
//        }
//    }
//};


////=============================================================================
//信息核心功能追加
////=============================================================================
//SK[skillId]    获取指定技能的冷却间隔时间
if (Imported.YEP_MessageCore && Imported.YEP_X_SkillCooldowns) {
yanLong.Window_Base_convertExtraEscapeCharacters =
	Window_Base.prototype.convertExtraEscapeCharacters;
Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
	 // \SK[n]
    text = text.replace(/\x1bSK\[(\d+)\]/gi, function() {
    	var skillCD = $dataSkills[parseInt(arguments[1])].cooldown[parseInt(arguments[1])];
        return skillCD;
    }.bind(this));
    // \EVAL[n]测试
    text = text.replace(/\x1bEVAL\[(.*)\]/gi, function() {
        return eval(code);
    }.bind(this));
    
    text = yanLong.Window_Base_convertExtraEscapeCharacters.call(this, text);
    return text;
};
}
/*
Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
    // Font Codes
    text = text.replace(/\x1bFR/gi, '\x1bMSGCORE[0]');
    text = text.replace(/\x1bFB/gi, '\x1bMSGCORE[1]');
    text = text.replace(/\x1bFI/gi, '\x1bMSGCORE[2]');
    // \AC[n]
    text = text.replace(/\x1bAC\[(\d+)\]/gi, function() {
        return this.actorClassName(parseInt(arguments[1]));
    }.bind(this));
    // \AN[n]
    text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
        return this.actorNickname(parseInt(arguments[1]));
    }.bind(this));
    // \PC[n]
    text = text.replace(/\x1bPC\[(\d+)\]/gi, function() {
        return this.partyClassName(parseInt(arguments[1]));
    }.bind(this));
    // \PN[n]
    text = text.replace(/\x1bPN\[(\d+)\]/gi, function() {
        return this.partyNickname(parseInt(arguments[1]));
    }.bind(this));
    // \NC[n]
    text = text.replace(/\x1bNC\[(\d+)\]/gi, function() {
        return $dataClasses[parseInt(arguments[1])].name;
    }.bind(this));
    // \NI[n]
    text = text.replace(/\x1bNI\[(\d+)\]/gi, function() {
        return $dataItems[parseInt(arguments[1])].name;
    }.bind(this));
    // \NW[n]
    text = text.replace(/\x1bNW\[(\d+)\]/gi, function() {
        return $dataWeapons[parseInt(arguments[1])].name;
    }.bind(this));
    // \NA[n]
    text = text.replace(/\x1bNA\[(\d+)\]/gi, function() {
        return $dataArmors[parseInt(arguments[1])].name;
    }.bind(this));
    // \NE[n]
    text = text.replace(/\x1bNE\[(\d+)\]/gi, function() {
        return $dataEnemies[parseInt(arguments[1])].name;
    }.bind(this));
    // \NS[n]
    text = text.replace(/\x1bNS\[(\d+)\]/gi, function() {
        return $dataSkills[parseInt(arguments[1])].name;
    }.bind(this));
    // \NT[n]
    text = text.replace(/\x1bNT\[(\d+)\]/gi, function() {
        return $dataStates[parseInt(arguments[1])].name;
    }.bind(this));
    // \II[n]
    text = text.replace(/\x1bII\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataItems);
    }.bind(this));
    // \IW[n]
    text = text.replace(/\x1bIW\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataWeapons);
    }.bind(this));
    // \IA[n]
    text = text.replace(/\x1bIA\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataArmors);
    }.bind(this));
    // \IS[n]
    text = text.replace(/\x1bIS\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataSkills);
    }.bind(this));
    // \IT[n]
    text = text.replace(/\x1bIT\[(\d+)\]/gi, function() {
        return this.escapeIconItem(arguments[1], $dataStates);
    }.bind(this));
    // Finish
    return text;
};
};
*/
//yanLong-
//自用部分+

/*
yanLong.mog.BH = Battle_Hud.prototype.create_layout;
Battle_Hud.prototype.create_layout = function() {
	var actor = this._battler;
	if(!actor._summoned){
		yanLong.mog.BH.call(this);
	}
};*/
//截拳道弱点提示对象
yanLong.tishiJKDruodian=yanLong.tishiJKDruodian||{};
yanLong.tishiJKDruodian.tishiShangpan=[];
yanLong.tishiJKDruodian.tishiZhongpan=[];
yanLong.tishiJKDruodian.tishiXiapan=[];
yanLong.tishiJKDruodian.tishiJingti=[];
//为一组目标循环播放动画函数
yanLong.tishiJKDruodian.tishi = function(battlers,animationId){
 var arr = battlers;
 var len = arr.length;
 for(var i=0;i<len;i++){
  arr[i].startAnimation(animationId);
 }
};
Window_EnemyVisualSelect.prototype.initialize = function() {
    Window_Base.prototype.initialize.call(this, 0, 0, 1, 1);
    this._battler = null;
    //this._battlerName = '';
    this._requestRefresh = false;
    this._showSelectCursor = Yanfly.Param.BECShowSelectBox;
    this._showEnemyName = Yanfly.Param.BECShowEnemyName;
    this.contentsOpacity = 0;
    this.opacity = 0;
};
var yanLong_createFilter = function (id, filter, targetObj, targetBattler) {
	//$gameScreen._zoomScale
	var zoom = $gameScreen.zoomScale();
   /* var clamp = BattleManager.cameraClamp();
	/*var chaX=SceneManager._boxWidth*0.5-SceneManager._boxWidth/rate*0.5;
	var chaY=SceneManager._boxHeight*0.5-SceneManager._boxHeight/rate*0.5;*/
	/*var screenX = -1 * $gameScreen.zoomX() * zoom + Graphics.boxWidth / 2;
	var screenY = -1 * $gameScreen.zoomY() * zoom + Graphics.boxHeight / 2;
    var zmX,zmY;
    if (clamp && zoom >= 1.0) {
        var clampX1 = -Graphics.boxWidth * zoom + Graphics.boxWidth;
        var clampY2 = -Graphics.boxHeight * zoom + Graphics.boxHeight;
        zmX = Math.round(screenX.clamp(clampX1, 0));
        zmY = Math.round(screenY.clamp(clampY2, 0));
      } else if (clamp && zoom < 1.0) {
    	zmX = Math.round((Graphics.boxWidth - Graphics.boxWidth * zoom) / 2);
    	zmY = Math.round((Graphics.boxHeight - Graphics.boxHeight * zoom) / 2);
      } else {
    	zmX = Math.round(screenX);
    	zmY = Math.round(screenY);
      }*/
	/*var pianyiX=SceneManager._boxWidth*0.5-zmX;
	var pianyiY=SceneManager._boxHeight*0.5-zmY;*/
	/*var cmX=$gameScreen._zoomX.clamp(SceneManager._boxWidth/rate*0.5,SceneManager._boxWidth-SceneManager._boxWidth/rate*0.5);
    var cmY=$gameScreen._zoomY.clamp(SceneManager._boxHeight/rate*0.5,SceneManager._boxHeight-SceneManager._boxHeight/rate*0.5);*/
	var char=0;
	var zcontains=function(arrays, obj) {
	    var i = arrays.length;
	    while (i--) {
	        if (arrays[i] == obj) {
	            return i;
	        }
	    }
	    return false;
	};
	targetBattler=targetBattler||0;
	var x=0,y=0;
	var x1=0,y1=0;
	if(targetBattler!=0){
		var index = 0;
        if(!targetBattler.isActor()) {
            index = -(zcontains($gameTroop._enemies,targetBattler)+1);
        } else {
            index = (zcontains($gameParty.members(),targetBattler)+1);
        }
        char = index;
		//获取targetBattler的home坐标
		x=targetBattler.battler()._homeX;
		y=targetBattler.battler()._homeY;
		if(!targetBattler.isActor()) {
			//更改坐标
			x1=x+targetBattler.battler()._offsetX/*-targetBattler.spriteWidth()*(1-rate)*rate*/;
			y1=y+targetBattler.battler()._offsetY-targetBattler.spriteHeight()/2*zoom;
		}else{
			//更改坐标
			x1=x+targetBattler.battler()._offsetX/*+targetBattler.spriteWidth()*(1-rate)*rate*/;
			y1=y+targetBattler.battler()._offsetY-targetBattler.spriteHeight()/2*zoom;
		}
		//console.log(x,y)
		//console.log(x1,y1)
		//console.log(char)
	}
	/*zmX -= Graphics.boxWidth*0.5;
	zmY -= Graphics.boxHeight*0.5;*/
	var rate=1;
	if(Math.abs(x1-Graphics.boxWidth / 2)<100){
		rate=1;
	}
	else if(Math.abs(x1-Graphics.boxWidth / 2)>=100&&Math.abs(x1-Graphics.boxWidth / 2)<150){
		rate=0.88;
	}
	else if(Math.abs(x1-Graphics.boxWidth / 2)>=150&&Math.abs(x1-Graphics.boxWidth / 2)<200){
		rate=0.76;
	}
	else if(Math.abs(x1-Graphics.boxWidth / 2)>=200&&Math.abs(x1-Graphics.boxWidth / 2)<250){
		rate=0.64;
	}
	else if(Math.abs(x1-Graphics.boxWidth / 2)>=250&&Math.abs(x1-Graphics.boxWidth / 2)<300){
		rate=0.52;
	}
	else if(Math.abs(x1-Graphics.boxWidth / 2)>=300&&Math.abs(x1-Graphics.boxWidth / 2)<350){
		rate=0.4;
	}
	else if(Math.abs(x1-Graphics.boxWidth / 2)>=350&&Math.abs(x1-Graphics.boxWidth / 2)<400){
		rate=0.28;
	}
	else if(Math.abs(x1-Graphics.boxWidth / 2)>=400&&Math.abs(x1-Graphics.boxWidth / 2)<450){
		rate=0.16;
	}else {
		rate=0.04;
	}
	var offsetX=-(x1-Graphics.boxWidth / 2)/zoom*rate;
	var offsetY=(y1-Graphics.boxHeight / 2)/zoom;
	targetBattler.battler()._homeX=x1;
	targetBattler.battler()._homeY=y1;
	$gameMap.createFilter(id, filter, targetObj, char,x1+offsetX,y1+offsetY);
	//更回坐标
	targetBattler.battler()._homeX=x;
	targetBattler.battler()._homeY=y;
};

//=============================================================================
//Utilities
//----------------------------------------------------------------------------
//Provided by Yanfly
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
var result = [];
for (var i = n; i <= m; ++i) result.push(i);
return result;
};

//-
