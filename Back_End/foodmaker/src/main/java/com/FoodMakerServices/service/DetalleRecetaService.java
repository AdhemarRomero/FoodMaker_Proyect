package com.FoodMakerServices.service;

import java.util.List;

import com.FoodMakerServices.entity.DetalleReceta;
import com.FoodMakerServices.entity.dto.receta.RecetaCompleta;

public interface DetalleRecetaService {
	public List<DetalleReceta> getAll();
	public void addDetalleReceta(RecetaCompleta recetaCompleta);
	public void deleteDetalleReceta(int idReceta);
}