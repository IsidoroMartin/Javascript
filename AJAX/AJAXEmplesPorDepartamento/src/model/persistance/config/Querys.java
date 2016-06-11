package model.persistance.config;

public class Querys {
	public static final String GETEMPLOYEEBYID = "Select * from Employees where Employee_id=";
	public static final String GETEMPLOYEESBYDEPTID = "Select * from Employees where department_id=";
	public static String construirGetEmployeeByDepartmentName(String name){
		return "Select * from Employees where department_id=(select department_id from departments where upper(department_name)='"+name.toUpperCase()+"')";
	}
}
