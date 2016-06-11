package resources;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import model.beans.Jugador;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class JugadorResource {
	private List<Jugador> jugadores = null;
	public JugadorResource() {
		jugadores = new ArrayList<Jugador>();
	}
	@RequestMapping(path="setTiempo",produces="application/json")
	@ResponseBody
	public ResponseEntity<List> setTiempo(@ModelAttribute Jugador jugador){
		jugadores.add(jugador);
		Collections.sort(jugadores);
		return new ResponseEntity(jugadores,HttpStatus.OK);
	}
}
