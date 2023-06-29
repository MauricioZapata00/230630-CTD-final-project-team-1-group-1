package com.dh.catering.factory;

import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.UsuarioDto;
import lombok.experimental.UtilityClass;

@UtilityClass
public final class UsuarioFactory {

    public static Usuario iniciarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setId(1L);
        usuario.setNombre("Pepito");
        usuario.setApellido("Perez");
        usuario.setContrasena("no es una clave");
        usuario.setEmail("pepito.perez@gmail.com");
        return usuario;
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
