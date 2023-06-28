package com.dh.catering.service;

import com.dh.catering.domain.Rol;
import com.dh.catering.domain.Usuario;
import com.dh.catering.dto.RolDto;
import com.dh.catering.exceptions.AsignacionException;
import com.dh.catering.exceptions.NombreDuplicadoException;
import com.dh.catering.exceptions.RecursoNoEncontradoException;
import com.dh.catering.repository.RolRepository;
import com.dh.catering.repository.UsuarioRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RolService {

    private final RolRepository rolRepository;
    private final UsuarioRepository usuarioRepository;
    private final ObjectMapper mapper;

    public Optional<String> save(RolDto rolDto) throws NombreDuplicadoException {
        String mensaje = null;
        if (rolDto != null){
            if (rolRepository.getByNombre(rolDto.getNombre()).isPresent()){
                log.error("Ya existe un rol con el nombre: " + rolDto.getNombre());
                throw new NombreDuplicadoException("Ya existe un rol con el nombre: " + rolDto.getNombre());
            }
            Rol rol = mapper.convertValue(rolDto, Rol.class);
            rolRepository.save(rol);
            mensaje = "Se guardo exitosamente el rol";
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public List<RolDto> findAll(){
        List<Rol> rolList = rolRepository.findAll();
        List<RolDto> rolDtos = new ArrayList<>();
        for (Rol rol: rolList){
            rolDtos.add(mapper.convertValue(rol,RolDto.class));
        }
        return rolDtos;
    }

    public Optional<RolDto> getById(Long id) throws RecursoNoEncontradoException {
        RolDto rolDto = null;
        Optional<Rol> optionalRol = rolRepository.findById(id);
        if (optionalRol.isEmpty()){
            log.error("NO existe un rol con id: " + id);
            throw new RecursoNoEncontradoException("NO existe un rol con id: " + id);
        }
        rolDto = mapper.convertValue(optionalRol.get(),RolDto.class);
        return Optional.ofNullable(rolDto);
    }

    public Optional<RolDto> getByNombre(String nombre) throws RecursoNoEncontradoException {
        RolDto rolDto = null;
        Optional<Rol> optionalRol = rolRepository.getByNombre(nombre);
        if (optionalRol.isEmpty()){
            log.error("NO existe un rol con nombre: " + nombre);
            throw new RecursoNoEncontradoException("NO existe un rol con nombre: " + nombre);
        }
        rolDto = mapper.convertValue(optionalRol.get(),RolDto.class);
        return Optional.ofNullable(rolDto);
    }

    public Optional<String> deleteById(Long id) throws RecursoNoEncontradoException, AsignacionException {
        String mensaje = null;
        Optional<RolDto> optionalRolDto = this.getById(id);
        if (optionalRolDto.isPresent()){
            List<Usuario> usuarios = usuarioRepository.findAllByRolId(id);
            if (usuarios.size()>=1){
                log.error("No se puede eliminar el rol porque esta asignado a " + usuarios.size() + " usuario(s)");
                throw new AsignacionException("No se puede eliminar el rol porque esta asignado a " + usuarios.size() + " usuario(s)");
            }
            rolRepository.deleteById(id);
            mensaje = "Se elimino correctamente el rol con id " + id;
            log.info(mensaje);
        }
        return Optional.ofNullable(mensaje);
    }

    public Optional<String> updateById(Long id, RolDto rolDto) throws RecursoNoEncontradoException, AsignacionException, NombreDuplicadoException {
        String mensaje = null;
        this.deleteById(id);
        this.save(rolDto);
        mensaje = "Se actualizó correctamente el rol que tenia id: " + id + ". Al rol actualizado se asigno id " + this.getByNombre(rolDto.getNombre()).get().getId();
        log.info(mensaje);
        return Optional.ofNullable(mensaje);
    }

}
