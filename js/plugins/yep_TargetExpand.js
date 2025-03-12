//=============================================================================
// yep_TargetExpand.js
//=============================================================================

/*:
* @plugindesc YEP目标核心插件的拓展功能
* @author 奇奇
*
*
* @help 注意事项:使用时请放在YEP_TargetCore插件下面
* 此插件作为简易设置目标核心的拓展类内容,丢进技能备注里,格式为:
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
* 
* $gameParty.aliveMembers()    活着的玩家
* $gameParty.deadMembers()     死掉的玩家
* $gameTroop.aliveMembers()    活着的敌人
* $gameTroop.deadMembers()     死掉的敌人
* user.opponentsUnit().aliveMembers() 活着的敌对玩家
* user.opponentsUnit().deadMembers() 死掉的敌对玩家
* user.friendsUnit().aliveMembers() 活着的队友
* user.friendsUnit().deadMembers() 死掉的队友
* 注意 队友是自己同伴，敌人的队友还是敌人
*      敌对是敌对玩家，敌人的敌对是玩家
* battler.isFighting()        判断该战斗者是否处于战场内
* 
* Version 3.1:
* 新增升级版强制技能脚本：
* BattleManager.queueForceAction2(user, skillId, target)
* 强制技能，该脚本和原版BattleManager.queueForceAction(user, skillId, target)相比，
* 不会产生额外回合
* 
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
	}

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
//yanLong-
