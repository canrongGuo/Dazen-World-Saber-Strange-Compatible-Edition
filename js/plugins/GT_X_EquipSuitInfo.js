//=============================================================================
// GT50 Plugins - EquipSuitCore Extension - EquipSuitInfo
// GT_X_EquipSuitInfo.js
//=============================================================================

var Imported = Imported || {};
Imported.GT_X_EquipSuitInfo = true;

var GT = GT || {};
GT.ESInfo = GT.ESInfo || {};
GT.ESInfo.version = 1.1;

//=============================================================================
/*:
 * @plugindesc [v1.1]        装备 - 套装系统 - 信息显示扩展
 * @author ganfly
 *
 * @help
 * ============================================================================
 * 介绍
 * ============================================================================
 * 
 * 本插件为装备套装系统的信息显示扩展，可以将套装信息显示出来。
 * 必须安装GT_EquipSuitCore才能运行。
 * 本插件参考了YEP插件、Olivia_EquipSetBonuses、MiniInformationWindow
 *
 * 目前支持显示的窗口：
 *     本插件提供的套装信息浮动窗口
 *     YEP物品信息窗口(需要YEP_ItemCore插件)
 *     yana浮动物品信息窗口(需要MiniInformationWindow插件)
 *
 * 请将本插件置于YEP_ItemCore和MiniInformationWindow的下面
 *
 * ============================================================================
 * 参数对照表及公式
 * ============================================================================
 *
 *  Base代表基础值，Plus代表参数加成，Rate代表参数倍率
 * 
 *  基础参数      公式：(Base + Plus) * Rate
 *  MHP 最大生命
 *  MMP 最大魔法
 *  ATK 攻击力
 *  DEF 防御力
 *  MAT 魔法攻击力
 *  MDF 魔法防御力
 *  AGI 敏捷
 *  LUK 幸运
 *
 *  额外参数      公式：(Base + Plus) * Rate
 *  HIT 命中率
 *  EVA 闪避率
 *  CRI 暴击率
 *  CEV 暴击闪避率
 *  MEV 魔法闪避率
 *  MRF 魔法反射率
 *  CNT 反击率
 *  HRG 生命自动回复率
 *  MRG 魔法自动回复率
 *  TRG 怒气自动回复率
 * 
 *  特殊参数      公式：(Base + Plus) * Rate
 *  TGR 受到攻击几率
 *  GRD 防御效果
 *  REC 回复效果
 *  PHA 药理知识
 *  MCR 魔法消耗率
 *  TCR 怒气补充率
 *  PDR 物理伤害率
 *  MDR 魔法伤害率
 *  FDR 地形伤害率
 *  EXR 经验率
 *  
 *  战斗结算      公式：(Base + Base * Plus) * Rate
 *  EXP 经验获得量
 *  GOLD 金币获得量
 *  ITEM 物品爆率
 * 
 *
 * ============================================================================
 * 用户规约
 * ============================================================================
 * 
 *  MIT规约。
 *  如果你使用了本插件，请在致谢中包含'ganfly'或者'gt50'，谢啦！
 * 
 * ============================================================================
 * 更新日志
 * ============================================================================
 * 
 * [v1.0] 完成插件。
 *
 * [v1.1] 增加显示套装所含装备数和当前已装备数的功能。
 *        增加yana窗口中显示套装所含装备名的功能。
 * 
 * ============================================================================
 * 帮助结束
 * ============================================================================
 *
 * @param Tooltips
 * @text ----信息浮动窗口----
 *
 * @param ShowTooltips
 * @text 启用信息浮动窗口?
 * @parent Tooltips
 * @type boolean
 * @on 启用
 * @off 关闭
 * @desc 是否启用本插件自带的套装信息浮动窗口
 * @default true
 *
 * @param TtpWindowScale
 * @text 窗口缩放率
 * @parent Tooltips
 * @desc 套装信息浮动窗口的缩放率
 * @default 0.6
 *
 * @param TtpWindowSkin
 * @text 窗口皮肤
 * @parent Tooltips
 * @type file
 * @dir img/system/
 * @desc 套装信息浮动窗口的窗口皮肤
 * @default Window
 *
 * @param TtpWindowOpacity
 * @text 窗口不透明度
 * @parent Tooltips
 * @type number
 * @min 0
 * @max 255
 * @desc 套装信息浮动窗口的窗口不透明度
 * @default 240
 *
 * @param TtpOffsetX
 * @text X坐标偏移
 * @parent Tooltips
 * @desc 套装信息浮动窗口的窗口X坐标偏移
 * @default 16
 *
 * @param TtpOffsetY
 * @text Y坐标偏移
 * @parent Tooltips
 * @desc 套装信息浮动窗口的窗口Y坐标偏移
 * @default 16
 *
 * @param Window_ItemInfo
 * @text ----YEP物品信息窗口----
 * @default !!需要YEP_ItemCore插件!!
 * 
 * @param ShowInItemInfoWindow
 * @text 显示套装信息?
 * @parent Window_ItemInfo
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在YEP物品信息窗口中显示套装信息
 * @default true
 *
 * @param InfoWindowScale
 * @text 窗口缩放率
 * @parent Window_ItemInfo
 * @desc YEP物品信息窗口中套装信息的缩放率
 * @default 0.6
 *
 * @param MiniInformationWindow
 * @text ----yana浮动物品信息窗口----
 * @default !!需要MiniInformationWindow插件!!
 * 
 * @param ShowInMiniInfoWindow
 * @text 显示套装信息?
 * @parent MiniInformationWindow
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在yana浮动物品信息窗口中显示套装信息
 * @default true
 *
 * @param ShowInsideEquip
 * @text 显示套装含有的装备?
 * @parent MiniInformationWindow
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在yana浮动物品信息窗口中显示套装含有的装备
 * @default true
 *
 * @param IsEquipedFmt
 * @text 已装备物品名显示格式
 * @parent ShowInsideEquip
 * @desc 已装备的物品名显示格式, 用%1替换物品名，可以使用文字代码。
 * @default \c[3]★%1\c[0]
 *
 * @param NotEquipedFmt
 * @text 未装备物品名显示格式
 * @parent ShowInsideEquip
 * @desc 未装备的物品名显示格式, 用%1替换物品名，可以使用文字代码。
 * @default ★%1
 *
 * @param Text
 * @text ----显示设定----
 *
 * @param XParamText
 * @text 额外参数名称
 * @type struct<XParamText>
 * @parent Text
 * @desc 设置额外参数的显示名称
 * @default {"HITName":"命中率","EVAName":"闪避率","CRIName":"暴击率","CEVName":"暴击闪避率","MEVName":"魔法闪避率","MRFName":"魔法反射率","CNTName":"反击率","HRGName":"生命自动回复","MRGName":"魔法自动回复","TRGName":"怒气自动回复"}
 *
 * @param SParamText
 * @text 特殊参数名称
 * @type struct<SParamText>
 * @parent Text
 * @desc 设置特殊参数的显示名称
 * @default {"TGRName":"受到攻击几率","GRDName":"防御效果","RECName":"回复效果","PHAName":"药理知识","MCRName":"魔法消耗率","TCRName":"怒气补充率","PDRName":"物理伤害率","MDRName":"魔法伤害率","FDRName":"地形伤害率","EXRName":"经验率"}
 *
 * @param BResultText
 * @text 战斗结算名称
 * @type struct<BResultText>
 * @parent Text
 * @desc 设置战斗结算参数的显示名称
 * @default {"EXPName":"战斗经验","GOLDName":"金币掉落","ITEMName":"物品爆率"}
 *
 * @param SuitNameFmt
 * @text 套装名称显示格式
 * @parent Text
 * @desc 套装名称显示格式，用%1替换套装名称，可以使用文字代码。
 * @default \c[27]%1\c[0]
 *
 * @param SuitNumFmt
 * @text 套装已装备数量显示格式
 * @parent Text
 * @desc 套装已装备数量显示格式，用%1替换已装备数量，用%2替换总数量，可以使用文字代码。
 * @default \c[26][%1/%2]\c[0]
 *
 * @param PiecesFmt
 * @text 分层名称显示格式
 * @parent Text
 * @desc 套装分层效果名称显示格式, 用%1替换套装层数，可以使用文字代码。
 * @default \c[27][%1]套装效果:\c[0]
 *
 * @param PassiveStateText
 * @text 被动状态行首文字
 * @parent Text
 * @desc 显示在被动状态前的文字，可以使用文字代码。
 * @default \c[27]被动：\c[0]
 *
 * @param StateResistText
 * @text 状态免疫行首文字
 * @parent Text
 * @desc 显示在状态免疫前的文字，可以使用文字代码。
 * @default \c[27]免疫：\c[0]
 *
 * @param SkillText
 * @text 技能行首文字
 * @parent Text
 * @desc 显示在技能前的文字，可以使用文字代码。
 * @default \c[27]技能：\c[0]
 *
 * @param ShowStateIcon
 * @text 是否显示图标?
 * @parent Text
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc 是否在套装信息中显示状态和技能的图标？
 * @default true
 *
 */
