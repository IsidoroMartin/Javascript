package model.beans;

public class Jugador implements Comparable {
	private String nombre;
	private Double tiempo;

	public Jugador(String nombre, double tiempo) {
		this.nombre = nombre;
		this.tiempo = tiempo;
	}

	public Jugador() {

	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Double getTiempo() {
		return tiempo;
	}

	public void setTiempo(Double tiempo) {
		this.tiempo = tiempo;
	}

	@Override
	public int compareTo(Object o) {

		return tiempo.compareTo(((Jugador) o).getTiempo());
	}

}
