//================================================================


// The MIT License
// Copyright (c) 2015 biud436
// ---------------------------------------------------------------
// Free for commercial and non commercial use.
//================================================================
 
 /*:
 * Version: biud436 overlordFan修改版
 * @plugindesc biud436 overlordFan修改版 中文输入 v 1.1

 * @author biud436
 *
 * @param windowWidth
 * @parent
 * @type number
 * @desc windowWidth.
 * This is a formula.
 * @default 580
 * 
 * @param windowCenter
 * @parent ---General---
 * @type boolean
 * @on YES
 * @off NO
 * @desc
 * @default false
 * 
 * @param outlineWidth
 * @parent
 * @type number
 * @desc outlineWidth.
 * This is a formula.
 * @default 1
 * 
 * @param outlineColor
 * @parent ---outlineColor---
 * @desc
 * @default black
 * 
 * @param fontColor
 * @parent ---fontColor---
 * @desc
 * @default white
 * 
 * 
 * @param editWindow_Opacity
 * @parent
 * @type number
 * @desc editWindow_Opacity.
 * This is a formula.
 * @default 225
 * 
 * @param standardFontSize
 * @parent
 * @type number
 * @desc standardFontSize.
 * This is a formula.
 * @default 28
 * 
 * @param img Path
 * @parent ---Letter Sounds---
 * @type file
 * @dir img/pictures/
 * @require 1
 * 
 * @help
 * 中文输入插件 背景图请放入img/pictures 中文最大字符数8 按回车键确定
 */

var Imported = Imported || {};
Imported.RS_NameEdit_Fan = true;
var OverLordFan = OverLordFan || {}; 
OverLordFan._param = OverLordFan._param || {}; 
OverLordFan.parameters = PluginManager.parameters('RS_NameEdit_Fan');

OverLordFan._param.windowWidth = Number(OverLordFan.parameters['windowWidth'] || 580);
OverLordFan._param.windowCenter = String(OverLordFan.parameters['windowCenter'] || 'false');
OverLordFan._param.outlineWidth = Number(OverLordFan.parameters['outlineWidth'] || 1);
OverLordFan._param.outlineColor = String(OverLordFan.parameters['outlineColor'] || 'black');
OverLordFan._param.fontColor = String(OverLordFan.parameters['fontColor'] || 'white');
OverLordFan._param.opacity = Number(OverLordFan.parameters['editWindow_Opacity'] || 225);
OverLordFan._param.askText = String(OverLordFan.parameters['askingText'] || '请输入名称');
OverLordFan._param.standardFontSize = Number(OverLordFan.parameters['standardFontSize'] || 28);
OverLordFan._param.imgBack = String(OverLordFan.parameters['img Path']);

OverLordFan._Scene_Boot_loadimg = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
    OverLordFan._Scene_Boot_loadimg.call(this);
        this.loadImages();
    };
    Scene_Boot.loadImages = function() {
        ImageManager.reservePicture(OverLordFan._param.imgBack);
    };