/* ---------------------------------------------------------------------------
 * struct<XParamText>
 * ---------------------------------------------------------------------------
 */
/*~struct~XParamText:
 *
 * @param HITName
 * @text HIT显示名称
 * @desc 参数的显示名称。
 * @default 命中率
 *
 * @param EVAName
 * @text EVA显示名称
 * @desc 参数的显示名称。
 * @default 闪避率
 *
 * @param CRIName
 * @text CRI显示名称
 * @desc 参数的显示名称。
 * @default 暴击率
 *
 * @param CEVName
 * @text CEV显示名称
 * @desc 参数的显示名称。
 * @default 暴击闪避率
 *
 * @param MEVName
 * @text MEV显示名称
 * @desc 参数的显示名称。
 * @default 魔法闪避率
 *
 * @param MRFName
 * @text MRF显示名称
 * @desc 参数的显示名称。
 * @default 魔法反射率
 *
 * @param CNTName
 * @text CNT显示名称
 * @desc 参数的显示名称。
 * @default 反击率
 *
 * @param HRGName
 * @text HRG显示名称
 * @desc 参数的显示名称。
 * @default 生命自动回复
 *
 * @param MRGName
 * @text MRG显示名称
 * @desc 参数的显示名称。
 * @default 魔法自动回复
 *
 * @param TRGName
 * @text TRG显示名称
 * @desc 参数的显示名称。
 * @default 怒气自动回复
 *
 */
/* ---------------------------------------------------------------------------
 * struct<SParamText>
 * ---------------------------------------------------------------------------
 */
