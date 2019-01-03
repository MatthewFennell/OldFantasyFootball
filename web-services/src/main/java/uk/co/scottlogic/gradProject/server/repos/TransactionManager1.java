package uk.co.scottlogic.gradProject.server.repos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionManager1 {

  private static final Logger log = LoggerFactory.getLogger(TransactionManager1.class);

  private ApplicationUserRepo applicationUserRepo;

  // Methods on transactions
  private TransactionRepo transactionRepo;


  @Autowired
  public TransactionManager1(ApplicationUserRepo applicationUserRepo) {
    this.applicationUserRepo = applicationUserRepo;
  }




}
