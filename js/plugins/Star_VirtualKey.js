//=============================================================================
// Star_VirtualKey.js
// Version: 1.0
//=============================================================================
 /*:
 * @plugindesc v1.0 安卓端虚拟按键.
 * @author Star
 *
 * @param VirtualKey
 * @desc 是否开启安卓端默认显示虚拟按键. true/false
 * @default true
 *
 * @param AllVirtualKey
 * @desc 该选项开启后,游戏启动始终使用默认配置. true/false
 * @default true
 *
 * @help
 * 使用介绍
 * 安卓端虚拟按键.
 * 纯JS实现,UI简单,不够美观
 * 在一定情况下,则该插件需要放在插件最后,防止zIndex归0.
 * 游戏内设置界面可手动关闭.(重启游戏同步生效)
 */

// Imported
var Imported = Imported || {};
Imported.Star_VirtualKey = true;

var Star = Star || {};
localStorage.AllVirtualKey = String(PluginManager.parameters('Star_VirtualKey')['AllVirtualKey']) == "true" ? 'true' : 'false';
if((localStorage.AllVirtualKey == 'true') || (localStorage.VirtualKey != 'false' && localStorage.VirtualKey != 'true')){
localStorage.VirtualKey = String(PluginManager.parameters('Star_VirtualKey')['VirtualKey']) == "true" ? 'true' : 'false';
};

//生成按钮
Star.initDiv = function(Id, Event, top, dowm, left, right, FontSize, Color, InnerHTML, BackgroundColor) {
    if (document.querySelector('#' + Id + 'p') == null) {
        var p = document.createElement(Id + 'p');
        p.id = Id + 'p';
        p.class = Id + 'p';
        document.body.appendChild(p);
    };
    var DivPSelector = document.querySelector('#' + Id + 'p');
    DivPSelector.style.position = 'fixed';
    DivPSelector.style.top = top;
    DivPSelector.style.dowm = dowm;
    DivPSelector.style.left = left;
    DivPSelector.style.right = right;
    DivPSelector.style.color = Color;
    DivPSelector.style.fontSize = FontSize;
    DivPSelector.innerHTML = InnerHTML;
    if(!!BackgroundColor){
    DivPSelector.style.backgroundColor = 'rgba(159, 159, 159, 0.4)';
    };
    DivPSelector.style.zIndex = '999999999999';
    DivPSelector.ontouchstart = function(e) {
    return false;
    };
    DivPSelector.addEventListener('touchstart', function() {
        Input._currentState[Event] = true
    });
    DivPSelector.addEventListener('touchmove', function() {
        Input._currentState[Event] = true
    });
    DivPSelector.addEventListener('touchcancel', function() {
        Input._currentState[Event] = false
    });
    DivPSelector.addEventListener('touchend', function() {
        Input._currentState[Event] = false
    });
};
Star.initVirtualKey = function(){
	//生成方向键
	Star.initDiv('up', 'up', '48%', undefined, '10%', undefined, '50', '#FF0000', '上', true);
	Star.initDiv('down', 'down', '72%', undefined, '10%', undefined, '50', '#FF0000', '下', true);
	Star.initDiv('left', 'left', '60%', undefined, '4%', undefined, '50', '#FF0000', '左', true);
	Star.initDiv('right', 'right', '60%', undefined, '16%', undefined, '50', '#FF0000','右', true);
	//生成确认/取消键
	Star.initDiv('ok', 'ok', '55%', undefined, undefined, '5%', '50', '#FF0000', '确认', true);
	Star.initDiv('escape', 'escape', '75%', undefined, undefined, '10%', '50', '#FF0000', '取消', true);
};
Star.deleteVirtualKey = function(){
	document.querySelector('#' + 'up' + 'p').remove();
	document.querySelector('#' + 'down' + 'p').remove();
	document.querySelector('#' + 'left' + 'p').remove();
	document.querySelector('#' + 'right' + 'p').remove();
	document.querySelector('#' + 'ok' + 'p').remove();
	document.querySelector('#' + 'escape' + 'p').remove();
};
if(!!Utils.isMobileDevice()){
Star_Window_Options_prototype_addGeneralOptions_VirtualKey = Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function(){
Star_Window_Options_prototype_addGeneralOptions_VirtualKey.call(this);
this.addCommand('虚拟按键', 'VirtualKey');
};

Star_Window_Options_prototype_getConfigValue_VirtualKey = Window_Options.prototype.getConfigValue;
Window_Options.prototype.getConfigValue = function(symbol) {
if(symbol == 'VirtualKey'){
if(localStorage[symbol] == 'true'){
return true;
}else{
return false;
};
}else{
    return Star_Window_Options_prototype_getConfigValue_VirtualKey.call(this, symbol);
//    return ConfigManager[symbol];
}};

Star_Window_Options_prototype_setConfigValue_VirtualKey = Window_Options.prototype.setConfigValue;
Window_Options.prototype.setConfigValue = function(symbol, volume) {
if(symbol == 'VirtualKey'){
if(localStorage[symbol] == 'true'){
localStorage[symbol] = 'false';
Star.deleteVirtualKey();
}else{
localStorage[symbol] = 'true';
Star.initVirtualKey();
};
}else{
Star_Window_Options_prototype_setConfigValue_VirtualKey.call(this, symbol, volume) ;
//    ConfigManager[symbol] = volume;
}};
if(localStorage.VirtualKey == 'true'){
	Star.initVirtualKey();
}
};