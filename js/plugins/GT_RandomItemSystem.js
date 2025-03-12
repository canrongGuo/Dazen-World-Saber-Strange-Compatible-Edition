//=============================================================================
// GT50 Plugins - RandomItemSystem
// GT_RandomItemSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_RandomItemSystem = true;

var GT = GT || {};
GT.RIS = GT.RIS || {};
GT.RIS.version = 1.0;

//=============================================================================
/*:
 * @plugindesc [v1.0]        物品 - 随机物品系统
 * @author ganfly
 *
 * @help
 * ============================================================================
 *  介绍
 * ============================================================================
 *
 * 随机物品系统，可以使得获得武器/防具时带有随机的属性
 * 目前包括以下效果:
 *
 * 随机基础参数
 * 随机物品特性
 * 随机镶嵌槽(需要YEP_X_AttachAugments)。
 *
 * 本插件必须基于YEP_ItemCore才能运行。
 * 请将本插件置于YEP_ItemCore下方，其他插件兼容性参见‘兼容性’部分。
 * 
 * ============================================================================
 *  备注
 * ============================================================================
 *
 * ----武器/防具备注
 *
 *     <Random Item Param>
 *       random param
 *       random param
 *     </Random Item Param> 
 *
 *     这可以设置该武器/防具附加的随机属性，每行填一种
 *     随机属性。具体的随机属性写法参照下面的随机属性列表
 *     
 *     例如
 *
 *     <Random Item Param>
 *      Random ATK: 5 10
 *      Random DEF: -10 20
 *     </Random Item Param>
 *     
 * ============================================================================
 *  随机属性列表
 * ============================================================================
 * 
 * 以下是你可以在<Random Item Param>下填的随机属性备注的列表   
 *      
 * ----随机属性----
 *    
 *     Random Stat Stat Stat: min max   
 * 
 *     - 将Stat替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     将会从所有Stat中随机选择一个
 *     这将会设置该武器/防具的随机基础属性数值
 *     min和max 替换为数值，表示随机的范围，必须满足min <= max
 *     min和max可以为负数。
 *     例如 Random MMP MHP: 6 12 
 * ----
 *
 *     Random Stat Stat Stat: min% max%
 *     
 *     - 将Stat替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG,
 *     TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR
 *     将会从所有Stat中随机选择一个
 *     这将会按百分比设置该武器/防具的随机基础属性/额外属性/特殊属性
 *     min和max 替换为数值，表示随机的范围，必须满足min <= max
 *     min和max可以为负数。
 *     例如 Random MMP MHP: 6% 12% 
 *     !!注意：对于基础属性，5%代表*105%，-5%代表*95%
 *             对于额外属性，5%代表+5%，-5%代表-5%
 *             对于特殊属性，5%代表*105%，-5%代表*95%
 * ----
 *
 *     Random Attack Element: x x x    
 * 
 *     - 这将会设置该武器/防具的随机攻击属性
 *     x替换为元素属性id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     例如 Random Attack Element: 1 3-5 
 * ----
 *
 *     Random Attack State: x x x
 *     Random Attack State: x x x, y%
 *     Random Attack State: x x x, min% max%
 *
 *     - 这将会设置该武器/防具的随机攻击附加状态
 *     x替换为状态id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     y替换为数值，表示附加状态的概率，
 *     min和max 替换为数值，表示附加状态的概率的随机范围，
 *     必须满足min <= max
 *     例如 Random Attack State: 6 12-20 5 
 * ----
 *
 *     Random Debuff Rate: stat stat stat, y%
 *     Random Debuff Rate: stat stat stat, min% max%
 *
 *     - 这将会设置该武器/防具的随机Debuff有效度
 *     将stat替换为 MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *     将会从所有stat中随机选择一个
 *     y替换为数值，表示Debuff有效度，
 *     min和max 替换为数值，表示Debuff有效度的随机范围，
 *     必须满足min <= max
 *     例如 Random Debuff Rate: MMP MHP, 20% 50%
 * ----
 *
 *     Random Element Rate: x x x, y%
 *     Random Element Rate: x x x, min% max%
 *
 *     - 这将会设置该武器/防具的随机属性有效度
 *     x替换为元素属性id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     y替换为数值，表示属性有效度，
 *     min和max 替换为数值，表示属性有效度的随机范围，
 *     必须满足min <= max
 *     例如 Random Element Rate: 5 1-3, 66%
 * ----
 *     
 *     Random Skill: x x x
 *
 *     - 这将会设置该武器/防具的附带的随机技能
 *     x 替换为技能的id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     例如 Random Skill: 5 7-9 22
 * ----
 * 
 *     Random Skill Type: x x x
 *
 *     - 这将会设置该武器/防具的附带的随机技能类型
 *     x 替换为技能类型的id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     例如 Random Skill Type: 5 7-9 22 
 * ----
 *
 *     Random State Rate: x x x, y%
 *     Random State Rate: x x x, min% max%
 *
 *     - 这将会设置该武器/防具的随机状态有效度
 *     x替换为状态id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     y替换为数值，表示状态有效度，
 *     min和max 替换为数值，表示状态有效度的随机范围，
 *     必须满足min <= max
 *     例如 Random State Rate: 1-5, 15% 80%
 * ----
 *     
 *     Random State Resist: x x x
 *
 *     - 这将会设置该武器/防具的随机状态免疫
 *     x替换为状态id或者id范围，其中范围用a-b表示，
 *     将会从所有列出的id中随机选择一个
 *     如果随机到的id为0，则不附加这项属性
 *     例如 Random State Resist: 5 8 12
 * ----
 *
 *     Random Augment Slot: x x x
 *     Random Augment Slot: x x x, y
 *     Random Augment Slot: x x x, min max
 *
 *     - 这条备注需要YEP_X_AttachAugments的支持
 *     这将会设置该武器/防具的随机镶嵌槽，x替换为镶嵌槽类型。
 *     y替换为数值，表示镶嵌槽数量，
 *     min和max 替换为数值，表示镶嵌槽数量的随机范围，
 *     必须满足min <= max
 *     将会从所有列出的镶嵌槽类型中随机选择相应数量的镶嵌槽
 *     如果随机到的数量为0，则不附加这项属性
 *     例如 Random Augment Slot: Orb, 1 3
 *          意思是增加1-3个类型为Orb的镶嵌槽
 *
 * ============================================================================
 *  兼容性
 * ============================================================================
 * 
 * 目前已经兼容绝大多数YEP插件
 *            
 * ============================================================================
 *  用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 *  更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 *
 * ============================================================================
 *  帮助结束
 * ============================================================================
 *
 *
 * @param ParamPriceAdd
 * @text 每一点参数的价格附加
 * @type number
 * @desc 当物品具有随机属性时，每一点参数会将对应的价格加上。
 * @default 10
 *
 * @param AttackElementPriceAdd
 * @text 攻击属性的价格附加
 * @type number
 * @desc 当物品具有随机攻击属性时，会将对应的价格加上。
 * @default 50
 *
 * @param AttackStatePriceAdd
 * @text 攻击附加状态的价格附加
 * @type number
 * @desc 当物品具有随机攻击附加状态时，会将对应的价格加上。
 * @default 50
 *
 * @param DebuffRatePriceAdd
 * @text Debuff有效度的价格附加
 * @type number
 * @desc 当物品具有随机debuff有效度时，会将对应的价格加上。
 * @default 50
 *
 * @param ElementRatePriceAdd
 * @text 属性有效度的价格附加
 * @type number
 * @desc 当物品具有随机属性有效度时，会将对应的价格加上。
 * @default 50
 *
 * @param SkillPriceAdd
 * @text 附加技能的价格附加
 * @type number
 * @desc 当物品具有随机附加技能时，会将对应的价格加上。
 * @default 50
 *
 * @param StypePriceAdd
 * @text 附加技能类型的价格附加
 * @type number
 * @desc 当物品具有随机附加技能类型时，会将对应的价格加上。
 * @default 50
 *
 * @param StateRatePriceAdd
 * @text 状态有效度的价格附加
 * @type number
 * @desc 当物品具有随机状态有效度时，会将对应的价格加上。
 * @default 50
 *
 * @param StateResistPriceAdd
 * @text 状态免疫的价格附加
 * @type number
 * @desc 当物品具有随机状态免疫时，会将对应的价格加上。
 * @default 50
 *
 * @param AugmentSlotPriceAdd
 * @text 镶嵌槽的价格附加
 * @type number
 * @desc 当物品具有一个随机镶嵌槽时，会将对应的价格加上。
 * @default 50
 *
 * @param BoostPointAdd
 * @text 随机属性的Boost点数附加
 * @type number
 * @desc 当物品具有一项随机属性时，会将对应的Boost点数加上。
 * @default 0
 *
 */
