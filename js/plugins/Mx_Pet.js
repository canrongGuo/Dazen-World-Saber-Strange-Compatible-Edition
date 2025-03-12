//=============================================================================
// Mx_Pet.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc v1.00 [独立宠物与炼妖]
 * @author 目眩
 * 
 * @param ▲ 成长
 * @desc 
 * 
 * @param 成长系数
 * @parent ▲ 成长
 * @desc 每1点成长在每1级提供多少属性
 * @default 0.01
 *
 * @param 成长上限
 * @parent ▲ 成长
 * @type number[]
 * @desc 8项属性的成长值上限
 * @default ["1000","1000","700","700","700","700","700","700"]
 *
 * @param 成长下限
 * @parent ▲ 成长
 * @type number[]
 * @desc 8项属性的成长值下限，无法小于0
 * @default ["300","300","100","100","100","100","100","100"]
 *
 * @param 成长名称
 * @parent ▲ 成长
 * @desc 名称
 * @default 成长
 *
 * @param 成长随机系数
 * @parent ▲ 成长
 * @desc 若数值大于等于1，则上下波动该值。若小于1，则上下波动该百分比。
 * 填0则不进行随机波动。
 * @default 0.3
 * 
 * @param ▲ 变异
 * @desc 
 * 
 * @param 变异名称
 * @parent ▲ 变异
 * @desc 名称
 * @default 变异
 * 
 * @param 角色色调
 * @parent ▲ 变异
 * @type boolean
 * @desc 当一个角色是变异角色时，是否随机改变颜色？
 * 是 - true       否 - false
 * @default true
 * 
 * @param 敌人色调
 * @parent ▲ 变异
 * @type boolean
 * @desc 当一个敌人是变异角色时，是否随机改变颜色？
 * 是 - true       否 - false
 * @default true
 * 
 * @param 变异提升
 * @parent ▲ 变异
 * @desc 若角色变异，则其成长提升至多少百分比？
 * 最小为0。
 * @default 1.2
 * 
 * @param 随机变异
 * @parent ▲ 变异
 * @desc 获得角色时有多少概率随机变异？
 * 最小为0。
 * @default 0.05
 * 
 * @param 敌群变异
 * @parent ▲ 变异
 * @desc 战斗时，敌人有多少几率变异？
 * 最小为0。
 * @default 0.05
 * 
 * @param ▲ 捕捉
 * @desc 
 * 
 * @param 捕捉id
 * @parent ▲ 捕捉
 * @type number
 * @desc 捕捉敌人时，默认复制的角色id
 * 若无标签存在，则自动复制怪物图像、名称及变异状态
 * @default 10
 * 
 * @param 捕捉公式
 * @parent ▲ 捕捉
 * @desc 捕捉敌人时，会自动应用此公式来确定成功率
 * 默认公式为30%几率
 * @default Math.random() < 0.3
 * 
 * @param 放生名称
 * @parent ▲ 捕捉
 * @desc 名称
 * @default 放生
 * 
 * @param ▲ 炼妖
 * @desc 
 * 
 * @param 炼妖名称
 * @parent ▲ 炼妖
 * @desc 名称
 * @default 炼妖
 * 
 * @param 炼妖成长计算公式
 * @parent ▲ 炼妖
 * @desc a和b分别代表两方成长
 * @default (a + b) * 0.25 + (a + b) * 0.5 * Math.random()
 * 
 * @param 炼妖突变
 * @parent ▲ 炼妖
 * @type struct<Lytb>[]
 * @desc 炼妖过程中可能出现的突变
 * @default 
 * 
 * @param ▲ 宠物菜单
 * @desc 
 * 
 * @param 宠物窗口间隔
 * @parent ▲ 宠物菜单
 * @type number
 * @desc 菜单与窗口边缘空出的距离
 * @default 40
 * 
 * @param 宠物窗口数据缩放
 * @parent ▲ 宠物菜单
 * @desc 属性、成长值显示大小比例
 * @default 0.95
 *
 * @help
 * ============================================================================
 *  ■ 说明
 * ============================================================================
 *
 * 1. 可以无限制地产生独立角色。
 * 2. 成长系统，升级时根据成长获得属性值。
 * 3. 可将怪物捕捉为宠物成为独立角色，并参加战斗。
 * 4. 变异：变异的怪物和角色拥有更强的属性和特别的颜色。
 * 5. 炼妖：将两个独立角色合成为一个。
 * 6. 强烈建议搭配Mx_SuperSV使用。
 * 6. 如果安装了YEP_X_AnimatedSVEnemies，则此插件需放在它的下方。
 *
 * ============================================================================
 *  ■ 标签
 * ============================================================================
 *  ● 独立角色
 *   
 *   脚本：CreatePet(x, b);
 *   
 *    x替换为数字，将复制数据库中x号角色成为独立角色。
 *    b替换为true或不填，填true则自动将创建的独立角色入队。
 *    新创建的角色id将从1001开始排列。
 *   
 *   脚本：RemovePet(x);
 *   
 *    x替换为数字，将删除x号角色的所有数据。
 *    不可填写小于1001的数字。
 *    放生和炼妖会自动运行此脚本。
 *    注：如果被删除的角色正在被其他函数调用，可能会发生错误。
 *   
 *  ● 成长
 *   
 *   标签：<Cz0:x>、<Cz1:x>、<Cz2:x> ... <Cz7:x>
 *   
 *    填写在角色备注栏，将代表该角色的各项属性成长。
 *    从Cz0到Cz7，分别代表：
 *    生命、魔法、物理攻击、物理防御、魔法攻击、魔法防御、敏捷、幸运。
 *   
 *  ● 变异
 *   
 *   标签：<by:true>
 *   
 *    填写在角色备注栏，该角色获得时必定变异。
 *   
 *   标签：<wfby:true>
 *   
 *    填写在敌人备注栏，该类型怪物不会自动变异。
 *   
 *  ● 捕捉
 *   
 *   脚本：目标.Capture();
 *   脚本：Bzrd();
 *   
 *    目标.Capture()为捕捉脚本。
 *    例：在技能或道具的伤害公式中写入：b.Capture();
 *    或使用yep的技能核心或状态核心。
 *    在插件参数填写捕捉成功率公式，捕捉完毕后将保存在数组中。
 *    使用Bzrd()可将数组中所有的独立角色加入队伍。
 *    捕捉成功后，怪物会自动隐藏。事件使用[敌人出现]可让其再次出现。
 *    捕捉成功后，目标的战斗图、名称以及变异状态会被复制。
 *    但这些复制过来的参数会被标签覆盖。
 *    在怪物备注栏内填入成长标签，捕捉时会应用此成长，但不会影响怪物属性。
 *    注：如果目标的图像为mv默认的静止图像，则需要在sv_actors文件夹内放置同名
 *        文件。
 *   
 *   标签：<bzid:x>
 *   
 *    填写在敌人备注栏，捕捉成功该敌人成功后，将复制x号id的角色作为宠物。
 *    若不填，则按照插件参数[捕捉id]复制。
 *   
 *   标签：<bkbz:true>
 *   
 *    填写在敌人备注栏，则该敌人无法被捕捉。
 *   
 *   插件参数说明：捕捉公式
 *   
 *    公式内this = 目标，因此可使用this.hpRate()或this.agi等参数。
 *   
 *  ● 界面
 *   
 *   脚本：SceneManager.push(Scene_Pet);
 *   
 *    可呼出宠物菜单，菜单内只显示id大于1000的独立角色。
 *   
 *  ● 炼妖
 *   
 *   脚本：SceneManager.push(Scene_Ly);
 *   
 *    可呼出炼妖菜单，菜单内只显示id大于1000的独立角色。
 *    炼妖材料选择完毕后，按下[W]或[Q]开始炼妖。
 *    炼妖完成后，两只炼妖材料会随机存活一只，另一只的数据会被删除。
 *    存活方将获得新的成长以及两方混合的技能组（不会影响存活方的自带技能）。
 *    新的技能组数量随机，不会超过两方技能总数（相同技能不计算两次）。
 *    若此前并未变异，则会继承另一方的变异状态。
 *    若两只材料宠都是变异宠，则合出的变异宠颜色会重新随机。
 *   
 *   插件参数：炼妖突变
 *   
 *    在炼妖时，若希望两只特定的材料合成有概率突变成另一只截然不同的宠物，
 *    则在此参数中添加配置。
 *    名称仅用于备忘，无实质性作用，可随意填写。
 *    目标：成功突变时，将使合成后的宠物图像变为id为此参数的角色图像。
 *    材料A&B图像：可理解为合成材料公式。填写sv战斗图的文件名。
 *                 若两只材料的战斗图像符合条件，则满足突变条件。
 *                 若使用了Mx_SuperSV，在参数前加上'$$$'，
 *                 则会将其识别为SuperSV的基本名。
 *    概率：在满足突变条件的情况下，有多少概率突变成功？
 *    若两个合成材料可突变为多个不同的目标成品，则会从中随机挑选一个。
 *    概率通过，则突变成功。
 *   
 *   例：
 *   
 *    名称：甲方神作天下第一
 *    目标：13
 *    材料A图像文件名：Actor1_1
 *    材料B图像文件名：Actor1_3
 *    概率：0.5
 *    
 *    若填写以上参数，
 *    使用sv战斗图为Actor1_1的角色和sv战斗图为Actor1_3的角色合成时，
 *    有50%的几率会将名称和战斗图像变为13号角色的名称和战斗图像。
 *   
 * ============================================================================
 *  ■ 使用规约
 * ============================================================================
 *   
 *   转载注明作者。
 *   禁止用于盈利。
 *   
 * ============================================================================
 *  ■ 更新
 * ==========================================================================
 * Version 1.00 [2020.12.8]:
 * - 完成插件。
 */
