package uk.co.scottlogic.gradProject.server.routers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import uk.co.scottlogic.gradProject.server.repos.ApplicationUserRepo;
import uk.co.scottlogic.gradProject.server.repos.TransactionManager1;
import uk.co.scottlogic.gradProject.server.repos.TransactionRepo;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@ContextConfiguration
public class TransactionControllerTest {

    @Mock
    private ApplicationUserRepo applicationUserRepo;

    @Mock
    private TransactionRepo transactionRepo;

    private TransactionManager1 transactionManager1;

    private TransactionController transactionController;

    @Before
    public void setUp() {
        transactionManager1 = new TransactionManager1(applicationUserRepo);
        transactionController = new TransactionController(transactionManager1, transactionRepo);
    }

    @Test
    public void assertTrue() {
        assertEquals(true, true);
    }

}