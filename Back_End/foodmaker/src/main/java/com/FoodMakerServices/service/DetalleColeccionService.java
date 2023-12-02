package com.FoodMakerServices.service;

import java.util.List;

import com.FoodMakerServices.entity.DetalleColeccion;

public interface DetalleColeccionService {
	public List<DetalleColeccion> getAll();
	public List<DetalleColeccion> getbyIdcoleccion(int coleccion);
	public void deleteByIdcoleccion(int coleccion);
}
