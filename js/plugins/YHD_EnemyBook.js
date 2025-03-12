//=============================================================================
// YHD_EnemyBook.js
//=============================================================================

/*:
 * @plugindesc 怪物图签 
 * @author 永恒
 *
 * @param ---项目栏---
 * @default
 *
 * @param 未知名称
 * @parent ---项目栏---
 * @desc 未知敌人的显示名称。
 * @default ??????
 *
 * @param 项目行数
 * @parent ---项目栏---
 * @type number
 * @min 1
 * @desc 怪物名字项目行数。（默认17，每行35高）
 * @default 17
 *
 * @param 项目列数
 * @parent ---项目栏---
 * @type number
 * @min 1
 * @desc 怪物名字项目列数。（默认5）
 * @default 1
 *
 * @param 项目栏长度
 * @parent ---项目栏---
 * @type number
 * @min 1
 * @desc 项目栏的长度。（默认160）
 * @default 160
 *
 * @param 项目栏高度
 * @parent ---项目栏---
 * @type number
 * @min 1
 * @desc 项目栏的高度。（默认624）
 * @default 624
 *
 * @param 项目栏X坐标平移
 * @parent ---项目栏---
 * @desc 项目栏X坐标平移（负数向左，正数向右）
 * @default 0
 *
 * @param 项目栏Y坐标平移
 * @parent ---项目栏---
 * @desc 项目栏Y坐标平移（负数向上，正数向下）
 * @default 0
 *
 * @param ---明细栏---
 * @default
 *
 * @param 明细栏长度
 * @parent ---明细栏---
 * @type number
 * @min 1
 * @desc 明细栏的长度。（默认656）
 * @default 656
 *
 * @param 明细栏高度
 * @parent ---明细栏---
 * @type number
 * @min 1
 * @desc 明细栏的高度。（默认624）
 * @default 624
 *
 * @param 明细栏X坐标平移
 * @parent ---明细栏---
 * @desc 明细栏X坐标平移（负数向左，正数向右）
 * @default 0
 *
 * @param 明细栏Y坐标平移
 * @parent ---明细栏---
 * @desc 明细栏Y坐标平移（负数向上，正数向下）
 * @default 0
 *
 * @param 怪物极限高度大小
 * @parent ---明细栏---
 * @type number
 * @min 1
 * @desc 怪物图片高度极限大小，如果图片大了，会适当缩小到合适尺寸（默认200）
 * @default 200
 *
 * @param 怪物图片X坐标
 * @parent ---明细栏---
 * @desc 怪物图片X坐标（默认120）
 * @default 120
 *
 * @param 怪物图片Y坐标
 * @parent ---明细栏---
 * @desc 怪物图片Y坐标（默认110）
 * @default 110
 *
 * @param 属性版块X坐标
 * @parent ---明细栏---
 * @desc 属性版块X坐标平移（负数向左，正数向右）
 * @default 0
 *
 * @param 属性版块Y坐标
 * @parent ---明细栏---
 * @desc 属性版块Y坐标平移（负数向上，正数向下）
 * @default 0
 *
 * @param 说明文字版块X坐标
 * @parent ---明细栏---
 * @desc 说明文字版块X坐标平移（负数向左，正数向右）
 * @default 0
 *
 * @param 说明文字版块Y坐标
 * @parent ---明细栏---
 * @desc 说明文字版块Y坐标平移（负数向上，正数向下）
 * @default 0
 *
 * @param 掉落版块X坐标
 * @parent ---明细栏---
 * @desc 掉落版块X坐标平移（负数向左，正数向右）
 * @default 0
 *
 * @param 掉落版块Y坐标
 * @parent ---明细栏---
 * @desc 掉落版块Y坐标平移（负数向上，正数向下）
 * @default 0
 * 
 * @param 物品显示长度
 * @parent ---明细栏---
 * @type number
 * @min 1
 * @desc 掉落物品显示长度（默认150）
 *  注：改为图标长度，可以去名字，图标默认长度32.
 * @default 150
 *
 * @param 换列A
 * @parent ---明细栏---
 * @type number
 * @min 1
 * @desc 第一列显示多少个掉落物？（默认数字8），其实就是第9个道具换到第二列
 * @default 8
 *
 * @param 换列B
 * @parent ---明细栏---
 * @type number
 * @min 1
 * @desc 第二列显示多少个掉落物？（默认数字8），其实就是第9个道具换到第三列
 * @default 8
 *
 * @help 
 *
 * 插件命令:
 *   EnemyBook open         # 打开怪物的图签界面
 *   EnemyBook add 3        # 将3号怪物添加到怪物图签中
 *   EnemyBook remove 4     # 将怪物图签中4号怪物去除
 *   EnemyBook complete     # 开启完整的怪物图签
 *   EnemyBook clear        # 清除所有显示的怪物信息
 *
 * 敌人标签:
 *   <desc1:XXXXXX>         # 敌人书中的描述文字，第1行
 *   <desc2:XXXXXX>         # 敌人书中的描述文字，第2行
 *   <desc3:XXXXXX>         # 敌人书中的描述文字，第3行
 *   <desc4:XXXXXX>         # 敌人书中的描述文字，第4行
 *   <desc5:XXXXXX>         # 敌人书中的描述文字，第5行
 *   <desc6:XXXXXX>         # 敌人书中的描述文字，第6行
 *   <book:no>              # 这个敌人没有出现在怪物图签中
 */





    var parameters = PluginManager.parameters('YHD_EnemyBook');
    var unknownData = String(parameters['未知名称'] || '??????');
	
	var YHD1 = Number(parameters['项目行数'] || '17');
	var YHD2 = Number(parameters['项目列数'] || '1');
	var YHD3 = Number(parameters['怪物极限高度大小'] || '200');
    var YHD5 = Number(parameters['怪物图片X坐标'] || '370');
	var YHD6 = Number(parameters['怪物图片Y坐标'] || '350');
    var YHD7 = Number(parameters['物品显示长度'] || '140');
	var YHD8 = Number(parameters['换列A'] || '8');
    var YHD9 = Number(parameters['换列B'] || '8');	
	var YHD11 = Number(parameters['项目栏长度'] || '160');
	var YHD12 = Number(parameters['项目栏高度'] || '624');
	var YHD13 = Number(parameters['项目栏X坐标平移'] || '0');
	var YHD14 = Number(parameters['项目栏Y坐标平移'] || '0');	
	var YHD15 = Number(parameters['明细栏长度'] || '656');
	var YHD16 = Number(parameters['明细栏高度'] || '624');
	var YHD17 = Number(parameters['明细栏X坐标平移'] || '0');
	var YHD18 = Number(parameters['明细栏Y坐标平移'] || '0');		
	var YHD19 = Number(parameters['属性版块X坐标'] || '0');
	var YHD20 = Number(parameters['属性版块Y坐标'] || '0');	
	var YHD21 = Number(parameters['说明文字版块X坐标'] || '0');
	var YHD22 = Number(parameters['说明文字版块Y坐标'] || '0');		
	var YHD23 = Number(parameters['掉落版块X坐标'] || '0');
	var YHD24 = Number(parameters['掉落版块Y坐标'] || '0');		
	

