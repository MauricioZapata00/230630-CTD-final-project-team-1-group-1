package com.dh.catering.controller;

import com.dh.catering.dto.PuntuacionDto;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.service.PuntuacionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/puntuaciones")
@Tag(name = "Puntuaciones")
@Slf4j
@RequiredArgsConstructor
public class PuntuacionController {

    private final PuntuacionService puntuacionService;

    @PostMapping("/")
    @Operation(summary = "guardar una puntuacion")
    public ResponseEntity<String> guardar(@RequestBody @Valid PuntuacionDto dto) throws RecursoNoEncontradoException {
        return puntuacionService.save(dto)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.internalServerError()::build);
    }

    @GetMapping("/")
    @Operation(summary = "lista todas las puntuaciones")
    public ResponseEntity<List<PuntuacionDto>> listar() {
        return ResponseEntity.ok(puntuacionService.findAll());
    }

    @GetMapping("/usuarios/{id}")
    @Operation(summary = "lista todas las puntuaciones del usuario")
    public ResponseEntity<List<Integer>> listarPorUsuario(@PathVariable Long id) {
        return ResponseEntity.ok(puntuacionService.findAllByUsuarioId(id));
    }

    @GetMapping("/productos/{id}")
    @Operation(summary = "lista todas las puntuaciones del producto")
    public ResponseEntity<List<Integer>> listarPorProducto(@PathVariable Long id) {
        return ResponseEntity.ok(puntuacionService.findAllByProductoId(id));
    }
}
