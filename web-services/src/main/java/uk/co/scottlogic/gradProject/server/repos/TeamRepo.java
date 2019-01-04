package uk.co.scottlogic.gradProject.server.repos;

import java.util.List;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;

@Repository
public interface TeamRepo extends CrudRepository<CollegeTeam, UUID> {

    public List<CollegeTeam> findByName(String name);

}