package com.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dao.Counter;

public interface CounterRepository extends MongoRepository<Counter,String>{

}