//=============================================================================
/*~struct~Lytb:
 * @param 名称
 * @desc 没有任何作用，仅用于备忘。
 * @default 新的炼妖突变
 * 
 * @param 目标
 * @desc 填入一个角色id。
 * @default 1
 * 
 * @param 材料A图像文件名
 * @desc 所需的材料。
 * @default Actor1_1
 * 
 * @param 材料B图像文件名
 * @desc 所需的材料。
 * @default $$$hld
 * 
 * @param 概率
 * @desc 成功的几率。
 * @default 0.3
 */ 
//=============================================================================
var Mx = Mx || {};
Mx.Mx_Pet = true;
Mx.Pet_Param = Mx.Pet_Param || {};

var Imported = Imported || {};

var Parameters = PluginManager.parameters('Mx_Pet');

Mx.Pet_Param.CZ_xs = Math.max(Number(Parameters['成长系数']), 0);
Mx.Pet_Param.CZ_sx = JSON.parse(Parameters['成长上限']);
for (var s=0;s<8;s++){
	Mx.Pet_Param.CZ_sx[s] = parseInt(Mx.Pet_Param.CZ_sx[s]);
}
Mx.Pet_Param.CZ_xx = JSON.parse(Parameters['成长下限']);
for (var s=0;s<8;s++){
	Mx.Pet_Param.CZ_xx[s] = Math.max(parseInt(Mx.Pet_Param.CZ_xx[s]), 0);
}
Mx.Pet_Param.CZ_name = Parameters['成长名称'];
Mx.Pet_Param.CZ_sjxs = Number(Parameters['成长随机系数']);
Mx.Pet_Param.BY_name = Parameters['变异名称'];
Mx.Pet_Param.BY_sd = eval(String(Parameters['角色色调']));
Mx.Pet_Param.BY_sdd = eval(String(Parameters['敌人色调']));
Mx.Pet_Param.BY_czts = Parameters['变异提升'];
Mx.Pet_Param.BY_sj = Math.max(Number(Parameters['随机变异']), 0);
Mx.Pet_Param.BY_dq = Math.max(Number(Parameters['敌群变异']), 0);
Mx.Pet_Param.BZ_mrid = Number(Parameters['捕捉id']);
Mx.Pet_Param.BZ_gs = Parameters['捕捉公式'];
Mx.Pet_Param.BZ_fsname = Parameters['放生名称'];
Mx.Pet_Param.Ly_name = Parameters['炼妖名称'];
Mx.Pet_Param.Ly_gs = Parameters['炼妖成长计算公式'];
Mx.Pet_Param.Ly_Tb = (Parameters['炼妖突变']?JSON.parse(Parameters['炼妖突变']):[]);
Mx.Pet_Param.CWCK_jg = Number(Parameters['宠物窗口间隔']);
Mx.Pet_Param.CWCK_sjsf = Number(Parameters['宠物窗口数据缩放']);

for (var s=0;s<Mx.Pet_Param.Ly_Tb.length;s++){
	Mx.Pet_Param.Ly_Tb[s] = JSON.parse(Mx.Pet_Param.Ly_Tb[s]);
}

var PetDrd = [];
//=============================================================================
//   基本数据
//=============================================================================

var CreatePet = function(id, add){
	if (!id) return;
	var pet = JsonEx.makeDeepCopy($dataActors[id]);
	pet.id = Math.max(1001, $dataActors.length);
	$dataActors[pet.id] = pet;
	if (add) $gameParty.addActor(pet.id);
	return pet.id;
}

var RemovePet = function(id){
	if (!id) return;
	if (id < 1001) return;
	$gameParty.removeActor(id);
	//$dataActors[id] = null;
	//$gameActors._data[id] = null;
}

var DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var data = DataManager_makeSaveContents.call(this);
    data = SavePet(data);
    return data;
};
  
var DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    DataManager_extractSaveContents.call(this, contents);
    LoadPet(contents);
};

var LoadPet = function(x){
	for (var s= 0;s<x.pet.length;s++){
		$dataActors[x.pet[s].id] = x.pet[s];
	}
}

var SavePet = function(x){
	x.pet = $dataActors.slice(1001);
	return x;
}

//=============================================================================
//   成长
//=============================================================================

var Game_Actor_setup_pet = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Game_Actor_setup_pet.call(this, actorId);
	this._CZ = CZcreate(actorId);
	this._CZparam = [0,0,0,0,0,0,0,0];
	this.CZrefresh();
	this._hp = this.mhp;
	this._mp = this.mmp;
	if ($dataActors[actorId].meta.by || $dataActors[actorId].by || Math.random() < Mx.Pet_Param.BY_sj) this.by = Mx.Pet_Param.BY_sd?Math.floor(Math.random() * 360):0;
};

var CZcreate = function(id){
	var CZ = [];
	for (var s=0;s<8;s++){
		var name = 'Cz'+s;
		if ($dataActors[id].meta[name]){
			var nu = parseInt($dataActors[id].meta[name]);
			if (Mx.Pet_Param.CZ_sjxs <= 0){
			} else if (Mx.Pet_Param.CZ_sjxs < 1) {
				nu = Math.floor(nu * ((1 - Mx.Pet_Param.CZ_sjxs) + Mx.Pet_Param.CZ_sjxs * Math.random() * 2));
			} else if (Mx.Pet_Param.CZ_sjxs >= 1) {
				nu = Math.floor((nu - Mx.Pet_Param.CZ_sjxs) + Mx.Pet_Param.CZ_sjxs * 2 * Math.random());
			}
			if ($gameActors.actor.by) nu = Math.floor(nu * Mx.Pet_Param.BY_czts);
			nu = Math.min(nu, Mx.Pet_Param.CZ_sx[s]);
			nu = Math.max(nu, Mx.Pet_Param.CZ_xx[s]);
			CZ.push(nu);
		} else {
			CZ.push(0);
		}
	}
	return CZ;
}