/*~struct~SParamText:
 *
 * @param TGRName
 * @text TGR显示名称
 * @desc 参数的显示名称。
 * @default 受到攻击几率
 *
 * @param GRDName
 * @text GRD显示名称
 * @desc 参数的显示名称。
 * @default 防御效果
 *
 * @param RECName
 * @text REC显示名称
 * @desc 参数的显示名称。
 * @default 回复效果
 *
 * @param PHAName
 * @text PHA显示名称
 * @desc 参数的显示名称。
 * @default 药理知识
 *
 * @param MCRName
 * @text NCR显示名称
 * @desc 参数的显示名称。
 * @default 魔法消耗率
 *
 * @param TCRName
 * @text TCR显示名称
 * @desc 参数的显示名称。
 * @default 怒气补充率
 *
 * @param PDRName
 * @text PDR显示名称
 * @desc 参数的显示名称。
 * @default 物理伤害率
 *
 * @param MDRName
 * @text MDR显示名称
 * @desc 参数的显示名称。
 * @default 魔法伤害率
 *
 * @param FDRName
 * @text FDR显示名称
 * @desc 参数的显示名称。
 * @default 地形伤害率
 *
 * @param EXRName
 * @text EXR显示名称
 * @desc 参数的显示名称。
 * @default 经验率
 *
 */
/* ---------------------------------------------------------------------------
 * struct<BResultText>
 * ---------------------------------------------------------------------------
 */
/*~struct~BResultText:
 *
 * @param EXPName
 * @text EXP显示名称
 * @desc 参数的显示名称。
 * @default 战斗经验
 *
 * @param GOLDName
 * @text GOLD显示名称
 * @desc 参数的显示名称。
 * @default 金币掉落
 *
 * @param ITEMName
 * @text ITEM显示名称
 * @desc 参数的显示名称。
 * @default 物品爆率
 *
 */
//=============================================================================

