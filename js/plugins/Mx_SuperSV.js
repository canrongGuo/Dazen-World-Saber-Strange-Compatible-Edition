//=============================================================================
// Mx_SuperSV.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc v1.04 [多帧图片代替SV战斗图]
 * @author 目眩
 *
 * @help
 * ============================================================================
 *  ■ 说明
 * ============================================================================
 *
 * 可以使用图片来代替SV战斗图的显示，不限帧数。
 * 建议搭配动作序列使用。
 *
 * 将图片放在\img\sv_actors\sv\[基础名称]目录下。
 *
 * ============================================================================
 *  ■ 标签
 * ============================================================================
 * 
 * 各个动作的index：
 * walk    : 0
 * wait    : 1
 * chant   : 2
 * guard   : 3
 * damage  : 4
 * evade   : 5
 * thrust  : 6
 * swing   : 7
 * missile : 8
 * skill   : 9
 * spell   : 10
 * item    : 11
 * escape  : 12
 * victory : 13
 * dying   : 14
 * abnormal: 15
 * sleep   : 16
 * dead    : 17
 *   
 * 【图片命名规则】
 *   
 *  例：
 *   
 *   1号角色哈罗德，备注<sv:hld>、<SVzs0:8>
 *   \img\sv_actors\sv\hld内应有hld0_0.png、hld0_1.png、hld0_2.png...hld0_8.png
 *   
 *   文件名组成：[基础名称] + [动作index] + _ + [帧]
 *   <sv:hld> = 基础名称
 *   <SVzs0:8> = index为0的动作一共8帧
 *   
 *   <SVspeed:x>   动画帧播放速度，不填时默认为12。值越小速度越快
 *   <YCyy:true>   填此标签将隐藏角色脚下的默认阴影
 *   
 * 【状态部分】
 *   
 *  例：
 *   
 *   1号角色，备注为<sv:hld>，并拥有5号状态
 *   5号状态备注<sv:lxs>、<SVzs7:14>、<SVzs9:22>
 *   
 *   那么1号角色在进行7号和9号动作时，会优先读取状态内的标签<sv:lxs>
 *   进行5号动作时，则会读取角色本身的标签<sv:hld>，因为状态内并没有<SVzs5:x>
 *   
 *   进行动作时，会优先读取该战斗者所有状态内的标签，优先级为状态id从大到小
 *   
 *   
 *   敌人也可以使用这些标签，但需要YEP_X_AnimatedSVEnemies，
 *   请务必将此插件放在YEP_X_AnimatedSVEnemies的下方。
 *   
 *   与角色不同的是，敌人还需要一个<Sideview Battler: 文件名>标签来开启动作，
 *   内容随便填一个sv战斗图就行。
 *   
 *   
 *   标签：<Cfdz1:[4,5,6]>
 *   
 *    假设你的角色有几个动作相同，则无需放入多套相同的图片。
 *    例：<Cfdz3:[4,9,11]>
 *    拥有此标签的角色，进行id为4、9、11的三个动作时，
 *    即使你的文件中没有这三个动作的图像，也不会有任何问题。
 *    因为系统会自动读取id为3的动作。
 *   
 *   
 *   国哥友情提示：
 *     更改角色锚点的标签在YEP_BattleEngineCore。
 *     更改敌人锚点的标签在YEP_X_AnimatedSVEnemies。
 * ============================================================================
 *  ■ 使用规约
 * ============================================================================
 *   
 *   转载注明作者。
 *   禁止用于盈利。
 *   
 * ============================================================================
 *  ■ 更新
 * ============================================================================
 * Version 1.05 [2021.1.18]:
 * - 修复状态报错的bug。
 *
 * Version 1.04 [2020.12.23]:
 * - 添加新的标签：<Cfdz?:[x,x,x]>。
 *
 * Version 1.03 [2020.12.8]:
 * - 修改与Mx_Pet的兼容。
 *
 * Version 1.02 [2020.12.4]:
 * - 现在标签可以填在状态的备注栏了。
 *
 * Version 1.01 [2020.12.3]:
 * - 添加了预加载，首次加载时图片不会再闪动了。
 * - 为了便于管理，将图片分在不同的文件夹。
 * - 添加了用于隐藏阴影的标签<YCyy:true>。
 * - 修正了动画播放错误的bug。
 *
 * Version 1.00 [2020.12.2]:
 * - 完成插件。
 */
