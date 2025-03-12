/*:
 * @plugindesc 可以使用脚本控制窗口移动
 * @author 炎龙
 *
 * @help 
 * 脚本控制窗口移动。
 * 如果装有YEP_X_CoreUpdatesOpt，放到它的下面
 * 
 * [脚本]
 * 将窗口移动到指定x,y坐标，移动速度为frames帧:
 * Window.moveTo(x,y,frames);
 * 将窗口偏移x,y坐标，偏移速度为frames帧:
 * Window.moveOffset(offsetX, offsetY, frames);
 * 配置部分:
 * yanLong.MoveWin.nobackLayoutSceneArr = ["Scene_Map","Scene_Battle"];//配置不需要统一加窗口背景图的场景
 * yanLong.MoveWin.needMoveWindowScene = ["Scene_Menu"];//配置需要窗口移动出场的场景(表现不正常的场景可以不加进来)
 * yanLong.MoveWin.winSkinDark = 'win1';//窗口非激活时所采用的皮肤图片设置[img/system下的文件名]
 * yanLong.MoveWin.winSkinLight = 'win2';//窗口激活时闪烁时所采用的皮肤图片设置[img/system下的文件名]
 */

var yanLong = yanLong || {};
yanLong.MoveWin = {};
yanLong.MoveWin.moveWinBlurFilter = {};
yanLong.MoveWin.moveWinFliterSwth = false;//开启Blur滤镜
yanLong.MoveWin.moveWinBlurFilter.startBlur = 8;			//起始模糊度 		8		40
yanLong.MoveWin.moveWinBlurFilter.startQuantity = 4;		//起始质量 		4		4
yanLong.MoveWin.moveWinBlurFilter.endBlur = 30;			//结束模糊度 		30		80
yanLong.MoveWin.moveWinBlurFilter.endQuantity = 8;		//结束质量 严重影响帧数 不建议提高
yanLong.MoveWin.moveWinBlurFilter.speed = 2;				//模糊度切换速度

yanLong.MoveWin.moveWinBlurFilter.perBlurTick = 1;
yanLong.MoveWin.moveWinBlurFilter.perQuantityTick = 1;

yanLong.MoveWin.moveWinBlurFilter.perBlurTick = Math.abs(yanLong.MoveWin.moveWinBlurFilter.startBlur - yanLong.MoveWin.moveWinBlurFilter.endBlur)/100 * yanLong.MoveWin.moveWinBlurFilter.speed;
yanLong.MoveWin.moveWinBlurFilter.perQuantityTick = Math.abs(yanLong.MoveWin.moveWinBlurFilter.startQuantity - yanLong.MoveWin.moveWinBlurFilter.endQuantity)/100 * yanLong.MoveWin.moveWinBlurFilter.speed;
//配置部分:
yanLong.MoveWin.nobackLayoutSceneArr = ["Scene_Map","Scene_Battle"];//配置不需要统一加窗口背景图的场景
yanLong.MoveWin.needMoveWindowScene = ["Scene_Menu"];//配置需要窗口移动出场的场景(表现不正常的场景可以不加进来)
yanLong.MoveWin.winSkinDark = 'win1';//窗口非激活时所采用的皮肤图片设置[img/system下的文件名]
yanLong.MoveWin.winSkinLight = 'win2';//窗口激活时闪烁时所采用的皮肤图片设置[img/system下的文件名]
yanLong.MoveWin.windowMoveSpeed = 30;//窗口移动速度

yanLong.MoveWin.Window_Base_prototype_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height) {
	this._needMoveWindowSceneArr = yanLong.MoveWin.needMoveWindowScene;
	this._trueX = x;
	this._trueY = y;
	var nowSceneName = SceneManager._scene.constructor.name;
	if(this._needMoveWindowSceneArr.indexOf(nowSceneName)>=0){
		/*this._layoutOfWindowBase = new Sprite();
		var skin = yanLong.MoveWin.winSkinLight;
		this._layoutOfWindowBase.bitmap = ImageManager.loadBitmap('img/pictures/', skin, undefined, true);*/
		if(["Window_Gold","Window_TitleCommand"].indexOf(this.constructor.name)<0){//这里配置所有不正常的窗口类型以过滤
			//x = -Math.random()*Graphics.width;
			x = -Graphics.width;
			//y = y - Graphics.height;
		}
	}
	yanLong.MoveWin.Window_Base_prototype_initialize.apply(this, [x, y, width, height]);
	this.moveTo(this._trueX, this._trueY, yanLong.MoveWin.windowMoveSpeed);
};

