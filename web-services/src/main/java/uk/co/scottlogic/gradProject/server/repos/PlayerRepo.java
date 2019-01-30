package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerRepo extends CrudRepository<Player, UUID> {

    Optional<Player> findByFirstName(String firstName);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY price DESC")
    List<Player> test(CollegeTeam team, Integer position, double minPrice, double maxPrice, String name);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY price DESC")
    List<Player> filterPlayersSortByPrice(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY total_goals DESC")
    List<Player> filterPlayersSortByGoals(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY total_assists DESC")
    List<Player> filterPlayersSortByAssists(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY total_score DESC")
    List<Player> filterPlayersSortByScore(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name);
}