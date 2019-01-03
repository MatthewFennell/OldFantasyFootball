package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.Api;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.co.scottlogic.gradProject.server.repos.TransactionManager1;
import uk.co.scottlogic.gradProject.server.repos.TransactionRepo;

@RestController
@EnableScheduling
@RequestMapping("/api")
@Api(value = "transaction", description = "Operations pertaining to retrieving transaction info "
    + "from the database")
public class TransactionController {

  private static final Logger log = LoggerFactory.getLogger(User.class);

  private static final long ASSUMED_LOGOUT_AFTER_INACTIVE_TIME = 15 * 60 * 1000L;

  private TransactionManager1 transactionManager1;

  private TransactionRepo transactionRepo;


  @Autowired
  public TransactionController(TransactionManager1 transactionManager1,
      TransactionRepo transactionRepo) {
    this.transactionManager1 = transactionManager1;
    this.transactionRepo = transactionRepo;
  }

}