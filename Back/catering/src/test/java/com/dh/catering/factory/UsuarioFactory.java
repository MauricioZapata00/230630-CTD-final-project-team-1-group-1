package com.dh.catering.factory;

import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.UsuarioDto;
import lombok.experimental.UtilityClass;

@UtilityClass
public final class UsuarioFactory {

    public static Usuario iniciarUsuario() {
        return Usuario.builder()
                .id(1L)
                .nombre("Pepito")
                .apellido("Perez")
                .contrasena("no es una clave")
                .email("pepito.perez@gmail.com")
                .build();
    }

    public static UsuarioDto iniciarUsuarioDto() {
        return UsuarioDto.builder()
                .nombre("Pepito")
                .apellido("Perez")
                .contrasena("no es una clave")
                .email("pepito.perez@gmail.com")
                .build();
    }
}

