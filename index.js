let inputDir = {x:0,y:0};
const foodsound = new Audio('music/food.mp3');
const gameoversound = new Audio('music/gameover.mp3');
const movesound = new Audio('music/move.mp3');
const musicsound = new Audio('music/background.mp3');
let speed = 9;
let score = 0;
let Hiscore = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13,y:15}
]
food = {x:6,y:10};

function main(ctime){
    window.requestAnimationFrame(main);
    if ((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function isCollide(snake){
    if (snake[0].x>18 || snake[0].x<=0 || snake[0].y>18 || snake[0].y<=0){
        gameoversound.play();
        return true;
    }
    for (let i=1;i<snakeArr.length;i++){
        if (snake[0].x===snake[i].x && snake[0].y===snake[i].y){
            gameoversound.play();
            return true;
        }
    }
    return false;
}
function gameEngine(){

    if(isCollide(snakeArr)){
     
        musicsound.pause();
        inputDir = {x:0, y:0};
        snakeArr = [{x:13,y:15}];
        score = 0;
        scorebox.innerHTML = "Score: " + score;
    }

    if (snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodsound.play();
        score+=1;
        scorebox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y});

        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    for (let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }
    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index===0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
    });

    
    foodElement = document.createElement('div');
    foodElement.classList.add('food');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    board.appendChild(foodElement);
    
}
window.requestAnimationFrame(main);
function startgame(){
    inputDir = {x: 0,y:-1};
    movesound.play();
    musicsound.loop=true;
    musicsound.volume = 1;
    musicsound.play();
}
window.addEventListener('keydown',e=>{
    movesound.play();
    movesound.volume = 0.5;
    musicsound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
})
