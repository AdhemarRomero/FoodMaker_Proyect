package com.FoodMakerServices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@SpringBootApplication
public class FoodMakerServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodMakerServicesApplication.class, args);
	}

	@Bean
   WebMvcConfigurer corsConfigurer() {
      return new WebMvcConfigurer() {
         @Override
         public void addCorsMappings(CorsRegistry registry) {
        	 registry.addMapping("/**").allowedOrigins("http://localhost:4200").allowedMethods("GET", "POST","PUT", "DELETE").allowedHeaders("**");
         }
      };
   }
}