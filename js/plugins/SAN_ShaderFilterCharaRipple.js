//=============================================================================
// SAN_ShaderFilterCharaRipple.js
//=============================================================================
// Copyright (c) 2018 Sanshiro
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @plugindesc キャラクター波紋エフェクトフィルター 1.0.0
 * キャラクターの周囲に波紋のエフェクトを表示するフィルターです。
 * @author Sanshiro https://github.com/rev2nym
 * @help
 * ■概要
 * キャラクターの周囲に波紋のエフェクトを表示するフィルターです。
 * このプラグインはシェーダーフィルターシステムのサブプラグインです。
 * 
 * ■前提のコアプラグイン
 * このプラグインは前提のコアプラグインとして
 * 併せて配布される「SAN_ShaderFilter.js」を使用します。
 * あらかじめ導入してください。
 * 
 * ■シェーダーコードファイル
 * このプラグインはシェーダーコードファイルとして
 * 「SAN_CharaRippleFrag.txt」を使用します。
 * 「glsl」フォルダにあらかじめ配置してください。
 * 
 * ■基本的な仕組み
 * 基本的な仕組みはコアプラグインのヘルプを参照してください。
 * 
 * ■パラメータの作成
 * 次のスクリプトコマンドでパラメーターを作成します。
 * 例：
 * new GLSLCharaRippleFilterParam({
 *     speed: 1.0, // エフェクトスピード
 *     fadeFrame: 60, // フェードフレームカウント
 *     fadeState: 'fadedOut', // フェード状態
 *     charaType: 'player', // キャラクタータイプ
 *     charaId: 1, // キャラクターID
 *     pitch: 1.0, // エフェクトピッチ
 *     innerRadius: 24.0, // エフェクト内径
 *     outerRadius: 72.0, // エフェクト外径
 *     strength: 1.0, // エフェクト強度
 *     color: {r: 1.0, g: 1.0, b: 2.0} // エフェクト色
 * });
 * 
 * それぞれの項目は順不同かつ省略可能です。
 * また設定値ごと省略することもできます。
 * 例：
 * new GLSLCharaRippleFilterParam();
 * 
 * ・エフェクトスピード：speed
 * エフェクトのスピードです。
 * 数値が0.0に近づくほど遅くなります。
 * マイナスの値も設定できます。
 * 省略可能です。省略した場合は 1.0 が設定されます。
 * 
 * ・フェードフレームカウント：fadeFrame
 * フェードイン、フェードアウトに要するフレーム数です。
 * 省略可能です。省略した場合は 60 が設定されます。
 * 
 * ・フェード状態：fadeState
 * フェードの状態を表します。
 * 'fadingIn'（フェードイン中）、'fadedIn'（フェードイン完了）、
 * 'fadingOut'（フェードアウト中）、'fadedOut'（フェードアウト完了）の
 * 4つの状態を取り得ます。 
 * 'fadingIn' を設定した場合は即座にフェードインを開始します。
 * 省略可能です。省略した場合は 'fadedOut' が設定されます。
 * 
 * ・キャラクタータイプ：charaType
 * エフェクトの中心となるキャラクターのタイプを指定します。
 * 'player'（プレイヤー）、'follower'（フォロワー）、'event'（イベント）の
 * 3つのタイプから指定することが可能です。
 * 省略可能です。省略した場合は 'player' が設定されます。
 * 
 * ・キャラクターID：charaId
 * エフェクトの中心となるキャラクターのIDを指定します。
 * キャラクタータイプで 'follower' を指定した場合は
 * フォロワーインデックス（パーティの2人目のIDが1）が
 * 'event' を指定した場合はイベントIDが対応します。
 * 省略可能です。省略した場合は 1 が設定されます。
 * 
 * ・エフェクトピッチ：pitch
 * エフェクトのピッチを指定します。
 * この数値が大きくなるほどエフェクトの紋様が細かくなります。
 * 省略可能です。省略した場合は 1.0 が設定されます。
 * 
 * ・エフェクト内径：innerRadius
 * エフェクトの内径をピクセル単位で設定します。
 * この数値より小さい範囲はドーナツの穴のようにエフェクトが表示されません。
 * 省略可能です。省略した場合は 24.0 が設定されます。
 * 
 * ・エフェクト外径：outerRadius
 * エフェクトの外径をピクセル単位で設定します。
 * この数値より大きい範囲はエフェクトが表示されません。
 * 省略可能です。省略した場合は 72.0 が設定されます。
 * 
 * ・エフェクト強度：strength
 * エフェクトの強度を設定します。
 * この数値が大きくなるほどエフェクトによる画面の歪みが強くなります。
 * 省略可能です。省略した場合は 1.0 が設定されます。
 * 
 * ・エフェクト色：color
 * エフェクトの色をRGBで設定します。
 * 省略可能です。省略した場合は {r: 1.0, g: 1.0, b: 2.0} が設定されます。
 * 
 * ■パラメーターの登録
 * 次のスクリプトコマンドでパラメーターマップへパラメーターを登録します。
 * 例：
 * $gameScreen.glslFilterParamMap().set(
 *     'playerRipple', // フィルターID
 *     new GLSLCharaRippleFilterParam() // フィルターパラメーター
 * );
 * 
 * その他のパラメーターマップの操作はコアプラグインのヘルプを参照してください。
 * 
 * ■パラメーターの操作
 * ・エフェクトのフェードイン：fadeIn()
 * 例：
 * $gameScreen.glslFilterParamMap().get(
 *     'playerRipple' // フィルターID
 * ).fadeIn();
 * 
 * ・エフェクトのフェードアウト：fadeOut()
 * 例：
 * $gameScreen.glslFilterParamMap().get(
 *     'playerRipple' // フィルターID
 * ).fadeOut();
 * 
 * ・エフェクトの即時表示：show()
 * 例：
 * $gameScreen.glslFilterParamMap().get(
 *     'playerRipple' // フィルターID
 * ).show();
 * 
 * ・エフェクトの即時非表示：hide()
 * 例：
 * $gameScreen.glslFilterParamMap().get(
 *     'playerRipple' // フィルターID
 * ).hide();
 * 
 * ■利用規約
 * MITライセンスのもと、商用利用、改変、再配布が可能です。
 * ただし冒頭のコメントは削除や改変をしないでください。
 * これを利用したことによるいかなる損害にも作者は責任を負いません。
 * サポートは期待しないでください＞＜。
 */

