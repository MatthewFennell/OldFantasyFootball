package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.RefreshToken;

import java.util.UUID;

@Repository
public interface RefreshTokenRepo extends CrudRepository<RefreshToken, UUID> {


}
