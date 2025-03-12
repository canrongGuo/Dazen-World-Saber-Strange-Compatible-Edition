//=============================================================================
// G_StateParam.js
//=============================================================================
/*:
 * @plugindesc 状态添加固定属性 Ver 5.0
 * @author Banner
 * 
 * @help
 * 举例
 * 在状态备注中添加
 * <G_ShuXing>（无视大小写）
 * mhp = +300（无视大小写，注意空格，每层hp上限加300）max hp，maxhp，hp均可
 * atk = +20（每层物理攻击加20）
 * all = -30（全属性减30）
 * </G_shuxing>（无视大小写）
 * 使状态增减对应属性。支持多层数状态
 *
 *2018.7.9
 *解决了与yep插件的冲突，并且兼容yep插件
 *2018.7.6
 *优化了代码，修复了会与事件完全回复冲突的bug
 *2018.7.2
 *优化了代码，支持大小写，支持减少属性
 *2018.6.28
 *修复了属性享受其他buff加成的bug 
 */
//---------------------
var G_Mod = G_Mod || {};
G_Mod.GSP = G_Mod.GSP || {};
//----------------------
G_Mod.GSP.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!G_Mod.GSP.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!G_Mod._loaded_G_Mod_GSP_ClassBaseParam) {
    this.processGSPNotetags1($dataStates);
    G_Mod._loaded_G_Mod_GSP_ClassBaseParam = true;
  }
  
  return true;
};
DataManager.processGSPNotetags1 = function(group) {
	for (var n = 1; n < group.length; n++) {
		var state = group[n];
		var statenote = state.note.split(/[\r\n]+/);
		state.G_ShuXing = [0, 0, 0, 0, 0, 0, 0, 0];
		var strbo = false;
		for (var i = 0; i < statenote.length; i++) {
			var statenoteline = statenote[i];
			if(statenoteline.match(/<G_ShuXing>/i)){
				strbo = true;
			}else if(statenoteline.match(/<\/G_ShuXing>/i)){
				strbo = false;
			}else if(strbo){
				if(statenoteline.match(/(.*)[ ]=[ ]([\+\-]\d+)/i)){
					var shuxing = String(RegExp.$1).toUpperCase().trim();
					var id = this.getShuXing(shuxing);
					if (id !==null && id !== 8){
						state.G_ShuXing[id] += parseInt(RegExp.$2);
					}else if(id == 8){
						for(var j = 0; j < id; j++){
							state.G_ShuXing[j] += parseInt(RegExp.$2);
						}
					}
				}
			}
		}
		
	}
	
}

DataManager.getShuXing = function(string) {
    if (['MHP',, 'MAXHP', 'MAX HP', 'HP'].contains(string)) {
      return 0;
    } else if (['MMP',, 'MAXMP', 'MAX MP', 'MP'].contains(string)) {
      return 1;
    } else if (['ATK', 'ATTACK'].contains(string)) {
      return 2;
    } else if (['DEF', 'DEFENSE'].contains(string)) {
      return 3;
    } else if (['MAT', 'MAGIC ATTACK', 'M.ATTACK', 'INT'].contains(string)) {
      return 4;
    } else if (['MDF', 'MAGIC DEFENSE', 'M.DEFENSE', 'RES'].contains(string)) {
      return 5;
    } else if (['AGI', 'AGILITY', 'SPD'].contains(string)) {
      return 6;
    } else if (['LUK', 'LUK'].contains(string)) {
      return 7;
    } else if (['ALL'].contains(string)) {
      return 8;
    } else {
      return null;
    }
};


Game_BattlerBase.prototype.paramState = function(paramId) {
	var value = 0;
	var ceng = 1;
	var states = this.states();
	for (var i = 0; i < states.length; i++) {
		var G_states = states[i];
		if(this._stateCounter[G_states.id]){
			ceng = this._stateCounter[G_states.id];
		}
		value += G_states.G_ShuXing[paramId] * ceng;	
	}
	return value;
};

if(Yanfly && Yanfly.BPC){
  Game_BattlerBase.prototype.param = function(paramId) {
	  this._baseParamCache = this._baseParamCache || [];
	  if (this._baseParamCache[paramId]) return this._baseParamCache[paramId];
	  var base = this.paramBase(paramId);
	  var plus = this.paramPlus(paramId);
	  var paramRate = this.paramRate(paramId);
	  var buffRate = this.paramBuffRate(paramId);
	  var flat = this.paramFlat(paramId);
	  plus += this.paramState(paramId);
	  var minValue = this.paramMin(paramId);
	  var maxValue = Math.max(minValue, this.paramMax(paramId));
	  var a = this;
	  var user = this;
	  var subject = this;
	  var b = this;
	  var target = this;
	  var s = $gameSwitches._data;
	  var v = $gameVariables._data;
	  var code = Yanfly.Param.BPCFormula[paramId];
	  try {
		var value = eval(code);
	  } catch (e) {
		var value = 0;
		Yanfly.Util.displayError(e, code, 'CUSTOM PARAM FORMULA ERROR');
	  }
	  value = Math.round(value.clamp(minValue, maxValue));
	  this._baseParamCache[paramId] = value;
	  return this._baseParamCache[paramId];
  };
}else{
	var G_StateParam_param = Game_BattlerBase.prototype.param;
	Game_BattlerBase.prototype.param = function(paramId) {
		G_StateParam_param.call(this,paramId);
		var value = this.paramBase(paramId) + this.paramPlus(paramId);
		value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
		value += this.paramState(paramId);
		var maxValue = this.paramMax(paramId);
		var minValue = this.paramMin(paramId);
		return Math.round(value.clamp(minValue, maxValue));
	};
}