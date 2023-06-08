package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.extern.jackson.Jacksonized;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Jacksonized
@JsonIgnoreProperties(ignoreUnknown = true)
public class UsuarioDto {

    private Long id;

    @NotBlank(message = "El nombre no debe estar vacio")
    @Size(min = 4, message = "El nombre debe tener al menos 4 caracteres")
    @Pattern(
            regexp =
                    "^[A-Za-z\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00dc\u00fc\\s]+$",
            message = "El nombre s\u00f3lo puede ser compuesto por el alfabeto y espacios")
    private String nombre;

    @NotBlank(message = "El apellido no debe estar vacio")
    @Size(min = 4, message = "El apellido debe tener al menos 4 caracteres")
    @Pattern(
            regexp =
                    "^[A-Za-z\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00dc\u00fc\\s]+$",
            message = "El apellido s\u00f3lo puede ser compuesto por el alfabeto y espacios")
    private String apellido;

    @NotBlank(message = "La contrase\u00f1a no debe estar vacia")
    @Size(min = 8, message = "La contrase\u00f1a debe tener al menos 8 caracteres")
    private String contrasena;

    @NotBlank(message = "El email no debe estar vacio")
    @Size(min = 4, message = "El email debe tener al menos 4 caracteres")
    @Pattern(regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$", message = "El email debe ser v\u00e1lido")
    private String email;

    private String rolName;

    public UsuarioDto(String nombre, String apellido, String contrasena, String email, String rolName) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.contrasena = contrasena;
        this.email = email;
        this.rolName = rolName;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", nombre='" + nombre + '\'' +
                ", apellido='" + apellido + '\'' +
                ", contrasena='" + contrasena + '\'' +
                ", email='" + email + '\'' +
                ", rolName='" + rolName + '\'' +
                '}';
    }
}
