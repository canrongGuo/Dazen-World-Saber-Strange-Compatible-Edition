//=============================================================================
// krz_Stateparamcore.js
//=============================================================================
var Imported = Imported || {};
Imported.krz_StateparamCore = true;
//=============================================================================
/*:
 * @help  
 * =============================================================================
 * ++++++
根据yep的equipcore改的，所以用法和他一样
 states Notetags:
<stat: +x>
<stat: -x>
Allows the piece of weapon or armor to gain or lose x amount of stat. Replace 
“stat” with “hp”, “mp”, “atk”, “def”, “mat”, “mdf”, “agi”, or “luk” to alter 
that specific stat. This allows the piece of equipment to go past the editor’s
 default limitation so long as the maximum value allows for it. Changes made 
 here alter the base parameters.
允许武器装备或者或者失去某些值。你可以用血量、魔法值、攻击力、防御力、
魔法攻击力、魔法防御力、速度或者幸运值来代替。这将允许装备可以突破默认编辑器
的限制。

Lunatic Mode – Custom Parameters

<Custom Parameters>
code
code
code
code
</Code Parameters>
Example:

<Custom Parameters>
atk = $gameVariables.value(1);
mat = atk / 2;
all = $gameParty.members().length;
</Custom Parameters>
Allows for parameters to have custom rates adjusted by code. The following
parameters are defined: ‘maxhp’, ‘maxmp’, ‘atk’, ‘def’, ‘mat’, ‘mdf’, ‘agi’, 
‘luk’, and ‘all’. The ‘all’ parameter will affect all parameters. Changes made 
here do not alter the base parameters, but instead, are added onto the base 
parameters.


现在还能使用xparam和sparam(需要yep 的 xparam 和 sparam)
同时，(base + plus) * rate + flat 这个是yep 默认的 xparam 与 sparam 所以自己多注意下。

<custom xparamplus>

</custom xparamplus>
此处的plus指的是上述公式内的plus

<custom xparamflat>

</custom xparamflat>
此处的flat指的是上述公式内的flat

<custom sparamplus>

</custom sparamplus>
此处的plus指的是上述公式内的plus,我用的plus，因为我这yep公式里是 base*(1+plus)...这种，根据需求在自己选择

<custom sparamrate>

</custom sparamrate>
此处的plus指的是上述公式内的rate

<custom sparamflat>

</custom sparamflat>
此处的plus指的是上述公式内的flat

?你问我为啥没有sparamflat 还有 xparamrate这类的？因为我懒得。

如果需要增加指定数量的，可以用yep那两个插件内的函数。

xparam内有 hit eva cri cev mev mrf cnt hrg mrg trg
sparam内有 tgr grd rec pha mcr tcr pdr mdr fdr exr


正确使用模板：
<Custom Parameters>
all = 0;
atk = user.paramBase(3);
</Custom Parameters>

<custom xparamflat>
cnt = user.hpRate();
eva = user.agi / 1000;
</custom xparamflat>

<custom sparamplus>
rec = user.mpRate();
</custom sparamplus>

允许玩家自定义参数。
 *
 */
 
//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var krz = krz || {};
krz.state = krz.state || {};
krz.state.version = 0.11;

krz.state.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!krz.state.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!krz._loaded_krz_StateparamCore) {
DataManager.processstateparamsNotetags2 ($dataStates);
    krz._loaded_krz_StateparamCore = true;
  }
  return true;
};


