package com.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.dao.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.ImmutableMap;
import com.util.JsonConverter;

@Component
public class AuthService {

	@Autowired
	UserService userService;

	public User getUser(final String userName) {
		return userService.getUser(userName);
	}

	public User addUser(final String userName, final String password) {

		String vCode = AccountService.generatevCode();
		System.out.println("generated vCode:" + vCode);
		User user = new User(userName, password, null, Boolean.FALSE, vCode, LocalDateTime.now());

		User insertedUser = userService.insertUser(user);
		return (Objects.nonNull(insertedUser)) ? insertedUser : null;

		/*
		 * if(userMap.containsKey(userName)) return null; String
		 * vCode=AccountService.generatevCode();
		 * System.out.println("generated vCode:"+vCode); User user=new
		 * User(userName,password,null,Boolean.FALSE,vCode,LocalDateTime.now());
		 * userMap.put(userName,user); return user;
		 */
	}

	public boolean validateUser(final String userName, final String password) {
		User user = userService.getUser(userName);
		if (Objects.isNull(user))
			return Boolean.FALSE;

		String dbPassword = user.getPassword();
		if (dbPassword == null || password == null)
			return Boolean.FALSE;
		return password.equals(dbPassword);
	}

	public boolean deleteUser(final String userName) {
		User user = userService.getUser(userName);
		return userService.deleterUser(user);
	}

	public boolean updatePassword(final String userName, final String currentPassword, final String password) {

		if (this.validateUser(userName, currentPassword)) {
			return userService.updateUser(userName, ImmutableMap.of("password", password));
		}
		return Boolean.FALSE;
	}

	public boolean resetPassword(final String userName, final String password) {
		return userService.updateUser(userName, ImmutableMap.of("password", password));
	}

	public boolean updatevCode(final String userName, final String vCode) {

		User user = userService.getUser(userName);

		if (Objects.nonNull(user)) {
			return userService.updateUser(userName, ImmutableMap.of("vCode", vCode, "vCodeValidTs", LocalDate.now()));
		}
		return Boolean.FALSE;
	}

	public boolean updateIsAccountVerified(final String userName, final Boolean isAccountVerified) {

		User user = userService.getUser(userName);

		if (Objects.nonNull(user)) {
			return userService.updateUser(userName, ImmutableMap.of("isAccountVerified", isAccountVerified));
		}
		return Boolean.FALSE;
	}

	public User performValidation(String json) {
		JsonNode jsonNode = JsonConverter.getJsonNode(json);
		String userName = jsonNode.get("userName").textValue();
		String password = jsonNode.get("password").textValue();
		if (this.validateUser(userName, password)) {
			return userService.getUser(userName);
		}

		return null;
	}

}
