var krz = krz || {}
var Imported = Imported || {};
krz.iconset = krz.iconset || {}
//=============================================================================
// krz_iconimprove.js
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc 将原本的超长图标切割为3200高度一份共四份(需要你手动ps并重命名)
 * 根据调用的图标编号自动选择哪一份，这样可以让那些图标变黑块的电脑好一点。
 * @author KRZ
 *
 *
 * @param Enable iconset1
 * @type boolean
 * @on 启用IconSet_1.png
 * @off 不启用IconSet_1.png
 * @default true
 *
 * @param Enable iconset2
 * @type boolean
 * @on 启用IconSet_2.png
 * @off 不启用IconSet_2.png
 * @default true
 *
 * @param Enable iconset3
 * @type boolean
 * @on 启用IconSet_3.png
 * @off 不启用IconSet_3.png
 * @default true
 *
 * @param Enable iconset4
 * @type boolean
 * @on 启用IconSet_4.png
 * @off 不启用IconSet_4.png
 * @default true
 * 
 *
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * 如果有MOG_BattleHud或MOG_BattleResult或MOG_TRPop插件置于这些插件下方
 *
 * 手动用ps给iconset图标文件划分高度为3200像素的IconSet_1.png、IconSet_2.png...
 * 目前只写了4份1 2 3 4 ，如果需要增加的话自己对照着复制一下就行了。
 * 
 * 如果没那么多的话，把这段说明下面的krz.iconset._load4 = false，这样就没事了
 *
 * 目前支持原版的敌人脑袋上的图标，mog的战斗界面角色下面的图标(MOG_BattleHud(KRZ
 * 修改版))和MOG_BattleResult的物品掉落显示和MOG_TrPopUpBattle动态图标掉落样式。
 *
 * 如果非KRZ修改版MOG_BattleHud并且冲突的话建议把下面battlehud那一部分内的
 * 217行this.create_stateturns();和327行this.create_stateturns();去掉。
 * 还有错的话就整段mogbattlehud的去掉
 *
 * 2021年1月2日16:10:10 修复一个有可能报错的小bug
 * 2020年12月20日19:46:58 修复掉落物bug
 *
 *
 *
 */
//============================================================================= 
krz.Parameters = PluginManager.parameters('krz_iconsetimprove');
krz.Param = krz.Param || {};

krz.iconset._load1 = eval(String(krz.Parameters['Enable iconset1']));
krz.iconset._load2 = eval(String(krz.Parameters['Enable iconset2']));
krz.iconset._load3 = eval(String(krz.Parameters['Enable iconset3']));
krz.iconset._load4 = eval(String(krz.Parameters['Enable iconset4']));
krz.iconset.loadsmallicon = krz.iconset._load1;


krz.iconset.loadstatebitmap = Sprite_StateIcon.prototype.loadBitmap;
Sprite_StateIcon.prototype.loadBitmap = function() {
krz.iconset.loadstatebitmap.call(this);
	if(krz.iconset.loadsmallicon){
		this._iconindex2 = -1;
		if(krz.iconset._load1) this.bitmap1 = ImageManager.loadSystem('IconSet_1');
		if(krz.iconset._load2) this.bitmap2 = ImageManager.loadSystem('IconSet_2');
		if(krz.iconset._load3) this.bitmap3 = ImageManager.loadSystem('IconSet_3');
		if(krz.iconset._load4) this.bitmap4 = ImageManager.loadSystem('IconSet_4');
	}
};

krz.iconset.updateframe = Sprite_StateIcon.prototype.updateFrame;
Sprite_StateIcon.prototype.updateFrame = function() {
	krz.iconset.updateframe.call(this);
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    var sx = this._iconIndex % 16 * pw;
    var sy = Math.floor(this._iconIndex / 16) * ph;
	if(krz.iconset.loadsmallicon){
		var bitmapcacheindex = Math.floor(Math.floor(this._iconIndex/16)/100);
		if(bitmapcacheindex != this._iconindex2){
			this._iconindex2 = bitmapcacheindex;
			switch (bitmapcacheindex){
				case 0:
				this.bitmap = this.bitmap1;
				break;
				case 1:
				this.bitmap = this.bitmap2;
				break;
				case 2:
				this.bitmap = this.bitmap3;
				break;	
				case 3:
				this.bitmap = this.bitmap4;
				break;				
			}
		}
		var sy = Math.floor(Math.floor(this._iconIndex/16)%100) * ph;
    this.setFrame(sx, sy, pw, ph);
	}else{
	this.setFrame(sx, sy, pw, ph);	
	}

};

