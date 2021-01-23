class Game{
    constructor(){

    }

    getState(){
        var gameStateref = database.ref('gameState');
        gameStateref.on('value',function(data){
            gameState = data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState: state
        });
    }

    start(){
        if(gameState === 0){
            player = new Player();
            player.getCount();
            form = new Form();
            form.display();
        }
        car1 = createSprite(100,200);
        car1.addImage(car1img);

        car2 = createSprite(300,200);
        car2.addImage(car2img);

        car3 = createSprite(500,200);
        car3.addImage(car3img);

        car4 = createSprite(700,200);
        car4.addImage(car4img);
        
        allcars = [car1,car2,car3,car4];
    }

    play(){
        form.hide();
        textSize(30);
        text("Game Start !",150,100);
        Player.getPlayerInfo();
        if(allPlayers !== undefined){
            background("groundimg");
            image(trackimg, 0, -displayHeight*4, displayWidth, displayHeight*5)
            var index = 0;
            var x = 175;
            var y; 
            for(var plr in allPlayers){
               index += 1;
               x += 200;
               y = displayHeight - allPlayers[plr].distance;
               allcars[index-1].x = x;
               allcars[index-1].y = y;
               if(index === player.index){
                   strokeWeight(10);
                   fill("red");
                   ellipse(x,y,80,80);
                   allcars[index-1].shapeColor = "red";
                   camera.position.x = displayWidth/2;
                   camera.position.y = allcars[index-1].y;
               }
            }
        }

        if(keyDown("UP_ARROW") && player.index !== null){
            player.distance += 50;
            player.update();
        }

        if(player.distance > 4000){
            gameState = 2;
        }

        drawSprites();
    }

    //end(){
    // text("Game Over", displayWidth/2, 4000);
    //}/
}