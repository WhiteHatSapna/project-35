
var balloon;
var database,position;

function preload()
{
  database = firebase.database();
 bg = loadImage("Hot Air Ballon-01.png");
 bal= loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-02.png","Hot Air Ballon-02.png")
}

function setup() {

  createCanvas(700,700);
  balloon= createSprite(100, 350, 50, 50);
  balloon.addAnimation("bal",bal);
  balloon.scale = 0.3; 

  var balloonPosition = database.ref('Balloon/Height');
  balloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(bg); 
  if(keyDown(LEFT_ARROW))
  {
   // balloon.x= balloon.x-10;
    writePosition(-10,0);
  } 
  else if(keyDown(RIGHT_ARROW))
  {
    //balloon.x= balloon.x+10;
    writePosition(10,0);
  } 
  else if(keyDown(UP_ARROW))
  {
    //balloon.y= balloon.y-10;
    if (balloon.scale <1){ 
      writePosition(0, -10); 
    }
    if (balloon.scale >0.1){ balloon.scale = balloon.scale-0.05;}
    writePosition(0,-10);

  } 
  else if(keyDown(DOWN_ARROW))
  {
   // balloon.y= balloon.y+10;
   if (balloon.scale <1){
    balloon.scale = balloon.scale+0.05;
   }
   writePosition(0,10);
  } 
  drawSprites();
}

function readPosition(data)
{
  position = data.val();
  balloon.x =position.x;
  balloon.y= position.y;
}

function writePosition(x,y)
{
  database.ref('Balloon/Height').set({
   'x':position.x+ x,
  'y':position.y+ y
  })
}

function showError()
{
  console.log("Error updating the database");
}