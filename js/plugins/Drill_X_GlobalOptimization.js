//=============================================================================
// Drill_X_GlobalOptimization.js
//=============================================================================

/*:
 * @plugindesc [v1.0]        系统 - 全局存储性能优化[扩展]
 * @author Drill_up
 * 
 * @param 全局存储轮询时间
 * @type number
 * @min 5
 * @max 120
 * @desc 设置全局存储检查变量的间隔。
 * @default 10
 * 
 * 
 * @help  
 * =============================================================================
 * +++ Drill_GlobalOptimization +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看我的mog中文全翻译插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 该插件是对其它插件的扩展，可以单独使用，但没有意义。
 * 优化频繁改变全局变量而造成卡顿的情况，作用于所有含全局存储的插件。
 * ★★必须放在所有全局相关插件的后面，否则无效★★
 * 
 * -----------------------------------------------------------------------------
 * ----原理
 * 1.全局存储在你每次做改变全局变量时，都会保存一次。
 * 2.如果你使用了大量插件指令或者跨存档变量变换频率达到20次以上，
 * 慢的系统就会卡顿。
 * 3.该插件存储为延时存储，将短时间内变量多次变化统一，减少存储次数。
 * 4.该插件的位置非常关键，因无法并入到其它插件中，所以单独分离出来。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//插件记录：
//		【该插件将存储数据转为全局变量】
//
 
//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_X_GlobalOptimization = true;
　　var DrillUp = DrillUp || {}; 

    DrillUp.parameters = PluginManager.parameters('Drill_X_GlobalOptimization');
	DrillUp.optimization_save_time_delay = Number(DrillUp.parameters['全局存储轮询时间'] || 10);
	
	DrillUp.optimization_need_global_save = false;
	DrillUp.optimization_time_delay = 0;
	
//=============================================================================
// ** 全局存储
//=============================================================================
DataManager.forceSaveGlobalInfo = function() {	//覆写为打开存储开关	
	DrillUp.optimization_need_global_save = true;
};
DataManager.forceSaveGlobalInfo_delay = function() {	
	var globalInfo = this.loadGlobalInfo() || [];
	globalInfo[0] = this.makeSavefileInfo();
	this.saveGlobalInfo(globalInfo);
};

//=============================================================================
// ** 延迟触发
//=============================================================================
var _drill_GlobalOptimization_update = Game_Timer.prototype.update;
Game_Timer.prototype.update = function(sceneActive) {
    _drill_GlobalOptimization_update.call(this,sceneActive);
	DrillUp.optimization_time_delay += 1;
	
	if( DrillUp.optimization_time_delay > DrillUp.optimization_save_time_delay ){
		DrillUp.optimization_time_delay = 0;
		if( DrillUp.optimization_need_global_save ){
			DataManager.forceSaveGlobalInfo_delay();
			DrillUp.optimization_need_global_save = false;
		}
	}
};




