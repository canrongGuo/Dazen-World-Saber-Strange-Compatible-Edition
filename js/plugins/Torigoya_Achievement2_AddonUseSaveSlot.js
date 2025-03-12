/*---------------------------------------------------------------------------*
 * Torigoya_Achievement2_AddonUseSaveSlot.js v.1.0.0
 *---------------------------------------------------------------------------*
 * 2020/11/26 00:53 (JST)
 *---------------------------------------------------------------------------*
 * Ruたん ( @ru_shalm )
 * https://torigoya-plugin.rutan.dev
 *---------------------------------------------------------------------------*/

/*:
 * @target MV
 * @plugindesc 成就附加插件:保存成就.(v.1.0.0)
 * @author Ruたん（ru_shalm）
 * @license public domain
 * @version 1.0.0
 * @url https://raw.githubusercontent.com/rutan/torigoya-rpg-maker-plugin/gh-pages/Torigoya_Achievement2_AddonUseSaveSlot.js
 * @help
 * 成就插件附加组件:保存成就 (v.1.0.0)
 * https://torigoya-plugin.rutan.dev
 *
 * 此插件是“成就插件”的附加组件。
 * 请安装在成就插件下方。
 *
 * 通过保存保存成就。 ◇就是说保存游戏后，该成就会永久保存下来。
 * 此插件没有设置项。 
 *
 * 【注意】     
 * 如果启用此附加组件，标题屏幕上的成就显示将无法正常工作。
 * 请关闭成就插件设置中标题画面的菜单显示。 
 * ◇个人实测，一起使用仍能正常工作（待定，或许有，只是我没有发现）
 * ◇如果使用时出现问题，按照上述操作就行。
 */

(function () {
    'use strict';

    const Torigoya = (window.Torigoya = window.Torigoya || {});

    function getPluginName() {
        const cs = document.currentScript;
        return cs ? cs.src.split('/').pop().replace(/\.js$/, '') : 'Torigoya_Achievement2_AddonUseSaveSlot';
    }

    function readParameter() {
        const parameter = PluginManager.parameters(getPluginName());
        return {
            version: '1.0.0',
        };
    }

    function checkPlugin(obj, errorMessage) {
        if (typeof obj !== 'undefined') return;
        alert(errorMessage);
        throw errorMessage;
    }

    checkPlugin(Torigoya.Achievement2, '「実績アドオン:セーブ別実績」より上に「実績プラグイン」が導入されていません。');

    Torigoya.Achievement2.Addons = Torigoya.Achievement2.Addons || {};
    Torigoya.Achievement2.Addons.UseSaveSlot = {
        name: getPluginName(),
        parameter: readParameter(),
    };

    (() => {
        // -------------------------------------------------------------------------
        // Manager

        Torigoya.Achievement2.Manager.options.onInit = function (manager) {
            manager.setAchievements(Torigoya.Achievement2.parameter.baseAchievementData);
        };

        Torigoya.Achievement2.Manager.options.onSave = null;

        // -------------------------------------------------------------------------
        // DataManager

        const upstream_DataManager_createGameObjects = DataManager.createGameObjects;
        DataManager.createGameObjects = function () {
            upstream_DataManager_createGameObjects.apply(this);
            Torigoya.Achievement2.Manager.resetData();
        };

        const upstream_DataManager_makeSaveContents = DataManager.makeSaveContents;
        DataManager.makeSaveContents = function () {
            const contents = upstream_DataManager_makeSaveContents.apply(this);
            contents.torigoyaAchievement2 = Torigoya.Achievement2.Manager.createSaveContents();
            return contents;
        };

        const upstream_DataManager_extractSaveContents = DataManager.extractSaveContents;
        DataManager.extractSaveContents = function (contents) {
            upstream_DataManager_extractSaveContents.apply(this, arguments);

            const { torigoyaAchievement2 } = contents;
            if (torigoyaAchievement2) {
                Torigoya.Achievement2.Manager.extractSaveContents(torigoyaAchievement2);
            }
        };
    })();
})();
