package com.mutn.sree.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mutn.sree.bean.Employee;
import com.mutn.sree.repository.EmpRepository;

@Service
public class EmployeeService {

	public static List<Employee> list = new ArrayList<Employee>();
	public static int counter = 1;

	@Autowired
	EmpRepository empRepository;

	public List<Employee> getEmployees() {
		return empRepository.findAll();
	}

	@Transactional
	public Employee addEmployee(Employee obj) {
		return empRepository.save(obj);
	}

	public Employee findEmployeeById(String id) {
		return empRepository.findById(id).get();
	}

	@Transactional
	public Employee updateEmployee(Employee obj) {
		return empRepository.save(obj);
	}

	@Transactional
	public List<Employee> deleteEmployee(String id) {
		Optional<Employee> emp = empRepository.findById(id);
		empRepository.delete(emp.get());
		return empRepository.findAll();
	}
}
