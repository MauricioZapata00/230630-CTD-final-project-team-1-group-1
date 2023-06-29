package com.dh.catering.service;


import com.dh.catering.factory.TokenConfirmacionCorreoFactory;
import com.dh.catering.repository.TokenConfirmacionCorreoRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class TokenConfirmacionCorreoServiceTest {

    @Mock
    private TokenConfirmacionCorreoRepository tokenConfirmacionCorreoRepository;
    private TokenConfirmacionCorreoService service;

    @BeforeEach
    void setUp() {
        service = new TokenConfirmacionCorreoService(tokenConfirmacionCorreoRepository);
    }

    @Test
    void testSaveConfirmationToken() {
        var token = TokenConfirmacionCorreoFactory.iniciarToken();
        doReturn(token).when(tokenConfirmacionCorreoRepository).save(any());
        service.saveConfirmationToken(token);
        verify(tokenConfirmacionCorreoRepository).save(any());
    }

    @Test
    void testGetConfirmationToken() {
        var token = TokenConfirmacionCorreoFactory.iniciarToken();
        doReturn(Optional.of(token)).when(tokenConfirmacionCorreoRepository).findByToken(anyString());
        var resultado = service.getConfirmationToken(token.getToken());
        Assertions.assertTrue(resultado.isPresent());
    }

    @Test
    void testSetConfirmedAt() {
        var token = TokenConfirmacionCorreoFactory.iniciarToken().getToken();
        doReturn(1).when(tokenConfirmacionCorreoRepository).updateConfirmedAt(anyString(), any());
        service.setConfirmedAt(token);
        verify(tokenConfirmacionCorreoRepository).updateConfirmedAt(anyString(), any());
    }
}

