var xmlHttp = null;
var color1 = null;
var color2 = null;
var lastId = null;
var tiempoInicio = null;
var errores;
var aciertos;
/* var segundaVez = false; */
window.onload = setTiempoInicio();
function setTiempoInicio() {
	tiempoInicio = new Date().getTime();
}
function inicio() {
	errores = 0;
	aciertos = 0;
	crearDivs();
	redimensionarDivs();
	rellenarDivColores();
}
function crearDivs() {
	for (var i = 0; i < 20; i++) {
		var div = document.createElement("div");
		div.setAttribute("id", i);
		div.setAttribute("onclick", "seleccionarColor(this);");
		document.body.appendChild(div);
	}
}
function rellenarDivColores() {
	var completado = false;
	var listaDivs = document.getElementsByTagName("DIV");
	var coloresPosibles = [ "verde", "rojo", "azul", "amarillo", "naranja" ];
	var i = 0;
	var maxVerdes = 0;
	var maxRojos = 0;
	var maxAzules = 0;
	var maxAmarillos = 0;
	var maxNaranjas = 0;
	do {
		var valido = false;
		do {
			var num = Math.floor(Math.random() * (4 + 1));
			if ((num == 0) && (maxVerdes < 4)) {
				listaDivs[i].setAttribute("class", coloresPosibles[num]);
				maxVerdes++;
				valido = true;
			} else if ((num == 1) && (maxRojos < 4)) {
				listaDivs[i].setAttribute("class", coloresPosibles[num]);
				maxRojos++;
				valido = true;
			} else if ((num == 2) && (maxAzules < 4)) {
				listaDivs[i].setAttribute("class", coloresPosibles[num]);
				maxAzules++;
				valido = true;
			} else if ((num == 3) && (maxAmarillos < 4)) {
				listaDivs[i].setAttribute("class", coloresPosibles[num]);
				maxAmarillos++;
				valido = true;
			} else if ((num == 4) && (maxNaranjas < 4)) {
				listaDivs[i].setAttribute("class", coloresPosibles[num]);
				maxNaranjas++;
				valido = true;
			}
		} while (!valido);
		i++;
		if ((maxVerdes == 4) && (maxRojos == 4) && (maxAzules == 4)
				&& (maxAmarillos == 4) && (maxNaranjas == 4)) {
			completado = true;
		}

	} while (!completado);

}
function redimensionarDivs() {
	var anchoDiv = window.innerWidth / 5;
	var altoDiv = window.innerHeight / 4;
	var listaDivs = document.getElementsByTagName("DIV");
	var colores = [ "verde", "rojo", "azul", "amarillo", "orange" ];
	for (var i = 0; i < listaDivs.length; i++) {
		listaDivs[i].style.height = (altoDiv - 1) + "px";
		listaDivs[i].style.width = (anchoDiv - 5.4) + "px";
	}
}
function seleccionarColor(e) {
	// if (color1 != null) {
	// segundaVez = true;
	// }

	if (color1 == null /* && !segundaVez */) {
		color1 = e.className;
		e.style.opacity = 0.5;
		lastId = e.id;
	} else if ((color1 != null) && (e.id != lastId) /* && segundaVez */) {
		/* segundaVez = false; */
		color2 = e.className;
		e.style.opacity = 0.5;
		comprobarColores(e);
	} else {
		alert("No vale la misma casilla Bitch!");
		color1 = null;
		e.style.opacity = 1;
	}
}

function comprobarColores(e) {
	if (color1 == color2) {
		// $(e).fadeOut("slow", function() {
		$(e).remove();
		// });
		// $("#" + lastId).fadeOut("slow", function() {
		$("#" + lastId).remove();
		// });
		lastId = null;
		aciertos++;
		if (aciertos == 10) {
			var tiempo = (new Date().getTime() - tiempoInicio) / 1000;
			var nombre = prompt("Introduce tu nombre");
			alert("Enhorabuena "+nombre+"! \nHas tardado "+tiempo+" segundos!");
			registrarTiempo(tiempo, nombre);
		}
	} else {
		alert("incorrecto");
		e.style.opacity = 1;
		$("#" + lastId).css("opacity", "1");
		errores++;
	}
	color1 = null;
	color2 = null;
}
function registrarTiempo(tiempo, nombre) {
	xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = procesarMensajeHttp;
	xmlHttp.open("GET",
			"http://localhost:8090/ColoresWebServiceSpring/setTiempo?nombre="
					+ nombre + "&tiempo=" + tiempo, true);
	xmlHttp.send(null);
}
function procesarMensajeHttp() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			var cadena = "";
			var jugadores = JSON.parse(xmlHttp.responseText);
			for (var i = 0; i < jugadores.length; i++) {
				cadena+= i+". Nombre: "+jugadores[i].nombre+"\\Tiempo: "+jugadores[i].tiempo+"\n";
			}
			alert(cadena);
		} else {

		}
	}
}

// e.setAttribute("class", "");
// document.getElementById(lastId).setAttribute("class", "");