//=============================================================================

if (Imported.YEP_ItemCore) {
	
//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_RandomItemSystem');
GT.Param = GT.Param || {};

GT.Param.RISParamPriceAdd = Number(GT.Parameters['ParamPriceAdd']);
GT.Param.RISAttackElementPriceAdd = Number(GT.Parameters['AttackElementPriceAdd']);
GT.Param.RISAttackStatePriceAdd = Number(GT.Parameters['AttackStatePriceAdd']);
GT.Param.RISDebuffRatePriceAdd = Number(GT.Parameters['DebuffRatePriceAdd']);
GT.Param.RISElementRatePriceAdd = Number(GT.Parameters['ElementRatePriceAdd']);
GT.Param.RISSkillPriceAdd = Number(GT.Parameters['SkillPriceAdd']);
GT.Param.RISStypePriceAdd = Number(GT.Parameters['StypePriceAdd']);
GT.Param.RISStateRatePriceAdd = Number(GT.Parameters['StateRatePriceAdd']);
GT.Param.RISStateResistPriceAdd = Number(GT.Parameters['StateResistPriceAdd']);
GT.Param.RISAugmentSlotPriceAdd = Number(GT.Parameters['AugmentSlotPriceAdd']);
GT.Param.RISBoostPointAdd = Number(GT.Parameters['BoostPointAdd']);

//=============================================================================
// DataManager
//=============================================================================

GT.RIS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
	if (!GT.RIS.DataManager_isDatabaseLoaded.call(this))
		return false;
	if (!GT._loaded_GT_RIS) {
		this.processRISystemNotetags($dataWeapons);
		this.processRISystemNotetags($dataArmors);
		GT._loaded_GT_RIS = true;
	}
	return true;
};

