
    /**
    * 奇汇自定义map
    */
    function TorchMap() {

        var arr = new Array();

	    var struct = function(key, value) {
	    	this.key = key;
		    this.value = value;
	    }

	    this.put = function(key, value){
		    for (var i = 0; i < arr.length; i++) {
			    if ( arr[i].key === key ) {
				    arr[i].value = value;
				    return;
			    }
		    }
	    	arr[arr.length] = new struct(key, value);
	    }

	    this.get = function(key) {
		    for (var i = 0; i < arr.length; i++) {
			    if (arr[i].key === key ) {
				    return arr[i].value;
			    }
		    }
		    return null;
	    }
    };

    /**
    * 奇汇 json 转换
    */
    function JsonString(){

        var content = '';

        this.add = function(key,value) {
            if(content != ''){
                content = content + ",";
            };
            content = content + "\"" + key + "\":\"" + value + "\"";
        };

        this.toString = function() {
            content = "{" + content + "}";
            return content;
        };
    };


    (function(){
        window.TorchMapMapper = new TorchMap();
        window.TorchSDKIsInit = false;
    })();

    /**
    * 奇汇广告SDK初始化方法
    */
    function TorchSDKInit(
        appKey,
        isDebugModel = false,
        isTestModel = false
    ){
        if(window.TorchSDKIsInit){
            return;
        }
        window.TorchSDKIsInit = true;
        var json = new JsonString();
        json.add("TORCH_Type", "init");
        json.add("TORCH_AppKey", appKey);
        json.add("TORCH_Debug", isDebugModel);
        json.add("TORCH_Test", isTestModel);
        alert(json.toString());
    }






    function nativeToJs(spaceId, method, errorCode, errorMsg){
        var callback = window.TorchMapMapper.get(spaceId);
        if(callback == null){
            return;
        };
        if (method == "onAdShow"){
            callback.onReward();
        }else if (method == "onAdClick"){
            callback.onReward();
        }else if (method == "onAdClose"){
            callback.onReward();
        }else if (method == "onReward"){
            callback.onReward();
        }else if (method == "onFailed"){
            callback.onReward();
        }
    }