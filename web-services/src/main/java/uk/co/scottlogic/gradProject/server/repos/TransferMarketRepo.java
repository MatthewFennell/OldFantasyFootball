package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.TransferMarketOpen;

import java.util.List;
import java.util.UUID;

@Repository
public interface TransferMarketRepo extends CrudRepository<TransferMarketOpen, UUID> {

    @Query(value = "FROM TransferMarketOpen")
    List<TransferMarketOpen> findAll();

    TransferMarketOpen findFirstByOrderByIsOpenAsc();
}
