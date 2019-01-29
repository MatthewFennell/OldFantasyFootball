package uk.co.pampoomio.fennell.server.misc;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// Provides a consistent template for logging exceptions that can be changed to fit our needs
public class ExceptionLogger {
    private static final Logger log = LoggerFactory.getLogger(ExceptionLogger.class);

    public static void logException(Exception e) {
        log.error(e.getClass().getSimpleName() + ": " + e.getMessage());
    }

}
