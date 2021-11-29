let canvas;
let score;
let ctx;

window.onload = function(){
    canvas = document.getElementById("canvas");
    score = document.getElementById("score").innerText;
    point = 0
    ctx = canvas.getContext("2d");

    document.addEventListener("keydown", keyDownEvent);

    //Renderiza 8 vezes por segundo
    let x = 8;
    setInterval(desenharJogo, 1000 / x);
};

//Criação da tela de jogo
let tamanhoTela = tamanhoCaminho = 20;
let nextX = nextY = 0;

//Criação da cobra
let defaultTamanhoCauda = 3;
let tamanhoCauda = defaultTamanhoCauda;
let caminhoCobra = [];
let cobraEixoX = cobraEixoY = 1;
let inicio = true
let dc = ""
//Criação da comida
let appleX = (appleY = 5);

function desenharJogo(){
    cobraEixoX += nextX;
    cobraEixoY += nextY;

    if (cobraEixoX < 0){
        cobraEixoX = tamanhoTela -1;
    }
    
    if (cobraEixoX > tamanhoTela - 1){
        cobraEixoX = 0;
    }
    
    if (cobraEixoY < 0){
        cobraEixoY = tamanhoTela -1;
    }
    
    if (cobraEixoY > tamanhoTela - 1){
        cobraEixoY = 0;
    }

    //Se a cobra comer o alimento
    if (cobraEixoX == appleX && cobraEixoY == appleY){
        tamanhoCauda++;
        point++;
        appleX = Math.floor(Math.random() * tamanhoTela);
        appleY = Math.floor(Math.random() * tamanhoTela);
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "green";
    for (let i = 0; i < caminhoCobra.length; i++){
        ctx.fillRect(
            caminhoCobra[i].x * tamanhoCaminho,
            caminhoCobra[i].y * tamanhoCaminho,
            tamanhoCaminho,
            tamanhoCaminho
        );
        if(score != point.toString()){
            document.getElementById("score").innerText = "00"+ (point.toString())
        }
        if (caminhoCobra[i].x == cobraEixoX && caminhoCobra[i].y == cobraEixoY && inicio != true){
            tamanhoCauda = defaultTamanhoCauda;
            inicio = true;
            location.reload();
        }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tamanhoCaminho, appleY * tamanhoCaminho, tamanhoCaminho, tamanhoCaminho);

    caminhoCobra.push({
        x:cobraEixoX,
        y:cobraEixoY
    });
    while (caminhoCobra.length > tamanhoCauda){
        caminhoCobra.shift();
    }
}

function keyDownEvent(event){
    // nextX e nextY representam as direções que a cobra irá percorrer
    // nos eixos X e Y, respectivamente
    switch(event.keyCode){
        case 37:
            if(dc != "R"){
                nextX = -1;
                nextY = 0;
                inicio = false;
                dc = "L";
            }
            break;
        case 38:
            if(dc != "D"){
                nextX = 0;
                nextY = -1;
                inicio = false;
                dc = "U"
            }
                break;
        case 39:
            if(dc != "L"){
                nextX = 1;
                nextY = 0;
                inicio = false;
                dc = "R";
            }
                break;
        case 40:
            if(dc != "U"){
                nextX = 0;
                nextY = 1;
                inicio = false;
                dc = "D";
            }
                break;
    }
}
