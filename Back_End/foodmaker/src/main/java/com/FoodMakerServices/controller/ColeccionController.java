package com.FoodMakerServices.controller;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;


import com.FoodMakerServices.entity.Coleccion;
import com.FoodMakerServices.entity.Usuario;
import com.FoodMakerServices.entity.dto.coleccion.ActColeccionRQ;
import com.FoodMakerServices.entity.dto.coleccion.AgregarRecetaRQ;
import com.FoodMakerServices.entity.dto.coleccion.ColeccionCargadaDto;
import com.FoodMakerServices.entity.dto.coleccion.CrearColeccionRQ;
import com.FoodMakerServices.service.ColeccionService;
import com.FoodMakerServices.service.DetalleColeccionService;
import com.FoodMakerServices.service.UsuarioService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class ColeccionController {

	ColeccionService coleccionService;

	DetalleColeccionService detalleColeccionService;

	UsuarioService usuarioService;
	
	@GetMapping("/coleccions")
	public List<ColeccionCargadaDto> allCategorias(){
		return coleccionService.getAll();
	}
	
	@GetMapping("/getcoleccion")
	public List<ColeccionCargadaDto> allCollectionsByUser(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getPrincipal().toString().substring(5).substring(0, authentication.getPrincipal().toString().substring(5).indexOf(",")).trim();
		Usuario user = usuarioService.getByCorreo(email);
		var colecc = coleccionService.getByUsuario(user.getIdusuario());
		System.out.println(colecc);
		return colecc;
	}
	
	@PostMapping("/coleccion/crear")
	public Coleccion crearColeccion(@RequestBody CrearColeccionRQ crear) {
		return coleccionService.add(crear.getNombre());
	}
	
	@DeleteMapping("/coleccion/eliminar/{id}")
	public ResponseEntity<String> eliminar(@PathVariable String id) {
		coleccionService.delete(Integer.parseInt(id));
		return ResponseEntity.ok("Colección eliminada correctamente");
	}
	
	@PutMapping("/coleccion/actualizar")
	public Coleccion actualizar(@RequestBody ActColeccionRQ upd) {
		return coleccionService.update(upd);
	}
	
	@PostMapping("/coleccion/agregareceta")
	public void agregareceta(@RequestBody AgregarRecetaRQ add) {
		coleccionService.addReceta(add);
	} 
}
