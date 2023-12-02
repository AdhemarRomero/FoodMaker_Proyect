package com.FoodMakerServices.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.FoodMakerServices.entity.Usuario;

public interface UsuarioRepository extends CrudRepository<Usuario, String> {
	Usuario findByNombre(String usuario);
	Usuario findByNombreAndContrasenia(String nombre, String contrasenia);
	Usuario findByCorreo(String correo);
	Optional<Usuario> findOneByCorreo(String correo);
}
