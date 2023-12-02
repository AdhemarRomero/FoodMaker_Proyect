package com.FoodMakerServices.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.FoodMakerServices.entity.Receta;

import java.util.ArrayList;
import java.util.List;

public interface RecetaRepository extends JpaRepository<Receta, Integer> {
    List<Receta> findByTiempopreparacionLessThanEqual(int tiempopreparacion);
    List<Receta> findByIdcategoria(int idcategoria);
    List<Receta> findByTiempopreparacionLessThanEqualAndIdcategoria(int tiempopreparacion, int idcategoria);
}

