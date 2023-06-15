package com.dh.catering.repository;

import com.dh.catering.domain.Producto;
import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.UsuarioDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
    public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    Optional<Usuario> findById(Long id);

    @Query("SELECT u FROM Usuario u WHERE u.rol.id = :rolId")
    List<Usuario> findAllByRolId(@Param("rolId") Long rolId);

    @Transactional
    @Modifying
    @Query("UPDATE Usuario u " +
            "SET u.estaHabilitado = TRUE WHERE u.email = ?1")
    int habilitarUsuario(String email);

}
