package com.dh.catering.domain;

import com.dh.catering.util.Util;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "reserva")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column
    private LocalDate fechaCreacion;

    @Column
    private LocalDate fechaReserva;

    @ManyToOne
    @JoinColumn(name = "idProducto")
    private Producto producto;

    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private Usuario usuario;

    @Column
    private Double valorReserva;

    public Reserva(LocalDate fechaReserva, Producto producto, Usuario usuario) {
        this.fechaCreacion = Util.obtenerFechaActual();
        this.fechaReserva = fechaReserva;
        this.producto = producto;
        this.usuario = usuario;
        this.valorReserva = producto.getPrecio();
    }
}
