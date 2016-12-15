/**
 * Created by yongjun on 2016/11/26.
 */
(function(Fly){
   var Pipe = function(options){
       this.ctx = options.ctx ;
       this.imgUp = options.imgUp ;
       this.imgD = options.imgD;
       this.imgW = this.imgUp.width;
       this.imgH = this.imgUp.height ;
       this.speed = 0.1 ;
       this.x = options.x;
       this.upY = 0;
       this.downY = 0;
       this.pipeSpace = 150;
       this.initPipe();
   }
    Pipe.prototype = {
        constructor : Pipe,
        draw : function(delta){
           this.x = this.x - this.speed * delta;
            if( this.x <= - this.imgW){
                this.x += this.imgW * 3 * 6
            }
            this.ctx.drawImage(this.imgUp , 0, 0 , this.imgW ,this.imgH ,this.x , this.upY , this.imgW ,this.imgH );
            this.ctx.drawImage(this.imgD , 0, 0 , this.imgW ,this.imgH ,this.x , this.downY , this.imgW ,this.imgH )

            this.initPipePath();
        },
        initPipe : function(){
            var h = Math.floor(Math.random() * 200) + 50;
            this.upY = h - this.imgH;
            this.downY = h +this.pipeSpace ;
        },
        initPipePath : function(){
            this.ctx.rect(this.x,this.upY , this.imgW ,this.imgH)
            this.ctx.rect(this.x,this.downY , this.imgW ,this.imgH)
            //this.ctx.fill();
        }

    }
 Fly.Pipe = Pipe;
})(Fly)