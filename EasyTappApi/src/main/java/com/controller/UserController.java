package com.controller;

import java.util.Objects;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.constant.UrlConstant;
import com.dao.Response;
import com.dao.User;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.ImmutableMap;
import com.service.AccountService;
import com.service.AuthService;
import com.service.RestService;
import com.service.UserService;
import com.util.JsonConverter;
import com.util.JwtTokenCreator;

@RestController
@CrossOrigin
public class UserController {

	@Autowired
	AuthService authService;

	@Autowired
	UserService userService;

	@RequestMapping(path = "/signin", method = RequestMethod.POST)
	public ResponseEntity<Response> signInAction(@RequestBody String json) {

		User user = authService.performValidation(json);
		if (user == null)
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		String token = JwtTokenCreator.generateToken(JsonConverter.objToJsonConverter(user));
		Response response = new Response();
		response.setToken(token);
		response.setIsAccountVerified(user.isAccountVerified());
		return new ResponseEntity<>(response, HttpStatus.CREATED);

	}

	@RequestMapping(path = "/signup", method = RequestMethod.POST)
	public ResponseEntity<Response> signUpAction(@RequestBody String json) {
		JsonNode jsonNode = JsonConverter.getJsonNode(json);
		String userName = jsonNode.get("userName").textValue();
		String password = jsonNode.get("password").textValue();

		User user = authService.addUser(userName, password);
		if (Objects.isNull(user)) {
			Response response = new Response();
			response.setMessage("User already present");
			return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
		}
		String token = JwtTokenCreator.generateToken(JsonConverter.objToJsonConverter(user));
		Response response = new Response();
		response.setToken(token);
		RestService.hitRestUrlForvCode(userName, user.getvCode(), UrlConstant.VERIFY_ACCOUNT);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@RequestMapping(path = "/sendvCode", method = RequestMethod.POST)
	public ResponseEntity<Response> sendvCode(@RequestBody String json) {
		System.out.println("in sendVCode");
		JsonNode jsonNode = JsonConverter.getJsonNode(json);
		String userName = jsonNode.get("userName").textValue();

		String vCode = AccountService.generatevCode();
		System.out.println("newly generated vCode:" + vCode);
		Response response = new Response();
		response.setMessage("verification code sent");
		RestService.hitRestUrlForvCode(userName, vCode, UrlConstant.VERIFY_ACCOUNT);
		authService.updatevCode(userName, vCode);
		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@RequestMapping(path = "/deleteUser/{userName}")
	public String deleteUser(@PathVariable String userName) {
		if (authService.deleteUser(userName))
			return String.format("User: %s deleted successfully.", userName);
		return String.format("No such user: %s found", userName);
	}

	@RequestMapping(path = "/changePassword", method = RequestMethod.POST)
	public ResponseEntity<Response> updateUserPassword(@RequestBody String json) {
		JsonNode jsonNode = JsonConverter.getJsonNode(json);
		String userName = jsonNode.get("userName").textValue();
		String password = jsonNode.get("password").textValue();
		String currentPassword = jsonNode.get("currentPassword").textValue();
		Response response = new Response();
		if (authService.updatePassword(userName, currentPassword, password)) {
			response.setMessage("Password updated successfully.");
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		}
		response.setMessage("Invalid current password!");
		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@RequestMapping(path = "/resetPassword", method = RequestMethod.POST)
	public ResponseEntity<Response> resetUserPassword(@RequestBody String json) {
		JsonNode jsonNode = JsonConverter.getJsonNode(json);
		String userName = jsonNode.get("userName").textValue();
		String password = jsonNode.get("password").textValue();
		Response response = new Response();
		if (authService.resetPassword(userName, password)) {
			// System.out.println("password reset successfully!");
			String vCode = AccountService.generatevCode();
			// vCode is updated so as to generate new token every time.
			userService.updateUser(userName, ImmutableMap.of("vCode", vCode));
			response.setMessage("Password updated successfully.");
			// System.out.println("sending response back...");
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		}
		response.setMessage("Invalid user name!");
		return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
	}

	@RequestMapping(path = "/verifyAccount", method = RequestMethod.POST)
	public Boolean verifyAccount(@RequestBody String json) {
		JsonNode jsonNode = JsonConverter.getJsonNode(json);
		String userName = jsonNode.get("userName").textValue();
		String vCode = jsonNode.get("vCode").textValue();
		User user = authService.getUser(userName);
		if (AccountService.verifyAccount(user, vCode)) {
			authService.updateIsAccountVerified(userName, Boolean.TRUE);
			return Boolean.TRUE;
		}

		return Boolean.FALSE;
	}

	@CrossOrigin(origins = { "http://theindependentdeveloper.com", "http://139.59.59.19:3001",
			"http://139.59.59.19:3001/initForgotPwdLink" })
	@RequestMapping(path = "/initForgotPwdLink", method = RequestMethod.POST)
	public String initForgotPwdLink(@RequestBody String json) {
		JsonNode jsonNode = JsonConverter.getJsonNode(json);
		String userName = jsonNode.get("userName").textValue();
		Response response = new Response();

		if (Objects.isNull(userService.getUser(userName))) {
			response.setMessage("No userName present with this email id:" + userName);
			return null;
		}
		String vCode = AccountService.generatevCode();
		// vCode is updated so as to generate new token every time.
		userService.updateUser(userName, ImmutableMap.of("vCode", vCode));
		String token = userService.generateForgotPwdToken(userName);
		if (StringUtils.isNotBlank(token)) {
			RestService.hitRestUrlForToken(userName, token, UrlConstant.SEND_FORGOT_PWD_MAIL);
			return "SUCCESS";
		}
		return null;
	}

	@RequestMapping(path = "/forgotpwd/{token}", method = RequestMethod.GET)
	public ResponseEntity<Response> verifyForgotPwd(@PathVariable("token") String token) {
		System.out.println("token:" + token);
		String userJson = JwtTokenCreator.validateToken(token);
		User user;
		if (StringUtils.isNotBlank(userJson)) {
			user = (User) JsonConverter.jsonToObjConverter(userJson, User.class);
			Response response = new Response();
			response.setMessage(user.getUserName());
			String vCode = AccountService.generatevCode();
			// vCode is updated so as to generate new token every time.
			userService.updateUser(user.getUserName(), ImmutableMap.of("vCode", vCode));
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		}
		return null;
	}
}
