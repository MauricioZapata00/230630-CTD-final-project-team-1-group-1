package com.dh.catering.controller;

import com.dh.catering.config.TestSecurityConfig;
import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.factory.UsuarioFactory;
import com.dh.catering.service.UsuarioService;
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
class UsuarioControllerTest {

    private static final String URL_TEMPLATE = "/usuarios/";
    private static final String REGISTRAR = URL_TEMPLATE + "registrar";
    private static final String LISTAR = URL_TEMPLATE + "todos";
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
        doReturn(Optional.of(EXITO)).when(usuarioService).save(any(UsuarioDto.class));
        mvc.perform(MockMvcRequestBuilders.post(REGISTRAR)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(dto)))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testRegistrarBadRequest() throws Exception {
        UsuarioDto dto = UsuarioFactory.iniciarUsuarioDto();
        dto.setApellido(null);
        doReturn(Optional.of(EXITO)).when(usuarioService).save(any(UsuarioDto.class));
        mvc.perform(MockMvcRequestBuilders.post(REGISTRAR)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(dto)))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void testListar() throws Exception {
        doReturn(List.of(UsuarioFactory.iniciarUsuarioDto())).when(usuarioService).listar();
        mvc.perform(MockMvcRequestBuilders.get(LISTAR))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    void testListarTodosPorRolId() throws Exception {
        doReturn(List.of(UsuarioFactory.iniciarUsuarioDto())).when(usuarioService).findAllByRolId(any());
        mvc.perform(MockMvcRequestBuilders.get(URL_TEMPLATE+"rolId/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").isArray());
    }

    @Test
    void testBuscarPorId() throws Exception {
        doReturn(Optional.of(UsuarioFactory.iniciarUsuarioDto())).when(usuarioService).getById(any());
        mvc.perform(MockMvcRequestBuilders.get(URL_TEMPLATE+"id/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").exists());
    }

    @Test
    void testBuscarPorEmail() throws Exception {
        doReturn(Optional.of(UsuarioFactory.iniciarUsuarioDto())).when(usuarioService).getByEmail(any());
        mvc.perform(MockMvcRequestBuilders.get(URL_TEMPLATE+"email/admin@gmail.com"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$").exists());
    }

    @Test
    void testEliminarPorId() throws Exception {
        var test = "test";
        doReturn(Optional.of(test)).when(usuarioService).deleteById(any());
        mvc.perform(MockMvcRequestBuilders.delete(URL_TEMPLATE+"eliminar/1"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().string(test));
    }
}

