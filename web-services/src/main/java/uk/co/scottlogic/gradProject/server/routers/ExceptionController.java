package uk.co.scottlogic.gradProject.server.routers;

import java.nio.file.AccessDeniedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import uk.co.scottlogic.gradProject.server.misc.ExceptionLogger;

@ControllerAdvice
public class ExceptionController extends ResponseEntityExceptionHandler {
  private static final Logger log = LoggerFactory.getLogger(ExceptionController.class);


  @ExceptionHandler(value = {IllegalArgumentException.class, IllegalStateException.class})
  protected ResponseEntity<Object> handleIllegalArgument(RuntimeException ex, WebRequest request) {
    String bodyOfResponse = "Illegal Argument/State";
    ExceptionLogger.logException(ex);
    return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT,
        request);
  }

  @ExceptionHandler(value = {NullPointerException.class})
  protected ResponseEntity<Object> handleJSONParse(RuntimeException ex, WebRequest request) {
    String bodyOfResponse = "JSON parse error.";
    ExceptionLogger.logException(ex);
    return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST,
        request);
  }

  @ExceptionHandler(value = {AccessDeniedException.class})
  protected ResponseEntity<Object> handleAccessDenied(RuntimeException ex, WebRequest request) {
    String bodyOfResponse = "Insufficient privileges.";
    ExceptionLogger.logException(ex);
    return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.FORBIDDEN,
        request);
  }

  @Override
  protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
      HttpHeaders headers, HttpStatus status, WebRequest request) {
    String bodyOfResponse = "Request http not readable.";
    ExceptionLogger.logException(ex);
    return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST,
        request);
  }

  @ExceptionHandler(value = {DataIntegrityViolationException.class})
  protected ResponseEntity<Object> handleInvalidData(RuntimeException ex, WebRequest request) {
    String bodyOfResponse = "Data integrity error";
    ExceptionLogger.logException(ex);
    return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), HttpStatus.BAD_REQUEST,
        request);
  }

}