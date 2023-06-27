package com.dh.catering.service;

import com.dh.catering.domain.Producto;
import com.dh.catering.domain.Reserva;
import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.ReservaDto;
import com.dh.catering.dto.ReservaXUsuarioDto;
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

    public Optional<String> registrar(ReservaDto reservaDto) throws AsignacionException {
        String mensaje = null;
        if (reservaDto != null){
            Integer restriccionDiasMinReserva = productoRepository.getReferenceById(reservaDto.getIdProducto()).getMinDiasReservaPrevia();
            if (ChronoUnit.DAYS.between(Util.obtenerFechaActual(),Util.convertirStringToLocalDate(reservaDto.getFechaReserva()))<restriccionDiasMinReserva){
                mensaje = "Este producto solo puede ser reservado como minimo " + restriccionDiasMinReserva + " días previos al evento.";
                log.error(mensaje);
                throw new AsignacionException(mensaje);
            }
            Producto producto = productoRepository.getReferenceById(reservaDto.getIdProducto());
            Usuario usuario = usuarioRepository.findByEmail(reservaDto.getEmailUsuario()).get();
            Reserva reserva = new Reserva(Util.convertirStringToLocalDate(reservaDto.getFechaReserva()),producto,usuario);
            reservaRepository.save(reserva);
            mensaje = "Ha realizado su reserva con exito!";
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public List<ReservaDto> listarTodos(){
        List<ReservaDto> reservaDtoList = new ArrayList<>();
        List<Reserva> reservas = reservaRepository.findAll();
        for (Reserva reserva: reservas){
            ReservaDto reservaDto = new ReservaDto(reserva.getId(),reserva.getFechaCreacion(),Util.convertirLocalDateToString(reserva.getFechaReserva()),reserva.getProducto().getId(),reserva.getUsuario().getEmail(),reserva.getValorReserva());
            reservaDtoList.add(reservaDto);
        }
        return reservaDtoList;
    }

    public List<ReservaDto> buscarTodosPorProductoId(Long id){
        List<ReservaDto> reservaDtoList = new ArrayList<>();
        List<Reserva> reservas = reservaRepository.findAllByProductoId(id);
        for (Reserva reserva: reservas){
            ReservaDto reservaDto = new ReservaDto(reserva.getId(),reserva.getFechaCreacion(),Util.convertirLocalDateToString(reserva.getFechaReserva()),reserva.getProducto().getId(),reserva.getUsuario().getEmail(),reserva.getValorReserva());
            reservaDtoList.add(reservaDto);
        }
        return reservaDtoList;
    }

    public List<ReservaXUsuarioDto> buscarTodosPorProductoNombre(String nombre){
        return reservaRepository.findAllByProductoNombre(nombre).stream()
                .map(reserva ->
                        ReservaXUsuarioDto.builder()
                                .idProducto(reserva.getProducto().getId())
                                .fechaReserva(Util.convertirLocalDateToString(reserva.getFechaReserva()))
                                .valorReserva(reserva.getValorReserva())
                                .emailUsuario(reserva.getUsuario().getEmail())
                                .fechaCreacion(reserva.getFechaCreacion())
                                .imagenUrl(reserva.getProducto().getImagenUrl())
                                .build()
        ).toList();
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
        List<ReservaDto> reservaDtoList = new ArrayList<>();
        List<Reserva> reservas = reservaRepository.findAllByEmail(email);
        for (Reserva reserva: reservas){
            ReservaDto reservaDto = new ReservaDto(reserva.getId(),reserva.getFechaCreacion(),Util.convertirLocalDateToString(reserva.getFechaReserva()),reserva.getProducto().getId(),reserva.getUsuario().getEmail(),reserva.getValorReserva());
            reservaDtoList.add(reservaDto);
        }
        return reservaDtoList;
    }

    public Optional<ReservaDto> buscarPorId(Long id) throws RecursoNoEncontradoException {
        ReservaDto reservaDto = null;
        Optional<Reserva> optionalReserva = reservaRepository.findById(id);
        if (optionalReserva.isEmpty()){
            log.error("No existe una reserva con id: " + id);
            throw new RecursoNoEncontradoException("No existe una reserva con id: " + id);
        }
        Reserva reserva = optionalReserva.get();
        reservaDto = new ReservaDto(reserva.getId(),reserva.getFechaCreacion(),Util.convertirLocalDateToString(reserva.getFechaReserva()),reserva.getProducto().getId(),reserva.getUsuario().getEmail(),reserva.getValorReserva());
        return Optional.ofNullable(reservaDto);
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

}
