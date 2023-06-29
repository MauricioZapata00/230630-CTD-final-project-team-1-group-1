package com.dh.catering.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptions {

    public static final String MENSAJE = "Lo sentimos, ha ocurrido un error!";

    @ExceptionHandler({NombreDuplicadoException.class})
    public ResponseEntity<MensajeError> procesarNombreDuplicado(NombreDuplicadoException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage(MENSAJE);
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1001);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }

    @ExceptionHandler({RecursoNoEncontradoException.class})
    public ResponseEntity<MensajeError> procesarRecursoNoEncontrado(RecursoNoEncontradoException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage(MENSAJE);
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
    public ResponseEntity<MensajeError> procesarCategoriaAsignada(AsignacionException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage(MENSAJE);
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1004);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity<MensajeError> procesarCredencialesIncorrectas(BadCredentialsException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage(MENSAJE);
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1005);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }

    @ExceptionHandler({IllegalStateException.class})
    public ResponseEntity<MensajeError> procesarFallaEnvioEmail(IllegalStateException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage(MENSAJE);
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1006);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }

    @ExceptionHandler({DuplicadoException.class})
    public ResponseEntity<MensajeError> procesarDuplicadoException(DuplicadoException e){
        MensajeError mensajeError = new MensajeError();
        mensajeError.setMessage(MENSAJE);
        mensajeError.setDescription(e.getMessage());
        mensajeError.setStatusCode(1007);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensajeError);
    }

}
