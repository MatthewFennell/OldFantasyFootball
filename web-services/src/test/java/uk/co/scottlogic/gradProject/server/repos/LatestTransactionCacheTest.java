package uk.co.scottlogic.gradProject.server.repos;

import java.util.List;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Category;
import uk.co.scottlogic.gradProject.server.repos.documents.Payee;
import uk.co.scottlogic.gradProject.server.repos.documents.Transaction;

@RunWith(SpringRunner.class)
@ContextConfiguration
public class LatestTransactionCacheTest {
  private LatestTransactionCache latestTransactionCache;

  @Before
  public void setUp() {
    latestTransactionCache = new LatestTransactionCache();
  }

  @Test
  public void requestingLatestTransactionsFromNewAccountReturnsEmptyList() {
    List<Transaction> transactions = latestTransactionCache.getTransactions("fakeId");
    assert(transactions.size() == 0);
  }

  @Test
  public void requestingTransactionsAfterCachingTransactionsReturnsCorrectTransactions() {
    ApplicationUser customer = new ApplicationUser("username", "123456", "firstname", "surname", "m@test.com");
    long amount = 55;
    String description = "Description";
    Category category = new Category();
    Payee payee = new Payee();
    Transaction transaction = new Transaction(customer, amount, description, category, payee);

    latestTransactionCache.cache(transaction);

    List<Transaction> transactions = latestTransactionCache.getTransactions(customer.getId());

    assert(transactions.size() == 1);
    assert(transactions.get(0) == transaction);
  }

  @Test
  public void requestingTransactionsAfterCachingTransactionsReturnsNoTransactionsAfterCacheIsCleared() {
    ApplicationUser customer = new ApplicationUser("username", "123456", "firstname", "surname", "m@test.com");
    long amount = 55;
    String description = "Description";
    Category category = new Category();
    Payee payee = new Payee();
    Transaction transaction = new Transaction(customer, amount, description, category, payee);

    latestTransactionCache.cache(transaction);
    latestTransactionCache.clearCache(customer.getId());

    List<Transaction> transactions = latestTransactionCache.getTransactions(customer.getId());

    assert(transactions.size() == 0);
  }
}
