window.addEventListener('load',function(){
const canvas= document.getElementById('canvas1')

const canvas_WIDTH= canvas.width= 1360
const canvas_HEIGHT= canvas.height= 500
const ctx = canvas.getContext('2d')
let color= 'white'
let debug = false
let p1=1
let p2=1
let p3=1
let niveau=1
let TOTALEnnemy=5
const fullScreenButton= document.getElementById('fullScreenButton')

// const toucher1= document.getElementById('toucher1')
// const toucher2= document.getElementById('toucher2')
// const lancer= document.getElementById('lancer')
// const rater= document.getElementById('rater')
// const background= document.getElementById('background')
// const win= document.getElementById('win')
// const lose= document.getElementById('lose')

// const win= document.createElement('audio')
// win.src='win.wav'
// const lose= document.createElement('audio')
// lose.src='lose.wav'
// const toucher1= document.createElement('audio')
// toucher1.src='toucher1.wav'
// const toucher2= document.createElement('audio')
// toucher2.src='toucher2.mp3'
// const lancer= document.createElement('audio')
// lancer.src='lancer.ogg'
// const background= document.createElement('audio')
// background.src='background.mp3'
const background = document.getElementById('background')
const toucher1 = document.getElementById('toucher1')
const toucher2 = document.getElementById('toucher2')
const win = document.getElementById('win')
const lose = document.getElementById('lose')
const lancer = document.getElementById('lancer')
const collision = document.getElementById('collision')
// const rater = document.getElementById('rater')
// const rater= document.createElement('audio')
// rater.src='rater.wav'
// const collision= document.createElement('audio')
// rater.src='collision.flac'
toucher1.volume=0.7
toucher2.volume=0.3


function toggleScreen(){
    if(!document.fullscreenElement){
        canvas.requestFullscreen().catch(err=>{
            alert(`Le mode plein écran n'a pu avoir lieu car ${err.message} `);
        })
    }else{
        document.exitFullscreen()
    }
}

fullScreenButton.addEventListener('click', ()=>{
    toggleScreen() 
    console.log('touché"')})



class UI {
    constructor(game){
        this.game= game
        this.color='white'
        this.font='Helvetica'
        this.size= 25
    }
    draw(context){
        context.save()
        context.textAlign= "left"
        context.shadowOffsetX=2;
        context.shadowOffsetY=2;
        context.shadowColor= 'black'
        context.fillStyle= this.color
        for (let i=0; i<this.game.ammo;i++){
          
        context.fillRect(10*i+20,50,3,20)}
        context.font = this.size+'px '+ this.font
        context.fillText('Score: '+ this.game.player.score+' Chances: '+this.game.player.chances+ ' Reste: '+this.game.totalEnnemy+' Niveau: '+niveau,10,30)
        context.restore()

    }

}


class Layer{
    constructor(game,image,speedModifier){
        this.game=game
        this.image=image
        this.speedModifier= speedModifier
        this.width= 1768
        this.height= 500
        this.x=0
        this.y=0
    }

    update(){
        this.x-=this.game.speed*this.speedModifier
        if(this.x<=-this.width) this.x=0
    }
    draw(context){
        context.drawImage(this.image,this.x,this.y)
        context.drawImage(this.image,this.x+this.width,this.y)
        
    }




}

class Background{
    constructor(game){
        this.game=game
        this.image1=document.getElementById('layer1')
        this.layer1= new Layer(this.game,this.image1,0.2)
        this.image2=document.getElementById('layer2')
        this.layer2= new Layer(this.game,this.image2,0.8)
        this.image3=document.getElementById('layer3')
        this.layer3= new Layer(this.game,this.image3,1)
        this.layers=[this.layer1,this.layer2,this.layer3]
     
    }
    update(){
        this.layers.forEach(layer=>{
            layer.update()
        })
    }
    draw(context){
        this.layers.forEach(layer=>{
            layer.draw(context)
        })
    }

}










class eqSecondDegre{
    constructor(){
    this.k=Math.floor(Math.random()*40)-20
    let L=[-this.k,0,this.k]
    let m=Math.floor(Math.random()*3)
    this.equation= 'x²'+'='+L[m]
    this.solution = nbSolutions(L[m])}

}

function nbSolutions(k){
    if ( k>0){
        return '2'
    }
    else if ( k==0){
        return '1'
    }else {
        return '0'
    }
}

class Enemy{
    constructor(game){
        this.game= game
        this.x = this.game.width
        this.speedX= -Math.random()*1.8+0.1
        this.markedForDeletion=false
     
    }
    update(deltaTime){
        this.x+=this.speedX-this.game.speed
        if(this.x<0) {
            this.markedForDeletion=!this.markedForDeletion
        this.game.player.chances--
        if(this.game.player<=0){
            this.game.gameOver=true
        }
        }
        if(this.frameTimer>this.frameInterval){
            if(this.frameX>this.maxFrame){
                this.frameX=0
            }
            else{
                this.frameX++
            }
            this.frameTimer=0
        }
        else{
            this.frameTimer+=deltaTime
        }
    }

}

class angular1 extends Enemy{
    constructor(game){
        super(game);
        this.eq = new eqSecondDegre()
       
        this.equation2= this.eq.equation
        this.solution2= this.eq.solution
        this.width= 228
        this.height= 169
        this.y= Math.random()*(this.game.height -this.height*1.3)
        this.lives=1
        this.score=1
        this.frameX=0
        this.frameY=Math.floor(Math.random()*3)
        this.maxFrame=37
        this.fps= 60
        this.frameTimer=0
        this.frameInterval=1000/this.fps
        this.image= document.getElementById('angler1')
    }
    draw(context){
        context.save()
        context.fillStyle='white'
        context.font= "35px Arial";
        // context.font = "30px Arial";
    
        // context.fillStyle='55px'
        context.fillText(this.equation2,this.x+this.width*0.05,this.y+this.height*0.9)
        
        // context.drawImage(this.image,this.frameX*this.width,this.frameY,this.width,this.height,this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
       
        
       if(debug) context.strokeRect(this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
       
        
        
        context.restore()
    }

}
// nouv eau class

class angular2 extends Enemy{
    constructor(game){
        super(game);
        this.eq = new eqSecondDegre2()
       
        this.equation2= this.eq.equation
        this.solution2= this.eq.solution
        this.width= 213
        this.height= 165
        this.y= Math.random()*(this.game.height -this.height*1.3)
        this.lives=1
        this.score=1
        this.frameX=0
        this.frameY=Math.floor(Math.random()*2)
        this.maxFrame=37
        this.fps= 60
        this.frameTimer=0
        this.frameInterval=1000/this.fps
        this.image= document.getElementById('angler2')
    }
    draw(context){
        context.save()
        context.fillStyle='white'
        context.font= "35px Arial";
        // context.font = "30px Arial";
    
        // context.fillStyle='55px'
        context.fillText(this.equation2,this.x+this.width*0.05,this.y+this.height*1.05)
        
        // context.drawImage(this.image,this.frameX*this.width,this.frameY,this.width,this.height,this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
       
        
       if(debug) context.strokeRect(this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
       
        
        
        context.restore()
    }

}


class eqSecondDegre2{
    constructor(){
    this.a= Math.floor(Math.random()*40)-20
     
    this.k=Math.floor(Math.random()*40)-20
    this.equation= this.a+'x²'+'='+this.k
    this.solution = nbSolutions2(this.a,this.k)}
}

function nbSolutions2(a,k){
    if ( a*k>0){
        return '2'
    }
    else if ( a*k==0){
        return '1'
    }else {
        return '0'
    }
}
// class angular2 extends Enemy{
//     constructor(game){
//         super(game);
//         this.eq = new eqSecondDegre2()
//         this.equation2= this.eq.equation
//         this.solution2= this.eq.solution
//         this.width= 213
//         this.height= 165
//         this.y= Math.random()*(this.game.height -this.height)
//         this.lives=1
//         this.score=1
//         this.frameX=0
//         this.frameY=Math.floor(Math.random()*2)
//         this.maxFrame=37
//         this.fps= 60
//         this.frameTimer=0
//         this.frameInterval=1000/this.fps
//         this.image= document.getElementById('angler2')
//     }


//     draw(context){
//         context.save()
//         context.fillStyle='white'
//         context.font= "35px Arial";
//         // context.font = "30px Arial";
    
//         // context.fillStyle='55px'
//         context.fillText(this.equation2,this.x+this.width*0.05,this.y+this.height*0.9)
        
//         // context.drawImage(this.image,this.frameX*this.width,this.frameY,this.width,this.height,this.x,this.y,this.width,this.height)
//         context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
       
        
//        if(debug) context.strokeRect(this.x,this.y,this.width,this.height)
//         context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
       
        
        
//         context.restore()
//     }

// }
function nbSolutions3(a,k,b){
    if ( (k-b)/a>0){
        return '2'
    }
    else if ( (k-b)/a==0){
        return '1'
    }else {
        return '0'
    }
}

class eqSecondDegre3{
    constructor(){
        this.a= Math.floor(Math.random()*40)-20
        this.b= Math.floor(Math.random()*40)-20
     
        this.k=Math.floor(Math.random()*40)-20
        this.equation= this.a+'x²'+'+'+this.b+'='+this.k
        this.solution = nbSolutions3(this.a,this.k,this.b)
    }

}
class lucky extends Enemy{
    constructor(game){
        super(game);
        this.eq = new eqSecondDegre3()
        this.equation2= this.eq.equation
        this.solution2= this.eq.solution
        this.width= 99
        this.height= 95
        this.y= Math.random()*(this.game.height -this.height*1.3)
        this.lives=1
        this.score=1
        this.frameX=0
        this.frameY=Math.floor(Math.random()*2)
        this.maxFrame=37
        this.fps= 60
        this.frameTimer=0
        this.frameInterval=1000/this.fps
        this.image= document.getElementById('lucky')
    }
    draw(context){
        context.save()
        context.fillStyle='white'
        context.font= "35px Arial";
        // context.font = "30px Arial";
    
        // context.fillStyle='55px'
        context.fillText(this.equation2,this.x,this.y+this.height*1.13)
        
        // context.drawImage(this.image,this.frameX*this.width,this.frameY,this.width,this.height,this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
       
        
       if(debug) context.strokeRect(this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
       
        
        
        context.restore()
    }

}

class Particules{
    constructor(game,x,y){
        this.game=game
        this.x=x
        this.y=y
        this.image=document.getElementById('gears')
        this.frameX=Math.floor(Math.random()*3)
        this.frameY=Math.floor(Math.random()*3)
        this.spriteSize= 50
        this.sizeModifier=(Math.random()*0.5+0.5).toFixed(1)
        this.speedX=Math.random()*6-3
        this.speedY=-15*Math.random()
        this.gravity=0.5
        this.markedForDeletion= false
        this.angle=0
        this.va=-0.5+Math.random()*0.2-0.1
        this.bounced= false
        this.floor=this.game.height-Math.random()*(2/3)*this.game.player.height
       


        

    }
    update(){
        this.x-=this.speedX
        this.speedY+=this.gravity
        this.y+=this.speedY
        if(this.y>this.floor && (this.bounced==false)){
            this.bounced=true
            this.speedY=-15*Math.random()
        }
        if(this.y>this.game.height){
            this.markedForDeletion=true
        }
        this.angle+=this.va
    }
    draw(context){
        context.save()
        context.translate(this.x,this.y)
        context.rotate(this.angle)
           context.drawImage(this.image,this.frameX*this.spriteSize,this.frameY*this.spriteSize,this.spriteSize,this.spriteSize, this.spriteSize*this.sizeModifier*(-0.5),this.spriteSize*this.sizeModifier*(-0.5), this.spriteSize*this.sizeModifier,this.spriteSize*this.sizeModifier)
    context.restore()
    }
    

}

class Effect{
    constructor(game,x,y){
        this.game=game
        this.x=x
        this.y=y
        this.frameX=0
        this.maxFrame=8
        this.width=200
        this.height=200
        this.fps=60
        this.frameInterval=1000/this.fps
        this.frameTimer=0
        this.markedForDeletion=false
    }
    update(deltaTime){
        if(this.frameTimer>this.frameInterval){
            this.frameX++
            this.frameTimer=0
        
        }
        else{
            this.frameTimer+=deltaTime
        }
        if( this.frameX>this.maxFrame){
            this.markedForDeletion=true
        }

    }
    draw(context){
        context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height)
    }
}


class SmokeExplosion {
    constructor(game,x,y){
        this.game=game
        this.image=document.getElementById('smokeExplosion')
        this.x=x
        this.y=y
        this.frameX=0
        this.maxFrame=8
        this.width=200
        this.height=200
        this.fps=60
        this.frameInterval=1000/this.fps
        this.frameTimer=0
        this.markedForDeletion=false
    }
    update(deltaTime){
        if(this.frameTimer>this.frameInterval){
            this.frameX++
            this.frameTimer=0
        
        }
        else{
            this.frameTimer+=deltaTime
        }
        if( this.frameX>this.maxFrame){
            this.markedForDeletion=true
        }

    
  
    }
    draw(context){
        context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height)
    }


}
class FireExplosion {
    constructor(game,x,y){
        this.game=game
        this.image=document.getElementById('fireExplosion')
        this.x=x
        this.y=y
        this.frameX=0
        this.maxFrame=8
        this.width=200
        this.height=200
        this.fps=60
        this.frameInterval=1000/this.fps
        this.frameTimer=0
        this.markedForDeletion=false
    }
    update(deltaTime){
        if(this.frameTimer>this.frameInterval){
            this.frameX++
            this.frameTimer=0
            this.x-=this.game.speed
        
        }
        else{
            this.frameTimer+=deltaTime
        }
        if( this.frameX>this.maxFrame){
            this.markedForDeletion=true
        }

    
  
    }
    draw(context){
        context.drawImage(this.image,this.frameX*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height)
    }


}
class inputHandler{
    constructor(game){
        this.game=game
        this.treshFloor= 30
        window.addEventListener('keydown', e=>{
            if((e.key==='ArrowDown'|| e.key==='ArrowUp') && this.game.keys.indexOf(e.key)==-1 ){
                this.game.keys.push(e.key)
                background.play()
            }
            else if (e.key==='0'|| e.key==='1'|| e.key==='2'){
                this.game.player.shootTop(e.key);
           
            }
            else if (e.key==='d'){
                debug=!debug
            }
            else if (e.key==='n'){
                niveau+=1
              
                this.game.ennemies=[]
                this.game.projectiles=[]
              
            }
            else if (e.key===' ' || this.game.keys.includes('swipe Down')|| this.game.keys.includes('swipe up')){
                console.log('yep')
                if(this.game.gameOver==true){
                    background.play()
                    this.game.neverPlay=false
                this.game.player.chances=3;
                this.game.player.score=0;
                this.game.ammo=5
                this.game.totalEnnemy=TOTALEnnemy
                // this.game.ennemies=[]
                this.game.player.projectiles=[]
                this.game.ennemies=[]
                // this.game.projectiles=[]
                this.game.gameOver=false
               
                if(this.game.win){
             
                this.game.win=false
                niveauSet()
                }
            animate(0)}

           
            }
        })
        
        window.addEventListener('keyup', e=>{
            if(this.game.keys.indexOf(e.key)>-1){
                this.game.keys.splice(this.game.keys.indexOf(e.key),1)
            }
         
        })
        window.addEventListener('touchstart',e=>{
            this.touchY = e.changedTouches[0].pageY
        })
        window.addEventListener('touchmove',e=>{

            const swipeDistance = e.changedTouches[0].pageY- this.touchY
            if(swipeDistance<-this.treshFloor && this.game.keys.indexOf('swipe Down')==-1) this.game.keys.push('swipe Down') 
            if(swipeDistance>this.treshFloor && this.game.keys.indexOf('swipe Up')==-1) this.game.keys.push('swipe Up') 
        })
        window.addEventListener('touchend',e=>{
      
            this.game.keys.splice(this.game.keys.indexOf('swipe Down'),1)
            this.game.keys.splice(this.game.keys.indexOf('swipe Up'),1)
            if(this.game.gameOver==true){
                background.play()
                this.game.neverPlay=false
            this.game.player.chances=3;
            this.game.player.score=0;
            this.game.ammo=5
            this.game.totalEnnemy=TOTALEnnemy
            // this.game.ennemies=[]
            this.game.player.projectiles=[]
            this.game.ennemies=[]
            // this.game.projectiles=[]
            this.game.gameOver=false
           
            if(this.game.win){
         
            this.game.win=false
            niveauSet()
            }
        animate(0)}
        })
        
        window.addEventListener('touchstart',e=>{
            this.touchX=e.changedTouches[0].pageX
            
        })
        window.addEventListener('touchmove',e=>{
            // const swipeDistanceX= e.changedTouches[0].pageX-this.touchX
            // if(swipeDistanceX >=300 && swipeDistanceX<700){
            //     this.game.player.shootTop(0);
            // }
           
            // if(swipeDistanceX <=200 && swipeDistanceX>300){
            //     this.game.player.shootTop(1);
            // }
            // if(swipeDistanceX>=300 ){
            //     this.game.player.shootTop(2);
            // }
        })
        window.addEventListener('touchend',e=>{
            const swipeDistanceX= e.changedTouches[0].pageX-this.touchX
            if(swipeDistanceX >=100 && swipeDistanceX<200){
                this.game.player.shootTop(0);
            }
            if(swipeDistanceX >=200 && swipeDistanceX<300){
                this.game.player.shootTop(1);
            }
            if(swipeDistanceX >=300 ){
                this.game.player.shootTop(2);
            }
        })

      
    }
}
class Projectile{
    constructor(game, x, y,nombre){
        this.game= game;
        this.x= x;
        this.y=y; 
        this.width= 10;
        this.height=  3;
        this.speed= 10;
        this.markedForDeletion= false;
        this.nombre=nombre
        this.lancer=false
    }
    update(){
        this.x += this.speed
        if (this.x > this.game.width * 0.8) {
      
            // color='yellow'
            this.markedForDeletion= !this.markedForDeletion;}
            if(this.x>this.game.width/9){
                this.lancer=true
            }
    }
    draw(context){
        context.save()
        context.font =" 35px Arial"
        context.fillStyle= 'yellow';
        context.fillText(this.nombre,this.x,this.y)
        context.fillRect(this.x,this.y,this.width,this.height);
        context.restore()
    }


}





class Player{
    constructor(game){
        this.game= game
        this.width= 120
        this.height=190
        this.x=20
        this.y=250
        this.speedY=0
        this.maxSpeed=5
        this.projectiles=[]
        this.score=0
        this.chances=3
        this.image= document.getElementById('player')
        this.frameX=0
        this.frameY=0
        this.maxFrame=37
        this.fps=100
        this.frameInterval=1000/this.fps
        this.frameTimer=0
    }

    update(deltaTime){
    niveauSet()
        this.y+=this.speedY
        if(game.keys.includes('ArrowDown') || game.keys.includes('swipe Down') ){
            this.speedY= this.maxSpeed
            if(this.y>this.game.height-this.height/2){
                this.y=this.game.height-this.height/2
            }
        }
       else  if(game.keys.includes('ArrowUp') || game.keys.includes('swipe Up')){
            this.speedY= -this.maxSpeed
            if(this.y<-this.height/2) this.y=-this.height/2
        }
        else{
            this.speedY=0
        }
        this.projectiles.forEach(projectile=>{
            projectile.update();
        });
        this.projectiles= this.projectiles.filter(projectile => !projectile.markedForDeletion );
        this.projectiles=this.projectiles.filter(event=>!event.markedForDeletion)

    if(this.frameTimer>this.frameInterval){
        if(this.frameX>this.maxFrame){
            this.frameX=0
        }
        else{
            this.frameX++
        }
    this.frameTimer=0}
        else{
            this.frameTimer+=deltaTime
        }
    }
    draw(context){
        // context.save()
        // context.fillStyle = color
        // if(debug) context.strokeRect(this.x,this.y,this.width,this.height)
        // context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
        // context.restore()
        this.projectiles.forEach(projectile=>{
            projectile.draw(context)
        })

        if(this.game.gameOver==false && this.game.totalEnnemy==0 && this.game.ennemies.length==0 && this.game.player.chances>0){
            this.game.win=true
            this.game.gameOver=true
            background.pause()
           win.play()
            niveau++
          
            niveauSet()
            context.save()
            context.fillStyle='rgba(0,0,0,0.6)'
            context.fillRect(0,0,canvas_WIDTH,canvas_HEIGHT)
            context.fillStyle='white'
            context.fillStyle='white'
            context.textAlign= "center"
            context.font=" 60px Arial"
            context.fillText('Gagné ! Bravo, Vous pouvez passer au niveau '+ niveau, canvas_WIDTH/2,canvas_HEIGHT/2)
            context.fillText("Clique sur la touche espace pour continuer !", canvas_WIDTH/2,canvas_HEIGHT/2+100)
            context.restore()
          
         
        

            
            // console.log(p1+ ' '+p2 )
         
        }
        else if ( this.game.player.chances<=0){
            background.pause()
            lose.play()
            this.game.projectiles=[]
            this.game.ennemies=[]
            context.fillStyle='rgba(0,0,0,0.6)'
            context.fillRect(0,0,canvas_WIDTH,canvas_HEIGHT)
            context.fillStyle='white'
            context.fillStyle='white'
            context.textAlign= "center"
            context.font=" 60px Arial"
            context.fillText("Dommage, il y a encore de l'entraînement à faire ", canvas_WIDTH/2,canvas_HEIGHT/2)
            context.font=" 40px Arial"
            context.fillText("Clique sur la touche espace pour recommmencer!", canvas_WIDTH/2,canvas_HEIGHT/2+100)
            this.game.gameOver=true
      

            
        }
else if(this.game.gameOver==true && this.game.neverPlay==true){
    background.play()
    context.fillStyle='white'
    context.textAlign= "center"
    context.font=" 40px Arial"
    context.fillStyle='rgba(0,0,0,0.6)'
    context.fillRect(0,0,canvas_WIDTH,canvas_HEIGHT)
    context.fillStyle='yellow'
    context.fillText("Dedicace au père terrestre D.M pour l'épaulage ! ", canvas_WIDTH/2+100,canvas_HEIGHT/2-160)
    context.fillStyle='white'
    context.fillText("Bonjour et bienvenue sur ce nouveau jeu", canvas_WIDTH/2+100,canvas_HEIGHT/2-60)
    context.fillText("A l'aide des touches de déplacements et des numéros ou en balayant l'écran,", canvas_WIDTH/2,canvas_HEIGHT/2)
    context.fillText("envoie sur chaque poisson, le nombre de", canvas_WIDTH/2,canvas_HEIGHT/2+60)
    context.fillText(" racines que possède son équation", canvas_WIDTH/2,canvas_HEIGHT/2+120)
    context.fillText("Clique sur la touche espace ou balaie l'écran pour jouer !", canvas_WIDTH/2,canvas_HEIGHT/2+200)
}
context.save()
context.fillStyle = color
if(debug) context.strokeRect(this.x,this.y,this.width,this.height)
context.drawImage(this.image,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width,this.height)
context.restore()

    }
    shootTop(nombre){
        if(this.game.ammo>0){
        this.projectiles.push(new Projectile(this.game, this.x+80, this.y+30,nombre))
            this.game.ammo--
        }
    }
}

class Game{
    constructor(width,height){
        this.width=width
        this.height=height
        this.ammo = 5
        this.player= new Player(this)
        this.input = new inputHandler(this)
        this.keys=[]
        this.ammoMax=5
        this.ammoTimer=0
        this.ammoInterval=400
        this.ui = new UI(this)
        this.ennemies=[]
        this.ennemyInterval=2000
        this.ennemyTimer=0
        this.totalEnnemy=TOTALEnnemy
        this.gameOver = true
        this.background= new Background(this)
        this.layer4= new Layer(this,document.getElementById('layer4'),1.3)
        this.speed=1
        this.particules=[]
        this.effects=[]
        this.win=false
        this.neverPlay=true

    }
    addEnnemy(deltaTime){
        // console.log('level '+ niveau)
        if(this.totalEnnemy>0){
                if(this.ennemyTimer> this.ennemyInterval && this.gameOver==false){
                    const randomize=Math.random()
                    if(randomize<p1){
                    this.ennemies.push(new angular1(this))}
                    else  if(p1<=randomize && randomize<p2) {
                        // console.log('on y est ??')
                        this.ennemies.push(new angular2(this))
                    }
                    else  if(p2<=randomize) {
                        this.ennemies.push(new lucky(this))
                    }
                    this.totalEnnemy--
                    this.ennemyTimer=0
                    // console.log(this.ennemies)
                 
                }
                else{
                    this.ennemyTimer+=deltaTime
                }}
    }

    update(deltaTime){
    
        this.layer4.update()
        this.background.update()
        this.player.update(deltaTime)
        if(this.ammoTimer>this.ammoInterval){
            if(this.ammo<=this.ammoMax)
            this.ammo++
            this.ammoTimer=0
        }else{
            this.ammoTimer+=deltaTime
        }
        this.ennemies.forEach(ennemy=>{
            ennemy.update(deltaTime)
            if(checkCollision(this.player,ennemy)){
                ennemy.markedForDeletion=true
                this.player.chances--
                if(this.player.chances<=0){
                    this.gameOver=true
                }
            }
            this.player.projectiles.forEach(projectile=>{
                if( checkCollision(projectile,ennemy)){
                 
                    if(projectile.nombre==ennemy.solution2){
                      
                   
                        projectile.markedForDeletion=true
                       
                    ennemy.lives--}
                    else{
                        projectile.speed=-4* projectile.speed
                        rater.play()
                    }
                    if(ennemy.lives<=0){
                        ennemy.markedForDeletion=true
                        this.player.score+=ennemy.score
                        const randomize2 = Math.floor(Math.random()*5)
                        
                     
                        const nbParticules= 3+ randomize2
                        for (let i=0;i<nbParticules;i++){
                        this.particules.push(new Particules(this,ennemy.x,ennemy.y))}
                        if(randomize2<2){
                            toucher1.play()
                            collision.play()
                        this.effects.push(new FireExplosion(this,ennemy.x,ennemy.y))}
                        else{
                            toucher2.play()
                            collision.play()
                            this.effects.push(new SmokeExplosion(this,ennemy.x,ennemy.y))
                        }
                       
                    }
                }
                if( checkCollision(projectile,this.player)){
                    if(projectile.lancer){
                        collision.play()
                      projectile.markedForDeletion=true
                      this.player.projectiles=this.player.projectiles.filter(ennemy=> (!ennemy.markedForDeletion))
                    this.effects.push(new SmokeExplosion(this,this.player.x,this.player.y))
                    this.player.chances--}
                }
            })
           
        })

        this.particules.forEach(particule=>{
            particule.update()
        })
        this.effects.forEach(particule=>{
            particule.update(deltaTime)
        })
        this.ennemies=this.ennemies.filter(ennemy=> (!ennemy.markedForDeletion))
        this.particules=this.particules.filter(particule=> (!particule.markedForDeletion))
        this.effects=this.effects.filter(particule=> (!particule.markedForDeletion))
       
   
    }

    draw(context){
        this.background.draw(context)
  
        this.ennemies.forEach(ennemy=>{
            ennemy.draw(context)
        })
        this.ui.draw(context)
        this.particules.forEach(particule=>{
            particule.draw(context)
        })
        this.effects.forEach(particule=>{
            particule.draw(context)
        })
        this.player.draw(context)
        this.layer4.draw(context)
      
       
    }
}
const game= new Game(canvas.width,canvas.height)
let lastTime=0

function animate(timeStamp){
    const deltaTime= timeStamp-lastTime
    lastTime=timeStamp

    ctx.clearRect(0,0,canvas_WIDTH,canvas_HEIGHT)
    game.update(deltaTime)
   game.addEnnemy(deltaTime)
    game.draw(ctx)
   
 if(!game.gameOver)   requestAnimationFrame(animate)

}
niveauSet()
animate(0)

function checkCollision(rect1,rect2){
    return ( rect1.x<rect2.x+rect2.width &&
            rect1.x+rect1.width>rect2.x &&
            rect1.y<rect2.y+rect2.height &&
            rect1.y+rect1.height>rect2.y) }

function niveauSet(){
    if(niveau==1){
        p1=1
        p2=1.2
        p3=1.2
    }
    else if(niveau==2){
        p1=0.3
        p2=1
    }
    else if (niveau==3){
        p1=0.2
        p2=0.4
        p3=1
    }
    else if(niveau==0){
        p1=0
        p2=1
    }
    else if (niveau==4){
        p1=0.4
        p2=0.7
        p3=1
        game.ennemyInterval=1600
    }
    else if (niveau==5){
        p1=0.4
        p2=0.7
        p3=1
        game.ennemyInterval=1300
    }
    else if (niveau==6){
        p1=0.4
        p2=0.7
        p3=1
        game.ennemyInterval=1000
    }
    else if (niveau==7){
        p1=0.4
        p2=0.7
        p3=1
        game.ennemyInterval=1000
    }
    else if (niveau==8){
        p1=0.4
        p2=0.7
        p3=1
        game.ennemyInterval=800
    }
    else if (niveau==9){
        p1=0.4
        p2=0.7
        p3=1
        game.ennemyInterval=800
    }
    else if (niveau==10){
        p1=0.4
        p2=0.7
        p3=1
        game.ennemyInterval=400
    }
}
})