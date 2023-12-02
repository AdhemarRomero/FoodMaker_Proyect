package com.FoodMakerServices.security;


import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.FoodMakerServices.entity.dto.LoginDto;
import com.FoodMakerServices.entity.dto.SuccessLoginDto;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JWTAuthtenticationFilter extends UsernamePasswordAuthenticationFilter {

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		LoginDto login = new LoginDto();
		
		try {
			login = new ObjectMapper().readValue(request.getReader(), login.getClass());
		}
		catch (Exception e) {
		}
		
		UsernamePasswordAuthenticationToken userPat = new UsernamePasswordAuthenticationToken(login.getCorreo(), login.getContrasenia());
		
		return getAuthenticationManager().authenticate(userPat);
	}
	
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		UserDetailsImplJwt userD = (UserDetailsImplJwt) authResult.getPrincipal();
		String token = TokenUtils.CreateToken(userD.getName(), userD.getUsername());
		
		SuccessLoginDto sLogin = new SuccessLoginDto();
		sLogin.setCorreo(userD.getUsername());
		sLogin.setNombre(userD.getName());
		sLogin.setToken(token);
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(sLogin);
		
		response.addHeader("Authorization", "bearer " +token);
		response.addHeader("Content-Type", "application/json");
		response.getWriter().write(json);
		response.flushBuffer();
		
		//super.successfulAuthentication(request, response, chain, authResult);
	}
}
