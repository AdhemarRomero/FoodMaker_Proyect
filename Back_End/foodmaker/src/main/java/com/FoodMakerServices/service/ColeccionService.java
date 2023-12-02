package com.FoodMakerServices.service;

import java.util.List;

import com.FoodMakerServices.entity.Coleccion;
import com.FoodMakerServices.entity.dto.coleccion.ActColeccionRQ;
import com.FoodMakerServices.entity.dto.coleccion.AgregarRecetaRQ;
import com.FoodMakerServices.entity.dto.coleccion.ColeccionCargadaDto;

public interface ColeccionService {
	public List<ColeccionCargadaDto> getAll();
	public List<ColeccionCargadaDto> getByUsuario(int l);
	public void delete(int id);
	public Coleccion add(String nombre);
	public Coleccion update(ActColeccionRQ act);
	public void addReceta(AgregarRecetaRQ addreceta);
}
