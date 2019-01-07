package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ApplicationUserRepo extends CrudRepository<ApplicationUser, UUID> {

    public boolean existsByUsername(String username);

    public Optional<ApplicationUser> findByUsername(String username);

    public Optional<ApplicationUser> findByEmail(String email);

    @Query(value = "FROM ApplicationUser WHERE totalPoints = (SELECT MAX(totalPoints) FROM ApplicationUser)")
    public List<ApplicationUser> findUserWithMostPoints();
}
