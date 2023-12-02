package com.FoodMakerServices.repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.FoodMakerServices.entity.DetalleReceta;

public interface DetalleRecetaRepository extends CrudRepository<DetalleReceta, String> {
	
	@Modifying
	@Query("delete from DetalleReceta as d where d.idreceta = :idReceta")
	public void deleteAllByIdReceta(int idReceta);
}
