package com.dh.catering.controller;

import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.factory.UsuarioFactory;
import com.dh.catering.service.UsuarioService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.willReturn;

@WebMvcTest(UsuarioController.class)
class UsuarioControllerTest {

    private static final String URL_TEMPLATE = "/usuarios/";
    private static final String EXITO = "Exito";
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private MockMvc mvc;
    @MockBean
    private UsuarioService usuarioService;

    @Test
    void testRegistrar() throws Exception {
        UsuarioDto dto = UsuarioFactory.iniciarUsuarioDto();
        willReturn(Optional.of(EXITO)).given(usuarioService).save(any(UsuarioDto.class));
        mvc.perform(MockMvcRequestBuilders.post(URL_TEMPLATE)
                .contentType(MediaType.APPLICATION_JSON)
                .content(mapper.writeValueAsString(dto)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testRegistrarBadRequest() throws Exception {
        UsuarioDto dto = UsuarioFactory.iniciarUsuarioDto();
        dto.setApellido(null);
        willReturn(Optional.of(EXITO)).given(usuarioService).save(any(UsuarioDto.class));
        mvc.perform(MockMvcRequestBuilders.post(URL_TEMPLATE)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(dto)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void testListar() throws Exception {
        willReturn(List.of(UsuarioFactory.iniciarUsuarioDto())).given(usuarioService).listar();
        mvc.perform(MockMvcRequestBuilders.get(URL_TEMPLATE))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }


}