/*:
 * @plugindesc Character ripple effect filter 1.0.0
 * Effect filter which displays the effect of the ripple around the character.
 * @author Sanshiro https://github.com/rev2nym
 * @help
 * - Overview
 * This pulugin provides an effect filter that displays
 * the effect of ripple around the character.
 * This plugin is a sub plugin of the shader filter system.
 * 
 * - Prerequisite core plugin
 * This plugin uses "SAN_ShaderFilter.js" distributed together
 * as a prerequisite core plugin.
 * install in advance it.
 * 
 * - Shader code file
 * This plugin uses "SAN_CharaRippleFrag.txt" as a shader code file.
 * Put it in the "glsl" folder beforehand.
 * 
 * - Basic mechanism
 * Refer to the core plugin help for the basic mechanism.
 * 
 * - Create FPObject (Filter Parameter Object)
 * Create the FPObject with the following script command.
 * 
 * Example:
 * new GLSLCharaRippleFilterParam({
 *     speed: 1.0, // Effect speed
 *     fadeFrame: 60, // Fade frame count
 *     fadeState: 'fadedOut', // Fade state
 *     charaType: 'player', // Character type
 *     charaId: 1, // CharacterID
 *     pitch: 1.0, // Effect pitch
 *     innerRadius: 24.0, // Effect inner radius
 *     outerRadius: 72.0, // Effect outer radius
 *     strength: 1.0, // Effect strength
 *     color: {r: 2.0, g: 1.0, b: 1.0} // Effect color
 * });
 * 
 * Each item is out of order and can be omitted.
 * And all items can also be omitted.
 * 
 * Example:
 * new GLSLCharaRippleFilterParam();
 * 
 * - Effect speed: speed
 * This is the speed of the effect.
 * The closer the number is to 0.0, the slower it will be.
 * You can also set a negative value.
 * This is optional. If omitted, 1.0 is set.
 * 
 * - Fade frame count: fadeFrame
 * The count of frames required for fadein and fadeout.
 * This is optional. If omitted, 60 is set.
 * 
 * - Fade state: fadeState
 * Represents the state of the fade.
 * This can take four states
 * 'fadingIn' (in fadingin), 'fadedIn' (fadein completed),
 * 'fadingOut' (in fadingout), 'fadedOut' (fadeout completed)
 * If 'fadingIn' is set, fadein starts immediately.
 * This is optional. If omitted, 'fadedOut' is set.
 * 
 * - Character type: charaType
 * This specifies the type of character that is the center of the effect.
 * This is possible to specify from three types of
 * 'player', 'follower', 'event'.
 * This is optional. If omitted, 'player' is set.
 * 
 * - Character ID: charaId
 * This specifies the ID of the character that is the center of the effect.
 * If 'follower' is specified for the character type,
 * the follower index corresponds (the ID of the 2nd actor in the party is 1),
 * if 'event' is specified, the event ID corresponds.
 * This is optional. If omitted, 1 is set.
 * 
 * - Effect pitch: pitch
 * This specifies the pitch of the effect.
 * The greater the number, the finer the pattern of the effect.
 * This is optional. If omitted, 1.0 is set.
 * 
 * - Effect inner radius: innerRadius
 * This sets the inner radius of the effect in pixels.
 * If the range is smaller than this number,
 * effects will not be displayed like donut holes.
 * This is optional. If omitted, 24.0 is set.
 * 
 * · Effect outer radius: outerRadius
 * This sets the outer radius of the effect in pixels.
 * Effects are not displayed in the range larger than this number.
 * This is optional. If omitted, 72.0 is set.
 * 
 * - Effect strength: strength
 * This sets the strength of the effect.
 * The higher the value, the stronger the screen distortion due to the effect.
 * This is optional. If omitted, 1.0 is set.
 * 
 * - Effect color: color
 * This sets the effect color with RGB.
 * This is optional. If omitted, {r: 2.0, g: 1.0, b: 1.0} is set.
 * 
 * - Register FPObject (Filter Parameter Object)
 * Register the FPObject in the FPMap with the following script command.
 * 
 * Example:
 * $gameScreen.glslFilterParamMap().set(
 *     'playerRipple', // Filter ID
 *     new GLSLCharaRippleFilterParam() // FPObject
 * );
 * 
 * For other FPMap operation, see the core plugin help.
 * 
 * - Effect operation commands
 * 
 * - Fadein effect: fadeIn()
 * Example:
 * $gameScreen.glslFilterParamMap().get(
 *     'playerRipple' // Filter ID
 * ).fadeIn();
 * 
 * - Fadeout effect: fadeOut()
 * Example:
 * $gameScreen.glslFilterParamMap().get(
 *     'playerRipple' // Filter ID
 * ).fadeOut();
 * 
 * - Immediate display of effects: show()
 * Example:
 * $gameScreen.glslFilterParamMap().get(
 *     'playerRipple' // Filter ID
 * ).show();
 * 
 * - Immediate hide of effects: hide()
 * Example:
 * $gameScreen.glslFilterParamMap().get(
 *     'playerRipple' // Filter ID
 * ).hide();
 * 
 * - Terms of use
 * Under the MIT license,
 * commercial use, modification, redistribution is possible.
 * However, please do not delete or modify the comment at the beginning.
 * The author is not responsible for any damage caused by using this.
 * And please do not expect support. X(
 */

