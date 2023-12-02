package com.FoodMakerServices.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table (name = "coleccion")
@Data
public class Coleccion {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idcoleccion;
    private String nombre;
    private int idusuario;
}
