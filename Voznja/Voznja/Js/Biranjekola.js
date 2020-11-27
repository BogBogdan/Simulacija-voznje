
var levaslika=document.getElementById("id_levo");
var desnaslika=document.getElementById("id_desno");
var slikaauta=document.getElementById("id_auta");
var dugme=document.getElementById("id_dugmeta");
var modelauta=8;//neko radnom auto od koga pocinje

var c = document.getElementById("canvas");
var scriptTag = document.createElement('script');

sakrikanvas();
function sakrikanvas()
{
	c.style.visibility = "hidden";
}

levaslika.onclick=function()
{
	if(modelauta>1)
			modelauta--;
	else
		modelauta=9;   //poslednji auto
	renderslike();
}

desnaslika.onclick=function()
{
		if(modelauta<9)
			modelauta++;
	else
		modelauta=1;   //prvi auto
	renderslike();
}

function renderslike()
{
	slikaauta.src='../src/auto/'+modelauta+'.png';
}

function pocni()
{
	console.log("NESTO");
	levaslika.style.visibility = "hidden";
	desnaslika.style.visibility = "hidden";
	slikaauta.style.visibility = "hidden";
		dugme.style.visibility = "hidden";

		c.style.visibility = "visible";
	scriptTag.setAttribute('src','../Js/Igra.js');
	document.head.appendChild(scriptTag);
	scriptTag.async = true;
}