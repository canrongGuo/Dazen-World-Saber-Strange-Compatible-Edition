/*:
-------------------------------------------------------------------------------
@title mapDamagePopup
@author gonglinyuan
@version 0.1.0
@date 2016-04-19
@filename Util_MapDamagePopup.js
-------------------------------------------------------------------------------
@plugindesc pop up damage on map characters
@help 
You can invoke the mapDamagePopup with the following pluginCommand:
mapDamagePopup <character> <row> <value> [isCritical?]
<character>: Number of character on a map to show the damage. A positive number indicates an event number. 0 indicates the current event. -1 indicates the player. -2,-3,-4,... indicates followers.
<row>: Number of rows in "System/Damage.png". Numbered form 0 to 4. Row 4 indicates "Miss".
<value>: Value of damage. It is supposed to be above 0. (If it is negative, it might make the row to increase 1 according to the implementation of "createDigits" method.) 
[isCritical?]: Whether it is critical damage or not. "true" indicates it is critical, otherwise not.
 */
(function() {
 
        var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
        Sprite_Character.prototype.initMembers = function() {
                _Sprite_Character_initMembers.call(this);
                this._damages = [];
        };
 
        Sprite_Character.prototype.updateDamagePopup = Sprite_Battler.prototype.updateDamagePopup;
 
        Sprite_Character.prototype.setupDamagePopup = function() {
                if (this._character._spriteDamage) {
                        this._character._spriteDamage.x = this.x;
                        this._character._spriteDamage.y = this.y;
                        this._character._spriteDamage.z = this.z + 1;
                        this._damages.push(this._character._spriteDamage);
                        this.parent.addChild(this._character._spriteDamage);
                        this._character._spriteDamage = null;
                }
        };
 
        var _Sprite_Character_update = Sprite_Character.prototype.update;
        Sprite_Character.prototype.update = function() {
                _Sprite_Character_update.call(this);
                this.updateDamagePopup();
        };
 
        var _Game_Character_initMembers = Game_Character.prototype.initMembers;
        Game_Character.prototype.initMembers = function() {
                _Game_Character_initMembers.call(this);
                this._spriteDamage = null;
        };
 
        var getTarget = function(target) {
                if (target < -1) {
                        return $gamePlayer.followers().follower(-target - 2);
                } else if (target == -1) {
                        return $gamePlayer;
                } else if (target == 0) {
                        return $gameMap.event(this.eventId());
                } else if (target > 0) {
                        return $gameMap.event(target);
                }
        }
 
        var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
                _Game_Interpreter_pluginCommand.call(this, command, args);
                if (command == "mapDamagePopup") {
                        var target = getTarget.call(this, Number(args[0]));
                        var row = Number(args[1]);
                        var value = Number(args[2]);
                        var sprite = new Sprite_Damage();
                        if (row < 4) {
                                sprite.createDigits(row, value);
                        } else {
                                sprite.createMiss();
                        }
                        if (args[3] === "true") {
                                sprite.setupCriticalEffect();
                        }
                        console.log(target, row, value, sprite);
                        target._spriteDamage = sprite;
                }
        };
})();
