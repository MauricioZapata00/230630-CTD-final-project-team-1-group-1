package com.dh.catering.service;

import com.dh.catering.domain.Producto;
import com.dh.catering.domain.Reserva;
import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.ReservaDto;
import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.repository.ProductoRepository;
import com.dh.catering.repository.ReservaRepository;
import com.dh.catering.repository.UsuarioRepository;
import com.dh.catering.util.Util;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    public Optional<String> registrar(ReservaDto reservaDto) throws AsignacionException {
        String mensaje = null;
        List<String> fechasReservadas = obtenerFechasReservadasPorProductoId(reservaDto.getIdProducto());
        if (reservaDto != null){
            Integer restriccionDiasMinReserva = productoRepository.getReferenceById(reservaDto.getIdProducto()).getMinDiasReservaPrevia();
            if (ChronoUnit.DAYS.between(Util.obtenerFechaActual(),Util.convertirStringToLocalDate(reservaDto.getFechaReserva()))<restriccionDiasMinReserva){
                mensaje = "Este producto solo puede ser reservado como minimo " + restriccionDiasMinReserva + " días previos al evento.";
                log.error(mensaje);
                throw new AsignacionException(mensaje);
            }
            if (fechasReservadas.contains(reservaDto.getFechaReserva())){
                mensaje = "Este producto no esta disponible para la fecha que deseas reservar";
                log.error(mensaje);
                throw new AsignacionException(mensaje);
            }
            Producto producto = productoRepository.getReferenceById(reservaDto.getIdProducto());
            Usuario usuario = usuarioRepository.findByEmail(reservaDto.getEmailUsuario()).get();
            Reserva reserva = new Reserva(Util.convertirStringToLocalDate(reservaDto.getFechaReserva()),producto,usuario);
            reservaRepository.save(reserva);
            emailService.send(reservaDto.getEmailUsuario(),confirmacionReserva(usuario.getNombre(), producto.getNombre(), producto.getId(), reservaDto.getFechaReserva()));
            mensaje = "Ha realizado su reserva con exito!";
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public List<ReservaDto> listarTodos() {
        return reservaRepository.findAll().stream()
                .map(this::mapearReservaADto).toList();
    }

    public List<ReservaDto> buscarTodosPorProductoId(Long id) {
        return reservaRepository.findAllByProductoId(id).stream()
                .map(this::mapearReservaADto).toList();
    }

    public List<String> obtenerFechasReservadasPorProductoId(Long id){
        List<String> fechas = new ArrayList<>();
        List<ReservaDto> reservaDtoList = this.buscarTodosPorProductoId(id);
        for (ReservaDto reservaDto: reservaDtoList){
            String fecha = reservaDto.getFechaReserva();
            fechas.add(fecha);
        }
        return fechas;
    }

    public List<ReservaDto> buscarTodosPorUsuarioEmail(String email){
        return reservaRepository.findAllByEmail(email).stream()
                .map(this::mapearReservaADto).toList();
    }

    public Optional<ReservaDto> buscarPorId(Long id) throws RecursoNoEncontradoException {
        ReservaDto reservaDto = null;
        Optional<Reserva> optionalReserva = reservaRepository.findById(id);
        if (optionalReserva.isEmpty()){
            log.error("No existe una reserva con id: " + id);
            throw new RecursoNoEncontradoException("No existe una reserva con id: " + id);
        }
        Reserva reserva = optionalReserva.get();
        return Optional.ofNullable(mapearReservaADto(reserva));
    }

    public Optional<String> eliminarPorId(Long id) throws RecursoNoEncontradoException {
        String mensaje = null;
        Optional<ReservaDto> optionalReservaDto = this.buscarPorId(id);
        if (optionalReservaDto.isPresent()){
            reservaRepository.deleteById(id);
            mensaje = "Se elimino exitosamente la reserva con id: " + id;
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public Optional<String> actualizarPorId(Long id, ReservaDto reservaDto) throws RecursoNoEncontradoException, AsignacionException {
        String mensaje = null;
        this.eliminarPorId(id);
        this.registrar(reservaDto);
        mensaje = "La reserva fue actualizada exitosamente!";
        log.info(mensaje);
        return Optional.ofNullable(mensaje);
    }

    private String confirmacionReserva(String nombreUsuario, String nombreProducto, Long idProducto, String fechaReserva) {
        String emailContent = "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
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
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Confirmación de reserva</span>\n" +
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
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Hola " + nombreUsuario + ",</p>\n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Has realizado la reserva del producto '" + nombreProducto + "' con ID " + idProducto + " para el día " + fechaReserva + ".</p>\n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">¡Disfruta de tu producto!</p>\n" +
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

        return emailContent;
    }


    private ReservaDto mapearReservaADto(Reserva reserva) {
        return ReservaDto.builder()
                .id(reserva.getId())
                .fechaCreacion(reserva.getFechaCreacion())
                .fechaReserva(Util.convertirLocalDateToString(reserva.getFechaReserva()))
                .emailUsuario(reserva.getUsuario().getEmail())
                .valorReserva(reserva.getValorReserva())
                .imagenUrl(reserva.getProducto().getImagenUrl())
                .nombreProducto(reserva.getProducto().getNombre())
                .build();
    }

}
