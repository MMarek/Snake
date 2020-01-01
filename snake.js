const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//tworzenie przestrzeni

const box = 32;

// wczytaj img

const ground = new Image();
ground.src = "img/ground.png";

const beerImg = new Image();
beerImg.src = "img/beer1.png";

// tworzenie snejka :)

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// tworzenie piwa

let beer = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

// tworzenie punktacji

let score = 0;

// kontrola snejka

document.addEventListener("keydown", direction);

function direction(event) {
    if (event.keyCode == 37 && d !="RIGHT") {
        d = "LEFT"
    } else if (event.keyCode == 38 && d !="DOWN") {
        d = "UP"
    } else if (event.keyCode == 39 && d !="LEFT") {
        d = "RIGHT"
    } else if (event.keyCode == 40 && d !="UP") {
        d = "DOWN"
    }
}

// sprowadzenie wszystkiego do przestrzeni roboczej, tworzenie funkcji

function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect = (snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect = (snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(beerImg, beer.x, beer.y);

    //pierwszy element snejka (old/first head position)
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //pozbycie ogona
    snake.pop();

    //dokładny kierunek

    if(d="LEFT") snakeX -= box;
    if(d="UP") snakeY -= box;
    if(d="RIGHT") snakeX += box;
    if(d="DOWN") snakeY += box;

    //dodawanie elementow snejka w trakcie gry

    let newHead = {
        x:snakeX,
        y:snakeY
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box)
}

// wywołanie gry co każde 100ms

let game = setInterval(draw, 100);