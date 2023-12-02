package com.FoodMakerServices.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.FoodMakerServices.entity.DetalleReceta;
import com.FoodMakerServices.entity.Ingrediente;
import com.FoodMakerServices.entity.Receta;
import com.FoodMakerServices.entity.dto.receta.AvailableRQ;
import com.FoodMakerServices.entity.dto.receta.RecetaCompleta;
import com.FoodMakerServices.service.DetalleRecetaService;
import com.FoodMakerServices.service.IngredienteService;
import com.FoodMakerServices.service.RecetaService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class RecetaController {
	@Autowired
	RecetaService recetaService;
	@Autowired
	IngredienteService ingredienteService;
	@Autowired
	DetalleRecetaService detalleRecetaService;
	
	@GetMapping("/recetas")
	public List<Receta> allRecetas(){
		return recetaService.getAll();
	}

	@PostMapping("/anadirReceta")
	@ResponseBody
	@ResponseStatus(code = HttpStatus.CREATED)
	public RecetaCompleta addReceta(@RequestBody RecetaCompleta recetaRQ) {
		RecetaCompleta recetaCompletaAñadida = new RecetaCompleta();

		Receta recetaAñadida = recetaService.addReceta(recetaRQ);
		List<Ingrediente> ingredientesAñadidos = ingredienteService.addIngredientes(recetaRQ.getIngredientes());

		recetaCompletaAñadida.setReceta(recetaAñadida);
		recetaCompletaAñadida.setIngredientes(ingredientesAñadidos);
		detalleRecetaService.addDetalleReceta(recetaCompletaAñadida);

		return recetaCompletaAñadida;
	}
	
	@PostMapping("/actualizarReceta")
	@ResponseBody
	public Receta updateReceta(@RequestBody Receta receta) {
		return recetaService.updateReceta(receta);
	}
	

	@GetMapping("/buscarReceta/{idReceta}")
    public ResponseEntity<RecetaCompleta> buscarReceta(@PathVariable int idReceta){
        RecetaCompleta recetaCompleta = new RecetaCompleta();

        Receta receta = recetaService.BuscarReceta(idReceta);
        if(receta == null) {
        	return ResponseEntity.notFound().build();
        }
        
        List<Ingrediente> ingredientes = ingredienteService.getAll();
        List<DetalleReceta> detalleReceta = detalleRecetaService.getAll().stream()
                                                                .filter(d -> d.getIdreceta() == receta.getIdreceta())
                                                                .collect(Collectors.toList());
        
        List<Ingrediente> ingredienteByReceta = new ArrayList();
        
        for (DetalleReceta dr : detalleReceta) {
            Ingrediente ingrediente = ingredientes.get(dr.getIdingrediente());
            ingredienteByReceta.add(ingrediente);
        }

        recetaCompleta.setReceta(receta);
        recetaCompleta.setIngredientes(ingredienteByReceta);
        return ResponseEntity.ok(recetaCompleta);
    }
	
	@DeleteMapping("/eliminarReceta/{idReceta}")
	@ResponseBody
	public String deleteReceta(@PathVariable int idReceta) {
		detalleRecetaService.deleteDetalleReceta(idReceta);
		boolean isDeleteReceta = recetaService.deleteReceta(idReceta);
		
		if(isDeleteReceta) {
			return "Se ha eliminado con éxtio la receta";
		}else {
			return "No se ha podido eliminar la receta";		
		}
	}
	
	@PostMapping("/receta/disponibilidad")
	public List<RecetaCompleta> allAval(@RequestBody AvailableRQ aval){
		return GetRecetasDisponibles(aval.getTiempodecocina());
	}
	
	public List<RecetaCompleta> GetRecetasDisponibles(int minutos){
		try {	
			List<Ingrediente> ingredientes = ingredienteService.getAll();
			List<DetalleReceta> referencias = detalleRecetaService.getAll();
			List<RecetaCompleta> recetasWithIngrediente = new ArrayList();
			
			// Recetas por minutos de preparación
			List<Receta> recetas = recetaService.filtrarPorTiempo(minutos);
			
			// Filtraremos las recetas por ingredientes
		    for (Receta receta : recetas) {
		        RecetaCompleta recetaCompleta = new RecetaCompleta();
		        recetaCompleta.setReceta(receta);
		        
		        List<DetalleReceta> refByReceta = referencias.stream()
		        		.filter(d -> d.getIdreceta() == receta.getIdreceta())
		        		.collect(Collectors.toList());
		        
		        List<Ingrediente> ingredientesByRef = new ArrayList();
		        
		        for (DetalleReceta dr : refByReceta) {
		        	Ingrediente ingrediente = ingredientes.get(dr.getIdingrediente() - 1);
		        	ingredientesByRef.add(ingrediente);
		        }
		        
		        recetaCompleta.setIngredientes(ingredientesByRef);
		        recetasWithIngrediente.add(recetaCompleta);
		    }
		    
		    List<RecetaCompleta> recetasDisponibles = ConstruirRecetasDisponibles(recetasWithIngrediente);
		    
			return recetasDisponibles;
			
		}catch(Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	// Helpers
	// Lógica de entrada del Refrigerador
	public static JsonNode leerJsonDesdeArchivo(String rutaArchivo) {
        try {
            // Crea un objeto ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            // Lee el archivo JSON y devuelve un JsonNode
            return objectMapper.readTree(new File(rutaArchivo));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
	public static String obtenerRutaAbsoluta(String rutaRelativa) {
        //Obtiene la ruta absoluta del directorio actual
        Path rutaBase = Paths.get(System.getProperty("user.dir"));
        
        // Combina la ruta base con la ruta relativa
        Path rutaAbsoluta = rutaBase.resolve(Paths.get(rutaRelativa));
        
        // Convierte la ruta a formato de cadena y la retorna
        return rutaAbsoluta.toString();
    }
	public static JsonNode GetIngredientesRefrigerador() {
		String rutaRelativa = "/refrigerador.json";
		String rutaAbsoluta = new File ("refrigerador.json").getAbsolutePath();
        JsonNode jsonNode = leerJsonDesdeArchivo(rutaAbsoluta);
        
        return jsonNode;
	}

	public static List<RecetaCompleta> ConstruirRecetasDisponibles(List<RecetaCompleta> recetas){
		JsonNode ingredienteRefrigerador = GetIngredientesRefrigerador();
		
		List<RecetaCompleta> recetasOrdenadas = new ArrayList();
		
		for (RecetaCompleta receta : recetas) {
            int coincidencias = contarCoincidencias(receta.getIngredientes(), ingredienteRefrigerador);
            receta.setCantidadCoincidencias(coincidencias);
            recetasOrdenadas.add(receta);
        }
		
		Collections.sort(recetasOrdenadas, Comparator.comparingInt(RecetaCompleta::getCantidadCoincidencias).reversed());
		
		return recetasOrdenadas;
	}
	
	public static int contarCoincidencias(List<Ingrediente> ingredientesReceta, JsonNode ingredienteRefrigerador) {
	    int coincidencias = 0;

	    for (Ingrediente ingredienteReceta : ingredientesReceta) {
	        String nombreReceta = ingredienteReceta.getNombre();

	        for (JsonNode ingredienteJson : ingredienteRefrigerador) {
	            String nombreJson = ingredienteJson.get("nombre").asText();

	            if (nombreReceta.equals(nombreJson)) {
	                coincidencias++;
	            }
	        }
	    }

	    return coincidencias;
	}
	
	@GetMapping("recetat/{tiempopreparacion}")
	public List<Receta> filtrarRecetaPorTiempo(@PathVariable int tiempopreparacion){
		return recetaService.filtrarPorTiempo(tiempopreparacion);
	}
	
	@GetMapping("recetac/{idcategoria}")
	public List<RecetaCompleta> filtrarRecetaPorCategoria(@PathVariable int idcategoria){
		List<Receta> recetasByCategory = recetaService.filtrarPorCategoria(idcategoria);
		List<RecetaCompleta> recetas = new ArrayList();
		List<Ingrediente> ingredientes = ingredienteService.getAll();

		for(Receta r : recetasByCategory) {
			RecetaCompleta recetaCompleta = new RecetaCompleta();
			
			List<DetalleReceta> detalleReceta = detalleRecetaService.getAll().stream()
                    .filter(d -> d.getIdreceta() == r.getIdreceta())
                    .collect(Collectors.toList());
			
			List<Ingrediente> ingredienteByReceta = new ArrayList();
			
			for (DetalleReceta dr : detalleReceta) {
	            Ingrediente ingrediente = ingredientes.get(dr.getIdingrediente());
	            ingredienteByReceta.add(ingrediente);
	        }
			
			recetaCompleta.setReceta(r);
	        recetaCompleta.setIngredientes(ingredienteByReceta);
			
			recetas.add(recetaCompleta);
		}
		
		return recetas;
	}
	
	@GetMapping("recetaf")
	public List<Receta> filtrarRecetaPorTiempoyCategoria(@RequestParam int tiempopreparacion,@RequestParam int idcategoria){
		return  recetaService.filtrarPorTiempoyCategoria(tiempopreparacion,idcategoria);
	}
}
