
//=============================================================================
// _Dujian15_RandomEnemy.js
//=============================================================================

/*:
 * @plugindesc Yet Another menu screen layout.
 * @author Dujian15 on 66rpg
 * 
 * @param maxEnemyNumber
 * @设置最大敌人数.
 * @default 15
 *  
 * @param Front Position X
 * @desc 第一个敌人的X坐标.
 * 默认值: 200
 * @default 200
 *
 * @param Front Position Y
 * @desc 第一个敌人的y坐标.
 * 默认值: 280
 * @default 280
 *
 * @param Front Instance X
 * @desc This formula determines the actor's home Y position.
 * 默认值: 32
 * @default 32
 *
 * @param Front Instance Y
 * @desc This formula determines the actor's home Y position.
 * 默认值: 48
 * @default 48
 *
 * @param Enemy Number
 * @设置每列最大敌人数.
 * 默认值: 5
 * @default 5 
 *
 * @param Sort Switch
 * @设置排序的开关.开关关闭则视为自动排序，切记，切记！
 * 默认值: 12
 * @default 12 
 *  
 *  
 * @help 这是一个设置随机位置产生随机敌人的一个插件
 * 使用方法：在敌群（troop）的名字上输入TroopNumber|最小值|最大值    
 * 当然理论上最小值和最大值可以互换，如果想让队伍的人数固定
 * 两个值取一样这种事情，人家才不会告诉你呢。
 * 范例： TroopNumber|3|5
 * 这样就可以生成一个随机三到五人的敌群队伍，怎么样，很方便吧？ 
 * 至于选用什么样的敌人，完全要看你在数据库中扔到敌群中的敌人是什么
 * 比如扔一个蝙蝠，一个屎莱姆，那么两种敌人出现的概率各是50%
 * 如果你扔两个蝙蝠，一个屎莱姆，那么蝙蝠出现的概率就是67%，屎莱姆
 * 粗线的概率是33% ，8个敌人，足够你调整概率了吧？
 * 我之所以这么萌的说话，其实是给歪果仁翻译时造成点困难，谁让我
 * 的英语这么差，看外站插件十分痛苦呢。
 * 当然估计人家不会用俺的东西。
 *  
 * 特别的，我还为Boss战预留了接口，如果你在敌群中以Boss命名，那么敌
 * 群的排列将按照你自行安排的顺序进行。 
 * 
 * 特别感谢MrLiu的位置插件，我稍作了一点修改，抄了一点你的插件。
 * 人家的劳动是伟大的，我不能昧良心。 
 * 
 * 另外在这里做一个广告，生活不易，请大家有空支持一下我的淘宝店
 * https://shop64938797.taobao.com 
 * 木有别的事情鸟 
 */
var Imported = Imported || {};
Imported._Dujian15_RandomEnemy = true;

var Dj = Dj || {};
Dj.Parameters = PluginManager.parameters('_Dujian15_RandomEnemy');
Dj.Param = Dj.Param || {};
Dj.Param.maxNumber = Number(Dj.Parameters['maxEnemyNumber']);
Dj.Param.x1 = Number(Dj.Parameters['Front Position X']);
Dj.Param.y1 = Number(Dj.Parameters['Front Position Y']);
Dj.Param.x2 = Number(Dj.Parameters['Front Instance X']);
Dj.Param.y2 = Number(Dj.Parameters['Front Instance Y']);
Dj.Param.num = Number(Dj.Parameters['Enemy Number']);
Dj.Param.sort = Number(Dj.Parameters['Sort Switch']);

var sortSwitch = Dj.Param.sort||12;
var maxEnemyNumber = Dj.Param.maxNumber||15;


(function() {
	
	Game_Enemy.prototype.screenX = function() {

		//alert($gameSwitches.value(sortSwitch));
		if (!$gameSwitches.value(sortSwitch)){
		return this.getScreenX_Dj(); //Dj.Param.x1 - this.index() * Dj.Param.x2;//this._screenX;
		}
		else {
			return this._screenX;
		}
	};
	
	Game_Enemy.prototype.screenY = function() {
		if (!$gameSwitches.value(sortSwitch)){
		return this.getScreenY_Dj();//Dj.Param.y1 + this.index() * Dj.Param.y2;//////this._screenY;
		}
		else {
			return this._screenY;
		}
	};

})();

//设置列数
//设置行数
//排列的位置为 中 上 下 上 下 这个方式。
//当第一排满了之后，再放第二排。
//敌人数量的标号为  this.index();

var enemyColNumber = Dj.Param.num;
//var enemyRowNumber = 3;


