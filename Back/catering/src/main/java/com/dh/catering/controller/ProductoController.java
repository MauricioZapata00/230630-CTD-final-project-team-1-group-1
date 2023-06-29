package com.dh.catering.controller;

import com.dh.catering.dto.ProductoDto;
import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.service.ProductoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.json.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
@RestController
@RequestMapping("/productos")
@Tag(name = "Productos")
@Slf4j
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    ObjectMapper mapper = new ObjectMapper();

    @PostMapping(value = "/registrar", consumes = {"multipart/form-data", "application/octet-stream"})
    @Operation(summary = "Registrar un producto", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> registrar(@RequestParam("productoDto") String productoDto,
                                            @RequestParam("imageFile")MultipartFile archivoImagen) throws NombreDuplicadoException, JsonProcessingException, ParseException, RecursoNoEncontradoException {
        log.info("ProductoDTO recibido: " + productoDto);
        ProductoDto dtoObtenido = mapper.readValue(productoDto, ProductoDto.class);
        return productoService.save(dtoObtenido, archivoImagen)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.internalServerError().build());
    }

    @GetMapping("/todos")
    @Operation(summary = "Listar todos los productos")
    public ResponseEntity<List<ProductoDto>> listarTodos(
        @RequestParam(defaultValue = "0") Integer numeroPagina,
        @RequestParam(defaultValue = "10") Integer tamanioPagina) {
      return ResponseEntity.ok(productoService.findAll(numeroPagina, tamanioPagina));
    }

    @GetMapping("/categoriaId/{id}")
    @Operation(summary = "Listar todos los productos por el id de su categoria")
    public ResponseEntity<List<ProductoDto>> listarTodosPorcategoriaId(
            @RequestParam(defaultValue = "0") Integer numeroPagina,
            @RequestParam(defaultValue = "10") Integer tamanioPagina,
            @PathVariable Long id) {
        return ResponseEntity.ok(productoService.findAllByCategoryId(numeroPagina, tamanioPagina,id));
    }

    @GetMapping("/id/{id}")
    @Operation(summary = "buscar un producto por su id")
    public ResponseEntity<ProductoDto> buscarPorId(@PathVariable Long id) throws RecursoNoEncontradoException {
        return productoService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nombre/{nombre}")
    @Operation(summary = "buscar un producto por su nombre")
    public ResponseEntity<ProductoDto> buscarPorNombre(@PathVariable String nombre) throws RecursoNoEncontradoException{
        return productoService.getByNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eliminar/{id}")
    @Operation(summary = "Eliminar un producto por id", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminarPorId(@PathVariable Long id) throws RecursoNoEncontradoException, AsignacionException {
        return productoService.deleteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping(value = "/actualizar/{id}", consumes = {"multipart/form-data", "application/octet-stream"})
    @Operation(summary = "Actualizar un producto por su id", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizarPorId(@PathVariable Long id,@RequestParam("productoDto") String productoDto, @RequestParam(value = "imageFile", required = false)MultipartFile archivoImagen) throws NombreDuplicadoException, RecursoNoEncontradoException, JsonProcessingException, AsignacionException {
        ProductoDto dtoObtenido = mapper.readValue(productoDto, ProductoDto.class);
        return productoService.updateById(id,dtoObtenido,archivoImagen)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

}
