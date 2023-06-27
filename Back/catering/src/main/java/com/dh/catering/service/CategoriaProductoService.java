package com.dh.catering.service;

import com.dh.catering.domain.CategoriaProducto;
import com.dh.catering.domain.Producto;
import com.dh.catering.dto.CategoriaProductoDto;
import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.repository.CategoriaProductoRepository;
import com.dh.catering.repository.ProductoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoriaProductoService {

    private final CategoriaProductoRepository categoriaProductoRepository;
    private final ProductoRepository productoRepository;
    private final ObjectMapper mapper;
    private final S3ImageService s3ImageService;

    public Optional<String> save(CategoriaProductoDto categoriaProductoDto, MultipartFile multipartFile) throws NombreDuplicadoException {
        String mensaje = null;
        if (categoriaProductoDto != null){
            if (categoriaProductoRepository.getByNombre(categoriaProductoDto.getNombre()).isPresent()){
                log.error("Ya existe una categoria de producto con el nombre: " + categoriaProductoDto.getNombre());
                throw new NombreDuplicadoException("Ya existe una categoria de producto con el nombre: " + categoriaProductoDto.getNombre());
            }
            s3ImageService.uploadImage(categoriaProductoDto.getImgUrl(),multipartFile);
            CategoriaProducto categoriaProducto = mapper.convertValue(categoriaProductoDto, CategoriaProducto.class);
            categoriaProducto.setImgUrl(s3ImageService.getUrlImage(categoriaProductoDto.getImgUrl()));
            categoriaProductoRepository.save(categoriaProducto);
            mensaje = "Se guardo exitosamente la categoria de producto";
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public List<CategoriaProductoDto> findAll(){
        List<CategoriaProducto> categoriaProductoList = categoriaProductoRepository.findAll();
        List<CategoriaProductoDto> categoriaProductoDtoList = new ArrayList<>();
        for (CategoriaProducto categoriaProducto: categoriaProductoList){
            categoriaProductoDtoList.add(mapper.convertValue(categoriaProducto,CategoriaProductoDto.class));
        }
        return categoriaProductoDtoList;
    }

    public Optional<CategoriaProductoDto> getById(Long id) throws RecursoNoEncontradoException {
        CategoriaProductoDto categoriaProductoDto = null;
        Optional<CategoriaProducto> optionalCategoriaProducto = categoriaProductoRepository.findById(id);
        if (optionalCategoriaProducto.isEmpty()){
            log.error("NO existe una categoria de producto con id: " + id);
            throw new RecursoNoEncontradoException("NO existe una categoria de producto con id:" + id);
        }
        categoriaProductoDto = mapper.convertValue(optionalCategoriaProducto.get(),CategoriaProductoDto.class);
        return Optional.ofNullable(categoriaProductoDto);
    }

    public Optional<CategoriaProductoDto> getByNombre(String nombre) throws RecursoNoEncontradoException {
        CategoriaProductoDto categoriaProductoDto = null;
        Optional<CategoriaProducto> optionalCategoriaProducto = categoriaProductoRepository.getByNombre(nombre);
        if (optionalCategoriaProducto.isEmpty()){
            log.error("NO existe una categoria de producto con nombre: " + nombre);
            throw new RecursoNoEncontradoException("NO existe una categoria de producto con nombre: " + nombre);
        }
        categoriaProductoDto = mapper.convertValue(optionalCategoriaProducto.get(),CategoriaProductoDto.class);
        return Optional.ofNullable(categoriaProductoDto);
    }

    public Optional<String> deleteById(Long id) throws RecursoNoEncontradoException, AsignacionException {
        String mensaje = null;
        Optional<CategoriaProductoDto> optionalCategoriaProductoDto = this.getById(id);
        if (optionalCategoriaProductoDto.isPresent()){
            List<Producto> productos = productoRepository.findAllByCategoriaId(id);
            if (productos.size()>=1){
                log.error("No se puede eliminar la categoria porque esta asignada a " + productos.size() + " producto(s)");
                throw new AsignacionException("No se puede eliminar la categoria porque esta asignada a " + productos.size() + " producto(s)");
            }
            categoriaProductoRepository.deleteById(id);
            mensaje = "Se elimino corrctamente la categoria con id " + id;
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public Optional<String> updateById(Long id, CategoriaProductoDto categoriaProductoDto, MultipartFile multipartFile) throws RecursoNoEncontradoException, AsignacionException, NombreDuplicadoException {
        String mensaje = null;
        this.deleteById(id);
        this.save(categoriaProductoDto,multipartFile);
        mensaje = "Se actualizó correctamente la categoria de prodcuto que tenia id: " + id + ". A la categoria actualizada se asigno id " + this.getByNombre(categoriaProductoDto.getNombre()).get().getId();
        log.info(mensaje);
        return Optional.ofNullable(mensaje);
    }

}
