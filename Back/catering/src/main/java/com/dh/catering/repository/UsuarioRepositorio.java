package com.dh.catering.repository;

import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.UsuarioDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    Optional<UsuarioDto> save(UsuarioDto dto);

    Optional<Usuario> findByEmail(String email);

}