Game_Enemy.prototype.getScreenX_Dj = function() {
	//return Dj.Param.x1 - this.index() * Dj.Param.x2;//this._screenX;
	return Dj.Param.x1 + 200 - this.index() % enemyColNumber * Dj.Param.x2 - this.index() / enemyColNumber * 100;  //this.index()/enemyColNumber
	};

Game_Enemy.prototype.getScreenY_Dj = function() {
	//return Dj.Param.x1 - this.index() * Dj.Param.x2;//this._screenX;
	return Dj.Param.y1 + this.index() % enemyColNumber * Dj.Param.y2 //+ this.index() / enemyColNumber * 100;  //this.index()/enemyColNumber
	};





function Game_Troop() {
    this.initialize.apply(this, arguments);
}

Game_Troop.prototype = Object.create(Game_Unit.prototype);
Game_Troop.prototype.constructor = Game_Troop;

Game_Troop.LETTER_TABLE_HALF = [
    ' A',' B',' C',' D',' E',' F',' G',' H',' I',' J',' K',' L',' M',
    ' N',' O',' P',' Q',' R',' S',' T',' U',' V',' W',' X',' Y',' Z'
];
Game_Troop.LETTER_TABLE_FULL = [
    'Ａ','Ｂ','Ｃ','Ｄ','Ｅ','Ｆ','Ｇ','Ｈ','Ｉ','Ｊ','Ｋ','Ｌ','Ｍ',
    'Ｎ','Ｏ','Ｐ','Ｑ','Ｒ','Ｓ','Ｔ','Ｕ','Ｖ','Ｗ','Ｘ','Ｙ','Ｚ'
];

Game_Troop.prototype.initialize = function() {
    Game_Unit.prototype.initialize.call(this);
    this._interpreter = new Game_Interpreter();
    this.clear();
};

Game_Troop.prototype.isEventRunning = function() {
    return this._interpreter.isRunning();
};

Game_Troop.prototype.updateInterpreter = function() {
    this._interpreter.update();
};

Game_Troop.prototype.turnCount = function() {
    return this._turnCount;
};

Game_Troop.prototype.members = function() {
    return this._enemies;
};

Game_Troop.prototype.clear = function() {
    this._interpreter.clear();
    this._troopId = 0;
    this._eventFlags = {};
    this._enemies = [];
    this._turnCount = 0;
    this._namesCount = {};
};

Game_Troop.prototype.troop = function() {
    return $dataTroops[this._troopId];
};

Game_Troop.prototype.setup = function(troopId) {
    this.clear();
    this._troopId = troopId;
    this._enemies = [];
	//alert(this.troop().name);
	
	if (this.troop().name.match("Boss") != null) {
	    this.troop().members.forEach(function(member) {
        if ($dataEnemies[member.enemyId]) {
            var enemyId = member.enemyId;
            var x = member.x;
            var y = member.y;
            var enemy = new Game_Enemy(enemyId, x, y);
            if (member.hidden) {
                enemy.hide();
            }
            this._enemies.push(enemy);
        }
    }, this);
		

	}
	else if (this.troop().name.match("TroopNumber") != null) {
		var notetext = this.troop().name.split("|");
		var minNumber = Math.min(Number(notetext[1]),Number(notetext[2])) || 1;
		var maxNumber = Math.max(Number(notetext[1]),Number(notetext[2])) || 2;

		for(var i = 0; i < maxEnemyNumber ; i++){
		var enemyId = this.troop().members[Math.ceil(Math.random() * this.troop().members.length) - 1].enemyId;//member.enemyId;////
        var enemy = new Game_Enemy(enemyId, 0, 0);
		this._enemies.push(enemy);
	}
	
	    var enemyNumber = [];
		for (var j = 0; j < maxEnemyNumber ; j++){
			enemyNumber.push(j);
		}
	     var newEnemiesNumber = randomArray(enemyNumber,minNumber,maxNumber);

		 for(var k = 0;k < newEnemiesNumber.length;k++){
			 this._enemies[newEnemiesNumber[k]].hide();
		 }
		}
		
	
	// for(var i = 0; i < 15 ; i++){
		// var enemyId = this.troop().members[Math.ceil(Math.random() * this.troop().members.length) - 1].enemyId;//member.enemyId;////
        // var enemy = new Game_Enemy(enemyId, 0, 0);
		// this._enemies.push(enemy);
	// }
	
	    // var enemyNumber = [];
		// for (var j = 0; j < 15 ; j++){
			// enemyNumber.push(j);
		// }
	     // var newEnemiesNumber = randomArray(enemyNumber,minNumber,maxNumber);

		 // for(var k = 0;k < newEnemiesNumber.length;k++){
			 // this._enemies[newEnemiesNumber[k]].hide();
		 // }
		 
    this.makeUniqueNames();
};