if (Imported.GT_EquipSuitCore) {
	
//=============================================================================
// Parameter Variables
//=============================================================================

GT.Parameters = PluginManager.parameters('GT_X_EquipSuitInfo');
GT.Param = GT.Param || {};

//Tooltips
GT.Param.ESTtpWindowShow = eval(GT.Parameters['ShowTooltips']);
GT.Param.ESTtpWindowScale = Number(GT.Parameters['TtpWindowScale']);
GT.Param.ESTtpWindowSkin = String(GT.Parameters['TtpWindowSkin']);
GT.Param.ESTtpWindowOpacity = Number(GT.Parameters['TtpWindowOpacity']);

GT.Param.ESTtpOffsetX = Number(GT.Parameters['TtpOffsetX']);
GT.Param.ESTtpOffsetY = Number(GT.Parameters['TtpOffsetY']);

//Window_ItemInfo
GT.Param.ESInfoWindowShow = eval(GT.Parameters['ShowInItemInfoWindow']);
GT.Param.ESInfoWindowScale = Number(GT.Parameters['InfoWindowScale']);

//MiniInfomationWindow
GT.Param.ESMiniInfoWindowShow = eval(GT.Parameters['ShowInMiniInfoWindow']);
GT.Param.ESShowInsideEquip = eval(GT.Parameters['ShowInsideEquip']);
GT.Param.ESIsEquipedText = String(GT.Parameters['IsEquipedFmt']);
GT.Param.ESNotEquipedText = String(GT.Parameters['NotEquipedFmt']);

//Text
GT.Param.ESXParamTextStr = JSON.parse(GT.Parameters['XParamText']);
GT.Param.ESXParamText = [
    String(GT.Param.ESXParamTextStr.HITName),
	String(GT.Param.ESXParamTextStr.EVAName),
	String(GT.Param.ESXParamTextStr.CRIName),
	String(GT.Param.ESXParamTextStr.CEVName),
	String(GT.Param.ESXParamTextStr.MEVName),
	String(GT.Param.ESXParamTextStr.MRFName),
	String(GT.Param.ESXParamTextStr.CNTName),
	String(GT.Param.ESXParamTextStr.HRGName),
	String(GT.Param.ESXParamTextStr.MRGName),
	String(GT.Param.ESXParamTextStr.TRGName)
];
GT.Param.ESSParamTextStr = JSON.parse(GT.Parameters['SParamText']);
GT.Param.ESSParamText = [
    String(GT.Param.ESSParamTextStr.TGRName),
	String(GT.Param.ESSParamTextStr.GRDName),
	String(GT.Param.ESSParamTextStr.RECName),
	String(GT.Param.ESSParamTextStr.PHAName),
	String(GT.Param.ESSParamTextStr.MCRName),
	String(GT.Param.ESSParamTextStr.TCRName),
	String(GT.Param.ESSParamTextStr.PDRName),
	String(GT.Param.ESSParamTextStr.MDRName),
	String(GT.Param.ESSParamTextStr.FDRName),
	String(GT.Param.ESSParamTextStr.EXRName)
];
GT.Param.ESBResultTextStr = JSON.parse(GT.Parameters['BResultText']);
GT.Param.ESBResultText = [
    String(GT.Param.ESBResultTextStr.EXPName),
	String(GT.Param.ESBResultTextStr.GOLDName),
	String(GT.Param.ESBResultTextStr.ITEMName)
];
GT.Param.ESSuitNameText = String(GT.Parameters['SuitNameFmt']);
GT.Param.ESSuitNumText = String(GT.Parameters['SuitNumFmt']);
GT.Param.ESPiecesText = String(GT.Parameters['PiecesFmt']);
GT.Param.ESPassiveStateText = String(GT.Parameters['PassiveStateText']);
GT.Param.ESStateResistText = String(GT.Parameters['StateResistText']);
GT.Param.ESSkillText = String(GT.Parameters['SkillText']);
GT.Param.ESdrawStateIcons = eval(GT.Parameters['ShowStateIcon']);

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.getEquipSuitData = function () {
	var item = this._item;
	if(DataManager.isItem(item)) return;
	this._eSData = [];
	this._opacityCheck = [];
	if (item) {
		if (item.baseItemId)
			item = DataManager.getBaseItem(item);
		for (var i = 0; i < item.equipSuit.length; i++) {
			var suitId = item.equipSuit[i];
			var data = $dataEquipSuits[suitId];
			var suitName = GT.Param.ESSuitNameText.format(data.name);
			if (this._actor) {
				var pieces = this._actor.getEquipSuitsCount(data.id, this._actor._equipSuitsTotal);
			    var suitNum = data.indexEquip.length;
				suitName += GT.Param.ESSuitNumText.format(pieces, suitNum);
			}
			this._eSData.push(suitName);
			this._opacityCheck.push(true);
			if (this._actor && this._drawESInsideEquip) {
				this.getESIsideEquip(data);
			}
			this.getESBonuseData(data);
			if (data.description && data.description !== "") {
			    this._eSData.push(data.description.replace(/"/i, '').replace(/"/i, '').replace(/\\n/i, '\n'));
			    this._opacityCheck.push(true);
			}
		}
	}
};

Window_Base.prototype.getESBonuseData = function (data) {
	for (var p = 0; p < data.bonuses.length; p++) {
		var pieceBonuses = data.bonuses[p];
		var requirePieces = pieceBonuses.requirePieces;
		var bonusText = this.getBonusAutoText(pieceBonuses);
		var bonusExText = pieceBonuses.text;
		var text = GT.Param.ESPiecesText.format(requirePieces) + '\n';
		text += bonusText;
		if (bonusExText && bonusExText !== "") text += '\n' + bonusExText.replace(/"/i, '').replace(/"/i, '').replace(/\\n/i, '\n');
		this._eSData.push(text);
		if (this._actor) {
			var pieces = this._actor.getEquipSuitsCount(data.id, this._actor._equipSuitsTotal);
			this._opacityCheck.push((pieces || 0) >= requirePieces);
		} else {
			this._opacityCheck.push(true);
		}
	}
};

Window_Base.prototype.getBonusAutoText = function (bonusData) {
	var text = '';
	var separator = false;
	
	// Base Parameters
	var baseParamText = this.getBaseParamText(bonusData, separator);
	text += baseParamText.text;
	separator = baseParamText.separator;
	
	// X Parameters
	var xParamText = this.getXParamText(bonusData, separator);
	text += xParamText.text;
	separator = xParamText.separator;
	
	// S Parameters
	var sParamText = this.getSParamText(bonusData, separator);
	text += sParamText.text;
	separator = sParamText.separator;
	
	text += '\n';
	separator = false;
	
	//Battle Result
	var bResultText = this.getBResultText(bonusData, separator);
	text += bResultText.text;
	separator = bResultText.separator;
	
	text += '\n';
	separator = false;
	
	// States
	var pStateText = this.getPassiveStateText(bonusData, separator);
	text += pStateText.text;
	separator = pStateText.separator;
	
	text += '\n';
	separator = false;
	
	// StateResist
	var stateResistText = this.getStateResistText(bonusData, separator);
	text += stateResistText.text;
	separator = stateResistText.separator;
	
	text += '\n';
	separator = false;
	
	// Skill
	var skillText = this.getSkillText(bonusData, separator);
	text += skillText.text;
	separator = skillText.separator;
	
	return text;
};

Window_Base.prototype.getBaseParamText = function (bonusData, separator) {
	var text = '';
	for (var i = 0; i < 8; i++) {
		var rateValue = bonusData.paramRate[i];
		var plusValue = bonusData.paramPlus[i];
		if (rateValue !== 1 || plusValue !== 0) {
			if (separator)
				text += ', ';
			text += TextManager.param(i);
			separator = true;
		}
		if (rateValue !== 1) {
			text += '\u00d7';
			text += Math.round(rateValue * 100) + '%';
		}
		if (plusValue !== 0) {
			if (plusValue > 0)
				text += '+';
			text += plusValue;
		}
	}
	return {text, separator};
};

Window_Base.prototype.getXParamText = function (bonusData, separator) {
	var text = '';
	for (var i = 0; i < 10; i++) {
		var rateValue = bonusData.xparamRate[i];
		var plusValue = bonusData.xparamPlus[i];
		if (rateValue !== 1 || plusValue !== 0) {
			if (separator)
				text += ', ';
			text += GT.Param.ESXParamText[i];
			separator = true;
		}
		if (rateValue !== 1) {
			text += '\u00d7';
			text += Math.round(rateValue * 100) + '%';
		}
		if (plusValue !== 0) {
			if (plusValue > 0)
				text += '+';
			text += Math.round(plusValue) + '%';
		}
	}
	return {text, separator};
};

Window_Base.prototype.getSParamText = function (bonusData, separator) {
	var text = '';
	for (var i = 0; i < 10; i++) {
		var rateValue = bonusData.sparamRate[i];
		var plusValue = bonusData.sparamPlus[i];
		if (rateValue !== 1 || plusValue !== 0) {
			if (separator)
				text += ', ';
			text += GT.Param.ESSParamText[i];
			separator = true;
		}
		if (rateValue !== 1) {
			text += '\u00d7';
			text += Math.round(rateValue * 100) + '%';
		}
		if (plusValue !== 0) {
			if (plusValue > 0)
				text += '+';
			text += Math.round(plusValue) + '%';
		}
	}
	return {text, separator};
};

Window_Base.prototype.getBResultText = function (bonusData, separator) {
	var text = '';
	for (var i = 0; i < 3; i++) {
		var rateValue = bonusData.bResultRate[i];
		var plusValue = bonusData.bResultPlus[i];
		if (rateValue !== 1 || plusValue !== 0) {
			if (separator)
				text += ', ';
			text += GT.Param.ESBResultText[i];
			separator = true;
		}
		if (rateValue !== 1) {
			text += '\u00d7';
			text += Math.round(rateValue * 100) + '%';
		}
		if (plusValue !== 0) {
			if (plusValue > 0)
				text += '+';
			text += Math.round(plusValue) + '%';
		}
	}
	return {text, separator};
};

Window_Base.prototype.getPassiveStateText = function (bonusData, separator) {
	var text = '';
	var states = bonusData.states;
	if (states.length) text += GT.Param.ESPassiveStateText;
	for (var i = 0; i < states.length; i++) {
		var stateId = states[i];
		var state = $dataStates[stateId];
		var stateName = state.name.replace(/<<(.*?)>>/i, '');
		if (state && stateName !== '') {
			if (separator)
				text += ', ';
			if (GT.Param.ESdrawStateIcons && state.iconIndex > 0) {
				text += '\\i[' + state.iconIndex + ']';
			}
			text += stateName;
			separator = true;
		}
	}
	return {text, separator};
};

Window_Base.prototype.getStateResistText = function (bonusData, separator) {
	var text = '';
	var states = bonusData.statesResist;
	if (states.length) text += GT.Param.ESStateResistText;
	for (var i = 0; i < states.length; i++) {
		var stateId = states[i];
		var state = $dataStates[stateId];
		var stateName = state.name.replace(/<<(.*?)>>/i, '');
		if (state && stateName !== '') {
			if (separator)
				text += ', ';
			if (GT.Param.ESdrawStateIcons && state.iconIndex > 0) {
				text += '\\i[' + state.iconIndex + ']';
			}
			text += stateName;
			separator = true;
		}
	}
	return {text, separator};
};

Window_Base.prototype.getSkillText = function (bonusData, separator) {
	var text = '';
	var skills = bonusData.skills;
	if (skills.length) text += GT.Param.ESSkillText;
	for (var i = 0; i < skills.length; i++) {
		var skillId = skills[i];
		var skill = $dataSkills[skillId];
		var skillName = skill.name.replace(/<<(.*?)>>/i, '');
		if (skill && skillName !== '') {
			if (separator)
				text += ', ';
			if (GT.Param.ESdrawStateIcons && skill.iconIndex > 0) {
				text += '\\i[' + skill.iconIndex + ']';
			}
			text += skillName;
			separator = true;
		}
	}
	return {text, separator};
};

//=============================================================================
if (GT.Param.ESTtpWindowShow) {

//=============================================================================
// Window_ESTooltip
//=============================================================================

function Window_ESTooltip() {
	this.initialize.apply(this, arguments);
}

Window_ESTooltip.prototype = Object.create(Window_Base.prototype);
Window_ESTooltip.prototype.constructor = Window_ESTooltip;

Window_ESTooltip.prototype.initialize = function () {
	this._item = null;
	this._actor = null;
	this._targetWindow = null;
	this._eSData = [];
	Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
	this.openness = 0;
};

Window_ESTooltip.prototype.loadWindowskin = function () {
	this.windowskin = ImageManager.loadSystem(GT.Param.ESTtpWindowSkin);
};

Window_ESTooltip.prototype.updateTone = function () {};

Window_ESTooltip.prototype.scaleRate = function () {
	return GT.Param.ESTtpWindowScale;
};

Window_ESTooltip.prototype.lineHeight = function () {
	return Math.round(Window_Base.prototype.lineHeight.call(this) * this.scaleRate());
};

Window_ESTooltip.prototype.standardFontSize = function () {
	return Math.round(Window_Base.prototype.standardFontSize.call(this) * this.scaleRate());
};

Window_ESTooltip.prototype.standardPadding = function () {
	return Math.round(Window_Base.prototype.standardPadding.call(this) * this.scaleRate());
};

Window_ESTooltip.prototype.textPadding = function () {
	return Math.round(Window_Base.prototype.textPadding.call(this) * this.scaleRate());
};

Window_ESTooltip.prototype.standardBackOpacity = function () {
	return GT.Param.ESTtpWindowOpacity;
};

Window_ESTooltip.prototype.update = function () {
	Window_Base.prototype.update.call(this);
	this.updateOpenClose();
};

Window_ESTooltip.prototype.updateOpenClose = function () {
	if (this._targetWindow) {
		if (this._targetWindow.active) {
			this.open();
		} else {
			this.close();
		}
	}
};

Window_ESTooltip.prototype.processDrawIcon = function (iconIndex, textState) {
	this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
	textState.x += Math.round(Window_Base._iconWidth * this.scaleRate()) + 4;
};

Window_ESTooltip.prototype.drawIcon = function (iconIndex, x, y) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	var rate = this.scaleRate();
	this.contents.blt(bitmap, sx, sy, pw, ph, x, y, Math.round(pw * rate), Math.round(ph * rate));
};

Window_ESTooltip.prototype.setActor = function (actor) {
	if (this._actor !== actor) {
		this._actor = actor;
	}
};

Window_ESTooltip.prototype.setItem = function (item, targetWindow) {
	if (this._item === item) return;
	this._item = item;
	this.getEquipSuitData();
	this.calculateWindowSize();
	if (this.width > 0 && this.height > 0) {
		this.refresh();
		if (targetWindow) {
		    this._targetWindow = targetWindow;
		    this.updatePosition(targetWindow);
	    }
		this.open();
	} else {
		this.close();
	}
};

Window_ESTooltip.prototype.calculateWindowSize = function () {
	if (this._eSData.length === 0) {
		this.width = 0;
		this.height = 0;
	} else {
		var width = 0;
		var height = 0;
		for (var j = 0; j < this._eSData.length; j++) {
			var lines = this._eSData[j].split(/[\r\n]+/);
			if (lines.length > 0) {	
				for (var i = 0; i < lines.length; i++) {
					var line = lines[i];
					var lineWidth = Window_ChoiceList.prototype.textWidthEx.call(this, line);
					width = Math.max(lineWidth, width);
				}	
				height += lines.length * this.lineHeight();
			}
		}
		this.width = this.standardPadding() * 2 + this.textPadding() * 2 + width;
		this.height = this.standardPadding() * 2 + height;
	}
};

Window_ESTooltip.prototype.refresh = function () {
	this.contents.clear();
	var fontSize = this.standardFontSize();
	var scale = this.scaleRate();
	this.contents.fillRect(4, fontSize + 10 * scale, this.contentsWidth() - 8, 1, this.textColor(0));
	this.drawEquipSuitInfo();
};

Window_ESTooltip.prototype.drawEquipSuitInfo = function () {
	var x = this.textPadding();
	var y = 0;
	for (var j = 0; j < this._eSData.length; j++) {
	    var lines = this._eSData[j].split(/[\r\n]+/);
		this.changePaintOpacity(this._opacityCheck[j]);
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			this.drawTextEx(line, x, y);
			y += this.lineHeight();
		}
	}
	this.changePaintOpacity(true);
};

