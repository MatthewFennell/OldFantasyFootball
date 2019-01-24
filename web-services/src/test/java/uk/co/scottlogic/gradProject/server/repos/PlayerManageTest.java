package uk.co.scottlogic.gradProject.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class PlayerManageTest {

    @Mock
    private CollegeTeamRepo teamRepo;

    @Mock
    private PlayerRepo playerRepo;

    @Mock
    private PlayerPointsRepo playerPointsRepo;

    @Mock
    private WeeklyTeamRepo weeklyTeamRepo;

    @Mock
    private ApplicationUserRepo applicationUserRepo;

    private PlayerManager playerManager;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        playerManager = new PlayerManager(teamRepo, playerRepo, playerPointsRepo, weeklyTeamRepo, applicationUserRepo);
    }

    @Test
    public void makePlayerForValidTeam() {
        CollegeTeam collegeTeam = new CollegeTeam();
        when(teamRepo.findById(any())).thenReturn(Optional.of(collegeTeam));
        playerManager.makePlayer(collegeTeam, Enums.Position.DEFENDER, 0, "firstname", "surname");
    }

    @Test(expected = IllegalArgumentException.class)
    public void makePlayerForInvalidTeam() {
        when(teamRepo.findById(any())).thenReturn(Optional.empty());
        playerManager.makePlayer(new CollegeTeam(), Enums.Position.DEFENDER, 0, "firstname", "surname");
    }

    @Test
    public void addingPointsToPlayerChangesTheirWeeklyScore() {
        // TO:DO
    }

    @Test
    public void findPointsForPlayerInAWeek() {
        Integer goals = 5;
        Integer assists = 3;
        Integer mins = 0;
        CollegeTeam collegeTeam = new CollegeTeam("name", 5, 4, 3, 2, 1);
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        PlayerPoints playerPoints = new PlayerPoints(goals, assists, mins, false, 0, false, false, new Date(), player, 0);
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.of(playerPoints));
        Integer score = goals * 4 + assists * 3;
        assertEquals(score, playerManager.findPointsForPlayerInWeek(player, 0));
    }

    @Test
    public void filterGoalkeepersReturnsOnlyKeepers() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team", 5, 4, 3, 2, 1);
        when(teamRepo.findByName("college_team")).thenReturn(Optional.of(collegeTeam));

        List<Player> players = new ArrayList<>();
        Player p1 = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        Player p2 = new Player(collegeTeam, Enums.Position.GOALKEEPER, 15, "firstname_one", "surname_two");
        players.add(p2);
        players.add(p1);

        Integer min = 0;
        Integer max = 10;

        when(playerRepo.filterPlayersSortByPrice(collegeTeam, 0, min, max, "%%")).thenReturn(players);
        List<Player> returnedPlayers = playerManager.formatFilter("college_team", Enums.Position.GOALKEEPER, min, max, "", null);
        assertEquals(p2, returnedPlayers.get(0));
        assertEquals(p1, returnedPlayers.get(1));
    }
}
