package com.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dao.User;

public interface UserRepository extends MongoRepository<User,String>{

	User findByUserName(String userName);
	
	
}