Window_ESTooltip.prototype.updatePosition = function (targetWindow) {
	var x = targetWindow.x + targetWindow.standardPadding() + targetWindow._cursorRect.x + targetWindow._cursorRect.width/2;
	var offsetX = GT.Param.ESTtpOffsetX;
	x += offsetX;
	x = x.clamp(0, Graphics.boxWidth - this.width - offsetX);
	var y = targetWindow.y + targetWindow.standardPadding() + targetWindow._cursorRect.y;
	var offsetY = GT.Param.ESTtpOffsetY;
	if (y + offsetY + this.height + targetWindow._cursorRect.height > Graphics.boxHeight) {
		y = Graphics.boxHeight - offsetY - this.height;
	} else {
		y += offsetY + targetWindow._cursorRect.height;
	}
	y = y.clamp(0, Graphics.boxHeight - this.height);
	this.x = x;
	this.y = y;
};

//=============================================================================
// Window_Base
//=============================================================================

Window_Base.prototype.setESTooltipWindow = function (tooltipWindow) {
	this._eSTooltipWindow = tooltipWindow;
};

Window_Base.prototype.updateESTooltip = function () {
	if (this._eSTooltipWindow) {
		this._eSTooltipWindow.setItem(this.item(), this);
	}
};

//=============================================================================
// Window_ItemList
//=============================================================================

