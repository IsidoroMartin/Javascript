package model.service;

import java.util.List;

import model.beans.Department;
import model.persistance.dao.jdbc.DepJDBCDAO;



public class DepartamentosService {
	private DepJDBCDAO dep = null;

	public DepartamentosService() {
		dep = new DepJDBCDAO();
	}
	public List<Department> getDepartments(){
		return dep.getDepartments();
	}
}