Game_BattlerBase.prototype.param = function(paramId) {
    var value = this.paramBase(paramId) + this.paramPlus(paramId) + (this._CZparam?this._CZparam[paramId]:0);
    value *= this.paramRate(paramId) * this.paramBuffRate(paramId);
    var maxValue = this.paramMax(paramId);
    var minValue = this.paramMin(paramId);
    return Math.round(value.clamp(minValue, maxValue));
};

Game_Actor.prototype.CZrefresh = function(){
	for (var s=0;s<8;s++){
		if (this._CZparam) this._CZparam[s] = Math.floor(this._CZ[s] * Mx.Pet_Param.CZ_xs * this._level);
	}
}

var Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    Game_Actor_refresh.call(this);
	this.CZrefresh();
};

//=============================================================================
//   选择窗口
//=============================================================================

function Window_PetA() {
    this.initialize.apply(this, arguments);
}

Window_PetA.prototype = Object.create(Window_Selectable.prototype);
Window_PetA.prototype.constructor = Window_PetA;

Window_PetA.prototype.initialize = function(x, y, width, height) {
    this._windowWidth = width;
    this._windowHeight = height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.opacity = 0;
    this.refresh();
    this.select(0);
};

Window_PetA.prototype.maxCols = function() {
    return 1;
};

Window_PetA.prototype.itemHeight = function() {
    return 50;
};

Window_PetA.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_PetA.prototype.item = function() {
    return this._data[this.index()];
};

Window_PetA.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_PetA.prototype.isEnabled = function(item) {
    return true;
};

Window_PetA.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_PetA.prototype.makeItemList = function() {
    this._data = this.PetList();
};

Window_PetA.prototype.PetList = function() {
    var list = [];
	for (var s=0;s<$gameParty.members().length;s++){
		if ($gameParty.members()[s].actorId() > 1000) list.push($gameParty.members()[s]);
	}
	return list;
};

Window_PetA.prototype.drawItem = function(index) {
    var pet = this._data[index];
    var rect = this.itemRect(index);
	var text = pet._name;
	var cz = false;
	for (var s=0;s<$gameParty.battleMembers().length;s++){
		if ($gameParty.battleMembers()[s]._actorId == pet._actorId) cz = true;
	}
	this.changeTextColor('#ff0000');
	var Size = this.contents.fontSize;
    this.contents.fontSize = 18;
	if (cz) this.drawText('[战]', 0, rect.y + 18, this._windowWidth - 40, 'right');
	this.changeTextColor('#ffffff');
    this.contents.fontSize = Size;
	if (pet == this.item()) {text = ' ' + text;this.changeTextColor('#89f5ff');}
	this.drawText(text, rect.x + 5, rect.y + 8);
	this.changeTextColor('#ffffff');
};

Window_PetA.prototype.setStatusWindow = function(statusWindow) {
    this._help = statusWindow;
    this.callUpdateHelp();
};

Window_PetA.prototype.setHelpWindowItem = function(item) {
    if (this._help) {
        this._help.setItem(item);
    }
};

Window_PetA.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
	this.refresh();
};

//=============================================================================
//   状态窗口
//=============================================================================

function Window_PetB() {
    this.initialize.apply(this, arguments);
}

Window_PetB.prototype = Object.create(Window_Base.prototype);
Window_PetB.prototype.constructor = Window_PetB;

Window_PetB.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
	this._windowWidth = ww;
	this._windowHeight = wh;
	this._x = wx;
	this._y = wy;
	this._pet = null;
	this.opacity = 255;
	this._jd = 0;
	this._dzA = 0;
	this._dzB = 0;
	this._sv = 1;
	this._speed = 12;
    this.refresh();
};

var tpZSY = function(wa, ha, wb, hb){
	var Wcz = Math.max(wb / wa, 1);
	var Hcz = Math.max(hb / ha, 1);
	if (Wcz == 1 && Hcz == 1){
		return [wb, hb];
	} else if (Wcz > Hcz){
		var rate = wa / wb;
		return [Math.floor(wb * rate), Math.floor(hb * rate)];
	} else if (Wcz < Hcz){
		var rate = ha / hb;
		return [Math.floor(wb * rate), Math.floor(hb * rate)];
	} else {
		var rate = wa / wb;
		return [Math.floor(wb * rate), Math.floor(hb * rate)];
	}
}

Window_PetB.prototype.refresh = function() {
    this.contents.clear();
	if (!this._pet) return;
    this.contents.fontSize = 22;
	this.changePaintOpacity(false);
	var SVzsqW = (this._windowWidth - 52) * 0.5;
	var SVzsqH = 274;
	this.contents.fillRect(0, 0, SVzsqW, 274, '#525252');
	this.contents.fillRect(SVzsqW + 16, 0, SVzsqW, SVzsqH, '#525252');
	this.changePaintOpacity(true);
	
	if (Mx.Mx_SuperSV && $dataActors[this._pet._actorId].meta.sv){
		this._speed = ($dataActors[this._pet._actorId].meta.SVspeed?$dataActors[this._pet._actorId].meta.SVspeed:12);
		var wjjn = this._pet.meta.sv + '/';
		var by = this._pet.by?this._pet.by:0;
		if (this._dzA == 0){
			for (var s=0;s<parseInt(this._pet.SVzs[0])+1;s++){
				ImageManager.reserveBigSvActor(wjjn, this._pet.meta.sv + '0_' + s, by);
			}
		}
		this._dzA++
		if (this._dzA > parseInt(this._pet.SVzs[0])) this._dzA = 0
		var bitmap = ImageManager.loadBigSvActor(wjjn, this._pet.meta.sv + '0_' + this._dzA, by);
		
		var w = bitmap.width;
		var h = bitmap.height;
		var zsy = tpZSY(SVzsqW, 254, w, h);
		var x = (SVzsqW + 16) + SVzsqW * 0.5 - zsy[0] * 0.5;
		var y = SVzsqH - zsy[1] - 20;
		this.contents.blt(bitmap, 0, 0, w, h, x, y, zsy[0], zsy[1]);
	} else {
		var by = this._pet.by?this._pet.by:0;
        var bitmap = ImageManager.loadSvActor(this._pet._battlerName, by);
        if (bitmap) {
			this._speed = ($dataActors[this._pet._actorId].meta.SVspeed?$dataActors[this._pet._actorId].meta.SVspeed:12);
            if (this._sv == 1) this._dzB++;
            if (this._sv == 0) this._dzB--;
			if (this._dzB == 2) this._sv = 0;
			if (this._dzB == 0) this._sv = 1;
			
            var cw = bitmap.width / 9;
            var ch = bitmap.height / 6;
            var zsy = tpZSY(SVzsqW, 254, cw, ch);
            var cx = cw * this._dzB;
            var cy = 0;
			var x = (SVzsqW + 16) + SVzsqW * 0.5 - zsy[0] * 0.5;
			var y = SVzsqH * 0.5 - zsy[1] * 0.5;
            this.contents.blt(bitmap, cx, cy, cw, ch, x, y, zsy[0], zsy[1]);
		}
	}
	
	if (this._pet.by) this.drawText(Mx.Pet_Param.BY_name, SVzsqW + 6, 0, SVzsqW, 'right');
	this.drawText('Lv.' + this._pet.level, SVzsqW + 23, 240, SVzsqW);
    this.contents.fontSize = 16;
	this.contents.fillRect(SVzsqW + 16, 287, SVzsqW, 15, '#000000');
	this.contents.fillRect(SVzsqW + 18, 289, this._pet._hp / this._pet.mhp * (SVzsqW-4), 11, '#ff4242');
	this.contents.fillRect(SVzsqW + 16, 311, SVzsqW, 15, '#000000');
	this.contents.fillRect(SVzsqW + 18, 313, this._pet._mp / this._pet.mmp * (SVzsqW-4), 11, '#42bfff');
	this.drawText(this._pet._hp + '/' + this._pet.mhp, SVzsqW + 11, 275, SVzsqW, 'right');
	this.drawText(this._pet._mp + '/' + this._pet.mmp, SVzsqW + 11, 300, SVzsqW, 'right');
	this.changePaintOpacity(false);
	this.contents.fillRect(0, 342, this._windowWidth, 3, '#ffffff');
	this.changePaintOpacity(true);
	
	var ZtSize = Mx.Pet_Param.CWCK_sjsf;
    this.contents.fontSize = 22 * ZtSize;
    for (var i = 0; i < 8; i++) {
        this.changePaintOpacity(false);
		var y = 350 + 15 * ZtSize;
        this.contents.fillRect(0, y + i * 30 * ZtSize, SVzsqW, 25 * ZtSize, '#84009c');
        this.contents.fillRect(SVzsqW + 16, y + i * 30 * ZtSize, SVzsqW, 25 * ZtSize, '#28009c');
        this.changePaintOpacity(true);
		
		y -= 5;
		var pcz = (1 - ZtSize) * 15;
		
        this.drawText(this._pet.param(i), SVzsqW - 105, y + i * 30 * ZtSize - pcz, 100, 'right');
		var textw = this.textWidth(' ' + TextManager.param(i) + Mx.Pet_Param.CZ_name);
		var tw = (SVzsqW - textw) * 0.8 - 5;
		var tX = SVzsqW + 16 + textw + Math.floor(tw * 0.2);
		var tW2 = SVzsqW - textw - Math.floor(tw * 0.2) - 5;
        this.contents.fillRect(tX, y+18 + i * 30 * ZtSize - pcz, tW2, 10 * ZtSize, '#000000');
        this.contents.fillRect(tX + 1, y+19 + i * 30 * ZtSize - pcz, this._pet._CZ[i] / Mx.Pet_Param.CZ_sx[i] * tW2, 8 * ZtSize, '#00da3e');
        this.drawText(this._pet._CZ[i], tX, y + i * 30 * ZtSize - pcz, tW2, 'right');
		
        this.changeTextColor(this.systemColor());
        this.drawText(' ' + TextManager.param(i), 0, y + i * 30 * ZtSize - pcz, 160);
        this.drawText(' ' + TextManager.param(i) + Mx.Pet_Param.CZ_name, SVzsqW + 16, y + i * 30 * ZtSize - pcz, 160);
        this.resetTextColor();
    }
	
	var anLK = Math.floor((SVzsqW - 200) / 3);
    this.changePaintOpacity(false);
    this.contents.fillRect(anLK, 291, 98, 38, '#4292ff');
    this.contents.fillRect(anLK * 2 + 100 - 1, 291, 98, 38, '#4292ff');
    this.changePaintOpacity(true);
};

