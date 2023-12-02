package com.FoodMakerServices.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.FoodMakerServices.entity.Ingrediente;
import com.FoodMakerServices.repository.IngredienteRepository;
import com.FoodMakerServices.service.IngredienteService;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class IngredienteServiceImpl implements IngredienteService {
	IngredienteRepository repo;

	public List<Ingrediente> getAll(){
		return (List<Ingrediente>) repo.findAll();
	}

	@Override
	public List<Ingrediente> addIngredientes(List<Ingrediente> ingredientesRQ) {
		List<Ingrediente> ingredientesAñadidos = new ArrayList<>();

		for(Ingrediente i : ingredientesRQ) {
			ingredientesAñadidos.add(repo.save(i));
		}

		return ingredientesAñadidos;
	}
}
