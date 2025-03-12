/*---------------------------------------------------------------------------*
 * Torigoya_Achievement2.js v.1.4.0
 *---------------------------------------------------------------------------*
 * 2020/11/26 00:53 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MV
 * @plugindesc 成就插件 (v.1.4.0)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.4.0
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/Torigoya_Achievement2.js
 * @help
 * 実績プラグイン (v.1.4.0)
 * https://torigoya-plugin.rutan.dev
 *
 * 定义成就奖杯式的系统。
 *
 * ------------------------------------------------------------
 * ■ 设定方法
 * ------------------------------------------------------------
 *
 * 请从这个插件的设定中注册成就系统。
 * 按照这里的排列顺序在画面上显示。
 * (排列顺序以后重新排列也没问题)
 *
 * ------------------------------------------------------------
 * ■ 在游戏中取得成就
 * ------------------------------------------------------------
 *
 * 请在插件命令中输入以下内容
 *
 * 実績 ここに管理ID    //修改（ここに管理ID）部分
 *
 * ※请在此处的管理 ID 部分设定在插件设置屏幕上注册的管理 ID。
 *
 * ◇这里我说明一下，就是说在设置成就的管理ID，那边就写管理id
 * ◇例：  管理ID设置的:【测试】那么获取插件指令为 【実績 测试】
 * ◇随便一提，插件最新是1.51，但是作者说1.40和1.51是一样的不用更新插件。
 * ------------------------------------------------------------
 * ■ 其他用途/附加组件 
 * ------------------------------------------------------------
 * 请查看以下文章。
 * https://torigoya-plugin.rutan.dev/system/achievement2/
 *
 * @param base
 * @text ■ 基本設定
 *
 * @param baseAchievementData
 * @text 成就信息登录
 * @type struct<Achievement>[]
 * @parent base
 * @default []
 *
 * @param baseSaveSlot
 * @text 保存数据的插槽名称
 * @type string
 * @parent base
 * @default achievement
 *
 * @param popup
 * @text ■ 弹出窗口设置
 *
 * @param popupEnable
 * @text 弹出显示的ON/OFF
 * @desc 获得成就时要弹出吗？ 
 * @type boolean
 * @parent popup
 * @on 显示
 * @off 不显示
 * @default true
 *
 * @param popupPosition
 * @text 显示位置
 * @desc 成就获取弹窗显示位置 
 * @type select
 * @parent popup
 * @option 左上
 * @value leftUp
 * @option 右上
 * @value rightUp
 * @default leftUp
 *
 * @param popupTopY
 * @text 表示位置: 上端
 * @desc 成就获取弹出显示位置的顶部 
 * @type number
 * @parent popup
 * @min 0
 * @default 10
 *
 * @param popupAnimationType
 * @text 弹出动画
 * @desc 成就获取弹出动画方法
 * 「平滑」需要Torigoya_FrameTween（动画基础插件）.js
 * @type select
 * @parent popup
 * @option 平滑
 * @value tween
 * @option 当场显示
 * @value open
 * @default tween
 *
 * @param popupWait
 * @text 显示时间
 * @desc 成就获取弹出显示时间（秒）
 * ※不包括动画时间
 * @type number
 * @parent popup
 * @decimals 2
 * @min 0
 * @default 1.25
 *
 * @param popupWidth
 * @text 弹出窗口的宽度
 * @desc 成就获取弹窗宽度（px）
 * 如果太小，字符会突出。
 * @type number
 * @parent popup
 * @min 200
 * @default 300
 *
 * @param popupPadding
 * @text 弹出窗口边距
 * @desc 成就获得弹出窗口的空白大小
 * @type number
 * @parent popup
 * @min 0
 * @default 10
 *
 * @param popupTitleFontSize
 * @text 成就名称的文字大小
 * @desc 成就获取弹窗中显示的获取成就名称的字符大小 
 * @type number
 * @parent popup
 * @min 16
 * @default 20
 *
 * @param popupTitleColor
 * @text 成就名称的文字颜色编号
 * @desc 用于显示成就名称字符的颜色
 * ※\c[数字] ←在数字栏中输入的数字 
 * @type number
 * @parent popup
 * @min 0
 * @default 1
 *
 * @param popupMessage
 * @text 消息内容
 * @desc 成就获取弹窗中显示的获取消息内容 
 * @type string
 * @parent popup
 * @default 実績を獲得しました
 *
 * @param popupMessageFontSize
 * @text 消息的文字大小
 * @desc 成就获取弹窗中显示的获取消息的字符大小 
 * @type number
 * @parent popup
 * @min 12
 * @default 16
 *
 * @param popupSound
 * @text 効果音
 * @desc 设置获得成就时播放的音效 
 * @type struct<Sound>
 * @parent popup
 * @default {"soundName":"Saint5","soundVolume":"90"}
 *
 * @param popupWindowImage
 * @text 窗口图像
 * @desc 成就获取弹窗图片 
 * @type file
 * @require true
 * @parent popup
 * @dir img/system/
 * @default Window
 *
 * @param popupOpacity
 * @text 窗口背景透明度
 * @desc 窗口背景透明度 (0-255) 
 * 如果 -1，则使用默认透明度 
 * @type number
 * @parent popup
 * @min -1
 * @max 255
 * @default -1
 *
 * @param titleMenu
 * @text ■ 标题/菜单画面设定
 *
 * @param titleMenuUseInTitle
 * @text 在标题画面中显示
 * @desc 在标题画面上显示成就菜单吗？
 * @type boolean
 * @parent titleMenu
 * @on 显示
 * @off 不显示
 * @default true
 *
 * @param titleMenuUseInMenu
 * @text 显示在菜单画面上
 * @desc 在菜单屏幕上显示成就菜单吗？ 
 * @type boolean
 * @parent titleMenu
 * @on 显示
 * @off 不显示
 * @default true
 *
 * @param titleMenuText
 * @text 项目名称
 * @desc 显示在标题或菜单中时成就菜单的项目名称 
 * @type string
 * @parent title
 * @default 実績
 *
 * @param achievementMenu
 * @text ■ 成就画面设置
 *
 * @param achievementMenuHiddenTitle
 * @text 未获得成就的显示名称
 * @desc 成就画面未取得成就栏中显示的名称 
 * @type string
 * @parent achievementMenu
 * @default ？？？？？
 *
 * @param achievementMenuHiddenIcon
 * @text 未获得成就的图标 ID
 * @desc 成就界面未取得成就栏显示的图标ID 
 * @type number
 * @parent achievementMenu
 * @default 0
 *
 * @param advanced
 * @text ■ 高级设置
 *
 * @param advancedFontFace
 * @text 弹出式字体
 * @desc 设定成就获取弹出显示的字体名称。
 * 如果留空，请使用与其他窗口相同的字体。 
 * @type string
 * @parent advanced
 * @default
 *
 * @param advancedOverwritable
 * @text 重新获得已取得的成就
 * @desc 甚至可以重新获得已经获得的成就 
 * @type boolean
 * @parent advanced
 * @on 打开
 * @off 关闭
 * @default false
 *
 * @param achievementMenuCancelMessage
 * @text 关闭按钮文本
 * @desc 关闭成就界面按钮的文字如果为空，则关闭按钮将不显示 
 * @type string
 * @parent achievementMenu
 * @default 閉じる
 */

