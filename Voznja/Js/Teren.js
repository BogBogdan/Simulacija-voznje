 var mapa = new Image();
  mapa.src='../src/mapa.png';
 c = document.getElementById("myCanvas");

  pozadina();
  function pozadina()
  {
		setInterval(function(){
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.drawImage(mapa,0,0);
		
		}, 10);
  }