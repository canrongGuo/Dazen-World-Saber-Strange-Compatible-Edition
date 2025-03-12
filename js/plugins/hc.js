//==
// Recipe Crafting MV Version 1.2a
//==

/*:
 * @plugindesc Take some items.. and make them into other items! That's crafting~
 * @author Vlue (with additions from DragonPC)
 *
 * @param Categories
 * @desc The various categories of crafting available
 * @default "Alchemy","Blacksmith","Tailor"
 *
 * @param User Definable Max Level
 * @desc Define the Maximum level the player can reach in the crafting Interface (default - 99)
 * @default 99
 *
 * @param Category Icons
 * @desc The icons (index) to use for the crafting categories
 * @default 219,223,225
 *
 * @param Player Level Icon
 * @desc Icon displayed by Player level (if applicable) in crafting menu
 * @default 82
 *
 * @param Crafting XP Formula
 * @desc The exp needed to determine current crafting level (lvl)
 * @default 100 * lvl
 *
 * @param Craft Multiple
 * @desc Allow crafting of multiple items at once
 * @default true
 *
 * @param Menu Craft Options
 * @desc Whether to allow crafting from menu (off, view, craft)
 * @default craft
 * 
 * @param Display Parameters
 * @desc Include/exclude various details from the recipe window
 * @default gold:true, chance:true, plevel:true, clevel:true
 *
 * @param Required Level Text
 * @desc Change Required Level text. (default - Required level:)
 * @default Required level:
 *
 * @param Required Material Text
 * @desc Change Required Materials text. (default - Required materials:)
 * @default Required materials:
 *
 * @param Success Rate Text
 * @desc Change Success Rate text. (default - Success rate:)
 * @default Success rate:
 *
 * @param Crafting Cost Text
 * @desc Change Crafting Cost text. (default - Crafting costs:)
 * @default Crafting costs:
 *
 * @param Crafting Text
 * @desc Change Crafting Text. (default - Craft)
 * @default Craft
 *
 * @param Crafted Text
 * @desc Change Crafted Text. (default - Crafted!)
 * @default Crafted!
 *
 * @param Crafting Failed
 * @desc Change Crafting Failed Text. (default - Crafting failed!)
 * @default Crafting failed! 
 *
 * @param Max Level Test
 * @desc Text Displayed when reaching max level in a profession.
 * @default MAX LEVEL
 *
 * @param Success 0-20 Color
 * @desc Change Color of the Percentage     (default - 18)
 * @default 18
 *
 * @param Success 20-40 Color
 * @desc Change Color of the Percentage     (default - 20)
 * @default 20
 *
 * @param Success 40-60 Color
 * @desc Change Color of the Percentage     (default - 21)
 * @default 21
 *
 * @param Success 60-80 Color
 * @desc Change Color of the Percentage     (default - 17)
 * @default 17
 *
 * @param Success 80-100 Color
 * @desc Change Color of the Percentage     (default - 29)
 * @default 29
 *
 * @param Crafting Succeded Sound
 * @desc Change Crafting Succeeded Sound.(Case Sensitive)       (default - Item3)
 * @default Item3
 *
 * @param Success Sound Volume
 * @desc Change Crafting Succeeded Sound Volume.        (default - 90)
 * @default 90
 *
 * @param Crafting Failed Sound
 * @desc Change Crafting Failed Sound.(Case Sensitive)      (default - Scream)
 * @default Buzzer2
 *
 * @param Fail Sound Volume
 * @desc Change Crafting Failed Sound Volume.       (default - 90)
 * @default 90
 *
 * @help Recipe Crafting MV v1.2a!
 *  Follow me on twitter: https://twitter.com/DaimoniousTails
 *   Or facebook: https://www.facebook.com/DaimoniousTailsGames/
 *   for the most recent updates!
 *  Find all of my work here: http://daimonioustails.weebly.com/
 *
 * Plugin Commands:
 *  crafting call categoryName            (Example: crafting call Alchemy)
 *  crafting learn recipeID               (Example: crafting learn 1)
 *  crafting forget recipeID
 *
 * Script Calls:
 *  $gameParty.recipeKnown(recipeId)	  (Checks whether a certain recipe is known or not)
 *  $gameparty.getCraftLevel(craftingName)  (Returns the current level of the specific craft)
 *
 * Recipe Setup
 *  Recipes are to be created in a text file named Recipes.txt and placed in the
 *  /data folder of your project. If you notice there's no recipes you might have
 *  it in the wrong spot or not named right!
 * 
 *  <recipe#>
 *   result:{type:"itemtype", id:itemId, amount:numberCrafted}   
 *   <materials>                                 (itemtype is one of: "item","weapon",or "armor")
 *   {type:"itemtype", id:itemId, amount:numberRequired, cons:consumed?}
 *   { + as many as you need }                          
 *   <materials>
 *   category:CategoryOfCraft                           (Name i.e. Blacksmith)
 *   goldCost:costInGold                                (Number)
 *   success:successRateBase                            (Number, 0 = 0%, 100 = 100%)
 *   successGain:successRateChangePerLevelDifference    (Number, %)
 *   level:levelRequired                                (Number)
 *   xp:craftingExpEarned                               (Number)
 *   xpDeprac:lossOfExpPerLevelDifference               (Number)
 *   craftLevel:craftingLevelRequired                   (Number)
 *   pxp:PlayerExpEarned                                (Number)
 *   craftMultiple:allowMultipleCrafts                  (Boolean i.e. true)
 *   known:whetherRecipeIsKnownFromStart                (Boolean i.e. true)
 *  <recipe#>
 *
 *  Everything from goldCost to craftMultiple is optional (will be set to default 0-1 values)
 * 
 *  Simplest recipe (example):
 *   <recipe1>
 *    recipe:{type:"armor", id:3, amount:1}
 *    <materials>
 *     {type:"armor", id:1, amount:3, cons:false}
 *    <materials>
 *    category:Blacksmith
 *   <recipe1>
 *
 *  Full Recipe (example):
 *   <recipe1>
 *    result:{type:"armor", id:3, amount:1}
 *    <materials>
 *    {type:"weapon", id:3, amount:3, cons:false}
 *    {type:"armor", id:2, amount:3, cons:false}
 *    <materials>
 *    goldCost:0
 *    success:80
 *    successGain:2
 *    level:1
 *    category:Alchemy
 *    xp:10
 *    xpDeprac:2
 *    craftLevel:1
 *    pxp:5
 *    craftMultiple:true
 *    known:true
 *   <recipe1>
 *
 */