//现在想要随机生成敌群
//首先确定该位置是否会有敌人
//再确定是哪个敌人

//或者

//先生成随机敌群
//然后随机隐藏敌人
//开始战斗
//Math.ceil(Math.random()*35)
//Math.ceil(Math.random()*this.troop().members.length)
//将随机敌人的id装入目标敌群的方法是，产生一个敌群种类大小的随机数，然后按照随机数找到对应的敌人，再把敌人装进敌人队伍。
//然后再生成一个区间随机数[a ,b]之间，敌群的大小就是 a,b之间
//判定新生成的数组的值是否与原敌群数组相等，如果相等，那么就把当前的enemy设置成隐藏。


function isAppend(){
	return  Math.random() >= 0.5? true:false;
	}
	
//=======================================================
//从随机数组中返回一列固定长度的短数组
//=======================================================
function randomArray(array , a , b){
		var resultArray = [];
		while (true){
		for(var count = 0; count< array.length; count++){
			if(isAppend()){
			resultArray[resultArray.length] = array[count];
			}
		}
		 if (resultArray.length < 15 - b || resultArray.length > 15 - a){ //敌群的最大值和最小值 TroopNumber|最小值|最大值
			resultArray = [];
		 }
		 else{
		     break;	
		 }
		}
		return resultArray;
}


Game_Troop.prototype.makeUniqueNames = function() {
    var table = this.letterTable();
    this.members().forEach(function(enemy) {
        if (enemy.isAlive() && enemy.isLetterEmpty()) {
            var name = enemy.originalName();
            var n = this._namesCount[name] || 0;
            enemy.setLetter(table[n % table.length]);
            this._namesCount[name] = n + 1;
        }
    }, this);
    this.members().forEach(function(enemy) {
        var name = enemy.originalName();
        if (this._namesCount[name] >= 2) {
            enemy.setPlural(true);
        }
    }, this);
};

Game_Troop.prototype.letterTable = function() {
    return $gameSystem.isCJK() ? Game_Troop.LETTER_TABLE_FULL :
            Game_Troop.LETTER_TABLE_HALF;
};

Game_Troop.prototype.enemyNames = function() {
    var names = [];
    this.members().forEach(function(enemy) {
        var name = enemy.originalName();
        if (enemy.isAlive() && !names.contains(name)) {
            names.push(name);
        }
    });
    return names;
};

Game_Troop.prototype.meetsConditions = function(page) {
    var c = page.conditions;
    if (!c.turnEnding && !c.turnValid && !c.enemyValid &&
            !c.actorValid && !c.switchValid) {
        return false;  // Conditions not set
    }
    if (c.turnEnding) {
        if (!BattleManager.isTurnEnd()) {
            return false;
        }
    }
    if (c.turnValid) {
        var n = this._turnCount;
        var a = c.turnA;
        var b = c.turnB;
        if ((b === 0 && n !== a)) {
            return false;
        }
        if ((b > 0 && (n < 1 || n < a || n % b !== a % b))) {
            return false;
        }
    }
    if (c.enemyValid) {
        var enemy = $gameTroop.members()[c.enemyIndex];
        if (!enemy || enemy.hpRate() * 100 > c.enemyHp) {
            return false;
        }
    }
    if (c.actorValid) {
        var actor = $gameActors.actor(c.actorId);
        if (!actor || actor.hpRate() * 100 > c.actorHp) {
            return false;
        }
    }
    if (c.switchValid) {
        if (!$gameSwitches.value(c.switchId)) {
            return false;
        }
    }
    return true;
};

Game_Troop.prototype.setupBattleEvent = function() {
    if (!this._interpreter.isRunning()) {
        if (this._interpreter.setupReservedCommonEvent()) {
            return;
        }
        var pages = this.troop().pages;
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (this.meetsConditions(page) && !this._eventFlags[i]) {
                this._interpreter.setup(page.list);
                if (page.span <= 1) {
                    this._eventFlags[i] = true;
                }
                break;
            }
        }
    }
};

Game_Troop.prototype.increaseTurn = function() {
    var pages = this.troop().pages;
    for (var i = 0; i < pages.length; i++) {
        var page = pages[i];
        if (page.span === 1) {
            this._eventFlags[i] = false;
        }
    }
    this._turnCount++;
};

Game_Troop.prototype.expTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.exp();
    }, 0);
};

Game_Troop.prototype.goldTotal = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r + enemy.gold();
    }, 0) * this.goldRate();
};

Game_Troop.prototype.goldRate = function() {
    return $gameParty.hasGoldDouble() ? 2 : 1;
};

Game_Troop.prototype.makeDropItems = function() {
    return this.deadMembers().reduce(function(r, enemy) {
        return r.concat(enemy.makeDropItems());
    }, []);
};
