package com.dh.catering.factory;

import com.dh.catering.domain.TokenConfirmacionCorreo;
import com.dh.catering.domain.Usuario;
import lombok.experimental.UtilityClass;

import java.time.LocalDateTime;

@UtilityClass
public final class TokenConfirmacionCorreoFactory {

    public static TokenConfirmacionCorreo iniciarToken() {
        TokenConfirmacionCorreo tcc = new TokenConfirmacionCorreo();
        tcc.setToken("test");
        tcc.setId(1L);
        tcc.setUsuario(new Usuario());
        tcc.setConfirmedAt(LocalDateTime.now());
        tcc.setExpiresAt(LocalDateTime.now());
        return tcc;
    }
}

