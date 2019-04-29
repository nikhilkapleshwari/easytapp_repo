package com.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {

	@RequestMapping(path = "/hello")
	public String sayHello() {
		return "Hello World!";
	}
}
