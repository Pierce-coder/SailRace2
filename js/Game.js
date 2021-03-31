class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

  
    green= createSprite(600,160);
    green.addAnimation("GreenP", greenP_img);
    green.addAnimation("GreenS",greenS_img);
    green.scale=0.5;
    blue = createSprite(1200,160);
    blue.addAnimation("BlueS",blueS_img);
    blue.addAnimation("BlueP",blueP_img);
    blue.scale=0.5;
    boats = [blue, green];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    player.getFinishCount();
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(ocean, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        boats[index-1].x = x;
        boats[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          camera.position.x = displayWidth/2;
          camera.position.y = boats[index-1].y;
          console. log(camera.position.y);
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    /*if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }*/

    if(keyIsDown(RIGHT_ARROW) && player.index !==null){
      boats[player.index-1].changeAnimation("GreenP",greenP_img);
      boats[player.index-1].y +=5
      boats[player.index-1].x +=5
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !==null){
      boats[player.index-1].changeAnimation("GreenS",greenS_img);
      boats[player.index-1].y +=5
      boats[player.index-1].x +=5
      player.update();
    }


    if(keyIsDown(RIGHT_ARROW) && player.index !==null){
      boats[player.index-1].changeAnimation("BlueP",blueP_img);
      player.distance +=5
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !==null){
      boats[player.index-1].changeAnimation("BlueS",blueS_img);
      player.distance +=5
      player.update();
    }

    if(player.distance > 4300){
      gameState = 2;
      player.rank = player.rank + 1;
      Player.updateFinish(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log("Congrats for finishing in " + player.rank);
  }
}