Window_PetB.prototype.setItem = function(pet) {
	if (pet){
		this._pet = pet;
		this.refresh();
	}
};

Window_PetB.prototype.update = function() {
    this._jd++
	if (this._jd > this._speed){
		this._jd = 0;
		this.refresh();
	}
};
//=============================================================================
//   放生&改名
//=============================================================================

function Window_PetD() {
    this.initialize.apply(this, arguments);
}

Window_PetD.prototype = Object.create(Window_HorzCommand.prototype);
Window_PetD.prototype.constructor = Window_PetD;

Window_PetD.prototype.initialize = function(x, y, width, height) {
    this._windowWidth = width;
    this._windowHeight = height;
    Window_HorzCommand.prototype.initialize.call(this, x, y, width, height);
	this.opacity = 0;
	this.deselect();
};

Window_PetD.prototype.windowWidth = function() {
    return this._windowWidth;
};

Window_PetD.prototype.windowHeight = function() {
    return this._windowHeight;
};

Window_PetD.prototype.itemRect = function(index) {
    var rect = new Rectangle();
	var zkd = this._windowWidth - 36;
	rect.width = 100;
    rect.height = 40;
	var lk = Math.floor((zkd - 200) / 3);
	if (index == 0) rect.x = lk;
	if (index == 1) rect.x = lk * 2 + 100;
    rect.y = 0;
	
    return rect;
};

Window_PetD.prototype.makeCommandList = function() {
    this.addCommand('改名', 'gm');
    this.addCommand(Mx.Pet_Param.BZ_fsname, 'fs');
};

//=============================================================================
//   放生_确认
//=============================================================================

function Window_PetD_fs() {
    this.initialize.apply(this, arguments);
}

Window_PetD_fs.prototype = Object.create(Window_HorzCommand.prototype);
Window_PetD_fs.prototype.constructor = Window_PetD_fs;

Window_PetD_fs.prototype.initialize = function(x, y, width, height) {
    this._windowWidth = width;
    this._windowHeight = height;
    Window_HorzCommand.prototype.initialize.call(this, x, y, width, height);
	this.opacity = 255;
	this.deselect();
};

Window_PetD_fs.prototype.windowWidth = function() {
    return this._windowWidth;
};

Window_PetD_fs.prototype.windowHeight = function() {
    return this._windowHeight;
};

Window_PetD_fs.prototype.itemRect = function(index) {
    var rect = new Rectangle();
	rect.width = 100;
    rect.height = 40;
    rect.x = index * 130;
    rect.y = 0;
	
    return rect;
};

Window_PetD_fs.prototype.makeCommandList = function() {
    this.addCommand('确认', 'qr');
    this.addCommand('取消', 'qx');
};

//=============================================================================
//   宠物菜单
//=============================================================================

function Scene_Pet() {
  this.initialize.apply(this, arguments);
}

Scene_Pet.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Pet.prototype.constructor = Scene_Pet;

Scene_Pet.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Pet.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createPetBWindow();
    this.createPetAWindow();
    this.createPetDWindow();
    this.createPetDfsWindow();
};

Scene_Pet.prototype.createPetAWindow = function() {
	var x = this._PetWindowB.x + 10;
	var y = this._PetWindowB.y + 10;
	var jg = Mx.Pet_Param.CWCK_jg;
	var w = (this._PetWindowB._windowWidth - 36) * 0.5 + 8;
    this._PetWindowA = new Window_PetA(x, y, w, 290);
    this._PetWindowA.setHelpWindow(this._PetWindowB);
    this._PetWindowA.setStatusWindow(this._PetWindowB);
    this._PetWindowA.setHandler('ok',     this.A_cz.bind(this));
    this._PetWindowA.setHandler('cancel', this.popScene.bind(this));
    this.addChild(this._PetWindowA);
	this._PetWindowA.activate();
};

Scene_Pet.prototype.createPetBWindow = function() {
	var jg = Mx.Pet_Param.CWCK_jg;
	var w = Graphics.boxWidth - jg * 2;
	var h = Graphics.boxHeight - jg * 2;
    this._PetWindowB = new Window_PetB(jg, jg, w, h);
    this.addWindow(this._PetWindowB);
};

Scene_Pet.prototype.createPetDWindow = function() {
	var x = Mx.Pet_Param.CWCK_jg;
	var y = this._PetWindowA.y + 280;
	var w = (this._PetWindowB._windowWidth - 36) * 0.5 + 24;
    this._PetWindowD = new Window_PetD(x, y, w, 100);
    this._PetWindowD.setHandler('fs', this.D_fs.bind(this));
    this._PetWindowD.setHandler('gm', this.D_gm.bind(this));
    this._PetWindowD.setHandler('cancel', this.D_qx.bind(this))
    this.addChild(this._PetWindowD);
	this._PetWindowD.active = false;
	this._PetWindowD._index = 0;
	if (this._PetWindowA.PetList().length == 0) this._PetWindowD.hide();
};

