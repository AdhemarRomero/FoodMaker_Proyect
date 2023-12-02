package com.FoodMakerServices.entity.dto.receta;

import java.util.List;

import com.FoodMakerServices.entity.Ingrediente;

public class AvailableRS {
	private int orden;
	private int duracion;
	private String nombre;
	private String descripcioncorta;
	private List<Ingrediente> ingredientes;
	private byte[] imagen;
	
	
	public int getOrden() {
		return orden;
	}
	public void setOrden(int orden) {
		this.orden = orden;
	}
	public int getDuracion() {
		return duracion;
	}
	public void setDuracion(int duracion) {
		this.duracion = duracion;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDescripcioncorta() {
		return descripcioncorta;
	}
	public void setDescripcioncorta(String descripcioncorta) {
		this.descripcioncorta = descripcioncorta;
	}
	public List<Ingrediente> getIngredientes() {
		return ingredientes;
	}
	public void setIngredientes(List<Ingrediente> ingredientes) {
		this.ingredientes = ingredientes;
	}
	public byte[] getImagen() {
		return imagen;
	}
	public void setImagen(byte[] imagen) {
		this.imagen = imagen;
	}
}
