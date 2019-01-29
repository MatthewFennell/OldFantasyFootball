package uk.co.pampoomio.fennell.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.pampoomio.fennell.server.repos.documents.League;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface LeagueRepo extends CrudRepository<League, UUID> {

    Optional<League> findByLeagueName(String leagueName);

    Optional<League> findByCodeToJoin(String codeToJoin);

}