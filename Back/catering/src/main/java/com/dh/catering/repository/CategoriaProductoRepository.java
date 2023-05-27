package com.dh.catering.repository;

import com.dh.catering.domain.CategoriaProducto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoriaProductoRepository extends JpaRepository<CategoriaProducto, Long> {

    Optional<CategoriaProducto> getByNombre(String nombre);

    Optional<CategoriaProducto> findById(Long id);
}