//更新窗口
yanLong.MoveWin.Window_prototype_update = Window_Base.prototype.update;
Window_Base.prototype.update = function() {
	yanLong.MoveWin.Window_prototype_update.call(this);
	this.updateMoveWin();
	this.updateWinSkin();
	
};

//更新窗口皮肤切换
Window_Base.prototype.updateWinSkin = function() {
	//return;
	if(SceneManager._scene){
		if(this._layoutOfWindowBase){
			if(this instanceof Window_Selectable==false){//非指令窗口不做处理
				this._layoutOfWindowBase.opacity = 0;
				this._layoutOfWindowBaseDark.opacity = 255;
				return;
			}
			if(this.isCursorMovable()==true){//本窗口激活时
				this.updateMoveWinFilter();
				this._layoutOfWindowBase.opacity = 255;
				this._layoutOfWindowBaseDark.opacity = 0;
			}else{//本窗口未激活时
				this._layoutOfWindowBase.opacity = 0;
				this._layoutOfWindowBaseDark.opacity = 255;
			}
			//以下作废
			//var childrenArr = SceneManager._scene._windowLayer.children;
		}
	}
};

//更新窗口滤镜
Window_Base.prototype.updateMoveWinFilter = function() {
	this.updateMoveWinBlurFilter();
};

//更新动态透明度
Window_Base.prototype.updateOpacityIfActive = function() {
	
};

//更新窗口移动
Window_Base.prototype.updateMoveWin = function() {
	if(this._movePointX!=undefined){
		//console.log(this._movePointX+","+this._movePointY)
		if(this._movePointX > this.x){
			this.x += this._moveSpeedX;
			if(this._movePointX <= this.x){
				this.x = this._movePointX;
				this._movePointX = undefined;
			}
		}
		if(this._movePointX < this.x){
			this.x -= this._moveSpeedX;
			if(this._movePointX >= this.x){
				this.x = this._movePointX;
				this._movePointX = undefined;
			}
		}
		if(this._movePointX == this.x){
			this._movePointX = undefined;
		}
	}
	if(this._movePointY!=undefined){
		//console.log(this._movePointX+","+this._movePointY)
		if(this._movePointY > this.y){
			this.y += this._moveSpeedY;
			if(this._movePointY <= this.y){
				this.y = this._movePointY;
				this._movePointY = undefined;
			}
		}
		if(this._movePointY < this.y){
			this.y -= this._moveSpeedY;
			if(this._movePointY >= this.y){
				this.y = this._movePointY;
				this._movePointY = undefined;
			}
		}
		if(this._movePointY == this.y){
			this._movePointY = undefined;
		}
	}
};

//将窗口移动到指定坐标
Window_Base.prototype.moveTo = function(x, y, frames) {
	var frames = frames || 1;
	this._movePointX = x;
	this._movePointY = y;
	var distanceX = this._movePointX - this.x;
	var distanceY = this._movePointY - this.y;
	this._moveSpeedX = Math.abs(distanceX / frames);
	this._moveSpeedY = Math.abs(distanceY / frames);
};

//将窗口偏移指定坐标
Window_Base.prototype.moveOffset = function(offsetX, offsetY, frames) {
	var frames = frames || 1;
	this._movePointX = offsetX + this.x;
	this._movePointY = offsetY + this.y;
	var distanceX = offsetX;
	var distanceY = offsetY;
	this._moveSpeedX = Math.abs(distanceX / frames);
	this._moveSpeedY = Math.abs(distanceY / frames);
};




//blur滤镜
Window_Base.prototype.createMoveWinBlurFilter = function() {
	if(this instanceof Window_Selectable==false && this.constructor.name!=="Window_Selectable") return;
	if(yanLong.MoveWin.moveWinFliterSwth==false) return;
	if(this.isCursorMovable()==false) return;
	if(this._layoutOfWindowBase){
		var s = this._layoutOfWindowBase;
		//var s = SceneManager._scene._spriteset._baseMoveWinSprite
		//var s = SceneManager._scene._spriteset._moveWinBlurFilter
		//s._filters.indexOf(SceneManager._scene._spriteset._moveWinBlurFilter)
		if(this._moveWinBlurFilter==undefined){
			s._filters = s._filters || [];
			this._moveWinBlurFilter = this._moveWinBlurFilter || new PIXI.filters.BlurFilter();
			this._moveWinBlurFilter.blur = yanLong.MoveWin.moveWinBlurFilter.startBlur;//80
			this._moveWinBlurFilter.quality = yanLong.MoveWin.moveWinBlurFilter.startQuantity;//12
			s._filters.push(this._moveWinBlurFilter);
		}
	}
};

