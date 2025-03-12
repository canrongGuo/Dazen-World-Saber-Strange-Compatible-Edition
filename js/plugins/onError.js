//错误合集 反复出现不做提醒
var ErrorObj = [];
window.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
    var ErrorInternalObj = {
        'Url': scriptURI,
        'Message': errorMessage,
        'Line': lineNumber,
        'Column': columnNumber,
        'Obj': errorObj
    };
    if (ErrorObj.indexOf(JSON.stringify(ErrorInternalObj)) === -1) {
        ErrorObj.push(JSON.stringify(ErrorInternalObj));
        if(scriptURI.indexOf('plugins') !== -1){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', scriptURI, false);
        xhr.overrideMimeType('text/plain');
        xhr.onload = function() {
            if (xhr.status < 400) {
                ErrorText = xhr.responseText;
                var NewLine = 0;
                while(NewLine < lineNumber){
                ErrorText = ErrorText.substring(ErrorText.indexOf('\n') + 1, ErrorText.length);
                NewLine++;
                };
                ErrorTextLocation = ErrorText.substring(columnNumber, columnNumber + 40);
                ErrorTextCompleteLocation = ErrorText.substring(0, ErrorText.indexOf('\n'))
            }
        };
        xhr.send();
        if(scriptURI.indexOf('http') !== -1){
        ScriptURI = scriptURI.replace(/http(.*?):\/\/.*?\//, '(http$1)').replace(/\?.*?=[0-9]*/, '')//如果为联网脚本则去除域名部分及后面时间部分
        }else if(scriptURI.indexOf('asset') !== -1){
        ScriptURI = scriptURI.replace(/file:\/*asset\//, '(asset)')//如果为安装包内脚本
        }else if(scriptURI.indexOf('storage') !== -1){
        ScriptURI = scriptURI.replace(/file:\/*storage\/emulated\/[0-9]*\//, '(storage)')//如果为内部存储位置脚本
        }else{
        ScriptURI = scriptURI;
        };
        alert(
        '错误信息：' + errorMessage + '\n' + 
        '出错文件：' + ScriptURI + '\n' + 
        '出错行号：' + lineNumber + '\n' + 
        '出错列号：' + columnNumber + '\n' + 
        '错误详情：' + errorObj + '\n' + 
        '错误位置：' + ErrorTextLocation + '\n' + //方便定位出错位置及内容(压缩后)
        '错误代码：' + ErrorTextCompleteLocation + '\n' + //完整代码行
        '请将错误截图反馈给游戏作者');
        }
    }
};