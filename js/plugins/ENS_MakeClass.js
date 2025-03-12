//=============================================================================
 /*:
 * @plugindesc 佣兵宠物插件 VER002
 * @author Nesside-上官春运 QQ:53899358
 * 
 * 
 * @help
 * 帮助文档
 * ============================================================================
 * 版本更新
 * VER002 修复随机名字出错
 * 
 * 
 * 
 * 
 * 
 * 可以用于宠物捕捉类游戏方式
 * 适用
 * 口袋妖怪类
 * 佣兵游戏类
 * 等等
 * 
 * 
 * 
 * 输入生成例子如下
 * ENS_MakeClass.Materials('Actor1_1',0,'Actor1',[1,1,2,3],0,'Actor1',1,100,'','','','','',[30,20,30,30],'','','','','s')
 * ENS_MakeClass.Materials(战斗图文件名,行走图索引,行走图文件名,初始拥有装备,头像索引,头像文件名,人物初始等级,人物最大等级,人物名称,人物昵称,人物备注,人物列传,人物初始特性,经验值曲线,职业特性,职业技能,职业名称,职业备注,成长率)
 * s
 * 如果要换掉默认的随机名字,按照一样的格式写入就行
 * 
 * 除等级和最大等级和成长率,其它一切都可以默认生成,当然,人物战斗图之类的还是要的吧?!
 * ENS_MakeClass.Materials('','','','','','',1,200,'','','','','','','','','','','s')
 * 
 * 成长率分S,A,B,C级,可以独立写入,写法如下
 * wparams = {uhp:数值,ump:数值,ustr:数值,udef:数值,umat:数值,umdf:数值,uagi:数值,uluk:数值}
 * 图索引[从左到右，从上到下，从0开始识别]
 * 经验值曲线写法
 * [30,20,30,30]
 * 自带技能及特性
 * 写法{"level":1,"note":"","skillId":8},{"level":1,"note":"","skillId":8}
 * 
 * 
 * 注意:
 * 生成的人物会在你保存游戏之后写入数据库,如果不保存则不写入
 * 
 * 
 */