/*~struct~Sound:
 * @param soundName
 * @text 效果音文件名
 * @desc 显示成就获取弹窗时播放的音效文件 
 * 如果为空，则没有音效。 
 * @type file
 * @require true
 * @dir audio/se/
 * @default Saint5
 *
 * @param soundVolume
 * @text 効果音的音量
 * @desc 显示成就获取弹窗时播放的音效音量
 * @type number
 * @min 0
 * @max 100
 * @default 90
 */

/*~struct~Achievement:
 * @param key
 * @text 管理ID
 * @desc 获得成就时指定的名称（例如：清除游戏）
 * 数字和日语都可以 / 其他成就都是 NG 
 * @type string
 *
 * @param title
 * @text 显示名
 * @desc 成就名称显示在屏幕上的成就
 * （例如：在激战结束时击败魔王......！） 
 * @type string
 * @default
 *
 * @param description
 * @text 成就的説明文
 * @desc 要在屏幕上显示的成就描述（约 2 行） 
 * @type note
 * @default
 *
 * @param icon
 * @text 成就图标 ID
 * @type number
 * @default 0
 *
 * @param hint
 * @text 获得成就的提示
 * @desc 如果没有获取到可以显示获取方式（大约2行）。
 *  如果留空，将显示正常描述。 
 * @type note
 * @default
 *
 * @param isSecret
 * @text 秘密成就标志
 * @desc 对这个成就的存在保密，
 * 如果没有获得，则不会显示在列表中。 
 * @type boolean
 * @on 保密
 * @off 不保密
 * @default false
 *
 * @param note
 * @text 备注
 * @desc 这是一个备忘录字段。
 * 可以像Maker的备忘录字段一样使用 
 * @type note
 * @default
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'Torigoya_Achievement2';
    }

    function pickStringValueFromParameter(parameter, key, defaultValue = '') {
        if (!parameter.hasOwnProperty(key)) return defaultValue;
        return ''.concat(parameter[key] || '');
    }

    function pickNumberValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseFloat(parameter[key]);
    }

    function pickJsonValueFromParameter(parameter, key) {
        if (!parameter[key]) return parameter[key];
        return JsonEx.parse(parameter[key]);
    }

    function pickBooleanValueFromParameter(parameter, key, defaultValue = 'false') {
        return ''.concat(parameter[key] || defaultValue) === 'true';
    }

    function pickIntegerValueFromParameter(parameter, key, defaultValue = 0) {
        if (!parameter.hasOwnProperty(key) || parameter[key] === '') return defaultValue;
        return parseInt(parameter[key], 10);
    }

    function pickStructSound(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            soundName: pickStringValueFromParameter(parameter, 'soundName', 'Saint5'),
            soundVolume: pickNumberValueFromParameter(parameter, 'soundVolume', 90),
        };
    }

    function pickStructAchievement(parameter) {
        parameter = parameter || {};
        if (typeof parameter === 'string') parameter = JSON.parse(parameter);
        return {
            key: pickStringValueFromParameter(parameter, 'key', undefined),
            title: pickStringValueFromParameter(parameter, 'title', ''),
            description: pickJsonValueFromParameter(parameter, 'description'),
            icon: pickNumberValueFromParameter(parameter, 'icon', 0),
            hint: pickJsonValueFromParameter(parameter, 'hint'),
            isSecret: pickBooleanValueFromParameter(parameter, 'isSecret', false),
            note: pickJsonValueFromParameter(parameter, 'note'),
        };
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.4.0',
            baseAchievementData: ((parameters) => {
                parameters = parameters || [];
                if (typeof parameters === 'string') parameters = JSON.parse(parameters);
                return parameters.map((parameter) => {
                    return pickStructAchievement(parameter);
                });
            })(parameter.baseAchievementData),
            baseSaveSlot: pickStringValueFromParameter(parameter, 'baseSaveSlot', 'achievement'),
            popupEnable: pickBooleanValueFromParameter(parameter, 'popupEnable', true),
            popupPosition: pickStringValueFromParameter(parameter, 'popupPosition', 'leftUp'),
            popupTopY: pickIntegerValueFromParameter(parameter, 'popupTopY', 10),
            popupAnimationType: pickStringValueFromParameter(parameter, 'popupAnimationType', 'tween'),
            popupWait: pickNumberValueFromParameter(parameter, 'popupWait', 1.25),
            popupWidth: pickNumberValueFromParameter(parameter, 'popupWidth', 300),
            popupPadding: pickNumberValueFromParameter(parameter, 'popupPadding', 10),
            popupTitleFontSize: pickNumberValueFromParameter(parameter, 'popupTitleFontSize', 20),
            popupTitleColor: pickNumberValueFromParameter(parameter, 'popupTitleColor', 1),
            popupMessage: pickStringValueFromParameter(parameter, 'popupMessage', '実績を獲得しました'),
            popupMessageFontSize: pickNumberValueFromParameter(parameter, 'popupMessageFontSize', 16),
            popupSound: ((parameter) => {
                return pickStructSound(parameter);
            })(parameter.popupSound),
            popupWindowImage: pickStringValueFromParameter(parameter, 'popupWindowImage', 'Window'),
            popupOpacity: pickNumberValueFromParameter(parameter, 'popupOpacity', -1),
            titleMenuUseInTitle: pickBooleanValueFromParameter(parameter, 'titleMenuUseInTitle', true),
            titleMenuUseInMenu: pickBooleanValueFromParameter(parameter, 'titleMenuUseInMenu', true),
            titleMenuText: pickStringValueFromParameter(parameter, 'titleMenuText', '実績'),
            achievementMenuHiddenTitle: pickStringValueFromParameter(
                parameter,
                'achievementMenuHiddenTitle',
                '？？？？？'
            ),
            achievementMenuHiddenIcon: pickNumberValueFromParameter(parameter, 'achievementMenuHiddenIcon', 0),
            advancedFontFace: pickStringValueFromParameter(parameter, 'advancedFontFace', ''),
            advancedOverwritable: pickBooleanValueFromParameter(parameter, 'advancedOverwritable', false),
            achievementMenuCancelMessage: pickStringValueFromParameter(
                parameter,
                'achievementMenuCancelMessage',
                '閉じる'
            ),
        };
    }

    function isThenable(obj) {
        return obj && typeof obj['then'] === 'function';
    }

    class AchievementManager {
        get achievements() {
            return this._achievements;
        }

        get unlockInfo() {
            return this._unlockInfo;
        }

        get options() {
            return this._options;
        }

        /**
         * 生成
         * @param options
         */
        constructor(options = {}) {
            this._options = options;
            this._achievements = [];
            this._unlockInfo = new Map();
            this._handlers = [];
            this._isReady = false;
        }

        /**
         * 初期化処理
         */
        init() {
            if (this.options.onInit) {
                const result = this.options.onInit(this);
                if (isThenable(result)) {
                    result.then(() => (this._isReady = true));
                } else {
                    this._isReady = true;
                }
            } else {
                this._isReady = true;
            }
        }

        /**
         * 初期化完了
         * @returns {*}
         */
        isReady() {
            return this._isReady;
        }

        /**
         * 実績マスター情報の登録
         */
        setAchievements(achievements) {
            this._achievements = achievements.map((achievement) => {
                if (achievement.note) {
                    DataManager.extractMetadata(achievement);
                } else {
                    achievement.meta = {};
                }
                return achievement;
            });
        }

        /**
         * 獲得済み実績の保存
         * @returns {Promise}
         */
        save() {
            if (this.options.onSave) {
                const result = this.options.onSave(this);
                return isThenable(result) ? result : Promise.resolve();
            }
            return Promise.resolve();
        }

        /**
         * 実績リストを取得
         * @returns {{unlockInfo: any, achievement: *}[]}
         */
        data() {
            return this._achievements.map((achievement) => ({
                achievement,
                unlockInfo: this.unlockInfo.get(achievement.key) || null,
            }));
        }

        /**
         * 指定キーの実績情報を取得
         * @param {string} key  取得する実績のキー
         * @returns {Achievement|null}
         */
        getAchievement(key) {
            key = this.normalizeKey(key);
            return this._achievements.find((achievement) => achievement.key === key) || null;
        }

        /**
         * 獲得済み実績の件数を取得
         * @returns {number}
         */
        getUnlockedCount() {
            return this.unlockInfo.size;
        }

        /**
         * 実績獲得情報の取得
         * @param {string} key  取得するする実績のキー
         * @returns {any | null}
         */
        getUnlockInfo(key) {
            key = this.normalizeKey(key);
            return this.unlockInfo.get(''.concat(key)) || null;
        }

        /**
         * 指定キーの実績が獲得済みであるか？
         * @param {string} key  確認する実績のキー
         * @returns {boolean}
         */
        isUnlocked() {
            return Array.from(arguments).every((key) => {
                key = this.normalizeKey(key);
                return this.unlockInfo.has(key);
            });
        }

        /**
         * すべての実績が獲得済みであるか？
         * @returns {boolean}
         */
        isAllUnlocked() {
            return this.achievements.every((achievement) => {
                return this.unlockInfo.has(achievement.key);
            });
        }

        /**
         * 指定キーの実績が獲得可能であるか？
         * @param {string} key  確認する実績のキー
         * @returns {boolean}
         */
        isUnlockable(key) {
            key = this.normalizeKey(key);
            if (!this.getAchievement(key)) return false;
            if (!this.options.overwritable && this.unlockInfo.has(key)) return false;

            return true;
        }

        /**
         * 指定キーの実績を獲得する
         * @param {string} key  獲得する実績のキー
         * @returns {boolean}   実績獲得処理が実行されたか
         */
        unlock(key) {
            key = this.normalizeKey(key);
            if (!this.isUnlockable(key)) return false;
            this.unlockInfo.set(key, this.makeUnlockData(key));
            this.notify(key);
            this.save();
            return true;
        }

        /**
         * 実績獲得情報を生成する
         * ※アドオンプラグイン等で再定義・加工される想定
         * @param {string} _key 獲得する実績のキー
         * @returns {{date: number}}
         */
        makeUnlockData(_key) {
            return {
                date: Date.now(),
            };
        }

        /**
         * 指定キーの実績獲得イベントの通知
         * @param {string} key 獲得した実績のキー
         */
        notify(key) {
            key = this.normalizeKey(key);
            const achievement = this.getAchievement(key);
            if (!achievement) return;
            const unlockInfo = this.unlockInfo.get(key);
            if (!unlockInfo) return;

            this._handlers.forEach((handler) => {
                handler({ achievement, unlockInfo });
            });
        }

        /**
         * 指定キーの実績を削除する
         * @param key
         */
        remove(key) {
            key = ''.concat(key);
            this.unlockInfo.delete(key);
        }

        /**
         * 全実績を削除する
         * @note 削除後にセーブ処理を呼び出す
         */
        clear() {
            this.resetData();
            this.save();
        }

        /**
         * 実績データのリセット
         */
        resetData() {
            this.unlockInfo.clear();
        }

        /**
         * 実績獲得通知イベントの購読開始
         * @param {Handler} handler
         */
        on(handler) {
            this._handlers.push(handler);
        }

        /**
         * 実績獲得通知イベントの購読解除
         * @param {Handler} handler
         */
        off(handler) {
            this._handlers = this._handlers.filter((h) => h !== handler);
        }

        /**
         * @callback Handler
         * @param {{achievement: any, unlockInfo: any}} responseCode
         */

        /**
         * keyの文字列化
         * @param key
         * @returns {string}
         * @private
         */
        normalizeKey(key) {
            return typeof key === 'string' ? key : ''.concat(key);
        }

        /**
         * 保存したいデータの出力
         */
        createSaveContents() {
            return {
                unlockInfo: Array.from(this.unlockInfo.entries()),
            };
        }

        /**
         * データのインポート
         * @param data
         */
        extractSaveContents(data) {
            try {
                this.resetData();
                data.unlockInfo.forEach(([key, value]) => {
                    if (!this.getAchievement(key)) return;
                    this.unlockInfo.set(key, value);
                });
            } catch (e) {
                console.error(e);
            }
        }
    }

    class AchievementPopupManager {
        get options() {
            return this._options;
        }

        /**
         * 生成
         * @param {AchievementManager} manager
         * @param {any} options
         */
        constructor(manager, options = {}) {
            this._manager = manager;
            this._options = options;
            this._stacks = [];
            this._stackAnimations = [];
            this._soundAnimator = null;
        }

        /**
         * 初期化処理
         */
        init() {
            this._manager.on(this.onNotify.bind(this));
        }

        /**
         * リセット処理
         */
        reset() {
            this._stackAnimations.forEach((tween) => {
                tween.abort();
            });
            this._stacks.forEach(this.destroyPopupWindow.bind(this));

            this._stacks.length = 0;
            this._stackAnimations.length = 0;
        }

        /**
         * 通知処理
         * @param {{achievement: Achievement, unlockInfo: any}} data
         */
        onNotify(data) {
            const popupWindow = this._options.createPopupWindow(data);
            const isLeftUp = this._options.popupPosition === 'leftUp';
            const x = isLeftUp ? this.leftX() : this.rightX() - popupWindow.width;
            const y = (() => {
                let y = this.topY();
                for (let i = 0; i < this._stacks.length; ++i) {
                    const target = this._stacks[i];
                    if (Math.abs(target.y - y) > (target.height + popupWindow.height) / 2) continue;
                    y += popupWindow.y + popupWindow.height + 10;
                }
                return y;
            })();

            if (this._options.popupAnimationType === 'tween' && (Torigoya.FrameTween || Torigoya.Tween)) {
                this._showWithTween(popupWindow, x, y);
            } else {
                this._showWithoutTween(popupWindow, x, y);
            }
        }

        /**
         * Tweenを使った表示処理
         * @param popupWindow
         * @param x
         * @param y
         * @private
         */
        _showWithTween(popupWindow, x, y) {
            const isLeftUp = this._options.popupPosition === 'leftUp';
            const originalOpacity = popupWindow.opacity;
            const originalBackOpacity = popupWindow.backOpacity;

            const Easing = (Torigoya.FrameTween || Torigoya.Tween).Easing;

            const tween = (Torigoya.FrameTween || Torigoya.Tween)
                .create(popupWindow, {
                    x: x + popupWindow.width * (isLeftUp ? -1 : 1),
                    y,
                    opacity: 0,
                    backOpacity: 0,
                    contentsOpacity: 0,
                })
                .to(
                    {
                        x: x,
                        opacity: originalOpacity,
                        backOpacity: originalBackOpacity,
                        contentsOpacity: 255,
                    },

                    30,
                    Easing.easeOutCircular
                )
                .wait(Math.floor(this._options.popupWait * 60))
                .to(
                    {
                        y: y - popupWindow.height,
                        opacity: 0,
                        backOpacity: 0,
                        contentsOpacity: 0,
                    },

                    30,
                    Easing.easeInCircular
                )
                .call(() => {
                    this._stacks = this._stacks.filter((stack) => popupWindow !== stack);
                    this.destroyPopupWindow(popupWindow);
                });
            tween.start();

            this._stacks.push(popupWindow);
            this._stacks.sort((a, b) => a.y - b.y);
            this._stackAnimations.push(tween);

            if (this._soundAnimator) {
                this._soundAnimator.abort();
                this._soundAnimator = null;
            }

            this._soundAnimator = (Torigoya.FrameTween || Torigoya.Tween)
                .create({})
                .wait(1)
                .call(() => {
                    this._options.playSe();
                });
            this._soundAnimator.start();
        }

        /**
         * Tweenを使わない表示処理
         * @param popupWindow
         * @param x
         * @param y
         * @private
         */
        _showWithoutTween(popupWindow, x, y) {
            popupWindow.x = x;
            popupWindow.y = y;
            popupWindow.openness = 0;
            popupWindow.open();
            setTimeout(() => {
                popupWindow.close();
                this._stacks = this._stacks.filter((stack) => popupWindow !== stack);
                setTimeout(() => {
                    if (popupWindow.parent) popupWindow.parent.removeChild(popupWindow);
                }, 500);
            }, this._options.popupWait * 1000);

            this._stacks.push(popupWindow);
            this._stacks.sort((a, b) => a.y - b.y);

            this._options.playSe();
        }

        /**
         * 一番左端
         * @returns {number}
         */
        leftX() {
            return 10;
        }

        /**
         * 一番右端
         * @returns {number}
         */
        rightX() {
            return Graphics.width - 10;
        }

        /**
         * 表示Y座標:上端
         * @returns {number}
         */
        topY() {
            return this._options.topY === undefined ? 10 : this._options.topY;
        }

        /**
         * ポップアップウィンドウの廃棄処理
         * @param popupWindow
         */
        destroyPopupWindow(popupWindow) {
            if (popupWindow.parent) popupWindow.parent.removeChild(popupWindow);
            if (typeof popupWindow.destroy === 'function') popupWindow.destroy();
        }
    }

    Torigoya.Achievement2 = {
        name: getPluginName(),
        parameter: readParameter(),

        // 内部処理用に使うユニークなスロット名（≠localStorageのキー）
        saveSlotID: 'Torigoya Achievement2',
    };

    // -------------------------------------------------------------------------
    // 実績マネージャ

    Torigoya.Achievement2.Manager = new AchievementManager({
        onInit(manager) {
            manager.setAchievements(Torigoya.Achievement2.parameter.baseAchievementData);

            try {
                const obj = JSON.parse(StorageManager.load(Torigoya.Achievement2.saveSlotID));
                manager.extractSaveContents(obj);
            } catch (_e) {
                manager.resetData();
            }
        },
        onSave(manager) {
            StorageManager.save(Torigoya.Achievement2.saveSlotID, JSON.stringify(manager.createSaveContents()));
        },
        overwritable: Torigoya.Achievement2.parameter.advancedOverwritable,
    });

    // -------------------------------------------------------------------------
    // 実績ポップアップ表示マネージャ

    Torigoya.Achievement2.PopupManager = new AchievementPopupManager(Torigoya.Achievement2.Manager, {
        popupPosition: Torigoya.Achievement2.parameter.popupPosition,
        popupWait: Torigoya.Achievement2.parameter.popupWait,
        popupAnimationType: Torigoya.Achievement2.parameter.popupAnimationType,
        topY: Torigoya.Achievement2.parameter.popupTopY,
        createPopupWindow(item) {
            const popupWindow = new Window_AchievementPopup(item);
            SceneManager._scene.addChild(popupWindow); // 行儀悪い

            return popupWindow;
        },
        playSe() {
            const name = Torigoya.Achievement2.parameter.popupSound.soundName;
            if (!name) return;

            AudioManager.playSe({
                name,
                pan: 0,
                pitch: 100,
                volume: Torigoya.Achievement2.parameter.popupSound.soundVolume,
            });
        },
    });

    // -------------------------------------------------------------------------
    // 実績ポップアップウィンドウ

    class Window_AchievementPopup extends Window_Base {
        initialize(item) {
            super.initialize(0, 0, this.windowWidth(), this.windowHeight());
            this._item = item;
            this.refresh();
        }

        windowWidth() {
            return Torigoya.Achievement2.parameter.popupWidth;
        }

        windowHeight() {
            return this.standardFontSize() + this.messageFontSize() + this.standardPadding() * 2 + 5;
        }

        standardFontFace() {
            return Torigoya.Achievement2.parameter.advancedFontFace || super.standardFontFace();
        }

        standardFontSize() {
            return Torigoya.Achievement2.parameter.popupTitleFontSize;
        }

        messageFontSize() {
            return Torigoya.Achievement2.parameter.popupMessageFontSize;
        }

        lineHeight() {
            return this.standardFontSize();
        }

        standardPadding() {
            return Torigoya.Achievement2.parameter.popupPadding;
        }

        refresh() {
            this.contents.clear();
            this.drawIcon(this._item.achievement.icon, 0, 0);
            this.drawTitle();
            this.drawMessage();
        }

        drawTitle() {
            this.resetFontSettings();
            this.drawTextEx(
                '\\c['.concat(Torigoya.Achievement2.parameter.popupTitleColor, ']') + this._item.achievement.title,
                40,
                0
            );
        }

        drawMessage() {
            const textWidth = this.windowWidth() - this.standardPadding() * 2 - 40;
            const y = this.standardFontSize() + 5;
            this.resetTextColor();
            this.contents.fontSize = this.messageFontSize();
            this.contents.drawText(
                Torigoya.Achievement2.parameter.popupMessage,
                40,
                y,
                textWidth,
                this.messageFontSize(),
                'left'
            );
        }

        calcTextHeight() {
            return this.contents.fontSize;
        }

        loadWindowskin() {
            this.windowskin = ImageManager.loadSystem(Torigoya.Achievement2.parameter.popupWindowImage);
        }

        standardBackOpacity() {
            return Torigoya.Achievement2.parameter.popupOpacity === -1
                ? super.standardBackOpacity()
                : Torigoya.Achievement2.parameter.popupOpacity;
        }
    }

    Torigoya.Achievement2.Window_AchievementPopup = Window_AchievementPopup;

    // -------------------------------------------------------------------------
    // 実績一覧ウィンドウ

    class Window_AchievementList extends Window_Selectable {
        initialize(x, y, width, height) {
            super.initialize(x, y, width, height);
            this._data = [];
            this.refresh();
        }

        isRequireCancel() {
            return !!Torigoya.Achievement2.parameter.achievementMenuCancelMessage;
        }

        maxItems() {
            return (this._data ? this._data.length : 0) + (this.isRequireCancel() ? 1 : 0);
        }

        item() {
            return this._data ? this._data[this.index()] : null;
        }

        makeItemList() {
            this._data = Torigoya.Achievement2.Manager.data().filter((param) => this.isVisibleItem(param));
        }

        isCurrentItemEnabled() {
            return !this.item();
        }

        isVisibleItem({ achievement, unlockInfo }) {
            if (unlockInfo) return true;
            return !achievement.isSecret;
        }

        drawItem(index) {
            const item = this._data[index];
            const rect = this.itemRect(index);
            this.resetFontSettings();

            if (item) {
                const iconWidth = Window_Base._iconWidth + 4;
                if (item.unlockInfo) {
                    this.changePaintOpacity(true);
                    this.drawIcon(item.achievement.icon, rect.x, rect.y);
                    this.drawText(item.achievement.title, rect.x + iconWidth, rect.y, rect.width - iconWidth, 'left');
                } else {
                    this.changePaintOpacity(false);
                    this.drawIcon(Torigoya.Achievement2.parameter.achievementMenuHiddenIcon, rect.x, rect.y);
                    this.drawText(
                        Torigoya.Achievement2.parameter.achievementMenuHiddenTitle,
                        rect.x + iconWidth,
                        rect.y,
                        rect.width - iconWidth,
                        'left'
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
        }

        refresh() {
            this.makeItemList();
            this.createContents();
            this.drawAllItems();
        }

        updateHelp() {
            const item = this.item();
            if (item) {
                this.setHelpWindowItem({
                    description: item.unlockInfo
                        ? item.achievement.description
                        : item.achievement.hint || item.achievement.description,
                });
            } else {
                this.setHelpWindowItem(null);
            }
        }

        playBuzzerSound() {
            // nothing to do
        }
    }

    Torigoya.Achievement2.Window_AchievementList = Window_AchievementList;

    // -------------------------------------------------------------------------
    // 実績表示シーン

    class Scene_Achievement extends Scene_MenuBase {
        create() {
            super.create();
            this.createHelpWindow();

            const rect = this.listWindowRect();
            this._listWindow = new Window_AchievementList(rect.x, rect.y, rect.width, rect.height);
            this._listWindow.setHandler('ok', this.onListOk.bind(this));
            this._listWindow.setHandler('cancel', this.onListCancel.bind(this));
            this._listWindow.setHelpWindow(this._helpWindow);
            this.addWindow(this._listWindow);
        }

        listWindowRect() {
            const wx = 0;
            const wy = this._helpWindow.y + this._helpWindow.height;
            const ww = Graphics.boxWidth;
            const wh = Graphics.boxHeight - wy;
            return new Rectangle(wx, wy, ww, wh);
        }

        start() {
            super.start();
            this._listWindow.select(0);
            this._listWindow.activate();
        }

        onListOk() {
            this.onListCancel();
        }

        onListCancel() {
            this.popScene();
        }
    }

    Torigoya.Achievement2.Scene_Achievement = Scene_Achievement;

    (() => {
        // -------------------------------------------------------------------------
        // 保存系処理

        const upstream_StorageManager_localFilePath = StorageManager.localFilePath;
        StorageManager.localFilePath = function (savefileId) {
            if (savefileId === Torigoya.Achievement2.saveSlotID) {
                return ''.concat(this.localFileDirectoryPath(), 'achievements.rpgsave');
            }
            return upstream_StorageManager_localFilePath.apply(this, arguments);
        };

        const upstream_StorageManager_webStorageKey = StorageManager.webStorageKey;
        StorageManager.webStorageKey = function (savefileId) {
            if (savefileId === Torigoya.Achievement2.saveSlotID) {
                return Torigoya.Achievement2.parameter.baseSaveSlot;
            }
            return upstream_StorageManager_webStorageKey.apply(this, arguments);
        };

        // -------------------------------------------------------------------------
        // タイトル画面への追加

        if (Torigoya.Achievement2.parameter.titleMenuUseInTitle) {
            const upstream_Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
            Window_TitleCommand.prototype.makeCommandList = function () {
                upstream_Window_TitleCommand_makeCommandList.apply(this);
                this.addCommand(Torigoya.Achievement2.parameter.titleMenuText, 'Torigoya_Achievement', true);
            };

            const upstream_Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
            Scene_Title.prototype.createCommandWindow = function () {
                upstream_Scene_Title_createCommandWindow.apply(this);
                this._commandWindow.setHandler('Torigoya_Achievement', this.commandTorigoyaAchievement.bind(this));
            };

            Scene_Title.prototype.commandTorigoyaAchievement = function () {
                this._commandWindow.close();
                SceneManager.push(Torigoya.Achievement2.Scene_Achievement);
            };
        }

        // -------------------------------------------------------------------------
        // メニュー画面への追加

        if (Torigoya.Achievement2.parameter.titleMenuUseInMenu) {
            const upstream_Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
            Window_MenuCommand.prototype.addOriginalCommands = function () {
                upstream_Window_MenuCommand_addOriginalCommands.apply(this);
                this.addCommand(Torigoya.Achievement2.parameter.titleMenuText, 'Torigoya_Achievement', true);
            };

            const upstream_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
            Scene_Menu.prototype.createCommandWindow = function () {
                upstream_Scene_Menu_createCommandWindow.apply(this);
                this._commandWindow.setHandler('Torigoya_Achievement', this.commandTorigoyaAchievement.bind(this));
            };

            Scene_Menu.prototype.commandTorigoyaAchievement = function () {
                SceneManager.push(Torigoya.Achievement2.Scene_Achievement);
            };
        }

        // -------------------------------------------------------------------------
        // 起動処理

        const upstream_Scene_Boot_create = Scene_Boot.prototype.create;
        Scene_Boot.prototype.create = function () {
            upstream_Scene_Boot_create.apply(this);
            ImageManager.reserveSystem(Torigoya.Achievement2.parameter.popupWindowImage);
            Torigoya.Achievement2.Manager.init();
        };

        const upstream_Scene_Boot_start = Scene_Boot.prototype.start;
        Scene_Boot.prototype.start = function () {
            upstream_Scene_Boot_start.apply(this);
            if (Torigoya.Achievement2.parameter.popupEnable) {
                Torigoya.Achievement2.PopupManager.init();
            }
        };

        const upstream_Scene_Boot_isReady = Scene_Boot.prototype.isReady;
        Scene_Boot.prototype.isReady = function () {
            return upstream_Scene_Boot_isReady.apply(this) && Torigoya.Achievement2.Manager.isReady();
        };

        // -------------------------------------------------------------------------
        // プラグインコマンド

        const upstream_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function (command, args) {
            switch (command) {
                case 'Achievement':
                case 'GetAchievement':
                case '実績':
                case '実績獲得':
                    Torigoya.Achievement2.Manager.unlock(''.concat(args[0]).trim());
                    return;
                case 'RemoveAchievement':
                case '実績消去':
                case '実績削除':
                    Torigoya.Achievement2.Manager.remove(''.concat(args[0]).trim());
                    return;
                case 'ShowAchievement':
                case '実績表示':
                    SceneManager.push(Torigoya.Achievement2.Scene_Achievement);
                    return;
                case 'ResetAchievement':
                case '実績リセット':
                    Torigoya.Achievement2.Manager.clear();
                    return;
            }

            upstream_Game_Interpreter_pluginCommand.apply(this, arguments);
        };
    })();
})();
