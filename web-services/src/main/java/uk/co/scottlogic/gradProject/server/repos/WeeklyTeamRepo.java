package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.util.List;
import java.util.UUID;

@Repository
public interface WeeklyTeamRepo extends CrudRepository<UsersWeeklyTeam, UUID> {

    // The first element in the returned list is the most recent date
    @Query(value = "FROM UsersWeeklyTeam WHERE user = ?1 ORDER BY date DESC")
    public List<UsersWeeklyTeam> findByUser(ApplicationUser user);

}