function TextBox() {
    this.initialize.apply(this, arguments);
  };


  //===========================================================================
  // TextBox Class
  //===========================================================================

  TextBox.BACK_SPACE = 8;
  TextBox.ENTER = 13;
  TextBox.IS_NOT_CHAR = 32;
  TextBox.KEYS_ARRAY = 255;

  TextBox.prototype.initialize = function(_editWindow)  {
    this._editWindow = _editWindow;
    this.createTextBox();
    this.getFocus();
  };

  TextBox.prototype.createTextBox = function() {
    this._textBox = document.createElement('input');
    this._textBox.type = "text";
    this._textBox.id = "textBox";
    this._textBox.style.opacity = 0;
    this._textBox.style.zIndex = 1000;
    this._textBox.autofocus = false;
    this._textBox.width = 1;
    this._textBox.height = 1;
    this._textBox.multiple = false;
    this._textBox.style.imeMode = 'active';

    if($gameSystem.isJapanese()) {
      this._textBox.inputmode = 'katakana';
    }

    this._textBox.style.position = 'absolute';
    this._textBox.style.top = 0;
    this._textBox.style.left = 0;
    this._textBox.style.right = 0;
    this._textBox.style.bottom = 0;

    this._textBox.onkeydown = this.onKeyDown.bind(this);


    document.body.appendChild(this._textBox);
  };

  TextBox.prototype.setEvent = function(func) {
    this._textBox.onchange = func;
  };

  TextBox.prototype.terminateTextBox = function() {
    document.body.removeChild(this._textBox);
  };

  TextBox.prototype.onKeyDown = function(e) {
    var keyCode = e.which;
    this.getFocus();
    if (keyCode < TextBox.IS_NOT_CHAR) {
      if(keyCode === TextBox.BACK_SPACE) {
        this.backSpace();
      } else if(keyCode === TextBox.ENTER) {
        if(this.getTextLength() <= 0) {
          e.preventDefault();

        }
      }
    } else if (keyCode < TextBox.KEYS_ARRAY) {
      //
    }
  }

  TextBox.prototype.getTextLength = function() {
    return this._textBox.value.length;
  };

  TextBox.prototype.getMaxLength = function() {
    return this._editWindow._maxLength;
  };

  TextBox.prototype.backSpace = function() {
    this._editWindow._name = this._editWindow._name.slice(0, this._textBox.value.length - 1);
    this._editWindow._index = this._textBox.value.length;
    this._textBox.value = this._editWindow._name;
    this._editWindow.refresh();
  };

  TextBox.prototype.refreshNameEdit = function()  {
    this._editWindow._name = this._textBox.value.toString();
    this._editWindow._index = this._textBox.value.length || 0;
    this._editWindow.refresh();
  };

  TextBox.prototype.update = function() {
    if(this.getTextLength() <= this._editWindow._maxLength) {
      this.refreshNameEdit();
    }
  };

  TextBox.prototype.getFocus = function() {
    this._textBox.focus();
  };

  TextBox.prototype.terminate =  function() {
    this.terminateTextBox();
  };

  //===========================================================================
  // Window_NameEdit Class
  //===========================================================================

  Window_NameEdit.prototype.charWidth = function () {
    var text = '\uAC00';
    return this.textWidth(text)
  };

  Window_NameEdit.prototype.drawActorFace = function(actor, x, y, width, height) {
      this.drawFace(actor.faceName(), actor.faceIndex(), x, y, width, height);
      this.changeTextColor(this.hpColor(actor));
      this.drawText(OverLordFan._param.askText, this.left(), y + this.fittingHeight(1) / 2, this.width);
  };

  Window_NameEdit.prototype.itemRect = function(index) {
      return {
          x: this.left() + index * this.charWidth(),
          y: this.fittingHeight(1),
          width: this.charWidth(),
          height: this.lineHeight()
      };
  };

  Window_NameEdit.prototype.windowWidth = function () {
    return OverLordFan._param.windowWidth;
  };

  Window_NameEdit.prototype.drawChar = function (index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.contents.outlineWidth = OverLordFan._param.outlineWidth;
    this.contents.outlineColor = OverLordFan._param.outlineColor;
    this.contents.fontColor = OverLordFan._param.fontColor;
    this.drawText(this._name[index] || '', rect.x, rect.y)
  };

  Window_NameEdit.prototype.standardFontSize = function() {
      return OverLordFan._param.standardFontSize;
  };

  //===========================================================================
  // Scene_Name Class
  //===========================================================================

  Scene_Name.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createTextBox();
  };
  
  Scene_Name.prototype.createBackground = function() {

      this._back = new Sprite();
      this._back.bitmap = ImageManager.loadPicture(OverLordFan._param.imgBack);
      this.addChild(this._back);
  };

  Scene_Name.prototype.createTextBox = function() {
    this._textBox = new TextBox(this._editWindow);
    if(OverLordFan._param.windowCenter === "true") {
      this._editWindow.y = Graphics.boxHeight / 2 - this._editWindow.height / 2;
    }
    this._editWindow.opacity = OverLordFan._param.opacity;
  };

  Scene_Name.prototype.update = function() {
    this._textBox.getFocus();
    this._textBox.update();
  

        if(Input.isPressed('ok') && this._textBox.getTextLength() > 0){
          this._actor.setName(this._editWindow.name());
            this.popScene();
          
    }
   
    Scene_MenuBase.prototype.update.call(this);
  };

  Scene_Name.prototype.terminate = function() {
    Scene_MenuBase.prototype.terminate.call(this);
    this._textBox.terminate();
  };