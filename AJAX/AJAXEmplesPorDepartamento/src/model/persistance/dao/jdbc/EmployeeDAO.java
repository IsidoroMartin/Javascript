package model.persistance.dao.jdbc;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import static model.persistance.config.Querys.*;
import model.beans.Employee;

public class EmployeeDAO {
	Pool gbbdd = null;

	public EmployeeDAO() {
		gbbdd = Pool.getInstance();
	}

	public Employee obtenerEmpleado(int id) {
		Connection conn = null;
		Employee e = null;
		Statement st = null;
		ResultSet rs = null;
		try {
			conn = gbbdd.getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(GETEMPLOYEEBYID + id);
			if (rs.next()) {
				e = new Employee(rs.getInt("employee_id"),
						rs.getInt("department_id"), rs.getString("first_name"),
						rs.getString("last_name"), rs.getInt("salary"));
			}
		} catch (Exception ex) {

		} finally {
			gbbdd.liberarRecursos(conn, st);
		}
		return e;
	}

	public List<Employee> obtenerEmpleadosByDepartment(int id) {
		ArrayList<Employee> empleados = null;
		boolean contieneRegistros = false;
		Connection conn = null;
		Employee e = null;
		Statement st = null;
		ResultSet rs = null;
		try {
			conn = gbbdd.getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(GETEMPLOYEESBYDEPTID + id);
			if (contieneRegistros = rs.next()) {
				empleados = new ArrayList<Employee>();
				do {

					e = new Employee(rs.getInt("employee_id"),
							rs.getInt("department_id"),
							rs.getString("first_name"),
							rs.getString("last_name"), rs.getInt("salary"));
					empleados.add(e);

				} while (rs.next());
			}

		} catch (Exception ex) {

		} finally {
			gbbdd.liberarRecursos(conn, st);
		}
		return empleados;
	}

	public List<Employee> obtenerEmpleadosByDepartment(String nombre) {
		ArrayList<Employee> empleados = null;
		boolean contieneRegistros = false;
		Connection conn = null;
		Employee e = null;
		Statement st = null;
		ResultSet rs = null;
		try {
			conn = gbbdd.getConnection();
			st = conn.createStatement();
			rs = st.executeQuery(construirGetEmployeeByDepartmentName(nombre));
			if (contieneRegistros = rs.next()) {
				empleados = new ArrayList<Employee>();
				do {

					e = new Employee(rs.getInt("employee_id"),
							rs.getInt("department_id"),
							rs.getString("first_name"),
							rs.getString("last_name"), rs.getInt("salary"));
					empleados.add(e);

				} while (rs.next());
			}
		} catch (Exception ex) {

		} finally {
			gbbdd.liberarRecursos(conn, st);
		}
		return empleados;
	}
}
