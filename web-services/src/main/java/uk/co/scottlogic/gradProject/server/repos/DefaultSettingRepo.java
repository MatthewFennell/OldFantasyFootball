package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.Setting;

import java.util.Optional;

@Repository
public interface DefaultSettingRepo extends CrudRepository<Setting, String> {

    public Optional<Setting> findByOption(String option);

}
