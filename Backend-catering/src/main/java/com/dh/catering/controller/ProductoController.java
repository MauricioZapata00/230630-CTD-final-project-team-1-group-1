package com.dh.catering.controller;

import com.dh.catering.dto.ProductoDto;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.service.ProductoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.JSONParser;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/productos")
@Tag(name = "Productos")
@Slf4j
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @PostMapping(value = "/registrar", consumes = {"multipart/form-data", "application/octet-stream"})
    @Operation(summary = "Registrar un producto")
    public ResponseEntity<String> registrar(@RequestParam("productoDto") String productoDto,
                                            @RequestParam("imageFile")MultipartFile archivoImagen) throws NombreDuplicadoException, JsonProcessingException, ParseException {
        log.info("ProductoDTO recibido: " + productoDto);
        ObjectMapper mapper = new ObjectMapper();
        ProductoDto dtoObtenido = mapper.readValue(productoDto, ProductoDto.class);
        return productoService.save(dtoObtenido, archivoImagen)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.internalServerError().build());
    }

    @GetMapping("/")
    @Operation(summary = "Listar todos los productos")
    public ResponseEntity<List<ProductoDto>> listarTodos(
        @RequestParam(defaultValue = "0") Integer numeroPagina,
        @RequestParam(defaultValue = "10") Integer tamanioPagina) {
      return ResponseEntity.ok(productoService.findAll(numeroPagina, tamanioPagina));
    }

    @GetMapping("/{nombre}")
    @Operation(summary = "buscar un producto por su nombre")
    public ResponseEntity<ProductoDto> buscarPorNombre(@PathVariable String nombre) throws RecursoNoEncontradoException{
        return productoService.getByNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{nombre}")
    @Operation(summary = "Eliminar un producto por nombre")
    public ResponseEntity<String> eliminarPorNombre(@PathVariable String nombre) throws RecursoNoEncontradoException{
        return productoService.deleteByNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/{nombre}")
    @Operation(summary = "Actualizar un producto por nombre")
    public ResponseEntity<String> actualizarPorNombre(@PathVariable String nombre, @RequestBody ProductoDto productoDto) throws NombreDuplicadoException, RecursoNoEncontradoException{
        return productoService.updateByNombre(nombre,productoDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

}
