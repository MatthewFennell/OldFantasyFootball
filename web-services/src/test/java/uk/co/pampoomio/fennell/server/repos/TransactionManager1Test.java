package uk.co.pampoomio.fennell.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import static junit.framework.TestCase.assertEquals;

@RunWith(SpringRunner.class)
@ContextConfiguration
public class TransactionManager1Test {

    @Mock
    private ApplicationUserRepo applicationUserRepo;

    @Mock
    private TransactionRepo transactionRepo;

    private TransactionManager1 transactionManager1;

    @Before
    public void setUp() {
        transactionManager1 = new TransactionManager1(applicationUserRepo);
    }

    @Test
    public void basic() {
        assertEquals(true, true);
    }

}
