/**
 * Created by yongjun on 2016/11/26.
 */
(function(Fly){
    var Game = function(options){
        this.ctx = options.ctx ;
        this.imgArr = ['birds','land','pipe1','pipe2','sky'];
        this.roles = [];
        this.isRuning = false;
        this.lastFrameTime = new Date();
        this.curFrameTime = 0;
        this.delta = 0 ;
        this.hero = null;
    }
    Game.prototype = {
        constuctor : Game ,
        start : function(){
            var self = this;
            Fly.imgLoaded(self.imgArr,function(imgList){
                self.isRuning = true;
                self.initRoles(imgList)
                self.render();
                self.bindEven();
            })
        },
        initRoles:function(imgList){
            var self = this;
            var skyImg = imgList['sky'];
            var landImg = imgList['land'];
            var pipeImgUp = imgList['pipe2'];
            var pipeImgD = imgList['pipe1'];
            for ( var i = 0 ; i < 2 ; i ++){
                var sky = new Fly.Sky({
                    ctx :ctx,
                    img : skyImg,
                    x : skyImg.width* i
                });
                self.roles.push(sky)
            }
            for ( var i = 0 ; i < 6 ; i ++){
                var pipe = new Fly.Pipe({
                    ctx :ctx,
                    imgUp : pipeImgUp,
                    imgD : pipeImgD,
                    x :pipeImgUp.width * i * 3 + 300,
                });
                self.roles.push(pipe)
            }

            for ( var i = 0 ; i < 4 ; i ++){
                var land = new Fly.Land({
                    ctx :ctx,
                    img : landImg,
                    x : landImg.width* i,
                    y : cv.height - landImg.height
                });
                self.roles.push(land)
            }
            var bird = new Fly.Bird({
                ctx : ctx ,
                img : imgList['birds'],
            });
            self.hero = bird;
            self.hero.addListeners(function(){
                self.gameOver();
            })
        },
        gameOver : function(){
            this.isRuning = false;
        },
        render :function(){
            var self = this;
            (function render(){
                self.curFrameTime = new Date();
                self.delta = self.curFrameTime -self.lastFrameTime ;
                self.lastFrameTime = self.curFrameTime ;
                self.ctx.beginPath()
                self.ctx.clearRect(0 , 0 , cv.width , cv.height);
                self.roles.forEach(function(value){
                    value.draw( self.delta);
                });
                self.hero.draw(self.delta);

                if( self.isRuning){
                    requestAnimationFrame(render);
                }
            })()
        },
        bindEven : function(){
            var self = this;
            self.ctx.canvas.addEventListener('click',function(){
                self.hero.speed = -.3;
            })
        }

    }
    Fly.Game = Game;
})(Fly)