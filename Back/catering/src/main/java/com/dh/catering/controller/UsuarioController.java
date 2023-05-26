package com.dh.catering.controller;

import com.dh.catering.dto.LoginDto;
import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.exceptions.DuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/usuarios")
@Tag(name = "Usuarios")
@Slf4j
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping("/")
    @Operation(summary = "registrar un usuario")
    public ResponseEntity<String> register(@RequestBody @Valid UsuarioDto dto) throws DuplicadoException {
        return usuarioService.save(dto)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.internalServerError()::build);
    }

    @GetMapping("/")
    @Operation(summary = "Listar los usuarios")
    public ResponseEntity<List<UsuarioDto>> list() {
        return ResponseEntity.ok(usuarioService.listar());
    }

    @PostMapping("/auth")
    @Operation(summary = "autentica un usuario")
    public ResponseEntity<?> auth(@RequestBody @Valid LoginDto dto) throws RecursoNoEncontradoException {
        return ResponseEntity.ok(usuarioService.auth(dto.getEmail(), dto.getContrasena()));
    }
}
