package com.FoodMakerServices.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebApp {
	
	@GetMapping("/")
	public String GetHome() {
		return "Hola Mundo";
	}
}
