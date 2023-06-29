package com.dh.catering.repository;

import com.dh.catering.domain.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    Optional<Reserva> findById(Long id);

    @Query("SELECT r FROM Reserva r WHERE r.producto.id = :id")
    List<Reserva> findAllByProductoId(@Param("id") Long id);

    @Query("SELECT r FROM Reserva r WHERE r.producto.nombre = :nombre")
    List<Reserva> findAllByProductoNombre(@Param("nombre") String nombre);

    @Query("SELECT r FROM Reserva r WHERE r.usuario.email = :email")
    List<Reserva> findAllByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    void deleteById(Long id);
}
