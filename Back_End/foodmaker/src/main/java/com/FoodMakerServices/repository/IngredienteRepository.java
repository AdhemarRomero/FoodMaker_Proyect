package com.FoodMakerServices.repository;

import org.springframework.data.repository.CrudRepository;

import com.FoodMakerServices.entity.Ingrediente;

public interface IngredienteRepository extends CrudRepository<Ingrediente, String> {

}
