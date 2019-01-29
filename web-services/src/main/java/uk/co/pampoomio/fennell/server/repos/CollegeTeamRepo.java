package uk.co.pampoomio.fennell.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.pampoomio.fennell.server.repos.documents.CollegeTeam;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CollegeTeamRepo extends CrudRepository<CollegeTeam, UUID> {

    Optional<CollegeTeam> findByName(String name);

}