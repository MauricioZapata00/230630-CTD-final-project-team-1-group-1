package com.dh.catering.service;

import com.dh.catering.domain.TokenConfirmacionCorreo;
import com.dh.catering.repository.TokenConfirmacionCorreoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TokenConfirmacionCorreoService {

    private final TokenConfirmacionCorreoRepository tokenConfirmacionCorreoRepository;

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
