package com.FoodMakerServices.service.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.FoodMakerServices.entity.Usuario;
import com.FoodMakerServices.entity.dto.LoginDto;
import com.FoodMakerServices.repository.UsuarioRepository;
import com.FoodMakerServices.security.JWTAuthorizationFilter;
import com.FoodMakerServices.security.UserDetailsServiceImplJwt;
import com.FoodMakerServices.service.UsuarioService;

import lombok.AllArgsConstructor;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UsuarioServiceImpl implements UsuarioService {
	@Autowired
	UsuarioRepository repo;
	@Lazy
	@Autowired
	PasswordEncoder encoder;
	
	public Usuario addUsuario(Usuario usuario) {
		
		usuario.setContrasenia(encoder.encode(usuario.getContrasenia()));
		
		return repo.save(usuario);
	}

	@Override
	public List<Usuario> getAll() {
		// TODO Auto-generated method stub
		return (List<Usuario>) repo.findAll();
	}

	@Override
	public Usuario obtenerUsuario(int idusuario) {
		return repo.findById(String.valueOf(idusuario)).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado con ID: " + idusuario));
	}

	@Override
	public Usuario actualizarUsuario(Usuario objUsuario) {
		Usuario existingUsuario = obtenerUsuario(objUsuario.getIdusuario());

		existingUsuario.setNombre(objUsuario.getNombre());
		existingUsuario.setCorreo(objUsuario.getCorreo());
		existingUsuario.setContrasenia(encoder.encode(objUsuario.getContrasenia()));

		return repo.save(existingUsuario);
	}

	@Override
	public Usuario login(LoginDto login) {
		Usuario user = null;
		
		for (Usuario u : repo.findAll()) {
			if (u.getCorreo().equals(login.getCorreo()) && encoder.matches(login.getContrasenia(), u.getContrasenia())) {
				user = u;
			}
		}		
		// TODO Auto-generated method stub
		return user;
	}

	@Override
	public Usuario getByCorreo(String correo) {
		Usuario user = null;
		
		user = repo.findOneByCorreo(correo).orElse(user);
		
		return user;
	}

	@Override
	public Usuario getByNombre(String nombre) {
		Usuario user = null;
		
		user = repo.findByNombre(nombre);
		
		return user;
	}


}
