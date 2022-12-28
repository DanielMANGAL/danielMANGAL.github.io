
const canvas= document.getElementById('canvas1')

const canvas_WIDTH= canvas.width= 500
const canvas_HEIGHT= canvas.height= 500
const ctx = canvas.getContext('2d')
let color= 'green'

class UI {
    constructor(game){
        this.game= game
        this.color='white'
        this.font='Helvetica'
        this.size= 40
    }
    draw(context){
        context.save()
        context.shadowOffsetX=2;
        context.shadowOffsetY=2;
        context.shadowColor= 'black'
        context.fillStyle= this.color
        for (let i=0; i<this.game.ammo;i++){
        context.fillRect(5*i+20,50,3,20)
        context.font = this.size+'px '+ this.font
        context.fillText('Score: '+ this.game.player.score,10,30)
        context.restore()

    }
    }

}



class Enemy{
    constructor(game){
        this.game= game
        this.x = this.game.width
        this.speedX= Math.random()*0.5-1.5
        this.markedForDeletion=false
    }
}

class angular1 extends Enemy{
    constructor(game){
        super(game);
        this.width= 228*0.2
        this.height= 169*0.2
        this.y= Math.random()*(this.game.height -this.height)
        this.lives=5
        this.score=5
    }

    update(){
        this.x+=this.speedX
        if(this.x<0) this.markedForDeletion=!this.markedForDeletion
    }
    draw(context){
        context.save()
        context.fillStyle='red'
        context.font= "55px Arial";
        // context.font = "30px Arial";
        context.fillText(this.lives,this.x,this.y)
        context.fillStyle='55px'
        context.fillRect(this.x,this.y,this.width,this.height)
        context.restore()
    }
}

class inputHandler{
    constructor(game){
        this.game=game
        window.addEventListener('keydown', e=>{
            if((e.key==='ArrowDown'|| e.key==='ArrowUp') && this.game.keys.indexOf(e.key)==-1 ){
                this.game.keys.push(e.key)
            }
            else if (e.key===' '){
                this.game.player.shootTop();
           
            }
        })
        
        window.addEventListener('keyup', e=>{
            if(this.game.keys.indexOf(e.key)>-1){
                this.game.keys.splice(this.game.keys.indexOf(e.key),1)
            }
         
        })
          

      
    }
}
class Projectile{
    constructor(game, x, y){
        this.game= game;
        this.x= x;
        this.y=y; 
        this.width= 10;
        this.height=  3;
        this.speed= 15;
        this.markedForDeletion= false;
    }
    update(){
        this.x += this.speed
        if (this.x > this.game.width * 0.8) {
      
            color='yellow'
            this.markedForDeletion= !this.markedForDeletion;}
    }
    draw(context){
        context.fillStyle= 'yellow';
        context.fillRect(this.x,this.y,this.width,this.height);
    
    }


}





class Player{
    constructor(game){
        this.game= game
        this.width= 120
        this.height=190
        this.x=20
        this.y=100
        this.speedY=0
        this.maxSpeed=5
        this.projectiles=[]
        this.score=0
    }

    update(){
    
        this.y+=this.speedY
        if(game.keys.includes('ArrowDown')){
            this.speedY= this.maxSpeed
        }
       else  if(game.keys.includes('ArrowUp')){
            this.speedY= -this.maxSpeed
        }
        else{
            this.speedY=0
        }
        this.projectiles.forEach(projectile=>{
            projectile.update();
        });
        this.projectiles= this.projectiles.filter(projectile => !projectile.markedForDeletion );
        // this.projectiles=this.projectiles.filter(event=>!event.markedForDeletion)
    
       
    }
    draw(context){
        context.save()
        context.fillStyle = color
        context.fillRect(this.x,this.y,this.width,this.height)
        context.restore()
        this.projectiles.forEach(projectile=>{
            projectile.draw(context)
        })
    }
    shootTop(){
        if(this.game.ammo>0){
        this.projectiles.push(new Projectile(this.game, this.x+80, this.y+30))
            this.game.ammo--
        }
    }
}

class Game{
    constructor(width,height){
        this.width=width
        this.height=height
        this.ammo = 20
        this.player= new Player(this)
        this.input = new inputHandler(this)
        this.keys=[]
        this.ammoMax=50
        this.ammoTimer=0
        this.ammoInterval=500
        this.ui = new UI(this)
        this.ennemies=[]
        this.ennemyInterval=1000
        this.ennemyTimer=0
        this.gameOver = false

    }
    addEnnemy(deltaTime){
                if(this.ennemyTimer> this.ennemyInterval && this.gameOver==false){
                    this.ennemies.push(new angular1(this))
                    this.ennemyTimer=0
                }
                else{
                    this.ennemyTimer+=deltaTime
                }
    }

    update(deltaTime){
    
        this.player.update()
        if(this.ammoTimer>this.ammoInterval){
            this.ammo++
            this.ammoTimer=0
        }else{
            this.ammoTimer+=deltaTime
        }
        this.ennemies.forEach(ennemy=>{
            ennemy.update()
            if(checkCollision(this.player,ennemy)){
                ennemy.markedForDeletion=true
            }
            this.player.projectiles.forEach(projectile=>{
                if( checkCollision(projectile,ennemy)){
                    projectile.markedForDeletion=true
                    ennemy.lives--
                    if(ennemy.lives<=0){
                        ennemy.markedForDeletion=true
                        this.player.score+=ennemy.score
                    }
                }
            })
           
        })
        this.ennemies=this.ennemies.filter(ennemy=> (!ennemy.markedForDeletion))
    }

    draw(context){
        this.ui.draw(context)
        this.player.draw(context)
        this.ennemies.forEach(ennemy=>{
            ennemy.draw(context)
        })
        
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
   
    requestAnimationFrame(animate)

}
animate(0)

function checkCollision(rect1,rect2){
    return ( rect1.x<rect2.x+rect2.width &&
            rect1.x+rect1.width>rect2.x &&
            rect1.y<rect2.y+rect2.height &&
            rect1.y+rect1.height>rect2.y )}