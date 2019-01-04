package uk.co.scottlogic.gradProject.server.repos;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Transaction;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

@Repository
public interface WeeklyTeamRepo extends CrudRepository<UsersWeeklyTeam, UUID> {

    public List<UsersWeeklyTeam> findByUser(ApplicationUser user);

}