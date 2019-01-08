package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerPointsRepo extends CrudRepository<PlayerPoints, UUID> {

    public List<PlayerPoints> findByPlayer(Player player);

    @Query(value = "FROM PlayerPoints WHERE player = ?1 AND week = ?2")
    public Optional<PlayerPoints> findByPlayerByWeek(Player player, Integer week);

    @Query(value = "FROM PlayerPoints WHERE week = ?1 and points = (SELECT MAX(points) FROM PlayerPoints)")
    public List<PlayerPoints> findPlayerWithMostPoints(Integer week);
}