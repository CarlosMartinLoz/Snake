alert("Hello! I am an alert box!!");
const cv = document.getElementById("snakeGame");

const context = cv.getContext("2d");

let d;
let refreshTime=200;

document.addEventListener("keydown",direction);

function direction(event){
    if(event.keyCode == 37&& d!="RIGHT"){
        d ="RIGHT"
    } else if (event.keyCode == 38&&d!="DOWN"){
        d = "DOWN"
    } else if (event.keyCode == 39&&d !="LEFT"){
        d = "LEFT"
    } else if (event.keyCode == 40&&d !="UP"){
        d = "UP"
    }
}

//Creamos el map

const box=32;

//cargamos las imágenes

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

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

function draw(){

    context.drawImage(ground,0,0);
    for(let i = 0;i<snake.length;i++){
        context.fillStyle=(i==0)? "green" :"white";
        context.fillRect(snake[i].x,snake[i].y,box,box);

        context.strokeStyle="red";
        context.strokeRect(snake[i].x,snake[i].y,box,box);

        
    }
    
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if (d == "LEFT") {snakeX += box;}
    if (d == "UP") {snakeY += box;}
    if (d == "RIGHT") {snakeX -= box;}
    if (d == "DOWN") {snakeY -= box;}

    if(snakeX==food.x &&snakeY==food.y){
        this.refreshTime-=200;
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
    
    snake.unshift(newHead);

    context.drawImage(foodImg,food.x,food.y);

    context.fillStyle = "white";
    context.font="45px Changa one";
    context.fillText(score,2*box,1.6*box);
    
    


}

let game = setInterval(draw,refreshTime);