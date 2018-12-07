var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth-22;
canvas.height = window.innerHeight-22;

var width = innerWidth;
var height = innerHeight;

var w = 100;
var h = 100;

var x = 200;
var y = 200;

var dx = 3;
var dy = 3;

var can = canvas.getContext('2d');

var c = Math.sqrt(w*w + h*h);

function update(){
   requestAnimationFrame(update);
   can.clearRect(0, 0, width, height);

   can.fillStyle = 'rgba(0, 255, 0, 0.5)';
   can.fillRect(x-w/2, y-h/2, w, h);

   // Move
   x += dx;
   y += dy;

   can.beginPath();
   can.arc(x, y, c/2, 0, Math.PI * 2, false);
   can.strokeStyle = 'red';
   can.stroke();
   // can.closePath();
}

update();

console.log(x);