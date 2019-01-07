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

    public Optional<Player> findByFirstName(String firstName);

    public List<Player> findByPosition(Player.Position position);

    @Query(value = "FROM Player WHERE price >= ?1 AND price <= ?2 ORDER BY price DESC")
    public List<Player> findByPriceMinimumByPriceMaximum(double min, double max);

    @Query(value = "FROM Player WHERE college_team = ?1 ORDER BY price DESC")
    public List<Player> findByCollegeTeam(CollegeTeam collegeTeam);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY price DESC")
    public List<Player> test(CollegeTeam team, Integer position, double minPrice, double maxPrice, String name);


    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY price DESC")
    public List<Player> filterPlayersSortByPrice(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY total_goals DESC")
    public List<Player> filterPlayersSortByGoals(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY total_assists DESC")
    public List<Player> filterPlayersSortByAssists(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name);

    @Query(value = "FROM Player WHERE ( ?1 IS NULL OR college_team = ?1 ) AND ( ?2 IS NULL OR position = ?2 ) AND ( ?3 IS NULL OR price >= ?3) AND ( ?4 IS NULL OR price <= ?4 ) AND first_name LIKE ?5 ORDER BY total_score DESC")
    public List<Player> filterPlayersSortByScore(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name);
}