DataManager.processstateparamsNotetags2 = function(group) {
  var note1 = /<(?:PARAMETER EVAL|custom parameter|custom parameters)>/i;
  var note2 = /<\/(?:PARAMETER EVAL|custom parameter|custom parameters)>/i;
  var note12 = /<(?:XPARAMPLUS EVAL|custom xparamplus|custom xparamplus)>/i;
  var note22 = /<\/(?:XPARAMPLUS EVAL|custom xparamplus|custom xparamplus)>/i;
  var note13 = /<(?:XPARAMFLAT EVAL|custom xparamflat|custom xparamflat)>/i;
  var note23 = /<\/(?:XPARAMFLAT EVAL|custom xparamflat|custom xparamflat)>/i;
  var note14 = /<(?:SPARAMPLUS EVAL|custom sparamplus|custom sparamplus)>/i;
  var note24 = /<\/(?:SPARAMPLUS EVAL|custom sparamplus|custom sparampus)>/i;
  var note15 = /<(?:SPARAMRATE EVAL|custom sparamrate|custom sparamrate)>/i;
  var note25 = /<\/(?:SPARAMRATE EVAL|custom sparamrate|custom sparamrate)>/i;
  var note16 = /<(?:SPARAMFLAT EVAL|custom sparamflat|custom sparamflat)>/i;
  var note26 = /<\/(?:SPARAMFLAT EVAL|custom sparamflat|custom sparamflat)>/i;
  var note3 = /<(.*):[ ]([\+\-]\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);
	obj.params = obj.params ||[0,0,0,0,0,0,0,0];
	obj.xparams = obj.xparams ||[0,0,0,0,0,0,0,0,0,0];
    obj.parameterEval = '';
	obj.xparameterEval = '';
	obj.xparameterflatEval = '';
	obj.sparamplusEval = '';
	obj.sparamrateEval = '';
	obj.sparamflatEval = '';
	obj.hasparams = false;
	obj.hasxparams = false;
	obj.hasxparamsflat = false;
	obj.hassparams = false;
	obj.hassparamsRate = false;
	obj.hassparamsFlat = false;
    var parameterEval = false;
	var xparameterEval = false;
	var xparameterFlatEval = false;
	var sparameterEval = false;
	var sparameterRateEval = false;
	var sparameterFlatEval = false;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
		obj.hasparams = true;
        parameterEval = true;
      } else if (line.match(note2)) {
        parameterEval = false;
      }else if (line.match(note12)) {
		obj.hasxparams = true;
        xparameterEval = true;
      } else if (line.match(note22)) {
        xparameterEval = false;
      } else if (line.match(note13)) {
		obj.hasxparamsflat = true;
        xparameterFlatEval = true;
      } else if (line.match(note23)) {
        xparameterFlatEval = false;
      }else if (line.match(note14)) {
		obj.hassparams = true;
        sparameterEval = true;
      } else if (line.match(note24)) {
        sparameterEval = false;
      }else if (line.match(note15)) {
		obj.hassparamsRate = true;
        sparameterRateEval = true;
      } else if (line.match(note25)) {
        sparameterRateEval = false;
      }else if (line.match(note16)) {
		obj.hassparamsFlat = true;
        sparameterFlatEval = true;
      } else if (line.match(note26)) {
        sparameterFlatEval = false;
      } else if (parameterEval) {
        obj.parameterEval = obj.parameterEval + line + '\n';
      } else if (xparameterEval) {
        obj.xparameterEval = obj.xparameterEval + line + '\n';
      } else if (xparameterFlatEval) {
        obj.xparameterflatEval = obj.xparameterflatEval + line + '\n';
      } else if (sparameterEval) {
        obj.sparamplusEval = obj.sparamplusEval + line + '\n';
      } else if (sparameterRateEval) {
        obj.sparamrateEval = obj.sparamrateEval + line + '\n';
      }else if (sparameterFlatEval) {
        obj.sparamflatEval = obj.sparamflatEval + line + '\n';
      }else if (line.match(note3)) {
        var stat = String(RegExp.$1).toUpperCase();
        var value = parseInt(RegExp.$2);
		obj.hasparams = true;
        switch (stat) {
          case 'HP':
          case 'MAXHP':
          case 'MAX HP':
            obj.params[0] = value;
            break;
          case 'MP':
          case 'MAXMP':
          case 'MAX MP':
          case 'SP':
          case 'MAXSP':
          case 'MAX SP':
            obj.params[1] = value;
            break;
          case 'ATK':
          case 'STR':
            obj.params[2] = value;
            break;
          case 'DEF':
            obj.params[3] = value;
            break;
          case 'MAT':
          case 'INT' || 'SPI':
            obj.params[4] = value;
            break;
          case 'MDF':
          case 'RES':
            obj.params[5] = value;
            break;
          case 'AGI':
          case 'SPD':
            obj.params[6] = value;
            break;
          case 'LUK':
            obj.params[7] = value;
            break;
/*           case 'HIT':
            obj.xparams[0] = value;
            break;
          case 'EVA':
            obj.xparams[1] = value;
            break;
          case 'CRI':
            obj.xparams[2] = value;
            break;
		  case 'CEV':
            obj.xparams[3] = value;
            break;	
		  case 'MEV':
            obj.xparams[4] = value;
            break;
		  case 'MRF':
            obj.xparams[5] = value;
            break;
		  case 'CNT':
            obj.xparams[6] = value;
            break;
		  case 'HRG':
            obj.xparams[7] = value;
            break;
		  case 'MRG':
            obj.xparams[8] = value;
            break;
		  case 'TRG':
            obj.xparams[9] = value;
            break;		 */	
          }
      }
    }
  }
};

