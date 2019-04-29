package com.repository;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.dao.User;
import com.mongodb.client.result.UpdateResult;

@Component
public class CustomUserRepoImpl {

	@Autowired
	MongoTemplate mongoTemplate;
	
	public UpdateResult update(String key,Map<String,Object> inputMap) {
		
		Update update=new Update();
	
		inputMap.entrySet().forEach(e->{
			update.set(e.getKey(),e.getValue());
		});
		
		return mongoTemplate.updateFirst(new Query(Criteria.where("userName").is(key)),update,User.class);
	}
	
	public User getUser(String key) {
		List<User> userList=mongoTemplate.find(new Query(Criteria.where("userName").is(key)),User.class);
		if(CollectionUtils.isEmpty(userList))
			return null;
		return userList.stream().findFirst().get();
	}
}
