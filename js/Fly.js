/**
 * Created by yongjun on 2016/11/26.
 */
(function(win){
    var Fly = {};
    Fly.imgLoaded = function(imgArr , callback){
        var len = imgArr. length ;
        var count = 0 ;
        var imgList = {};
        imgArr.forEach(function(imgSrc){
            var img = new Image();
            img.src = './imgs/'+imgSrc+'.png';
            imgList[imgSrc] = img;
            img.onload = function(){
                count ++;
                if(count >= len ){
                    callback(imgList);
                }
            }
        })
    }
    win.Fly = Fly;
})(window)