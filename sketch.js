var bg,bgImg;
var player, playerImg;
var alien, alienImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var alienGroup;

var bullets ;
var life = 3;

var gameState = "fight"


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  playerImg = loadImage("assets/player.png")

  alienImg = loadImage("assets/alien.png")

  bgImg = loadImage("assets/space.png")
  bulletimg = loadImage("assets/bullet.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.3
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(playerImg)
   player.scale = 1
   player.debug = true
   player.setCollider("rectangle",0,0,110,100)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    alienGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){

  if(life===3){
    heart3.visible = true
    heart1.visible = false
    heart2.visible = false
  }
  if(life===2){
    heart2.visible = true
    heart1.visible = false
    heart3.visible = false
  }
  if(life===1){
    heart1.visible = true
    heart3.visible = false
    heart2.visible = false
  }

  //go to gameState "lost" when 0 lives are remaining
  if(life===0){
    heart1.visible = false
    heart3.visible = false
    heart2.visible = false
    gameState = "lost"
    
  }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed


//player goes back to original standing image once we stop pressing the space bar

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "bullet"
    
}

//destroy the zombie when bullet touches it
if(alienGroup.isTouching(bulletGroup)){
  for(var i=0;i<alienGroup.length;i++){     
      //write a condition for zombiegroup touches bulletGroup
   if(alienGroup.isTouching(bulletGroup)){
//destroy zombie
        alienGroup.destroyEach()
        bulletGroup.destroyEach();
        } 
  
  }
}

//destroy zombie when player touches it
if(alienGroup.isTouching(player)){

 for(var i=0;i<alienGroup.length;i++){     
      
  if(alienGroup[i].isTouching(player)){
       alienGroup[i].destroy()
//Decrease the life
life -= 1
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
}

drawSprites();

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")

  //use text to display you lost
  fill("blue");
  textSize(100);
  text("you lost",400,400)
  //destroy zombie group
  alienGroup.destroyEach();

  //destroy player
  player.destroy();
 

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  alienGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  alienGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}




//creating function to spawn zombies
function enemy(){
  if(frameCount%20===0){

    //giving random x and y positions for zombie to appear
    alien = createSprite(random(500,1100),random(100,500),40,40)

    alien.addImage(alienImg)
    alien.scale =0.32
    alien.velocityX = -6
    alien.debug= true
    alien.setCollider("rectangle",0,0,400,400)
   
    alien.lifetime = 400
   alienGroup.add(alien)
  }
}
}