package uk.co.pampoomio.fennell.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.pampoomio.fennell.server.repos.documents.ApplicationUser;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ApplicationUserRepo extends CrudRepository<ApplicationUser, UUID> {

    Optional<ApplicationUser> findByUsername(String username);

    Optional<ApplicationUser> findByEmail(String email);

    @Query(value = "FROM ApplicationUser WHERE totalPoints = (SELECT MAX(totalPoints) FROM ApplicationUser)")
    List<ApplicationUser> findUserWithMostPoints();
}
