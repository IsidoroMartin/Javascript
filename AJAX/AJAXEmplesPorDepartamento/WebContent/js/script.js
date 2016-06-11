var xmlHttp = new XMLHttpRequest();
window.onload = obtenerDepartamentos();
function obtenerEmpleados() {
	xmlHttp.onreadystatechange = procesarMensajeHttp;
	xmlHttp.open("GET", "ProcesarEmpleados", true);
}
function obtenerDepartamentos() {
	xmlHttp.onreadystatechange = procesarMensajeHttp;
	xmlHttp.open("GET", "ProcesarDepartamentos", true);
	xmlHttp.send(null);
}
function obtenerEmpleados() {
	var div_detalles_empleado = document.getElementById("detallesTrabajador");
	div_detalles_empleado.innerHTML = "";
	var departamentos = document.getElementById("departamentos");
	var departamento = departamentos[departamentos.selectedIndex].value;
	xmlHttp.onreadystatechange = procesarMensajeHttp;
	xmlHttp.open("GET", "ProcesarEmpleados?id=" + departamento, true);
	xmlHttp.send(null);
}
// Funcion encargarda de procesar mensajes http relacionados con los departamentos y los empleados
function procesarMensajeHttp() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			var listaDepartamentos = xmlHttp.responseXML
					.getElementsByTagName("departamento");
			var listaEmpleados = xmlHttp.responseXML
					.getElementsByTagName("empleado");
			if (listaDepartamentos.length > 0) {
				procesarDepartamentos(listaDepartamentos);
			}
			if (listaEmpleados.length > 0) {
				procesarEmpleados(listaEmpleados);
			}
			if (listaEmpleados.length == 0) {
				var departamentos = document.getElementById("departamentos");
				if (departamentos.selectedIndex != 0) {
					var departamento = departamentos[departamentos.selectedIndex].value;
					document.getElementById("trabajadores").innerHTML = "<h1> No existen empleados en el departamento "
							+ departamento + "</h1>";
				}
			}
		} else {
			alert("Ha ocurrido un error");
		}
	}
}
function procesarDepartamentos(listaDepartamentos) {
	var departamentosSelect = document.getElementById("departamentos");
	nDepartamentos = listaDepartamentos.length;
	var nomDepartamento = null;
	var depId = null;
	// for (var i = 0; i < nDepartamentos; i++) {
	// departamentosSelect.remove(0);
	// }
	departamentosSelect[0] = new Option("Debe seleccionar un departamento");
	for (var i = 0; i < nDepartamentos; i++) {
		nomDepartamento = listaDepartamentos[i].getElementsByTagName("nombre")[0].childNodes[0].data;
		depId = listaDepartamentos[i].getElementsByTagName("id")[0].childNodes[0].data;
		o = new Option(nomDepartamento, depId);
		departamentosSelect.options[i + 1] = o;
	}
}

function procesarEmpleados(listaEmpleados) {
	var divEmpleados = document.getElementById("trabajadores");
	divEmpleados.innerHTML = "";
	var tablaTrabajadores = document.createElement("table");
	tablaTrabajadores.setAttribute("id", "tEmpleados");
	var row = document.createElement("tr");
	tablaTrabajadores.appendChild(row);
	var nombreTH = document.createElement("th");
	var nombreTXT = document.createTextNode("Nombre");
	var idTH = document.createElement("th");
	var idTXT = document.createTextNode("ID");
	idTH.appendChild(idTXT);
	nombreTH.appendChild(nombreTXT);
	row.appendChild(idTH);
	row.appendChild(nombreTH);
	tablaTrabajadores.appendChild(row);
	for (var i = 0; i < listaEmpleados.length; i++) {
		row = document.createElement("tr");
		var tdNombre = document.createElement("td");
		var tdID = document.createElement("td");
		var txtTDID = document.createTextNode(listaEmpleados[i]
				.getElementsByTagName("id")[0].childNodes[0].data);
		var txtTDNombre = document.createTextNode(listaEmpleados[i]
				.getElementsByTagName("nombre")[0].childNodes[0].data);
		tdNombre.appendChild(txtTDNombre);

		tdID.appendChild(txtTDID);
		row.appendChild(tdID);
		row.appendChild(tdNombre);
		row.setAttribute("onclick", "getDetalleEmp(this);")
		row
				.setAttribute("id", listaEmpleados[i]
						.getElementsByTagName("id")[0].childNodes[0].data);
		tablaTrabajadores.appendChild(row);
	}
	divEmpleados.appendChild(tablaTrabajadores);
}

function getDetalleEmp(e) {
	// alert(e.id);
	xmlHttp.onreadystatechange = procesarRespDetalles;
	xmlHttp.open("POST", "ProcesarEmpleados", true);
	xmlHttp.send(e.id);
}
function procesarRespDetalles() {
	if (xmlHttp.readyState == 4) {
		if (xmlHttp.status == 200) {
			var div_detalles_empleado = document
					.getElementById("detallesTrabajador");
			var empleado = JSON.parse(xmlHttp.responseText);
			div_detalles_empleado.innerHTML = "ID de empleado: "
					+ empleado.employeeId + ", Nombre: " + empleado.firstName
					+ " " + empleado.lastName + ", Department ID: "
					+ empleado.departmentId + ", Salario: " + empleado.salary;
		} else {
			alert("Ha habido algún error: " + xmlHttp.statusText);
		}
	}
}
