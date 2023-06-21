package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaDto {

    private Long id;
    private Timestamp fechaReserva;
    private Long idProducto;
    private String emailUsuario;
    private Double valorReserva;

    public ReservaDto(Timestamp fechaReserva, Long idProducto, String emailUsuario) {
        this.fechaReserva = fechaReserva;
        this.idProducto = idProducto;
        this.emailUsuario = emailUsuario;
    }
}
