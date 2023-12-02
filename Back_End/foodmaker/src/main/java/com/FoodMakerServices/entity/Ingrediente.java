package com.FoodMakerServices.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "ingrediente")
@Data
public class Ingrediente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idingrediente;
	private String nombre;
	private String descripcion;
	private int cantidad;
}
