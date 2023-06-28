package com.dh.catering.service;

import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.factory.RolFactory;
import com.dh.catering.factory.UsuarioFactory;
import com.dh.catering.repository.RolRepository;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RolServiceTest {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    public static final String TEST = "test";
    public static final long ID = 1L;
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
    void testSaveLanzaExcepcion() {
        when(rolRepository.getByNombre(any()))
                .thenReturn(Optional.of(RolFactory.iniciarRol()));
        Assertions.assertThrows(NombreDuplicadoException.class,
                () -> service.save(RolFactory.iniciarRolDto()));
    }

    @Test
    void testSaveRetornaVacio() throws NombreDuplicadoException {
        Assertions.assertTrue(service.save(null).isEmpty());
    }

    @Test
    void testSave() throws NombreDuplicadoException {
        when(rolRepository.getByNombre(any()))
                .thenReturn(Optional.empty());
        Assertions.assertTrue(service.save(RolFactory.iniciarRolDto()).isPresent());
    }

    @Test
    void testFindAll() {
        when(rolRepository.findAll()).thenReturn(List.of(RolFactory.iniciarRol()));
        var resultado = service.findAll();
        Assertions.assertNotNull(resultado);
        Assertions.assertFalse(resultado.isEmpty());
        Assertions.assertEquals(1, resultado.size());
    }

    @Test
    void testGetById() throws RecursoNoEncontradoException {
        when(rolRepository.findById(any()))
                .thenReturn(Optional.of(RolFactory.iniciarRol()));
        var resultado = service.getById(ID);
        Assertions.assertTrue(resultado.isPresent());
    }

    @Test
    void testGetByIdLanzaExcepcion() {
        when(rolRepository.findById(any()))
                .thenReturn(Optional.empty());
        Assertions.assertThrows(RecursoNoEncontradoException.class,
                () -> service.getById(ID));
    }

    @Test
    void testGetByNombre() throws RecursoNoEncontradoException {
        when(rolRepository.getByNombre(any()))
                .thenReturn(Optional.of(RolFactory.iniciarRol()));
        var resultado = service.getByNombre(TEST);
        Assertions.assertTrue(resultado.isPresent());
    }

    @Test
    void testGetByNombreLanzaExcepcion() {
        when(rolRepository.getByNombre(any()))
                .thenReturn(Optional.empty());
        Assertions.assertThrows(RecursoNoEncontradoException.class,
                () -> service.getByNombre(TEST));
    }

    @Test
    void testDeleteByIdLanzaExcepcion() throws RecursoNoEncontradoException {
        doReturn(Optional.of(RolFactory.iniciarRolDto())).when(service).getById(any());
        when(usuarioRepository.findAllByRolId(any()))
                .thenReturn(List.of(UsuarioFactory.iniciarUsuario()));
        Assertions.assertThrows(AsignacionException.class,
                () -> service.deleteById(ID));
    }

    @Test
    void testDeleteByIdEmpty() throws RecursoNoEncontradoException, AsignacionException {
        doReturn(Optional.empty()).when(service).getById(any());
        Assertions.assertTrue(service.deleteById(ID).isEmpty());
    }

    @Test
    void testDeleteById() throws RecursoNoEncontradoException, AsignacionException {
        doReturn(Optional.of(RolFactory.iniciarRolDto())).when(service).getById(any());
        when(usuarioRepository.findAllByRolId(any()))
                .thenReturn(List.of());
        Assertions.assertTrue(service.deleteById(ID).isPresent());
    }

    @Test
    void testUpdateById() throws RecursoNoEncontradoException, AsignacionException, NombreDuplicadoException {
        doReturn(Optional.of(TEST)).when(service).deleteById(any());
        doReturn(Optional.of(TEST)).when(service).save(any());
        doReturn(Optional.of(RolFactory.iniciarRolDto())).when(service).getByNombre(any());
        Assertions.assertTrue(service.updateById(ID, RolFactory.iniciarRolDto()).isPresent());
    }
}
