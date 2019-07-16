//get the data to interacta with canvas
const cv = document.getElementById("snakeGame");
const context = cv.getContext("2d");

//load the sounds
const deadSound = new Audio("audio/dead.mp3");
const eatSound = new Audio("audio/eat.mp3");
const moveSound = new Audio("audio/up.mp3");

let previousDirection;
let refreshTime=200;

//tamaño del mapa
const box=32;

//the event lister
document.addEventListener("keydown",direction);


//cargamos las imágenes

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//elementos dl juego
let snake = [];

snake[0]={
    x:9*box,
    y:10*box
}

let food = {
    x : Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random() * 15 + 3) * box
}


let score = 0;

function direction(event){
    if(event.keyCode == 37&& previousDirection!="LEFT"){
        previousDirection ="RIGHT"
        moveSound.play();
    } else if (event.keyCode == 38&& previousDirection!="UP"){
        previousDirection = "DOWN"
        moveSound.play();
    } else if (event.keyCode == 39&&previousDirection !="RIGHT"){
        previousDirection = "LEFT"
        moveSound.play();
    } else if (event.keyCode == 40&&previousDirection !="DOWN"){
        previousDirection = "UP"
        moveSound.play();
    }
}


function drawGame(){

    context.drawImage(ground,0,0);
    //Dibujamos la serpiente
    for(let i = 0;i<snake.length;i++){
        context.fillStyle=(i==0)? "green" :"white";
        context.fillRect(snake[i].x,snake[i].y,box,box);

        context.strokeStyle="red";
        context.strokeRect(snake[i].x,snake[i].y,box,box);

        
    }
    
    //guardamos la variable de la cabeza de la serpiente
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (previousDirection == "LEFT") {snakeX += box;}
    if (previousDirection == "UP") {snakeY += box;}
    if (previousDirection == "RIGHT") {snakeX -= box;}
    if (previousDirection == "DOWN") {snakeY -= box;}

   
    //Subimos la puntuacion si como comida
    if(snakeX==food.x &&snakeY==food.y){
        //restamos tiempo al refresco para crear dificultad dinamica
        refreshTime -=5;
        score++;
        eatSound.play();
        clearInterval(game);
        game = setInterval(drawGame,refreshTime);
        food = {
            x : Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    }else{
        snake.pop();
    }

    
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //si se choca con el muro o si misma se muere
    if(snakeX<box||snakeX>17*box||snakeY<3*box||snakeY>17*box||collision(newHead,snake)){
        clearInterval(game);
        deadSound.play();
    }
    
    //añadimos y repintamos la cabeza y la comida
    snake.unshift(newHead);

    context.drawImage(foodImg,food.x,food.y);

    context.fillStyle = "white";
    context.font="45px Changa one";
    context.fillText(score,2*box,1.6*box);
    
    


}

//comprueba la colision 
function collision(head,array){
    for(let i = 0;i<array.length;i++){
        if(head.x == array[i].x && head.y==array[i].y){
            return true;
        }
    }
    return false;
}

//empieza el refresco de canvas
let game = setInterval(drawGame,refreshTime);