GT.ESInfo.Window_ItemList_updateHelp = Window_ItemList.prototype.updateHelp;
Window_ItemList.prototype.updateHelp = function () {
	GT.ESInfo.Window_ItemList_updateHelp.call(this);
	this.updateESTooltip();
};

//=============================================================================
// Window_EquipSlot
//=============================================================================

GT.ESInfo.Window_EquipSlot_updateHelp = Window_EquipSlot.prototype.updateHelp;
Window_EquipSlot.prototype.updateHelp = function () {
	GT.ESInfo.Window_EquipSlot_updateHelp.call(this);
	this.updateESTooltip();
};

//=============================================================================
// Window_ShopBuy
//=============================================================================

GT.ESInfo.Window_ShopBuy_updateHelp = Window_ShopBuy.prototype.updateHelp;
Window_ShopBuy.prototype.updateHelp = function () {
	GT.ESInfo.Window_ShopBuy_updateHelp.call(this);
	this.updateESTooltip();
};

//=============================================================================
// Scene_Equip
//=============================================================================

GT.ESInfo.Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function () {
	GT.ESInfo.Scene_Equip_create.call(this);
	this.createESTooltipWindow();
};

Scene_Equip.prototype.createESTooltipWindow = function () {
	this._eSTooltipWindow = new Window_ESTooltip();
	this.addChild(this._eSTooltipWindow);
	this._eSTooltipWindow.setActor(this.actor());
	this._itemWindow.setESTooltipWindow(this._eSTooltipWindow);
	this._slotWindow.setESTooltipWindow(this._eSTooltipWindow);
};

GT.ESInfo.Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function () {
	GT.ESInfo.Scene_Equip_refreshActor.call(this);
	if (this._eSTooltipWindow) {
		this._eSTooltipWindow.setActor(this.actor());
	}
};

GT.ESInfo.Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
Scene_Equip.prototype.onSlotOk = function () {
	this._eSTooltipWindow.setItem(null);
	GT.ESInfo.Scene_Equip_onSlotOk.call(this);
};

GT.ESInfo.Scene_Equip_onSlotCancel = Scene_Equip.prototype.onSlotCancel;
Scene_Equip.prototype.onSlotCancel = function () {
	this._eSTooltipWindow.setItem(null);
	GT.ESInfo.Scene_Equip_onSlotCancel.call(this);
};

GT.ESInfo.Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
Scene_Equip.prototype.onItemOk = function () {
	this._eSTooltipWindow.setItem(null);
	GT.ESInfo.Scene_Equip_onItemOk.call(this);
};

GT.ESInfo.Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
Scene_Equip.prototype.onItemCancel = function () {
	this._eSTooltipWindow.setItem(null);
	GT.ESInfo.Scene_Equip_onItemCancel.call(this);
};

//=============================================================================
// Scene_Item
//=============================================================================

GT.ESInfo.Scene_Item_create = Scene_Item.prototype.create;
Scene_Item.prototype.create = function () {
	GT.ESInfo.Scene_Item_create.call(this);
	this.createESTooltipWindow();
};

