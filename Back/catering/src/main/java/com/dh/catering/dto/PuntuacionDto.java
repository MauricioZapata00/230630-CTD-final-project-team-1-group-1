package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
public class PuntuacionDto {

    @NotNull(message = "El id del usuario es requerido")
    private Long usuarioId;
    @NotNull(message = "El id del producto es requerido")
    private Long productoId;
    @NotNull(message = "La nota es requerida")
    @Min(value = 1, message = "El valor m\u00ednimo es 1")
    @Max(value = 5, message = "El valor m\u00e1ximo es 5")
    private Integer nota;
}
