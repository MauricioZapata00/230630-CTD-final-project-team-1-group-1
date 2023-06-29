package com.dh.catering.controller;

import com.dh.catering.config.TestSecurityConfig;
import com.dh.catering.dto.PuntuacionDto;
import com.dh.catering.factory.PuntuacionFactory;
import com.dh.catering.factory.UsuarioFactory;
import com.dh.catering.service.PuntuacionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;

@SpringBootTest
@Import(TestSecurityConfig.class)
@ActiveProfiles("test")
@AutoConfigureMockMvc
class PuntuacionControllerTest {

    private static final String URL_TEMPLATE = "/puntuaciones/";
    private static final String EXITO = "Exito";
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private MockMvc mvc;
    @MockBean
    private PuntuacionService puntuacionService;

    @Test
    void testGuardar() throws Exception {
        var data = PuntuacionFactory.iniciarPuntuacionDto();
        doReturn(Optional.of(EXITO)).when(puntuacionService).save(any(PuntuacionDto.class));
        mvc.perform(MockMvcRequestBuilders.post(URL_TEMPLATE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(data)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testGuardarBadRequest() throws Exception {
        var data = PuntuacionFactory.iniciarPuntuacionDto();
        data.setProductoId(null);
        doReturn(Optional.of(EXITO)).when(puntuacionService).save(any(PuntuacionDto.class));
        mvc.perform(MockMvcRequestBuilders.post(URL_TEMPLATE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(data)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void testListar() throws Exception {
        doReturn(List.of(UsuarioFactory.iniciarUsuarioDto())).when(puntuacionService).findAll();
        mvc.perform(MockMvcRequestBuilders.get(URL_TEMPLATE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    void testListarPorUsuario() throws Exception {
        doReturn(List.of(3)).when(puntuacionService).findAllByUsuarioId(any());
        mvc.perform(MockMvcRequestBuilders.get(URL_TEMPLATE+"usuarios/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    void testListarPorProducto() throws Exception {
        doReturn(List.of(3)).when(puntuacionService).findAllByProductoId(any());
        mvc.perform(MockMvcRequestBuilders.get(URL_TEMPLATE+"productos/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }
}