if(Imported.MOG_BattleHud){
	krz.iconset.mogload = Battle_Hud.prototype.load_img;
Battle_Hud.prototype.load_img = function() {
	krz.iconset.mogload.call(this);
	if(krz.iconset.loadsmallicon){
		this._iconindex2 = -1;
		if(krz.iconset._load1) this._state_img1 = ImageManager.loadSystem('IconSet_1');
		if(krz.iconset._load2) this._state_img2 = ImageManager.loadSystem('IconSet_2');
		if(krz.iconset._load3) this._state_img3 = ImageManager.loadSystem('IconSet_3');
		if(krz.iconset._load4) this._state_img4 = ImageManager.loadSystem('IconSet_4');
	}	
};	
	
Battle_Hud.prototype.refresh_states = function() {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	this._battler._statep = this._battler._statep || [];
		var ids = [];
    for(var i = 0; i < this._battler.states().length; i++) {
        if (this._battler.states()[i].iconIndex > 0) {
            ids.push(this._battler.states()[i].id);
        }
    };
	var statenum = ids.length;
    for(i = 0; i < this._battler._buffs.length; i++) {
        if (this._battler._buffs[i] !== 0) {
            ids.push(i);
        }
    };	
	
	var m = ids.length;
	for (i = 0; i < m; i++){
		this._battler._statep[i]= {};
	if(i<statenum){
	this._battler._statep[i].buffid = -1;
	this._battler._statep[i].id = ids[i];
	}else{
	this._battler._statep[i].id = 0;
	this._battler._statep[i].buffid = ids[i];
	}

	}	
	for (i = 0; i < m; i++){
		 this._battler._statep[i].x = this._state_icon.x;
		 this._battler._statep[i].y = this._state_icon.y;
		 this._battler._statep[i].visible = false;
	}
		

	
	if (this._battler.allIcons().length == 0) {this._states_data[1] = 0;return};
       if (this._battler.allIcons()[this._states_data[1]]) {	
		this._states_data[0] = this._battler.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		
		
		
		var sx = this._states_data[0] % 16 * 32;

	if(krz.iconset.loadsmallicon){
		this._iconindex2 = this._iconindex2 || 0;
		var bitmapcacheindex = Math.floor(Math.floor(this._states_data[0]/16)/100);
		if(bitmapcacheindex != this._iconindex2){
			this._iconindex2 = bitmapcacheindex;
			this._state_icon = undefined;
			switch (bitmapcacheindex){
				case 0:
				this._state_icon = new Sprite(this._state_img1);
				break;
				case 1:
				this._state_icon = new Sprite(this._state_img2);
				break;
				case 2:
				this._state_icon = new Sprite(this._state_img3);
				break;	
				case 3:
				this._state_icon = new Sprite(this._state_img4);
				break;				
			}
	this._state_icon.x = this._pos_x + Moghunter.bhud_states_pos_x;
	this._state_icon.y = this._pos_y + Moghunter.bhud_states_pos_y;
	this._state_icon.visible = true;

		}		
		var sy = Math.floor(Math.floor(this._states_data[0] / 16)%100) * 32;		
		this._state_icon.setFrame(sx, sy, 32, 32);
	}else{
		var sy = Math.floor(this._states_data[0] / 16) * 32;		
		this._state_icon.setFrame(sx, sy, 32, 32);
	}		
		
		
		
		this._battler.need_refresh_bhud_states = false;	
	
	   };
	  this._battler._statep[this._states_data[1]] = this._battler._statep[this._states_data[1]] || {buffid: -1, id: 0, x: 0, y: 0, visible: false};
	this._battler._statep[this._states_data[1]].visible = this._battler._statep[this._states_data[1]].visible || true;
	this._battler._statep[this._states_data[1]].visible = true;
	if(Imported.YEP_BuffsStatesCore){
		this.create_stateturns();
	}	
	
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._battler.allIcons().length) {
		this._states_data[1] = 0
	};
	


};	




