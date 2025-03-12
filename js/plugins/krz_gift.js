var krz = krz || {}
krz._gtg = krz._gtg || {};
krz.Parameters = PluginManager.parameters('krz_gift');


////=============================================================================
 /*:
 * @plugindesc v0.005  登录奖励插件！
 * 适用于1.5.1以及以上。
 * 
 * @author KRZ
 *
 * @param ---General---
 * @default
 *
 *
 * @param window position
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 说明的窗口位置。
 * 0顶部 1中间 2底部
 * Default: 1
 * @default 1
 *
 * @param window back
 * @parent ---General---
 * @type number
 * @decimals 1
 * @desc 说明的窗口背景。
 * 0窗口 1暗淡 2透明
 * Default: 1
 * @default 1 
 *
 * 
 * @param gifts
 * @parent ---General---
 * @type note[]
 * @desc 按 编号//说明//物品//数量//(可选条件) 来写
 * @default []
 *
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * 每次登录都能获得礼包哟！
 * 
 * 按 编号//说明//物品//数量//(可选条件) 来写
 * 比如： 1//变态炎龙不得好死//$dataItems[1]//99
 * 则第一次进入存档后获得物品[1]99个，只出现一次。
 * 
 *
 * 比如： 1//变态炎龙不得好死//$dataItems[1]//1//$gameActors._data[1]._level <= 3
 * 则在每次进入存档，只要角色等级小于等于3自动获得 一个物品[1]
 *
 * 当然条件里如果设队伍拥有x物品，然后给x物品的话也没问题。
 *
 *
 * 5//给你这个死肥宅的新手福利//$dataItems[372]//1//$gameActors._data[1].level <= 50
 *
 *
 * 关于每日礼包的做法：
 *  1//每日礼包! 药水X1 //$dataItems[1]//1//$gameSystem._canhavegift != false
 *
 * $gameSystem._canhavegift 当他为true 时表明当前星期几改变了。
 *
 */
////=============================================================================

////=============================================================================
//// 
////=============================================================================
krz.Param = krz.Param || {};
krz.Param.gifts = eval(JSON.parse(krz.Parameters['gifts']));
krz.Param.giftwindowposition = parseInt(krz.Parameters['window position']);
krz.Param.giftwindowback = parseInt(krz.Parameters['window back']);
krz._gtg.gifts = krz._gtg.gifts || [];
for(var i = 0;i<krz.Param.gifts.length;i++){
	var list = krz.Param.gifts[i].split('//');
	var num = parseInt(list[0].split('"')[1]);
	var text = list[1];
	var item = list[2];
	var itemnum = parseInt(list[3].split('"')[0]);
if(list[4]){var switches = (list[4].split('"')[0]);}else{var switches = false;}
	if(num == undefined || !item) Yanfly.Util.displayError('你所设置的礼物有问题！');
	krz._gtg.gifts.push({'num':num,'text':text,'item':item,'itemnum':itemnum,'switches':switches});
}

krz._gtg.Scene_File_onLoadSuccess  = Scene_File.prototype.onLoadSuccess;
Scene_File.prototype.onLoadSuccess = function() {
krz._gtg.Scene_File_onLoadSuccess.call(this);
if(!krz._gtg.gifts) return;
$gameSystem._gift = $gameSystem._gift || [];
$gameSystem._givegift = true;
};

krz._gtg.Scene_Map_start = Scene_Map.prototype.start; 
Scene_Map.prototype.start = function() {
	krz._gtg.Scene_Map_start.call(this);
	
var d=new Date().getDay();
if($gameSystem._timeday != d){$gameSystem._canhavegift = true;}else{$gameSystem._canhavegift = false;}
$gameSystem._timeday = d;

	if($gameSystem._givegift){
		$gameSystem._givegift = false;
		for(var i = 0;i<krz._gtg.gifts.length;i++){
		var list = krz._gtg.gifts[i];
		var num = list.num || 1;
		var text = list.text || '';
		var item = eval(list.item);
		var itemnum = list.itemnum || 1;
		var switches = eval(list.switches) || false;
		if(!$gameSystem._gift[num] || switches){
		$gameMessage.setBackground(krz.Param.giftwindowback)
		$gameMessage.setPositionType(krz.Param.giftwindowposition)
		$gameMessage.add(text);
		if(item) $gameParty.gainItem(item, itemnum);
		$gameSystem._gift[num] = true;
		}
		$gameMap._interpreter.setWaitMode('message');
		}	
	}
};