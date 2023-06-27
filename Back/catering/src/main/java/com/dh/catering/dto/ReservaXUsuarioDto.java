package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
public class ReservaXUsuarioDto {
    private Long id;
    private LocalDate fechaCreacion;
    private String fechaReserva;
    private Long idProducto;
    private String emailUsuario;
    private Double valorReserva;
    private String imagenUrl;
}

