package com.dh.catering.repository;

import com.dh.catering.domain.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol,Long> {

    Optional<Rol> getByNombre(String nombre);

    Optional<Rol> findById(Long id);

}
