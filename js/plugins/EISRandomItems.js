//=============================================================================
// EISRandomItems.js                                                             
//=============================================================================


/*:
*
* @author Kino
* @plugindesc Allows you to create a random pool of items and pull from them.
*
*
* @help
* Version 1.00
*
//=============================================================================
//   Functions                                                           
//=============================================================================
*
* KR.Helpers.gainRandomItem(array)
* This method takes an array of items that you wish to pool from.
* After that it will return an item to the player.
* 
* Example: KR.Helpers.gainRandomItem(['weapon', 1, 'item', 1, 'item', 2]);
* These are case sensitive and refer to the type of item you want the player
* to gain.
* 
* KR.Helpers.setItemGainAmount(Number)
* This method takes a number, which is used to set the amount of the item
* you gain from the game.
* 
* Example: KR.Helpers.setItemGainAmount(2);
* This would set the gain amount permanently to 2 until the game is restarted.
* If you want to return it to 1, just say KR.Helpers.setItemGainAmount(1);
*
* Tip: You can also set a random Item gain like so:
* KR.Helpers.setItemGainAmount(KR.Helpers.randomNumber(1, 3));
* You'll get 1 - 3 as the number of items gained.
* 
//=============================================================================
//  Contact Information
//=============================================================================
*
* Contact me via twitter: EISKino, or on the rpg maker forums.
* Username on forums: Kino.
*
* Forum Link: http://forums.rpgmakerweb.com/index.php?/profile/75879-kino/
* Twitter Link: https://twitter.com/EISKino
*
* Hope this plugin helps, and enjoy!
* --Kino
*/ 


var KR = KR || {};
KR.Plugins = KR.Plugins || {};
KR.Helpers = KR.Helpers || {};


(function($) {

  var parameters = PluginManager.parameters("EISRandomItems");
  KR.Plugins.EISRandomItems = function() {
    'use strict';

//=============================================================================
// ItemProcessor                                                             
//=============================================================================
    function ItemProcessor() {

    }

    ItemProcessor.itemAmount = 1;

    ItemProcessor.gainRandomItem = function(array) {
      var item = null;
      var args = array;

      item = this.pickItem(args);
      item = this.getGameItem(item.type, item.id);
      $gameParty.gainItem(item, this.itemAmount, true);
    };

    ItemProcessor.pickItem = function(itemList) {
      var item = {};
      var max = itemList.length - 1;
      var index = Math.floor(Math.random() * (max - 0 + 1)) + 0;

      index = (index % 2) === 0 ? index : index - 1;
      item = {
        type: itemList[index],
        id: itemList[index + 1],
      };

      return item;
    };

    ItemProcessor.getGameItem = function(itemType, id) {
      switch(itemType) {
        case 'item':
          return this.getItemFromCategory($dataItems, id);
        case 'weapon':
          return this.getItemFromCategory($dataWeapons, id);
        case 'armor':
          return this.getItemFromCategory($dataArmors, id);
        case 'keyItem':
          return this.getItemFromCategory($dataItems, id);
        default:
          return "No Item Found";
      }
    };

    ItemProcessor.getItemFromCategory = function(itemCategory, id) {
      var item = itemCategory[id];
      return item;
    };

//=============================================================================
// Exports                                                             
//=============================================================================
    $.Helpers.gainRandomItem = function() {
      var args = Array.prototype.slice.call(arguments);
      ItemProcessor.gainRandomItem(args[0]);
    };

    $.Helpers.setItemGainAmount = function(value) {
      ItemProcessor.itemAmount = value;
    };

    $.Helpers.randomNumber = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

  };

  KR.Plugins.EISRandomItems();
})(KR);