var Imported = Imported || {};
Imported.SAN_ShaderFilterCharaRipple = true;

var Sanshiro = Sanshiro || {};
Sanshiro.ShaderFilterCharaRipple = Sanshiro.ShaderFilterCharaRipple || {};
Sanshiro.ShaderFilterCharaRipple.version = '1.0.0';

if(!!ConfigManager.SAN_ShaderFlag){
(function() {
'use strict';

//-----------------------------------------------------------------------------
// GLSLCharaRippleFilter
//
// GLSLキャラクター波紋フィルター

window.GLSLCharaRippleFilter =
    function GLSLCharaRippleFilter()
{
    this.initialize.apply(this, arguments);
};

GLSLCharaRippleFilter.prototype =
    Object.create(GLSLFilter.prototype);
GLSLCharaRippleFilter.prototype.constructor =
    GLSLCharaRippleFilter;

// バーテックスシェーダーファイル名
GLSLCharaRippleFilter.prototype.vertName = function() {
    return '';
};

// フラグメントシェーダーファイル名
GLSLCharaRippleFilter.prototype.fragName = function() {
    return 'SAN_CharaRippleFrag';
};

// キャラクタースプライト
GLSLCharaRippleFilter.prototype.characterSprite = function() {
    if (!this._characterSprite) {
        this.refreshCharacterSprite();
    }
    return this._characterSprite;
};

// キャラクタースプライトのリフレッシュ
GLSLCharaRippleFilter.prototype.refreshCharacterSprite = function() {
    var type = this._param.charaType();
    var id = this._param.charaId();
    this._characterSprite = (
        type === 'player' ? SpritePresenter.player() :
        type === 'event' ? SpritePresenter.event(id) :
        type === 'follower' ? SpritePresenter.follower(id) :
        null
    );
};

// キャラクタースプライトのX座標
GLSLCharaRippleFilter.prototype.characterX = function() {
    var sprite = this.characterSprite();
    return (
        sprite.x -
        sprite.width * sprite.anchor.x +
        sprite.width / 2.0 +
        4.0
    );
};

// キャラクタースプライトのY座標
GLSLCharaRippleFilter.prototype.characterY = function() {
    var sprite = this.characterSprite();
    if (sprite._characterName === "") {
        return (
            sprite.y -
            $gameMap.tileHeight() / 2.0 +
            8.0
        );
    }
    return (
        sprite.y -
        sprite.height * sprite.anchor.y +
        sprite.height / 2.0 +
        4.0
    );
};

// 描画X座標
GLSLCharaRippleFilter.prototype.targetX = function() {
    return this.characterX();
};

// 描画Y座標
GLSLCharaRippleFilter.prototype.targetY = function() {
    return this.characterY();
};

// 時間
GLSLCharaRippleFilter.prototype.time = function() {
    return this._param.time();
};

// フェード率
GLSLCharaRippleFilter.prototype.fadeRate = function() {
    return this._param.fadeRate();
};

// PIXIフィルターのセットアップ
GLSLCharaRippleFilter.prototype.setupFilter = function() {
    if (!this.characterSprite()) {
        return;
    }
    GLSLFilter.prototype.setupFilter.apply(this, arguments);
};

// ユニフォーム初期値
GLSLCharaRippleFilter.prototype.defaultUniforms = function() {
    var uniforms = GLSLFilter.prototype.defaultUniforms.apply(this, arguments);
    uniforms.uTime = {
        type: 'other',
        value: this.time()
    };
    uniforms.uFadeRate = {
        type: 'other',
        value: this.fadeRate()
    };
    uniforms.uResolution = {
        type: 'vec2',
        value: {
            x: this.spriteWidth(),
            y: this.spriteHeight()
        }
    };
    uniforms.uPosition = {
        type: 'vec2',
        value: {
            x: this.targetX(),
            y: this.targetY()
        }
    };
    uniforms.uPitch = {
        type: 'other',
        value: this._param.pitch()
    };
    uniforms.uInnerRadius = {
        type: 'other',
        value: this._param.innerRadius()
    };
    uniforms.uOuterRadius = {
        type: 'other',
        value: this._param.outerRadius()
    };
    uniforms.uStrength = {
        type: 'other',
        value: this._param.strength()
    };
    uniforms.uR = {
        type: 'other',
        value: this._param.r()
    };
    uniforms.uG = {
        type: 'other',
        value: this._param.g()
    };
    uniforms.uB = {
        type: 'other',
        value: this._param.b()
    };
    return uniforms;
};

// フレーム更新
GLSLCharaRippleFilter.prototype.update = function() {
    if (!this.characterSprite()) {
        return;
    }
    GLSLFilter.prototype.update.apply(this, arguments);
};

// ユニフォームのフレーム更新
GLSLCharaRippleFilter.prototype.updateUniforms = function() {
    GLSLFilter.prototype.updateUniforms.apply(this, arguments);
    this.uniforms.uTime = this.time();
    this.uniforms.uFadeRate = this.fadeRate();
    this.uniforms.uResolution.x = this.spriteWidth();
    this.uniforms.uResolution.y = this.spriteHeight();
    this.uniforms.uPosition.x = this.targetX();
    this.uniforms.uPosition.y = this.targetY();
};

//-----------------------------------------------------------------------------
// GLSLCharaRippleFilterParam
//
// GLSLキャラクター波紋フィルターパラメーター

window.GLSLCharaRippleFilterParam =
    function GLSLCharaRippleFilterParam()
{
    this.initialize.apply(this, arguments);
};

GLSLCharaRippleFilterParam.prototype =
    Object.create(GLSLFilterParam.prototype);
GLSLCharaRippleFilterParam.prototype.constructor =
    GLSLCharaRippleFilterParam;

// メンバー変数の初期化
GLSLCharaRippleFilterParam.prototype.initMembers = function(param) {
    GLSLFilterParam.prototype.initMembers.apply(this, arguments);
    this._time = 0.0;
    this._fadeRate = 0.0;
    this._speed =
        param.hasOwnProperty('speed') ? param.speed : 1.0;
    this._fadeFrame =
        param.hasOwnProperty('fadeFrame') ? param.fadeFrame : 60;
    this._fadeState =
        param.hasOwnProperty('fadeState') ? param.fadeState : 'fadedOut';
    this._charaType =
        param.hasOwnProperty('charaType') ? param.charaType : 'player';
    this._charaId =
        param.hasOwnProperty('charaId') ? param.charaId : 1;
    this._pitch =
        param.hasOwnProperty('pitch') ? param.pitch : 1.0;
    this._innerRadius =
        param.hasOwnProperty('innerRadius') ? param.innerRadius : 24.0;
    this._outerRadius =
        param.hasOwnProperty('outerRadius') ? param.outerRadius : 72.0;
    this._strength =
        param.hasOwnProperty('strength') ? param.strength : 1.0;
    this._color =
        param.hasOwnProperty('color') ? param.color : {r: 1.0, g: 1.0, b: 2.0};
    this._character = this.character();
};

// フィルタークラス
GLSLCharaRippleFilterParam.prototype.filterClass = function() {
    return GLSLCharaRippleFilter;
};

// 時間
GLSLCharaRippleFilterParam.prototype.time = function() {
    return this._time;
};

// フェード率
GLSLCharaRippleFilterParam.prototype.fadeRate = function() {
    return this._fadeRate;
};

// キャラクタータイプ
GLSLCharaRippleFilterParam.prototype.charaType = function() {
    return this._charaType;
};

// キャラクターID
GLSLCharaRippleFilterParam.prototype.charaId = function() {
    return this._charaId;
};

// エフェクトピッチ
GLSLCharaRippleFilterParam.prototype.pitch = function() {
    return this._pitch;
};

// エフェクト内径
GLSLCharaRippleFilterParam.prototype.innerRadius = function() {
    return this._innerRadius;
};

// エフェクト外径
GLSLCharaRippleFilterParam.prototype.outerRadius = function() {
    return this._outerRadius;
};

// エフェクト強度
GLSLCharaRippleFilterParam.prototype.strength = function() {
    return this._strength;
};

// エフェクト色R成分
GLSLCharaRippleFilterParam.prototype.r = function() {
    return this._color.r;
};

// エフェクト色G成分
GLSLCharaRippleFilterParam.prototype.g = function() {
    return this._color.g;
};

// エフェクト色B成分
GLSLCharaRippleFilterParam.prototype.b = function() {
    return this._color.b;
};

// キャラクター
GLSLCharaRippleFilterParam.prototype.character = function() {
    return (
        this._charaType === 'player' ? $gamePlayer :
        this._charaType === 'event' ? $gameMap.event(this._charaId) :
        this._charaType === 'follower' ? $gamePlayer.followers().follower(this._charaId - 1) :
        null
    );
};

// フレーム更新
GLSLCharaRippleFilterParam.prototype.update = function() {
    GLSLFilterParam.prototype.update.apply(this, arguments);
    this.checkCharacter();
    this.updateTime();
    this.updateFade();
};

// キャラクターの確認
GLSLCharaRippleFilterParam.prototype.checkCharacter = function() {
    if (this._character !== this.character()) {
        $gameScreen.glslFilterParamMap().remove(this);
    }
};

// 時間のフレーム更新
GLSLCharaRippleFilterParam.prototype.updateTime = function() {
    this._time += this.timeGain();
};

// 時間増加量(秒)
GLSLCharaRippleFilterParam.prototype.timeGain = function() {
    return 1.0 / 60.0 * this._speed;
};

// フェードのフレーム更新
GLSLCharaRippleFilterParam.prototype.updateFade = function() {
    if (this._fadeState === 'fadingIn') {
        this.updateFadingIn();
    } else if (this._fadeState === 'fadingOut') {
        this.updateFadingOut();
    }
};

// フェードイン中のフレーム更新
GLSLCharaRippleFilterParam.prototype.updateFadingIn = function() {
    this._fadeRate += this.fadeRateGain();
    if (this._fadeRate >= 1.0) {
        this._fadeRate = 1.0
        this._fadeState = 'fadedIn';
    }
};

// フェードアウト中のフレーム更新
GLSLCharaRippleFilterParam.prototype.updateFadingOut = function() {
    this._fadeRate -= this.fadeRateGain();
    if (this._fadeRate <= 0.0) {
        this._fadeRate = 0.0;
        this._fadeState = 'fadedOut';
    }
};

// フェード率変化量
GLSLCharaRippleFilterParam.prototype.fadeRateGain = function() {
    return 1.0 / this._fadeFrame;
};

// フェードイン
GLSLCharaRippleFilterParam.prototype.fadeIn = function() {
    this._fadeState = 'fadingIn';
};

// フェードアウト
GLSLCharaRippleFilterParam.prototype.fadeOut = function() {
    this._fadeState = 'fadingOut';
};

// 即時表示
GLSLCharaRippleFilterParam.prototype.show = function() {
    this._fadeRate = 1.0;
    this._fadeState = 'fadedIn';
};

// 即時非表示
GLSLCharaRippleFilterParam.prototype.hide = function() {
    this._fadeRate = 0.0;
    this._fadeState = 'fadedOut';
};

})();
};