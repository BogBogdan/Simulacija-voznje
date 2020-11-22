var angle = 0;
var mouseDown = 0;
var volan = new Image();
volan.src = '../src/volan.png';
var wvolan = 225, hvolan = 225;
var kola = new Image();
kola.src = '../src/auto8.png';
var mapa = new Image();
mapa.src = '../src/mapa.png';

var ugao = 0;
var brzina = 0;
var ubrzava = false;
var usporava = false;
var x=0, y=0;

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



var c = document.getElementById("canvas");
document.onmousedown = function () {
	++mouseDown;
	const bounds = canvas.getBoundingClientRect();
	mouse.x = (e.pageX - bounds.left - scrollX)||0;
	mouse.y = (e.pageY - bounds.top - scrollY)||0;
}
document.onmouseup = function () {
	--mouseDown;
}

const ctx = canvas.getContext("2d");
// create mouse event listener
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
// Get the position of a touch relative to the canvas
// draw design at x,y and rotated by angle
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

	x += brzina * Math.cos(ugao);
	y += brzina * Math.sin(ugao);
	ugao += angle / 200;
}
function rnd() {
	ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
	ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
	drawRotated(mapa, window.innerWidth/2, window.innerHeight/2, window.innerWidth, window.innerHeight, 0);
	drawRotated(kola, x, y, 100, 50, ugao);
	drawRotated(volan, window.innerWidth/2+window.innerWidth/3, window.innerHeight/2+window.innerHeight/3, wvolan, hvolan, angle);
}
// render loop called 60 times a second
function update(timer) {
	upd();
	rnd();
	// get angle from center to mouse
	// draw rotated design
	requestAnimationFrame(update);
}
requestAnimationFrame(update);

