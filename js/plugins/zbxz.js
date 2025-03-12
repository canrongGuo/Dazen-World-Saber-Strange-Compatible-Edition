//=============================================================================
// PHX_Equip_Restrictions.js
//=============================================================================
/*:
 *
 * @plugindesc Allows the user to set a restrictive level, or set a weapon or 
 * armor's variable value required to equip as well as a Switch.
 * @author Soul Pharonix
 *
 * @help This plugin will allow you to set a required level for armor and 
 * weapons. 
 * This will prevent the equipping of armors and weapons unless the 
 * actor's level meets the required level
 * 
 * You can also set a required switch for equipping of weapons and armors
 * This will prevent the equipping of these equipment types unless the
 * switch's state is "ON"
 *
 * You can also set Required Variables, which will prevent the equipping
 * of an armor or weapon unless the variable's value is equal to or
 * greater than the value specified
 *
 * You may also specify a required actor, which will allow you to only
 * allow the specified actor to equip a weapon or armor.
 * This is useful if you have multiple users of the same class, but you
 * only want a specific character to use it.
 *
 *
 ************NOTE TAGS
 *
 * <req_level:x>
 *
 * This will allow you to restrict a weapon or armor to be equipped only
 * by characters whose level is greater than or equal to x 
 *
 *
 * <req_switch:x>
 * 
 * This will allow you to restrict a weapon or armor to be equipped only
 * when switch x is in the "ON" position.
 *
 * <req_switch:x,y,z>
 *
 * This will allow you to restrict a weapon or armor to be equipped only
 * when switches x, y and z are all in the "ON" position.
 * 
 *
 * <req_var:x,y>
 * 
 * This will allow you to restrict a weapon or armor to be equipped only
 * when the variable x has a value equal to or greater than y.
 *
 * <req_var:x,y;a,b;c,d>
 * 
 * You may specify multiple variable requirements by separating each
 * variable,value pair with a semicolon(;).
 * This will allow you to restrict a weapon or armor to be equipped only
 * when each variable (x,y,z) has a value equal to or greater than their
 * respective values.
 *
 *
 * <req_actors:x> 
 *
 * This will allow you to restrict the equipping of a weapon or armor
 * to the actor whose id is equal to x
 *
 * <req_actors:x,y> 
 *
 * This will allow you to restrict the equipping of a weapon or armor
 * to only the actors whose ids are equal to x or y.
 *
 *
 *
 *
 ************Terms of Use
 *
 * This Script is free to use non-commercially, or commercially.
 * If using commercially, please credit me
 */
 
 
 
 
(function() {
 
var oldcanequipweap = Game_BattlerBase.prototype.canEquipWeapon;
Game_BattlerBase.prototype.canEquipWeapon = function(item) {
return PHX_var_req(item) && PHX_level_req(this._level,item) && PHX_actor_req(this._actorId,item) && PHX_switch_req(item) && oldcanequipweap.call(this,item);
};
 
var oldcanequiparm = Game_BattlerBase.prototype.canEquipArmor;
Game_BattlerBase.prototype.canEquipArmor = function(item) {
return PHX_var_req(item) && PHX_level_req(this._level,item) && PHX_actor_req(this._actorId,item) && PHX_switch_req(item) && oldcanequiparm.call(this,item);
};
 
 
PHX_level_req = function(level, item){
var weaponlevel=0;
 
 if(item.meta.req_level!=null)
 {weaponlevel=item.meta.req_level;}
 else
 {weaponlevel=0;}
 
return level>=weaponlevel;
};
 
PHX_switch_req = function(item){
var str;
var sw;
var req_switches;
if (item.meta.req_switch!=null)
 {str=item.meta.req_switch.toString();
  req_switches=str.split(",");
for (i = 0; i < req_switches.length; i++) {
  sw = req_switches[i];
  truth = $gameSwitches.value(sw);
if (truth === false)
   {break;}
else{}
} 
 }
else
  {truth = true;}
 
return truth;
 
};
 
 
PHX_actor_req = function(actor_id, item){
var actor_ids;
var actor_array;
var atruth = false;
 
if (item.meta.req_actors!=null)
{
atruth=false;
actor_ids = item.meta.req_actors.toString();
actor_array=actor_ids.split(",");
for(i=0; i< actor_array.length; i++) {
if(actor_id == actor_array[i])
{atruth = true;}
 
}
}
else
{atruth = true;}
 
return atruth;
};
 
 
PHX_var_req = function(item){
var str;
var variable_req;
var variable_num;
var variable_val;
var chk_val;
var v_str;
var truth;
var v_array;
 
if (item.meta.req_var!=null)
 {str=item.meta.req_var.toString();
  variable_req=str.split(";");
 
for (i = 0; i < variable_req.length; i++) {
  v_str = variable_req[i];
  v_array = v_str.split(",");
  variable_num=v_array[0];
  variable_val=v_array[1];
  chk_val=$gameVariables.value(variable_num);
  truth = chk_val>=variable_val;
if (truth === false)
   {break;}
else{}
} 
 }
else
  {truth = true;}
 
return truth;
 
};
 
})();