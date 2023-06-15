package com.dh.catering.repository;

import com.dh.catering.domain.TokenConfirmacionCorreo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface TokenConfirmacionCorreoRepository extends JpaRepository<TokenConfirmacionCorreo, Long> {

    Optional<TokenConfirmacionCorreo> findByToken(String token);

    @Modifying
    @Transactional
    void deleteByToken(String token);

    @Transactional
    @Modifying
    @Query("UPDATE TokenConfirmacionCorreo t " +
            "SET t.confirmedAt = ?2 " +
            "WHERE t.token = ?1")
    int updateConfirmedAt(String token, LocalDateTime confirmedAt);

}
