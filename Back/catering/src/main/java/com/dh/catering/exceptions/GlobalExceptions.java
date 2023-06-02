package com.dh.catering.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptions {

    @ExceptionHandler({NombreDuplicadoException.class})
    public ResponseEntity<MensajeError> procesarNombreDuplicado(NombreDuplicadoException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage("Lo sentimos, ha ocurrido un error!");
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1001);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }

    @ExceptionHandler({RecursoNoEncontradoException.class})
    public ResponseEntity<MensajeError> procesarRecursoNoEncontrado(RecursoNoEncontradoException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage("Lo sentimos, ha ocurrido un error!");
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1002);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }

    @ExceptionHandler({ArchivoVacioONuloException.class})
    public ResponseEntity<MensajeError> procesarArchivoVacioONulo(ArchivoVacioONuloException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage("Archivo recibido está vacío o es nulo.");
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1003);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }

    @ExceptionHandler({AsignacionException.class})
    public ResponseEntity<MensajeError> procesarCategoriaAsdignada(AsignacionException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage("Lo sentimos, ha ocurrido un error!");
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1004);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }
}
