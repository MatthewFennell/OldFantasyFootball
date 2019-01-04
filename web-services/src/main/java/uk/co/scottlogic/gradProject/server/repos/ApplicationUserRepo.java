package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface ApplicationUserRepo extends CrudRepository<ApplicationUser, UUID> {

    public boolean existsByUsername(String username);

    public Optional<ApplicationUser> findByUsername(String username);

    public Optional<ApplicationUser> findByEmail(String email);
}
