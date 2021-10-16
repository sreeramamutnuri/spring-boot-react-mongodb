package com.mutn.sree.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mutn.sree.bean.Employee;

public interface EmpRepository extends MongoRepository<Employee, String> {

}
 