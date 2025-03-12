/*---------------------------------------------------------------------------*
 * Torigoya_Achievement2_AddonRewardPicture.js v.1.0.1
 *---------------------------------------------------------------------------*
 * 2021/05/01 01:20 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MV
 * @plugindesc 成就插件：奖励图片  (v.1.0.1)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.0.1
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/Torigoya_Achievement2_AddonRewardPicture.js
 * @help
 * 成就插件插件：奖励图片  (v.1.0.1)
 * https://torigoya-plugin.rutan.dev
 *
 * 此插件是[成就插件]的附加组件。
 * 请安装在成就插件下方。 
 *
 * 允许您设置只有取得成就的人才能看到的奖励图像。
 * 请把图片文件放在图片文件夹中。
 *
 * ------------------------------------------------------------
 * ■ 设置方法（有点麻烦）
 * ------------------------------------------------------------
 * 在该插件右侧的设置中，
 * 您可以设置[为哪个成就 ID 指定什么图像]。 
 *
 * 请通过将图片与成就插件主体上
 * 设置的每个成就的ID相关联进行注册。
 * （如果您有未注册图像的记录也可以） 
 *
 * @param base
 * @text ■ 基本設定
 *
 * @param baseRewardData
 * @text 注册奖励图片 
 * @type struct<RewardPicture>[]
 * @parent base
 * @default []
 */

