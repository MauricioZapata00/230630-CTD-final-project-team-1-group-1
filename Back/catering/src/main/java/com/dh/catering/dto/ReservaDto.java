package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaDto {

    private Long id;

    private LocalDate fechaCreacion;
    private String fechaReserva;
    private Long idProducto;
    private String emailUsuario;

    private Double valorReserva;

    public ReservaDto(String fechaReserva, Long idProducto, String emailUsuario) {
        this.fechaReserva = fechaReserva;
        this.idProducto = idProducto;
        this.emailUsuario = emailUsuario;
    }
}
