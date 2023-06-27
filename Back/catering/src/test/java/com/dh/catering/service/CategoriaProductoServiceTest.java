package com.dh.catering.service;

import com.dh.catering.exceptions.NombreDuplicadoException;
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

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoriaProductoServiceTest {

    private static final ObjectMapper MAPPER = new ObjectMapper();
    @Mock
    private CategoriaProductoRepository categoriaProductoRepository;
    @Mock
    private ProductoRepository productoRepository;
    @Mock
    private S3ImageService s3ImageService;
    private CategoriaProductoService service;

    @BeforeEach
    void setUp() {
        service = new CategoriaProductoService(categoriaProductoRepository,
                productoRepository, MAPPER, s3ImageService);
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
}

