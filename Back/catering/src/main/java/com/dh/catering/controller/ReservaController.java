package com.dh.catering.controller;

import com.dh.catering.dto.ReservaDto;
import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.service.ReservaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reservas")
@Tag(name = "Reservas")
@Slf4j
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ADMIN') || hasAuthority('USER') ")
@SecurityRequirement(name = "bearerAuth")
public class ReservaController {

    private final ReservaService reservaService;

    @PostMapping("/")
    @Operation(summary = "guardar una reserva")
    public ResponseEntity<String> guardar(@RequestBody ReservaDto dto) throws AsignacionException {
        return reservaService.registrar(dto)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.internalServerError()::build);
    }

    @GetMapping("/")
    @Operation(summary = "lista todas las reservas")
    public ResponseEntity<List<ReservaDto>> listar() {
        return ResponseEntity.ok(reservaService.listarTodos());
    }

    @GetMapping("/{id}")
    @Operation(summary = "lista una reserva mediante su id")
    public ResponseEntity<ReservaDto> buscarPorId(Long id) throws RecursoNoEncontradoException {
        return reservaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @GetMapping("/productos/{id}")
    @Operation(summary = "lista todas las reservas por id de producto")
    public ResponseEntity<List<ReservaDto>> buscarTodosPorProductoId(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.buscarTodosPorProductoId(id));
    }

    @GetMapping("/productos/fechas/{id}")
    @Operation(summary = "lista todas las fechas de reservas por id de producto")
    public ResponseEntity<List<String>> obtenerFechasReservadasPorProductoId(@PathVariable Long id) {
        return ResponseEntity.ok(reservaService.obtenerFechasReservadasPorProductoId(id));
    }

    @GetMapping("/usuarios/{email}")
    @Operation(summary = "lista todas las reservas por email de usuario")
    public ResponseEntity<List<ReservaDto>> buscarTodosPorUsuarioEmail(@PathVariable String email) {
        return ResponseEntity.ok(reservaService.buscarTodosPorUsuarioEmail(email));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "elimina una reserva mediante su id")
    public ResponseEntity<String> eliminarPorId(Long id) throws RecursoNoEncontradoException {
        return reservaService.eliminarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }

    @PutMapping("/{id}")
    @Operation(summary = "actualiza una reserva mediante su id")
    public ResponseEntity<String> actualizarPorId(@PathVariable Long id,@RequestBody ReservaDto dto) throws RecursoNoEncontradoException, AsignacionException {
        return reservaService.actualizarPorId(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.notFound()::build);
    }
}

