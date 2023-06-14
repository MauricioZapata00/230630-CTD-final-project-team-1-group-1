package com.dh.catering.domain;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tokenConfirmacionCorreo")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,property = "id")
public class TokenConfirmacionCorreo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(nullable = false)
    private String token;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime expiresAt;

    private LocalDateTime confirmedAt;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public TokenConfirmacionCorreo(String token, LocalDateTime createdAt, LocalDateTime expiresAt, Usuario usuario) {
        this.token = token;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
        this.usuario = usuario;
    }
}
