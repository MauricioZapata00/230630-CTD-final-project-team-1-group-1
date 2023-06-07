package com.dh.catering.controller;

import com.dh.catering.dto.ProductoDto;
import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.exceptions.DuplicadoException;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.service.JwtService;
import com.dh.catering.service.UsuarioService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.dh.catering.dto.LoginDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/usuarios")
@Tag(name = "Usuarios")
@Slf4j
@RequiredArgsConstructor
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/registrar")
    @Operation(summary = "registrar un usuario")
    public ResponseEntity<String> registrar(@RequestBody @Valid UsuarioDto dto) throws DuplicadoException {
        return usuarioService.save(dto)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.internalServerError()::build);
    }

    @GetMapping("/todos")
    @Operation(summary = "Listar todos los usuarios")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UsuarioDto>> listar() {
        return ResponseEntity.ok(usuarioService.listar());
    }

    @GetMapping("/rolId/{id}")
    @Operation(summary = "Listar todos los usuarios por el id de su rol")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UsuarioDto>> listarTodosPorRolId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findAllByRolId(id));
    }

    @GetMapping("/id/{id}")
    @Operation(summary = "buscar un usuario por su id")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<UsuarioDto> buscarPorId(@PathVariable Long id) throws RecursoNoEncontradoException {
        return usuarioService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "buscar un usuario por su email")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<UsuarioDto> buscarPorEmail(@PathVariable String email) throws RecursoNoEncontradoException {
        return usuarioService.getByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eliminar/{id}")
    @Operation(summary = "Eliminar un usuario por su id")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<String> eliminarPorId(@PathVariable Long id) throws RecursoNoEncontradoException {
        return usuarioService.deleteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/actualizar/{id}")
    @Operation(summary = "Actualizar un usuario por su id")
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<String> actualizarPorId(@PathVariable Long id,@RequestBody UsuarioDto usuarioDto) throws RecursoNoEncontradoException, DuplicadoException {
        return usuarioService.updateById(id,usuarioDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/auth")
    @Operation(summary = "autentica un usuario")
    public String authenticateAndGetToken(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getContrasena()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(loginDto.getEmail());
        } else {
            throw new UsernameNotFoundException("Credenciales incorrectas!");
        }
    }
}