(function() {

    var parameters = PluginManager.parameters('EnemyBook');
    var unknownData = String(parameters['Unknown Data'] || '??????');

    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'EnemyBook') {
            switch (args[0]) {
            case 'open':
                SceneManager.push(Scene_EnemyBook);
                break;
            case 'add':
                $gameSystem.addToEnemyBook(Number(args[1]));
                break;
            case 'remove':
                $gameSystem.removeFromEnemyBook(Number(args[1]));
                break;
            case 'complete':
                $gameSystem.completeEnemyBook();
                break;
            case 'clear':
                $gameSystem.clearEnemyBook();
                break;
            }
        }
		 }
})();
    

    Game_System.prototype.addToEnemyBook = function(enemyId) {
        if (!this._enemyBookFlags) {
            this.clearEnemyBook();
        }
        this._enemyBookFlags[enemyId] = true;
    };

    Game_System.prototype.removeFromEnemyBook = function(enemyId) {
        if (this._enemyBookFlags) {
            this._enemyBookFlags[enemyId] = false;
        }
    };

    Game_System.prototype.completeEnemyBook = function() {
        this.clearEnemyBook();
        for (var i = 1; i < $dataEnemies.length; i++) {
            this._enemyBookFlags[i] = true;
        }
    };

    Game_System.prototype.clearEnemyBook = function() {
        this._enemyBookFlags = [];
    };

    Game_System.prototype.isInEnemyBook = function(enemy) {
        if (this._enemyBookFlags && enemy) {
            return !!this._enemyBookFlags[enemy.id];
        } else {
            return false;
        }
    };

    var _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        _Game_Troop_setup.call(this, troopId);
        this.members().forEach(function(enemy) {
            if (enemy.isAppeared()) {
                $gameSystem.addToEnemyBook(enemy.enemyId());
            }
        }, this);
    };

    var _Game_Enemy_appear = Game_Enemy.prototype.appear;
    Game_Enemy.prototype.appear = function() {
        _Game_Enemy_appear.call(this);
        $gameSystem.addToEnemyBook(this._enemyId);
    };

    var _Game_Enemy_transform = Game_Enemy.prototype.transform;
    Game_Enemy.prototype.transform = function(enemyId) {
        _Game_Enemy_transform.call(this, enemyId);
        $gameSystem.addToEnemyBook(enemyId);
    };

    function Scene_EnemyBook() {
        this.initialize.apply(this, arguments);
    }

    Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;

    Scene_EnemyBook.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_EnemyBook.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this._indexWindow = new Window_EnemyBookIndex(0, 0);
        this._indexWindow.setHandler('cancel', this.popScene.bind(this));
        var wy = YHD18;
        var ww = YHD15;
        var wh = YHD16;
        this._statusWindow = new Window_EnemyBookStatus(YHD11+YHD17, wy, ww, wh); // 明细栏
        this.addWindow(this._indexWindow);
        this.addWindow(this._statusWindow);
        this._indexWindow.setStatusWindow(this._statusWindow);
    };

    function Window_EnemyBookIndex() {
        this.initialize.apply(this, arguments);
    }

    Window_EnemyBookIndex.prototype = Object.create(Window_Selectable.prototype);
    Window_EnemyBookIndex.prototype.constructor = Window_EnemyBookIndex;

    Window_EnemyBookIndex.lastTopRow = 0;
    Window_EnemyBookIndex.lastIndex  = 0;

    Window_EnemyBookIndex.prototype.initialize = function(x, y) {
        var width = YHD11;
        var height = YHD12;
        Window_Selectable.prototype.initialize.call(this, x + YHD13, y + YHD14, width, height); //项目栏
        this.refresh();
        this.setTopRow(Window_EnemyBookIndex.lastTopRow);
        this.select(Window_EnemyBookIndex.lastIndex);
        this.activate();
    };

    Window_EnemyBookIndex.prototype.maxCols = function() {
        return YHD2;
    };

    Window_EnemyBookIndex.prototype.maxItems = function() {
        return this._list ? this._list.length : 0;
    };

    Window_EnemyBookIndex.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
        this.updateStatus();
    };

    Window_EnemyBookIndex.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        this.updateStatus();
    };

    Window_EnemyBookIndex.prototype.updateStatus = function() {
        if (this._statusWindow) {
            var enemy = this._list[this.index()];
            this._statusWindow.setEnemy(enemy);
        }
    };

    Window_EnemyBookIndex.prototype.refresh = function() {
        this._list = [];
        for (var i = 1; i < $dataEnemies.length; i++) {
            var enemy = $dataEnemies[i];
            if (enemy.name && enemy.meta.book !== 'no') {
                this._list.push(enemy);
            }
        }
        this.createContents();
        this.drawAllItems();
    };

    Window_EnemyBookIndex.prototype.drawItem = function(index) {
        var enemy = this._list[index];
        var rect = this.itemRectForText(index);
        var name;
        if ($gameSystem.isInEnemyBook(enemy)) {
            name = enemy.name;
        } else {
            name = unknownData;
        }
        this.drawText(name, rect.x, rect.y, rect.width);
    };

    Window_EnemyBookIndex.prototype.processCancel = function() {
        Window_Selectable.prototype.processCancel.call(this);
        Window_EnemyBookIndex.lastTopRow = this.topRow();
        Window_EnemyBookIndex.lastIndex = this.index();
    };

    function Window_EnemyBookStatus() {
        this.initialize.apply(this, arguments);
    }

    Window_EnemyBookStatus.prototype = Object.create(Window_Base.prototype);
    Window_EnemyBookStatus.prototype.constructor = Window_EnemyBookStatus;

    Window_EnemyBookStatus.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this._enemy = null;
        this._enemySprite = new Sprite();
        this._enemySprite.anchor.x = 0.5;
        this._enemySprite.anchor.y = 0.5;
        this._enemySprite.x = YHD5; 
        this._enemySprite.y = YHD6;
        this.addChildToBack(this._enemySprite);
        this.refresh();
    };

    Window_EnemyBookStatus.prototype.setEnemy = function(enemy) {
        if (this._enemy !== enemy) {
            this._enemy = enemy;
            this.refresh();
        }
    };

    Window_EnemyBookStatus.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (this._enemySprite.bitmap) {
            var bitmapHeight = this._enemySprite.bitmap.height;
            var contentsHeight = this.contents.height;
            var scale = 1; 
            if (bitmapHeight > YHD3) {  //设置 怪物图片大小
                scale = YHD3 / bitmapHeight;
            }
            this._enemySprite.scale.x = scale;
            this._enemySprite.scale.y = scale;
        }
    };

    Window_EnemyBookStatus.prototype.refresh = function() {  //属性
        var enemy = this._enemy;
        var x = 0;
        var y = 0;
        var lineHeight = this.lineHeight();

        this.contents.clear();

        if (!enemy || !$gameSystem.isInEnemyBook(enemy)) {
            this._enemySprite.bitmap = null;
            return;
        }

        var name = enemy.battlerName;
        var hue = enemy.battlerHue;
        var bitmap;
        if ($gameSystem.isSideView()) {
            bitmap = ImageManager.loadSvEnemy(name, hue);
        } else {
            bitmap = ImageManager.loadEnemy(name, hue);
        }
        this._enemySprite.bitmap = bitmap;

        this.resetTextColor();
        this.drawText(enemy.name, x+15+YHD19, y+200+YHD20);

        x = this.textPadding();
        y = lineHeight + this.textPadding();

        for (var i = 0; i < 8; i++) {
            this.changeTextColor(this.systemColor());
            this.drawText(TextManager.param(i), x+YHD19, y+200+YHD20, 160);
            this.resetTextColor();
            this.drawText(enemy.params[i], x + 125+YHD19, y+200+YHD20, 105, 'right');
            y += lineHeight;
        }

        var rewardsWidth = 350;  
        x = this.contents.width - rewardsWidth + YHD23;
        y = this.textPadding() + 220 + YHD24;
        
        this.resetTextColor();
        this.drawText(enemy.exp, x, y);
        x += this.textWidth(enemy.exp) + 6;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.expA, x, y);
        x += this.textWidth(TextManager.expA + '  ');

        this.resetTextColor();
        this.drawText(enemy.gold, x, y);
        x += this.textWidth(enemy.gold) + 6;
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.currencyUnit, x, y);

        x = this.contents.width - rewardsWidth + YHD23;
        y += lineHeight;

        //*** 下面是显示掉落物品的***
        for (var j = 0; j < enemy.dropItems.length; j++) {
            var di = enemy.dropItems[j];
            if (di.kind > 0) {
                  var item = Game_Enemy.prototype.itemObject(di.kind, di.dataId);
			      this.drawItemName(item, x, y, YHD7); //rewardsWidth
				  if (j == (YHD8-1)) {
					  x += 220;
					  y = 226 + YHD24; 
					}
					if (j == (YHD9+YHD8-1)) {
					  x += 220;
					  y = 226 + YHD24; 
					}
                  y += lineHeight;    
		    }
		}
        //*** 下面是说明栏的的***
        var descWidth = 620;
       // x = this.contents.width - descWidth;
		x = 240 + YHD21;
        y = this.textPadding() + lineHeight * 7 - 265 + YHD22;
        this.drawTextEx(enemy.meta.desc1, x, y + lineHeight * 0, descWidth);
        this.drawTextEx(enemy.meta.desc2, x, y + lineHeight * 1, descWidth);
		this.drawTextEx(enemy.meta.desc3, x, y + lineHeight * 2, descWidth);
		this.drawTextEx(enemy.meta.desc4, x, y + lineHeight * 3, descWidth);
		this.drawTextEx(enemy.meta.desc5, x, y + lineHeight * 4, descWidth);
		this.drawTextEx(enemy.meta.desc6, x, y + lineHeight * 5, descWidth);
    };


