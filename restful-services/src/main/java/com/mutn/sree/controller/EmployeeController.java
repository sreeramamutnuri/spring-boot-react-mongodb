package com.mutn.sree.controller;

import java.util.List;

import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mutn.sree.bean.Employee;
import com.mutn.sree.bean.MessageResolver;
import com.mutn.sree.exception.UserNotFoundException;
import com.mutn.sree.service.EmployeeService;

@RestController
public class EmployeeController {
	
	private static final Logger log = LoggerFactory.getLogger(EmployeeController.class);

	@Autowired
	private EmployeeService service;

	@Autowired
	MessageResolver messageResolver;

	@GetMapping("/v1/employees")
	public ResponseEntity<List<Employee>> getEmployees() {
		return new ResponseEntity<>(service.getEmployees(), HttpStatus.OK);
	}

	@GetMapping("/v1/employees/{id}")
	public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") String id) {
		log.debug("Path param ..." + id);
		Employee employee = service.findEmployeeById(id);

		if (employee != null) {
			return new ResponseEntity<>(employee, HttpStatus.OK);
		} else {
			throw new UserNotFoundException(id);
		}
	}

	@PostMapping("/v1/employees")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
		log.debug(" The add method...");
		return new ResponseEntity<>(service.addEmployee(employee), HttpStatus.CREATED);
	}

	@PutMapping("/v1/employees/{id}")
	public ResponseEntity<Employee> UpdateEmployee(@RequestBody Employee employee) {
		log.debug(" The update method...");
		return new ResponseEntity<>(service.updateEmployee(employee), HttpStatus.OK);
	}

	@DeleteMapping("/v1/employees/{id}")
	public ResponseEntity<List<Employee>> deleteEmployee(@PathVariable("id") String id) {
		log.debug("delete ..." + id);
		return new ResponseEntity(service.deleteEmployee(id),HttpStatus.OK);
	}

}