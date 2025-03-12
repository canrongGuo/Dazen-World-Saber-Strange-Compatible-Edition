//=============================================================================
// NameInput.js
//=============================================================================
/*:
 * @plugindesc 自由名字输入处理
 * @author wangwang Revise by Fanzi
 *
 * @param 名字输入
 * @type select
 * @option 只改名字
 * @value 1
 * @option 也改昵称
 * @value 2
 * @desc 名字输入处理类型   1 - 单改名   2 - 含昵称
 * @default 1
 *
 * @param  名称叫法
 * @desc 自己取个叫法，如：姓氏、姓名、名字
 * @default 姓名
 *
 * @param  昵称叫法
 * @desc 自己取个叫法，如：名字、昵称、外号
 * @default 昵称
 *
 * @help
 * 帮助的信息
 * 用网页输入代替原本的名字输入
 * 增加文本显示时用“\A[n]”显示角色昵称，“\Q[n]”显示队员昵称
 */
var Imported = Imported || {};

function Window_BC() {
    this.initialize.apply(this, arguments);
}

(function() {

    var parameters = PluginManager.parameters('NameInput');
    var NameType = Number(parameters['名字输入'] || 1);
    var FirstName = parameters['名称叫法'];
    var NickName = parameters['昵称叫法'];

Scene_Name.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createCmdWindow();
    var x = this._editWindow.x + this._editWindow.left() + 50;
    var y = this._editWindow.y + 54;
    Graphics._addInput('username', 'text', x, y, 100, 30, 24);
    Graphics._nameInput.maxLength = this._maxLength;
    Graphics._nameInput.value = this._actor.name().slice(0, this._maxLength);
    if (NameType > 1) {
        Graphics._addInput('talklist', 'text', x, y + 36, 100, 30, 24);
        Graphics._wordInput.maxLength = this._maxLength;
        Graphics._wordInput.value = this._actor.nickname().slice(0, this._maxLength);
    }
};

Scene_Name.prototype.createCmdWindow = function() {
    this._editWindow.setCursorRect(0, 0, 0, 0);
    this._cmdWindow = new Window_NameCmd(this._editWindow);
    this._cmdWindow.setHandler('ok', this.onInputOk.bind(this));
    this._cmdWindow.setHandler('reset', this.oncs.bind(this));
    this.addWindow(this._cmdWindow);
};

Scene_Name.prototype.oncs = function() {
    Graphics._nameInput.value = this._actor.name().slice(0, this._maxLength);
    if (NameType > 1) Graphics._wordInput.value = this._actor.nickname().slice(0, this._maxLength);
    this._cmdWindow.activate();
};

Scene_Name.prototype.onInputOk = function() {
    var name="" + Graphics._nameInput.value;
    this._actor.setName(name);
    if (NameType > 1) {
        var nickname="" + Graphics._wordInput.value;
        this._actor.setNickname(nickname);
    }
    this.popScene();
    Graphics._removeInput('username');
    if (NameType > 1) Graphics._removeInput('talklist');
};

Scene_Name.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    if (TouchInput.isTriggered()) {
        var x = TouchInput.x;
        var y = TouchInput.y;
        var left = this._editWindow.x + this._editWindow.left() + 50;
        var mid = this._editWindow.y + 86;
        if (x >= left && y >= mid - 36 && x < left + 100 && y < mid) {
            this._cmdWindow.deactivate();
            Graphics._nameInput.focus();
        } else if (NameType > 1 && x >= left && y >= mid && x < left + 100 && y < mid + 36) {
            this._cmdWindow.deactivate();
            Graphics._wordInput.focus();
        } else this._cmdWindow.activate();
    }
};

Window_NameEdit.prototype.nickname = function() {
    return this._nickname;
};

Window_NameEdit.prototype.charWidth = function() {
    var text = $gameSystem.isChinese() ? "我" : "A";
    return this.textWidth(text);
};

Window_NameEdit.prototype.refresh = function() {
    this.contents.clear();
    this.drawActorFace(this._actor, 0, 0);
    this.drawText("名字输入处理",180,0,160,'left');
    this.drawText(FirstName+"：",180,36,80,'left');
    if (NameType > 1) this.drawText(NickName+"：",180,72,80,'left');
    this.drawText("支持中文输入",180,110,160,'left');
};

function Window_NameCmd() {
    this.initialize.apply(this, arguments);
}

Window_NameCmd.prototype = Object.create(Window_Command.prototype);
Window_NameCmd.prototype.constructor = Window_NameCmd;

Window_NameCmd.prototype.initialize = function(Window) {
    this._inputWindow = Window;
    var height = this.fittingHeight(1);
    Window_Command.prototype.initialize.call(this, 0, 0, 480, height);
    this.updatePlacement();
    this.refresh();
    this.select(0);
    this.activate();
};

Window_NameCmd.prototype.maxCols = function() {
    return 2;
};

Window_NameCmd.prototype.itemTextAlign = function() {
    return 'center';
};

