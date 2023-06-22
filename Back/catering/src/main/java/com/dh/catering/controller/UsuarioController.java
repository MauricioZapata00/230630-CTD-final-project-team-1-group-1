package com.dh.catering.controller;

import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.exceptions.DuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.service.JwtService;
import com.dh.catering.service.UsuarioService;
import com.dh.catering.dto.LoginDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios")
@Slf4j
@RequiredArgsConstructor
public class UsuarioController {

    @Autowired
    private final UsuarioService usuarioService;

    @Autowired
    private final AuthenticationManager authenticationManager;

    @Autowired
    private final JwtService jwtService;

    @PostMapping("/registrar")
    @Operation(summary = "registrar un usuario")
    public ResponseEntity<String> registrar(@RequestBody @Valid UsuarioDto dto) throws DuplicadoException {
        return usuarioService.save(dto)
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.internalServerError()::build);
    }

    @GetMapping("/todos")
    @Operation(summary = "Listar todos los usuarios", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UsuarioDto>> listar() {
        return ResponseEntity.ok(usuarioService.listar());
    }

    @GetMapping("/rolId/{id}")
    @Operation(summary = "Listar todos los usuarios por el id de su rol", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<UsuarioDto>> listarTodosPorRolId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findAllByRolId(id));
    }

    @GetMapping("/id/{id}")
    @Operation(summary = "buscar un usuario por su id")
    //@PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<UsuarioDto> buscarPorId(@PathVariable Long id) throws RecursoNoEncontradoException {
        return usuarioService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "buscar un usuario por su email")
    //@PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<UsuarioDto> buscarPorEmail(@PathVariable String email) throws RecursoNoEncontradoException {
        return usuarioService.getByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/eliminar/{id}")
    @Operation(summary = "Eliminar un usuario por su id", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<String> eliminarPorId(@PathVariable Long id) throws RecursoNoEncontradoException {
        return usuarioService.deleteById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PutMapping("/actualizar/{id}")
    @Operation(summary = "Actualizar un usuario por su id", security = @SecurityRequirement(name = "bearerAuth"))
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public ResponseEntity<String> actualizarPorId(@PathVariable Long id,@RequestBody UsuarioDto usuarioDto) throws RecursoNoEncontradoException, DuplicadoException {
        return usuarioService.updateById(id,usuarioDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @PostMapping("/auth")
    @Operation(summary = "autentica un usuario")
    public ResponseEntity<Map<String,String>> authenticateAndGetToken(@RequestBody LoginDto loginDto) throws RecursoNoEncontradoException {
        Map<String, String> respuesta = new HashMap<>();
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getContrasena()));
            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(loginDto.getEmail());
                String dto = usuarioService.getByEmail(loginDto.getEmail()).get().toString();
                respuesta.put("jwt", token);
                respuesta.put("dto", dto);
                return ResponseEntity.ok(respuesta);
            } else {
                throw new BadCredentialsException("Credenciales incorrectas!");
            }
        } catch (AuthenticationException ex) {
            throw new BadCredentialsException("Credenciales incorrectas!");
        }
    }

    @GetMapping("/confirmar/{token}")
    @Operation(summary = "activar usuario")
    public ResponseEntity<String> confirmarUsuario(@PathVariable String token) throws RecursoNoEncontradoException, DuplicadoException {
        return usuarioService.confirmarToken(token)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }
}
