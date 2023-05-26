package com.dh.catering.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductoDto {

    private Long id;
    private String nombre;
    private String descripcion;
    private Double precio;
    private String imagenUrl;
    private Integer cantMin;
    private Boolean requierePagoAnticipado;
    private Integer minDiasReservaPrevia;
    private Boolean permiteCambios;
    private String nombreCategoria;

    public ProductoDto(String nombre, String descripcion, Double precio, String imagenUrl, Integer cantMin, Boolean requierePagoAnticipado, Integer minDiasReservaPrevia, Boolean permiteCambios, String nombreCategoria) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenUrl = imagenUrl;
        this.cantMin = cantMin;
        this.requierePagoAnticipado = requierePagoAnticipado;
        this.minDiasReservaPrevia = minDiasReservaPrevia;
        this.permiteCambios = permiteCambios;
        this.nombreCategoria = nombreCategoria;
    }
}
