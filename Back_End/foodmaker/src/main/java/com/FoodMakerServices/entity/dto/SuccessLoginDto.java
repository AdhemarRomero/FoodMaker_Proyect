package com.FoodMakerServices.entity.dto;

import lombok.Data;

@Data
public class SuccessLoginDto {
	private String correo;
	private String nombre;
	private String token;
}
