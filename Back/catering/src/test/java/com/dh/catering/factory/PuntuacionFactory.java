package com.dh.catering.factory;

import com.dh.catering.domain.Producto;
import com.dh.catering.domain.Puntuacion;
import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.PuntuacionDto;
import lombok.experimental.UtilityClass;

@UtilityClass
public final class PuntuacionFactory {

    public static Puntuacion iniciarPuntuacion() {
        return Puntuacion.builder()
                .id(1L)
                .nota(3)
                .usuario(new Usuario())
                .producto(new Producto())
                .build();
    }

    public static PuntuacionDto iniciarPuntuacionDto() {
        return PuntuacionDto.builder()
                .nota(3)
                .usuarioId(1L)
                .productoId(1L)
                .build();
    }
}

