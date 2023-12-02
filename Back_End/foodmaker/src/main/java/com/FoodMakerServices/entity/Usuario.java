package com.FoodMakerServices.entity;


import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "usuario")
@Data
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idusuario;
	private String nombre;
	private String contrasenia;
	private String correo;
}
