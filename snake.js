let canvas;
let context;
let width;
let height;
let fruit = {
    x : getRandomNumber(20, 480),
    y : getRandomNumber(20, 480),
    size : 10
}
let points = 0;

let speed = 100;

let interval_id;

let ps = [];

let player = {
    x : 250,
    y : 250,
    size : 20
};

let moveRight = false;
let moveUp = false;
let moveDown = false;
let moveLeft = false;


document.addEventListener('DOMContentLoaded', init, false);








function init() {
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    window.addEventListener('keydown',activate,false);
    //window.addEventListener('keyup',deactivate,false);


    interval_id = window.setInterval(draw, speed);
}






function draw() {

    context.clearRect(0, 0, width, height);
    context.fillStyle ='green';
    context.fillRect(player.x, player.y, player.size, player.size);
//     context.fillRect(player.x+player.size, player.y, player.size, player.size);
    context.fillStyle = "red";
    context.strokeStyle = "white";
    context.lineWidth   = 2;
    context.strokeRect(player.x, player.y, player.size, player.size);
//     context.lineWidth = 100;
//     context.strokeStyle = "rgba(255,255,255,100)";
    context.fillRect(fruit.x, fruit.y, fruit.size, fruit.size);
    if (player.x >= width - player.size) {
        stop();
        window.alert('Game Over. You Scored ' + points + ' points');
        return;
        //player.x = 0;
    }
    else if (player.x < 0) {
        stop();
        window.alert('Game Over. You Scored ' + points + ' points');
        return;
        //player.x = width;
    }
    if (player.y >= height - player.size) {
        stop();
        window.alert('Game Over. You Scored ' + points + ' points');
        return;
        //player.y = 0;
    }
    else if (player.y < 0) {
        stop();
        window.alert('Game Over. You Scored ' + points + ' points');
        return;
        //player.y = height;
    }
    console.log(fruit.x);

    for (let p of ps) {
        p.x = p.x + p.xChange;
        p.y = p.y + p.yChange;
        if (p.x <= -p.size) {
            p.x = width;
        }
    }

    if (moveRight) {
        player.x += 3;
    }
    if (moveUp) {
        player.y -= 3;
    }
    if (moveDown) {
        player.y += 3;
    }
    if (moveLeft) {
        player.x -= 3;
    }

    if (collides(fruit)) {
        points+=1;
        speed = 100;
        
        context.clearRect(fruit.x, fruit.y, fruit.size+1, fruit.size+1);
        fruit = {
            x : getRandomNumber(20, 480),
            y : getRandomNumber(20, 480),
            size : 10,
        };
        return speed;
    }
    return speed;
}






function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}






function collides(fruit) {
    if (player.x + player.size < fruit.x ||
        fruit.x + fruit.size < player.x ||
        player.y > fruit.y + fruit.size ||
        fruit.y > player.y + player.size) {
        return false;
    } else {
        return true;
    }
}








function stop() {
    clearInterval(interval_id);
    window.removeEventListener('keydown', activate);
    //window.removeEventListener('keyup', deactivate);


}

function activate(event){
    let keyCode = event.keyCode;
    if (keyCode === 38 && !(moveDown) ){
        moveUp = true;
        moveRight = false;
        moveDown = false;
        moveLeft = false;
    } else if (keyCode === 39 && !(moveLeft)){
        moveRight = true;
        moveUp = false;
        moveDown = false;
        moveLeft = false;
    } else if (keyCode === 40 && !(moveUp)){
        moveDown = true;
        moveRight = false;
        moveUp = false;
        moveLeft = false;
    } else if (keyCode === 37 && !(moveRight)){
        moveLeft = true;
        moveRight = false;
        moveUp = false;
        moveDown = false;
    }
}

function deactivate(event){
    let keyCode = event.keyCode;
    if (keyCode === 38){
        moveUp = false;
    } else if (keyCode === 39){
        moveRight = false;
    } else if (keyCode === 40){
        moveDown = false;
    } else if (keyCode === 37){
        moveLeft = false;
    }
}
