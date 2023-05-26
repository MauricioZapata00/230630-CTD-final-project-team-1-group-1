package com.dh.catering.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "producto")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(unique = true)
    private String nombre;

    @Column
    private String descripcion;

    @Column
    private Double precio;

    @Column(length = 500)
    private String imagenUrl;

    @Column
    private Integer cantMin;

    @Column
    private Boolean requierePagoAnticipado;

    @Column
    private Integer minDiasReservaPrevia;

    @Column
    private Boolean permiteCambios;

    @ManyToOne
    @JoinColumn(name = "categoria_producto_id")
    private CategoriaProducto categoriaProducto;

    public Producto(String nombre, String descripcion, Double precio, String imagenUrl, Integer cantMin, Boolean requierePagoAnticipado, Integer minDiasReservaPrevia, Boolean permiteCambios, CategoriaProducto categoriaProducto) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagenUrl = imagenUrl;
        this.cantMin = cantMin;
        this.requierePagoAnticipado = requierePagoAnticipado;
        this.minDiasReservaPrevia = minDiasReservaPrevia;
        this.permiteCambios = permiteCambios;
        this.categoriaProducto = categoriaProducto;
    }
}
