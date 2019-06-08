package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.LoginsPerDay;
import uk.co.scottlogic.gradProject.server.repos.documents.PercentageOfTeams;

import java.util.List;
import java.util.UUID;

@Repository
public interface LoginsPerDayRepo extends CrudRepository<LoginsPerDay, UUID> {

    @Query(value = "FROM LoginsPerDay")
    List<LoginsPerDay> findAll();
}