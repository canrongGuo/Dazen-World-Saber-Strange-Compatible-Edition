//=============================================================================
// 升级回复满状态
// by Banner
// Last Update: 2018.6.8
//=============================================================================

/*:
 * @plugindesc 升级回复满状态
 * @author Banner
 *

 */

var G_maxRecover = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
	G_maxRecover.call(this);
    this._level++;
    this.currentClass().learnings.forEach(function(learning) {
        if (learning.level === this._level) {
            this.learnSkill(learning.skillId);
        }
    }, this);
	this.gainHp(this.mhp);
	this.gainMp(this.mmp);
	this.gainTp(this.mtp);
};