package com.FoodMakerServices.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "receta")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Receta {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idreceta;
	private String nombre;
	private String descripcion;
	private String descripcioncorta;
	private String instrucciones;
	private int tiempopreparacion;
	private int idcategoria;
	private byte[] imagen;

	@ManyToOne
	@JoinColumn(name="idcategoria",insertable = false,updatable = false)
	private Categoria objCategoria;
}
