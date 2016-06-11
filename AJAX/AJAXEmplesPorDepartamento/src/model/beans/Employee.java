package model.beans;

import java.io.Serializable;



/**
 * The persistent class for the EMPLOYEES database table.
 * 
 */

public class Employee implements Serializable {
	private static final long serialVersionUID = 1L;

	private int employeeId;

	private int departmentId;

	private String firstName;

	private String lastName;

	private int salary;

	public Employee() {
	}
	

	public Employee(int employeeId, int departmentId, String firstName, String lastName, int salary) {
		super();
		this.employeeId = employeeId;
		this.departmentId = departmentId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.salary = salary;
	}


	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return "Nombre empleado = " + this.firstName + " ID = "
				+ this.employeeId;
	}

}