Scene_Item.prototype.createESTooltipWindow = function () {
	this._eSTooltipWindow = new Window_ESTooltip();
	this.addChild(this._eSTooltipWindow);
	this._itemWindow.setESTooltipWindow(this._eSTooltipWindow);
};

//=============================================================================
// Scene_Shop
//=============================================================================

GT.ESInfo.Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function () {
	GT.ESInfo.Scene_Shop_create.call(this);
	this.createESTooltipWindow();
};

Scene_Shop.prototype.createESTooltipWindow = function () {
	this._eSTooltipWindow = new Window_ESTooltip();
	this.addChild(this._eSTooltipWindow);
	this._buyWindow.setESTooltipWindow(this._eSTooltipWindow);
	this._sellWindow.setESTooltipWindow(this._eSTooltipWindow);
};

    
} //GT.Param.ESTtpWindowShow

//=============================================================================

if (Imported.YEP_ItemCore && GT.Param.ESInfoWindowShow) {
	
//=============================================================================
// Window_ItemInfo
//=============================================================================

Window_ItemInfo.prototype.scaleRate = function () {
	return GT.Param.ESInfoWindowScale;
};

GT.ESInfo.Window_ItemInfo_initialize = Window_ItemInfo.prototype.initialize;
Window_ItemInfo.prototype.initialize = function(x, y, width, height) {
    GT.ESInfo.Window_ItemInfo_initialize.call(this, x, y, width, height);
    this._actor = null;
	this._scaleState = false;
};

Window_ItemInfo.prototype.setActor = function (actor) {
	if (this._actor !== actor) {
		this._actor = actor;
	}
};

GT.ESInfo.Window_ItemInfo_refresh = Window_ItemInfo.prototype.refresh;
Window_ItemInfo.prototype.refresh = function() {
	dy = GT.ESInfo.Window_ItemInfo_refresh.call(this);
	if (DataManager.isItem(this._item)) return dy;
	this.getEquipSuitData();
    this.drawEquipSuitInfo(dy);
    return dy;
};

Window_ItemInfo.prototype.drawEquipSuitInfo = function (dy) {
	if(!this._eSData) return;
	if(!this._opacityCheck) return;
	this._scaleState = true;
	var x = this.textPadding();
	var y = dy;
	for (var j = 0; j < this._eSData.length; j++) {
	    var lines = this._eSData[j].split(/[\r\n]+/);
		this.changePaintOpacity(this._opacityCheck[j]);
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i];
			this.contents.fontSize = Math.round(this.standardFontSize() * this.scaleRate());
			this.drawTextExPlus(line, x, y);
			y += this.lineHeight() * 0.5;
		}
	}
	this._scaleState = false;
	this.resetFontSettings();
	this.changePaintOpacity(true);
};

Window_ItemInfo.prototype.processDrawIcon = function (iconIndex, textState) {
	this.drawIcon(iconIndex, textState.x + 2, textState.y + 2);
	var rate = this._scaleState ? this.scaleRate() : 1;
	textState.x += Math.round(Window_Base._iconWidth * rate) + 4;
};

Window_ItemInfo.prototype.drawIcon = function (iconIndex, x, y) {
	var bitmap = ImageManager.loadSystem('IconSet');
	var pw = Window_Base._iconWidth;
	var ph = Window_Base._iconHeight;
	var sx = iconIndex % 16 * pw;
	var sy = Math.floor(iconIndex / 16) * ph;
	var rate = this._scaleState ? this.scaleRate() : 1;
	this.contents.blt(bitmap, sx, sy, pw, ph, x, y, Math.round(pw * rate), Math.round(ph * rate));
};

Window_ItemInfo.prototype.drawTextExPlus = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, false);
        while (textState.index < textState.text.length) {
            this.processCharacter(textState);
        }
        return textState.x - x;
    } else {
        return 0;
    }
};

//=============================================================================
// Scene_Equip
//=============================================================================

if (Imported.YEP_EquipCore) {
	
GT.ESInfo.Scene_Equip_createItemInfoWindow = Scene_Equip.prototype.createItemInfoWindow;
Scene_Equip.prototype.createItemInfoWindow = function () {
	GT.ESInfo.Scene_Equip_createItemInfoWindow.call(this);
	this._infoWindow.setActor(this.actor());
};

GT.ESInfo.Scene_Equip_refreshActor_2 = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function () {
	GT.ESInfo.Scene_Equip_refreshActor_2.call(this);
	if (this._infoWindow) {
		this._infoWindow.setActor(this.actor());
	}
};

} // Imported.YEP_EquipCore

} // Imported.YEP_ItemCore && GT.Param.ESInfoWindowShow

//=============================================================================

