const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const up = document.getElementById('up');
const left = document.getElementById('left');
const right = document.getElementById('right');
const down = document.getElementById('down');
const spanLives = document.getElementById('lives');
const spanTime = document.getElementById('time');
const spanRecord = document.getElementById('record');

let canvasSize;
let elementsSize;
let level=0;
let lives = 3;
let starTime;
let interval;



// Evento cuando todo el html ya carga completamente
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize',setCanvasSize);
window.addEventListener('keydown', playerMoveKeys);
up.addEventListener('click',playerUp);
left.addEventListener('click',playerLeft);
right.addEventListener('click',playerRight);
down.addEventListener('click',playerDown);

// Objeto con las posiciones de nuestro jugador
let playerPos = {
    x: undefined,
    y: undefined
}

let playerPosInit = {
    x: undefined,
    y: undefined
}

let giftPos = {
    x: undefined,
    y: undefined
}


let map = maps[0];

function setCanvasSize() {
    if (window.innerWidth<window.innerHeight) {
        canvasSize = window.innerWidth * 0.75
    } else {
        canvasSize = window.innerHeight * 0.75
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height',canvasSize);

    elementsSize = (canvasSize / 10)-1; //El tamaño que deberia ocupar cada emoji en nuestra grilla de 10x10
    
    playerPos.x=undefined;
    playerPos.y=undefined;
    startGame()

    // dibujar un cuadro o rectangulo en el canvas x, y, width, height
        //game.fillRect(0,0,300,100);
    // borrar un cuadro o rectangulo del canvas
        //game.clearRect(0,0,50,100);

    /* game.font = '25px Verdana';
    game.fillStyle = 'purple'; //Color del texto del cuadro (fillRect)
    game.textAlign = 'start';
    game.fillText('Holaaaa', 25, 25);
    */
}

function startGame() {
    //console.log({canvasSize, elementsSize});

    if (!localStorage.getItem("record")){
        localStorage.setItem("record", 0);
    }

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'left';
    console.log(level);
    map = maps[level];
    if (!map) {
        console.log(map);
        gameWin();
        return
    }

    if (!starTime) {
        starTime = Math.floor(Date.now() / 1000);
        interval = setInterval(showTime, 1000);

        spanRecord.innerText = localStorage.getItem("record");
    }


    //trim limpia espacios en un string
    const mapRows = map.trim().split('\n');//genera un elemento de array por cada salto de linea que encuentre
    //row es cada string del array mapRows. Con trim quito los espacios y con split me devuele cada caracter como un elemento de otro array
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    //console.log({mapRows,mapRowsCols})

    game.clearRect(0,0,(canvasSize),(canvasSize));

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex)=> {
            const emoji = emojis[col];
            let posX = elementsSize*colIndex;
            let posY = elementsSize*(rowIndex+1);
            game.fillText(emoji, posX, posY);

            if (col == 'O') {
                playerPosInit.x = posX;
                playerPosInit.y = posY;
                if (!playerPos.x && !playerPos.y) {
                    playerPos.x = posX;
                    playerPos.y = posY;
                }       
            } else if (col=='I') {
                giftPos.x= Math.floor(posX);
                giftPos.y = Math.floor(posY);
            } else if (col == 'X') { // Detectar colisones con bombas
                if (Math.floor(posX) == Math.floor(playerPos.x) && Math.floor(posY) == Math.floor(playerPos.y)) {
                    playerPos.x = playerPosInit.x;
                    playerPos.y = playerPosInit.y;
                    lives--
                    console.log(lives);
                }
            }
        })
    });

    playerMove();

    /* let positionx=0;
    for (let x=0; x<10;x++) {
        for (let y=0; y<10;y++) {
            game.fillText(emojis[mapRowsCols[y][x]],positionx, elementsSize*(y+1));
        }
        positionx+=elementsSize;
    } */
}

function playerMove() {
    levelWin();
    if (!lives) {
        starTime = undefined;
        gameOver(); 
    }
    showLives();
    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y);
}

function levelWin() {
    let playerX = Math.floor(playerPos.x);
    let playerY = Math.floor(playerPos.y);
    if (giftPos.y == playerY && giftPos.x == playerX) {
        level++
        startGame();
    }
}

function gameOver() {
        console.log('Perdiste tus tres vidas, vuelve a empezar');
        level=0;
        playerPos.x = undefined;
        playerPos.y = undefined;
        lives = 3;
        startGame();
}
function gameWin() {
    console.log('Terminaste el juego');
    clearInterval(interval);

    let isRecord = showTime() < localStorage.getItem("record");
    if (localStorage.getItem("record") == 0) {
        console.log("Primer record");
        localStorage.setItem("record", showTime())
    }
    if (isRecord) {
        console.log("Tu nuevo record es de " + showTime());
        localStorage.setItem("record", showTime())
    } else {
        console.log("Lo siento, no superaste tu record de " + localStorage.getItem("record"))
    }

}
function showLives() {
    // Array(2) crearia un array de dos posiciones
    // .fill se llena cada posicion con un emoji [1,2,3]
    /* const heartsArr = Array(lives).fill(emojis['HEART']); 
    console.log(heartsArr);
    spanLives.innerText = "";
    heartsArr.forEach(heart => spanLives.innerText += heart); */

    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime() {
    actualTime = Math.floor(Date.now() / 1000) - starTime;
    spanTime.innerText = actualTime;
    return actualTime
}
function playerMoveKeys(event) {
    const keys = {
        'up': 38,
        'right': 39,
        'left' : 37,
        'down' : 40
    }

    switch (event.keyCode) {
        case keys['up']:
            playerUp();
            break;
        case keys['right']:
            playerRight();
            break;
        case keys['left']:
            playerLeft();
            break;
        case keys['down']:
            playerDown();
            break;
        default:
            
            break;
    }
}

function playerUp() {
    if (playerPos.y > elementsSize+1) {
        playerPos.y -= elementsSize;
        startGame();
    }
}
function playerLeft() {
    if (playerPos.x > 1) {
        playerPos.x -= elementsSize;
        startGame();
    }
}
function playerRight() {
    if (playerPos.x < canvasSize-elementsSize-10) {
        playerPos.x += elementsSize;
        startGame();
    }
}
function playerDown() {
    if (playerPos.y < canvasSize-10) {
        playerPos.y += elementsSize;
        startGame();
    }
}
