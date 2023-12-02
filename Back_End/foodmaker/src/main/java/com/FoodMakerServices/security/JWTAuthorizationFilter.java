package com.FoodMakerServices.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTAuthorizationFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		System.out.println("fifo");
		String bearer = request.getHeader("Authorization");
		System.out.println(bearer);
		if(bearer != null && bearer.startsWith("Bearer ")) {
			String token = bearer.replace("Bearer ", "");
			UsernamePasswordAuthenticationToken userPt = TokenUtils.getAuth(token);
			System.out.println(userPt);
			System.out.println("despues pot");
			SecurityContextHolder.getContext().setAuthentication(userPt);
			
		}
		
		filterChain.doFilter(request, response);
		
	}

}