DataManager.processRISystemNotetags = function (group) {
	for (var i = 1; i < group.length; i++) {
		var obj = group[i];
		this.setupRISystemNotetags(obj);
	}
};

DataManager.setupRISystemNotetags = function (obj) {
	var note1 = /<(?:RANDOM ITEM PARAM)>/i;
	var note2 = /<\/(?:RANDOM ITEM PARAM)>/i;
	
	var notedata = obj.note.split(/[\r\n]+/);
	obj.randomParamList = [];
	var evalMode = 'none';

	for (var i = 0; i < notedata.length; i++) {
		var line = notedata[i];
		
		if (line.match(note1)) {
			evalMode = 'randomParam';
		} 
		else if (line.match(note2)) {
			evalMode = 'none';
		} 
		else if (evalMode === 'randomParam') {
			obj.randomParamList.push(line);
		}
	}
};

//=============================================================================
// ItemManager
//=============================================================================

GT.RIS.ItemManager_customizeNewIndependentItem = ItemManager.customizeNewIndependentItem;
ItemManager.customizeNewIndependentItem = function(baseItem, newItem) {
    GT.RIS.ItemManager_customizeNewIndependentItem.call(this, baseItem, newItem);
	this.processRandomItemParamList(baseItem, newItem);
};

ItemManager.processRandomItemParamList = function (baseItem, newItem) {
	if (!newItem.randomParamList || !newItem.randomParamList.length) return;
	if ($gameTemp.varianceStock()) return;
	newItem.paramsList = [];
	newItem.paramsListV = [];
	var list = newItem.randomParamList;
	for (var i = 0; i < list.length; ++i) {
		var line = list[i];
		this.processRandomItemParam(line, baseItem, newItem);
	}
	this.updateItemName(newItem);
};

