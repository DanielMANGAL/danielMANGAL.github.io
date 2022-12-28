// const canvas = document.getElementById('canvas1')
// const ctx = canvas.getContex('2d')
// const canvas_WIDTH= 500
// const canvas_HEIGHT= 500

const canvas= document.getElementById('canvas1')

const canvas_WIDTH= canvas.width= 500
const canvas_HEIGHT= canvas.height= 500
const ctx = canvas.getContext('2d')
let explosion = new Image()
explosion.src=' Shoot (1).png'
const sizeModifier= 1
const imageWidth= 588
const imageHeight= 600
const imageWidthPres= imageWidth*sizeModifier
const imageHeightPres= imageHeight*sizeModifier
const maxFrameX= 2
const maxFrameY=1
let frameX=1
let frameY=0
let gameFrame=0
let positionY=0
let lastTime=0
let deltaTime=0
let state='Shoot ('
// explosion.src=frameX+'.png'
const state2= document.getElementById('state2')

state2.addEventListener('change',function(e){
    state=e.target.value
})

class Player{
    constructor(game,image, context,width,height,sizeModifier,maxFrame,fps){
        this.image=image
        this.positionX=100
        this.positionY=100
        this.speedX=20
        this.width= width
        this.height= height
        this.sizeModifier=sizeModifier
        this.widthDesired= this.width*sizeModifier
        this.heightDesired= this.height*sizeModifier
        this.maxFrame= maxFrame
        this.fps= fps
        this.frameInterval=1000/this.fps
        this.frameTimer=0
        this.frameImage=0
        this.context=context
     }
     update(deltaTime){      
        if(this.frameTimer> this.frameInterval  ){
            console.log(this.frameImage)
            this.frameImage++
            this.image.src='Shoot ('+this.frameImage+').png'
            this.frameTimer=0
            if(this.frameImage>this.maxFrame){
                this.frameImage=0
            }
          
        }
        else{
            this.frameTimer+=deltaTime
        }
     }

     draw(){
        this.context.drawImage(this.image,this.positionX,this.positionY,this.widthDesired,this.heightDesired)
     }
}



class Game{
     constructor(context,deltaTime){
       this.player= new Player(this,explosion,context,200,200,0.5,3,20)
 }
     update(deltaTime){
        this.player.update(deltaTime)
        console.log('yep '+ this.player.frameImage)
        console.log(deltaTime)
        console.log(this.player.frameTimer)
    }
     draw(){
        this.player.draw()
     }

}


const game= new Game(ctx)


function animate(timeStamp){

    deltaTime= timeStamp-lastTime

    lastTime= timeStamp
//     ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT)
//     // ctx.fillRect(0,0,100,100)
//     ctx.drawImage(explosion, 0,positionY,canvas_WIDTH/4,canvas_HEIGHT/4)
//     // ctx.drawImage(explosion,frameX*imageWidth,frameY*imageHeight,imageWidth,imageHeight,50,50,imageWidthPres, imageHeightPres)
//    if(gameFrame%5==0){

      

//     frameX++
//     if (frameX>maxFrameX){
//         frameX=1
//     }
  
//     // explosion.src=state+'__00'+frameX+'.png'
//     explosion.src=state+frameX+').png'
// }

game.update()
game.draw()
    gameFrame++
    requestAnimationFrame(animate)

}
animate(0)

window.addEventListener('keydown', e=>{
    switch(e.key){
        case 'ArrowDown':
            positionY+=20
            break;

        case 'ArrowUp':
            positionY-=20
            break;
        case ' ':
            state='Fly ('
            break;
        case 'ArrowRight':
            state='Shoot ('
            break;
        
    }
})