Window_NameCmd.prototype.updatePlacement = function() {
    this.width = this._inputWindow.width;
    this.x = this._inputWindow.x;
    this.y = this._inputWindow.y + this._inputWindow.height;
};

Window_NameCmd.prototype.makeCommandList = function() {
    this.addCommand("确定", 'ok');
    this.addCommand("还原", 'reset');
};

Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, '\\');
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bA\[(\d+)\]/gi, function() {
        return this.actorNickname(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bQ\[(\d+)\]/gi, function() {
        return this.partyMemberNickname(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
    return text;
};

Window_Base.prototype.actorNickname = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.nickname() : '';
};

Window_Base.prototype.partyMemberNickname = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.nickname() : '';
};
if (!Imported.JHMW_OnlineCore) {
var Graphics_createAllElements = Graphics._createAllElements;
Graphics._createAllElements = function() {
    Graphics_createAllElements.call(this);
    this._createInput();
};

var Graphics_updateAllElements = Graphics._updateAllElements;
Graphics._updateAllElements = function() {
    this._updateInput('username');
    this._updateInput('password');
    this._updateInput('talklist');
    Graphics_updateAllElements.call(this);
};

Graphics._createInput = function() {
    this._nameInput = document.createElement("input");
    this._nameInput.id = 'username';
    this._nameInput.type ="text";
    this._nameInput._sx = {xs:false, x:0, y:0, width:100, height:20, fontSize:18};
    this._passInput = document.createElement("input");
    this._passInput.id = 'password';
    this._passInput.type ="password";
    this._passInput._sx ={xs:false, x:0, y:0, width:100, height:20, fontSize:18};
    this._wordInput = document.createElement("input");
    this._wordInput.id = 'word';
    this._wordInput.type ="text";
    this._wordInput._sx ={xs:false, x:0, y:0, width:100, height:20, fontSize:18};
};

Graphics._addInput = function(name, type, x, y, width, height, fontSize) {
    if (name == 'username') {
        this._nameInput.type = type || "text";
        this._nameInput._sx = {xs:true, x:x, y:y, width:width||100, height:height||20, fontSize:fontSize||18};
        this._updateInput('username');
        document.body.appendChild(this._nameInput);
    } else if (name == 'password') {
        this._passInput.type = type || "text";
        this._passInput._sx = {xs:true, x:x, y:y, width:width||100, height:height||20, fontSize:fontSize||18};
        this._updateInput('password');
        document.body.appendChild(this._passInput);
    } else if (name == 'talklist') {
        this._wordInput.type = type || "text";
        this._wordInput._sx = {xs:true, x:x, y:y, width:width||100, height:height||20, fontSize:fontSize||18};
        this._updateInput('talklist');
        document.body.appendChild(this._wordInput);
    }
};

Graphics._removeInput = function(name) {
    if (name == 'username') {
        this._nameInput.remove();
        this._nameInput.value = null;
        this._nameInput._sx.xs = false;
    } else if (name == 'password') {
        this._passInput.remove();
        this._passInput.value = null;
        this._passInput._sx.xs = false;
    } else {
        this._wordInput.remove();
        this._wordInput.value = null;
        this._wordInput._sx.xs = false;
    }
};

Graphics._updateInput =function (name) {
    if (name == 'username') var input = this._nameInput;
    else if (name == 'password') var input = this._passInput;
    else var input = this._wordInput;
    input.style.zIndex = 12;
    var x = input._sx.x  * this._realScale + (window.innerWidth - this._width * this._realScale) / 2;
    var y = input._sx.y  * this._realScale + (window.innerHeight - this._height * this._realScale) / 2;
    var width = input._sx.width * this._realScale;
    var height = input._sx.height * this._realScale;
    var fontSize = input._sx.fontSize * this._realScale;
    input.style.position = 'absolute';
    input.style.margin = 'auto';
    input.style.top = y  + 'px';
    input.style.left = x  + 'px';
    input.style.width = width + 'px';
    input.style.height = height + 'px';
    input.style.fontSize = fontSize + 'px';
};

Input._shouldPreventDefault = function(keyCode) {
    switch (keyCode) {
        case 8:     // backspace
        case 33:    // pageup
        case 34:    // pagedown
        case 37:    // left arrow
        case 38:    // up arrow
        case 39:    // right arrow
        case 40:    // down arrow
        case 46:    // delete
        return true;
    }
    return false;
};

Input._onKeyDown = function(event) {
    if (this._shouldPreventDefault(event.keyCode)) {
        if (Graphics && (!Graphics._nameInput._sx.xs && !Graphics._passInput._sx.xs && !Graphics._wordInput._sx.xs)) event.preventDefault();
    }
    if (event.keyCode === 144) this.clear();
    var buttonName = this.keyMapper[event.keyCode];
    if (Utils.RPGMAKER_NAME == 'MV' && parseInt(Utils.RPGMAKER_VERSION.substr(2, 1)) >= 5 && ResourceHandler.exists() && buttonName === 'ok')
        ResourceHandler.retry();
    else if (buttonName) this._currentState[buttonName] = true;
};

}
})();