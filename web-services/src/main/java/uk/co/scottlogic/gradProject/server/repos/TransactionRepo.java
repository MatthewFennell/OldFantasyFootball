package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Transaction;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface TransactionRepo extends CrudRepository<Transaction, UUID> {

    // Find by the customers unique id
    public List<Transaction> findByCustomer(ApplicationUser customer);

    @Query(value = "FROM Transaction WHERE customer = ?1 AND date >= ?2 AND date < ?3 ORDER BY date"
            + " ASC")
    List<Transaction> findByUserByDateRange(ApplicationUser customer, Date start, Date end,
                                            PageRequest pr);

    @Query(value = "FROM Transaction WHERE customer = ?1 AND date < ?2 ORDER BY date DESC")
    List<Transaction> findByUserByDateRangeReversed(ApplicationUser user, Date end, PageRequest pr);

    @Query(value = "FROM Transaction WHERE customer = ?1 ORDER BY date ASC")
    List<Transaction> findAllByUser(ApplicationUser customer);

}