//=============================================================================

var Mx = Mx || {};
Mx.Mx_SuperSV = true;

ImageManager.loadBigSvActor = function(n, filename, hue) {
    return this.loadBitmap('img/sv_actors/sv/'+n, filename, hue, false);
};

ImageManager.reserveBigSvActor = function(n, filename, hue, reservationId) {
    return this.reserveBitmap('img/sv_actors/sv/'+n, filename, hue, true, reservationId);
};

var Game_Actor_setup_sv = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    Game_Actor_setup_sv.call(this, actorId);
	this.meta = $dataActors[actorId].meta;
	this.SVzs = this.actorSVzs();
};

var Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Game_Enemy_setup.call(this, enemyId, x, y);
	this.meta = $dataEnemies[enemyId].meta;
	this.SVzs = this.enemySVzs();
};

var Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
Sprite_Actor.prototype.updateShadow = function() {
	Sprite_Actor_updateShadow.call(this);
	if (this._actor && this._actor.meta.YCyy) this._shadowSprite.visible = false;
};

Game_Actor.prototype.actorSVzs = function() {
	var SVzs = [];
	for (var s=0;s<18;s++){
		SVzs.push(parseInt(this.meta['SVzs'+s]));
	}
    return SVzs;
};

Game_Enemy.prototype.enemySVzs = function() {
	var SVzs = [];
	for (var s=0;s<18;s++){
		SVzs.push(parseInt(this.meta['SVzs'+s]));
	}
    return SVzs;
};

var Cfdzjc = function(mb, id){
	var list = [];
	var idd = 99;
	for (var s=0;s<18;s++){
		var name = 'Cfdz'+s;
		if (mb.meta[name]){
			list.push(JSON.parse(mb.meta[name]));
		} else {
			list.push([999]);
		}
	}
	for (var s=0;s<list.length;s++){
		var lis = list[s];
		for (var q=0;q<lis.length;q++){
			if (lis[q] == id) idd = s;
		}
	}
	if (idd != 99) return idd+1;
	return false;
}

Sprite_Actor.prototype.updateFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
	
    if (this._actor.meta.sv){
    var js = this._actor;
	
	if (Cfdzjc(js, this._motion.index) && !this.StatesSV(this._motion.index)){
		var motionIndex = Cfdzjc(js, this._motion.index) - 1;
	} else {
		var motionIndex = this._motion ? this._motion.index : 0;
	}
	
	if (this.StatesSV(this._motion.index)){
		var Name = this.StatesSV(this._motion.index)[1];
		var Zs = this.StatesSV(this._motion.index)[0];
	} else {
		var Name = js.meta.sv;
		if (Cfdzjc(js, this._motion.index)){
			var Zs = parseInt(this._actor.SVzs[Cfdzjc(js, this._motion.index) - 1]);
		} else {
			var Zs = parseInt(this._actor.SVzs[this._motion.index]);
		}
	}
	this._Zs = Zs;
	var wjjn = Name + '/';
	if (this._pattern == Zs) this._pattern = 0;
    var pattern = this._pattern < Zs ? this._pattern : 0;
		if (pattern == 0){
			var ss = Zs + 1;
			for (var s=0;s<ss;s++){
				ImageManager.reserveBigSvActor(wjjn, Name + motionIndex + '_' + s, (js.by?js.by:0));
			}
		}
    var bitmap = ImageManager.loadBigSvActor(wjjn, Name + motionIndex + '_' + pattern, (js.by?js.by:0));
    this._mainSprite.bitmap = bitmap;
    var cw = bitmap.width;
    var ch = bitmap.height;
    var cx = 0;
    var cy = 0;
    this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
	} else {
    var bitmap = this._mainSprite.bitmap;
    if (bitmap) {
        var motionIndex = this._motion ? this._motion.index : 0;
        var pattern = this._pattern < 3 ? this._pattern : 1;
        var cw = bitmap.width / 9;
        var ch = bitmap.height / 6;
        var cx = Math.floor(motionIndex / 6) * 3 + pattern;
        var cy = motionIndex % 6;
        this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
    }
	}
};

