package com.FoodMakerServices.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.FoodMakerServices.entity.Categoria;
import com.FoodMakerServices.security.JWTAuthorizationFilter;
import com.FoodMakerServices.security.UserDetailsServiceImplJwt;
import com.FoodMakerServices.service.CategoriaService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class CategoriaController {

	CategoriaService categoriaService;
	
	@GetMapping("/categorias")
	public List<Categoria> allCategorias(){
		return categoriaService.getAll();
	}
}
	