ItemManager.processRandomItemParam = function (line, baseItem, newItem) {
	var lineSplit = line.split(':');
	// RANDOM ATTACK ELEMENT: x x x
	if (lineSplit[0].trim().match(/RANDOM ATTACK ELEMENT/i)) {
		var elementList = this.getNumberList(lineSplit[1]);
		return this.applyRandomAttackElement(newItem, elementList);
	} 
	// RANDOM ATTACK STATE: x x x
	if (lineSplit[0].trim().match(/RANDOM ATTACK STATE/i)) {
		var text = lineSplit[1].toUpperCase().trim();
		return this.applyRandomAttackState(newItem, text);
	}
	// RANDOM DEBUFF RATE: x x x
	if (lineSplit[0].trim().match(/RANDOM DEBUFF RATE/i)) {
		var text = lineSplit[1].toUpperCase().trim();
		return this.applyRandomDebuffRate(newItem, text);
	}
	// RANDOM ELEMENT RATE: x x x
	if (lineSplit[0].trim().match(/RANDOM ELEMENT RATE/i)) {
		var text = lineSplit[1].toUpperCase().trim();
		return this.applyRandomElementRate(newItem, text);
	} 
    // RANDOM SKILL: x x x
    if (lineSplit[0].trim().match(/RANDOM SKILL/i)) {
		var skillList = this.getNumberList(lineSplit[1]);
		return this.applyRandomSkill(newItem, skillList);
	}
	// RANDOM SKILL TYPE: x x x
	if (lineSplit[0].trim().match(/RANDOM SKILL TYPE/i)) {
		var stypeList = this.getNumberList(lineSplit[1]);
		return this.applyRandomSkillType(newItem, stypeList);
	} 
	// RANDOM STATE RATE: x x x
	if (lineSplit[0].trim().match(/RANDOM STATE RATE/i)) {
		var text = lineSplit[1].toUpperCase().trim();
		return this.applyRandomStateRate(newItem, text);
	} 
	// RANDOM STATE RESIST: x x x
	if (lineSplit[0].trim().match(/RANDOM STATE RESIST/i)) {
		var stateList = this.getNumberList(lineSplit[1]);
		return this.applyRandomStateResist(newItem, stateList);
	}
	// RANDOM AUGMENT SLOT: x x x
	if (Imported.YEP_X_AttachAugments) {
		if (lineSplit[0].trim().match(/RANDOM AUGMENT SLOT/i)) {
			var text = lineSplit[1].toUpperCase().trim();
			return this.applyRandomAugmentSlot(newItem, text);
		}
	}
	// STAT: MIN MAX
	if (line.match(/RANDOM[ ](.*):[ ]([\-]?\d+)[ ]([\-]?\d+)/i)) {
		var min = parseInt(RegExp.$2) || 0;
		// var max = parseInt(RegExp.$3) || 0;   //这是原版
	    var max = $gameVariables.value(1) || 0;   //这是改版
		var paramList = String(RegExp.$1).toUpperCase().trim().split(/\s+/i);
		return this.applyRandomParamPlus(newItem, paramList, min, max);
	}
	// STAT: MIN% MAX%
	if (line.match(/RANDOM[ ](.*):[ ]([\-]?\d+)[%％][ ]([\-]?\d+)[%％]/i)) {
		var min = parseFloat(RegExp.$2) || 0;
		var max = parseFloat(RegExp.$3) || 0;
		var paramList = String(RegExp.$1).toUpperCase().trim().split(/\s+/i);
		return this.applyRandomParamRate(newItem, paramList, min, max);
	}
};