Sprite_Actor.prototype.updateMotionCount = function() {
    if (this._actor.meta.sv){
    if (this._motion && ++this._motionCount >= this.motionSpeed()) {
        if (this._pattern < (this._Zs?this._Zs:this._actor.SVzs[this._motion.index] - 1)) {
            this._pattern++;
        } else {
			this._pattern = 0;
            this.refreshMotion();
        }
        this._motionCount = 0;
    }
	} else {
    if (this._motion && ++this._motionCount >= this.motionSpeed()) {
        if (this._motion.loop) {
            this._pattern = (this._pattern + 1) % 4;
        } else if (this._pattern < 3) {
            this._pattern++;
        } else {
			this._pattern = 0;
            this.refreshMotion();
        }
        this._motionCount = 0;
    }
	}
};

Sprite_Actor.prototype.motionSpeed = function() {
    return this._actor.meta.SVspeed?this._actor.meta.SVspeed:12;
};

Sprite_Actor.prototype.StatesSV = function(id){
	var states = this._battler._states;
	if (states.length == 0) return
	var sl = 0;
	for (var s=0;s<states.length;s++){
		if ($dataStates[states[s]].meta.sv) sl += 1;
	}
	if (sl == 0) return
	var dzzs = false;
	var dz = 'SVzs' + id;
	for (var s=0;s<states.length;s++){
		if ($dataStates[states[s]].meta[dz]) dzzs = [parseInt($dataStates[states[s]].meta[dz]),$dataStates[states].meta.sv];
	}
	
	return dzzs;
}

if (Imported.YEP_X_AnimatedSVEnemies){ // 

Game_Enemy.prototype.sideviewWidth = function() {
	if (this.enemy().meta.sv) var n = ImageManager.loadBigSvActor(this.enemy().meta.sv+'/', this.enemy().meta.sv+'0_0')._baseTexture.width;
    return n?n:this.enemy().sideviewWidth;
};

Game_Enemy.prototype.sideviewHeight = function() {
	if (this.enemy().meta.sv) var n = ImageManager.loadBigSvActor(this.enemy().meta.sv+'/', this.enemy().meta.sv+'0_0')._baseTexture.height;
    return n?n:this.enemy().sideviewHeight;
};

Sprite_Enemy.prototype.updateSVFrame = function() {
    Sprite_Battler.prototype.updateFrame.call(this);
	if ($dataEnemies[this._enemy._enemyId].meta.sv){
		var gw = $dataEnemies[this._enemy._enemyId];
		if (Cfdzjc(gw, this._motion.index) && !this.StatesSV(this._motion.index)){
			var motionIndex = Cfdzjc(gw, this._motion.index) - 1;
		} else {
			var motionIndex = this._motion ? this._motion.index : 0;
			motionIndex = (this._actor.isStateAffected(1)?17:motionIndex);
		}
		
	if (this.StatesSV(this._motion.index)){
		var Name = this.StatesSV(this._motion.index)[1];
		var Zs = this.StatesSV(this._motion.index)[0];
	} else {
		var Name = gw.meta.sv;
		if (Cfdzjc(gw, this._motion.index)){
			var Zs = parseInt(this._enemy.SVzs[Cfdzjc(gw, this._motion.index) - 1]);
		} else {
			var Zs = parseInt(this._enemy.SVzs[this._motion.index]);
			Zs = (this._actor.isStateAffected(1)?parseInt(this._enemy.SVzs[17]):Zs);
		}
	}
	this._Zs = Zs;
	var wjjn = Name + '/';
	if (this._pattern == Zs) this._pattern = 0;
		var pattern = this._pattern < Zs ? this._pattern : 0;
		if (pattern == 0){
			var ss = Zs + 1;
			for (var s=0;s<ss;s++){
				ImageManager.reserveBigSvActor(wjjn, Name + motionIndex + '_' + s, this._enemy.battlerHue());
			}
		}
		var bitmap = ImageManager.loadBigSvActor(wjjn, Name + motionIndex + '_' + pattern, this._enemy.battlerHue());
		
		this._mainSprite.bitmap = bitmap;
		this._effectTarget = this._mainSprite;

		var cw = bitmap.width;
		var ch = bitmap.height;
		var cx = 0;
		var cy = 0;
		var cdh = 0;
		if (this._effectType === 'bossCollapse') {
		  cdh = ch - this._effectDuration;
		}
		this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch - cdh);
		this.adjustMainBitmapSettings(bitmap);
		this.adjustSVShadowSettings();
		
	} else {
    var bitmap = this._mainSprite.bitmap;
    if (bitmap.width <= 0) return;
    this._effectTarget = this._mainSprite;
    var motionIndex = this._motion ? this._motion.index : 0;
    var pattern = this._pattern < 3 ? this._pattern : 1;
    var cw = bitmap.width / 9;
    var ch = bitmap.height / 6;
    var cx = Math.floor(motionIndex / 6) * 3 + pattern;
    var cy = motionIndex % 6;
    var cdh = 0;
    if (this._effectType === 'bossCollapse') {
      cdh = ch - this._effectDuration;
    }
    this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch - cdh);
    this.adjustMainBitmapSettings(bitmap);
    this.adjustSVShadowSettings();
	}
};

