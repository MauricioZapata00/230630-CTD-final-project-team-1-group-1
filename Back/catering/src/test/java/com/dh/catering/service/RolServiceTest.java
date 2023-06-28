package com.dh.catering.service;

import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.factory.RolFactory;
import com.dh.catering.repository.RolRepository;
import com.dh.catering.repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RolServiceTest {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    @Mock
    private RolRepository rolRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    private RolService service;

    @BeforeEach
    void setUp() {
        service =  spy(new RolService(rolRepository, usuarioRepository, MAPPER));
    }

    @Test
    void saveLanzaExcepcion() {
        when(rolRepository.getByNombre(any()))
                .thenReturn(Optional.of(RolFactory.iniciarRol()));
        Assertions.assertThrows(NombreDuplicadoException.class,
                () -> service.save(RolFactory.iniciarRolDto()));
    }
}

