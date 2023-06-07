package com.dh.catering.configuration;

import com.dh.catering.domain.Usuario;
import com.dh.catering.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserInfoToUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);
        return optionalUsuario.map(UserEntityToUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("No existe usuario con email: " + email));

    }
}
