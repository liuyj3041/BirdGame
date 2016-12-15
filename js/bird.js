/**
 * Created by yongjun on 2016/11/26.
 */
(function(Fly){
    var Bird = function(options){
        this.ctx = options.ctx;
        this.img = options.img;
        this.imgW = this.img.width /3;
        this.imgH = this.img.height;
        this.x = options.x || 100;
        this.y = options.y || 100;
        this.frameIndex = 0;
        this.speed = 0;
        this.a = 0.0005;
        this.maxAngle = 45 ;
        this.maxSpeed = 0.5 ;
        this.listeners = [];
    }
    Bird.prototype = {
        constructor : Bird,
        draw : function(delta){
            this.speed = this.speed + this.a * delta;
            this.y = this.y + this.speed * delta + 1/2 * this.a * delta *delta;
            var curAngle = 0 ;
            curAngle = this.maxAngle / this.maxSpeed * this.speed ;
            if(curAngle >= this.maxAngle){
                curAngle = this.maxAngle;
            }
            this.ctx.save();
            this.ctx.translate( this.x , this.y);
            this.ctx.rotate (Math.PI/180 * curAngle);
            this.ctx.drawImage(this.img , this.imgW * this.frameIndex , 0 , this.imgW , this.imgH , - 1/2 *this.imgW ,- 1/2 *this.imgH ,  this.imgW , this.imgH  )
            this.ctx.restore();
            this.frameIndex ++;
            this.frameIndex %= 3 ;
            this.birdDie();
        },
        addListeners : function(callback){
            this.listeners.push(callback)
        },
        trigger : function(){
            this.listeners.forEach(function(value){
                value();
            })
        },
        birdDie : function(){
            if( this.y <= 0 || this.y >= cv.height - 112 || ctx.isPointInPath( this.x , this.y)){
                this.trigger();
            };
        }

    }
    Fly.Bird = Bird;
})(Fly)