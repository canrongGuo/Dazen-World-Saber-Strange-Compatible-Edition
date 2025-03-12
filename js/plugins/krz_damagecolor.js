var krz = krz || {};
krz.other_end = krz.other_end || {};
krz.other_end = 0.01;
krz._oe = krz._oe || {};
/*
没啥好说的，下面那个switch里根据你的属性ID修改属性颜色，数组内是RGB+不透明度
你也可以指定使用$gameTemp._damagecolor = [61, 0, 100, 255];来自定义下次伤害颜色
*/
krz._oe.Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
	var result = target._damagePopup[0];
	if($gameTemp._damagecolor){
    this._flashColor = $gameTemp._damagecolor;
    this._flashDuration = 0;   
	$gameTemp._damagecolor	= undefined;
	}
	krz._oe.Sprite_Damage_setup.call(this, target);	
};

