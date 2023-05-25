package com.dh.catering.service;

import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.exceptions.DuplicadoException;
import com.dh.catering.repository.UsuarioRepositorio;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class UsuarioService {

    private static final String MSJ_EXITO = "Se guardo exitosamente el usuario";
    private static final String MSJ_ERROR = "El correo '%s' ya se encuentra registrado en el sistema";
    private final UsuarioRepositorio usuarioRepositorio;
    private final ObjectMapper mapper;

    public Optional<String> save(UsuarioDto dto) throws DuplicadoException {
        if (usuarioRepositorio.findByEmail(dto.getEmail()).isPresent()) {
            throw new DuplicadoException(MSJ_ERROR.formatted(dto.getEmail()));
        }
        Usuario usuario = mapper.convertValue(dto, Usuario.class);
        usuarioRepositorio.save(usuario);
        log.info(MSJ_EXITO);
        return Optional.of(MSJ_EXITO);
    }

    public List<UsuarioDto> listar() {
        return usuarioRepositorio.findAll()
                .stream()
                .map(d -> mapper.convertValue(d, UsuarioDto.class))
                .toList();
    }
}
