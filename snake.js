const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//tworzenie przestrzeni

const box = 32;

// wczytaj img

const ground = new Image();
ground.src = "img/ground.png";

const beerImg = new Image();
beerImg.src = "img/beer1.png";


// audio

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/dead.mp3";
up.src = "audio/dead.mp3";
left.src = "audio/dead.mp3";
right.src = "audio/dead.mp3";
down.src = "audio/dead.mp3";

// tworzenie snejka :)

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// tworzenie piwa

let beer = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
};

// tworzenie punktacji

let score = 0;

// kontrola snejka

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        left.play();
        d = "LEFT"
    } else if (key == 38 && d != "DOWN") {
        up.play();
        d = "UP"
    } else if (key == 39 && d != "LEFT") {
        right.play();
        d = "RIGHT"
    } else if (key == 40 && d != "UP") {
        down.play();
        d = "DOWN"
    }
}

//funkcja kolizji / check collision function

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
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


    //dokładny kierunek

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    //gdy snejk dorwie się do zdobyczy

    if (snakeX == beer.x && snakeY == beer.y) {
        score++;
        eat.play();
        beer = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }
        //nie pozbywamy sie ogona
    } else {
        //pozbycie ogona
        snake.pop();
    }

    //dodawanie elementow snejka w trakcie gry

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    //koniec gry / Game Over

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box
        || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
        dead.play();
    }


    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box)
}

// wywołanie gry co każde 100ms

let game = setInterval(draw, 100);
