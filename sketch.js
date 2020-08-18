//Create variables here 
var dog,happydog,database,foodS,foodStock, foodObj;
var fedTime, lastFed; 
var feed, addFood
function preload()
{ 
  dogIMG = loadImage("Dog.png"); 
  happydog = loadImage("happydog.png");
  
	//load images here
}

function setup() {
  createCanvas(500, 500); 
  dog = createSprite(250,350,10,10);  
  dog.addImage(dogIMG); 
  dog.scale= 0.1;
  database =firebase.database(); 
  foodObj = new Food(); 
  foodStock = database.ref('food');
  foodStock.on("value",readStock); 
  feed=createButton("Feed the dog"); 
  feed.position(700,95); 
  feed.mousePressed(feedDog); 

  addFood=createButton("Add Food"); 
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
  foodObj = new Food(); 
  
}


function draw() {  
  background(46,139,87); 
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS); 
    dog.addImage(happydog);
  }  */
  //console.log(foodS); 
  foodObj.display(); 
  fedTime=database.ref('FeedTime'); 
  fedTime.on("value",function(data){
    lastFed=data.val();
  });  
stroke(10); 
fill(255);
if(lastFed>=12){
  text("Last Feed: "+ lastFed%12 + " PM",350,30);
} else if(lastFed ===0){
  text("Last Feed: 12 AM",350,30); 
} else{
  text("Last Feed: "+ lastFed + " AM",350,30);
}

  drawSprites();  
  textSize(40); 
  fill(255); 
  stroke(10);
  text("food:"+foodS,200,300)
  //add styles here

}

function readStock(data){
  foodS=data.val(); 
  foodObj.updateFoodStock(foodS); 
} 
/*function writeStock(x){ 
  if(x<=0){
    x=0
  } else{
    x=x-1;
  }
  database.ref('/').update({
    food:x
  })
}*/

function feedDog(){
  dog.addImage(happydog); 
  foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
  database.ref('/').update({
    food:foodObj.getFoodStock(), 
    FeedTime:hour()
  }) 
} 
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}