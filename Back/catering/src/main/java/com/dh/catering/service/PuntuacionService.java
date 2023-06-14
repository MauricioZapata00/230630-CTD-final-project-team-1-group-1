package com.dh.catering.service;

import com.dh.catering.domain.Producto;
import com.dh.catering.domain.Puntuacion;
import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.PuntuacionDto;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.repository.ProductoRepository;
import com.dh.catering.repository.PuntuacionRepository;
import com.dh.catering.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PuntuacionService {
    @Autowired
    private final ProductoRepository productoRepository;
    @Autowired
    private final UsuarioRepository usuarioRepository;
    @Autowired
    private final PuntuacionRepository puntuacionRepository;

    public Optional<String> save(PuntuacionDto dto) throws RecursoNoEncontradoException {
        Producto producto = productoRepository.findById(dto.getProductoId())
                .orElseThrow(() -> new RecursoNoEncontradoException("No existe un producto con el id: " + dto.getProductoId()));
        Usuario usuario = usuarioRepository.findById(dto.getUsuarioId())
                .orElseThrow(() -> new RecursoNoEncontradoException("No existe un usuario con el id: " + dto.getUsuarioId()));
        Puntuacion puntuacion = Puntuacion.builder()
                                          .producto(producto)
                                          .usuario(usuario)
                                          .nota(dto.getNota())
                                          .build();
        puntuacionRepository.save(puntuacion);
        return Optional.of("se guardo exitosamente la puntuacion");
    }

    public List<PuntuacionDto> findAll() {
        return puntuacionRepository.findAll()
                .stream()
                .map(puntuacion -> PuntuacionDto.builder()
                        .usuarioId(puntuacion.getUsuario().getId())
                        .productoId(puntuacion.getProducto().getId())
                        .nota(puntuacion.getNota())
                        .build()).toList();
    }

    public List<Integer> findAllByUsuarioId(Long usuarioId) {
        return puntuacionRepository.findAllByUsuarioId(usuarioId)
                .stream()
                .map(Puntuacion::getNota).toList();
    }

    public List<Integer> findAllByProductoId(Long productoId) {
        return puntuacionRepository.findAllByProductoId(productoId)
                .stream()
                .map(Puntuacion::getNota).toList();
    }
}

