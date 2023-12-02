package com.FoodMakerServices.service;

import java.util.List;

import com.FoodMakerServices.entity.Ingrediente;

public interface IngredienteService {
	public List<Ingrediente> getAll();
	public List<Ingrediente> addIngredientes(List<Ingrediente> ingredientesRQ);
}