var $gameRecipes = null;
 
(function() {

	var parameters = PluginManager.parameters('RecipeCrafting');
	var categoryNames = eval("[" + (parameters['Categories'] || '"炼金术","工程","锻造","制皮","裁缝","珠宝","烹饪","附魔","符箓","炼宝","制毒","制蛊"') + "]");
	var categoryIcons = eval("[" + (parameters['Category Icons'] || "1240,1253,1296,1248,1250,1277,1279,1255,1238,1258,902,1290") + "]");
	var xpFormula = parameters['Crafting XP Formula'] || "50 * lvl";
	var craftMultiple = (parameters['Craft Multiple'] || "true").toLowerCase() == "true";
	var craftFromMenu = parameters['Menu Craft Options'] || "craft";
	var tempdParam = "gold:true, chance:false, plevel:true, clevel:true"
	var displayParam = eval( "( { " + (parameters['Display Parameters'] || tempdParam) + " } )");
	var playerLevelIcon = parameters['Player Level Icon'] || 1045;
	
	var reqlevel = parameters['Required Level Text'] || '制作等级需求:';
    var reqmaterial = parameters['Required Material Text'] || '制作材料需求:';
    var sucRate = parameters['Success Rate Text'] || 'Success rate:';
    var craCost = parameters['Crafting Cost Text'] || '制作费用:';
    var craText = parameters['Crafting Text'] || '制作';
    var craftedText = parameters['Crafted Text'] || '制作成功!';
    var craFailed = parameters['Crafting Failed'] || 'Crafting failed!';
    var MLT = parameters['Max Level Test'] || 'MAX LEVEL';
    var success = parameters['Crafting Succeded Sound'] || 'Item3';
    var failure = parameters['Crafting Failed Sound'] || 'Buzzer2';
    var failureVol = Number(parameters['Fail Sound Volume'] || 90);
    var successVol = Number(parameters['Success Sound Volume'] || 90);
    var UDML = Number(parameters['User Definable Max Level'] || 99);
    var colorCPV1 = Number(parameters['Success 0-20 Color'] || 18);
    var colorCPV2 = Number(parameters['Success 20-40 Color'] || 20);
    var colorCPV3 = Number(parameters['Success 40-60 Color'] || 21);
    var colorCPV4 = Number(parameters['Success 60-80 Color'] || 17);
    var colorCPV5 = Number(parameters['Success 80-100 Color'] || 29);
	
	var categoryEventName = "";
	var craftingFromMenu = false;
	
	TextManager.getErrorDetails = function() {
		if($gameMap) {
			return "[Map: " + $gameMap._mapId + "] [Event: " + $gameMap._interpreter._eventId + "] : \n"
		}
	}
	DataManager.loadRecipeFile = function() {
		var xml = new XMLHttpRequest();
		var url = "data/Recipes.txt";
		xml.onload = function() {
			if(xml.status < 400) {
				DataManager.createRecipes(xml.responseText);
			}
		}
		xml.open("GET",url,true);
		xml.send();
	}
	var crafting_DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		crafting_DataManager_createGameObjects.call(this);
		this.loadRecipeFile();
	}
	DataManager.createRecipes = function(recipeData) {
		var recipes = [0];
		if(recipeData) {
			var numberOfRecipes = recipeData.match(/<recipe(\d+)>/g).length / 2;
			for(var i = 1;i <= numberOfRecipes;i++) {
				var recipeString = recipeData.match(new RegExp("<recipe" + i + '>([^.]+)<recipe' + i + ">"));
				if(recipeString) {
					recipes.push(new Recipe(i,this.createRecipeStruct(i, recipeString)));
				} else {
					throw new Error("Recipe list: Could not get data for recipe ID# " + i + ". Check your setup.");
				}
			}
		}
		$gameRecipes = recipes;
	}
	DataManager.createRecipeStruct = function(id, recipeData) {
		if(!recipeData[1].match(/result:/)) { 
			throw new Error("Recipe List: Recipe ID# " + id + " does not have a result.")
		}
		if(recipeData[1].match(/result:/g).length > 1) {
			throw new Error("Recipe List: Possible repeated quest ID. (ID #" + id + ")");
		}
		var recipeStruct = {};
		recipeStruct.result = recipeData[1].match(/result:(.+)/);
		var materialData = recipeData[1].match(/<materials>([^.]+)<materials>/);
		if(materialData) {
			materialData = eval( "[" + materialData[1].split("}").join("},") + "]" );
		} else {
			throw new Error("Recipe List: Recipe ID# " + id + " does not have a proper material setup.")
		}
		recipeStruct.materials = materialData;
		recipeStruct.goldCost = recipeData[1].match(/goldCost:(.+)/);
		recipeStruct.success = recipeData[1].match(/success:(.+)/);
		recipeStruct.successGain = recipeData[1].match(/successGain:(.+)/);
		recipeStruct.level = recipeData[1].match(/level:(.+)/);
		recipeStruct.category = recipeData[1].match(/category:(.+)/);
		recipeStruct.xp = recipeData[1].match(/xp:(.+)/);
		recipeStruct.xpDeprac = recipeData[1].match(/xpDeprac:(.+)/);
		recipeStruct.craftLevel = recipeData[1].match(/craftLevel:(.+)/);
		recipeStruct.playerXp = recipeData[1].match(/pxp:(.+)/);
		recipeStruct.multiple = recipeData[1].match(/craftMultiple:(.+)/);
		recipeStruct.known = recipeData[1].match(/known:(.+)/);
		return recipeStruct;
	}
	
	function Recipe() {
		this.initialize.apply(this, arguments);
	}
	Recipe.prototype.initialize = function(id, recipe) {
		this._id = id;
		try {
			this._result = new Material(eval("("+recipe.result[1]+")"));
		} catch(e) {
			throw new Error("Recipe List: Recipe ID# " + id + " does not have a proper result set up.")
		}
		this._materials = [];
		for(var i = 0;i < recipe.materials.length;i++) {
			this._materials.push(new Material(recipe.materials[i]));
		}
		if(this._materials.length == 0) {
			throw new Error("Recipe List: Recipe ID# " + id + " does not have any set materials.")
		}
		this._goldCost = recipe.goldCost ? Number(recipe.goldCost[1]) : 0;
		this._success = recipe.success ? Number(recipe.success[1]) : 100;
		this._successGain = recipe.successGain ? Number(recipe.successGain[1]) : 0;
		this._level = recipe.level ? Number(recipe.level[1]) : 0;
		this._category = recipe.category ? recipe.category[1] : categoryNames[0];
		this._xp = recipe.xp ? Number(recipe.xp[1]) : 100;
		this._xpDeprac = recipe.xpDeprac ?  Number(recipe.xpDeprac[1]) : 0;
		this._craftLevel = recipe.craftLevel ? Number(recipe.craftLevel[1]) : 1;
		this._pxp = recipe.playerXp ? Number(recipe.playerXp[1]) : 0;
		this._craftMultiple = (recipe.multiple ? recipe.multiple[1] : "true").toLowerCase() == "true";
		this._known = (recipe.known ? recipe.known[1] : "true").toLowerCase() == "true";
	}
	Recipe.prototype.name = function() { return this._result.name(); }
	Recipe.prototype.hasMaterials = function() {
		for(var i = 0;i < this._materials.length;i++) { 
			var material = this._materials[i];
			if($gameParty.numItemsCrafting(material._item) < material._amount) {return false;}
		}
		return true;
	}
	Recipe.prototype.hasGold = function() { return $gameParty.gold() >= this._goldCost;}
	Recipe.prototype.hasCraftLevel = function() { return this._craftLevel <= $gameParty.craftLevel(this.categoryId());}
	Recipe.prototype.hasLevel = function() { return this._level <= $gameParty.highestLevel() && this.hasCraftLevel();}
	Recipe.prototype.craftable = function() { return this.hasGold() && this.hasMaterials() && this.hasLevel();}
	Recipe.prototype.amountCraftable = function() { 
		var amount = null;
		for(var i = 0;i < this._materials.length;i++) {
			var material = this._materials[i];
			var amountNext = $gameParty.numItemsCrafting(material._item) / material._amount
			if(amount) { 
				if(amountNext < amount) {amount = amountNext;}
			} else {
				amount = amountNext;
			}
		}
		var amountGold = this._goldCost > 0 ? $gameParty.gold() / this._goldCost : 99;
		if(amountGold < amount) {amount = amountGold;}
		return Math.floor(amount);
	}
	Recipe.prototype.craft = function(failRate) {
		failRate = failRate || 0;
		this.removeMaterials();
		if(failRate < this.successRate()) {
			return this.addResult();
		}
		return null;
	}
	Recipe.prototype.removeMaterials = function() {
		for(var i = 0;i < this._materials.length;i++) {
			var material = this._materials[i];
			if(material._consumed) {
				$gameParty.gainItem(material._item, -material._amount);
			}
		}
		$gameParty.gainGold(-this._goldCost);
	}
	Recipe.prototype.addResult = function() {
		var newItem = this._result;
		$gameParty.gainItem(newItem._item,newItem._amount);
		$gameParty.gainCraftExp(this.categoryId(), this.xpGain());
		for(var i = 0;i < $gameParty.members().length;i++) {
			$gameParty.members()[i].gainExp(this._pxp);
		}
		return newItem._item;
	}
	Recipe.prototype.categoryId = function() { return categoryNames.indexOf(this._category);}
	Recipe.prototype.xpGain = function() {
		if($gameParty.craftLevel(this.categoryId()) > UDML) { return 0; }
		var levelDiff = $gameParty.craftLevel(this.categoryId()) - this._craftLevel;
		return Math.max(this._xp - this._xpDeprac * levelDiff,0);
	}
	Recipe.prototype.successRate = function() {
		var levelDiff = $gameParty.craftLevel(this.categoryId()) - this._craftLevel;
		return Math.min(this._success + this._successGain * levelDiff,100);
	}
	Recipe.prototype.known = function() {
		return $gameParty.recipeKnown(this._id);
	}
	
	function Material() { 
		this.initialize.apply(this, arguments);
	}
	Material.prototype.initialize = function(material) {
		if(material.type == "item") {this._item = $dataItems[material.id];}
		if(material.type == "weapon") {this._item = $dataWeapons[material.id];}
		if(material.type == "armor") {this._item = $dataArmors[material.id];}
		this._amount = material.amount;
		this._consumed = material.consumed || true;
	}
	Material.prototype.name = function() {
		return this._item.name;
	}
	
	var crafting_game_party_initialize = Game_Party.prototype.initialize;
	Game_Party.prototype.initialize = function() {
		crafting_game_party_initialize.call(this);
		this._craftingLevel = new Array(categoryNames.length);
		this._craftingExp = new Array(categoryNames.length);
		for(var i = 0;i < categoryNames.length;i++) {
			this._craftingLevel[i] = 1;
			this._craftingExp[i] = 0;
		}
		this._recipesKnown = [];
		this.resetKnownRecipes();
	}
	Game_Party.prototype.learnRecipe = function(id) {
		this._recipesKnown[id] = true;
	}
	Game_Party.prototype.forgetRecipe = function(id) {
		this._recipesKnown[id] = false;
	}
	Game_Party.prototype.resetKnownRecipes = function() {
		if($gameRecipes) {
			for(var i = 1;i < $gameRecipes.length;i++) {
				if($gameRecipes[i]._known) {
					this.learnRecipe($gameRecipes[i]._id);
				} else {
					this.forgetRecipe($gameRecipes[i]._id);
				}
			}
		}
	}
	Game_Party.prototype.recipeKnown = function(id) {
		return this._recipesKnown[id];
	}
	Game_Party.prototype.craftLevel = function(id) { return this._craftingLevel[id]; }
	Game_Party.prototype.craftExp = function(id) { return this._craftingExp[id]; }
	Game_Party.prototype.getCraftLevel = function(string) {
		var index = categoryNames.indexOf(string)
		if(index >= 0) {
			return this.craftLevel(categoryNames.indexOf(string));
		} else {
			throw new Error(TextManager.getErrorDetails() + string + " is not a valid crafting category!");
		}
	}
	Game_Party.prototype.craftExpNext = function(id) {
		var string = xpFormula.replace(/\lvl/g, this.craftLevel(id));
		return eval(string);
	} 
	Game_Party.prototype.gainCraftExp = function(id, value) {
		this._craftingExp[id] += value;
		while(this.craftExp(id) >= this.craftExpNext(id)) {
			this._craftingExp[id] -= this.craftExpNext(id);
			this._craftingLevel[id]++;
		}
	}
	Game_Party.prototype.numItemsCrafting = function(item) {
		if(Object.keys(PluginManager.parameters('YEP_ItemCore')).length > 0) {
			return this.numIndependentItems(item);
		} else {
			return this.numItems(item);
		}
	}
	
	function Window_RecipeList() {
		this.initialize.apply(this, arguments);
	}
	Window_RecipeList.prototype = Object.create(Window_Selectable.prototype);
	Window_RecipeList.prototype.constructor = Window_RecipeList;
	Window_RecipeList.prototype.initialize = function(x, y, w, h) {
		Window_Selectable.prototype.initialize.call(this, x, y, w, h);
		this.resetRecipes();
	}
	Window_RecipeList.prototype.maxItems = function() {
		return this._data ? this._data.length : 1;
	}
	Window_RecipeList.prototype.item = function() {
		return this._data && this._index >= 0 ? this._data[this._index] : null;
	}
	Window_RecipeList.prototype.currentItemEnabled = function() {
		return this.enable(this._data[this._index]);
	}
	Window_RecipeList.prototype.include = function(item) {
		if(item == 0) { return false; }
		if(!item.known()) { return false; }
		if(!item.hasCraftLevel()) { return false; }
		if(this._category == "all") {return true;}
		return this._category == item._category;
	}
	Window_RecipeList.prototype.setCategory = function(category) {
		if(category == this._category) { return; }
		this._category = category;
		this.resetRecipes();
	}
	Window_RecipeList.prototype.resetRecipes = function() {
		this._data = [];
		for(var i = 0;i < $gameRecipes.length;i++) {
			var recipe = $gameRecipes[i];
			if(this.include(recipe)) {this._data.push(recipe);}
		}
		this.refresh();
	}
	Window_RecipeList.prototype.isEnabled = function(item) {
		if(item) { return item.craftable(); }
		return false;
	}
	Window_RecipeList.prototype.drawItem = function(index) {
		var item = this._data[index];
		if(item) {
			rect = this.itemRect(index);
			rect.width -= 4;
			this.changePaintOpacity(this.isEnabled(item));
			this.drawItemName(item._result._item, rect.x, rect.y);
			if(item.amountCraftable() > 0) {
				this.drawText("x"+String(item.amountCraftable(),rect.x,rect.y,this.contents.width,"right"));
			}
		}
	}
	Window_RecipeList.prototype.currentItem = function() {
		return this._index >= 0 ? this._data[this._index] : null;
	}
	Window_RecipeList.prototype.processOk = function() {
		if (this.isCurrentItemEnabled() && this.craftMenuOk()) {
			this.playOkSound();
			this.updateInputData();
			this.callOkHandler();
		} else {
			this.playBuzzerSound();
		}
	}
	Window_RecipeList.prototype.craftMenuOk = function() {
		if(craftingFromMenu) {
			if(craftFromMenu == "view") { return false; }
		}
		return true;
	}
	Window_RecipeList.prototype.refresh = function() {
		this.createContents();
		Window_Selectable.prototype.refresh.call(this);
	}
	Window_RecipeList.prototype.contentsHeight = function() {
		return this.maxItems() * this.lineHeight();
	}
	Window_RecipeList.prototype.isCurrentItemEnabled = function() {
		return this.isEnabled(this.currentItem());
	}
	
	function Window_RecipeDetail() {
		this.initialize.apply(this, arguments);
	}
	Window_RecipeDetail.prototype = Object.create(Window_Base.prototype);
	Window_RecipeDetail.prototype.constructor = Window_RecipeDetail;
	Window_RecipeDetail.prototype.initialize = function(x, y, w, h) {
		Window_Base.prototype.initialize.call(this, x, y, w, h);
		this._recipe = null;
	}
	Window_RecipeDetail.prototype.setRecipe = function(recipe) {
		if(recipe == this._recipe) {return;}
		this._recipe = recipe;
		this.refresh();
	}
	Window_RecipeDetail.prototype.refresh = function() {
		this.contents.clear();
		if(this._recipe) {
			if(displayParam.clevel || displayParam.plevel) {this.drawCraftLevel();}
			this.drawMaterials();
			if(displayParam.chance) { this.drawSuccessRate(); }
			if(displayParam.gold) {this.drawGoldCost();}
		}
	}
	Window_RecipeDetail.prototype.drawCraftLevel = function() {
		this.changePaintOpacity(this._recipe.hasLevel());
		this.changeTextColor(this.systemColor());
		this.drawText(reqlevel,0,0,this.contents.width);
		this.changeTextColor(this.normalColor());
		var xx = 0;
		var text = "";
		if(displayParam.plevel) {
			this.drawText(String(this._recipe._level),0,0,this.contents.width,"right");
			this.drawIcon(playerLevelIcon,this.contents.width - 24 - Window_Base._iconWidth,0);
			xx += 68; //HERE
			text = String(this._recipe._craftLevel) + " |";
		} else {
			text = String(this._recipe._craftLevel);
		}
		if(displayParam.clevel) {
			this.drawText(text,0,0,this.contents.width - xx,"right");
			this.drawIcon(categoryIcons[this._recipe.categoryId()],this.contents.width - 75 - xx,0); //HERE
		}
	}
	Window_RecipeDetail.prototype.drawMaterials = function() {
		var yy = 20;
		if(displayParam.clevel || displayParam.plevel) {yy = this.contents.fontSize + 20;}
		this.changePaintOpacity(this._recipe.craftable());
		this.changeTextColor(this.systemColor());
		this.drawText(reqmaterial,0,yy,this.width);
		yy += this.contents.fontSize + this.textPadding();
		for(var i = 0;i < this._recipe._materials.length;i++) {
			var item = this._recipe._materials[i];
			this.changePaintOpacity($gameParty.numItemsCrafting(item._item) >= item._amount);
			this.changeTextColor(this.normalColor());
			this.drawIcon(item._item.iconIndex,12,yy);
			this.drawText(item._item.name,12+Window_Base._iconWidth,yy,this.width);
			var itemAmount = $gameParty.numItemsCrafting(item._item);
			this.changeTextColor(this.textColor(itemAmount >= item._amount ? 3 : 18));
			this.drawText(itemAmount,0,yy,this.contents.width-72,'right');
			this.changeTextColor(this.normalColor());
			var string = " / " + String(item._amount);
			this.drawText(string,0,yy,this.contents.width-12,"right");
			yy += this.contents.fontSize  + this.textPadding();
		}
	}
	Window_RecipeDetail.prototype.drawSuccessRate = function() {
		var successRate = this._recipe.successRate();
		this.changePaintOpacity(this._recipe.craftable());
		this.changeTextColor(this.systemColor());
		var yy = this.contents.height - this.contents.fontSize - this.textPadding() - 6;
		this.drawText(sucRate,0,yy,this.contents.width);
		var color = [colorCPV1,colorCPV2,colorCPV3,colorCPV4,colorCPV5,colorCPV5];
		this.changeTextColor(this.textColor(color[Math.floor(successRate/20)]));
		this.drawText(successRate + "%",0,yy,this.contents.width,"right");
		this.changeTextColor(this.normalColor());
	}
	Window_RecipeDetail.prototype.drawGoldCost = function() {
		if(this._recipe._goldCost > 0) {
			this.changePaintOpacity(this._recipe.hasGold());
			this.changeTextColor(this.systemColor());
			this.drawText(craCost,0,this.contents.height-this.contents.fontSize*2,this.contents.width);
			this.changeTextColor(this.normalColor());
			this.drawCurrencyValue(this._recipe._goldCost,TextManager.currencyUnit,0,this.contents.height-this.contents.fontSize*2,this.contents.width)
		}
	}
	Window_RecipeDetail.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
		var unitWidth = Math.min(80, this.textWidth(unit));
		this.resetTextColor();
		this.changePaintOpacity(this._recipe.hasGold());
		this.drawText(value, x, y, width - unitWidth - 6, 'right');
		this.changeTextColor(this.systemColor());
		this.drawText(unit, x + width - unitWidth, y, unitWidth, 'right');
	}
	
	function Window_RecipeConfirm() {
		this.initialize.apply(this, arguments);
	}
	Window_RecipeConfirm.prototype = Object.create(Window_Selectable.prototype);
	Window_RecipeConfirm.prototype.constructor = Window_RecipeConfirm;
	Window_RecipeConfirm.prototype.initialize = function(x, y, w, h) {
		Window_Selectable.prototype.initialize.call(this, x, y, w, h);
		this._amount = 1;
		this.refresh();
	}
	Window_RecipeConfirm.prototype.itemMax = function() {return 1;}
	Window_RecipeConfirm.prototype.enable = function() {return true;}
	Window_RecipeConfirm.prototype.refresh = function() {
		Window_Selectable.prototype.refresh.call(this);
		this.drawText(craText,0,0,this.contents.width,"center");
		if(this._recipe && this._recipe.craftable()) {
			this.drawText("x" + String(this._amount),0,0,this.contents.width,"right");
		}
	}
	Window_RecipeConfirm.prototype.activate = function() {
		Window_Selectable.prototype.activate.call(this);
		this.select(0);
	}
	Window_RecipeConfirm.prototype.deactivate = function() {
		Window_Selectable.prototype.deactivate.call(this);
		this.deselect();
	}
	Window_RecipeConfirm.prototype.setRecipe = function(recipe) {
		if(recipe == this._recipe) { return; }
		this._recipe = recipe;
		this._amount = 1;
		this.refresh();
	}
	Window_RecipeConfirm.prototype.isCursorMovable = function() {
		return this.isOpenAndActive() && craftMultiple && this._recipe._craftMultiple;
	}
	Window_RecipeConfirm.prototype.cursorDown = function(wrap) { this.changeAmount(-10);}
	Window_RecipeConfirm.prototype.cursorUp = function(wrap) { this.changeAmount(10);}
	Window_RecipeConfirm.prototype.cursorRight = function(wrap) { this.changeAmount(1);}
	Window_RecipeConfirm.prototype.cursorLeft = function(wrap) { this.changeAmount(-1);}
	Window_RecipeConfirm.prototype.changeAmount = function(value) {
		SoundManager.playCursor();
		this._amount += value;
		this._amount = Math.min(Math.max(this._amount,1),this._recipe.amountCraftable());
		this.refresh();
	}
	Window_RecipeConfirm.prototype.onTouch = function(triggered) {
		if (triggered && this.isTouchOkEnabled()) {
			this.processOk();
		}
	};
	
	function Scene_Crafting() {
		this.initialize.apply(this, arguments);
	}
	Scene_Crafting.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_Crafting.prototype.constructor = Scene_Crafting;
	Scene_Crafting.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	}
	Scene_Crafting.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._helpWindow = new Window_Help();
		var width = Graphics.width / 2;
		var height = Graphics.height - this._helpWindow.height; 
		this._listWindow = new Window_RecipeList(0,this._helpWindow.height+72,width,height-72*2);
		this._listWindow.setHandler('ok',this.listSuccess.bind(this));
		this._listWindow.setHandler('cancel',this.cancel.bind(this));
		if(!displayParam.clevel) { this._listWindow.height += this._listWindow.fittingHeight(1); }
		this._listWindow.createContents();
		this._detailWindow = new Window_RecipeDetail(width,this._listWindow.y,width,height-72*2);
		if(!displayParam.gold) { this._detailWindow.height += this._detailWindow.fittingHeight(1); }
		this._detailWindow.createContents();
		height = this._detailWindow.y + this._detailWindow.height;
		this._confirmWindow = new Window_RecipeConfirm(width,height,width,72);
		this._confirmWindow.setHandler('ok',this.craftSuccess.bind(this));
		this._confirmWindow.setHandler('cancel',this.confirmCancel.bind(this));
		if(displayParam.gold) {
			this._goldWindow = new Window_Gold();
			this._goldWindow.width = width;
			this._goldWindow.y = Graphics.height - 72; 
			this._goldWindow.x = width;
		}
		this._popupWindow = new Window_RecPopup();
		this._popupWindow.setHandler('ok',this.popupOk.bind(this));
		this._popupWindow.setHandler('cancel',this.popupOk.bind(this));
		this._commandWindow = new Window_RecCategory();
		this._commandWindow.setHandler('ok',this.commandOk.bind(this));
		this._commandWindow.setHandler('cancel',this.commandCancel.bind(this));
		if(displayParam.clevel) {this._gaugeWindow = new Window_RecGauge();}
		this.addWindow(this._helpWindow);
		this.addWindow(this._listWindow);
		this.addWindow(this._detailWindow);
		this.addWindow(this._confirmWindow);
		if(this._goldWindow) {this.addWindow(this._goldWindow);}
		this.addWindow(this._popupWindow);
		this.addWindow(this._commandWindow);
		if(this._gaugeWindow) {this.addWindow(this._gaugeWindow);}
		this.createButtons();// by Mehmet
	}
	Scene_Crafting.prototype.popupOk = function() {
		this.hideButtons();
		this._popupWindow.deactivate();
		this._popupWindow.close();
		this._listWindow.activate();
	}
	Scene_Crafting.prototype.update = function() {
		Scene_Base.prototype.update.call(this);
		if(this._listWindow.currentItem()) {this._helpWindow.setText(this._listWindow.currentItem()._result._item.description);}
		if(this._commandWindow.isOpenAndActive()) {
			this._helpWindow.setText("");
		}
		this._detailWindow.setRecipe(this._listWindow.currentItem());
		this._confirmWindow.setRecipe(this._listWindow.currentItem());
		this._listWindow.setCategory(categoryNames[this._commandWindow._index]);
		if(this._gaugeWindow) { this._gaugeWindow.setCategory(categoryNames[this._commandWindow._index]);}
		if(this._listWindow.currentItem()) {
			if(this._listWindow.currentItem().craftable()) {
				this._confirmWindow.opacity = 255;
				this._confirmWindow.contentsOpacity = 255;
			} else {
				this._confirmWindow.opacity = 75;
				this._confirmWindow.contentsOpacity = 75;
			}
		}
	}
	Scene_Crafting.prototype.listSuccess = function() {
		this._listWindow.deactivate();
		if(this._goldWindow) {this._goldWindow.close();}
		this._confirmWindow.activate();
		this.placeButtons();
		this.showButtons();
	}
	// by Mehmet
	Scene_Crafting.prototype.createButtons = function() {
		var bitmap = ImageManager.loadSystem('ButtonSet');
		var buttonWidth = 48;
		var buttonHeight = 48;
		this._buttons = [];
		for (var i = 0; i < 5; i++) {
			var button = new Sprite_Button();
			var x = buttonWidth * i;
			var w = buttonWidth * (i === 4 ? 2 : 1);
			button.bitmap = bitmap;
			button.setColdFrame(x, 0, w, buttonHeight);
			button.setHotFrame(x, buttonHeight, w, buttonHeight);
			button.visible = false;
			this._buttons.push(button);
			this.addChild(button);
		}
		this._buttons[0].setClickHandler(this.onButtonDown2.bind(this._confirmWindow));
		this._buttons[1].setClickHandler(this.onButtonDown.bind(this._confirmWindow));
		this._buttons[2].setClickHandler(this.onButtonUp.bind(this._confirmWindow));
		this._buttons[3].setClickHandler(this.onButtonUp2.bind(this._confirmWindow));
		this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
	};

	Scene_Crafting.prototype.placeButtons = function() {
		var numButtons = this._buttons.length;
		var spacing = 16;
		var totalWidth = -spacing;
		for (var i = 0; i < numButtons; i++) {
			totalWidth += this._buttons[i].width + spacing;
		}
		var x = (this._detailWindow.width - totalWidth) / 2;
		for (var j = 0; j < numButtons; j++) {
			var button = this._buttons[j];
			button.x = this._detailWindow.x + x;
			button.y = this._confirmWindow.y - this._confirmWindow.lineHeight() * 2.5;
			x += button.width + spacing;
		}
	};

	Scene_Crafting.prototype.showButtons = function() {
		for (var i = 0; i < this._buttons.length; i++) {
			this._buttons[i].visible = true;
		}
	};
	
	Scene_Crafting.prototype.hideButtons = function() {
		for (var i = 0; i < this._buttons.length; i++) {
			this._buttons[i].visible = false;
		}
	};

	Scene_Crafting.prototype.onButtonUp = function() {
		this.changeAmount(1);
	};
	
	Scene_Crafting.prototype.onButtonUp2 = function() {
		this.changeAmount(10);
	};
	
	Scene_Crafting.prototype.onButtonDown = function() {
		this.changeAmount(-1);
	};
	
	Scene_Crafting.prototype.onButtonDown2 = function() {
		this.changeAmount(-10);
	};

	Scene_Crafting.prototype.onButtonOk = function() {
		if (this._popupWindow.active) {
			this._confirmWindow.changeAmount(-1000);
			this.popupOk();
		} else if (this._confirmWindow.active) {
			this.craftSuccess();
			this._confirmWindow.deactivate();
		}
	};

	Scene_Crafting.prototype.craftSuccess = function() {
		var amount = 0;
		var item = null;
		for(var i = 0;i < this._confirmWindow._amount;i++) {
			var item2 = this._listWindow.currentItem().craft(Math.random() * 100);
			if(item2) { amount++;item = item2;}
		}
		if(item) {
			this._popupWindow.setText(item, amount);
		} else {
			this._popupWindow.setTextFail();
		}
		this._confirmWindow.changeAmount(-1000);
		if(this._goldWindow) {this._goldWindow.refresh();}
		this._listWindow.resetRecipes();
		if(this._gaugeWindow) {this._gaugeWindow.refresh();}
		this._popupWindow.activate();
		this._detailWindow.refresh();
	}
	Scene_Crafting.prototype.confirmCancel = function() {
		this.hideButtons();
		this._confirmWindow.deactivate();
		if(this._goldWindow) {this._goldWindow.open();}
		this._listWindow.activate();
	}
	Scene_Crafting.prototype.commandCancel = function() {
		craftingFromMenu = false;
		this.popScene();
	}
	Scene_Crafting.prototype.cancel = function() {
		this._listWindow.select(-1);
		this._helpWindow.setText("");
		this._commandWindow.activate();
	}
	Scene_Crafting.prototype.commandOk = function() {
		this._listWindow.select(0);
		this._listWindow.activate();
	}
	
	function Scene_CraftingSpecific() {
		this.initialize.apply(this, arguments);
	}
	Scene_CraftingSpecific.prototype = Object.create(Scene_Crafting.prototype);
	Scene_CraftingSpecific.prototype.constructor = Scene_CraftingSpecific;
	Scene_CraftingSpecific.prototype.initialize = function() {
		Scene_Crafting.prototype.initialize.call(this);
	}
	Scene_CraftingSpecific.prototype.create = function() {
		Scene_Crafting.prototype.create.call(this);
		this._commandWindow._index = categoryNames.indexOf(categoryEventName);
		this._commandWindow.deactivate();
		this._commandWindow.visible = false;
		this._listWindow.height += this._listWindow.fittingHeight(1);
		this._listWindow.y -= this._listWindow.fittingHeight(1);
		this._detailWindow.height += this._listWindow.fittingHeight(1);
		this._detailWindow.y -= this._listWindow.fittingHeight(1);
		this._listWindow.createContents();
		this._detailWindow.createContents();
		this._listWindow.select(0);
		this._listWindow.activate();
	}
	Scene_CraftingSpecific.prototype.cancel = function() { this.popScene(); }
	
	
	function Window_RecCategory() {
		this.initialize.apply(this, arguments);
	}
	Window_RecCategory.prototype = Object.create(Window_HorzCommand.prototype);
	Window_RecCategory.prototype.constructor = Window_RecCategory;
	Window_RecCategory.prototype.initialize = function() {
		Window_HorzCommand.prototype.initialize.call(this, 0, this.fittingHeight(2));
	}
	Window_RecCategory.prototype.windowWidth = function() { return Graphics.width; }
	Window_RecCategory.prototype.windowHeight = function() { return this.fittingHeight(1); }
	Window_RecCategory.prototype.makeCommandList = function() {
		for(var i = 0;i < categoryNames.length;i++) {
			this.addCommand(categoryNames[i],categoryNames[i]);
		}
	}
	Window_RecCategory.prototype.itemWidth = function() {return this.width / 5;}
	Window_RecCategory.prototype.drawItem = function(index) {
		this.changePaintOpacity(this.isCommandEnabled(index));
		var rect = this.itemRectForText(index);
		this.drawText(this.commandName(index),rect.x,rect.y,rect.width);
		this.drawIcon(categoryIcons[index],rect.x-Window_Base._iconWidth,rect.y+2);
	}
	Window_RecCategory.prototype.itemRectForText = function(index) {
		var rect = this.itemRect(index);
		rect.x += Window_Base._iconWidth;		
		rect.width -= Window_Base._iconWidth;
		return rect;
	}
	
	function Window_RecPopup() {
		this.initialize.apply(this, arguments);
	}
	Window_RecPopup.prototype = Object.create(Window_Selectable.prototype);
	Window_RecPopup.prototype.constructor = Window_RecPopup;
	Window_RecPopup.prototype.initialize = function() {
		Window_Selectable.prototype.initialize.call(this, Graphics.width/2-this.windowWidth()/2,Graphics.height/2-this.windowHeight()/2,120,this.fittingHeight(1)); 
		this.openness = 0;
		this.deactivate();
	}
	Window_RecPopup.prototype.windowWidth = function() {return 120;} 
	Window_RecPopup.prototype.windowHeight = function() {return this.fittingHeight(1);}
	Window_RecPopup.prototype.setText = function(item, amount) {
		this.contents.clear();
		AudioManager.playSe({name:success,volume:successVol,pitch:100,pan:0})
		var text = String(amount) + "x " + item.name + " " + craftedText;
		var width = this.textWidth(text) + Window_Base._iconWidth;
		this.width = width + this.standardPadding() * 2;
		this.x = (Graphics.width-width)/2
		this.createContents();
		this.drawText(text,Window_Base._iconWidth,0,this.contents.width);
		this.drawIcon(item.iconIndex,0,0);
		this.open();
	}
	Window_RecPopup.prototype.setTextFail = function() {
		this.contents.clear();
		AudioManager.playSe({name:failure,volume:failureVol,pitch:100,pan:0})
		var text = craFailed;
		var width = this.textWidth(text);
		this.width = width + this.standardPadding() * 2;
		this.x = (Graphics.width-width)/2;
		this.createContents();
		this.drawText(text,0,0,this.contents.width);
		this.open();
	}
	Window_RecPopup.prototype.processOk = function() {
		if (this.isCurrentItemEnabled()) {
			this.updateInputData();
			this.deactivate();
			this.callOkHandler();
		} else {
			this.playBuzzerSound();
		}
	}
	
	function Window_RecGauge() {
		this.initialize.apply(this, arguments);
	}
	Window_RecGauge.prototype = Object.create(Window_Base.prototype);
	Window_RecGauge.prototype.constructor = Window_RecGauge;
	Window_RecGauge.prototype.initialize = function() {
		Window_Selectable.prototype.initialize.call(this, 0,Graphics.height-this.fittingHeight(1),Graphics.width/2,this.fittingHeight(1));
		this._category = "all";
	}
	Window_RecGauge.prototype.refresh = function() {
		this.contents.clear();
		if(this._category == "all") {return;}
		this.drawIcon(categoryIcons[this.catIndex()],0,0);
		this.drawText($gameParty.craftLevel(this.catIndex()),Window_Base._iconWidth,0,this.contents.width);
		var rate = $gameParty.craftExp(this.catIndex()) / $gameParty.craftExpNext(this.catIndex());
		if($gameParty.craftLevel(this.catIndex()) == UDML) {
			this.changeTextColor(this.textColor(20));
			this.drawText(MLT,0,0,this.contents.width,"right");
			this.changeTextColor(this.normalColor());
		} else {
			this.drawGauge(96,-3,this.contents.width-96,rate,this.tpGaugeColor1(),this.tpGaugeColor2());
			text = String($gameParty.craftExp(this.catIndex())) + "/" + String($gameParty.craftExpNext(this.catIndex()));
			this.drawText(text,0,0,this.contents.width,"right");
		}
	}
	Window_RecGauge.prototype.setCategory = function(cat) {
		if(cat == this._category) {return;}
		this._category = cat;
		this.refresh();
	}
	Window_RecGauge.prototype.catIndex = function() {
		return categoryNames.indexOf(this._category);
	}
	
	var crafting_window_menucommand_addoriginalcommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		crafting_window_menucommand_addoriginalcommands.call(this);
		if(craftFromMenu != "off") { this.addCommand("制作","crafting"); }
	}
	
	var crafting_scene_menu_createcommandwindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		crafting_scene_menu_createcommandwindow.call(this);
		this._commandWindow.setHandler("crafting",this.commandRecipe.bind(this));
	}
	Scene_Menu.prototype.commandRecipe = function() {
		craftingFromMenu = true;
		SceneManager.push(Scene_Crafting);
	}
	
	var RecipeCrafting_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		RecipeCrafting_Game_Interpreter_pluginCommand.call(this, command, args);
		if(command === 'crafting') {
			if(args[0] === 'call') {
				categoryEventName = args[1]
				if(categoryNames.indexOf(categoryEventName) >= 0) { 
					SceneManager.push(Scene_CraftingSpecific); 
				} else {
					throw new Error(TextManager.getErrorDetails() + "Incorrect category name");
				}
			}
			if(args[0] === 'learn') {
				$gameParty.learnRecipe(args[1]);
			}
			if(args[0] === 'forget') {
				$gameParty.forgetRecipe(args[1]);
			}
		}
	}
	
	//YEP-ITEMCORE
	Game_Party.prototype.numIndependentItems = function(item) {
		if(!item) return null;
		if (DataManager.isIndependent(item)) {
			if (DataManager.isItem(item)) var group = this.items();
			if (DataManager.isWeapon(item)) var group = this.weapons();
			if (DataManager.isArmor(item)) var group = this.armors();
			var baseItemId = item.id;
			var amount = 0;
			for (var i = 0; i < group.length; ++i) {
				var item = group[i];
				if (!item) continue;
				if (!item.baseItemId) continue;
				if (item.baseItemId !== baseItemId) continue;
				if (this.checkItemIsEquipped(item)) continue;
				amount++;
			}
			return amount;
		} else {
			return this.numItems(item);
		}
	}
	

	
	
})();