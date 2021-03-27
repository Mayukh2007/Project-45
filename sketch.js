var ground,groundImage,player,diamond, diamondsGroup,score = 0,invisibleground,laserbeam, laserbeamGroup,life=10,blank1,blank2, blank1Image,blank2Image,strawberry, strawberryGroup, collider, colliderGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
groundImage = loadAnimation("ground.png");
laserImage = loadAnimation("laser.png");
blank1Image = loadAnimation("win.png"); 
blank2Image = loadAnimation("Loose.png");
diamondImage = loadAnimation("fullorange.png");
strawberryImage = loadAnimation("orange.png");
}

function setup() {
createCanvas(400,400);

diamondsGroup = new Group();
laserbeamGroup= new Group();
strawberryGroup=new Group();
colliderGroup = new Group();

ground = createSprite(400,200,20,20);
ground.addAnimation("ground",groundImage);
ground.scale = 2;
ground.velocityX = -4;

player = createSprite(50,300,20,20);
player.depth = ground.depth;
player.depth = player.depth+1;
player.setCollider("circle",0,0);
player.debug = true;

invisibleground = createSprite(200,320,600,10);
invisibleground.visible = false;

blank1 = createSprite(200,200,400,400);
blank1.addAnimation("blank",blank1Image);
blank1.visible = false;
blank1.scale = 2.2;

blank2 = createSprite(200,200,400,400);
blank2.addAnimation("blank",blank2Image);
blank2.visible = false;
blank2.scale = 2;


}
function draw() {
if (gameState === PLAY){

spawndiamonds();
spawnstrawberry();
spawnlaserbeam();
spawncollider();
  
if (keyDown("space") && player.y>290){
player.velocityY = -10;
}

player.velocityY = player.velocityY + 0.40; 
player.collide(invisibleground);
    
if (player.isTouching(diamondsGroup)){
diamondsGroup.destroyEach();
score = score+5;
}
if (player.isTouching(strawberryGroup)){
strawberryGroup.destroyEach();
score = score+1;
}
if (player.isTouching(laserbeamGroup)){
laserbeamGroup.destroyEach();
life = life-2;
}

if (ground.x <-40){
ground.x = 400
}

if (player.isTouching(colliderGroup)){
player.velocityY = 0;
}
  
if (score===20){
blank1.visible=true;
gameState = END;
}
if (life<1){
gameState = END;
blank2.visible=true;
}
if (gameState ===END){
score.visible = false;
life= 0;
strawberryGroup.destroyEach();
colliderGroup.destroyEach();
}
drawSprites();
fill("red");
textSize(20);
text("Score:"+score,10,50);
text("Life:"+life,300,50)
}
}
function spawndiamonds(){
if (frameCount%350===0){
diamond = createSprite(400,270,10,50);
diamond.addAnimation("diamond",diamondImage);
diamond.scale = 0.5;
diamond.velocityX = -4;
diamond.depth = ground.depth;
diamond.depth = diamond.depth+1;
player.depth = diamond.depth;
player.depth = player.depth+1;
diamondsGroup.add(diamond);
}
}
function spawnlaserbeam(){
if (frameCount%60===0){
laserbeam = createSprite(400,300,40,40);
laserbeam.addAnimation("laser",laserImage);
laserbeam.scale = 0.13;
laserbeam.collide(ground);
laserbeam.veloctiyX = -4;
laserbeam.setlifetime = 150;
laserbeam.depth = ground.depth;
laserbeam.depth = laserbeam.depth+1;
player.depth = laserbeam.depth;
player.depth = player.depth+1;
laserbeamGroup.add(laserbeam);
}
}
function spawnstrawberry(){
if (frameCount%100===0){
strawberry = createSprite(400,290,60,60);  
strawberry.addAnimation("strawberry",strawberryImage);
strawberry.scale = 0.3;
strawberry.velocityX = -4;
player.depth = strawberry.depth; 
player.depth = player.depth+1;
strawberry.collide(invisibleground);
strawberryGroup.add(strawberry);
}
}
function spawncollider(){
if (frameCount%50===0){
collider = createSprite(400,200,50,10);
collider.velocityX = -4;
colliderGroup.add(collider);
} 
}