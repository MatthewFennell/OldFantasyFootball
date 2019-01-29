package uk.co.pampoomio.fennell.server.repos;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import uk.co.pampoomio.fennell.server.repos.documents.Player;
import uk.co.pampoomio.fennell.server.repos.documents.PlayerPoints;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PlayerPointsRepo extends CrudRepository<PlayerPoints, UUID> {


    @Query(value = "FROM PlayerPoints WHERE player = ?1 AND week = ?2")
    Optional<PlayerPoints> findByPlayerByWeek(Player player, Integer week);

    @Query(value = "FROM PlayerPoints WHERE week = ?1 and points = (SELECT MAX(points) FROM PlayerPoints WHERE week = ?1 )")
    List<PlayerPoints> findPlayerWithMostPoints(Integer week);
}