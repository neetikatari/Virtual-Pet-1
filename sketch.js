//Virtual Pet
//Created using REALTIME DATABASE - Firebase
//Project demonstrated use of ref(),on(),val(),update()
//using the above mentioned commands values are read and written in the database

var database;
var dog,dogImage,happyDog,treats,treatStock

function preload(){
  dogImage = loadImage("images/dogImg.png")
  dogHappy = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()
  dog=createSprite(250,300,50,50)
  dog.addImage(dogImage)
  dog.scale =0.3
  treatStock = database.ref('food')
  treatStock.on("value",readStock,showError)
}

function draw() { 
  background(46,139,87)
  if(treats !=undefined){
    if(keyWentDown(UP_ARROW)){
      console.log(treats)
      writeStock()
      dog.addImage(dogHappy)
      console.log(treats)
    }
  }

  drawSprites();

  textSize(20)
  fill("blue")
  text("milk left "+treats,200,100)
  text("press UP_ARROW to feed DAISY :)",100,50)
}

function readStock(data){
  treats = data.val()

}

function writeStock(){

  if(treats<=0){
    treats =0;
  }
  else{
  treats -=1
  }
  database.ref('/').update({food:treats})
}

function showError(err){
  console.log("error"+err)
}
