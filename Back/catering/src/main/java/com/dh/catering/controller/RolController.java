package com.dh.catering.controller;

import com.dh.catering.dto.RolDto;
import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.service.RolService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@Tag(name = "Roles")
@Slf4j
public class RolController {

    @Autowired
    private RolService rolService;

    @Autowired
    private ObjectMapper mapper;

    @PostMapping("/registrar")
    @Operation(summary = "Registrar un rol", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> registrar(@RequestBody RolDto rolDto) throws NombreDuplicadoException {
        return rolService.save(rolDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.internalServerError().build());
    }

    @GetMapping("/todos")
    @Operation(summary = "Listar todos los roles", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<RolDto>> listarTodos(){
        return ResponseEntity.ok(rolService.findAll());
    }

    @GetMapping("/id/{id}")
    @Operation(summary = "buscar rol por su id", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<RolDto> buscarPorId(@PathVariable Long id) throws RecursoNoEncontradoException {
        return rolService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/nombre/{nombre}")
    @Operation(summary = "buscar rol por su nombre", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<RolDto> buscarPorNombre(@PathVariable String nombre) throws RecursoNoEncontradoException {
        return rolService.getByNombre(nombre)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eliminar/{id}")
    @Operation(summary = "Eliminar un rol por su id", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> eliminarPorId(@PathVariable Long id) throws RecursoNoEncontradoException, AsignacionException {
        return rolService.deleteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/eliminar/{id}")
    @Operation(summary = "Actualizar un rol por su id", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> actualizarPorId(@PathVariable Long id,@RequestBody RolDto rolDto) throws RecursoNoEncontradoException, NombreDuplicadoException, AsignacionException {
        return rolService.updateById(id,rolDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

}