Scene_Pet.prototype.createPetDfsWindow = function() {
	var y = this._PetWindowD.y;
    this._PetWindowDfs = new Window_PetD_fs(300, y, 270, 80);
    this._PetWindowDfs.setHandler('qr', this.Dfs_qr.bind(this));
    this._PetWindowDfs.setHandler('qx', this.Dfs_qx.bind(this));
    this._PetWindowDfs.setHandler('cancel', this.Dfs_qx.bind(this))
    this.addChild(this._PetWindowDfs);
	this._PetWindowDfs.active = false;
	this._PetWindowDfs._index = 0;
	this._PetWindowDfs.hide();
};

Scene_Pet.prototype.D_fs = function() {
	this._PetWindowDfs._index = 1;
	this._PetWindowDfs.activate();
	this._PetWindowDfs.show();
	this._PetWindowD.deselect();
};

Scene_Pet.prototype.D_gm = function() {
	SceneManager.push(Scene_Name);
	SceneManager.prepareNextScene(this._PetWindowA.item()._actorId, 7);
};

Scene_Pet.prototype.D_qx = function() {
	this._PetWindowA.activate();
	this._PetWindowD.deselect();
	this._PetWindowD._index = 0;
};

Scene_Pet.prototype.Dfs_qr = function() {
	SceneManager.goto(Scene_Map);
	RemovePet(this._PetWindowA.item()._actorId);
	SceneManager.goto(Scene_Pet);
};

Scene_Pet.prototype.Dfs_qx = function() {
	this._PetWindowDfs.hide();
	this._PetWindowDfs.deselect();
	this._PetWindowD._index = 1;
	this._PetWindowD.activate();
};

Scene_Pet.prototype.A_cz = function() {
	this._Agb = this._PetWindowA.index()
	this._PetWindowD._index = 0;
	this._PetWindowD.activate();
	this._PetWindowA.deselect();
    this._PetWindowA._index = this._Agb;
    this._PetWindowA.select(this._Agb);
	this._PetWindowA.refresh();
};

//=============================================================================
//   变异与捕捉
//=============================================================================

var Sprite_Enemy_setBattler_pet = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    Sprite_Enemy_setBattler_pet.call(this, battler);
    if (Math.random() < Mx.Pet_Param.BY_dq && !$dataEnemies[this._enemy._enemyId].meta.wfby){
		this._enemy.by = (Mx.Pet_Param.BY_sdd?Math.floor(Math.random() * 360):0);
	}
};

var Game_Enemy_battlerHue_pet = Game_Enemy.prototype.battlerHue;
Game_Enemy.prototype.battlerHue = function() {
	if (this.by) return this.by;
	Game_Enemy_battlerHue_pet.call(this);
};

Sprite_Actor.prototype.updateBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
    var name = this._actor.battlerName();
    if (this._battlerName !== name) {
        this._battlerName = name;
        this._mainSprite.bitmap = ImageManager.loadSvActor(name, this._actor.by?this._actor.by:0);
    }
};

if (Imported.YEP_X_AnimatedSVEnemies){ // 
Sprite_Enemy.prototype.updateSVBitmap = function() {
    Sprite_Battler.prototype.updateBitmap.call(this);
    var name = this._enemy.svBattlerName();
    if (this._svBattlerEnabled && this._svBattlerName !== name) {
      this._createdDummyMainSprite = false;
      this._svBattlerName = name;
      this._mainSprite.bitmap = ImageManager.loadSvActor(name, this._enemy.by?this._actor.by:0);
      this.adjustAnchor();
      this.refreshMotion();
      this.updateScale();
    } else if (this._svBattlerName === '') {
      this._svBattlerName = '';
      this._svBattlerEnabled = false;
      if (this._createdDummyMainSprite) return;
      this._createdDummyMainSprite = true;
      this._mainSprite = new Sprite_Base();
      this._mainSprite.anchor.x = 0.5;
      this._mainSprite.anchor.y = 1;
    }
};
}

Game_Enemy.prototype.Capture = function() {
	if (!eval(Mx.Pet_Param.BZ_gs)) return '捕捉失败'
	if ($dataEnemies[this._enemyId].meta.bkbz) return '不可捕捉'
    this._hidden = true;
    var id = ($dataEnemies[this._enemyId].meta.bzid?$dataEnemies[this._enemyId].meta.bzid:Mx.Pet_Param.BZ_mrid);
	var newid = CreatePet(id);
	var js = $gameActors.actor(newid);
	var gw = $dataEnemies[this._enemyId];
	js._name = gw.name;
	var gwcz = [];
	for (var s=0;s<8;s++){
		var name = 'Cz'+s;
		if ($dataEnemies[this._enemyId].meta[name]){
			var nu = parseInt($dataEnemies[this._enemyId].meta[name]);
			if (Mx.Pet_Param.CZ_sjxs <= 0){
			} else if (Mx.Pet_Param.CZ_sjxs < 1) {
				nu = Math.floor(nu * ((1 - Mx.Pet_Param.CZ_sjxs) + Mx.Pet_Param.CZ_sjxs * Math.random() * 2));
			} else if (Mx.Pet_Param.CZ_sjxs >= 1) {
				nu = Math.floor((nu - Mx.Pet_Param.CZ_sjxs) + Mx.Pet_Param.CZ_sjxs * 2 * Math.random());
			}
			if (this.by) nu = Math.floor(nu * Mx.Pet_Param.BY_czts);
			nu = Math.min(nu, Mx.Pet_Param.CZ_sx[s]);
			nu = Math.max(nu, Mx.Pet_Param.CZ_xx[s]);
			gwcz.push(nu);
		} else {
			gwcz.push(0);
		}
	}
	for(var s=0;s<8;s++){
		if (gwcz[s] != 0) js._CZ[s] = gwcz[s];
	}
	
	if (!$dataActors[newid].meta.SVspeed) $dataActors[newid].meta.SVspeed = $dataEnemies[this._enemyId].meta.SVspeed;
	js.meta.sv = $dataActors[newid].meta.sv;
	if (gw.meta.sv){
		js.meta.sv = gw.meta.sv;
		js.SVzs = this.SVzs;
	} else if (this._svBattlerName){
		js._battlerName = this._svBattlerName;
	} else {
		js._battlerName = gw.battlerName;
	}
	if (this.by) js.by = this.by;
	js.refresh();
	PetDrd.push(newid);
};

var Bzrd = function() {
	if (PetDrd.length > 0){
		for (var s=0;s<PetDrd.length;s++){
			$gameParty.addActor(PetDrd[s]);
			$gameActors.actor(PetDrd[s]).refresh()
		}
		PetDrd = [];
	}
};

//=============================================================================
//   炼妖
//=============================================================================

