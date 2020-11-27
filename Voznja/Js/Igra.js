 var mapa = new Image();
  mapa.src='../src/mapa.png';

var angle = 0;
var mouseDown = 0;
var volan = new Image();
volan.src = '../src/volan.png';
var wvolan = 225, hvolan = 225;
var kola = new Image();
kola.src = '../src/auto/'+modelauta+'.png';
var mapa = new Image();
mapa.src = '../src/mapa.png';

var ugao = 0;
var brzina = 0;
var ubrzava = false;
var usporava = false;
var x=0, y=0;

var krajige = 0;
var y = window.innerHeight/2;
var x = window.innerWidth/2;
var trans = 500;

//Kraj deklaracije

const ctx = canvas.getContext("2d");

  pozadina();
  function pozadina()
  {
		setInterval(function(){
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.drawImage(mapa,0,0);
		
		}, 10);
  }

document.onkeydown = function (e) {
	if (e.keyCode == 87) {
		ubrzava = true;
	}
	if (e.keyCode == 83) {
		usporava = true;
	}
}
document.onkeyup = function (e) {
	if (e.keyCode == 87) {
		ubrzava = false;
	}
	if (e.keyCode == 83) {
		usporava = false;
	}
}

document.onmousedown = function () {
	++mouseDown;
	const bounds = canvas.getBoundingClientRect();
	mouse.x = (e.pageX - bounds.left - scrollX)||0;
	mouse.y = (e.pageY - bounds.top - scrollY)||0;
}
document.onmouseup = function () {
	--mouseDown;
}

//create mouse event listener
const mouse = { x: 0, y: 0 };
function mouseEvents(e) {
	if (mouseDown == 1) {
		const bounds = canvas.getBoundingClientRect();
		mouse.x = e.pageX - bounds.left - scrollX;
		mouse.y = e.pageY - bounds.top - scrollY;
	}

}
function getTouchPos(canvasDom, touchEvent) {
	return {
		x: touchEvent.touches[0].clientX,
		y: touchEvent.touches[0].clientY
	};
}

document.addEventListener("mousemove", mouseEvents);
document.addEventListener("touchstart", function (e) {
	mousePos = getTouchPos(document, e);
	var touch = e.touches[0];
	var mouseEvent = new MouseEvent("mousedown", {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	document.dispatchEvent(mouseEvent);
}, false);
document.addEventListener("touchend", function (e) {
	var mouseEvent = new MouseEvent("mouseup", {});
	document.dispatchEvent(mouseEvent);
}, false);
document.addEventListener("touchmove", function (e) {
	var touch = e.touches[0];
	var mouseEvent = new MouseEvent("mousemove", {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	document.dispatchEvent(mouseEvent);
}, false);

//drawing
function drawRotated(slika, x, y, w, h, angle) {
	ctx.setTransform(1, 0, 0, 1, x, y);
	ctx.rotate(angle);
	ctx.beginPath();
	ctx.drawImage(slika, -w / 2, -h / 2, w, h);
	ctx.rotate(-angle);
}

function upd() {
	if (ubrzava) {
		brzina += 0.001;
	}
	else if (usporava) {
		brzina -= 0.001;
	}
	if (mouseDown&&Math.abs(Math.atan2(mouse.y - (window.innerHeight/2+window.innerHeight/3), mouse.x - (window.innerWidth/2+window.innerWidth/3)))<(Math.PI/2+Math.PI/3))
		angle = Math.atan2(mouse.y - (window.innerHeight/2+window.innerHeight/3), mouse.x - (window.innerWidth/2+window.innerWidth/3));


	//x-borders
	if(x>window.innerWidth/2+490)
		x = window.innerWidth/2+490;
	else if(x<window.innerWidth/2-490)
		x = window.innerWidth/2-490;
	else
		x -= brzina * Math.cos(ugao);
	
	//y-borders
	if(y>window.innerHeight/2+300)
		y = window.innerHeight/2+300;
	else if(y<window.innerHeight/2-260)
		y = window.innerHeight/2-260;
	else
		y -= brzina * Math.sin(ugao);
	ugao += angle / 200;
}
function rnd() {
	ctx.setTransform(1, 0, 0, 1, 0, 0); //reset transform
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	drawRotated(mapa, x, y, 2500,1406, 0);
	drawRotated(kola,  window.innerWidth/2,  window.innerHeight/2, 100, 50, ugao);
	drawRotated(volan, window.innerWidth/2+window.innerWidth/3, window.innerHeight/2+window.innerHeight/3, wvolan, hvolan, angle);
}
//render
function update(timer) {
	upd();
	rnd();
	//update
	requestAnimationFrame(update);
}
requestAnimationFrame(update);

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.onload = function () {
	var auto = new Image();
	auto.src = '../src/kola.png';
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");


}
