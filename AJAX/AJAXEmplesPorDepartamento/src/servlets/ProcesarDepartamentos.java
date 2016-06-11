package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.beans.Department;
import model.service.DepartamentosService;

public class ProcesarDepartamentos extends HttpServlet {
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		DepartamentosService deptService = new DepartamentosService();
		ArrayList<Department> departamentos = (ArrayList<Department>) deptService
				.getDepartments();
		resp.setContentType("text/xml");
		PrintWriter out = resp.getWriter();
		out.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		out.println("<departamentos>");
		for (Department department : departamentos) {
			out.println("<departamento>");
			out.println("<id>" + department.getDepartmentId() + "</id>");
			out.println("<nombre>" + department.getDepartmentName()
					+ "</nombre>");
			out.println("</departamento>");
		}
		out.println("</departamentos>");
	}
}
