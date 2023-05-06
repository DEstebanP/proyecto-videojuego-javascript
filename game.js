const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const up = document.getElementById('up');
const left = document.getElementById('left');
const right = document.getElementById('right');
const down = document.getElementById('down');

let canvasSize;
let elementsSize;
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
let i=0;
let giftsCounter=0;
function startGame() {
    //console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'left';

    let playerX = Math.floor(playerPos.x);
    let playerY = Math.floor(playerPos.y);
    if (i < maps.length-1) {
        if (giftPos.y== playerY && giftPos.x == playerX) {
            map=maps[i+=1]
            console.log(i);
        }
    }

    if (giftPos.y== playerY && giftPos.x == playerX) {
        giftsCounter+=1;
        if (giftsCounter == maps.length){
            console.log('Te pasaste el juego');    
        }
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
                if (!playerPos.x && !playerPos.y) {
                    playerPos.x = posX;
                    playerPos.y = posY;
                }       
            } else if (col=='I') {
                giftPos.x= Math.floor(posX);
                giftPos.y = Math.floor(posY);
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
    game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y)
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
    console.log('arriba');

    if (playerPos.y > elementsSize+1) {
        playerPos.y -= elementsSize;
        startGame();
    }
}
function playerLeft() {
    console.log('izquierda');
    
    if (playerPos.x > 1) {
        playerPos.x -= elementsSize;
        startGame();
    }
}
function playerRight() {
    console.log('derecha');
    
    if (playerPos.x < canvasSize-elementsSize-10) {
        playerPos.x += elementsSize;
        startGame();
    }
}
function playerDown() {
    console.log('abajo');
    
    if (playerPos.y < canvasSize-10) {
        playerPos.y += elementsSize;
        startGame();
    }
}
