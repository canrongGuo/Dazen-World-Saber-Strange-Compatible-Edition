/*---------------------------------------------------------------------------*
 * Torigoya_Achievement2_AddonTileView.js v.1.1.0
 *---------------------------------------------------------------------------*
 * 2020/08/25 01:23 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MV
 * @plugindesc 成就插件：平铺显示 (v.1.1.0)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.1.0
 * @help
 * 成就插件：平铺显示  (v.1.1.0)
 *
 * 此插件是“成就插件”的附加组件。
 * 请安装在成就插件下方。
 *
 * 将获得的成就列表屏幕显示更改为图标而不是文本 
 * 
 *
 * @param base
 * @text ■ 基本設定
 *
 * @param colsSize
 * @text 显示数（横）
 * @desc 一列中显示的图标个数
 * @type number
 * @parent base
 * @min 1
 * @default 5
 *
 * @param itemPadding
 * @text 图标边距
 * @desc 图标周围的边距 (px) 
 * @type number
 * @parent base
 * @min 0
 * @default 5
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'Torigoya_Achievement2_AddonTileView';
    }

    function pickNumberValueFromParameter(parameter, key) {
        return parseFloat(parameter[key]);
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.1.0',
            colsSize: pickNumberValueFromParameter(parameter, 'colsSize'),
            itemPadding: pickNumberValueFromParameter(parameter, 'itemPadding'),
        };
    }

    function checkPlugin(obj, errorMessage) {
        if (typeof obj !== 'undefined') return;
        alert(errorMessage);
        throw errorMessage;
    }

    checkPlugin(Torigoya.Achievement2, '「実績アドオン:タイル表示」より上に「実績プラグイン」が導入されていません。');

    Torigoya.Achievement2.Addons = Torigoya.Achievement2.Addons || {};
    Torigoya.Achievement2.Addons.TileView = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    (() => {
        const Window_AchievementList = Torigoya.Achievement2.Window_AchievementList;
        const parameter = Torigoya.Achievement2.Addons.TileView.parameter;
        const useCancelMessage = !!Torigoya.Achievement2.parameter.achievementMenuCancelMessage;

        const upstream_Window_AchievementList_initialize = Window_AchievementList.prototype.initialize;
        Window_AchievementList.prototype.initialize = function (x, y, width, height) {
            this._areaRect = new Rectangle(x, y, width, height);
            upstream_Window_AchievementList_initialize.apply(this, arguments);
            this.resizeFittingItems();
            this.refresh();
        };

        Window_AchievementList.prototype.resizeFittingItems = function () {
            const { x, y, width, height } = this._areaRect;

            const h = this.isRequireCancel()
                ? Math.ceil((this.maxItems() - 1) / this.maxCols()) + 1
                : Math.ceil(this.maxItems() / this.maxCols());

            this.width = Math.min(
                this.maxCols() * this.itemWidth() + (this.maxCols() - 1) * this.spacing() + this.padding * 2,
                width
            );

            this.height = Math.max(Math.min(h * this.itemHeight() + this.padding * 2, height), this.fittingHeight(1));
            this.x = x + (width - this.width) / 2;
            this.y = y + (height - this.height) / 2;
        };

        Window_AchievementList.prototype.maxCols = function () {
            return parameter.colsSize;
        };

        Window_AchievementList.prototype.itemWidth = function () {
            return Window_Base._iconWidth + parameter.itemPadding * 2;
        };

        Window_AchievementList.prototype.itemHeight = function () {
            return Window_Base._iconHeight + parameter.itemPadding * 2;
        };

        Window_AchievementList.prototype.lineHeight = function () {
            return this.itemHeight();
        };

        const upstream_Window_AchievementList_drawAllItems = Window_AchievementList.prototype.drawAllItems;
        Window_AchievementList.prototype.drawAllItems = function () {
            this.resizeFittingItems();
            upstream_Window_AchievementList_drawAllItems.apply(this);
        };

        Window_AchievementList.prototype.drawItem = function (index) {
            const item = this._data[index];
            const rect = this.itemRect(index);
            this.resetFontSettings();

            if (item) {
                if (item.unlockInfo) {
                    this.changePaintOpacity(true);
                    this.drawIcon(
                        item.achievement.icon,
                        rect.x + parameter.itemPadding,
                        rect.y + parameter.itemPadding
                    );
                } else {
                    this.changePaintOpacity(false);
                    this.drawIcon(
                        Torigoya.Achievement2.parameter.achievementMenuHiddenIcon,
                        rect.x + parameter.itemPadding,
                        rect.y + parameter.itemPadding
                    );
                }
            } else {
                this.changePaintOpacity(true);
                this.drawText(
                    Torigoya.Achievement2.parameter.achievementMenuCancelMessage,
                    rect.x,
                    rect.y,
                    rect.width,
                    'center'
                );
            }
        };

        const upstream_Window_AchievementList_itemRect = Window_AchievementList.prototype.itemRect;
        Window_AchievementList.prototype.itemRect = function (index) {
            const item = this._data[index];
            if (item || !this.isRequireCancel()) return upstream_Window_AchievementList_itemRect.apply(this, arguments);

            const rect = new Rectangle();
            rect.width = this.width - this.padding * 2;
            rect.height = this.itemHeight();
            rect.x = -this._scrollX;
            rect.y = Math.ceil((this.maxItems() - 1) / this.maxCols()) * rect.height - this._scrollY;
            return rect;
        };

        const upstream_Window_AchievementList_cursorUp = Window_AchievementList.prototype.cursorUp;
        Window_AchievementList.prototype.cursorUp = function (wrap) {
            if (!this.isRequireCancel()) {
                upstream_Window_AchievementList_cursorUp.apply(this, arguments);
                return;
            }

            const index = this.index();
            const maxItems = this.maxItems();
            const maxCols = this.maxCols();
            if (index === maxItems - 1) {
                this.select(index - 1);
            } else if (index >= maxCols || (wrap && maxCols === 1)) {
                this.select((index - maxCols + maxItems) % maxItems);
            }
        };

        const upstream_Window_AchievementList_cursorDown = Window_AchievementList.prototype.cursorDown;
        Window_AchievementList.prototype.cursorDown = function (wrap) {
            if (!this.isRequireCancel()) {
                upstream_Window_AchievementList_cursorDown.apply(this, arguments);
                return;
            }

            const index = this.index();
            const maxItems = this.maxItems();
            const maxCols = this.maxCols();
            if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
                this.select((index + maxCols) % maxItems);
            } else {
                this.select(maxItems - 1);
            }
        };
    })();
})();
