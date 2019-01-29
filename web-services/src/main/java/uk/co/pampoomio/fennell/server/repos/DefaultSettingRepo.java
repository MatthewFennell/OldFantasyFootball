package uk.co.pampoomio.fennell.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.pampoomio.fennell.server.repos.documents.Setting;

import java.util.Optional;

@Repository
public interface DefaultSettingRepo extends CrudRepository<Setting, String> {

    public Optional<Setting> findByOption(String option);

}
