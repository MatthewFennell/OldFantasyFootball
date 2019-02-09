package uk.co.scottlogic.gradProject.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.documents.*;
import uk.co.scottlogic.gradProject.server.routers.dto.AddMultiplePointsDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.MakePlayerDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerPointsDTO;

import java.util.*;

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
        Integer goals = 5;
        Integer assists = 4;
        CollegeTeam collegeTeam = new CollegeTeam("name");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        Integer score = goals * Constants.POINTS_PER_ATTACKER_GOAL + assists * Constants.POINTS_PER_ASSIST;
        playerManager.addPointsToPlayer(player, new Date(), goals, assists, false, 0, 0, false, false, 0);
        assertEquals(score, player.getTotalScore());
    }

    @Test
    public void addingPointsToPlayerAddsPointsToWeeklyTeamsTheyAreIn() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        CollegeTeam collegeTeam = new CollegeTeam("name");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");

        List<Player> playersInWeeklyTeam = new ArrayList<>();
        List<UsersWeeklyTeam> teams = new ArrayList<>();
        playersInWeeklyTeam.add(player);

        UsersWeeklyTeam weeklyTeam_one = new UsersWeeklyTeam(user, new Date(), playersInWeeklyTeam, 0);
        UsersWeeklyTeam weeklyTeam_two = new UsersWeeklyTeam(user, new Date(), playersInWeeklyTeam, 0);

        teams.add(weeklyTeam_one);
        teams.add(weeklyTeam_two);
        when(weeklyTeamRepo.findByPlayers(player)).thenReturn(teams);
        Integer goals = 5;
        Integer assists = 1;
        Integer expectedScore = goals * Constants.POINTS_PER_ATTACKER_GOAL + assists * Constants.POINTS_PER_ASSIST;
        playerManager.addPointsToPlayer(player, new Date(), goals, assists, false, 0, 0, false, false, 0);

        assertEquals(expectedScore, weeklyTeam_one.getPoints());
        assertEquals(expectedScore, weeklyTeam_two.getPoints());
    }

    @Test
    public void addingPointsToPlayerChangesTheirWeeklyScoreObject() {
        Integer goals = 5;
        Integer assists = 4;
        CollegeTeam collegeTeam = new CollegeTeam("name");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        Integer score = goals * Constants.POINTS_PER_ATTACKER_GOAL + assists * Constants.POINTS_PER_ASSIST;
        PlayerPoints playerPoints = new PlayerPoints(goals,assists, 0, false, 0, false, false, new Date(), player, 0);
        playerManager.addPointsToPlayer(playerPoints);
        assertEquals(score, player.getTotalScore());
    }

    @Test
    public void addingPointsToPlayerAddsPointsToWeeklyTeamsTheyAreInObject() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        CollegeTeam collegeTeam = new CollegeTeam("name");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");

        List<Player> playersInWeeklyTeam = new ArrayList<>();
        List<UsersWeeklyTeam> teams = new ArrayList<>();
        playersInWeeklyTeam.add(player);

        UsersWeeklyTeam weeklyTeam_one = new UsersWeeklyTeam(user, new Date(), playersInWeeklyTeam, 0);
        UsersWeeklyTeam weeklyTeam_two = new UsersWeeklyTeam(user, new Date(), playersInWeeklyTeam, 0);

        teams.add(weeklyTeam_one);
        teams.add(weeklyTeam_two);
        when(weeklyTeamRepo.findByPlayers(player)).thenReturn(teams);
        Integer goals = 5;
        Integer assists = 1;
        Integer expectedScore = goals * Constants.POINTS_PER_ATTACKER_GOAL + assists * Constants.POINTS_PER_ASSIST;
        PlayerPoints playerPoints = new PlayerPoints(goals,assists, 0, false, 0, false, false, new Date(), player, 0);
        playerManager.addPointsToPlayer(playerPoints);
        assertEquals(expectedScore, weeklyTeam_one.getPoints());
        assertEquals(expectedScore, weeklyTeam_two.getPoints());
    }

    @Test
    public void findPointsForPlayerInAWeek() {
        Integer goals = 5;
        Integer assists = 3;
        Integer mins = 0;
        CollegeTeam collegeTeam = new CollegeTeam("name");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        PlayerPoints playerPoints = new PlayerPoints(goals, assists, mins, false, 0, false, false, new Date(), player, 0);
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.of(playerPoints));
        Integer score = goals * Constants.POINTS_PER_ATTACKER_GOAL + assists * Constants.POINTS_PER_ASSIST;
        assertEquals(score, playerManager.findPointsForPlayerInWeek(player, 0));
    }

    @Test
    public void findPlayerWithMostPointsReturnsCorrectType() {
        List<PlayerPoints> playerPoints = new ArrayList<>();
        playerPoints.add(new PlayerPoints());
        when(playerPointsRepo.findPlayerWithMostPoints(any())).thenReturn(playerPoints);
        assertEquals(playerPoints, playerManager.findPlayerWithMostPointsInWeek(0));
    }

    @Test
    public void findPointsForPlayerInAWeekReturnsZeroIfPlayerDoesNotExistAndWeekZero() {
        CollegeTeam collegeTeam = new CollegeTeam("name");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.empty());
        assertEquals(Integer.valueOf(0), playerManager.findPointsForPlayerInWeek(player, 0));
    }

    @Test
    public void findPointsForPlayerInAWeekReturns0IfPlayerDoesNotExistAndNotWeekZero() {
        Player player = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 10, "firstname", "surname");
        when(playerPointsRepo.findByPlayerByWeek(player, 1)).thenReturn(Optional.empty());
        Integer points = playerManager.findPointsForPlayerInWeek(player, 1);
        assertEquals(Integer.valueOf(0), points);
    }

    @Test
    public void filterGoalkeepersReturnsOnlyKeepers() {
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
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

    @Test(expected = IllegalArgumentException.class)
    public void throwsExceptionIfCollegeTeamDoesNotExist() {
        when(teamRepo.findByName(any())).thenReturn(Optional.empty());
        playerManager.formatFilter("college_team", Enums.Position.GOALKEEPER, 0, 0, "", null);
    }

    @Test
    public void goalkeeperGetsSixPointsForEachGoal() {
        Integer goals = 2;
        Integer goalkeeperMultiplier = 6;
        Player player = new Player();
        player.setPosition(Enums.Position.GOALKEEPER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals * goalkeeperMultiplier;
        assertEquals(numberOfPoints, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void defenderGetsSixPointsForEachGoal() {
        Integer goals = 2;
        Integer defenderMultiplier = Constants.POINTS_PER_DEFENDER_GOAL;
        Player player = new Player();
        player.setPosition(Enums.Position.DEFENDER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals * defenderMultiplier;
        assertEquals(numberOfPoints, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void midfielderGetsFivePointsForEachGoal() {
        Integer goals = 2;
        Player player = new Player();
        player.setPosition(Enums.Position.MIDFIELDER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals * Constants.POINTS_PER_MIDFIELDER_GOAL;
        assertEquals(numberOfPoints, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void attackerGetsFourPointsForEachGoal() {
        Integer goals = 2;
        Player player = new Player();
        player.setPosition(Enums.Position.ATTACKER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals * Constants.POINTS_PER_ATTACKER_GOAL;
        assertEquals(numberOfPoints, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void playerGetsThreePointsPerAssist() {
        Integer assists = 5;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, assists, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = assists * Constants.POINTS_PER_ASSIST;
        assertEquals(numberOfPoints, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void loseOnePointPerYellowCard() {
        Integer yellowCards = 2;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, yellowCards, false, false, null, player, 0);
        Integer numberOfPoints = yellowCards * Constants.POINTS_PER_YELLOW_CARD;
        assertEquals(numberOfPoints, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void loseThreePointsForRedCard() {
        Integer recCardPenalty = Constants.POINTS_PER_RED_CARD;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, true, false, null, player, 0);
        assertEquals(recCardPenalty, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void getThreePointsForManOfTheMatch() {
        Integer manOfTheMatchBonus = Constants.MAN_OF_THE_MATCH_BONUS;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, true, 0, false, false, null, player, 0);
        assertEquals(manOfTheMatchBonus, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void goalkeeperGetsFourPointsForCleanSheet() {
        Integer goalKeeperCleanSheetMultiplier = Constants.POINTS_PER_CLEAN_SHEET;
        Player player = new Player();
        player.setPosition(Enums.Position.GOALKEEPER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(goalKeeperCleanSheetMultiplier, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void defenderGetsFourPointsForCleanSheet() {
        Integer defenderCleanSheetMultiplier = Constants.POINTS_PER_CLEAN_SHEET;
        Player player = new Player();
        player.setPosition(Enums.Position.DEFENDER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(defenderCleanSheetMultiplier, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void midfielderGetsZeroPointsForCleanSheet() {
        Integer midfielderCleanSheetMultiplier = 0;
        Player player = new Player();
        player.setPosition(Enums.Position.MIDFIELDER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(midfielderCleanSheetMultiplier, playerManager.calculateScore(playerPoints));
    }

    @Test
    public void attackerGetsZeroPointsForCleanSheet() {
        Integer attackerCleanSheetMultiplier = 0;
        Player player = new Player();
        player.setPosition(Enums.Position.ATTACKER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(attackerCleanSheetMultiplier, playerManager.calculateScore(playerPoints));
    }

    @Test(expected = IllegalArgumentException.class)
    public void addingPointsToSeveralPlayersThrowsIllegalArgumentIfPlayerDoesNotExist() {
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 10, 90, false, 0, false, false, "id", 0);
        List<PlayerPointsDTO> playerPointsDTOS = new ArrayList<>();
        playerPointsDTOS.add(playerPointsDTO);
        AddMultiplePointsDTO dto = new AddMultiplePointsDTO(playerPointsDTOS);
        when(playerRepo.findById(player.getId())).thenReturn(Optional.empty());
        playerManager.addPointsToSeveralPlayers(dto);
    }

    @Test
    public void addingPointsToSinglePlayerGivesThemPoints() {
        Integer goals = 10;
        Integer assists = 5;
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(goals, assists, 90, false, 0, false, false, player.getId().toString(), 0);
        List<PlayerPointsDTO> playerPointsDTOS = new ArrayList<>();
        playerPointsDTOS.add(playerPointsDTO);
        AddMultiplePointsDTO dto = new AddMultiplePointsDTO(playerPointsDTOS);
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.empty());
        playerManager.addPointsToSeveralPlayers(dto);
        assertEquals(goals, player.getTotalGoals());
        assertEquals(assists, player.getTotalAssists());
    }

    @Test(expected = IllegalArgumentException.class)
    public void editingPointsOfPlayerWhoHasNoneInThatWeekThrowsIllegalArgument() {
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 10, 90, false, 0, false, false, "id", 0);
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.empty());
        playerManager.editPoints(playerPointsDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void editingPointsOfPlayerWhoDoesNotExistThrowsIllegalArgument() {
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 10, 90, false, 0, false, false, "id", 0);
        when(playerRepo.findById(player.getId())).thenReturn(Optional.empty());
        playerManager.editPoints(playerPointsDTO);
    }

    @Test
    public void editingPointsOfPlayerUpdatesTheirPointsObject() {
        Integer newGoals = 250;
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(newGoals, 10, 90, false, 0, false, false, player.getId().toString(), 0);
        PlayerPoints playerPoints = new PlayerPoints(3, 2, 0, false, 0, false, false, new Date(), player, 0);
        playerManager.addPointsToPlayer(playerPoints);

        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.of(playerPoints));
        playerManager.editPoints(playerPointsDTO);
        assertEquals(newGoals, player.getTotalGoals());
    }

    @Test
    public void playerIsDeletedIfTheyAreNotInAnyWeeklyTeam(){
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(weeklyTeamRepo.findAll()).thenReturn(Collections.emptyList());
        playerManager.deletePlayer(player.getId().toString());
    }

    @Test(expected = IllegalArgumentException.class)
    public void playerIsNotDeletedIfTheyAreInAnyWeeklyTeam(){
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        List<Player> players = new ArrayList<>();
        players.add(player);
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam(user, new Date(), players, 0);
        List<UsersWeeklyTeam> teams = new ArrayList<>();
        teams.add(weeklyTeam);
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(weeklyTeamRepo.findAll()).thenReturn(teams);
        playerManager.deletePlayer(player.getId().toString());
    }

    @Test(expected = IllegalArgumentException.class)
    public void deletePlayerThrowsExceptionIfTheyDoNotExist(){
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        when(playerRepo.findById(player.getId())).thenReturn(Optional.empty());
        playerManager.deletePlayer(player.getId().toString());
    }

    @Test
    public void canMakePlayerWithDTO(){
        MakePlayerDTO playerDTO = new MakePlayerDTO("firstname", "surname", Enums.Position.ATTACKER, "A", 5.5);
        CollegeTeam collegeTeam = new CollegeTeam("A");
        when(teamRepo.findByName("A")).thenReturn(Optional.of(collegeTeam));
        playerManager.makePlayer(playerDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void makingPlayerWithDTOThrowsExceptionIfCollegeTeamDoesNotExist(){
        MakePlayerDTO playerDTO = new MakePlayerDTO("firstname", "surname", Enums.Position.ATTACKER, "A", 5.5);
        when(teamRepo.findByName("A")).thenReturn(Optional.empty());
        playerManager.makePlayer(playerDTO);
    }

    @Test
    public void findingPlayersInCollegeTeamFindsThemCorrectly(){
        CollegeTeam collegeTeam = new CollegeTeam("A");
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        List<Player> players = new ArrayList<>();
        players.add(player);

        when(teamRepo.findByName("A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findByCollegeTeam(collegeTeam)).thenReturn(players);
        playerManager.findPlayersByCollegeTeam("A");

    }

    @Test(expected = IllegalArgumentException.class)
    public void findingPlayersInCollegeTeamThrowsExceptionIfCollegeTeamDoesNotExist(){
        when(teamRepo.findByName("A")).thenReturn(Optional.empty());
        playerManager.findPlayersByCollegeTeam("A");
    }

    @Test
    public void addingPointsToSinglePlayerPerformsCorrectlyIfTheyHaveNoPointsForThatWeekAlready(){
        CollegeTeam collegeTeam = new CollegeTeam("A");
        String id = UUID.randomUUID().toString();
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 5, 0, false, 0, false, false, id, 0);
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(any(), any())).thenReturn(Optional.empty());
        playerManager.addPointsToSinglePlayer(playerPointsDTO);
        assertEquals(Integer.valueOf(10), player.getTotalGoals());
        assertEquals(Integer.valueOf(5), player.getTotalAssists());
    }

    @Test(expected = IllegalArgumentException.class)
    public void addingPointsToSinglePlayerThrowsExceptionIfTheyAlreadyHavePoints(){
        CollegeTeam collegeTeam = new CollegeTeam("A");
        String id = UUID.randomUUID().toString();
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 5, 0, false, 0, false, false, id, 0);
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(any(), any())).thenReturn(Optional.of(new PlayerPoints()));
        playerManager.addPointsToSinglePlayer(playerPointsDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void addingPointsToSinglePlayerThrowsExceptionIfThePlayerDoesNotExist(){
        String id = UUID.randomUUID().toString();
        PlayerPointsDTO playerPointsDTO = new PlayerPointsDTO(10, 5, 0, false, 0, false, false, id, 0);
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.empty());
        playerManager.addPointsToSinglePlayer(playerPointsDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void findingStatsForPlayerInWeekThrowsExceptionIfPlayerDoesNotExist(){
        String id = UUID.randomUUID().toString();
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.empty());
        playerManager.findStatsForPlayerInWeek(id, 0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void findingStatsForPlayerInWeekThrowsExceptionIfPlayerHasNoPointsThatWeek(){
        CollegeTeam collegeTeam = new CollegeTeam("A");
        String id = UUID.randomUUID().toString();
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.empty());
        playerManager.findStatsForPlayerInWeek(id, 0);
    }

    @Test
    public void findingStatsForPlayerInWeekReturnsSuccessfullyIfTheyHavePointsInThatWeek(){
        Integer goals = 10;
        Integer assists = 5;
        CollegeTeam collegeTeam = new CollegeTeam("A");
        String id = UUID.randomUUID().toString();
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        PlayerPoints playerPoints = new PlayerPoints(goals,assists, 0, false, 0, false, false, new Date(), player, 0);
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.of(playerPoints));
        PlayerPoints pp = playerManager.findStatsForPlayerInWeek(id, 0);
        assertEquals(goals, pp.getNumberOfGoals());
        assertEquals(assists, pp.getNumberOfAssists());
    }

    @Test(expected = IllegalArgumentException.class)
    public void changingPlayersCollegeTeamThrowsExceptionWhenPlayerDoesNotExist(){
        String id = UUID.randomUUID().toString();
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.empty());
        playerManager.changePlayersCollegeTeam(id, "");
    }

    @Test(expected = IllegalArgumentException.class)
    public void changingPlayersCollegeTeamThrowsExceptionWhenCollegeTeamDoesNotExist(){
        String id = UUID.randomUUID().toString();
        String name = "name";
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.of(player));
        when(teamRepo.findByName(name)).thenReturn(Optional.empty());
        playerManager.changePlayersCollegeTeam(id, name);
    }

    @Test
    public void changingPlayersCollegeTeamThrowsUpdatesTeam(){
        String id = UUID.randomUUID().toString();
        String name = "name";
        CollegeTeam collegeTeam = new CollegeTeam("A");
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        when(playerRepo.findById(UUID.fromString(id))).thenReturn(Optional.of(player));
        when(teamRepo.findByName(name)).thenReturn(Optional.of(collegeTeam));
        playerManager.changePlayersCollegeTeam(id, name);
        assertEquals(collegeTeam.getName(), player.getActiveTeam().getName());
    }


}
