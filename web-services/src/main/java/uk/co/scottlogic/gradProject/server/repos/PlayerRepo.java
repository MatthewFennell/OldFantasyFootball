package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerRepo extends CrudRepository<Player, UUID> {

    public Optional<Player> findByFirstName(String firstName);

}