var Ly = function(ida, idb){
	var aa = $gameActors.actor(ida);
	var bb = $gameActors.actor(idb);
	
	var ch = (Math.random() < 0.5 ? aa : bb);
	var czA = aa._CZ;
	var czB = bb._CZ;
	for (var s=0;s<8;s++){
		var a = aa._CZ[s];
		var b = bb._CZ[s];
		ch._CZ[s] = Math.min(Math.floor(eval(Mx.Pet_Param.Ly_gs)), Mx.Pet_Param.CZ_sx[s]);
		ch._CZ[s] = Math.max(ch._CZ[s], Mx.Pet_Param.CZ_xx[s]);
	}
	
	var a_sk = aa.skills();
	var b_sk = bb.skills();
	for (var s=0;s<b_sk.length;s++){
		var uu = 0;
		for (var q=0;q<a_sk.length;q++){
			if (b_sk[s].id == a_sk[q].id) uu = 1;
		}
		if (uu == 0) a_sk.push(b_sk[s]);
	}
	var skSL = Math.floor(a_sk.length * Math.random());
	var newsk = [];
	for (var s=0;s<skSL;s++){
		var id = Math.floor(a_sk.length * Math.random());
		var jn = a_sk[id];
		newsk.push(jn);
		a_sk.splice(id, 1);
	}
	for (var s=0;s<newsk.length;s++){
		ch.learnSkill(newsk[s].id);
	}
	
	if (aa.by) var by = aa.by;
	if (bb.by) var by = bb.by;
	if (!ch.by && by) ch.by = by;
	if (aa.by && bb.by && Mx.Pet_Param.BY_sd) ch.by = Math.floor(Math.random() * 360);
	
	//
	var A_sv = (aa.meta.sv ? '$$$' + aa.meta.sv : aa._battlerName);
	var B_sv = (bb.meta.sv ? '$$$' + bb.meta.sv : bb._battlerName);
	var List = Mx.Pet_Param.Ly_Tb;
	var Lb = [];
	for (var s=0;s<List.length;s++){
		if (A_sv == List[s]['材料A图像文件名'] && B_sv == List[s]['材料B图像文件名']) Lb.push(List[s]);
		if (A_sv == List[s]['材料B图像文件名'] && B_sv == List[s]['材料A图像文件名']) Lb.push(List[s]);
	}
	if (Lb.length > 1){
		Lb = Lb[Math.floor(Math.random() * Lb.length)];
	} else if (Lb.length == 1){
		Lb = Lb[0];
	}
	if (Lb && Math.random() < parseInt(Lb['概率'])){
		var id = parseInt(Lb['目标']);
		if (Mx.Mx_SuperSV && $gameActors.actor(id).meta.sv){
			ch.meta.sv = $gameActors.actor(id).meta.sv;
			ch.SVzs = $gameActors.actor(id).SVzs;
		} else {
			ch.meta.sv = false;
			ch._battlerName = $gameActors.actor(id)._battlerName;
		}
		if ($dataActors[id].meta.SVspeed) $dataActors[ch._actorId].meta.SVspeed = $dataActors[id].meta.SVspeed;
		if ($gameActors.actor(id).meta.SVspeed) ch.meta.SVspeed = $gameActors.actor(id).meta.SVspeed;
		ch._name = $gameActors.actor(id)._name;
	}
	//
	
	ch.changeLevel(0);
	if (ch == aa) RemovePet(idb);
	if (ch == bb) RemovePet(ida);
	ch.refresh();
	Mx.Pet_Lyjg = ch;
}

//=============================================================================
//   炼妖材料窗体选择
//=============================================================================

function Window_LyS() {
    this.initialize.apply(this, arguments);
}

Window_LyS.prototype = Object.create(Window_HorzCommand.prototype);
Window_LyS.prototype.constructor = Window_LyS;

Window_LyS.prototype.initialize = function(x, y, winA, winB) {
    this._windowWidth = Graphics.boxWidth;
    this._windowHeight = Graphics.boxHeight;
    Window_HorzCommand.prototype.initialize.call(this, x, y, this._windowWidth, this._windowHeight);
	this._winA = winA;
	this._winB = winB;
	this.opacity = 0;
};

Window_LyS.prototype.windowWidth = function() {
    return this._windowWidth;
};

Window_LyS.prototype.windowHeight = function() {
    return this._windowHeight;
};

Window_LyS.prototype.itemRect = function(index) {
    var rect = new Rectangle();
	if (!this._winA){
		rect.width = 330;
		rect.height = 274;
		rect.x = index * 330;
		rect.y = 0;
	} else {
		rect.width = this._winA._windowWidth - 36;
		rect.height = 274;
		rect.x = (index == 0 ? Mx.Pet_Param.CWCK_jg : Mx.Pet_Param.CWCK_jg * 2 + this._winA._windowWidth);
		rect.y = Mx.Pet_Param.CWCK_jg;
	}
	
    return rect;
};

Window_LyS.prototype.makeCommandList = function() {
    this.addCommand(' ', 'WinA');
    this.addCommand(' ', 'WinB');
};

//=============================================================================
//   炼妖选择窗口
//=============================================================================

function Window_PetLyA() {
    this.initialize.apply(this, arguments);
}

Window_PetLyA.prototype = Object.create(Window_Selectable.prototype);
Window_PetLyA.prototype.constructor = Window_PetLyA;

Window_PetLyA.prototype.initialize = function(x, y, width, height) {
    this._windowWidth = width;
    this._windowHeight = height;
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	this.opacity = 255;
    this.refresh();
    this.select(0);
};

Window_PetLyA.prototype.maxCols = function() {
    return 1;
};

Window_PetLyA.prototype.itemHeight = function() {
    return 50;
};

Window_PetLyA.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_PetLyA.prototype.item = function() {
    return this._data[this.index()];
};

Window_PetLyA.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this._data[this.index()]);
};

Window_PetLyA.prototype.isEnabled = function(item) {
    return true;
};

Window_PetLyA.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_PetLyA.prototype.makeItemList = function() {
    this._data = this.PetList();
};

Window_PetLyA.prototype.PetList = function() {
    var list = [];
	for (var s=0;s<$gameParty.members().length;s++){
		if ($gameParty.members()[s].actorId() > 1000 && !$gameParty.members()[s].LYXZ) list.push($gameParty.members()[s]);
	}
	return list;
};

Window_PetLyA.prototype.drawItem = function(index) {
    var pet = this._data[index];
    var rect = this.itemRect(index);
	var text = pet._name;
	var cz = false;
	for (var s=0;s<$gameParty.battleMembers().length;s++){
		if ($gameParty.battleMembers()[s]._actorId == pet._actorId) cz = true;
	}
	this.changeTextColor('#ff0000');
	var Size = this.contents.fontSize;
    this.contents.fontSize = 18;
	if (cz) this.drawText('[战]', 0, rect.y + 18, this._windowWidth - 40, 'right');
	this.changeTextColor('#ffffff');
    this.contents.fontSize = Size;
	if (pet == this.item()) {text = ' ' + text;this.changeTextColor('#89f5ff');}
	this.drawText(text, rect.x + 5, rect.y + 8);
	this.changeTextColor('#ffffff');
};

Window_PetLyA.prototype.setStatusWindow = function(statusWindow) {
    this._help = statusWindow;
    this.callUpdateHelp();
};

Window_PetLyA.prototype.setHelpWindowItem = function(item) {
    if (this._help) {
        this._help.setItem(item);
    }
};

Window_PetLyA.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
	this.refresh();
};

//=============================================================================
//   炼妖状态窗口
//=============================================================================

function Window_PetLyB() {
    this.initialize.apply(this, arguments);
}

Window_PetLyB.prototype = Object.create(Window_Base.prototype);
Window_PetLyB.prototype.constructor = Window_PetLyB;

Window_PetLyB.prototype.initialize = function(wx, wy, ww, wh) {
    Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
	this._windowWidth = ww;
	this._windowHeight = wh;
	this._x = wx;
	this._pet = null;
	this.opacity = 255;
	this._jd = 0;
	this._dzA = 0;
	this._dzB = 0;
	this._sv = 1;
	this._speedA = 12;
	this._speedB = 12;
    this.refresh();
};

Window_PetLyB.prototype.refresh = function() {
    this.contents.clear();
    this.drawZT(0, this._pet);
};