Sprite_Enemy.prototype.updateMotionCount = function() {
    if (!this._svBattlerEnabled && !$dataEnemies[this._enemy._enemyId].meta.sv) return;
	if ($dataEnemies[this._enemy._enemyId].meta.sv){
    if (this._motion && ++this._motionCount >= this.motionSpeed()) {
    if (this._pattern < (this._Zs?this._Zs:this._enemy.SVzs[this._motion.index] - 1)) {
        this._pattern++;
      } else {
		this._pattern = 0;
        this.refreshMotion();
      }
      this._motionCount = 0;
	}
	} else {
    if (this._motion && ++this._motionCount >= this.motionSpeed()) {
      if (this._motion.loop) {
        this._pattern = (this._pattern + 1) % 4;
      } else if (this._pattern < 2) {
        this._pattern++;
      } else if (this._pattern >= 2) {
        this.startMotion(this._enemy.idleMotion());
      } else {
        this.refreshMotion();
      }
      this._motionCount = 0;
    }
	}
};

Sprite_Enemy.prototype.motionSpeed = function() {
    return $dataEnemies[this._enemy._enemyId].meta.SVspeed?$dataEnemies[this._enemy._enemyId].meta.SVspeed:12;
};

Sprite_Enemy.prototype.StatesSV = function(id){
	var states = this._battler._states;
	if (states.length == 0) return
	var sl = 0;
	for (var s=0;s<states.length;s++){
		if ($dataStates[states[s]].meta.sv) sl += 1;
	}
	if (sl == 0) return
	var dzzs = false;
	var dz = 'SVzs' + id;
	for (var s=0;s<states.length;s++){
		if ($dataStates[states[s]].meta[dz]) dzzs = [parseInt($dataStates[states[s]].meta[dz]),$dataStates[states].meta.sv];
	}
	
	return dzzs;
}

Sprite_Animation.prototype.updatePosition = function() {
  if (Yanfly.SVE.Sprite_Animation_updatePosition){
	  Yanfly.SVE.Sprite_Animation_updatePosition.call(this);
  } else {
      if (this._animation.position === 3) {
        this.x = this.parent.width / 2;
        this.y = this.parent.height / 2;
    } else {
        var parent = this._target.parent;
        var grandparent = parent ? parent.parent : null;
        this.x = this._target.x;
        this.y = this._target.y;
        if (this.parent === grandparent) {
            this.x += parent.x;
            this.y += parent.y;
        }
        if (this._animation.position === 0) {
            this.y -= this._target.height;
        } else if (this._animation.position === 1) {
            this.y -= this._target.height / 2;
        }
    }
	}
};

































}