krz.state.Game_Enemy_paramPlus = Game_Enemy.prototype.paramPlus;
Game_Enemy.prototype.paramPlus = function(paramId) {
    var value = krz.state.Game_Enemy_paramPlus.call(this, paramId);
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
      var item = states[i];
      if (!item) continue;
	if(item.hasparams){
	item.params = item.params || [0,0,0,0,0,0,0,0];
      value += item.params[paramId];
      value += this.evalParamPlus(item, paramId);
    }
	}
    return value;
};



krz.state.Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
Game_Actor.prototype.paramPlus = function(paramId) {
    var value = krz.state.Game_Actor_paramPlus.call(this, paramId);
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
      var item = states[i];
      if (!item) continue;
	if(item.hasparams){ 
	item.params = item.params || [0,0,0,0,0,0,0,0];
      value += item.params[paramId];
      value += this.evalParamPlus(item, paramId);
    }
	}
    return value;
};

krz.state.Game_BattlerBase_xparamPlus = Game_BattlerBase.prototype.xparamPlus;
Game_BattlerBase.prototype.xparamPlus = function(paramId) {
    var value = krz.state.Game_BattlerBase_xparamPlus.call(this, paramId);
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
      var item = states[i];
      if (!item) continue;
	if(item.hasxparams){ 
      value += this.evalxParamPlus(item, paramId);
    }
	}
    return value;
};
krz.state.Game_BattlerBase_xparamFlat = Game_BattlerBase.prototype.xparamFlat;
Game_BattlerBase.prototype.xparamFlat = function(paramId) {
    var value = krz.state.Game_BattlerBase_xparamFlat.call(this, paramId);
    var states = this.states();
    for (var i = 0; i < states.length; i++) {
      var item = states[i];
      if (!item) continue;
	if(item.hasxparamsflat){ 
      value += this.evalxParamFlat(item, paramId);
    }
	}
    return value;
};

krz.state.Game_Battler_sparamRate = Game_Battler.prototype.sparamRate;
Game_Battler.prototype.sparamRate = function(id) {
    var value = krz.state.Game_Battler_sparamRate.call(this, id);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.hassparamsRate) value *= this.evalsParamRate(obj, id);
    }
    return value;
};


krz.state.Game_Battler_sparamFlat = Game_Battler.prototype.sparamFlat;
Game_Battler.prototype.sparamFlat = function(id) {
    var value = krz.state.Game_Battler_sparamFlat.call(this, id);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.hassparamsFlat) value += this.evalsParamFlat(obj, id);
    }
    return value;
};


krz.state.Game_Battler_sparamPlus = Game_Battler.prototype.sparamPlus;
Game_Battler.prototype.sparamPlus = function(id) {
    var value = krz.state.Game_Battler_sparamPlus.call(this, id);
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.hassparams) value += this.evalsParamPlus(obj, id);
    }
    return value;
};



