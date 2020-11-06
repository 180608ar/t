var trex,trexr,ground,gro,ground2,cloud,clo;

var o1,o2,o3,o4,o5,o6,obs,score=0,play=1,end=2,gs=play;

var groclo,groobs,gameOver,restart,gm,re,dinoe;

var jump,die,scoreso;

function preload (){
  trexr = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  gro = loadImage("ground2.png");
  
  clo = loadImage("cloud.png");
  
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  
  re = loadImage("restart.png");
  gm = loadImage("gameOver.png");
  
  dinoe = loadAnimation("trex_collided.png");
  
  jump=loadSound("jump.mp3");
  die=loadSound("die.mp3");
  scoreso=loadSound("checkPoint.mp3");
  
  
}

function setup (){
  createCanvas(windowWidth,windowHeight);
  trex = createSprite(50,height-50,20,20);
  trex.addAnimation("tr",trexr);
  trex.scale = 0.6;
  trex.addAnimation("de",dinoe);
  trex.debug = false;
  trex.setCollider("rectangle",0,0,90,trex.height);
  
  ground = createSprite(width/2,height-40,width,5);
  ground.addImage(gro);
  
 
  
  ground2 = createSprite(width/2,height-30,width,5);
  ground2.visible = false;
  
  groclo = new Group();
  groobs = new Group();
  
  gameOver = createSprite(width/2,height/2,10,10);
  gameOver.addImage(gm);
  gameOver.scale = 0.7;
  restart = createSprite(width/2,height/2,20,20);
  restart.addImage(re);
  restart.scale = 0.5;
  
} 

function draw(){
  background("black");
    
  if(gs===play){
    
     ground.velocityX = -(4+ Math.round(score/100));
    
     score=score+Math.round(getFrameRate()/60);
    
    if(score%100===0 && score > 0){
      scoreso.play();
    }
     if (ground.x < 0){
    ground.x = ground.width/2;
    }
 if ((touches.length>0||keyDown("space"))&& trex.y >height-50){
    trex.velocityY = -12;
   jump.play();
   touches = [];
  }
   trex.velocityY = trex.velocityY+0.6;
 spawnClouds();
  
  spawnObstacles();
    gameOver.visible = false;
    restart.visible = false;
    if(trex.isTouching(groobs)){
      gs=end;
      die.play();
    //  trex.velocityY = -12;
    }
  
  }
  if(gs===end){
    ground.velocityX=0;
    trex.velocityY=0;
    groobs.setVelocityXEach(0);
    groclo.setVelocityEach(0);
    
     gameOver.visible = true;
    restart.visible = true;
    
    trex.changeAnimation("de",dinoe);

    groobs.setLifetimeEach(-1);
    groclo.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)||touches.length>0){
      reset();
      touches = [];
    }
    
    
  }
  
  
 text("Score:"+score,width-100,30);
 
 trex.collide(ground2);
  
  
  drawSprites();
}

function reset(){
  gs = play;
   gameOver.visible = false;
    restart.visible = false;
    score = 0;
  groobs.destroyEach();
  groclo.destroyEach();
  trex.changeAnimation("tr",trexr);
}

function spawnClouds(){
  
  if (frameCount%80===0){
    
  cloud = createSprite(width,30,10,10);
  cloud.velocityX = -5;
  cloud.y = random(20,height/3);
  cloud.addImage(clo);
  cloud.scale= 0.5;
    cloud.lifetime = width/2;
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    groclo.add(cloud);
  }
}

function spawnObstacles(){
  
  if (frameCount%90===0){
  
  obs = createSprite(width,height-40,10,20);
  obs.velocityX = -(6+ Math.round(score/100));
    obs.scale= 0.7;
    obs.lifetime = width/2;
    var a = Math.round(random(1,6));
    
    switch(a){
         case 1: obs.addImage(o1);
        break;
         case 2: obs.addImage(o2);
        break;
         case 3: obs.addImage(o3);
        break;
         case 4: obs.addImage(o4);
        break;
         case 5: obs.addImage(o5);
        break;
         case 6: obs.addImage(o6);
        break;
        default: break;
    }
  
    groobs.add(obs);
  }
}

