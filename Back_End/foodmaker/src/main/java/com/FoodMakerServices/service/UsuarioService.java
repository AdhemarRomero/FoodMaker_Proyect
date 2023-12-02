package com.FoodMakerServices.service;

import java.util.List;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.FoodMakerServices.entity.Usuario;
import com.FoodMakerServices.entity.dto.LoginDto;

public interface UsuarioService {
	public Usuario addUsuario(Usuario usuario);
	public Usuario getByCorreo(String correo);
	public Usuario getByNombre(String nombre);
	public Usuario login(LoginDto login) throws UsernameNotFoundException;
	public List<Usuario> getAll();
	public Usuario obtenerUsuario(int idusuario);
	public Usuario actualizarUsuario(Usuario objUsuario);
}
