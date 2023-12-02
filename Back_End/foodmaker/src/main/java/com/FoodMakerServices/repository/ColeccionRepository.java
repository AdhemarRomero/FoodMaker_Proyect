package com.FoodMakerServices.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.FoodMakerServices.entity.Coleccion;

public interface ColeccionRepository extends CrudRepository<Coleccion, String> {
	Optional<List<Coleccion>> findByIdusuario(int idusuario);
}
