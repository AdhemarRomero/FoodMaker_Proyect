package com.FoodMakerServices.entity.dto.coleccion;

import java.util.List;

import com.FoodMakerServices.entity.Receta;

import lombok.Data;

@Data
public class ColeccionCargadaDto {
	public String nomnre;
	public int id;
	public List<Receta> recetas;
}
