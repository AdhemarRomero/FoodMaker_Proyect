package com.FoodMakerServices;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.FoodMakerServices.security.JWTAuthorizationFilter;
import com.FoodMakerServices.security.JWTAuthtenticationFilter;
import com.FoodMakerServices.security.UserDetailsServiceImplJwt;

import lombok.AllArgsConstructor;

@Configuration
@AllArgsConstructor
public class WebSecurityConfig {
	
	private UserDetailsServiceImplJwt userDetailsService;
	private JWTAuthorizationFilter jwtAuthorizationFilter;

    @Bean
    PasswordEncoder encoder() {
    	return new BCryptPasswordEncoder();
    };
    
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration().applyPermitDefaultValues();
        corsConfiguration.addAllowedMethod("*");
        return source;
    }
    
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
    	JWTAuthtenticationFilter JWTAuthtenticationFilter = new JWTAuthtenticationFilter();
    	JWTAuthtenticationFilter.setAuthenticationManager(authManager);
    	JWTAuthtenticationFilter.setFilterProcessesUrl("/login");
    	
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests((authz) -> authz
                    .requestMatchers(HttpMethod.POST, "/registrar").permitAll()
                    .requestMatchers(HttpMethod.POST, "/login").permitAll()
                    .anyRequest().authenticated()
                )
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilter(JWTAuthtenticationFilter)
                .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    
    @Bean
    AuthenticationManager authManager(HttpSecurity http) throws Exception {
		return http.getSharedObject(AuthenticationManagerBuilder.class)
				.userDetailsService((UserDetailsService) userDetailsService)
				.passwordEncoder(encoder()).and().build();
    }
}
