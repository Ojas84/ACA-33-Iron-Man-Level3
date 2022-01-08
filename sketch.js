var brickImage , brickGroup ,diamondGroup , diamondImage;
var bg, backgroundImg;
var diamondScore=0
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironImage=loadImage("images/iron.png");
  brickImage=loadImage("images/stone.png");
  diamondImage=loadAnimation("images/diamond.png");
 
}

function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg)
  bg.scale=2
  bg.velocityY=-5

  iron=createSprite(200,585,20,20)
  iron.addImage(ironImage)
  iron.scale=0.3
  ground=createSprite(200,585,900,10)
  ground.visible=false
  diamondGroup=new Group()
  
  
  brickGroup=new Group()
 
}

function draw() {
  
  if(bg.y<225){
    bg.y=bg.width/4;
  }
  if(keyDown("left"))
  iron.x -= 4
  if(keyDown("right"))
  iron.x += 4
  if(keyDown("space"))
  iron.velocityY=-12
  iron.velocityY  +=0.5
  iron.collide(ground)
  generateBricks();
    for (var i=0; i<brickGroup.length ;i++){
        var temp=(brickGroup).get(i) ;
        if (temp.isTouching(iron)){
            iron.collide(temp);
        }
    }
    generatediamond();
    for(var i=0 ; i<(diamondGroup).length ; i++){
        var temp=(diamondGroup).get(i);
        if(temp.isTouching(iron)){
            
            diamondScore++;
            temp.destroy();
            temp=null;
        }
      }
    
    drawSprites();
    textSize(20);
    fill("white")
    text("diamonds collected: "+ diamondScore, 500,50);

   
}
function generateBricks(){
  if (frameCount%70 === 0) {
      var brick = createSprite(1200,120,40,10);
      brick.x=random(50,450);
      brick.addImage(brickImage);
      brick.scale=0.5;
      brick.velocityY=5;

      brick.lifetime=250;
      brickGroup.add(brick);
  }
}

function generatediamond(){
  if (frameCount% 50 === 0) {
      var diamond = createSprite(1200,120,40,10);
      diamond.addAnimation("diamond",diamondImage);
      diamond.x=Math.round(random(80,350));
      diamond.scale=0.3;
      diamond.velocityY=3;
      diamond.lifetime=1200;
      diamondGroup.add(diamond);
  }
}