Game_Actor.prototype.evalParamPlus = function(item, paramId) {
    if (!item) return 0;
    if (!item.parameterEval || item.parameterEval === '') return 0;
    var value = 0;
    var hp = 0;
    var maxhp = 0;
    var mhp = 0;
    var mp = 0;
    var maxmp = 0;
    var mmp = 0;
    var sp = 0;
    var maxsp = 0;
    var msp = 0;
    var atk = 0;
    var str = 0;
    var def = 0;
    var mat = 0;
    var int = 0;
    var spi = 0;
    var mdf = 0;
    var res = 0;
    var agi = 0;
    var spd = 0;
    var luk = 0;
    var all = 0;
    var a = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.parameterEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM PARAMETER FORMULA ERROR');
    }
    switch (paramId) {
      case 0:
        value += hp + maxhp + mhp;
        break;
      case 1:
        value += mp + maxmp + mmp + sp + maxsp + msp;
        break;
      case 2:
        value += atk + str;
        break;
      case 3:
        value += def;
        break;
      case 4:
        value += mat + int + spi;
        break;
      case 5:
        value += mdf + res;
        break;
      case 6:
        value += agi + spd;
        break;
      case 7:
        value += luk;
        break;
    }
    return value + all;
};
Game_Enemy.prototype.evalParamPlus = function(item, paramId) {
    if (!item) return 0;
    if (!item.parameterEval || item.parameterEval === '') return 0;
    var value = 0;
    var hp = 0;
    var maxhp = 0;
    var mhp = 0;
    var mp = 0;
    var maxmp = 0;
    var mmp = 0;
    var sp = 0;
    var maxsp = 0;
    var msp = 0;
    var atk = 0;
    var str = 0;
    var def = 0;
    var mat = 0;
    var int = 0;
    var spi = 0;
    var mdf = 0;
    var res = 0;
    var agi = 0;
    var spd = 0;
    var luk = 0;
    var all = 0;
    var a = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.parameterEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM PARAMETER FORMULA ERROR');
    }
    switch (paramId) {
      case 0:
        value += hp + maxhp + mhp;
        break;
      case 1:
        value += mp + maxmp + mmp + sp + maxsp + msp;
        break;
      case 2:
        value += atk + str;
        break;
      case 3:
        value += def;
        break;
      case 4:
        value += mat + int + spi;
        break;
      case 5:
        value += mdf + res;
        break;
      case 6:
        value += agi + spd;
        break;
      case 7:
        value += luk;
        break;
    }
    return value + all;
};

Game_Battler.prototype.evalxParamPlus = function(item, paramId) {
    if (!item) return 0;
    if (!item.xparameterEval || item.xparameterEval === '') return 0;
    var value = 0;
    var all = 0;
	var hit = 0;
	var eva = 0;
	var cri = 0;
	var cev = 0;
	var mev = 0;
	var mrf = 0;
	var cnt = 0;
	var hrg = 0;
	var mrg = 0;
	var trg = 0;
    var a = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.xparameterEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM XPARAMETER FORMULA ERROR');
    }
    switch (paramId) {
		case 0:
            value += hit;
            break;
          case 1:
            value += eva;
            break;
          case 2:
            value += cri;
            break;
		  case 3:
            value += cev;
            break;	
		  case 4:
            value += mev;
            break;
		  case 5:
            value += mrf;
            break;
		  case 6:
            value += cnt;
            break;
		  case 7:
            value += hrg;
            break;
		  case 8:
            value += mrg;
            break;
		  case 9:
            value += hrg;
            break;
    }
    return value + all;
};
Game_Battler.prototype.evalxParamFlat = function(item, paramId) {
    if (!item) return 0;
    if (!item.xparameterflatEval || item.xparameterflatEval === '') return 0;
    var value = 0;
    var all = 0;
	var hit = 0;
	var eva = 0;
	var cri = 0;
	var cev = 0;
	var mev = 0;
	var mrf = 0;
	var cnt = 0;
	var hrg = 0;
	var mrg = 0;
	var trg = 0;
    var a = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.xparameterflatEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM XPARAMETER FORMULA ERROR');
    }
    switch (paramId) {
		case 0:
            value += hit;
            break;
          case 1:
            value += eva;
            break;
          case 2:
            value += cri;
            break;
		  case 3:
            value += cev;
            break;	
		  case 4:
            value += mev;
            break;
		  case 5:
            value += mrf;
            break;
		  case 6:
            value += cnt;
            break;
		  case 7:
            value += hrg;
            break;
		  case 8:
            value += mrg;
            break;
		  case 9:
            value += hrg;
            break;
    }
    return value + all;
};