ItemManager.addRandomTraitToItem = function(newItem, code, dataId, value) {
    var trait = {
      code: code,
      dataId: dataId,
      value: value
    }
    newItem.traits.push(trait);
};

ItemManager.interpretParamNote = function (string) {
	var paramList = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];
	var xParamList = ['HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT', 'HRG', 'MRG', 'TRG'];
	var sParamList = ['TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR', 'MDR', 'FDR', 'EXR'];
	if (paramList.indexOf(string) >= 0 && paramList.indexOf(string) < 8)
		return [paramList.indexOf(string), 'TRAIT_PARAM'];
	if (xParamList.indexOf(string) >= 0 && xParamList.indexOf(string) < 10)
		return [xParamList.indexOf(string), 'TRAIT_XPARAM'];
	if (sParamList.indexOf(string) >= 0 && sParamList.indexOf(string) < 10)
		return [sParamList.indexOf(string), 'TRAIT_SPARAM'];
	return [null, null];
};

GT.RIS.ItemManager_randomizeInitialStats = ItemManager.randomizeInitialStats;
ItemManager.randomizeInitialStats = function(baseItem, newItem) {
	GT.RIS.ItemManager_randomizeInitialStats.call(this, baseItem, newItem);
	for (var i = 0; i < 8; ++i) {
		var value = newItem.params[i] - baseItem.params[i];
		newItem.price += value * GT.Param.RISParamPriceAdd;
	}
};

ItemManager.applyRandomParamPlus = function (newItem, paramList, min, max) {
	var param = this.getRandomIdInList(paramList);
	var paramId = this.interpretParamNote(param)[0];
	if (paramId === null) return;
	
	if (paramId==3 || paramId==0){
	var randomValue = Math.floor((Math.random() * (max*$gameVariables.value(2) - max*0.5*(1+$gameVariables.value(39)*0.1)*$gameVariables.value(2) + 1)) + max*0.5*(1+$gameVariables.value(39)*0.1)*$gameVariables.value(2));
	} else {
	var randomValue = Math.floor((Math.random() * (max - max*0.5*(1+$gameVariables.value(39)*0.1) + 1)) + max*0.5*(1+$gameVariables.value(39)*0.1));
	}
	
	newItem.paramsList.push(paramId);//这里
	newItem.paramsListV.push(randomValue);//这里
	newItem.params[paramId] += randomValue;
	//newItem.price += randomValue * GT.Param.RISParamPriceAdd;
	
		if (paramId==3 || paramId==0){
	newItem.price += Math.floor(randomValue /$gameVariables.value(2)* GT.Param.RISParamPriceAdd);
	} else {
	newItem.price += randomValue * GT.Param.RISParamPriceAdd;
	}
	
	var boost = GT.Param.RISBoostPointAdd * (randomValue > 0 ? 1 : -1);
	newItem.boostCount += boost;
};

ItemManager.applyRandomParamRate = function(newItem, paramList, min, max) {
	var param = this.getRandomIdInList(paramList);
	var paramId = this.interpretParamNote(param)[0];
	if (paramId === null) return;
	var paramType = this.interpretParamNote(param)[1];
	var code = Game_BattlerBase[paramType];
	var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);
	var rate = parseFloat(randomValue * 0.01) + 1;
	var value = 0;
	if (paramType === 'TRAIT_PARAM') {
		value = Math.floor(newItem.params[paramId] * (rate - 1));
	}
	else if (paramType === 'TRAIT_XPARAM') {
		value = randomValue;
		rate -= 1;
	}
	newItem.price += value * GT.Param.RISParamPriceAdd;
	var boost = GT.Param.RISBoostPointAdd * (randomValue > 0 ? 1 : -1);
	newItem.boostCount += boost;
	this.addRandomTraitToItem(newItem, code, paramId, rate);
};