Window_Base.prototype.removeMoveWinBlurFilter = function() {
	if(this._layoutOfWindowBase!=undefined){
		var s = this._layoutOfWindowBase;
		var filter = this._moveWinBlurFilter;
		s._filters.remove(filter);
		this._moveWinBlurFilter = undefined;
	}
};

yanLong.MoveWin.needToggleMoveWinBlurFilterStyle = false;
Window_Base.prototype.updateMoveWinBlurFilter = function() {
	if(yanLong.MoveWin.moveWinFliterSwth==false) return;
	if(this._moveWinBlurFilter != undefined){
		this.MoveWint = this.MoveWint || 2000;
		this.MoveWint -= 1;
		if(this.MoveWint <= 0){
			this._moveWinBlurFilter.over = true;
			this.MoveWint = 2000;
		}
		if(yanLong.MoveWin.needToggleMoveWinBlurFilterStyle==false){
			this._moveWinBlurFilter.blur += yanLong.MoveWin.moveWinBlurFilter.perBlurTick;
			this._moveWinBlurFilter.quality += yanLong.MoveWin.moveWinBlurFilter.perQuantityTick;
			if(this._moveWinBlurFilter.blur>=yanLong.MoveWin.moveWinBlurFilter.endBlur){
				yanLong.MoveWin.needToggleMoveWinBlurFilterStyle = true;
			}
		}else{
			this._moveWinBlurFilter.blur -= yanLong.MoveWin.moveWinBlurFilter.perBlurTick;
			this._moveWinBlurFilter.quality -= yanLong.MoveWin.moveWinBlurFilter.perQuantityTick;
			if(this._moveWinBlurFilter.blur<=yanLong.MoveWin.moveWinBlurFilter.startBlur){
				yanLong.MoveWin.needToggleMoveWinBlurFilterStyle = false;
			}
		}
		if(this._moveWinBlurFilter.over==true){
			this.removeMoveWinBlurFilter();
			this.createMoveWinBlurFilter();
		}
	}
};

/*yanLong.MoveWin.Window_BaseCreateChangeWidthRate = 0.05;
yanLong.MoveWin.Window_BaseCreateChangeHeightRate = 0.05;*/
yanLong.MoveWin.Window_Base_prototype_createContents = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function() {
	//yanLong+
	this._nobackLayoutSceneArr = yanLong.MoveWin.nobackLayoutSceneArr;
	var nowSceneName = SceneManager._scene.constructor.name;
	if(this._nobackLayoutSceneArr.indexOf(nowSceneName)<0){
		if(!this._layoutOfWindowBase){
			//light
			this._layoutOfWindowBase = new Sprite();
			var skin = yanLong.MoveWin.winSkinLight;
			this._layoutOfWindowBase.bitmap = ImageManager.loadBitmap('img/pictures/', skin, undefined, false);
			this.addChildAt(this._layoutOfWindowBase,1);
		    this._layoutOfWindowBase.scale.x = this.width/this._layoutOfWindowBase.width;
			this._layoutOfWindowBase.scale.y = this.height/this._layoutOfWindowBase.height;
			this._layoutOfWindowBase.opacity = 255;
			//this.opacity = 0;
			//dark
			this._layoutOfWindowBaseDark = new Sprite();
			var skinDark = yanLong.MoveWin.winSkinDark;
			this._layoutOfWindowBaseDark.bitmap = ImageManager.loadBitmap('img/pictures/', skinDark, undefined, false);
			this.addChildAt(this._layoutOfWindowBaseDark,0);
			this._layoutOfWindowBaseDark.scale.x = this.width/this._layoutOfWindowBaseDark.width;
			this._layoutOfWindowBaseDark.scale.y = this.height/this._layoutOfWindowBaseDark.height;
			this._layoutOfWindowBaseDark.opacity = 0;
		}
	}
	//-
	yanLong.MoveWin.Window_Base_prototype_createContents.call(this);
	this._moveWinBlurFilter = this._moveWinBlurFilter || undefined;
	this.createMoveWinBlurFilter();
};
