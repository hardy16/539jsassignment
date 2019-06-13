var canvas = document.getElementById("draw");

var ctx = canvas.getContext("2d");
resizeCanvas();

function resizeCanvas() {
    ctx.canvas.width = window.innerWidth * 0.8; 
    ctx.canvas.height = window.innerHeight * 0.8; //I tried using 80% in the css by using width 80% but it was a problem with mouse position. Hence the canvas is adjusted in JS instead of CSS. 
}



function colorPicker() {
    var x = document.getElementById("myColor");
    var currentVal = x.value;
    activeColor = x.value;
}

function clearScreen() {
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height );
}


window.addEventListener("resize", resizeCanvas);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

//For mobile
document.addEventListener("touchstart", setPosition);
document.addEventListener("touchmove", draw);


var positionLast = { x: 0, y: 0 };

var activeColor = "#ff0000"; // Default Color RED
var penDown = true; //flag to make sure draw() runs on right press


document.onkeypress = function (e) {
    e = e || window.event;
    activeColor = keyPressed(e); //active color changed 
};


document.onkeydown = function (e) { //Arrow keys are only detected by onkeydown
    var iKeyCode = e.keyCode;
    if (iKeyCode == 38) { //UP arrow
        penDown = false;
    } else if (iKeyCode == 40) { //DOWN arrow
        penDown = true;
        setPosition(e);
    }
};

function keyPressed(key_pressed){
    var keyPressedcode = key_pressed.charCode || key_pressed.keyCode; 

    if (keyPressedcode == 114 || keyPressedcode == 82){
        return '#ff0000 ';
    }
    else if (keyPressedcode == 66 || keyPressedcode == 98){ //IMP: 'B' and 'b' have different charCodes hence 2 values
        return '#0000ff';
    }
    else if (keyPressedcode == 103 || keyPressedcode == 71){ //green
        return '#00ff00';
    }
    else if (keyPressedcode == 121 || keyPressedcode == 89){ //yellow
        return '#ffff00';
    }
    else if (keyPressedcode == 32){//space
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height );
        console.log('space pressed');
    }

//    else if (keyPressedcode == 38){
//        penDown = false;
//    }
//    else if (keyPressedcode == 40){
//        penDown = true;
//        setPosition(e);
//    }

}


function setPosition(e) {
    var rect = canvas.getBoundingClientRect();
    clientX = e.clientX;
    clientY = e.clientY;
    if(e.type.includes('touch')){
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }
    //positionLast.x = e.clientX - rect.left;
    //positionLast.y = e.clientY - rect.top;

    positionLast.x = clientX - rect.left;
    positionLast.y = clientY - rect.top;
}

ctx.strokeStyle = '#ff0000';

function draw(e) {
   
    if (penDown) {
        ctx.beginPath(); 


        ctx.lineWidth = 30; 

        ctx.lineCap = "square"; 

        ctx.strokeStyle = activeColor;

        ctx.moveTo(positionLast.x, positionLast.y);
        setPosition(e);
        ctx.lineTo(positionLast.x, positionLast.y); 
        ctx.stroke();
        ctx.closePath();
    }
}
