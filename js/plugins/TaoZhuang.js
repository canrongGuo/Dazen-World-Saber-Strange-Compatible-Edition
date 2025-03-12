//=============================================================================
// TaoZhuang.js
//=============================================================================
 
/*:
 * @plugindesc 套装系统v2.0
 * (状态套装插件).
 * @author Banner
 *
 *
 * @help
 *
 * 例子：在状态的备注里面写如下命令
   <TaoZhuang:1,2,3,4,5,6>
   前两个数字表示武器ID，后面的数字表示护甲ID
   这里表示同时穿戴武器ID为1,2护甲ID为3,4,5,6的装备时激活该状态
   0表示不需要
   例如<TaoZhuang:1,0,3>  <TaoZhuang:0,2,3,4>

*/


    var TaoZhuang_parameters = PluginManager.parameters('TaoZhuang');

    TaoZhuang_PluginCommand = Game_Interpreter.prototype.pluginCommand;
    TaoZhuang_Create = DataManager.createGameObjects;
    TaoZhuang_Save = DataManager.makeSaveContents;
    TaoZhuang_Load = DataManager.extractSaveContents;
    TaoZhuang_Update = Scene_Map.prototype.update;


    var $TaoZhuang= null;
 
    DataManager.makeSaveContents = function() {
        contents = TaoZhuang_Save.call(this);
        contents.armorsets = $TaoZhuang;
        return contents;
    };
   
    DataManager.extractSaveContents = function(contents) {
        TaoZhuang_Load.call(this, contents);
        $TaoZhuang = contents.armorsets;
    };
   
    DataManager.createGameObjects = function() {
        TaoZhuang_Create.call(this);
        $TaoZhuang = new TaoZhuang();
    };
    

    function TaoZhuang() {
        this.initialize.apply(this, arguments);
    }
   
    TaoZhuang.prototype.initialize = function() {
        this.clear();
        this.createSets();
    };
   
    TaoZhuang.prototype.clear = function() {
        this._sets = [null];
        this._actors = [];
    };
        
    TaoZhuang.prototype.createSets = function() {
        
		for (var j = 1; j < $dataStates.length; j++) {
			var tstate = $dataStates[j];
			if (tstate && tstate.meta.TaoZhuang) {
				var tstatenote = tstate.meta.TaoZhuang.split(",");
				for (var i = 0; i < tstatenote.length; i++) {
					var tid = Number(tstatenote[i]);
					var armor = $dataArmors[tid];
					if (!this._sets[tstate.id]) this._sets[tstate.id] = [null];
					if(armor){
						this._sets[tstate.id].push(armor.id);
					}else{
						this._sets[tstate.id].push(0);
					}
					
				}
			}
			
		}
				
		
    };
    
    TaoZhuang.prototype.check = function() {
        for (var i = 1; i <= $gameParty.size(); i++) {
            var actor = $gameActors.actor(i);
            for (var j = 1; j < this._sets.length; j++) {
                if(this._sets[j]) {
					var items = this._sets[j];
					for (var k = 1; k < items.length; k++) {
						var itemId = items[k];
						if(k <= 2 ){
							var armor = $dataWeapons[itemId];
							if(armor){
									if (actor.hasWeapon(armor)) {
									actor.addState(j);
								} else {
									actor.removeState(j);
									break;
								}
							}
						}else{
							var armor = $dataArmors[itemId];
							if(armor){
									if (actor.hasArmor(armor)) {
									actor.addState(j);
								} else {
									actor.removeState(j);
									break;
								}
							}							
						}
						actor.clearResult();	
						
						
					}
				}
				
                
            }
        }
    };

//更新状态

    Scene_Map.prototype.update = function() {
        $TaoZhuang.check();
        TaoZhuang_Update.call(this);
    };

    Game_Actor.prototype.changeEquip = function(slotId, item) {
        $TaoZhuang.check();
        if (this.tradeItemWithParty(item, this.equips()[slotId]) && (!item || this.equipSlots()[slotId] === item.etypeId)) {
            this._equips[slotId].setObject(item);
            this.refresh();
        }
    };
   
    Window_Selectable.prototype.activate = function() {
        $TaoZhuang.check();
        Window_Base.prototype.activate.call(this);
        this.reselect();
    };