//=============================================================================
ENS_MakeClass = {};
ENS_MakeClass.RandomNum = function(Min, Max) {
	return parseInt(Math.random() * (Max - Min + 1) + Min, 10)
};
ENS_MakeClass.makesetname = function() {
	var familyNames = '阿博特,阿贝,亚伯拉罕,艾奇逊,阿克曼,亚当,亚当斯,艾迪生,阿德拉,阿德莱德,阿道夫,阿格尼丝,艾伯特,奥尔科特,奥尔丁顿,奥尔德里奇,亚历克,亚历山大,阿尔弗列德,艾尔弗雷德,艾丽丝,阿利克,艾尔索普,阿利,阿米利亚,安德森,安德鲁,安,安娜,安妮,安东尼,安托瓦妮特,阿拉贝拉,阿奇博尔德,阿姆斯特朗,巴比特,培根,巴纳德,巴尼,巴雷特,巴里,巴特,巴塞洛缪,巴特利特,巴顿,鲍尔,比尔德,博福特,比彻,贝克';
	var givenNames = '贝基,比尔博姆,贝尔,贝拉米,贝尔,贝洛克,本,本尼迪克特,本杰明,贝内特,本森,边沁,本瑟姆,贝克莱,伯克利,伯纳尔,伯纳德,伯纳尔德,伯特,伯莎,伯蒂,伯特伦,贝丝,贝西墨,贝色麦,贝西,白求恩,比顿,贝齐,贝蒂,比尔,比利,比勒尔,布莱克,布莱克,布卢默,布龙菲尔德,布洛姆,菲尔德,布劳,布卢姆,贝西墨,贝色麦,贝西,白求恩,比顿,贝齐,贝蒂,比尔,比利,比勒尔,布莱克,布莱克,布卢默,布龙菲尔德,布洛姆菲尔德,布劳,布卢尔,布卢姆,鲍勃,博比,博斯韦尔,鲍恩,鲍曼,波伊尔波义耳,布拉德利,布雷,布鲁斯特,布里奇斯,布赖特,布罗德,勃朗特,白朗蒂,布鲁克,布朗,布朗,勃朗宁,布朗宁,布鲁斯,布鲁诺,布赖恩,布赖斯,巴克,巴克耳,布尔韦尔,布尔沃,布尼安,伯克,伯恩,琼斯,彭斯,伯恩斯,勃特勒,巴特勒,拜伦,卡拉米,坎普,凯里,凯雷,卡尔,卡莱尔,卡门,卡内基,卡罗琳,卡彭特,嘉利,卡丽,卡罗尔,卡特,凯瑟琳,塞西利亚,张伯伦,查普林,卓别麟,查普曼,查尔斯,查理,查利,夏洛蒂,夏洛特,查尔斯,查理,乔叟,切斯特顿,蔡尔德,蔡尔德,克赖斯特,克里琴斯,克里斯蒂安娜,克里斯蒂,克里斯托弗,克里斯蒂,丘奇,丘吉尔,锡西,克拉彭,克拉拉,克莱尔,克拉丽莎,克拉克,克里曼斯,克莱门斯,克莱门特,科克尔,科菲,科尔克拉夫,柯勒律治,科尔里奇,柯林斯,康芒斯,科南,康格里夫,康尼,康纳,康拉德,康斯坦斯,库克,库珀,科波菲尔,柯顿,科弗代尔,考珀,克雷吉,克兰,克赖顿,克罗夫特,克罗夫茨,克伦威尔,克洛宁,克罗宁';
	var familyNames = familyNames.split(',');
	var givenNames = givenNames.split(',');
	var a = ENS_MakeClass.RandomNum(0, familyNames.length - 1);
	var b = ENS_MakeClass.RandomNum(0, givenNames.length - 1);
	return familyNames[a] + '.' + givenNames[b]
}
ENS_MakeClass.Materials = function(ubname, ucindex, ucname, uequips, ufindex, ufname, uilevel, umlevel, uname, unickname, unote, upfile, utraits, wexp, wtraits, wlnings, wname, wnote, wparams) {
	for (var i = 0; i < $dataActors.length; i++);
	$dataActors[i] = {
		battlerName: ubname || "Actor1_1",
		characterIndex: ucindex || 0,
		characterName: ucname || "Actor1",
		classId: i,
		equips: uequips || [],
		faceIndex: ufindex || 0,
		faceName: ufname || "Actor1",
		id: i,
		initialLevel: uilevel || 1,
		maxLevel: umlevel || 99,
		meta: {},
		name: uname || ENS_MakeClass.makesetname(),
		nickname: unickname || "",
		note: unote || "",
		profile: upfile || "",
		traits: utraits || []
	}
	var Numx = ENS_MakeClass.RandomNum
	switch (wparams) {
	case 's':
		wparams = {
			uhp: Numx(40, 60),
			ump: Numx(30, 40),
			ustr: Numx(3, 5),
			udef: Numx(3, 5),
			umat: Numx(3, 5),
			umdf: Numx(3, 5),
			uagi: (3, 5),
			uluk: Numx(3, 5)
		}
		break;
	case 'a':
		wparams = {
			uhp: Numx(30, 50),
			ump: Numx(20, 30),
			ustr: Numx(2, 4),
			udef: Numx(2, 4),
			umat: Numx(2, 4),
			umdf: Numx(2, 4),
			uagi: (2, 4),
			uluk: Numx(2, 4)
		}
		break;
	case 'b':
		wparams = {
			uhp: Numx(20, 40),
			ump: Numx(10, 20),
			ustr: Numx(1, 3),
			udef: Numx(1, 3),
			umat: Numx(1, 3),
			umdf: Numx(1, 3),
			uagi: (1, 3),
			uluk: Numx(1, 3)
		}
		break;
	case 'c':
		wparams = {
			uhp: Numx(10, 30),
			ump: Numx(5, 10),
			ustr: Numx(1, 2),
			udef: Numx(1, 2),
			umat: Numx(1, 2),
			umdf: Numx(1, 2),
			uagi: (1, 2),
			uluk: Numx(1, 2)
		}
		break;
	default:
		wparams
		break
	};
	var hp = [null],
		mp = [null],
		str = [null],
		def = [null],
		mat = [null],
		mdf = [null],
		agi = [null],
		luk = [null];
	for (var ib = 0; ib < $dataClasses.length; ib++);
	for (var ic = 0; ic < $dataActors[i].maxLevel; ic++) {
		hp.push(hp[ic] + wparams.uhp + Numx(10, 30));
		mp.push(mp[ic] + wparams.ump + Numx(5, 10));
		str.push(str[ic] + wparams.ustr + Numx(1, 3));
		def.push(def[ic] + wparams.udef + Numx(1, 3));
		mat.push(mat[ic] + wparams.umat + Numx(1, 3));
		mdf.push(mdf[ic] + wparams.umdf + Numx(1, 3));
		agi.push(agi[ic] + wparams.uagi + Numx(1, 3));
		luk.push(luk[ic] + wparams.uluk + Numx(1, 3))
	}
	$dataClasses[ib] = {
		id: ib,
		expParams: wexp || [30, 20, 30, 30],
		meta: {},
		traits: wtraits || [{
			code: 23,
			dataId: 0,
			value: 1
		}, {
			code: 22,
			dataId: 0,
			value: 0.95
		}, {
			code: 22,
			dataId: 1,
			value: 0.05
		}, {
			code: 22,
			dataId: 2,
			value: 0.04
		}, {
			code: 41,
			dataId: 1,
			value: 0
		}, {
			code: 51,
			dataId: 2,
			value: 0
		}, {
			code: 52,
			dataId: 1,
			value: 0
		}, {
			code: 52,
			dataId: 3,
			value: 0
		}, {
			code: 52,
			dataId: 5,
			value: 0
		}],
		learnings: wlnings || [],
		name: wname || "平民",
		note: wnote || "",
		params: [hp, mp, str, def, mat, mdf, agi, luk]
	};
	$gameActors.actor(i);
	$gameParty.addActor(i);
	console.log("系统创造了一个人物，编号:" + i + "名称:" + $dataActors[i].name)
}
ENS_MakeClass.Actorsdataseveinfo = function() {
	var Actorsdata = $dataActors;
	var Classesdata = $dataClasses;
	var Eventsave = {
		id: $gameMap.mapId(),
		mapdata: $dataMap.events
	}
	var data = JSON.stringify(Actorsdata, null, 2);
	var data2 = JSON.stringify(Classesdata, null, 2);
	var fs = require('fs');
	var dirPath = function() {
			var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
			if (path.match(/^\/([A-Z]\:)/)) {
				path = path.slice(1)
			}
			return decodeURIComponent(path)
		};
	var filePath = dirPath() + 'Actors.json';
	var filePath2 = dirPath() + 'Classes.json';
	fs.writeFileSync(filePath, data);
	fs.writeFileSync(filePath2, data2)
}
ENS_MakeClass.Actorsdatasevemake = Scene_Save.prototype.onSaveSuccess;
Scene_Save.prototype.onSaveSuccess = function() {
	ENS_MakeClass.Actorsdatasevemake.call(this);
	ENS_MakeClass.Actorsdataseveinfo()
}