Window_PetLyB.prototype.drawZT = function(bx, XZpet) {
	var XXX = bx || 0;
    this.contents.fontSize = 22;
	this.changePaintOpacity(false);
	var SVzsqW = this._windowWidth - 36;
	var SVzsqH = 274;
	this.contents.fillRect(XXX, 0, SVzsqW, SVzsqH, '#525252');
	this.changePaintOpacity(true);
	
	if (XZpet){
	if (Mx.Mx_SuperSV && $dataActors[XZpet._actorId].meta.sv){
		this._speed = ($dataActors[XZpet._actorId].meta.SVspeed?$dataActors[XZpet._actorId].meta.SVspeed:12);
		var wjjn = XZpet.meta.sv + '/';
		var by = XZpet.by?XZpet.by:0;
		if (this._dzA == 0){
			for (var s=0;s<parseInt(XZpet.SVzs[0])+1;s++){
				ImageManager.reserveBigSvActor(wjjn, XZpet.meta.sv + '0_' + s, by);
			}
		}
		this._dzA++
		if (this._dzA > parseInt(XZpet.SVzs[0])) this._dzA = 0
		var bitmap = ImageManager.loadBigSvActor(wjjn, XZpet.meta.sv + '0_' + this._dzA, by);
		
		var w = bitmap.width;
		var h = bitmap.height;
		var zsy = tpZSY(SVzsqW, 254, w, h);
		var x = XXX + SVzsqW * 0.5 - zsy[0] * 0.5;
		var y = SVzsqH - zsy[1] - 20;
		this.contents.blt(bitmap, 0, 0, w, h, x, y, zsy[0], zsy[1]);
	} else {
		var by = XZpet.by?XZpet.by:0;
        var bitmap = ImageManager.loadSvActor(XZpet._battlerName, by);
        if (bitmap) {
			this._speed = ($dataActors[XZpet._actorId].meta.SVspeed?$dataActors[XZpet._actorId].meta.SVspeed:12);
            if (this._sv == 1) this._dzB++;
            if (this._sv == 0) this._dzB--;
			if (this._dzB == 2) this._sv = 0;
			if (this._dzB == 0) this._sv = 1;
			
            var cw = bitmap.width / 9;
            var ch = bitmap.height / 6;
            var zsy = tpZSY(SVzsqW, 254, cw, ch);
            var cx = cw * this._dzB;
            var cy = 0;
			var x = XXX + SVzsqW * 0.5 - zsy[0] * 0.5;
			var y = SVzsqH * 0.5 - zsy[1] * 0.5;
            this.contents.blt(bitmap, cx, cy, cw, ch, x, y, zsy[0], zsy[1]);
		}
	}
	}
	
	if (XZpet && XZpet.by) this.drawText(Mx.Pet_Param.BY_name, XXX - 10, 0, SVzsqW, 'right');
	this.drawText('Lv.' + (XZpet?XZpet.level:'？'), XXX + 7, 240, SVzsqW);
	if (XZpet) this.drawText(XZpet._name, XXX + 7, 0, SVzsqW);
    this.contents.fontSize = 16;
	
	if (!XZpet){
		var XZpet = {
			mhp:0,_hp:0,
			mmp:0,_mp:0,
			_CZ:[0,0,0,0,0,0,0,0]
		}
	}
	
	this.contents.fillRect(XXX, 287, SVzsqW, 15, '#000000');
	this.contents.fillRect(XXX + 2, 289, XZpet._hp / XZpet.mhp * (SVzsqW-4), 11, '#ff4242');
	this.contents.fillRect(XXX, 311, SVzsqW, 15, '#000000');
	this.contents.fillRect(XXX + 2, 313, XZpet._mp / XZpet.mmp * (SVzsqW-4), 11, '#42bfff');
	this.drawText(XZpet._hp + '/' + XZpet.mhp, XXX - 5, 275, SVzsqW, 'right');
	this.drawText(XZpet._mp + '/' + XZpet.mmp, XXX - 5, 300, SVzsqW, 'right');
	this.changePaintOpacity(false);
	this.contents.fillRect(0, 342, this._windowWidth, 3, '#ffffff');
	this.changePaintOpacity(true);
	
	var ZtSize = Mx.Pet_Param.CWCK_sjsf;
    this.contents.fontSize = 22 * ZtSize;
    for (var i = 0; i < 8; i++) {
        this.changePaintOpacity(false);
		var y = 350 + 15 * ZtSize;
        this.contents.fillRect(XXX, y + i * 30 * ZtSize, SVzsqW, 25 * ZtSize, '#28009c');
        this.changePaintOpacity(true);
		
		y -= 5;
		var pcz = (1 - ZtSize) * 15;
		
		var textw = this.textWidth(' ' + TextManager.param(i) + Mx.Pet_Param.CZ_name);
		var tw = (SVzsqW - textw) * 0.8 - 5;
		var tX = XXX + textw + Math.floor(tw * 0.2);
		var tW2 = SVzsqW - textw - Math.floor(tw * 0.2) - 5;
        this.contents.fillRect(tX, y+18 + i * 30 * ZtSize - pcz, tW2, 10 * ZtSize, '#000000');
        this.contents.fillRect(tX + 1, y+19 + i * 30 * ZtSize - pcz, XZpet._CZ[i] / Mx.Pet_Param.CZ_sx[i] * tW2, 8 * ZtSize, '#00da3e');
        this.drawText(XZpet._CZ[i], tX, y + i * 30 * ZtSize - pcz, tW2, 'right');
		
        this.changeTextColor(this.systemColor());
        this.drawText(' ' + TextManager.param(i) + Mx.Pet_Param.CZ_name, XXX, y + i * 30 * ZtSize - pcz, 160);
        this.resetTextColor();
    }
};

Window_PetLyB.prototype.setItem = function(pet) {
	if (pet){
		this._pet = pet;
		this.refresh();
	}
};

Window_PetLyB.prototype.update = function() {
    this._jd++
	if (this._jd > this._speed){
		this._jd = 0;
		this.refresh();
	}
};

//=============================================================================
//  炼妖_确认
//=============================================================================

function Window_Ly_qr() {
    this.initialize.apply(this, arguments);
}

Window_Ly_qr.prototype = Object.create(Window_HorzCommand.prototype);
Window_Ly_qr.prototype.constructor = Window_Ly_qr;

Window_Ly_qr.prototype.initialize = function(x, y, width, height) {
    this._windowWidth = width;
    this._windowHeight = height;
    Window_HorzCommand.prototype.initialize.call(this, x, y, width, height);
	this.opacity = 255;
	this.deselect();
};

Window_Ly_qr.prototype.windowWidth = function() {
    return this._windowWidth;
};

Window_Ly_qr.prototype.windowHeight = function() {
    return this._windowHeight;
};

Window_Ly_qr.prototype.itemRect = function(index) {
    var rect = new Rectangle();
	rect.width = 100;
    rect.height = 40;
    rect.x = index * 130;
    rect.y = 0;
	
    return rect;
};

Window_Ly_qr.prototype.makeCommandList = function() {
    this.addCommand('确认', 'qr');
    this.addCommand('取消', 'qx');
};

//=============================================================================
//   炼妖菜单
//=============================================================================

function Scene_Ly() {
  this.initialize.apply(this, arguments);
}

Scene_Ly.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Ly.prototype.constructor = Scene_Ly;

Scene_Ly.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Ly.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.XZpet = [];
	this._jd = 0;
	this._Lykg = 0;
    this.createLyB1Window();
    this.createLyB2Window();
    this.createLySWindow();
    this.createLyA1Window();
    this.createLyA2Window();
    this.createLyqrWindow();
	for (var s=0;s<$gameParty.members().length;s++){
		$gameParty.members()[s].LYXZ = false;
	}
};

Scene_Ly.prototype.createLyB1Window = function() {
	var jg = Mx.Pet_Param.CWCK_jg;
	var w = (Graphics.boxWidth - jg * 3) * 0.5;
	var h = Graphics.boxHeight - jg * 2;
    this._PetWindowB1 = new Window_PetLyB(jg, jg, w, h);
    this.addChild(this._PetWindowB1);
};

Scene_Ly.prototype.createLyB2Window = function() {
	var jg = Mx.Pet_Param.CWCK_jg;
	var w = (Graphics.boxWidth - jg * 3) * 0.5;
	var h = Graphics.boxHeight - jg * 2;
    this._PetWindowB2 = new Window_PetLyB(jg*2+w, jg, w, h);
    this.addChild(this._PetWindowB2);
};

