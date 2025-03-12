/*---------------------------------------------------------------------------*
 * Torigoya_Achievement2_AddonCategory.js v.1.1.1
 *---------------------------------------------------------------------------*
 * 2020/08/25 01:40 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MV
 * @plugindesc 成就插件：类别设置 (v.1.1.1)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.1.1
 * @help
 * 成就插件附加组件：类别设置  (v.1.1.1)
 *
 * 此插件是[成就插件]的附加组件。
 * 请安装在成就插件下方。
 *
 * 按类别显示您获得的成就。
 *
 * ------------------------------------------------------------
 * ■ 定义类别类型 
 * ------------------------------------------------------------
 *
 * 这是通过此插件的设置完成的。
 * 从右侧的插件设置中，按照屏幕上的说明创建所需的类别。
 *
 * ＜カテゴリの自動割当＞
 * 可以使用成就插件中设置的管理ID开头的字符串
 * 自动分配类别。
 * 
 *
 * 例如 
 * ・ストーリー_ハジメ村に到着
 * ・ストーリー_ハジメ村ボス撃破
 * 如果您有管理 ID 的跟踪记录，例如，
 * 您可以通过指定「ストーリー」来设置类别，
 * 而无需进行单独设置。
 *
 * ◇类别的位置，不推荐设置上，会挡住部分文字，推荐左右。
 *
 * ------------------------------------------------------------
 * ■ 为每个成就单独设置一个类别
 * ------------------------------------------------------------
 *
 * 在【成就插件的设置，不是本插件】中进行。 
 *
 * 屏幕上有一个备注栏，用于在成就插件中注册成就。
 * 请在备注字段中进行如下设置。
 *
 * <カテゴリ: カテゴリの名前>
 *
 * @param base
 * @text ■ 基本設定
 *
 * @param categories
 * @text 类别设置
 * @desc 设置类别。
 * 请追加必要的个数。
 * @type struct<Category>[]
 * @parent base
 * @default []
 *
 * @param position
 * @text 类别位置
 * @desc 设置类别列表的显示位置。
 * @type select
 * @parent base
 * @option 左(纵向)
 * @value left
 * @option 上(横向)
 * @value top
 * @option 右(纵向)
 * @value right
 * @default top
 *
 * @param maxCols
 * @text 最大列数
 * @desc 一次显示的最大类别数
 * ※仅在类别位置为[上]时有效
 * @type number
 * @parent base
 * @default 4
 */

