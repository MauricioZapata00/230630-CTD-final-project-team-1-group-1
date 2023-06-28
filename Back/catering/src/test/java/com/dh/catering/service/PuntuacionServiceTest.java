package com.dh.catering.service;

import com.dh.catering.domain.Producto;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.factory.PuntuacionFactory;
import com.dh.catering.repository.ProductoRepository;
import com.dh.catering.repository.PuntuacionRepository;
import com.dh.catering.repository.UsuarioRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PuntuacionServiceTest {

    @Mock
    private ProductoRepository productoRepository;
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private PuntuacionRepository puntuacionRepository;
    private PuntuacionService service;

    @BeforeEach
    void setUp() {
        service = new PuntuacionService(productoRepository, usuarioRepository, puntuacionRepository);
    }

    @Test
    void testSaveSinProducto() {
        when(productoRepository.findById(any()))
                .thenReturn(Optional.empty());
        Assertions.assertThrows(RecursoNoEncontradoException.class,
                () -> service.save(PuntuacionFactory.iniciarPuntuacionDto()));
    }

    @Test
    void testSaveSinUsuario() {
        when(productoRepository.findById(any()))
                .thenReturn(Optional.of(new Producto()));
        when(usuarioRepository.findById(any()))
                .thenReturn(Optional.empty());
        Assertions.assertThrows(RecursoNoEncontradoException.class,
                () -> service.save(PuntuacionFactory.iniciarPuntuacionDto()));
    }


}

