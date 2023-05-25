package com.dh.catering.service;

import com.dh.catering.domain.Producto;
import com.dh.catering.dto.ProductoDto;
import com.dh.catering.exceptions.DuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.repository.ProductoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class ProductoService {

  @Autowired
  private ProductoRepository productoRepository;

  @Autowired
  private ObjectMapper mapper;

  @Autowired
  private S3Imageservice s3ImageService;

  public Optional<String> save(ProductoDto productoDto, MultipartFile archivoAGuardar) throws DuplicadoException {
    String mensaje = null;
    if (productoDto != null) {
      if (productoRepository.getByNombre(productoDto.getNombre()).isPresent()) {
        log.error("Ya existe un producto registrado con el nombre: {}", productoDto.getNombre());
        throw new DuplicadoException(
            "Ya existe un producto registrado con el nombre: " + productoDto.getNombre());
      }
      s3ImageService.uploadImage(productoDto.getImagenUrl(), archivoAGuardar);
      Producto producto = mapper.convertValue(productoDto, Producto.class);
      producto.setImagenUrl(s3ImageService.getUrlImage(productoDto.getImagenUrl()));
      productoRepository.save(producto);
      mensaje = "Se guardo exitosamente el producto";
      log.info(mensaje);
    }
    return Optional.ofNullable(mensaje);
  }

  public List<ProductoDto> findAll(int numeroPagina, int tamanioPagina) {
    Pageable paging = PageRequest.of(numeroPagina, tamanioPagina);
    Page<Producto> pagedResult = productoRepository.findAll(paging);
    if (pagedResult.hasContent()) {
      return pagedResult.getContent()
          .stream()
          .map(producto -> mapper.convertValue(producto, ProductoDto.class))
          .collect(Collectors.collectingAndThen(Collectors.toList(), resultados -> {
            Collections.shuffle(resultados);
            return resultados;
          }));
    } else {
      return Collections.emptyList();
    }
  }

  public Optional<ProductoDto> getByNombre(String nombre) throws RecursoNoEncontradoException {
    ProductoDto productoDto = null;
    Optional<Producto> optionalProducto = productoRepository.getByNombre(nombre);
    if (optionalProducto.isEmpty()) {
      log.error("No existe un producto con el nombre: {}", nombre);
      throw new RecursoNoEncontradoException("No existe un producto con el nombre: " + nombre);
    }
    productoDto = mapper.convertValue(optionalProducto.get(), ProductoDto.class);
    return Optional.ofNullable(productoDto);
  }

  public Optional<String> deleteByNombre(String nombre) throws RecursoNoEncontradoException {
    String mensaje = null;
    Optional<ProductoDto> optionalProductoDto = this.getByNombre(nombre);
    if (optionalProductoDto.isPresent()) {
      productoRepository.deleteByNombre(nombre);
      mensaje = "Se elimino exitosamente el producto con nombre: " + nombre;
      log.info(mensaje);
    }
    return Optional.ofNullable(mensaje);
  }

  public Optional<String> updateByNombre(String nombre, ProductoDto productoDto)
      throws RecursoNoEncontradoException {
    String mensaje = null;
    Optional<ProductoDto> optionalProductoDto = this.getByNombre(nombre);
    if (optionalProductoDto.isPresent()) {
      this.deleteByNombre(nombre);
      Producto producto = mapper.convertValue(productoDto, Producto.class);
      productoRepository.save(producto);
      mensaje = "Se actualizo correctamente el producto que tenia el nombre: " + nombre;
      log.info(mensaje);
    }
    return Optional.ofNullable(mensaje);
  }

}
