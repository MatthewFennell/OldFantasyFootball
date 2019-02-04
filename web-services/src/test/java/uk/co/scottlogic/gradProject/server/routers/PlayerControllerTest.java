package uk.co.scottlogic.gradProject.server.routers;

import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletResponse;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.repos.documents.*;
import uk.co.scottlogic.gradProject.server.routers.dto.MakePlayerDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerPointsDTO;

import java.util.*;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class PlayerControllerTest {

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


    private PlayerController playerController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        WeeklyTeamManager weeklyTeamManager = new WeeklyTeamManager(applicationUserRepo, playerRepo, weeklyTeamRepo, playerManager);
        playerManager = new PlayerManager(teamRepo, playerRepo, playerPointsRepo, weeklyTeamRepo, applicationUserRepo);
        playerController = new PlayerController(playerManager, weeklyTeamManager);
    }

    @Test
    public void findingPlayerWithMostPointsInWeekReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("name");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        PlayerPoints playerPoints = new PlayerPoints(10, 5, 90, false, 0, false, false, new Date(), player, 0);
        List<PlayerPoints> points = new ArrayList<>();
        points.add(playerPoints);

        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(playerPointsRepo.findPlayerWithMostPoints(0)).thenReturn(points);

        playerController.getUserPointsInWeek(user, response, 0);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void findingPlayerWithMostPointsInWeekReturnsThrowsExceptionIfNoPlayers() {
        List<PlayerPoints> points = new ArrayList<>();
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(playerPointsRepo.findPlayerWithMostPoints(0)).thenReturn(points);
        playerController.getUserPointsInWeek(user, response, 0);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void gettingAllPlayersForAUserInAGivenWeekReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        List<Player> players = new ArrayList<>();
        Player p1 = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPoints playerPoints = new PlayerPoints(10, 5, 90, false, 0, false, false, new Date(), p1, 0);


        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam(user, new Date(), players, 0);

        when(weeklyTeamRepo.findByUserByWeek(any(), any())).thenReturn(Optional.of(weeklyTeam));
        when(playerPointsRepo.findByPlayerByWeek(any(), any())).thenReturn(Optional.of(playerPoints));

        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.getAllPlayersForUserInWeek(user, response, 0);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void gettingAllPlayersForAUserInAGivenWeekWhenNoTeamExistsReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(weeklyTeamRepo.findByUserByWeek(any(), any())).thenReturn(Optional.empty());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.getAllPlayersForUserInWeek(user, response, 0);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void validFilteringOfPlayersSortByPriceReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.filterPlayersSortByScore(any(), any(), any(), any(), any())).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.ALL, "team", Enums.SORT_BY.PRICE);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void validFilteringOfPlayersSortByGoalseReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.filterPlayersSortByScore(any(), any(), any(), any(), any())).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.ALL, "team", Enums.SORT_BY.GOALS);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void validFilteringOfPlayersSortByAssistsReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.filterPlayersSortByScore(any(), any(), any(), any(), any())).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.ALL, "team", Enums.SORT_BY.ASSISTS);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void validFilteringOfPlayersSortByTotalPointsReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.filterPlayersSortByScore(any(), any(), any(), any(), any())).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.ALL, "team", Enums.SORT_BY.TOTAL_POINTS);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void validFilteringOfPlayersGoalkeepersReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.filterPlayersSortByScore(any(), any(), any(), any(), any())).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.GOALKEEPER, "team", Enums.SORT_BY.PRICE);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void validFilteringOfPlayersDefendersReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.filterPlayersSortByScore(any(), any(), any(), any(), any())).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.DEFENDER, "team", Enums.SORT_BY.PRICE);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void validFilteringOfPlayersMidfieldersReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.filterPlayersSortByScore(any(), any(), any(), any(), any())).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.MIDFIELDER, "team", Enums.SORT_BY.PRICE);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void validFilteringOfPlayersAttackersReturns200() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.filterPlayersSortByScore(any(), any(), any(), any(), any())).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.ATTACKER, "team", Enums.SORT_BY.PRICE);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void filteringOfPlayersReturns400IfCollegeTeamDoesNotExist() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(teamRepo.findByName(any())).thenReturn(Optional.empty());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.filterPlayersAll(user, response, 100, 0, "name", Enums.Position.ATTACKER, "team", Enums.SORT_BY.PRICE);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void deletePlayerReturns204WhenSuccessful() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(weeklyTeamRepo.findAll()).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.deletePlayer(user, player.getId().toString(), response);
        TestCase.assertEquals(204, response.getStatus());
    }

    @Test
    public void deletePlayerReturns400WhenPlayerDoesNotExist() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(playerRepo.findById(any())).thenReturn(Optional.empty());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.deletePlayer(user, UUID.randomUUID().toString(), response);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void addPointsToSinglePlayerReturns201WhenSuccessful() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        CollegeTeam collegeTeam = new CollegeTeam("A");
        String id = UUID.randomUUID().toString();
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 5, 0, false, 0, false, false, id, 0);
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(any(), any())).thenReturn(Optional.empty());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.addPointsToSinglePlayer(user, playerPointsDTO, response);
        TestCase.assertEquals(201, response.getStatus());
    }

    @Test
    public void addPointsToSinglePlayerReturns400WhenPlayerDoesNotExist() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        String id = UUID.randomUUID().toString();
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 5, 0, false, 0, false, false, id, 0);
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.empty());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.addPointsToSinglePlayer(user, playerPointsDTO, response);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void addPointsToSinglePlayerReturns400WhenTheyAlreadyHavePoints() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        CollegeTeam collegeTeam = new CollegeTeam("A");
        String id = UUID.randomUUID().toString();
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 5, 0, false, 0, false, false, id, 0);
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(any(), any())).thenReturn(Optional.of(new PlayerPoints()));
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.addPointsToSinglePlayer(user, playerPointsDTO, response);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void editingPointsForPlayerReturns201WhenSuccessful() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        Integer newGoals = 250;
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(newGoals, 10, 90, false, 0, false, false, player.getId().toString(), 0);
        PlayerPoints playerPoints = new PlayerPoints(3, 2, 0, false, 0, false, false, new Date(), player, 0);
        playerManager.addPointsToPlayer(playerPoints);
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.of(playerPoints));
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.editPointsForPlayer(user, playerPointsDTO, response);
        TestCase.assertEquals(201, response.getStatus());
    }

    @Test
    public void editingPointsForPlayerReturns400WhenPlayerHasNoPoints() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        Integer newGoals = 250;
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(newGoals, 10, 90, false, 0, false, false, player.getId().toString(), 0);
        PlayerPoints playerPoints = new PlayerPoints(3, 2, 0, false, 0, false, false, new Date(), player, 0);
        playerManager.addPointsToPlayer(playerPoints);
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.empty());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.editPointsForPlayer(user, playerPointsDTO, response);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void editingPointsForPlayerReturns400WhenPlayerDoesNotExist() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        Integer newGoals = 250;
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(newGoals, 10, 90, false, 0, false, false, player.getId().toString(), 0);
        PlayerPoints playerPoints = new PlayerPoints(3, 2, 0, false, 0, false, false, new Date(), player, 0);
        playerManager.addPointsToPlayer(playerPoints);
        when(playerRepo.findById(player.getId())).thenReturn(Optional.empty());
        MockHttpServletResponse response = new MockHttpServletResponse();
        playerController.editPointsForPlayer(user, playerPointsDTO, response);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void findingPlayersByCollegeTeamReturns201WhenSuccessful() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        CollegeTeam collegeTeam = new CollegeTeam("A");
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        List<Player> players = new ArrayList<>();
        players.add(player);

        when(teamRepo.findByName("A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findByCollegeTeam(collegeTeam)).thenReturn(players);
        List<PlayerDTO> result = playerController.findPlayersByCollegeTeam(user, response, "A");
        assertEquals(1, result.size());
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void findingPlayersByCollegeTeamReturns400WhenCollegeTeamDoesNotExist() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(teamRepo.findByName("A")).thenReturn(Optional.empty());
        playerController.findPlayersByCollegeTeam(user, response, "A");
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void makingPlayerReturns201WhenSuccessful() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        MakePlayerDTO playerDTO = new MakePlayerDTO("firstname", "surname", Enums.Position.ATTACKER, "A", 5.5);
        CollegeTeam collegeTeam = new CollegeTeam("A");
        when(teamRepo.findByName("A")).thenReturn(Optional.of(collegeTeam));
        playerController.makePlayer(user, playerDTO, response);
        TestCase.assertEquals(201, response.getStatus());
    }

    @Test
    public void makingPlayerReturns400WhenInvalidCollegeTeam() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        MakePlayerDTO playerDTO = new MakePlayerDTO("firstname", "surname", Enums.Position.ATTACKER, "A", 5.5);
        when(teamRepo.findByName("A")).thenReturn(Optional.empty());
        playerController.makePlayer(user, playerDTO, response);
        TestCase.assertEquals(400, response.getStatus());
    }

}