/*~struct~Category:
 * @param name
 * @text 类别名称
 * @desc 类别的名称。
 * 请在备注字段中指定此处设置的名称。 
 * @type string
 * @default
 *
 * @param prefix
 * @text 自动分配的ID命名规则
 * @desc 将以此处设置的字符串开头的ID结果
 * 自动分配给此类别(如果为空，则为无)
 * @type string
 * @default
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'Torigoya_Achievement2_AddonCategory';
    }

    function pickStringValueFromParameter(parameter, key) {
        return ''.concat(parameter[key] || '');
    }

    function pickNumberValueFromParameter(parameter, key) {
        return parseFloat(parameter[key]);
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.1.1',
            categories: ((parameters) => {
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    if (typeof parameter === 'string') parameter = JSON.parse(parameter);
                    return {
                        name: pickStringValueFromParameter(parameter, 'name'),
                        prefix: pickStringValueFromParameter(parameter, 'prefix'),
                    };
                });
            })(parameter.categories),
            position: pickStringValueFromParameter(parameter, 'position'),
            maxCols: pickNumberValueFromParameter(parameter, 'maxCols'),
        };
    }

    function checkPlugin(obj, errorMessage) {
        if (typeof obj !== 'undefined') return;
        alert(errorMessage);
        throw errorMessage;
    }

    checkPlugin(Torigoya.Achievement2, '「実績アドオン:カテゴリ設定」より上に「実績プラグイン」が導入されていません。');

    Torigoya.Achievement2.Addons = Torigoya.Achievement2.Addons || {};
    Torigoya.Achievement2.Addons.Category = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    class Window_AchievementCategory extends Window_Command {
        constructor(x, y, width, height) {
            super(x, y);
            this._listWindow = null;
            this.width = width;
            this.refresh();
        }

        maxCols() {
            if (Torigoya.Achievement2.Addons.Category.parameter.position === 'top') {
                return Math.min(
                    Torigoya.Achievement2.Addons.Category.parameter.categories.length,
                    Torigoya.Achievement2.Addons.Category.parameter.maxCols
                );
            } else {
                return 1;
            }
        }

        makeCommandList() {
            Torigoya.Achievement2.Addons.Category.parameter.categories.forEach((category) => {
                this.addCommand(category.name, 'category_'.concat(category.name), true, category);
            });

            if (Torigoya.Achievement2.parameter.achievementMenuCancelMessage) {
                this.addCommand(Torigoya.Achievement2.parameter.achievementMenuCancelMessage, 'cancel');
            }
        }

        update() {
            super.update();
            if (this._listWindow) {
                this._listWindow.setCategory(this.currentExt());
            }
        }

        setListWindow(listWindow) {
            this._listWindow = listWindow;
            if (this._listWindow) this._listWindow.setCategory(this.currentExt());
        }
    }

    Torigoya.Achievement2.Addons.Category.Window_AchievementCategory = Window_AchievementCategory;

    (() => {
        const Window_AchievementList = Torigoya.Achievement2.Window_AchievementList;

        Window_AchievementList.prototype.isRequireCancel = function () {
            return false;
        };

        const upstream_Window_AchievementList_makeItemList = Window_AchievementList.prototype.makeItemList;
        Window_AchievementList.prototype.makeItemList = function () {
            upstream_Window_AchievementList_makeItemList.apply(this);
            this._data = this._data.filter((item) => {
                if (!this._category) return false;
                const itemCategory = (
                    item.achievement.meta['カテゴリー'] ||
                    item.achievement.meta['カテゴリ'] ||
                    item.achievement.meta['Category'] ||
                    ''
                ).trim();

                return (
                    itemCategory === this._category.name ||
                    (this._category.prefix && item.achievement.key.startsWith(this._category.prefix))
                );
            });
        };

        Window_AchievementList.prototype.setCategory = function (category) {
            if (this._category === category) return;
            this._category = category;
            this.refresh();
        };
    })();

    (() => {
        const Scene_Achievement = Torigoya.Achievement2.Scene_Achievement;

        const upstream_Scene_Achievement_create = Scene_Achievement.prototype.create;
        Scene_Achievement.prototype.create = function () {
            upstream_Scene_Achievement_create.apply(this);

            const rect = this.categoryWindowRect();
            this._categoryWindow = new Window_AchievementCategory(rect.x, rect.y, rect.width, rect.height);
            this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
            this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
            this._categoryWindow.setListWindow(this._listWindow);
            this.addWindow(this._categoryWindow);
        };

        const upstream_Scene_Achievement_listWindowRect = Scene_Achievement.prototype.listWindowRect;
        Scene_Achievement.prototype.listWindowRect = function () {
            const rect = upstream_Scene_Achievement_listWindowRect.apply(this);
            const categoryRect = this.categoryWindowRect();

            const { position } = Torigoya.Achievement2.Addons.Category.parameter;
            switch (position) {
                case 'left':
                    rect.x += categoryRect.width;
                    rect.width -= categoryRect.width;
                    break;
                case 'top':
                    rect.y += categoryRect.height;
                    rect.height -= categoryRect.height;
                    break;
                case 'right':
                    rect.width -= categoryRect.width;
                    break;
            }

            return rect;
        };

        Scene_Achievement.prototype.categoryWindowRect = function () {
            const { position } = Torigoya.Achievement2.Addons.Category.parameter;

            if (position === 'top') {
                const length = Math.ceil(
                    Torigoya.Achievement2.Addons.Category.parameter.categories.length /
                        Torigoya.Achievement2.Addons.Category.parameter.maxCols
                );

                const wx = 0;
                const wy = this._helpWindow.y + this._helpWindow.height;
                const ww = Graphics.boxWidth;
                const wh = Window_Selectable.prototype.fittingHeight(length);
                return new Rectangle(wx, wy, ww, wh);
            } else {
                const ww = 240;
                const wx = position === 'left' ? 0 : Graphics.boxWidth - ww;
                const wy = this._helpWindow.y + this._helpWindow.height;
                const wh = Graphics.boxHeight - wy;
                return new Rectangle(wx, wy, ww, wh);
            }
        };

        const upstream_Scene_Achievement_start = Scene_Achievement.prototype.start;
        Scene_Achievement.prototype.start = function () {
            upstream_Scene_Achievement_start.apply(this);
            this._listWindow.select(-1);
            this._listWindow.deactivate();
            this._categoryWindow.activate();
        };

        Scene_Achievement.prototype.onCategoryOk = function () {
            this._listWindow.select(0);
            this._listWindow.activate();
            this._categoryWindow.deactivate();
        };

        Scene_Achievement.prototype.onCategoryCancel = function () {
            this.popScene();
        };

        Scene_Achievement.prototype.onListCancel = function () {
            this._listWindow.select(-1);
            this._listWindow.deactivate();
            this._categoryWindow.activate();
            this._helpWindow.clear();
        };
    })();
})();
