package com.dh.catering.service;

import com.dh.catering.domain.TokenConfirmacionCorreo;
import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.UsuarioDto;
import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.DuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.repository.ReservaRepository;
import com.dh.catering.repository.RolRepository;
import com.dh.catering.repository.TokenConfirmacionCorreoRepository;
import com.dh.catering.repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenConfirmacionCorreoService tokenConfirmacionCorreoService;

    @Autowired
    private TokenConfirmacionCorreoRepository tokenConfirmacionCorreoRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private ReservaRepository reservaRepository;

    @Value("${user.service.url.confirmation}")
    private String confirmationUrl;

    public Optional<String> save(UsuarioDto dto) throws DuplicadoException {
        String mensaje = null;
        String token = UUID.randomUUID().toString();
        String link = confirmationUrl + "/usuarios/confirmar/" + token;
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(dto.getEmail());
        if (optionalUsuario.isPresent()) {
            if (optionalUsuario.get().getEstaHabilitado()==true){
                log.error("El usuario con email: " + dto.getEmail() + " ya existe y esta confirmado");
                throw new DuplicadoException("El usuario con email: " + dto.getEmail() + " ya existe y esta confirmado");
            }

            emailService.send(dto.getEmail(), buildEmail(dto.getNombre(), link));
            mensaje = "El usuario con email: " + dto.getEmail() + " ya habia sido creado pero no confirmado. " +
                    "Enviamos nuevamente el correo de confirmacion, recuerda que tienes 1 hora para confirmar tu correo.";
            log.info(mensaje);
            return Optional.ofNullable(mensaje);

        }
        Usuario usuario = mapper.convertValue(dto, Usuario.class);
        usuario.setRol(rolRepository.getByNombre(dto.getRolName()).get());
        usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        usuarioRepository.save(usuario);

        TokenConfirmacionCorreo tokenConfirmacionCorreo =new TokenConfirmacionCorreo(
                token, LocalDateTime.now(),LocalDateTime.now().plusMinutes(60),usuario
        );

        tokenConfirmacionCorreoService.saveConfirmationToken(tokenConfirmacionCorreo);

        emailService.send(dto.getEmail(),buildEmail(dto.getNombre(), link));

        mensaje = "Se ha enviado un correo para confirmar su email, favor revisar su bandeja de entrada. Recuerde que posee 1 hora para activar su usuario. El correo fue enviado a : " + dto.getEmail() ;

        log.info(mensaje);
        return Optional.ofNullable(mensaje);
    }

    public List<UsuarioDto> listar() {
        List<UsuarioDto> usuarioDtos = new ArrayList<>();
        List<Usuario> usuarios = usuarioRepository.findAll();
        for (Usuario usuario: usuarios){
            UsuarioDto usuarioDto = mapper.convertValue(usuario,UsuarioDto.class);
            usuarioDto.setRolName(usuario.getRol().getNombre());
            usuarioDtos.add(usuarioDto);
        }
        return usuarioDtos;
    }

    public List<UsuarioDto> findAllByRolId(Long id) {
        List<UsuarioDto> usuarioDtos = new ArrayList<>();
        List<Usuario> usuarios = usuarioRepository.findAllByRolId(id);
        for (Usuario usuario:usuarios){
            UsuarioDto usuarioDto = mapper.convertValue(usuario,UsuarioDto.class);
            usuarioDto.setRolName(usuario.getRol().getNombre());
            usuarioDtos.add(usuarioDto);
        }
        return usuarioDtos;
    }

    public Optional<UsuarioDto> getById(Long id) throws RecursoNoEncontradoException {
        UsuarioDto usuarioDto = null;
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isEmpty()){
            log.error("No existe un usuario con el id: " + id);
            throw new RecursoNoEncontradoException("No existe un usuario con el id: " + id);
        }
        usuarioDto = mapper.convertValue(optionalUsuario.get(),UsuarioDto.class);
        usuarioDto.setRolName(optionalUsuario.get().getRol().getNombre());
        return  Optional.ofNullable(usuarioDto);
    }

    public Optional<UsuarioDto> getByEmail(String email) throws RecursoNoEncontradoException {
        UsuarioDto usuarioDto = null;
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);
        if (optionalUsuario.isEmpty()){
            log.error("No existe un usuario con el email: " + email);
            throw new RecursoNoEncontradoException("No existe un usuario con el email: " + email);
        }
        usuarioDto = mapper.convertValue(optionalUsuario.get(),UsuarioDto.class);
        usuarioDto.setRolName(optionalUsuario.get().getRol().getNombre());
        return  Optional.ofNullable(usuarioDto);
    }

    public Optional<String> deleteById(Long id) throws RecursoNoEncontradoException, AsignacionException {
        String mensaje = null;
        Optional<UsuarioDto> optionalUsuarioDto = this.getById(id);
        if (optionalUsuarioDto.isPresent()) {
            validarSiPuedeSerEditado(optionalUsuarioDto.get().getEmail());
            usuarioRepository.deleteById(id);
            mensaje = "Se elimino exitosamente el usuario con id: " + id;
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public Optional<String> updateById(Long id, UsuarioDto usuarioDto) throws RecursoNoEncontradoException, DuplicadoException, AsignacionException {
        String mensaje = null;
        this.deleteById(id);
        this.save(usuarioDto);
        mensaje = "Se actualizo correctamente el usuario que tenia el id: " + id + ". Al usuario actualizado se le asigno el id: " + this.getByEmail(usuarioDto.getEmail()).get().getId();
        log.info(mensaje);
        return Optional.ofNullable(mensaje);
    }


    @Transactional
    public Optional<String> confirmarToken(String token) throws RecursoNoEncontradoException, DuplicadoException {
        String mensaje = null;
        Optional<TokenConfirmacionCorreo> optionalTokenConfirmacionCorreo = tokenConfirmacionCorreoService.getConfirmationToken(token);

        if (optionalTokenConfirmacionCorreo.isEmpty()){
            throw new RecursoNoEncontradoException("Token no encontrado");
        }

        if (optionalTokenConfirmacionCorreo.get().getConfirmedAt() != null){
            throw new DuplicadoException("Este email ya habia sido confirmado");
        }

        LocalDateTime expiredAt = optionalTokenConfirmacionCorreo.get().getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("el token expiro, debes registrarte nuevamente");
        }

        tokenConfirmacionCorreoService.setConfirmedAt(token);

        habilitarUsuario(optionalTokenConfirmacionCorreo.get().getUsuario().getEmail());

        mensaje = "Se habilito exitosamente al usuario!";

        emailService.send(optionalTokenConfirmacionCorreo.get().getUsuario().getEmail(),
                confirmEmail(optionalTokenConfirmacionCorreo.get().getUsuario().getNombre()));

        log.info(mensaje);

        tokenConfirmacionCorreoRepository.deleteByToken(token);

        return Optional.ofNullable(mensaje);

    }

    public int habilitarUsuario(String email){
        return usuarioRepository.habilitarUsuario(email);
    }

    private void validarSiPuedeSerEditado(String email) throws AsignacionException {
        if (!reservaRepository.findAllByEmail(email).isEmpty()) {
            throw new AsignacionException("No se puede modificar el usuario porque esta asociado a alguna reserva");
        }
    }

    private String buildEmail(String nombre, String link) {
        return "<div style=\"font-family: Helvetica, Arial, sans-serif; font-size: 16px; margin: 0; color: #0b0c0c\">\n" +
                "\n" +
                "<span style=\"display: none; font-size: 1px; color: #fff; max-height: 0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse: collapse; min-width: 100%; width: 100% !important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody>\n" +
                "      <tr>\n" +
                "        <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "          \n" +
                "          <table role=\"presentation\" width=\"100%\" style=\"border-collapse: collapse; max-width: 580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "            <tbody>\n" +
                "              <tr>\n" +
                "                <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                  <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse: collapse\">\n" +
                "                    <tbody>\n" +
                "                      <tr>\n" +
                "                        <td style=\"padding-left: 10px\"></td>\n" +
                "                        <td style=\"font-size: 28px; line-height: 1.315789474; Margin-top: 4px; padding-left: 10px\">\n" +
                "                          <span style=\"font-family: Helvetica, Arial, sans-serif; font-weight: 700; color: #ffffff; text-decoration: none; vertical-align: top; display: inline-block\">Confirma tu correo electrónico</span>\n" +
                "                        </td>\n" +
                "                      </tr>\n" +
                "                    </tbody>\n" +
                "                  </table>\n" +
                "                </td>\n" +
                "              </tr>\n" +
                "            </tbody>\n" +
                "          </table>\n" +
                "          \n" +
                "        </td>\n" +
                "      </tr>\n" +
                "    </tbody>\n" +
                "  </table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse: collapse; max-width: 580px; width: 100% !important\" width=\"100%\">\n" +
                "    <tbody>\n" +
                "      <tr>\n" +
                "        <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "        <td>\n" +
                "          \n" +
                "          <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse: collapse\">\n" +
                "            <tbody>\n" +
                "              <tr>\n" +
                "                <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "              </tr>\n" +
                "            </tbody>\n" +
                "          </table>\n" +
                "          \n" +
                "        </td>\n" +
                "        <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "      </tr>\n" +
                "    </tbody>\n" +
                "  </table>\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse: collapse; max-width: 580px; width: 100% !important\" width=\"100%\">\n" +
                "    <tbody>\n" +
                "      <tr>\n" +
                "        <td height=\"30\"><br></td>\n" +
                "      </tr>\n" +
                "      <tr>\n" +
                "        <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "        <td style=\"font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; max-width: 560px\">\n" +
                "          \n" +
                "          <p style=\"Margin: 0 0 20px 0; font-size: 19px; line-height: 25px; color: #0b0c0c\">Hola " + nombre + ",</p>\n" +
                "          <p style=\"Margin: 0 0 20px 0; font-size: 19px; line-height: 25px; color: #0b0c0c\">Gracias por registrarte. Por favor, haz clic en el siguiente enlace para activar tu cuenta:</p>\n" +
                "          <blockquote style=\"Margin: 0 0 20px 0; border-left: 10px solid #b1b4b6; padding: 15px 0 0.1px 15px; font-size: 19px; line-height: 25px\">\n" +
                "            <p style=\"Margin: 0 0 20px 0; font-size: 19px; line-height: 25px; color: #0b0c0c\"><a href=\"" + link + "\">Activar Ahora</a></p>\n" +
                "          </blockquote>\n" +
                "          El enlace expirará en 1 hora. <p>Hasta pronto</p>\n" +
                "          \n" +
                "        </td>\n" +
                "        <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      </tr>\n" +
                "      <tr>\n" +
                "        <td height=\"30\"><br></td>\n" +
                "      </tr>\n" +
                "    </tbody>\n" +
                "  </table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    private String confirmEmail(String name) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirmación de cuenta</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">¡Hola " + name + ",</p>\n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Tu cuenta en Catering ha sido creada exitosamente!</p>\n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Ya puedes ir al sitio web e iniciar sesion con tus credenciales.</p>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }



}