ItemManager.applyRandomAttackElement = function(newItem, elementList) {
	if (!elementList || !elementList.length) return;
    var id = this.getRandomIdInList(elementList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_ATTACK_ELEMENT;
	newItem.price += GT.Param.RISAttackElementPriceAdd;
	newItem.boostCount += GT.Param.RISBoostPointAdd;
    this.addRandomTraitToItem(newItem, code, id, 0);
};

ItemManager.applyRandomAttackState = function(newItem, text) {
	if (text.contains(',')) {
		var textSplit = text.split(',');
		if (textSplit[1].trim().match(/(\d+)[%％][ ](\d+)[%％]/i)) {
			var min = parseFloat(RegExp.$1);
			var max = parseFloat(RegExp.$2);
			var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);
			var rate = parseFloat(randomValue * 0.01);
		}
		else if (textSplit[1].trim().match(/(\d+)[%％]/i)) {
			var rate = parseFloat(RegExp.$1 * 0.01);
		}
		var stateList = this.getNumberList(textSplit[0]);
    }
	else {
		var stateList = this.getNumberList(text);
		var rate = 1.0;
    }
	var id = this.getRandomIdInList(stateList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_ATTACK_STATE;
	newItem.price += GT.Param.RISAttackStatePriceAdd;
	newItem.boostCount += GT.Param.RISBoostPointAdd;
    this.addRandomTraitToItem(newItem, code, id, rate);
};

ItemManager.applyRandomDebuffRate = function(newItem, text) {
	var textSplit = text.split(',');
    if (textSplit[1].trim().match(/(\d+)[%％][ ](\d+)[%％]/i)) {
		var min = parseFloat(RegExp.$1);
        var max = parseFloat(RegExp.$2);
        var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);		
		var rate = parseFloat(randomValue * 0.01);
    }
    else if (textSplit[1].trim().match(/(\d+)[%％]/i)) {
		var rate = parseFloat(RegExp.$1 * 0.01);
	}
	var paramList = textSplit[0].trim().split(/\s+/i);
	var param = this.getRandomIdInList(paramList);
	var paramId = this.interpretParamNote(param)[0];
	if (paramId === null) return;
    var code = Game_BattlerBase.TRAIT_DEBUFF_RATE;
	newItem.price += GT.Param.RISDebuffRatePriceAdd * (rate > 1 ? -1 : 1);
	var boost = GT.Param.RISBoostPointAdd * (rate > 1 ? -1 : 1);
	newItem.boostCount += boost;
	this.addRandomTraitToItem(newItem, code, paramId, rate);	
};

ItemManager.applyRandomElementRate = function(newItem, text) {
	var textSplit = text.split(',');
    if (textSplit[1].trim().match(/(\d+)[%％][ ](\d+)[%％]/i)) {
		var min = parseFloat(RegExp.$1);
        var max = parseFloat(RegExp.$2);
        var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);		
		var rate = parseFloat(randomValue * 0.01);
    }
	else if (textSplit[1].trim().match(/(\d+)[%％]/i)) {
		var rate = parseFloat(RegExp.$1 * 0.01);
	}
	var elementList = this.getNumberList(textSplit[0]);
	var id = this.getRandomIdInList(elementList);
	if (!id) return;
	var code = Game_BattlerBase.TRAIT_ELEMENT_RATE;
	newItem.price += GT.Param.RISElementRatePriceAdd * (rate > 1 ? -1 : 1);
	var boost = GT.Param.RISBoostPointAdd * (rate > 1 ? -1 : 1);
	newItem.boostCount += boost;
	this.addRandomTraitToItem(newItem, code, id, rate);
};

