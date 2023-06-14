package com.dh.catering.service;

import com.dh.catering.domain.TokenConfirmacionCorreo;
import com.dh.catering.repository.TokenConfirmacionCorreoRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TokenConfirmacionCorreoService {

    @Autowired
    private TokenConfirmacionCorreoRepository tokenConfirmacionCorreoRepository;

    public void saveConfirmationToken(TokenConfirmacionCorreo token) {
        tokenConfirmacionCorreoRepository.save(token);
    }

    public Optional<TokenConfirmacionCorreo> getConfirmationToken(String token) {
        return tokenConfirmacionCorreoRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return tokenConfirmacionCorreoRepository.updateConfirmedAt(token, LocalDateTime.now());
    }

}
