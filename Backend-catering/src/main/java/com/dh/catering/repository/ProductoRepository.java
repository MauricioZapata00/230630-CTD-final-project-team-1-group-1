package com.dh.catering.repository;

import com.dh.catering.domain.Producto;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    Optional<Producto> getByNombre(String nombre);

    @Modifying
    @Transactional
    void deleteByNombre(String nombre);

}
