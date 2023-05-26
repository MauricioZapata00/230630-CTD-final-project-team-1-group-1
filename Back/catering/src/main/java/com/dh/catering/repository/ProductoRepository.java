package com.dh.catering.repository;

import com.dh.catering.domain.Producto;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    Optional<Producto> getByNombre(String nombre);

    Optional<Producto> findById(Long id);
    @Query("SELECT p FROM Producto p WHERE p.categoriaProducto.id = :categoriaId")
    Page<Producto> findAllByCategoriaId(@Param("categoriaId") Long categoriaId, Pageable paging);

    @Query("SELECT p FROM Producto p WHERE p.categoriaProducto.id = :categoriaId")
    List<Producto> findAllByCategoriaId(@Param("categoriaId") Long categoriaId);

}