/*~struct~RewardPicture:
 * @param key
 * @text 成就ID
 * @desc 设置奖励图片的目标，成就插件中设置的成就ID。 
 * @type string
 * @default
 *
 * @param picture
 * @text 奖励的图像
 * @desc 请选择一张图片作为奖励显示。
 *  可以指定多个图像。 
 * @type file[]
 * @require true
 * @dir img/pictures
 * @default []
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'Torigoya_Achievement2_AddonRewardPicture';
    }

    function pickStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return ''.concat(parameter[key] || '');
    }

    function pickStringValueFromParameterList(parameter, key, defaultValue = []) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parameter[key] ? JSON.parse(parameter[key]) : [];
    }

    function pickStructRewardPicture(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            key: pickStringValueFromParameter(parameter, 'key', ''),
            picture: pickStringValueFromParameterList(parameter, 'picture', []),
        };
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.0.1',
            baseRewardData: ((parameters) => {
                parameters = parameters || [];
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    return pickStructRewardPicture(parameter);
                });
            })(parameter.baseRewardData),
        };
    }

    function checkPlugin(obj, errorMessage) {
        if (typeof obj !== 'undefined') return;
        alert(errorMessage);
        throw errorMessage;
    }

    checkPlugin(
        Torigoya.Achievement2,
        '「実績アドオン:ご褒美ピクチャー」より上に「実績プラグイン」が導入されていません。'
    );

    Torigoya.Achievement2.Addons = Torigoya.Achievement2.Addons || {};
    Torigoya.Achievement2.Addons.RewardPicture = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    (() => {
        function findRewardPicture(item) {
            if (!item) return null;
            return Torigoya.Achievement2.Addons.RewardPicture.parameter.baseRewardData.find(
                (n) => n.key === item.achievement.key
            );
        }

        // -------------------------------------------------------------------------
        // Window_AchievementReward

        class Window_AchievementReward extends Window_Selectable {
            initialize(x, y, width, height) {
                super.initialize(x, y, width, height);
                this.opacity = 0;
                this._pageIndex = 0;
            }

            maxItems() {
                return 1;
            }

            itemHeight() {
                return this.height - this.padding * 2;
            }

            itemPadding() {
                return 0;
            }

            setReward(reward) {
                this._reward = reward;
                this._pageIndex = 0;
                this.refresh();
            }

            refresh() {
                this.contents.clear();
                if (!this._reward) return;

                const picture = this.currentPicture();
                const bitmap = ImageManager.loadPicture(picture);
                if (bitmap.isReady()) {
                    this._drawRewardPicture(bitmap);
                } else {
                    bitmap.addLoadListener(() => {
                        if (picture !== this.currentPicture()) return;
                        this._drawRewardPicture(bitmap);
                    });
                }
            }

            currentPicture() {
                if (!this._reward) return null;
                return this._reward.picture[this._pageIndex];
            }

            hasNextPicture() {
                if (!this._reward) return false;
                return !!this._reward.picture[this._pageIndex + 1];
            }

            changeNextPage() {
                ++this._pageIndex;
                this.refresh();
            }

            _drawRewardPicture(bitmap) {
                this.contents.clear();

                const r = Math.min(1, this.itemWidth() / bitmap.width, this.itemHeight() / bitmap.height);
                const drawWidth = Math.round(bitmap.width * r);
                const drawHeight = Math.round(bitmap.height * r);
                this.contents.blt(
                    bitmap,
                    0,
                    0,
                    bitmap.width,
                    bitmap.height,
                    (this.itemWidth() - drawWidth) / 2,
                    (this.itemHeight() - drawHeight) / 2,
                    drawWidth,
                    drawHeight
                );
            }

            _updateCursor() {
                this._windowCursorSprite.visible = false;
            }
        }

        Torigoya.Achievement2.Addons.RewardPicture.Window_AchievementReward = Window_AchievementReward;

        // -------------------------------------------------------------------------
        // Window_AchievementList

        const upstream_Window_AchievementList_isCurrentItemEnabled =
            Torigoya.Achievement2.Window_AchievementList.prototype.isCurrentItemEnabled;
        Torigoya.Achievement2.Window_AchievementList.prototype.isCurrentItemEnabled = function () {
            const item = this.item();
            if (item && item.unlockInfo && findRewardPicture(item)) return true;
            return upstream_Window_AchievementList_isCurrentItemEnabled.apply(this);
        };

        // -------------------------------------------------------------------------
        // Scene_Achievement

        const upstream_Scene_Achievement_create = Torigoya.Achievement2.Scene_Achievement.prototype.create;
        Torigoya.Achievement2.Scene_Achievement.prototype.create = function () {
            upstream_Scene_Achievement_create.apply(this);

            this._rewardWindow = new Window_AchievementReward(0, 0, Graphics.boxWidth, Graphics.boxHeight);
            this._rewardWindow.setHandler('ok', this.onRewardOk.bind(this));
            this._rewardWindow.setHandler('cancel', this.onRewardCancel.bind(this));
            this._rewardWindow.hide();
            this.addWindow(this._rewardWindow);
        };

        Torigoya.Achievement2.Scene_Achievement.prototype.onRewardOk = function () {
            if (this._rewardWindow.hasNextPicture()) {
                this._rewardWindow.changeNextPage();
                this._rewardWindow.activate();
            } else {
                this.hideRewardWindow();
            }
        };

        Torigoya.Achievement2.Scene_Achievement.prototype.onRewardCancel = function () {
            this.hideRewardWindow();
        };

        const upstream_Scene_Achievement_onListOk = Torigoya.Achievement2.Scene_Achievement.prototype.onListOk;
        Torigoya.Achievement2.Scene_Achievement.prototype.onListOk = function () {
            const reward = findRewardPicture(this._listWindow.item());
            if (reward) {
                this._rewardWindow.setReward(reward);
                this.showRewardWindow();
            } else {
                upstream_Scene_Achievement_onListOk.apply(this);
            }
        };

        Torigoya.Achievement2.Scene_Achievement.prototype.showRewardWindow = function () {
            const activeWindows = this._windowLayer.children.filter((win) => {
                if (win instanceof Sprite_Button) return false;
                return !win._hidden;
            });
            this._rewardHideWindows = activeWindows;
            activeWindows.forEach((win) => win.hide());

            this._rewardWindow.show();
            this._rewardWindow.activate();
        };

        Torigoya.Achievement2.Scene_Achievement.prototype.hideRewardWindow = function () {
            if (this._rewardHideWindows) {
                this._rewardHideWindows.forEach((win) => win.show());
                this._rewardHideWindows = null;
            }
            this._rewardWindow.hide();
            this._listWindow.show();
            this._listWindow.activate();
        };
    })();
})();
