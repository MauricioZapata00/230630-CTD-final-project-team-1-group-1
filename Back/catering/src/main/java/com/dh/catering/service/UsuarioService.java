package com.dh.catering.service;

import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.exceptions.DuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.repository.RolRepository;
import com.dh.catering.repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsuarioService {

    private static final String MSJ_EXITO = "Se guardo exitosamente el usuario";
    private static final String MSJ_ERROR = "El correo '%s' ya se encuentra registrado en el sistema";
    private static final String MSJ_NO_ENCONTRADO = "No existe un usuario con el correo: %s";
    private static final String MSJ_NO_VALIDO = "La contrase\u00f1a es incorrecta, intentelo de nuevo.";

    @Autowired
    private final UsuarioRepository usuarioRepository;

    @Autowired
    private final RolRepository rolRepository;

    @Autowired
    private final ObjectMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;
  
    public Optional<String> save(UsuarioDto dto) throws DuplicadoException {
        if (usuarioRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new DuplicadoException(MSJ_ERROR.formatted(dto.getEmail()));
        }
        Usuario usuario = mapper.convertValue(dto, Usuario.class);
        usuario.setRol(rolRepository.getByNombre(dto.getRolName()).get());
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        usuarioRepository.save(usuario);
        log.info(MSJ_EXITO);
        return Optional.of(MSJ_EXITO);
    }

    public List<UsuarioDto> listar() {
        List<UsuarioDto> usuarioDtos = new ArrayList<>();
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario usuario: usuarios){
            UsuarioDto usuarioDto = mapper.convertValue(usuario,UsuarioDto.class);
            usuarioDto.setRolName(usuario.getRol().getNombre());
            usuarioDtos.add(usuarioDto);
        }
        return usuarioDtos;
    }

    public List<UsuarioDto> findAllByRolId(Long id) {
        List<UsuarioDto> usuarioDtos = new ArrayList<>();
        List<Usuario> usuarios = usuarioRepository.findAllByRolId(id);
        for (Usuario usuario:usuarios){
            UsuarioDto usuarioDto = mapper.convertValue(usuario,UsuarioDto.class);
            usuarioDto.setRolName(usuario.getRol().getNombre());
            usuarioDtos.add(usuarioDto);
        }
        return usuarioDtos;
    }

    public Optional<UsuarioDto> getById(Long id) throws RecursoNoEncontradoException {
        UsuarioDto usuarioDto = null;
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isEmpty()){
            log.error("No existe un usuario con el id: " + id);
            throw new RecursoNoEncontradoException("No existe un usuario con el id: " + id);
        }
        usuarioDto = mapper.convertValue(optionalUsuario.get(),UsuarioDto.class);
        usuarioDto.setRolName(optionalUsuario.get().getRol().getNombre());
        return  Optional.ofNullable(usuarioDto);
    }

    public Optional<UsuarioDto> getByEmail(String email) throws RecursoNoEncontradoException {
        UsuarioDto usuarioDto = null;
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);
        if (optionalUsuario.isEmpty()){
            log.error("No existe un usuario con el email: " + email);
            throw new RecursoNoEncontradoException("No existe un usuario con el email: " + email);
        }
        usuarioDto = mapper.convertValue(optionalUsuario.get(),UsuarioDto.class);
        usuarioDto.setRolName(optionalUsuario.get().getRol().getNombre());
        return  Optional.ofNullable(usuarioDto);
    }

    public Optional<String> deleteById(Long id) throws RecursoNoEncontradoException {
        String mensaje = null;
        Optional<UsuarioDto> optionalUsuarioDto = this.getById(id);
        if (optionalUsuarioDto.isPresent()) {
            usuarioRepository.deleteById(id);
            mensaje = "Se elimino exitosamente el usuario con id: " + id;
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public Optional<String> updateById(Long id, UsuarioDto usuarioDto) throws RecursoNoEncontradoException, DuplicadoException {
        String mensaje = null;
        this.deleteById(id);
        this.save(usuarioDto);
        mensaje = "Se actualizo correctamente el usuario que tenia el id: " + id + ". Al usuario actualizado se le asigno el id: " + this.getByEmail(usuarioDto.getEmail()).get().getId();
        log.info(mensaje);
        return Optional.ofNullable(mensaje);
    }


   /*
    public UsuarioDto auth(String email, String contrasena) throws RecursoNoEncontradoException {
        Optional<Usuario> usuarioOp = usuarioRepository.findByEmail(email);
        if (usuarioOp.isEmpty()) {
            throw new RecursoNoEncontradoException(MSJ_NO_ENCONTRADO.formatted(email));
        } else {
            Usuario usuario = usuarioOp.get();
            if (usuario.getContrasena().equals(passwordEncoder.encode(contrasena))) {
                UsuarioDto usuarioDto = mapper.convertValue(usuario, UsuarioDto.class);
                usuarioDto.setRolName(usuario.getRol().getNombre());
                return usuarioDto;
            } else {
                throw new RecursoNoEncontradoException(MSJ_NO_VALIDO.formatted(email));
            }
        }
    }
    */
  
}
