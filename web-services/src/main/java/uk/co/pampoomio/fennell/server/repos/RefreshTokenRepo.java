package uk.co.pampoomio.fennell.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.pampoomio.fennell.server.repos.documents.RefreshToken;

import java.util.UUID;

@Repository
public interface RefreshTokenRepo extends CrudRepository<RefreshToken, UUID> {


}
