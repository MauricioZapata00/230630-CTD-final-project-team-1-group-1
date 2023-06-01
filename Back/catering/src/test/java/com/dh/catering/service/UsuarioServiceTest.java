package com.dh.catering.service;

import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.exceptions.DuplicadoException;
import com.dh.catering.repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static com.dh.catering.factory.UsuarioFactory.iniciarUsuario;
import static com.dh.catering.factory.UsuarioFactory.iniciarUsuarioDto;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willReturn;

@ExtendWith(MockitoExtension.class)
class UsuarioServiceTest {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    @Mock
    private UsuarioRepository repository;
    private UsuarioService servicio;

    @BeforeEach
    void setUp() {
        servicio = new UsuarioService(repositorio, MAPPER);
    }

    @Test
    void testSaveEmailDuplicado() {
        willReturn(Optional.of(iniciarUsuario())).given(repositorio).findByEmail(any());
        Assertions.assertThrows(DuplicadoException.class,
                () -> servicio.save(iniciarUsuarioDto()),
                "El correo 'pepito.perez@gmail.com' ya se encuentra registrado en el sistema");
    }

    @Test
    void testSave() throws DuplicadoException {
        willReturn(Optional.empty()).given(repositorio).findByEmail(any());
        willReturn(iniciarUsuario()).given(repositorio).save(any(Usuario.class));
        Optional<String> resultado = servicio.save(iniciarUsuarioDto());
        Assertions.assertTrue(resultado.isPresent());
    }

    @Test
    void testListar() {
        willReturn(List.of(iniciarUsuario())).given(repositorio).findAll();
        List<UsuarioDto> resultado = servicio.listar();
        Assertions.assertFalse(resultado.isEmpty());
    }
}

