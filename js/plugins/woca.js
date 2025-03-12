/*:
 * @plugindesc woca
 * @author: 野猪佩奇
 * 
 */
//var qiqihaha = qiqihaha || {}//这里

//这是改上阵队伍人数
Game_Party.prototype.maxBattleMembers = function() {
//for(var i=0;i<100;i++){//这里修改数据库敌人怪物坐标
//var cba=i+1;
//if($dataTroops[cba].members.length>0){
//$dataTroops[cba].members[0].x=640;
//$dataTroops[cba].members[0].y=420;
//}
//}
//这是修改数据库状态的属性	
//$dataStates[795].plusParams[2]=12;


 return 4;
};


//怪物随机被动状态
Game_Unit.prototype.onBattleStart = function() {
    Yanfly.BSC.Game_Unit_onBattleStart.call(this);
    var mb= $gameTroop._enemies[0];
    if(mb._enemyId==61){
    //mb.addState(343);
    //mb.addState(342);
    //mb.addState(318);
}
    this.processStateEval('battle');
};
//更改装备槽每行个数
Window_EquipSlot.prototype.maxCols = function() {
    return 1;
};
//更改装备菜单选项每行个数
Window_EquipCommand.prototype.maxCols = function() {
    return 2;
};
//更改装备菜单选项行数
Window_EquipCommand.prototype.numVisibleRows = function() {
    return 3;
};




//解决add元素的覆盖问题
BattleManager.actionAddElement = function(actionArgs) {
    if (!actionArgs) return;
    $gameTemp._addedElements = $gameTemp._addedElements || [];
    var array = $gameTemp._addedElements.concat([]);
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var ele = actionArgs[i].toUpperCase().trim();
      if (ele.match(/(\d+)/i)) {
        array.push(parseInt(RegExp.$1));
      } else if (Yanfly.ElementIdRef[ele]) {
        array.push(Yanfly.ElementIdRef[ele]);
      }
    }
    $gameTemp._addedElements = array;
    return true;
};

//这是屏蔽F5
/*(function() {
    var alias = SceneManager.onKeyDown;
    SceneManager.onKeyDown = function(event) {
        if (event.keyCode !== 116) alias.call(this, event);
    };
})();
*/

//数组打乱
function daluan(a) {
       var len = a.length;
       for(var i=0;i<len;i++){
           var end = len - 1 ;
           var index = (Math.random()*(end + 1)) >> 0;
           var t = a[end];
           a[end] = a[index];
           a[index] = t;
       }
       return a;
   };


   //获取当前某个窗口
   var _getWin = function(name){
  return SceneManager._scene._windowLayer.children.filter(function(win){return win.constructor.name==name});
};