ItemManager.applyRandomSkill = function(newItem, skillList) {
	if (!skillList || !skillList.length) return;
	var id = this.getRandomIdInList(skillList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_SKILL_ADD;
	newItem.price += GT.Param.RISSkillPriceAdd;
	newItem.boostCount += GT.Param.RISBoostPointAdd;
    this.addRandomTraitToItem(newItem, code, id, 1);
};

ItemManager.applyRandomSkillType = function(newItem, stypeList) {
	if (!stypeList || !stypeList.length) return;
	var id = this.getRandomIdInList(stypeList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_STYPE_ADD;
	newItem.price += GT.Param.RISStypePriceAdd;
	newItem.boostCount += GT.Param.RISBoostPointAdd;
    this.addRandomTraitToItem(newItem, code, id, 1);
};

ItemManager.applyRandomStateRate = function(newItem, text) {
	var textSplit = text.split(',');
    if (textSplit[1].trim().match(/(\d+)[%％][ ](\d+)[%％]/i)) {
		var min = parseFloat(RegExp.$1);
        var max = parseFloat(RegExp.$2);
        var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);		
		var rate = parseFloat(randomValue * 0.01);
    }
	else if (textSplit[1].trim().match(/(\d+)[%％]/i)) {
		var rate = parseFloat(RegExp.$1 * 0.01);
	}
	var stateList = this.getNumberList(textSplit[0]);
	var id = this.getRandomIdInList(stateList);
	if (!id) return;
	var code = Game_BattlerBase.TRAIT_STATE_RATE;
	newItem.price += GT.Param.RISStateRatePriceAdd * (rate > 1 ? -1 : 1);
	var boost = GT.Param.RISBoostPointAdd * (rate > 1 ? -1 : 1);
	newItem.boostCount += boost;
	this.addRandomTraitToItem(newItem, code, id, rate);
};

ItemManager.applyRandomStateResist = function(newItem, stateList) {
    if (!stateList || !stateList.length) return;
	var id = this.getRandomIdInList(stateList);
	if (!id) return;
    var code = Game_BattlerBase.TRAIT_STATE_RESIST;
	newItem.price += GT.Param.RISStateResistPriceAdd;
	newItem.boostCount += GT.Param.RISBoostPointAdd;
    this.addRandomTraitToItem(newItem, code, id, 1);
};

ItemManager.applyRandomAugmentSlot = function(newItem, text) {
	if (text.contains(',')) {
		var textSplit = text.split(',');
		if (textSplit[1].trim().match(/(\d+)[ ](\d+)/i)) {
			var min = parseInt(RegExp.$1);
			var max = parseInt(RegExp.$2);
			var randomValue = Math.floor((Math.random() * (max - min + 1)) + min);
		}
		else if (textSplit[1].trim().match(/(\d+)/i)) {
			var randomValue = parseInt(RegExp.$1);
		}
		var slotList = textSplit[0].trim().split(/\s+/i);
		
    }
	else {
		var randomValue = 1;
		var slotList = text.trim().split(/\s+/i);
    }
	if (!randomValue) return;
	var slotAdd = [];
	for (var i = 0; i < randomValue; i++) {
		var slot = this.getRandomIdInList(slotList);
		if (!slot) continue;
		slotAdd.push(slot);
	}		
	newItem.augmentSlots = newItem.augmentSlots.concat(slotAdd);
	newItem.price += GT.Param.RISAugmentSlotPriceAdd;
	newItem.boostCount += GT.Param.RISBoostPointAdd * randomValue;
};

ItemManager.getRandomIdInList = function (array) {
	var diceRoll = Math.floor(Math.random() * array.length);
	var selected = array[diceRoll];
	return selected;
};

ItemManager.getNumberList = function (string) {
	var nums = [];
	var stringSplit = string.trim().split(/\s+/i);
	for (var i = 0; i < stringSplit.length; i++) {
		if (stringSplit[i].contains('-')) {
			var split = stringSplit[i].split('-');
			var min = parseInt(split[0]);
			var max = parseInt(split[1]);
			if (!min || min > max) continue;
			for (var j = min; j <= max; j++) {
				nums.push(j);
			}
		}
		else 
			nums.push(parseInt(stringSplit[i]));
	}
	return nums;
};

//=============================================================================
// End of File
//=============================================================================
} else {

Imported.GT_RandomItemSystem = false;	
var text = '警告，你试图在没有安装YEP_ItemCore的情况下运行GT_RandomItemSystem，请安装YEP_ItemCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.YEP_ItemCore