if (Imported.MiniInformationWindow && GT.Param.ESMiniInfoWindowShow) {
	
//=============================================================================
// Window_MiniInfo
//=============================================================================

GT.ESInfo.Window_MiniInfo_initialize = Window_MiniInfo.prototype.initialize;
Window_MiniInfo.prototype.initialize = function(x, y, width, height) {
    GT.ESInfo.Window_MiniInfo_initialize.call(this, x, y, width, height);
    this._actor = null;
	this._drawESInsideEquip = GT.Param.ESShowInsideEquip;
};

Window_MiniInfo.prototype.setActor = function (actor) {
	if (this._actor !== actor) {
		this._actor = actor;
	}
};

Window_MiniInfo.prototype.getPassiveStateText = function (bonusData, separator) {
	var text = '';
	var states = bonusData.states;
	for (var i = 0; i < states.length; i++) {
		var stateId = states[i];
		var state = $dataStates[stateId];
		var stateName = state.name.replace(/<<(.*?)>>/i, '');
		if (state && stateName !== '') {
			if (separator)
				text += ', ';
			text += GT.Param.ESPassiveStateText;
			if (GT.Param.ESdrawStateIcons && state.iconIndex > 0) {
				text += '\\i[' + state.iconIndex + ']';
			}
			text += stateName;
			separator = true;
		}
	}
	return {text, separator};
};

Window_MiniInfo.prototype.getStateResistText = function (bonusData, separator) {
	var text = '';
	var states = bonusData.statesResist;
	for (var i = 0; i < states.length; i++) {
		var stateId = states[i];
		var state = $dataStates[stateId];
		var stateName = state.name.replace(/<<(.*?)>>/i, '');
		if (state && stateName !== '') {
			if (separator)
				text += ', ';
			text += GT.Param.ESStateResistText;
			if (GT.Param.ESdrawStateIcons && state.iconIndex > 0) {
				text += '\\i[' + state.iconIndex + ']';
			}
			text += stateName;
			separator = true;
		}
	}
	return {text, separator};
};

Window_MiniInfo.prototype.getSkillText = function (bonusData, separator) {
	var text = '';
	var skills = bonusData.skills;
	for (var i = 0; i < skills.length; i++) {
		var skillId = skills[i];
		var skill = $dataSkills[skillId];
		var skillName = skill.name.replace(/<<(.*?)>>/i, '');
		if (skill && skillName !== '') {
			if (separator)
				text += ', ';
			text += GT.Param.ESSkillText;
			if (GT.Param.ESdrawStateIcons && skill.iconIndex > 0) {
				text += '\\i[' + skill.iconIndex + ']';
			}
			text += skillName;
			separator = true;
		}
	}
	return {text, separator};
};

GT.ESInfo.Window_MiniInfo_makeContents = Window_MiniInfo.prototype.makeContents;
Window_MiniInfo.prototype.makeContents = function() {
	GT.ESInfo.Window_MiniInfo_makeContents.call(this);
	if (DataManager.isItem(this._item)) return;
	this.getEquipSuitData();
	this.putESDataIntoData();
};

Window_MiniInfo.prototype.putESDataIntoData = function() {
	if(!this._eSData) return;
	this._data.push(' ');
	for (var j = 0; j < this._eSData.length; j++) {
	    var lines = this._eSData[j].split(/[\r\n]+/);
		for (var i = 0; i < lines.length; i++) {
			var line = lines[i].split(/, /i);
		    for (var k = 0; k < lines.length; k++) {
				var inline = line[k];
				if (inline && inline !== "") this._data.push(inline);
			}
		}
	}
};

Window_MiniInfo.prototype.getESIsideEquip = function(data) {
	var indexEquip = data.indexEquip;
	if (!indexEquip) return;
	var equips = [];
	for (var i = 0; i < this._actor.equips().length; i++) {
		var equip = this._actor.equips()[i];
		if (!equip) continue;
		if (equip.baseItemId)
			equip = DataManager.getBaseItem(equip);
		equips.push(equip);
	}
	this._eSData.push(' ');
	this._opacityCheck.push(true);
	for (var i = 0; i < indexEquip.length; i++) {
		var text = '';
		var type = indexEquip[i][0];
		var itemId = indexEquip[i][1];
		var item = type ? $dataArmors[itemId] : $dataWeapons[itemId];
		if (!item) continue;
		var isEquiped = equips.contains(item);
		if (isEquiped)
			text += GT.Param.ESIsEquipedText.format(item.name);
		else 
			text += GT.Param.ESNotEquipedText.format(item.name);
		this._eSData.push(text);
		this._opacityCheck.push(true);
    }
	this._eSData.push(' ');
	this._opacityCheck.push(true);	
};

Window_MiniInfo.prototype.calcWidth = function() {
	var width = 0;
	var nameWidth = 0;
	if (this._item && this._item.name){
		var name = this._item.name;
		if (this._item.iconIndex) name += '\\I[' + this._item.iconIndex + ']';
		nameWidth = Window_ChoiceList.prototype.textWidthEx.call(this, name);
		nameWidth += this.standardPadding() * 2 + this.textPadding() * 2 + 32;
	}
	if (this._data.length > 0) {	
		for (var i = 0; i < this._data.length; i++) {
			var line = this._data[i];
			var lineWidth = Window_ChoiceList.prototype.textWidthEx.call(this, line);
			width = Math.max(lineWidth, width);
		}	
	}
	width *= this._maxCols;
	width += this.standardPadding() * 2 + this.textPadding() * 2;
	width = Math.max(nameWidth, width);
	return width;
};

//=============================================================================
// Scene_Equip
//=============================================================================


	
GT.ESInfo.Scene_Equip_createMiniWindow = Scene_Equip.prototype.createMiniWindow;
Scene_Equip.prototype.createMiniWindow = function () {
	GT.ESInfo.Scene_Equip_createMiniWindow.call(this);
	if (this._miniWindow) {
		this._miniWindow.setActor(this.actor());
	}
};

GT.ESInfo.Scene_Equip_refreshActor_3 = Scene_Equip.prototype.refreshActor;
Scene_Equip.prototype.refreshActor = function () {
	GT.ESInfo.Scene_Equip_refreshActor_3.call(this);
	if (this._miniWindow) {
		this._miniWindow.setActor(this.actor());
	}
};

} //Imported.MiniInformationWindow && GT.Param.ESMiniInfoWindowShow	

//=============================================================================
// End of File
//=============================================================================

} else {
	
var text = '警告，你试图在没有安装GT_EquipSuitCore的情况下运行GT_X_EquipSuitInfo，\n请安装GT_EquipSuitCore。';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Imported.GT_EquipSuitCore

	