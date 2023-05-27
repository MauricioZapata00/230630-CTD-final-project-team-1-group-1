package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Builder
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
public class LoginDto {

    @NotBlank(message = "La contrase\u00f1a no debe estar vacia")
    private String contrasena;
    @NotBlank(message = "El email no debe estar vacio")
    private String email;
}

