package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.beans.Employee;
import model.service.EmployeeService;

public class ProcesarEmpleados extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		int id;
		if ((req.getParameter("id")) != null) {
			id = Integer.parseInt(req.getParameter("id"));
			EmployeeService empService = new EmployeeService();
			ArrayList<Employee> employees = (ArrayList<Employee>) empService
					.getEmployeesByDepartment(id);
			resp.setContentType("text/xml");
			PrintWriter out = resp.getWriter();
			out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
			out.println("<empleados>");
			if (employees != null) {
				for (Employee emp : employees) {
					out.println("<empleado>");
					out.println("<id>" + emp.getEmployeeId() + "</id>");
					out.println("<nombre>" + emp.getFirstName() + "</nombre>");
					out.println("<apellido>" + emp.getLastName()
							+ "</apellido>");
					out.println("</empleado>");
				}
			}
			out.println("</empleados>");
		}

	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String idEmpStr = null;
		if ((idEmpStr = req.getReader().readLine()) != null) {
			String msjEmpleado = null;
			EmployeeService empService = new EmployeeService();
			int idEmp = Integer.parseInt(idEmpStr);
			Gson gson = new Gson();
			Employee emp = empService.obtenerEmpleado(idEmp);
			resp.setContentType("application/json");
			resp.setCharacterEncoding("UTF-8");
			msjEmpleado = gson.toJson(emp);
			resp.getWriter().write(msjEmpleado);
		}
	}
}
