package com.dh.catering.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "categoriaProducto")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class CategoriaProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(unique = true)
    private  String nombre;

    @Column
    private String imgUrl;

    @OneToMany(mappedBy = "categoriaProducto")
    private Set<Producto> productos = new HashSet<>();

    public CategoriaProducto(String nombre, String imgUrl) {
        this.nombre = nombre;
        this.imgUrl = imgUrl;
    }
}
