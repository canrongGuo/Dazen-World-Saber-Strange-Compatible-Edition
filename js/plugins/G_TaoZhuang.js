//=============================================================================
// G_TaoZhuang.js
//=============================================================================
 
/*:
 * @plugindesc 套装系统v4.6
 * (状态套装插件).
 * @author Banner
 *
 *
 * @help
 *
 * 例子：在状态的备注里面写如下命令
 *
 * <G_TaoZhuang>
 * S: 2
 * A: 2,36,70,104    
 * W: 1,3
 * </G_TaoZhuang>
 * 
 * 
 * 表示穿戴防具2,36,70,104和武器1,3中的任意2件时激活该状态。
 * S表示激活套装所需装备数量：可以用'S', 'SL', 'N', 'NO', 'NUMBER'代替，无视大小写，不写表示必须穿戴所有部件，只取第一个数
 * A表示防具：可以用'A', 'F', 'FJ', 'H', 'HJ',  'HUJIA', 'FANGJU', 'ARMOR'代替，无视大小写
 * W表示武器：可以用'W', 'WQ', 'WEAPON', 'WUQI'代替，无视大小写
 * PS：套装可以只有防具或武器，注意是小写的冒号，并且冒号后面要加个空格！！！！
 *
 *
 * 18.10.11更新
 * 修复了一个BUG
 * 18.7.7更新
 * 修复了战斗中buff一回合消失的bug
 * 18.7.6更新
 * 添加了套装数量功能
 * 18.7.3更新
 * 改进了代码，优化了备注方式
*/
	var G_Mod = G_Mod || {};
	G_Mod.GTZ = G_Mod.GTZ || {};

    var G_TaoZhuang_parameters = PluginManager.parameters('G_TaoZhuang');

    G_TaoZhuang_PluginCommand = Game_Interpreter.prototype.pluginCommand;
    G_TaoZhuang_Create = DataManager.createGameObjects;
    G_TaoZhuang_Save = DataManager.makeSaveContents;
    G_TaoZhuang_Load = DataManager.extractSaveContents;
    G_TaoZhuang_Update = Scene_Map.prototype.update;


    var $G_TaoZhuang= null;
	
	
	G_Mod.GTZ.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function() {
	  if (!G_Mod.GTZ.DataManager_isDatabaseLoaded.call(this)) return false;

	  if (!G_Mod._loaded_G_Mod_GTZ_ClassBaseParam) {
		this.processGTZNotetags1($dataStates);
		G_Mod._loaded_G_Mod_GTZ_ClassBaseParam = true;
	  }
	  
	  return true;
	};
	
	
	DataManager.processGTZNotetags1 = function(group) {
		for (var n = 1; n < group.length; n++) {
			var state = group[n];
			var statenote = state.note.split(/[\r\n]+/);
			var strbo = false;
			for (var i = 0; i < statenote.length; i++) {
				var statenoteline = statenote[i];
				if(statenoteline.match(/<G_TaoZhuang>/i)){
					strbo = true;
				}else if(statenoteline.match(/<\/G_TaoZhuang>/i)){
					strbo = false;
				}else if(strbo){
					if(statenoteline.match(/(.*):[ ](.*)/i)){
						var G_typetext = String(RegExp.$1).toUpperCase().trim();
						var G_id = String(RegExp.$2).split(",");
						for(var j = 0; j < G_id.length; j++){
							G_id[j] = Number(G_id[j]);
						}
						var Typeid = this.getType(G_typetext);						
						if (Typeid == 0){
							state.G_TaoZhuangW = G_id;
						}else if(Typeid == 1){
							state.G_TaoZhuangA = G_id;
						}else if(Typeid == 2){
							state.G_TaoZhuangS = G_id[0];
						}
					}
				}
			}
			
		}
		
	}
	
	
	DataManager.getType = function(string) {
		if (['W', 'WQ', 'WEAPON', 'WUQI'].contains(string)) {
		  return 0;
		} else if (['A', 'H', 'HJ', 'F', 'FJ', 'FANGJU', 'HUJIA', 'ARMOR'].contains(string)) {
		  return 1;
		} else if (['S', 'SL', 'N', 'NO', 'NUMBER'].contains(string)) {
		  return 2;
		} else {
		  return null;
		}
	};
	
	
 
    DataManager.makeSaveContents = function() {
        contents = G_TaoZhuang_Save.call(this);
        contents.armorsets = $G_TaoZhuang;
        return contents;
    };
   
    DataManager.extractSaveContents = function(contents) {
        G_TaoZhuang_Load.call(this, contents);
        $G_TaoZhuang = contents.armorsets;
    };
   
    DataManager.createGameObjects = function() {
        G_TaoZhuang_Create.call(this);
        $G_TaoZhuang = new G_TaoZhuang();
    };
    

    function G_TaoZhuang() {
        this.initialize.apply(this, arguments);
    }
   
    G_TaoZhuang.prototype.initialize = function() {
        this.clear();
		this.createSets();
    };
   
    G_TaoZhuang.prototype.clear = function() {
        this._sets = [null];
        this._actors = [];
    };
	
	G_TaoZhuang.prototype.createSets = function() {
        
		for (var j = 1; j < $dataStates.length; j++) {
			var tstate = $dataStates[j];
			if (tstate) {
				var i = 0;
				this._sets[tstate.id] = [null];
				if(tstate.G_TaoZhuangS){
					this._sets[tstate.id][2] = tstate.G_TaoZhuangS;
				}else if(tstate.G_TaoZhuangW || tstate.G_TaoZhuangA){
					this._sets[tstate.id][2] = 0;
				}else{
					this._sets[tstate.id][2] = null;
				}
				if(tstate.G_TaoZhuangW){
					this._sets[tstate.id][0] = tstate.G_TaoZhuangW;
				}else{
					this._sets[tstate.id][0] = new Array();
				}
				if(tstate.G_TaoZhuangA){
					this._sets[tstate.id][1] = tstate.G_TaoZhuangA;
				}else{
					this._sets[tstate.id][1] = new Array();
				}
			}
			
		}
				
		
    };
    
    G_TaoZhuang.prototype.check = function() {
        for (var i = 1; i <= $gameParty.size(); i++) {
            var actor = $gameActors.actor(i);
            for (var j = 1; j < this._sets.length; j++) {
				var k = 0;
				var s = [0,0];
				s[0] = [null];
				s[1] = [null];
				var zsl = 0; 
                if(this._sets[j][0]) {
					
					var weapons = this._sets[j][0];
					zsl += weapons.length;
					for (k = 0; k < weapons.length; k++) {
						var weaponId = weapons[k];
						var weapon = $dataWeapons[weaponId];
						if(weapon){
							if (actor.hasWeapon(weapon)) {
								s[0][k] = 1;
							} else {
								s[0][k] = 0;
							}
						}
					}
				}
				if(this._sets[j][1]) {
					var armors = this._sets[j][1];
					zsl += armors.length;
					for (k = 0; k < armors.length; k++) {
						var armorId = armors[k];
						var armor = $dataArmors[armorId];
						if(armor){
							if (actor.hasArmor(armor)) {
								s[1][k] = 1;
							} else {
								s[1][k] = 0;
							}
						}
					}
				}
				
				var sl = 0;
				for (k = 0; k < s[0].length; k++){
					if(s[0][k] == 1) sl++;
				}
				for (k = 0; k < s[1].length; k++){
					if(s[1][k] == 1) sl++;
				}
				
				if(this._sets[j][2] !== null){

					if(this._sets[j][2] !== 0){
						if(sl >= this._sets[j][2]){
							actor.addState(j);
						}else{
							actor.removeState(j);
						}
					}else{
						if(zsl > 0 && sl >= zsl){
							actor.addState(j);
						}else{
							actor.removeState(j);
						}					
					}

				}
				
				

				
				actor.clearResult();	
			 
            }
        }
    };

//更新状态

    Scene_Map.prototype.update = function() {
        $G_TaoZhuang.check();
        G_TaoZhuang_Update.call(this);
    };

    Game_Actor.prototype.changeEquip = function(slotId, item) {
        $G_TaoZhuang.check();
        if (this.tradeItemWithParty(item, this.equips()[slotId]) && (!item || this.equipSlots()[slotId] === item.etypeId)) {
            this._equips[slotId].setObject(item);
            this.refresh();
        }
    };
   
    Window_Selectable.prototype.activate = function() {
        $G_TaoZhuang.check();
        Window_Base.prototype.activate.call(this);
        this.reselect();
    };