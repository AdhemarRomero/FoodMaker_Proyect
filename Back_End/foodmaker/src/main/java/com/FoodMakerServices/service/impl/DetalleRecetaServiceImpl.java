package com.FoodMakerServices.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.FoodMakerServices.entity.DetalleReceta;
import com.FoodMakerServices.entity.Ingrediente;
import com.FoodMakerServices.entity.dto.receta.RecetaCompleta;
import com.FoodMakerServices.repository.DetalleRecetaRepository;
import com.FoodMakerServices.service.DetalleRecetaService;

import jakarta.transaction.Transactional;
@Service
public class DetalleRecetaServiceImpl implements DetalleRecetaService {

	@Autowired
	DetalleRecetaRepository repo;

	public List<DetalleReceta> getAll() {
		return (List<DetalleReceta>) repo.findAll();
	}

	public void addDetalleReceta(RecetaCompleta recetaCompleta) {
		for(Ingrediente i : recetaCompleta.getIngredientes()) {
			DetalleReceta detalleReceta = new DetalleReceta();
			detalleReceta.setIdingrediente(i.getIdingrediente());
			detalleReceta.setIdreceta(recetaCompleta.getReceta().getIdreceta());
			repo.save(detalleReceta);
		}
	}

	@Override
	@Transactional
	public void deleteDetalleReceta(int idReceta) {
		repo.deleteAllByIdReceta(idReceta);
	}
}
