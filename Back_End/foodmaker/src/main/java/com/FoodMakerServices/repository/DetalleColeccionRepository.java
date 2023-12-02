package com.FoodMakerServices.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.FoodMakerServices.entity.DetalleColeccion;

public interface DetalleColeccionRepository extends CrudRepository<DetalleColeccion, String> {
	List<DetalleColeccion> findByIdcoleccion(int Idcoleccion);
}
