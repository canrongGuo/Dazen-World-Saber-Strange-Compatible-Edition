
    /**
    * 激励广告回调
    */
    function RewardCallback(){
        //广告展示
        this.onAdShow = function(){};
        //广告点击
        this.onAdClick = function(){};
        //广告关闭
        this.onAdClose = function(){};
        //获取激励
        this.onReward = function(){};
        //广告加载失败
        this.onFailed = function(errorCode, errorMsg){};
    };


    /**
    * 奇汇广告SDK展示激励广告
    */
    function showRewardAd(
        spaceId,
        callback
    ){
        window.TorchMapMapper.put(spaceId, callback);

        var json = new JsonString();
        json.add("TORCH_Type", "reward");
        json.add("TORCH_SpaceId", spaceId);
        alert(json.toString());
    };