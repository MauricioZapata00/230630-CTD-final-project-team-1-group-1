package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CategoriaProductoDto {

    private Long id;
    private String nombre;
    private String imgUrl;

    public CategoriaProductoDto(String nombre, String imgUrl) {
        this.nombre = nombre;
        this.imgUrl = imgUrl;
    }
}
