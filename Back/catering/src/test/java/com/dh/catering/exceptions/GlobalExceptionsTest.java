package com.dh.catering.exceptions;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;

class GlobalExceptionsTest {

    private static final String MENSAJE = "Error inesperado";
    private GlobalExceptions exceptionHandler;

    @BeforeEach
    void setUp() {
        exceptionHandler = new GlobalExceptions();
    }

    @Test
    void testProcesarNombreDuplicado() {
        NombreDuplicadoException e = new NombreDuplicadoException(MENSAJE);
        var resultado = exceptionHandler.procesarNombreDuplicado(e);
        verificarResultado(resultado, 1001);
    }

    @Test
    void testProcesarRecursoNoEncontrado() {
        RecursoNoEncontradoException e = new RecursoNoEncontradoException(MENSAJE);
        var resultado = exceptionHandler.procesarRecursoNoEncontrado(e);
        verificarResultado(resultado, 1002);
    }

    @Test
    void testProcesarArchivoVacioONulo() {
        ArchivoVacioONuloException e = new ArchivoVacioONuloException(MENSAJE);
        var resultado = exceptionHandler.procesarArchivoVacioONulo(e);
        verificarResultado(resultado, 1003);
    }

    @Test
    void testProcesarCategoriaAsignada() {
        AsignacionException e = new AsignacionException(MENSAJE);
        var resultado = exceptionHandler.procesarCategoriaAsignada(e);
        verificarResultado(resultado, 1004);
    }

    @Test
    void testProcesarCredencialesIncorrectas() {
        BadCredentialsException e = new BadCredentialsException(MENSAJE);
        var resultado = exceptionHandler.procesarCredencialesIncorrectas(e);
        verificarResultado(resultado, 1005);
    }

    @Test
    void testProcesarFallaEnvioEmail() {
        IllegalStateException e = new IllegalStateException(MENSAJE);
        var resultado = exceptionHandler.procesarFallaEnvioEmail(e);
        verificarResultado(resultado, 1006);
    }

    @Test
    void testProcesarDuplicadoException() {
        DuplicadoException e = new DuplicadoException(MENSAJE);
        var resultado = exceptionHandler.procesarDuplicadoException(e);
        verificarResultado(resultado, 1007);
    }

    private void verificarResultado(ResponseEntity<MensajeError> resultado, int codigoEsperado) {
        Assertions.assertNotNull(resultado);
        Assertions.assertAll(
                () -> Assertions.assertEquals(HttpStatus.BAD_REQUEST, resultado.getStatusCode()),
                () -> Assertions.assertEquals(codigoEsperado, resultado.getBody().getStatusCode()),
                () -> Assertions.assertEquals(MENSAJE, resultado.getBody().getDescription()));
    }
}

