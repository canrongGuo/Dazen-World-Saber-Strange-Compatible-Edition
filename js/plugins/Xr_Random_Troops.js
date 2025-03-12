//===============================================================================
 //===============================================================================
 /*:
 * @plugindesc  随机组合敌人队伍。
 *
 * @author 芯☆淡茹水
 * 
 * @help ____________________________________________________________________
 *1，该插件不提供插件命令。
 *
 *2，随机的设置：数据库 -> 敌群 ，敌群名字后面加上半角逗号（,），接着写上该敌群
 *                            可随机的最大敌人数量。
 *                            未写最大数量的敌群，默认为不随机（比如BOSS战）。
 *
 *3，敌人随机概要：随机 最大敌人数量 以内的数。敌群里添加的第一个敌人必然出现在
 *                            敌群里，但数量随机（方便明雷怪的设置）。往后添加
 *                            的怪会随机出现在敌群，数量也随机。
 *                            一个敌群想要出现什么样的怪，只需要在设置敌群时想出现
 *                            的怪每个添加一个进去即可，数量会随机（想要某个怪的
 *                            出现几率高一点，也可以多添加几个进去）。
 *                            设置敌群时，怪的位置也不需要拖到指定位置，脚本会随机
 *                            定位置。
 *                            
 * 
 *____________________________________________________________________
 * 
 *---------------------------------------------------------------
 * @param troopX
 * @desc 敌人队伍整体的画面X坐标。
 * @default 160
 *---------------------------------------------------------------
 * @param troopY
 * @desc 敌人队伍整体的画面Y坐标。
 * @default 220
 *---------------------------------------------------------------
 * @param distanceX
 * @desc 敌人之间的X方向间距。
 * @default 120
 *---------------------------------------------------------------
 * @param distanceY
 * @desc 敌人之间的Y方向间距。
 * @default 80
 *---------------------------------------------------------------
 * @param deviation
 * @desc 敌人从上往下排列时，左右的偏差值（正数：往右偏； 负数：往左偏； 0：垂直）。
 * @default -30
 */
 //========================================================================
(function() {
var XdrsRTroopsDate = XdrsRTroopsDate || {};
var xrpeprtr = PluginManager.parameters('Xr_Random_Troops');
XdrsRTroopsDate.troopX = parseInt(xrpeprtr['troopX']) || 160;
XdrsRTroopsDate.troopY = parseInt(xrpeprtr['troopY']) || 220;
XdrsRTroopsDate.distanceX = parseInt(xrpeprtr['distanceX']) || 120;
XdrsRTroopsDate.distanceY = parseInt(xrpeprtr['distanceY']) || 80;
XdrsRTroopsDate.deviation = parseInt(xrpeprtr['deviation']) || -30;
//========================================================================
Game_Troop.prototype.needRandom = function() {
    return (this.troop().name.split(",")[1] !== undefined);
};
Game_Troop.prototype.maxMember = function() {
    var num = parseInt(this.troop().name.split(",")[1]);
    return Math.max(Math.min(num, 8), 1);
};
Game_Troop.prototype.setEnemyPlace = function(index) {
    var x = XdrsRTroopsDate.troopX + index % 2 * XdrsRTroopsDate.distanceX;
    x += XdrsRTroopsDate.deviation * parseInt(index / 2);
    var y = XdrsRTroopsDate.troopY + parseInt(index / 2) * XdrsRTroopsDate.distanceY;
    return [x,y];
};
Game_Troop.prototype.randNum = function(min, max) { 
    var r1 = max - min, r2 = Math.random();   
    return (Math.round(r2 * r1) + min);   
};
Game_Troop.prototype.randomIndex = function() {
    var index = this.randNum(0,7);
    while (this._indexData.indexOf(index) >= 0) {
        index = this.randNum(0,7);
    }
    this._indexData.push(index);
    return index;
};
Game_Troop.prototype.randomTroop = function(troopId) {
    this.clear();
    this._troopId = troopId;
    this._enemies = [];
    this._indexData = [];
    var max = this.randNum(0, this.maxMember()-1)+1;
    while (max > 0) {
        var i = this._enemies.length === 0 ? 0 : this.randNum(0, $dataTroops[troopId].members.length-1);
        var member = $dataTroops[troopId].members[i];
        if ($dataEnemies[member.enemyId]) {
            var place = this.setEnemyPlace(this.randomIndex());
            var enemy = new Game_Enemy(member.enemyId, place[0], place[1]);
            if (member.hidden) enemy.hide();
            this._enemies.push(enemy);
        }
        max--;
    }
    this.makeUniqueNames();
};
var XdRs_Rt_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function(troopId) {
    this._troopId = troopId;
    if (!this.needRandom()){XdRs_Rt_setup.call(this,troopId); return;}
    this.randomTroop(troopId);
};    
})();
//===============================================================================