Battle_Hud.prototype.refresh_states2 = function() {
	this._state_icon.visible = false;
	this._battler.need_refresh_bhud_states = false;
	this.removeChild(this._stateturs);
	for (i = 0; i < this._stateIcons.length; i++){
		this._state_icon.removeChild(this._stateIcons[i]);
	};	
	if (this._battler.allIcons().length == 0) {return};
	this._state_icon.visible = true;
	this._stateIcons = [];
	var w = Window_Base._iconWidth;
	var icons = this._battler.allIcons().slice(0,w);

	var ids = [];
    for(i = 0; i < this._battler.states().length; i++) {
        if (this._battler.states()[i].iconIndex > 0) {
            ids.push(this._battler.states()[i].id);
        }
    };
	var statenum = ids.length;
    for(i = 0; i < this._battler._buffs.length; i++) {
        if (this._battler._buffs[i] !== 0) {
            ids.push(i);
        }
    };
	this._battler._statep = this._battler._statep || [];


	
	
	var m = Math.min(Math.max(this._battler.allIcons().length,0),Moghunter.bhud_statesMax);
	var align = Moghunter.bhud_statesAlign;

	for (i = 0; i < m; i++){
		this._battler._statep[i]= {};
	if(i<statenum){
	this._battler._statep[i].buffid = -1;
	this._battler._statep[i].id = ids[i];

	}else{
	this._battler._statep[i].id = 0;
	this._battler._statep[i].buffid = ids[i];
	}
	

	     var sx = icons[i] % 16 * w;		 
		 
	if(krz.iconset.loadsmallicon){
		this._iconindex2 = this._iconindex2 || 0;
		var bitmapcacheindex = Math.floor(Math.floor(icons[i]/16)/100);
			switch (bitmapcacheindex){
				case 0:
				this._stateIcons[i] = new Sprite(this._state_img1);
				break;
				case 1:
				this._stateIcons[i] = new Sprite(this._state_img2);
				break;
				case 2:
				this._stateIcons[i] = new Sprite(this._state_img3);
				break;	
				case 3:
				this._stateIcons[i] = new Sprite(this._state_img4);
				break;	
				default:
				this._stateIcons[i] = new Sprite(this._state_img);
				break;
			}	
		var sy = Math.floor(Math.floor(icons[i]/ 16)%100) * w;		
		this._stateIcons[i].setFrame(sx, sy, w, w);
	}else{
		 this._stateIcons[i] = new Sprite(this._state_img);
		 var sy = Math.floor(icons[i] / 16) * w;
		 this._stateIcons[i].setFrame(sx, sy, w, w);
	}			 
		 
		 
		 
		 
		 
		 if (align === 1) {
		     this._stateIcons[i].x = -((w + 4) * i);
			 
		 } else if (align === 2) { 
		     this._stateIcons[i].y = (w + 4) * i;
			 
		 } else if (align === 3) {
			 this._stateIcons[i].y = -((w + 4) * i);
		 } else {	 
		     this._stateIcons[i].x = (w + 4) * i;
		 };
		 this._battler._statep[i].x = this._stateIcons[i].x+this._state_icon.x;
		 this._battler._statep[i].y = this._stateIcons[i].y+this._state_icon.y;
		 this._state_icon.addChild(this._stateIcons[i]);
	};
	if(Imported.YEP_BuffsStatesCore){
		this.create_stateturns();
	}


};
}

