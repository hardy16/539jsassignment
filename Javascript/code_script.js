// set canvas id to variable
var canvas = document.getElementById("draw");

// get canvas 2D context and set it to the correct size
var ctx = canvas.getContext("2d");
resize();

// resize canvas when window is resized
function resize() {
    ctx.canvas.width = window.innerWidth * 0.8;
    ctx.canvas.height = window.innerHeight * 0.8;
}



//
//function colorPicker() {
//    var x = document.createElement("INPUT");
//    x.setAttribute("type", "color");
//    x.setAttribute("value","");
//    document.body.appendChild(x);
//    console.log(x);
//}



function colorPicker() {
    var x = document.getElementById("myColor");
    var currentVal = x.value;
    activeColor = x.value;
}



// add event listeners to specify when functions should be triggered
window.addEventListener("resize", resize);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);


document.addEventListener("touchstart", setPosition);
document.addEventListener("touchmove", draw);


// last known position
var pos = { x: 0, y: 0 };

var activeColor = "#ff0000"; // Default Color RED
var penDown = true;

//this function will be called every time a key is pressed
document.onkeypress = function (e) {
    e = e || window.event;
    activeColor = keyPressed(e); //active color is changed so next time draw() is called, it will use whichever is the current active color
};


//Arrow keys are only detected by onkeydown
document.onkeydown = function (e) {
    var iKeyCode = e.keyCode;
    if (iKeyCode == 38) {
        //UP arrow
        penDown = false;
    } else if (iKeyCode == 40) {
        //DOWN arrow
        penDown = true;
		setPosition(e);
    }
};
//NOTE: this function could be combined for the other keys. However in that case
// charCode was required, in this case keyCode is required hence kept it separate for now.

function keyPressed(key_pressed){
    var keyPressedcode = key_pressed.charCode || key_pressed.keyCode; //NOTE: I read that keyCode is less reliable so te change kela for the time being



    if (keyPressedcode == 114 || keyPressedcode == 82){
        return '#ff0000 ';
    }
    else if (keyPressedcode == 66 || keyPressedcode == 98){ //IMP: 'B' and 'b' have different charCodes so made this change
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

}

// new position from mouse events
function setPosition(e) {
	var rect = canvas.getBoundingClientRect();
	clientX = e.clientX;
	clientY = e.clientY;
	if(e.type.includes('touch')){
		clientX = e.touches[0].clientX;
		clientY = e.touches[0].clientY;
	}
    //pos.x = e.clientX - rect.left;
    //pos.y = e.clientY - rect.top;
	
    pos.x = clientX - rect.left;
    pos.y = clientY - rect.top;
}

ctx.strokeStyle = '#ff0000';

function draw(e) {
    //    if (e.buttons !== 1) return; // if mouse is pressed.....
	if (penDown) {
        ctx.beginPath(); // begin the drawing path


        ctx.lineWidth = 30; // width of line

        ctx.lineCap = "square"; // rounded end cap

        ctx.strokeStyle = activeColor;

        ctx.moveTo(pos.x, pos.y); // from position
        setPosition(e);
        ctx.lineTo(pos.x, pos.y); // to position
        ctx.stroke(); // draw it!
        ctx.closePath();
    }
}
