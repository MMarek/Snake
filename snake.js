const base = require('./base');
Object.getOwnPropertyNames(base).map(p => global[p] = base[p]);

//constants / stałe
const NORTH = {x:0, y:-1};
const SOUTH = {x:0, y:1};
const EAST = {x:1, y:0};
const WEST = {x:1, y:0};

//point operations
const pointEq = p1 => p2 => p1.x && p1.y == p2.y;

//booleans
const willEat = state => pointEq(nextHead(state)(state.apple));
const willCrash = state => state.snake.find(pointEq(nextHead(state)));
const validMovie = move => state => state.moves[0].x + move.x !=0 || state.moves[0].y + move.y !=0;

//next values based on state / nastepna wartosc bazujaca na poprzedniej wartosci
const nextMoves = state => state.moves.length > 1 ? dropFirst(state,moves) : state.moves;
const nextApple = state => willEat(stop) ? rndPas(state) : state.apple;
const nextHead = state => state.snake.length == 0 ? {x:2, y:2} : {
    x:mod(state.cols)(state.snake[0].x + state.moves[0].x),
    y:mod(state.rows)(state.snake[0].y + state.moves[0].y),
    };
const nextSnake = state => willCrash(state) ? [] : (willEat(state) ? [nextHead(state)].concat(state.snake) : [nextHead(state)].concat(dropLast(state.snake)));

//Randomness / przypadkowe
const rndPas = table => ({
    x: rnd(0)(table.cols - 1),
    y: rnd(0)(table.rows - 1)
});
//Initial state / czynnik inicjujący
const initialState = () => ({
    cols: 20,
    rows: 14,
    moves: [EAST],
    snake: [],
    apple: {x:16, y:2},
});

const next = spec({
    rows: prop('rows'),
    cols: prop('cols'),
    moves: nextMoves,
    snake: nextSnake,
    apple: nextApple
});

const enqueue = (state, move) => validMovie(move)(state)
? merge(state)({ moves: state.moves.concat([move]) })
: state;

module.exports = {EAST, NORTH, SOUTH, WEST, initialState, enqueue, next};




































// const cvs = document.getElementById("snake");
// const ctx = cvs.getContext("2d");
//
// //tworzenie przestrzeni
//
// const box = 32;
//
// // wczytaj img
//
// const ground = new Image();
// ground.src = "img/ground.png";
//
// const beerImg = new Image();
// beerImg.src = "img/beer1.png";
//
//
// // audio
//
// const dead = new Audio();
// const eat = new Audio();
// const up = new Audio();
// const left = new Audio();
// const right = new Audio();
// const down = new Audio();
//
// dead.src = "audio/dead.mp3";
// eat.src = "audio/dead.mp3";
// up.src = "audio/dead.mp3";
// left.src = "audio/dead.mp3";
// right.src = "audio/dead.mp3";
// down.src = "audio/dead.mp3";
//
// // tworzenie snejka :)
//
// let snake = [];
// snake[0] = {
//     x: 9 * box,
//     y: 10 * box
// };
//
// // tworzenie piwa
//
// let beer = {
//     x: Math.floor(Math.random() * 17 + 1) * box,
//     y: Math.floor(Math.random() * 15 + 3) * box,
// };
//
// // tworzenie punktacji
//
// let score = 0;
//
// // kontrola snejka
//
// let d;
//
// document.addEventListener("keydown", direction);
//
// function direction(event) {
//     let key = event.keyCode;
//     if (key == 37 && d != "RIGHT") {
//         left.play();
//         d = "LEFT"
//     } else if (key == 38 && d != "DOWN") {
//         up.play();
//         d = "UP"
//     } else if (key == 39 && d != "LEFT") {
//         right.play();
//         d = "RIGHT"
//     } else if (key == 40 && d != "UP") {
//         down.play();
//         d = "DOWN"
//     }
// }
//
// //funkcja kolizji / check collision function
//
// function collision(head, array) {
//     for (let i = 0; i < array.length; i++) {
//         if (head.x == array[i].x && head.y == array[i].y) {
//             return true;
//         }
//     }
//     return false;
// }
//
// // sprowadzenie wszystkiego do przestrzeni roboczej, tworzenie funkcji
//
// function draw() {
//     ctx.drawImage(ground, 0, 0);
//
//     for (let i = 0; i < snake.length; i++) {
//         ctx.fillStyle = (i == 0) ? "green" : "white";
//         ctx.fillRect = (snake[i].x, snake[i].y, box, box);
//
//         ctx.strokeStyle = "red";
//         ctx.strokeRect = (snake[i].x, snake[i].y, box, box);
//     }
//
//     ctx.drawImage(beerImg, beer.x, beer.y);
//
//     //pierwszy element snejka (old/first head position)
//
//     let snakeX = snake[0].x;
//     let snakeY = snake[0].y;
//
//
//     //dokładny kierunek
//
//     if (d == "LEFT") snakeX -= box;
//     if (d == "UP") snakeY -= box;
//     if (d == "RIGHT") snakeX += box;
//     if (d == "DOWN") snakeY += box;
//
//     //gdy snejk dorwie się do zdobyczy
//
//     if (snakeX == beer.x && snakeY == beer.y) {
//         score++;
//         eat.play();
//         beer = {
//             x: Math.floor(Math.random() * 17 + 1) * box,
//             y: Math.floor(Math.random() * 15 + 3) * box,
//         }
//         //nie pozbywamy sie ogona
//     } else {
//         //pozbycie ogona
//         snake.pop();
//     }
//
//     //dodawanie elementow snejka w trakcie gry
//
//     let newHead = {
//         x: snakeX,
//         y: snakeY
//     };
//
//     //koniec gry / Game Over
//
//     if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box
//         || snakeY > 17 * box || collision(newHead, snake)) {
//         clearInterval(game);
//         dead.play();
//     }
//
//
//     snake.unshift(newHead);
//
//     ctx.fillStyle = "white";
//     ctx.font = "45px Changa one";
//     ctx.fillText(score, 2 * box, 1.6 * box)
// }
//
// // wywołanie gry co każde 100ms
//
// let game = setInterval(draw, 100);