Scene_Ly.prototype.createLySWindow = function() {
    this._LysWindow = new Window_LyS(0, 0, this._PetWindowB1, this._PetWindowB2);
    this._LysWindow.setHandler('ok',     this.LySxr.bind(this));
    this._LysWindow.setHandler('cancel', this.popScene.bind(this));
    this._LysWindow.setHandler('pagedown', this.Lyks.bind(this));
    this._LysWindow.setHandler('pageup',   this.Lyks.bind(this));
    this.addChild(this._LysWindow);
	this._LysWindow.activate();
};

Scene_Ly.prototype.createLyA1Window = function() {
	var jg = Mx.Pet_Param.CWCK_jg;
	var w = (Graphics.boxWidth - jg * 3) * 0.5;
	var h = Graphics.boxHeight - jg * 2;
    this._LyWindowA1 = new Window_PetLyA(jg, jg, w, h);
    this._LyWindowA1.setHelpWindow(this._PetWindowB2);
    this._LyWindowA1.setStatusWindow(this._PetWindowB2);
    this._LyWindowA1.setHandler('ok',     this.LyAqr.bind(this, 1));
    this._LyWindowA1.setHandler('cancel', this.LyAqx.bind(this, 1));
    this.addWindow(this._LyWindowA1);
	this._LyWindowA1.hide();
};

Scene_Ly.prototype.createLyA2Window = function() {
	var jg = Mx.Pet_Param.CWCK_jg;
	var w = (Graphics.boxWidth - jg * 3) * 0.5;
	var h = Graphics.boxHeight - jg * 2;
    this._LyWindowA2 = new Window_PetLyA(jg*2+w, jg, w, h);
    this._LyWindowA2.setHelpWindow(this._PetWindowB1);
    this._LyWindowA2.setStatusWindow(this._PetWindowB1);
    this._LyWindowA2.setHandler('ok',     this.LyAqr.bind(this, 2));
    this._LyWindowA2.setHandler('cancel', this.LyAqx.bind(this, 2));
    this.addWindow(this._LyWindowA2);
	this._LyWindowA2.hide();
};

Scene_Ly.prototype.createLyqrWindow = function() {
	var y = Mx.Pet_Param.CWCK_jg + 290;
	var x = (Graphics.boxWidth - 270) * 0.5;
    this._LyqrWindow = new Window_Ly_qr(x, y, 270, 80);
    this._LyqrWindow.setHandler('qr', this.Lyqr.bind(this));
    this._LyqrWindow.setHandler('qx', this.Lyqr_qx.bind(this));
    this._LyqrWindow.setHandler('cancel', this.Lyqr_qx.bind(this))
    this.addChild(this._LyqrWindow);
	this._LyqrWindow.active = false;
	this._LyqrWindow._index = 0;
	this._LyqrWindow.hide();
};

Scene_Ly.prototype.LySxr = function() {
	if (this._LysWindow._index == 0){
		this.XZpet[0] = this._PetWindowB1._pet;
		this._LyWindowA2.select(0);
		this._LyWindowA2.updateHelp();
		this._LyWindowA2.activate();
		this._LyWindowA2.show();
		this._PetWindowB2.hide();
	}
	if (this._LysWindow._index == 1){
		this.XZpet[1] = this._PetWindowB2._pet;
		this._LyWindowA1.select(0);
		this._LyWindowA1.updateHelp();
		this._LyWindowA1.activate();
		this._LyWindowA1.show();
		this._PetWindowB1.hide();
	}
	this._LysWindow.deselect();
};

Scene_Ly.prototype.LyAqx = function(id) {
	if (id == 2){
		this._PetWindowB1._pet = this.XZpet[0];
		this._PetWindowB1.refresh();
	}
	if (id == 1){
		this._PetWindowB2._pet = this.XZpet[1];
		this._PetWindowB2.refresh();
	}
	this._LyWindowA1.hide();
	this._LyWindowA2.hide();
	this._LyWindowA1.deselect();
	this._LyWindowA2.deselect();
	this._LysWindow.activate();
	this._PetWindowB1.show();
	this._PetWindowB2.show();
};

Scene_Ly.prototype.LyAqr = function(id) {
	if (id == 2){
		if (this.XZpet[0]) this.XZpet[0].LYXZ = false;
		this.XZpet[0] = this._PetWindowB1._pet;
		if (this._PetWindowB1._pet) this._PetWindowB1._pet.LYXZ = true;
		this._PetWindowB1.refresh();
	}
	if (id == 1){
		if (this.XZpet[1]) this.XZpet[1].LYXZ = false;
		this.XZpet[1] = this._PetWindowB2._pet;
		if (this._PetWindowB2._pet) this._PetWindowB2._pet.LYXZ = true;
		this._PetWindowB2.refresh();
	}
	this._LyWindowA1.hide();
	this._LyWindowA2.hide();
	this._LyWindowA1.deselect();
	this._LyWindowA2.deselect();
	this._LysWindow.activate();
	this._PetWindowB1.show();
	this._PetWindowB2.show();
};

Scene_Ly.prototype.Lyks = function() {
	if (this._PetWindowB1._pet && this._PetWindowB2._pet){
		this._LyqrWindow.activate();
		this._LyqrWindow.show();
		this._LysWindow.deselect();
	} else {
		SoundManager.playBuzzer();
		this._LysWindow.activate();
	}
};

Scene_Ly.prototype.Lyqr = function() {
	this._LyqrWindow.deselect();
	this._LyqrWindow.hide();
	this._LysWindow.deselect();
	this._Lykg = 1;
};

Scene_Ly.prototype.Lyqr_qx = function() {
	this._LyqrWindow.deselect();
	this._LyqrWindow.hide();
	this._LysWindow.activate();
};

Scene_Ly.prototype.update = function() {
	Scene_MenuBase.prototype.update.call(this);
	if (this._Lykg == 1){
		var mbX = (Graphics.boxWidth - this._PetWindowB1._windowWidth) * 0.5;
		this._jd++
		if (this._jd > 20){
			this._PetWindowB1._x += Math.floor(Graphics.boxWidth * 0.005);
			this._PetWindowB1.move(this._PetWindowB1._x, Mx.Pet_Param.CWCK_jg, this._PetWindowB1._windowWidth, this._PetWindowB1._windowHeight);
			this._PetWindowB2._x -= Math.floor(Graphics.boxWidth * 0.005);
			this._PetWindowB2.move(this._PetWindowB2._x, Mx.Pet_Param.CWCK_jg, this._PetWindowB2._windowWidth, this._PetWindowB2._windowHeight);
		}

		if (this._PetWindowB2._x <= mbX){
			SoundManager.playUseItem()
			Ly(this._PetWindowB1._pet._actorId, this._PetWindowB2._pet._actorId);
			SceneManager.push(Scene_Lyjg);
		}
	}
};

//=============================================================================
//   炼妖结果
//=============================================================================

function Scene_Lyjg() {
  this.initialize.apply(this, arguments);
}

Scene_Lyjg.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Lyjg.prototype.constructor = Scene_Lyjg;

Scene_Lyjg.prototype.initialize = function() {
  Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Lyjg.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createLyjgWindow();
	this.createTCWindow();
};

Scene_Lyjg.prototype.createLyjgWindow = function() {
	var jg = Mx.Pet_Param.CWCK_jg;
	var w = (Graphics.boxWidth - jg * 3) * 0.5;
	var h = Graphics.boxHeight - jg * 2;
	var x = (Graphics.boxWidth - w) * 0.5;
    this._LyjgWindow = new Window_PetLyB(x, jg, w, h);
    this.addWindow(this._LyjgWindow);
	this._LyjgWindow._pet = Mx.Pet_Lyjg;
	this._LyjgWindow.refresh();
};

Scene_Lyjg.prototype.createTCWindow = function() {
    this._TcWindow = new Window_Ly_qr(-999, -999, 0, 0);
    this._TcWindow.setHandler('qx', this.popScene.bind(this));
    this._TcWindow.setHandler('cancel', this.popScene.bind(this))
    this.addChild(this._TcWindow);
};


