package com.dh.catering.repository;

import com.dh.catering.domain.Puntuacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PuntuacionRepository extends JpaRepository<Puntuacion, Long> {

    @Query("SELECT p FROM Puntuacion p WHERE p.usuario.id = :usuarioId")
    List<Puntuacion> findAllByUsuarioId(Long usuarioId);

    @Query("SELECT p FROM Puntuacion p WHERE p.producto.id = :productoId")
    List<Puntuacion> findAllByProductoId(Long productoId);

}
