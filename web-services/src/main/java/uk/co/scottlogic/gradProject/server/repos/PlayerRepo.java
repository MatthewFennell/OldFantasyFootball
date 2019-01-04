package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerRepo extends CrudRepository<Player, UUID> {

    public Optional<Player> findByFirstName(String firstName);

    public List<Player> findByPosition(Player.Position position);

    @Query(value = "FROM Player WHERE price >= ?1 AND price <= ?2 ORDER BY price DESC")
    public List<Player> findByPriceMinimumByPriceMaximum(double min, double max);

    @Query(value = "FROM Player WHERE college_team = ?1 ORDER BY price DESC")
    public List<Player> findByCollegeTeam(CollegeTeam collegeTeam);

}