if(Imported.MOG_BattleResult){
	krz.iconset.resultload = BattleResult.prototype.loadImages;
BattleResult.prototype.loadImages = function() {
	krz.iconset.resultload.call(this);
	this._icon_img = ImageManager.loadSystem("IconSet");
	if(krz.iconset.loadsmallicon){
		this._iconindex2 = -1;
		if(krz.iconset._load1) this._icon_img1 = ImageManager.loadSystem('IconSet_1');
		if(krz.iconset._load2) this._icon_img2 = ImageManager.loadSystem('IconSet_2');
		if(krz.iconset._load3) this._icon_img3 = ImageManager.loadSystem('IconSet_3');
		if(krz.iconset._load4) this._icon_img4 = ImageManager.loadSystem('IconSet_4');
	}	
};	
	
BattleResult.prototype.addIcon = function(sprite,data) {

	var w = Window_Base._iconWidth;
	var h = Window_Base._iconHeight;
	
	
	var sx = data.iconIndex % 16 * w;	
	if(krz.iconset.loadsmallicon){
		this._iconindex2 = this._iconindex2 || 0;
		var bitmapcacheindex = Math.floor(Math.floor(data.iconIndex/16)/100);
			switch (bitmapcacheindex){
				case 0:
				var icon = new Sprite(this._icon_img1);				
				break;
				case 1:
				var icon = new Sprite(this._icon_img2);
				break;
				case 2:
				var icon = new Sprite(this._icon_img3);
				break;	
				case 3:
				var icon = new Sprite(this._icon_img4);
				break;	
				default:
				var icon = new Sprite(this._icon_img);
				break;
			}	
		var sy = Math.floor(Math.floor(data.iconIndex/ 16)%100) * h;		
		icon.setFrame(sx,sy,w,h);
	}else{
		var icon = new Sprite(this._icon_img);
		var sy = Math.floor(data.iconIndex / 16) * h;
		icon.setFrame(sx,sy,w,h);
	}		



    sprite.addChild(icon);
	var name = new Sprite(new Bitmap(160,32));
	name.bitmap.drawText(data.name,0,0,160,32);
	name.x = w + 4;
	sprite.addChild(name);
};	
}

if(Imported.MOG_TrPopUpBattle){
SpriteEnemyTrP.prototype.createIcon = function() {
    this._icons = [];
	this._iconImg = ImageManager.loadSystem("IconSet");
	if(krz.iconset._load1) this._iconImg1 = ImageManager.loadSystem("IconSet_1");
	if(krz.iconset._load2) this._iconImg2 = ImageManager.loadSystem("IconSet_2")
	if(krz.iconset._load3) this._iconImg3 = ImageManager.loadSystem("IconSet_3")
	if(krz.iconset._load4) this._iconImg4 = ImageManager.loadSystem("IconSet_4")
    for (var i = 0; i < this._enemy._treasure.item.length; i++) {
		 var item = this._enemy._treasure.item[i];
		 if (item) {
			 
	if(krz.iconset.loadsmallicon){
		var bitmapcacheindex = Math.floor(Math.floor(item.iconIndex/16)/100);
			switch (bitmapcacheindex){
				case 0:					
				this._icons[i] = new Sprite(this._iconImg1) 				
				break;
				case 1:
				this._icons[i] = new Sprite(this._iconImg2) 
				break;
				case 2:
				this._icons[i] = new Sprite(this._iconImg3) 
				break;	
				case 3:
				this._icons[i] = new Sprite(this._iconImg4) 
				break;	
				default:
			    this._icons[i] = new Sprite(this._iconImg) 				
				break;
			}	
	}else{	
		this._icons[i] = new Sprite(this._iconImg) 	
	}			 			 
			 this._icons[i].item = item;
			 this._icons[i].index = i;
			 this._icons[i].anchor.x = 0.5;
			 this._icons[i].anchor.y = 1;
			 this.refreshIcons(this._icons[i]);
			 this.addChild(this._icons[i]);
		 };
	};
	this._icons.sort(function(a, b){return b.intY-a.intY});
	this.children.sort(function(a, b){return b.intY-a.intY});
	for (var i = 0; i < this._icons.length; i++) {
		 this.refreshWait(this._icons[i],i,this._icons.length);
	};
};

SpriteEnemyTrP.prototype.refreshIcons = function(sprite) {
	var w = Window_Base._iconWidth;
	var h = Window_Base._iconHeight;
	var iconindex = sprite.item.iconIndex;
	var sx = iconindex % 16 * w;
	if(!krz.iconset.loadsmallicon){
	var sy = Math.floor(iconindex / 16) * h;
	}else{
	var sy = Math.floor(Math.floor(iconindex/ 16)%100) * h;				
	}
	var hr = Math.randomInt(h);
    sprite.setFrame(sx,sy,w,h);
	sprite.intY = ((this._sprite.height / 3) + hr) - h;
	sprite.dr = 60;
	sprite.dy = 15;
	sprite.y = -40;
	sprite.ry = sprite.y + sprite.intY;
	var randx = (Math.random() * 0.5) + (sprite.index / 8);
	var rands = Math.randomInt(2);
	sprite.sx = rands === 0 ? randx : -randx;
	sprite.scale.x = Moghunter.trPopup_scale;
	sprite.scale.y = sprite.scale.x;
};


}