const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;
// Evento cuando todo el html ya carga completamente
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize',setCanvasSize);

function setCanvasSize() {
    if (window.innerWidth<window.innerHeight) {
        canvasSize = window.innerWidth * 0.75
    } else {
        canvasSize = window.innerHeight * 0.75
    }
    
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height',canvasSize);

    elementsSize = (canvasSize / 10)-1; //El tamaño que deberia ocupar cada emoji en nuestra grilla de 10x10
    
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
    console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'start';

    const map = maps[0];
    //trim limpia espacios en un string
    const mapRows = map.trim().split('\n');//genera un elemento de array por cada salto de linea que encuentre
    //row es cada string del array mapRows. Con trim quito los espacios y con split me devuele cada caracter como un elemento de otro array
    const mapRowsCols = mapRows.map(row => row.trim().split(''));
    console.log({mapRows,mapRowsCols})

    mapRowsCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex)=> {
            const emoji = emojis[col];
            let posX = elementsSize*colIndex;
            let posY = elementsSize*(rowIndex+1);
            game.fillText(emoji, posX, posY);
        })
    });

    /* let positionx=0;
    for (let x=0; x<10;x++) {
        for (let y=0; y<10;y++) {
            game.fillText(emojis[mapRowsCols[y][x]],positionx, elementsSize*(y+1));
        }
        positionx+=elementsSize;
    } */
}