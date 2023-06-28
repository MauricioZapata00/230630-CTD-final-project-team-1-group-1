package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.sql.Timestamp;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaDto {

    private Long id;

    private LocalDate fechaCreacion;
    private String fechaReserva;
    private Long idProducto;
    private String nombreProducto;
    private String imagenUrl;
    private String emailUsuario;
    private Double valorReserva;

}
