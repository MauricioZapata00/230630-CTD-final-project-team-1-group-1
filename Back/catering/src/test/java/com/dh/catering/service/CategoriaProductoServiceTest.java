package com.dh.catering.service;

import com.dh.catering.domain.Producto;
import com.dh.catering.dto.CategoriaProductoDto;
import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.factory.CategoriaProductoFactory;
import com.dh.catering.repository.CategoriaProductoRepository;
import com.dh.catering.repository.ProductoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoriaProductoServiceTest {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    public static final String TEST = "test";
    public static final long ID = 1L;
    @Mock
    private CategoriaProductoRepository categoriaProductoRepository;
    @Mock
    private ProductoRepository productoRepository;
    @Mock
    private S3ImageService s3ImageService;
    private CategoriaProductoService service;

    @BeforeEach
    void setUp() {
        service = spy(new CategoriaProductoService(categoriaProductoRepository,
                productoRepository, MAPPER, s3ImageService));
    }

    @Test
    void testSaveRetornaNull(@Mock MultipartFile file) throws NombreDuplicadoException {
        Assertions.assertTrue(service.save(null, file).isEmpty());
    }

    @Test
    void testSaveLanzaExcepcion(@Mock MultipartFile file) {
        when(categoriaProductoRepository.getByNombre(any()))
                .thenReturn(Optional.of(CategoriaProductoFactory.iniciarCategoriaProducto()));
        Assertions.assertThrows(NombreDuplicadoException.class,
                () -> service.save(CategoriaProductoFactory.iniciarCategoriaProductoDto(), file));
    }

    @Test
    void testSave(@Mock MultipartFile file) throws NombreDuplicadoException {
        when(categoriaProductoRepository.getByNombre(any()))
                .thenReturn(Optional.empty());
        doNothing().when(s3ImageService).uploadImage(anyString(), any());
        doReturn("").when(s3ImageService).getUrlImage(anyString());
        doReturn(CategoriaProductoFactory.iniciarCategoriaProducto())
                .when(categoriaProductoRepository).save(any());
        Assertions.assertTrue(service.save(CategoriaProductoFactory.iniciarCategoriaProductoDto(), file).isPresent());
    }

    @Test
    void testFindAll() {
        when(categoriaProductoRepository.findAll())
                .thenReturn(List.of(CategoriaProductoFactory.iniciarCategoriaProducto()));
        var resultado = service.findAll();
        Assertions.assertNotNull(resultado);
        Assertions.assertFalse(resultado.isEmpty());
        Assertions.assertTrue(resultado.get(0) instanceof CategoriaProductoDto);
    }

    @Test
    void testGetByIdLanzaExcepcion() {
        when(categoriaProductoRepository.findById(any()))
                .thenReturn(Optional.empty());
        Assertions.assertThrows(RecursoNoEncontradoException.class,
                () -> service.getById(ID));
    }

    @Test
    void testGetById() throws RecursoNoEncontradoException {
        when(categoriaProductoRepository.findById(any()))
                .thenReturn(Optional.of(CategoriaProductoFactory.iniciarCategoriaProducto()));
        Assertions.assertTrue(service.getById(ID).isPresent());
    }

    @Test
    void testGetByNombreLanzaExcepcion() {
        when(categoriaProductoRepository.getByNombre(any()))
                .thenReturn(Optional.empty());
        Assertions.assertThrows(RecursoNoEncontradoException.class,
                () -> service.getByNombre(TEST));
    }

    @Test
    void testGetByNombre() throws RecursoNoEncontradoException {
        when(categoriaProductoRepository.getByNombre(any()))
                .thenReturn(Optional.of(CategoriaProductoFactory.iniciarCategoriaProducto()));
        Assertions.assertTrue(service.getByNombre(TEST).isPresent());
    }

    @Test
    void testDeleteByIdLanzaExcepcion() throws RecursoNoEncontradoException {
        doReturn(Optional.of(CategoriaProductoFactory.iniciarCategoriaProductoDto()))
                .when(service).getById(anyLong());
        when(productoRepository.findAllByCategoriaId(any()))
                .thenReturn(List.of(new Producto()));
        Assertions.assertThrows(AsignacionException.class,
                () -> service.deleteById(ID));
    }

    @Test
    void testDeleteByIdNull() throws RecursoNoEncontradoException, AsignacionException {
        doReturn(Optional.empty()).when(service).getById(anyLong());
        Assertions.assertTrue(service.deleteById(ID).isEmpty());
    }

    @Test
    void testDeleteById() throws RecursoNoEncontradoException, AsignacionException {
        doReturn(Optional.of(CategoriaProductoFactory.iniciarCategoriaProductoDto()))
                .when(service).getById(anyLong());
        when(productoRepository.findAllByCategoriaId(any()))
                .thenReturn(List.of());
        doNothing().when(categoriaProductoRepository).deleteById(any());
        Assertions.assertTrue(service.deleteById(ID).isPresent());
    }

    @Test
    void updateById(@Mock MultipartFile file) throws RecursoNoEncontradoException, AsignacionException, NombreDuplicadoException {
        doReturn(Optional.empty()).when(service).deleteById(any());
        doReturn(Optional.empty()).when(service).save(any(), any());
        doReturn(Optional.of(CategoriaProductoFactory.iniciarCategoriaProductoDto()))
                .when(service).getByNombre(anyString());
        Assertions.assertTrue(service.updateById(ID, CategoriaProductoFactory.iniciarCategoriaProductoDto(), file).isPresent());
    }
}
