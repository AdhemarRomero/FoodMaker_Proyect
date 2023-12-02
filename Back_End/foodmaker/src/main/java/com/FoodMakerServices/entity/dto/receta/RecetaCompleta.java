package com.FoodMakerServices.entity.dto.receta;

import java.util.List;

import com.FoodMakerServices.entity.Ingrediente;
import com.FoodMakerServices.entity.Receta;

import lombok.Data;

@Data
public class RecetaCompleta {
	private Receta receta;
	private List<Ingrediente> ingredientes;
	private int cantidadCoincidencias;
}