Game_Battler.prototype.evalsParamPlus = function(item, paramId) {
    if (!item) return 0;
    if (!item.sparamplusEval || item.sparamplusEval === '') return 0;
    var value = 0;
    var all = 0;
	var tgr = 0;
	var grd = 0;
	var rec = 0;
	var pha = 0;
	var mcr = 0;
	var tcr = 0;
	var pdr = 0;
	var mdr = 0;
	var fdr = 0;
	var exr = 0;
    var a = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.sparamplusEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM SPARAMETER FORMULA ERROR');
    }
    switch (paramId) {
		case 0:
            value += tgr;
            break;
          case 1:
            value += grd;
            break;
          case 2:
            value += rec;
            break;
		  case 3:
            value += pha;
            break;	
		  case 4:
            value += mcr;
            break;
		  case 5:
            value += tcr;
            break;
		  case 6:
            value += pdr;
            break;
		  case 7:
            value += mdr;
            break;
		  case 8:
            value += fdr;
            break;
		  case 9:
            value += exr;
            break;
    }
    return value + all;
};


Game_Battler.prototype.evalsParamRate = function(item, paramId) {
    if (!item) return 0;
    if (!item.sparamrateEval || item.sparamrateEval === '') return 0;
    var value = 0;
    var all = 0;
	var tgr = 0;
	var grd = 0;
	var rec = 0;
	var pha = 0;
	var mcr = 0;
	var tcr = 0;
	var pdr = 0;
	var mdr = 0;
	var fdr = 0;
	var exr = 0;
    var a = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.sparamrateEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM SPARAMETER FORMULA ERROR');
    }
    switch (paramId) {
		case 0:
            value *= tgr;
            break;
          case 1:
            value *= grd;
            break;
          case 2:
            value *= rec;
            break;
		  case 3:
            value *= pha;
            break;	
		  case 4:
            value *= mcr;
            break;
		  case 5:
            value *= tcr;
            break;
		  case 6:
            value *= pdr;
            break;
		  case 7:
            value *= mdr;
            break;
		  case 8:
            value *= fdr;
            break;
		  case 9:
            value *= exr;
            break;
    }
    return value * all;
};



Game_Battler.prototype.evalsParamFlat = function(item, paramId) {
    if (!item) return 0;
    if (!item.sparamflatEval || item.sparamflatEval === '') return 0;
    var value = 0;
    var all = 0;
	var tgr = 0;
	var grd = 0;
	var rec = 0;
	var pha = 0;
	var mcr = 0;
	var tcr = 0;
	var pdr = 0;
	var mdr = 0;
	var fdr = 0;
	var exr = 0;
    var a = this;
    var user = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.sparamflatEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CUSTOM SPARAMETER FORMULA ERROR');
    }
    switch (paramId) {
		case 0:
            value += tgr;
            break;
          case 1:
            value += grd;
            break;
          case 2:
            value += rec;
            break;
		  case 3:
            value += pha;
            break;	
		  case 4:
            value += mcr;
            break;
		  case 5:
            value += tcr;
            break;
		  case 6:
            value += pdr;
            break;
		  case 7:
            value += mdr;
            break;
		  case 8:
            value += fdr;
            break;
		  case 9:
            value += exr;
            break;
    }
    return value + all;
};