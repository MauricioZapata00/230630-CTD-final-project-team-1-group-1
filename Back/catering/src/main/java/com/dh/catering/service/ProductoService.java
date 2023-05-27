package com.dh.catering.service;

import com.dh.catering.domain.Producto;
import com.dh.catering.dto.ProductoDto;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.repository.CategoriaProductoRepository;
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
  private CategoriaProductoRepository categoriaProductoRepository;

  @Autowired
  private ProductoRepository productoRepository;

  @Autowired
  private ObjectMapper mapper;

  @Autowired
  private S3ImageService s3ImageService;

  public Optional<String> save(ProductoDto productoDto, MultipartFile archivoAGuardar) throws NombreDuplicadoException, RecursoNoEncontradoException {
    String mensaje = null;
    if (productoDto != null) {
      if (productoRepository.getByNombre(productoDto.getNombre()).isPresent()) {
        log.error("Ya existe un producto registrado con el nombre: {}", productoDto.getNombre());
        throw new NombreDuplicadoException(
            "Ya existe un producto registrado con el nombre: " + productoDto.getNombre());
      }
      s3ImageService.uploadImage(productoDto.getImagenUrl(), archivoAGuardar);
      Producto producto = new Producto();
      producto.setNombre(productoDto.getNombre());
      producto.setDescripcion(productoDto.getDescripcion());
      producto.setPrecio(productoDto.getPrecio());
      producto.setImagenUrl(s3ImageService.getUrlImage(productoDto.getImagenUrl()));
      producto.setCantMin(productoDto.getCantMin());
      producto.setRequierePagoAnticipado(productoDto.getRequierePagoAnticipado());
      producto.setMinDiasReservaPrevia(productoDto.getMinDiasReservaPrevia());
      producto.setPermiteCambios(productoDto.getPermiteCambios());
      if (categoriaProductoRepository.getByNombre(productoDto.getNombreCategoria()).isEmpty()){
        log.error("No existe una categoria con ese nombreCategoria ingresado");
        throw new RecursoNoEncontradoException("No existe una categoria con ese nombreCategoria ingresado");
      }
      producto.setCategoriaProducto(categoriaProductoRepository.getByNombre(productoDto.getNombreCategoria()).get());
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
          .map(producto -> {
            ProductoDto productoDto = mapper.convertValue(producto, ProductoDto.class);
            productoDto.setNombreCategoria(producto.getCategoriaProducto().getNombre());
            return productoDto;
          })
          .collect(Collectors.collectingAndThen(Collectors.toList(), resultados -> {
            Collections.shuffle(resultados);
            return resultados;
          }));
    } else {
      return Collections.emptyList();
    }
  }


  public List<ProductoDto> findAllByCategoryId(int numeroPagina, int tamanioPagina, Long id) {
    Pageable paging = PageRequest.of(numeroPagina, tamanioPagina);
    Page<Producto> pagedResult = productoRepository.findAllByCategoriaId(id,paging);
    if (pagedResult.hasContent()) {
      return pagedResult.getContent()
              .stream()
              .map(producto -> {
                ProductoDto productoDto = mapper.convertValue(producto, ProductoDto.class);
                productoDto.setNombreCategoria(producto.getCategoriaProducto().getNombre());
                return productoDto;
              })
              .collect(Collectors.collectingAndThen(Collectors.toList(), resultados -> {
                Collections.shuffle(resultados);
                return resultados;
              }));
    } else {
      return Collections.emptyList();
    }
  }

  public Optional<ProductoDto> getById(Long id) throws RecursoNoEncontradoException {
    ProductoDto productoDto = null;
    Optional<Producto> optionalProducto = productoRepository.findById(id);
    if (optionalProducto.isEmpty()){
      log.error("No existe un producto con el id: " + id);
      throw new RecursoNoEncontradoException("No existe un producto con el id: " + id);
    }
    productoDto = mapper.convertValue(optionalProducto.get(),ProductoDto.class);
    productoDto.setNombreCategoria(optionalProducto.get().getCategoriaProducto().getNombre());
    return  Optional.ofNullable(productoDto);
  }

  public Optional<ProductoDto> getByNombre(String nombre) throws RecursoNoEncontradoException {
    ProductoDto productoDto = null;
    Optional<Producto> optionalProducto = productoRepository.getByNombre(nombre);
    if (optionalProducto.isEmpty()) {
      log.error("No existe un producto con el nombre: {}", nombre);
      throw new RecursoNoEncontradoException("No existe un producto con el nombre: " + nombre);
    }
    productoDto = mapper.convertValue(optionalProducto.get(), ProductoDto.class);
    productoDto.setNombreCategoria(optionalProducto.get().getCategoriaProducto().getNombre());
    return Optional.ofNullable(productoDto);
  }

  public Optional<String> deleteById(Long id) throws RecursoNoEncontradoException {
    String mensaje = null;
    Optional<ProductoDto> optionalProductoDto = this.getById(id);
    if (optionalProductoDto.isPresent()) {
      productoRepository.deleteById(id);
      mensaje = "Se elimino exitosamente el producto con id: " + id;
      log.info(mensaje);
    }
    return Optional.ofNullable(mensaje);
  }

  public Optional<String> updateById(Long id, ProductoDto productoDto, MultipartFile archivoAGuardar)
      throws RecursoNoEncontradoException, NombreDuplicadoException {
    String mensaje = null;
    this.deleteById(id);
    this.save(productoDto,archivoAGuardar);
    mensaje = "Se actualizo correctamente el producto que tenia el id: " + id + ". Al producto actualizado se le asigno el id: " + this.getByNombre(productoDto.getNombre()).get().getId();
    log.info(mensaje);
    return Optional.ofNullable(mensaje);
  }

}
