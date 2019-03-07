package uk.co.scottlogic.gradProject.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.documents.*;
import uk.co.scottlogic.gradProject.server.routers.dto.*;

import java.util.*;

import static junit.framework.TestCase.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
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
        when(weeklyTeamRepo.findByPlayersAndWeek(player, 0)).thenReturn(teams);
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
        when(weeklyTeamRepo.findByPlayersAndWeek(player, 0)).thenReturn(teams);
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

    @Test
    public void makeNewWeekCreatesNewUsersWeeklyTeamForEachUser(){

        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser user1 = new ApplicationUser("b", "123456", "b", "b", "a@a.com");
        ApplicationUser user2= new ApplicationUser("c", "123456", "c", "c", "a@a.com");
        ApplicationUser user3= new ApplicationUser("c", "123456", "c", "c", "a@a.com");

        UsersWeeklyTeam uwt = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt1 = new UsersWeeklyTeam(user1, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt2 = new UsersWeeklyTeam(user2, new Date(), new ArrayList<>(), 0);

        List<ApplicationUser> users = new ArrayList<>();
        users.add(user);
        users.add(user1);
        users.add(user2);
        users.add(user3);

        when(applicationUserRepo.findAll()).thenReturn(users);
        when(weeklyTeamRepo.findActiveTeam(user)).thenReturn(Optional.of(uwt));
        when(weeklyTeamRepo.findActiveTeam(user)).thenReturn(Optional.of(uwt1));
        when(weeklyTeamRepo.findActiveTeam(user2)).thenReturn(Optional.of(uwt2));

        playerManager.makeNewWeek(1);
    }

    @Test
    public void submittingOneResultUpdatesCollegeWin(){
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        SubmitPointsDTO dto = new SubmitPointsDTO(100, 10, 0, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "college_team");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(0);
        when(teamRepo.findByName("college_team")).thenReturn(Optional.of(collegeTeam));
        playerManager.submitResults(dto);
        assertEquals(Integer.valueOf(1), collegeTeam.getWins());
        assertEquals(Integer.valueOf(0), collegeTeam.getDraws());
        assertEquals(Integer.valueOf(0), collegeTeam.getLosses());
    }

    @Test
    public void submittingOneResultUpdatesCollegeDraw(){
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        SubmitPointsDTO dto = new SubmitPointsDTO(100, 100, 0, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "college_team");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(0);
        when(teamRepo.findByName("college_team")).thenReturn(Optional.of(collegeTeam));
        playerManager.submitResults(dto);
        assertEquals(Integer.valueOf(0), collegeTeam.getWins());
        assertEquals(Integer.valueOf(1), collegeTeam.getDraws());
        assertEquals(Integer.valueOf(0), collegeTeam.getLosses());
    }

    @Test
    public void submittingOneResultUpdatesCollegeLoss(){
        CollegeTeam collegeTeam = new CollegeTeam("college_team");
        SubmitPointsDTO dto = new SubmitPointsDTO(1, 100, 0, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "college_team");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(0);
        when(teamRepo.findByName("college_team")).thenReturn(Optional.of(collegeTeam));
        playerManager.submitResults(dto);
        assertEquals(Integer.valueOf(0), collegeTeam.getWins());
        assertEquals(Integer.valueOf(0), collegeTeam.getDraws());
        assertEquals(Integer.valueOf(1), collegeTeam.getLosses());
    }

    @Test
    public void submittingOneResultUpdatesCollegeGoalsForAndAgainst(){
        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        SubmitPointsDTO dto = new SubmitPointsDTO(1532, 2710, 0, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(0);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        playerManager.submitResults(dto);
        assertEquals(Integer.valueOf(1532), collegeTeam.getGoalsFor());
        assertEquals(Integer.valueOf(2710), collegeTeam.getGoalsAgainst());
    }

    @Test
    public void submittingOneResultUpdatesGoalsForGoalscorer(){
        Integer week = 0;
        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        List<String> goalScorers = new ArrayList<>();
        goalScorers.add(player.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, goalScorers, new ArrayList<>(), new ArrayList<>(), "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        playerManager.submitResults(dto);
        assertEquals(Integer.valueOf(1), player.getTotalGoals());
        assertEquals(Integer.valueOf(1), playerPoints.getNumberOfGoals());
        assertEquals(Constants.POINTS_PER_ATTACKER_GOAL, playerPoints.getPoints());
    }

    @Test
    public void submittingOneResultUpdatesAssistsForAssistMaker(){
        Integer week = 0;
        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        List<String> assists = new ArrayList<>();
        assists.add(player.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, new ArrayList<>(), assists, new ArrayList<>(), "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        playerManager.submitResults(dto);
        assertEquals(Integer.valueOf(1), player.getTotalAssists());
        assertEquals(Integer.valueOf(1), playerPoints.getNumberOfAssists());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints.getPoints());
    }

    @Test
    public void submittingOneResultUpdatesCleanSheetsForCleanSheetsDefenders(){
        Integer week = 0;
        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "p", "s");
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        List<String> cleanSheets = new ArrayList<>();
        cleanSheets.add(player.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, new ArrayList<>(), new ArrayList<>(), cleanSheets, "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        playerManager.submitResults(dto);
        assertTrue(playerPoints.isCleanSheet());
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints.getPoints());
    }

    @Test
    public void submittingOneResultUpdatesPointsForUsersWithGoalscorerInTheirTeamForThatWeek(){
        Integer week = 0;
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        UsersWeeklyTeam uwt = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), week);

        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        List<String> goalScorers = new ArrayList<>();
        goalScorers.add(player.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, goalScorers, new ArrayList<>(), new ArrayList<>(), "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        when(weeklyTeamRepo.findByPlayersAndWeek(player, 0)).thenReturn(Collections.singletonList(uwt));
        playerManager.submitResults(dto);
        assertEquals(Constants.POINTS_PER_ATTACKER_GOAL, uwt.getPoints());
        assertEquals(Constants.POINTS_PER_ATTACKER_GOAL, user.getTotalPoints());
    }

    @Test
    public void submittingOneResultUpdatesPointsForUsersWithAssistMakerInTheirTeamForThatWeek(){
        Integer week = 0;
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        UsersWeeklyTeam uwt = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), week);

        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        List<String> assists = new ArrayList<>();
        assists.add(player.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, new ArrayList<>(), assists, new ArrayList<>(), "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        when(weeklyTeamRepo.findByPlayersAndWeek(player, 0)).thenReturn(Collections.singletonList(uwt));
        playerManager.submitResults(dto);
        assertEquals(Constants.POINTS_PER_ASSIST, uwt.getPoints());
        assertEquals(Constants.POINTS_PER_ASSIST, user.getTotalPoints());
    }

    @Test
    public void submittingOneResultUpdatesPointsForUsersWithCleanSheetsPlayersInTheirTeamForThatWeek(){
        Integer week = 0;
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        UsersWeeklyTeam uwt = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), week);

        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "p", "s");
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        List<String> cleanSheets = new ArrayList<>();
        cleanSheets.add(player.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, new ArrayList<>(), new ArrayList<>(),cleanSheets, "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        when(weeklyTeamRepo.findByPlayersAndWeek(player, 0)).thenReturn(Collections.singletonList(uwt));
        playerManager.submitResults(dto);
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, uwt.getPoints());
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, user.getTotalPoints());
    }

    @Test
    public void submittingOneResultUpdatesPointsForMultipleGoalscorers(){
        Integer week = 0;
        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        Player player1 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "pp", "s");
        Player player2 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "ppp", "s");
        Player player3 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "pppp", "s");
        Player player4 = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "pppppp", "s");

        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        PlayerPoints playerPoints1 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player1, week);
        PlayerPoints playerPoints2 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player2, week);
        PlayerPoints playerPoints3 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player3, week);
        PlayerPoints playerPoints4 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player4, week);

        List<String> goalScorers = new ArrayList<>();
        goalScorers.add(player.getId().toString());
        goalScorers.add(player1.getId().toString());
        goalScorers.add(player2.getId().toString());
        goalScorers.add(player3.getId().toString());
        goalScorers.add(player4.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(5, 0, week, goalScorers, new ArrayList<>(), new ArrayList<>(), "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerRepo.findById(player1.getId())).thenReturn(Optional.of(player1));
        when(playerRepo.findById(player2.getId())).thenReturn(Optional.of(player2));
        when(playerRepo.findById(player3.getId())).thenReturn(Optional.of(player3));
        when(playerRepo.findById(player4.getId())).thenReturn(Optional.of(player4));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        when(playerPointsRepo.findByPlayerByWeek(player1, week)).thenReturn(Optional.of(playerPoints1));
        when(playerPointsRepo.findByPlayerByWeek(player2, week)).thenReturn(Optional.of(playerPoints2));
        when(playerPointsRepo.findByPlayerByWeek(player3, week)).thenReturn(Optional.of(playerPoints3));
        when(playerPointsRepo.findByPlayerByWeek(player4, week)).thenReturn(Optional.of(playerPoints4));
        playerManager.submitResults(dto);
        assertEquals(Integer.valueOf(1), player.getTotalGoals());
        assertEquals(Integer.valueOf(1), playerPoints.getNumberOfGoals());

        assertEquals(Integer.valueOf(1), player1.getTotalGoals());
        assertEquals(Integer.valueOf(1), playerPoints1.getNumberOfGoals());

        assertEquals(Integer.valueOf(1), player2.getTotalGoals());
        assertEquals(Integer.valueOf(1), playerPoints2.getNumberOfGoals());

        assertEquals(Integer.valueOf(1), player3.getTotalGoals());
        assertEquals(Integer.valueOf(1), playerPoints3.getNumberOfGoals());

        assertEquals(Integer.valueOf(1), player4.getTotalGoals());
        assertEquals(Integer.valueOf(1), playerPoints4.getNumberOfGoals());
        assertEquals(Constants.POINTS_PER_ATTACKER_GOAL, playerPoints.getPoints());
        assertEquals(Constants.POINTS_PER_MIDFIELDER_GOAL, playerPoints1.getPoints());
        assertEquals(Constants.POINTS_PER_MIDFIELDER_GOAL, playerPoints2.getPoints());
        assertEquals(Constants.POINTS_PER_DEFENDER_GOAL, playerPoints3.getPoints());
        assertEquals(Constants.POINTS_PER_DEFENDER_GOAL, playerPoints4.getPoints());
    }

    @Test
    public void submittingOneResultUpdatesPointsForMultipleAssists(){
        Integer week = 0;
        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        Player player1 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "pp", "ss");
        Player player2 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "ppp", "sss");
        Player player3 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "pppp", "ssss");
        Player player4 = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "ppppp", "sssss");

        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        PlayerPoints playerPoints1 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player1, week);
        PlayerPoints playerPoints2 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player2, week);
        PlayerPoints playerPoints3 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player3, week);
        PlayerPoints playerPoints4 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player4, week);

        List<String> assists = new ArrayList<>();
        assists.add(player.getId().toString());
        assists.add(player1.getId().toString());
        assists.add(player2.getId().toString());
        assists.add(player3.getId().toString());
        assists.add(player4.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(5, 0, week, new ArrayList<>(), assists, new ArrayList<>(), "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerRepo.findById(player1.getId())).thenReturn(Optional.of(player1));
        when(playerRepo.findById(player2.getId())).thenReturn(Optional.of(player2));
        when(playerRepo.findById(player3.getId())).thenReturn(Optional.of(player3));
        when(playerRepo.findById(player4.getId())).thenReturn(Optional.of(player4));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        when(playerPointsRepo.findByPlayerByWeek(player1, week)).thenReturn(Optional.of(playerPoints1));
        when(playerPointsRepo.findByPlayerByWeek(player2, week)).thenReturn(Optional.of(playerPoints2));
        when(playerPointsRepo.findByPlayerByWeek(player3, week)).thenReturn(Optional.of(playerPoints3));
        when(playerPointsRepo.findByPlayerByWeek(player4, week)).thenReturn(Optional.of(playerPoints4));
        playerManager.submitResults(dto);
        assertEquals(Integer.valueOf(1), player.getTotalAssists());
        assertEquals(Integer.valueOf(1), playerPoints.getNumberOfAssists());

        assertEquals(Integer.valueOf(1), player1.getTotalAssists());
        assertEquals(Integer.valueOf(1), playerPoints1.getNumberOfAssists());

        assertEquals(Integer.valueOf(1), player2.getTotalAssists());
        assertEquals(Integer.valueOf(1), playerPoints2.getNumberOfAssists());

        assertEquals(Integer.valueOf(1), player3.getTotalAssists());
        assertEquals(Integer.valueOf(1), playerPoints3.getNumberOfAssists());

        assertEquals(Integer.valueOf(1), player4.getTotalAssists());
        assertEquals(Integer.valueOf(1), playerPoints4.getNumberOfAssists());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints.getPoints());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints1.getPoints());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints2.getPoints());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints3.getPoints());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints4.getPoints());
    }

    @Test
    public void submittingOneResultUpdatesPointsForMultipleCleanSheetsAndZeroPointsIfTheyAreAnAttacker(){
        Integer week = 0;
        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "p", "s");
        Player player1 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "pp", "ss");
        Player player2 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "ppp", "sss");
        Player player3 = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "pppp", "ssss");
        Player player4 = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "ppppp", "sssss");

        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        PlayerPoints playerPoints1 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player1, week);
        PlayerPoints playerPoints2 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player2, week);
        PlayerPoints playerPoints3 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player3, week);
        PlayerPoints playerPoints4 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player4, week);

        List<String> cleanSheets = new ArrayList<>();
        cleanSheets.add(player.getId().toString());
        cleanSheets.add(player1.getId().toString());
        cleanSheets.add(player2.getId().toString());
        cleanSheets.add(player3.getId().toString());
        cleanSheets.add(player4.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(5, 0, week, new ArrayList<>(), new ArrayList<>(), cleanSheets, "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerRepo.findById(player1.getId())).thenReturn(Optional.of(player1));
        when(playerRepo.findById(player2.getId())).thenReturn(Optional.of(player2));
        when(playerRepo.findById(player3.getId())).thenReturn(Optional.of(player3));
        when(playerRepo.findById(player4.getId())).thenReturn(Optional.of(player4));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        when(playerPointsRepo.findByPlayerByWeek(player1, week)).thenReturn(Optional.of(playerPoints1));
        when(playerPointsRepo.findByPlayerByWeek(player2, week)).thenReturn(Optional.of(playerPoints2));
        when(playerPointsRepo.findByPlayerByWeek(player3, week)).thenReturn(Optional.of(playerPoints3));
        when(playerPointsRepo.findByPlayerByWeek(player4, week)).thenReturn(Optional.of(playerPoints4));
        playerManager.submitResults(dto);
        assertTrue(playerPoints.isCleanSheet());
        assertTrue(playerPoints1.isCleanSheet());
        assertTrue(playerPoints2.isCleanSheet());
        assertTrue(playerPoints3.isCleanSheet());
        assertTrue(playerPoints4.isCleanSheet());

        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints.getPoints());
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints1.getPoints());
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints2.getPoints());
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints3.getPoints());
        assertEquals(Integer.valueOf(0), playerPoints4.getPoints());
    }

    @Test
    public void submittingOneResultUpdatesPointsForMultipleUsersWithGoalscorerAndAssistsAndCleanSheetsInTheirTeamForThatWeek(){
        Integer week = 0;
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser user1 = new ApplicationUser("b", "123456", "b", "b", "a@a.com");
        ApplicationUser user2 = new ApplicationUser("c", "123456", "c", "c", "a@a.com");
        UsersWeeklyTeam uwt = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), week);
        UsersWeeklyTeam uwt1 = new UsersWeeklyTeam(user1, new Date(), new ArrayList<>(), week);
        UsersWeeklyTeam uwt2 = new UsersWeeklyTeam(user2, new Date(), new ArrayList<>(), week);

        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        Player player1 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "pp", "s");
        Player player2 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "ppp", "s");
        Player player3 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "pppp", "s");

        Player player4 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "ppppp", "s");
        Player player5 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "pppppp", "s");
        Player player6 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "ppppppp", "s");
        Player player7 = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "pppppppp", "s");

        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        PlayerPoints playerPoints1 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player1, week);
        PlayerPoints playerPoints2 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player2, week);
        PlayerPoints playerPoints3 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player3, week);

        PlayerPoints playerPoints4 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player4, week);
        PlayerPoints playerPoints5 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player5, week);
        PlayerPoints playerPoints6 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player6, week);
        PlayerPoints playerPoints7 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player7, week);

        List<UsersWeeklyTeam> weeklyTeams = new ArrayList<>();
        weeklyTeams.add(uwt);
        weeklyTeams.add(uwt1);
        weeklyTeams.add(uwt2);


        List<String> goalScorers = new ArrayList<>();
        goalScorers.add(player.getId().toString());
        goalScorers.add(player.getId().toString());
        goalScorers.add(player.getId().toString());
        goalScorers.add(player1.getId().toString());
        goalScorers.add(player2.getId().toString());
        goalScorers.add(player3.getId().toString());

        List<String> assists = new ArrayList<>();
        assists.add(player.getId().toString());
        assists.add(player1.getId().toString());
        assists.add(player2.getId().toString());
        assists.add(player3.getId().toString());
        assists.add(player3.getId().toString());
        assists.add(player4.getId().toString());

        List<String> cleanSheets = new ArrayList<>();
        cleanSheets.add(player4.getId().toString());
        cleanSheets.add(player5.getId().toString());
        cleanSheets.add(player6.getId().toString());
        cleanSheets.add(player7.getId().toString());


        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, goalScorers, assists, cleanSheets, "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerRepo.findById(player1.getId())).thenReturn(Optional.of(player1));
        when(playerRepo.findById(player2.getId())).thenReturn(Optional.of(player2));
        when(playerRepo.findById(player3.getId())).thenReturn(Optional.of(player3));

        when(playerRepo.findById(player4.getId())).thenReturn(Optional.of(player4));
        when(playerRepo.findById(player5.getId())).thenReturn(Optional.of(player5));
        when(playerRepo.findById(player6.getId())).thenReturn(Optional.of(player6));
        when(playerRepo.findById(player7.getId())).thenReturn(Optional.of(player7));

        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        when(playerPointsRepo.findByPlayerByWeek(player1, week)).thenReturn(Optional.of(playerPoints1));
        when(playerPointsRepo.findByPlayerByWeek(player2, week)).thenReturn(Optional.of(playerPoints2));
        when(playerPointsRepo.findByPlayerByWeek(player3, week)).thenReturn(Optional.of(playerPoints3));

        when(playerPointsRepo.findByPlayerByWeek(player4, week)).thenReturn(Optional.of(playerPoints4));
        when(playerPointsRepo.findByPlayerByWeek(player5, week)).thenReturn(Optional.of(playerPoints5));
        when(playerPointsRepo.findByPlayerByWeek(player6, week)).thenReturn(Optional.of(playerPoints6));
        when(playerPointsRepo.findByPlayerByWeek(player7, week)).thenReturn(Optional.of(playerPoints7));

        when(weeklyTeamRepo.findByPlayersAndWeek(any(), any())).thenReturn(weeklyTeams);
        playerManager.submitResults(dto);

        assertEquals(Integer.valueOf(3), player.getTotalGoals());
        assertEquals(Integer.valueOf(1), player1.getTotalGoals());
        assertEquals(Integer.valueOf(1), player2.getTotalGoals());
        assertEquals(Integer.valueOf(1), player3.getTotalGoals());

        assertEquals(Integer.valueOf(1), player.getTotalAssists());
        assertEquals(Integer.valueOf(1), player1.getTotalAssists());
        assertEquals(Integer.valueOf(1), player2.getTotalAssists());
        assertEquals(Integer.valueOf(2), player3.getTotalAssists());
        assertEquals(Integer.valueOf(1), player4.getTotalAssists());

        assertTrue(playerPoints4.isCleanSheet());
        assertTrue(playerPoints5.isCleanSheet());
        assertTrue(playerPoints6.isCleanSheet());
        assertTrue(playerPoints7.isCleanSheet());

        Integer pp = Constants.POINTS_PER_ATTACKER_GOAL*3 + Constants.POINTS_PER_ASSIST;
        Integer pp1 = Constants.POINTS_PER_MIDFIELDER_GOAL + Constants.POINTS_PER_ASSIST;
        Integer pp2 = Constants.POINTS_PER_MIDFIELDER_GOAL + Constants.POINTS_PER_ASSIST;
        Integer pp3 = Constants.POINTS_PER_DEFENDER_GOAL + Constants.POINTS_PER_ASSIST*2;

        Integer pp4 = Constants.POINTS_PER_ASSIST + Constants.POINTS_PER_CLEAN_SHEET;
        Integer pp5 = Constants.POINTS_PER_CLEAN_SHEET;
        Integer pp6 = Constants.POINTS_PER_CLEAN_SHEET;
        Integer pp7 = Constants.POINTS_PER_CLEAN_SHEET;

        Integer userScore = pp + pp1 + pp2 + pp3 + pp4 + pp5 + pp6 + pp7;

        assertEquals(pp, playerPoints.getPoints());
        assertEquals(pp1, playerPoints1.getPoints());
        assertEquals(pp2, playerPoints2.getPoints());
        assertEquals(pp3, playerPoints3.getPoints());
        assertEquals(pp4, playerPoints4.getPoints());
        assertEquals(pp5, playerPoints5.getPoints());
        assertEquals(pp6, playerPoints6.getPoints());
        assertEquals(pp7, playerPoints7.getPoints());

        assertEquals(uwt.getPoints(), user.getTotalPoints());
        assertEquals(uwt1.getPoints(), user.getTotalPoints());
        assertEquals(uwt2.getPoints(), user.getTotalPoints());

        assertEquals(userScore, uwt.getPoints());
        assertEquals(userScore, uwt1.getPoints());
        assertEquals(userScore, uwt2.getPoints());
    }

    @Test
    public void submittingMultipleResultsForSameWeekUpdatesCollegeResults(){
        CollegeTeam collegeTeam = new CollegeTeam("Men's A");
        SubmitPointsDTO dto = new SubmitPointsDTO(100, 10, 0, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "Men's A");
        SubmitPointsDTO dto1 = new SubmitPointsDTO(10, 100, 0, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "Men's A");
        SubmitPointsDTO dto2 = new SubmitPointsDTO(100, 100, 0, new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), "Men's A");
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(0);
        when(teamRepo.findByName("Men's A")).thenReturn(Optional.of(collegeTeam));
        playerManager.submitResults(dto);
        playerManager.submitResults(dto1);
        playerManager.submitResults(dto2);
        assertEquals(Integer.valueOf(1), collegeTeam.getWins());
        assertEquals(Integer.valueOf(1), collegeTeam.getDraws());
        assertEquals(Integer.valueOf(1), collegeTeam.getLosses());
    }

    @Test
    public void submittingMultipleResultsForSameWeekUpdatesGoalsForGoalscorer(){
        Integer week = 0;
        CollegeTeam collegeTeam = new CollegeTeam("Woman's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        List<String> goalScorers = new ArrayList<>();
        goalScorers.add(player.getId().toString());
        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, goalScorers, new ArrayList<>(), new ArrayList<>(), "Woman's A");
        SubmitPointsDTO dto1 = new SubmitPointsDTO(1, 0, week, goalScorers, new ArrayList<>(), new ArrayList<>(), "Woman's A");


        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Woman's A")).thenReturn(Optional.of(collegeTeam));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        playerManager.submitResults(dto);
        playerManager.submitResults(dto1);
        assertEquals(Integer.valueOf(2), player.getTotalGoals());
        assertEquals(Integer.valueOf(2), playerPoints.getNumberOfGoals());
        assertEquals(Integer.valueOf(Constants.POINTS_PER_ATTACKER_GOAL*2), playerPoints.getPoints());
    }

    @Test
    public void submittingMultipleResultsForSameWeekUpdatesMultiplePoints(){
        Integer week = 0;
        CollegeTeam collegeTeam = new CollegeTeam("Woman's A");
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        Player player1 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "firstname", "surname");
        Player player2 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "firstname", "surname");

        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, week);
        PlayerPoints playerPoints1 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player1, week);
        PlayerPoints playerPoints2 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player2, week);

        List<String> goalScorers = new ArrayList<>();
        List<String> assists = new ArrayList<>();
        List<String> cleanSheets = new ArrayList<>();

        goalScorers.add(player.getId().toString());
        assists.add(player1.getId().toString());
        cleanSheets.add(player2.getId().toString());

        SubmitPointsDTO dto = new SubmitPointsDTO(1, 0, week, goalScorers, new ArrayList<>(), new ArrayList<>(), "Woman's A");
        SubmitPointsDTO dto1 = new SubmitPointsDTO(1, 0, week, new ArrayList<>(), assists, new ArrayList<>(), "Woman's A");
        SubmitPointsDTO dto2 = new SubmitPointsDTO(1, 0, week, new ArrayList<>(), new ArrayList<>(), cleanSheets, "Woman's A");

        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(week);
        when(teamRepo.findByName("Woman's A")).thenReturn(Optional.of(collegeTeam));

        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerRepo.findById(player1.getId())).thenReturn(Optional.of(player1));
        when(playerRepo.findById(player2.getId())).thenReturn(Optional.of(player2));

        when(playerPointsRepo.findByPlayerByWeek(player, week)).thenReturn(Optional.of(playerPoints));
        when(playerPointsRepo.findByPlayerByWeek(player1, week)).thenReturn(Optional.of(playerPoints1));
        when(playerPointsRepo.findByPlayerByWeek(player2, week)).thenReturn(Optional.of(playerPoints2));
        playerManager.submitResults(dto);
        playerManager.submitResults(dto1);
        playerManager.submitResults(dto2);
        assertEquals(Integer.valueOf(1), player.getTotalGoals());
        assertEquals(Integer.valueOf(1), playerPoints.getNumberOfGoals());

        assertEquals(Integer.valueOf(1), player1.getTotalAssists());
        assertEquals(Integer.valueOf(1), playerPoints1.getNumberOfAssists());

        assertTrue(playerPoints2.isCleanSheet());

        assertEquals(Constants.POINTS_PER_ATTACKER_GOAL, playerPoints.getPoints());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints1.getPoints());
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints2.getPoints());
    }

    @Test
    public void submittingMultipleResultsForDifferentWeeksUpdatedMultipleUsersPointsForMultipleDifferentTeams() {

        CollegeTeam collegeTeam = new CollegeTeam("Woman's A");

        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        Player player1 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "pp", "ss");
        Player player2 = new Player(collegeTeam, Enums.Position.MIDFIELDER, 10, "ppp", "sss");
        Player player3 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "pppp", "ssss");

        Player player4 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "ppppp", "sssss");
        Player player5 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "pppppp", "ssssss");
        Player player6 = new Player(collegeTeam, Enums.Position.DEFENDER, 10, "ppppppp", "sssssss");
        Player player7 = new Player(collegeTeam, Enums.Position.GOALKEEPER, 10, "pppppppp", "ssssssss");

        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));
        when(playerRepo.findById(player1.getId())).thenReturn(Optional.of(player1));
        when(playerRepo.findById(player2.getId())).thenReturn(Optional.of(player2));
        when(playerRepo.findById(player3.getId())).thenReturn(Optional.of(player3));

        when(playerRepo.findById(player4.getId())).thenReturn(Optional.of(player4));
        when(playerRepo.findById(player5.getId())).thenReturn(Optional.of(player5));
        when(playerRepo.findById(player6.getId())).thenReturn(Optional.of(player6));
        when(playerRepo.findById(player7.getId())).thenReturn(Optional.of(player7));

        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, 0);
        PlayerPoints playerPoints1 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player1, 0);
        PlayerPoints playerPoints2 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player2, 0);
        PlayerPoints playerPoints3 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player3, 0);

        PlayerPoints playerPoints4 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player4, 0);
        PlayerPoints playerPoints5 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player5, 0);
        PlayerPoints playerPoints6 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player6, 0);
        PlayerPoints playerPoints7 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player7, 0);

        PlayerPoints playerPoints00 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, 1);
        PlayerPoints playerPoints11 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player1, 1);
        PlayerPoints playerPoints22 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player2, 1);
        PlayerPoints playerPoints33 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player3, 1);

        PlayerPoints playerPoints44 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player4, 1);
        PlayerPoints playerPoints55 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player5, 1);
        PlayerPoints playerPoints66 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player6, 1);
        PlayerPoints playerPoints77 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player7, 1);

        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.of(playerPoints));
        when(playerPointsRepo.findByPlayerByWeek(player1, 0)).thenReturn(Optional.of(playerPoints1));
        when(playerPointsRepo.findByPlayerByWeek(player2, 0)).thenReturn(Optional.of(playerPoints2));
        when(playerPointsRepo.findByPlayerByWeek(player3, 0)).thenReturn(Optional.of(playerPoints3));

        when(playerPointsRepo.findByPlayerByWeek(player4, 0)).thenReturn(Optional.of(playerPoints4));
        when(playerPointsRepo.findByPlayerByWeek(player5, 0)).thenReturn(Optional.of(playerPoints5));
        when(playerPointsRepo.findByPlayerByWeek(player6, 0)).thenReturn(Optional.of(playerPoints6));
        when(playerPointsRepo.findByPlayerByWeek(player7, 0)).thenReturn(Optional.of(playerPoints7));

        when(playerPointsRepo.findByPlayerByWeek(player, 1)).thenReturn(Optional.of(playerPoints00));
        when(playerPointsRepo.findByPlayerByWeek(player1, 1)).thenReturn(Optional.of(playerPoints11));
        when(playerPointsRepo.findByPlayerByWeek(player2, 1)).thenReturn(Optional.of(playerPoints22));
        when(playerPointsRepo.findByPlayerByWeek(player3, 1)).thenReturn(Optional.of(playerPoints33));

        when(playerPointsRepo.findByPlayerByWeek(player4, 1)).thenReturn(Optional.of(playerPoints44));
        when(playerPointsRepo.findByPlayerByWeek(player5, 1)).thenReturn(Optional.of(playerPoints55));
        when(playerPointsRepo.findByPlayerByWeek(player6, 1)).thenReturn(Optional.of(playerPoints66));
        when(playerPointsRepo.findByPlayerByWeek(player7, 1)).thenReturn(Optional.of(playerPoints77));

        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser user1 = new ApplicationUser("b", "123456", "b", "b", "a@a.com");
        ApplicationUser user2 = new ApplicationUser("c", "123456", "c", "c", "a@a.com");

        UsersWeeklyTeam uwt0 = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt1 = new UsersWeeklyTeam(user1, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt2 = new UsersWeeklyTeam(user2, new Date(), new ArrayList<>(), 0);

        // uwt0 has players 0,2,4,7
        // uwt1 has players 1,3,5,7
        // uwt2 has players 0,3,6,7

        List<String> goalScorersWeekOne = new ArrayList<>();
        goalScorersWeekOne.add(player.getId().toString());
        goalScorersWeekOne.add(player2.getId().toString());

        List<String> assistsWeekOne = new ArrayList<>();
        assistsWeekOne.add(player5.getId().toString());
        assistsWeekOne.add(player6.getId().toString());

        List<String> cleanSheets = new ArrayList<>();
        cleanSheets.add(player4.getId().toString());
        cleanSheets.add(player5.getId().toString());

        // This says which weekly teams each player is in
        List<UsersWeeklyTeam> player0WeeklyTeams = new ArrayList<>();
        player0WeeklyTeams.add(uwt0);
        player0WeeklyTeams.add(uwt2);

        List<UsersWeeklyTeam> player3WeeklyTeams = new ArrayList<>();
        player3WeeklyTeams.add(uwt1);
        player3WeeklyTeams.add(uwt2);

        List<UsersWeeklyTeam> player7WeeklyTeams = new ArrayList<>();
        player7WeeklyTeams.add(uwt0);
        player7WeeklyTeams.add(uwt1);
        player7WeeklyTeams.add(uwt2);

        when(weeklyTeamRepo.findByPlayersAndWeek(player, 0)).thenReturn(player0WeeklyTeams);
        when(weeklyTeamRepo.findByPlayersAndWeek(player1, 0)).thenReturn(Collections.singletonList(uwt1));
        when(weeklyTeamRepo.findByPlayersAndWeek(player2, 0)).thenReturn(Collections.singletonList(uwt0));
        when(weeklyTeamRepo.findByPlayersAndWeek(player3, 0)).thenReturn(player3WeeklyTeams);

        when(weeklyTeamRepo.findByPlayersAndWeek(player4, 0)).thenReturn(Collections.singletonList(uwt0));
        when(weeklyTeamRepo.findByPlayersAndWeek(player5, 0)).thenReturn(Collections.singletonList(uwt1));
        when(weeklyTeamRepo.findByPlayersAndWeek(player6, 0)).thenReturn(Collections.singletonList(uwt2));
        when(weeklyTeamRepo.findByPlayersAndWeek(player7, 0)).thenReturn(player7WeeklyTeams);

        when(teamRepo.findByName("Woman's A")).thenReturn(Optional.of(collegeTeam));

        SubmitPointsDTO dto = new SubmitPointsDTO(2, 0, 0, goalScorersWeekOne, assistsWeekOne, cleanSheets, "Woman's A");
        playerManager.submitResults(dto);

        assertEquals(Constants.POINTS_PER_ATTACKER_GOAL, playerPoints.getPoints());
        assertEquals(Integer.valueOf(0), playerPoints1.getPoints());
        assertEquals(Constants.POINTS_PER_MIDFIELDER_GOAL, playerPoints2.getPoints());
        assertEquals(Integer.valueOf(0), playerPoints3.getPoints());

        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints4.getPoints());
        Integer playerFiveScore = Constants.POINTS_PER_ASSIST + Constants.POINTS_PER_CLEAN_SHEET;
        assertEquals(playerFiveScore, playerPoints5.getPoints());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints6.getPoints());
        assertEquals(Integer.valueOf(0), playerPoints7.getPoints());

        Integer user0ScoreWeekZero = Constants.POINTS_PER_ATTACKER_GOAL + Constants.POINTS_PER_MIDFIELDER_GOAL + Constants.POINTS_PER_CLEAN_SHEET;
        Integer user1ScoreWeekZero = Constants.POINTS_PER_ASSIST + Constants.POINTS_PER_CLEAN_SHEET;
        Integer user2ScoreWeekZero = Constants.POINTS_PER_ATTACKER_GOAL + Constants.POINTS_PER_ASSIST;

        assertEquals(user0ScoreWeekZero, uwt0.getPoints());
        assertEquals(user1ScoreWeekZero, uwt1.getPoints());
        assertEquals(user2ScoreWeekZero, uwt2.getPoints());

        assertEquals(uwt0.getPoints(), user.getTotalPoints());
        assertEquals(uwt1.getPoints(), user1.getTotalPoints());
        assertEquals(uwt2.getPoints(), user2.getTotalPoints());

        assertEquals(user0ScoreWeekZero, user.getTotalPoints());
        assertEquals(user1ScoreWeekZero, user1.getTotalPoints());
        assertEquals(user2ScoreWeekZero, user2.getTotalPoints());

        assertEquals(Integer.valueOf(1), playerPoints.getNumberOfGoals());
        assertEquals(Integer.valueOf(1), playerPoints2.getNumberOfGoals());

        assertEquals(Integer.valueOf(1), playerPoints5.getNumberOfAssists());
        assertEquals(Integer.valueOf(1), playerPoints6.getNumberOfAssists());

        assertTrue(playerPoints4.isCleanSheet());
        assertTrue(playerPoints5.isCleanSheet());

        List<String> goalScorersWeekTwo = new ArrayList<>();
        goalScorersWeekTwo.add(player3.getId().toString());
        goalScorersWeekTwo.add(player7.getId().toString());
        goalScorersWeekTwo.add(player7.getId().toString());
        goalScorersWeekTwo.add(player7.getId().toString());

        List<String> assistsWeekTwo = new ArrayList<>();
        assistsWeekTwo.add(player1.getId().toString());
        assistsWeekTwo.add(player2.getId().toString());
        assistsWeekTwo.add(player2.getId().toString());
        assistsWeekTwo.add(player4.getId().toString());

        List<String> cleanSheetsWeekTwo = new ArrayList<>();
        cleanSheetsWeekTwo.add(player4.getId().toString());
        cleanSheetsWeekTwo.add(player5.getId().toString());
        cleanSheetsWeekTwo.add(player6.getId().toString());
        cleanSheetsWeekTwo.add(player7.getId().toString());

        UsersWeeklyTeam uwt00 = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), 1);
        UsersWeeklyTeam uwt11 = new UsersWeeklyTeam(user1, new Date(), new ArrayList<>(), 1);
        UsersWeeklyTeam uwt22 = new UsersWeeklyTeam(user2, new Date(), new ArrayList<>(), 1);

        // uwt00 has players 1,2,3,4,7
        // uwt11 has players 2,3,4,5,6
        // uwt22 has players 3,4

        List<UsersWeeklyTeam> player2WeeklyTeamsTwo = new ArrayList<>();
        player2WeeklyTeamsTwo.add(uwt00);
        player2WeeklyTeamsTwo.add(uwt11);

        List<UsersWeeklyTeam> player3WeeklyTeamsTwo = new ArrayList<>();
        player3WeeklyTeamsTwo.add(uwt00);
        player3WeeklyTeamsTwo.add(uwt11);
        player3WeeklyTeamsTwo.add(uwt22);

        List<UsersWeeklyTeam> player4WeeklyTeamsTwo = new ArrayList<>();
        player4WeeklyTeamsTwo.add(uwt00);
        player4WeeklyTeamsTwo.add(uwt11);
        player4WeeklyTeamsTwo.add(uwt22);

        when(weeklyTeamRepo.findByPlayersAndWeek(player, 1)).thenReturn(Collections.emptyList());
        when(weeklyTeamRepo.findByPlayersAndWeek(player1, 1)).thenReturn(Collections.singletonList(uwt00));
        when(weeklyTeamRepo.findByPlayersAndWeek(player2, 1)).thenReturn(player2WeeklyTeamsTwo);
        when(weeklyTeamRepo.findByPlayersAndWeek(player3, 1)).thenReturn(player3WeeklyTeamsTwo);

        when(weeklyTeamRepo.findByPlayersAndWeek(player4, 1)).thenReturn(player4WeeklyTeamsTwo);
        when(weeklyTeamRepo.findByPlayersAndWeek(player5, 1)).thenReturn(Collections.singletonList(uwt11));
        when(weeklyTeamRepo.findByPlayersAndWeek(player6, 1)).thenReturn(Collections.singletonList(uwt11));
        when(weeklyTeamRepo.findByPlayersAndWeek(player7, 1)).thenReturn(Collections.singletonList(uwt00));


        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(1);
        SubmitPointsDTO dto1 = new SubmitPointsDTO(2, 0, 1, goalScorersWeekTwo, assistsWeekTwo, cleanSheetsWeekTwo, "Woman's A");
        playerManager.submitResults(dto1);

        assertEquals(Integer.valueOf(1), playerPoints33.getNumberOfGoals());
        assertEquals(Integer.valueOf(3), playerPoints77.getNumberOfGoals());

        assertEquals(Integer.valueOf(0), playerPoints00.getNumberOfGoals());
        assertEquals(Integer.valueOf(0), playerPoints11.getNumberOfGoals());
        assertEquals(Integer.valueOf(0), playerPoints22.getNumberOfGoals());
        assertEquals(Integer.valueOf(0), playerPoints44.getNumberOfGoals());
        assertEquals(Integer.valueOf(0), playerPoints55.getNumberOfGoals());
        assertEquals(Integer.valueOf(0), playerPoints66.getNumberOfGoals());

        assertEquals(Integer.valueOf(1), playerPoints11.getNumberOfAssists());
        assertEquals(Integer.valueOf(2), playerPoints22.getNumberOfAssists());
        assertEquals(Integer.valueOf(1), playerPoints44.getNumberOfAssists());

        assertEquals(Integer.valueOf(0), playerPoints00.getNumberOfAssists());
        assertEquals(Integer.valueOf(0), playerPoints33.getNumberOfAssists());
        assertEquals(Integer.valueOf(0), playerPoints55.getNumberOfAssists());
        assertEquals(Integer.valueOf(0), playerPoints66.getNumberOfAssists());
        assertEquals(Integer.valueOf(0), playerPoints77.getNumberOfAssists());

        assertTrue(playerPoints44.isCleanSheet());
        assertTrue(playerPoints55.isCleanSheet());
        assertTrue(playerPoints66.isCleanSheet());
        assertTrue(playerPoints77.isCleanSheet());

        assertFalse(playerPoints00.isCleanSheet());
        assertFalse(playerPoints11.isCleanSheet());
        assertFalse(playerPoints22.isCleanSheet());
        assertFalse(playerPoints33.isCleanSheet());

        Integer user0ScoreWeekTwo = Constants.POINTS_PER_DEFENDER_GOAL*4 +  Constants.POINTS_PER_ASSIST*4 + Constants.POINTS_PER_CLEAN_SHEET*2;
        Integer totalUserZeroPoints = user0ScoreWeekZero + user0ScoreWeekTwo;

        Integer user1ScoreWeekTwo = Constants.POINTS_PER_DEFENDER_GOAL + Constants.POINTS_PER_ASSIST*3 + Constants.POINTS_PER_CLEAN_SHEET*3;
        Integer totalUserOnePoints = user1ScoreWeekZero + user1ScoreWeekTwo;

        Integer user2ScoreWeekTwo = Constants.POINTS_PER_DEFENDER_GOAL + Constants.POINTS_PER_ASSIST + Constants.POINTS_PER_CLEAN_SHEET;
        Integer totalUserTwoPoints = user2ScoreWeekZero + user2ScoreWeekTwo;

        assertEquals(user0ScoreWeekTwo, uwt00.getPoints());
        assertEquals(totalUserZeroPoints, user.getTotalPoints());

        assertEquals(user1ScoreWeekTwo, uwt11.getPoints());
        assertEquals(totalUserOnePoints, user1.getTotalPoints());

        assertEquals(user2ScoreWeekTwo, uwt22.getPoints());
        assertEquals(totalUserTwoPoints, user2.getTotalPoints());

        // Check week zero details aren't changed
        assertEquals(Constants.POINTS_PER_ATTACKER_GOAL, playerPoints.getPoints());
        assertEquals(Integer.valueOf(0), playerPoints1.getPoints());
        assertEquals(Constants.POINTS_PER_MIDFIELDER_GOAL, playerPoints2.getPoints());
        assertEquals(Integer.valueOf(0), playerPoints3.getPoints());

        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints4.getPoints());
        assertEquals(playerFiveScore, playerPoints5.getPoints());
        assertEquals(Constants.POINTS_PER_ASSIST, playerPoints6.getPoints());
        assertEquals(Integer.valueOf(0), playerPoints7.getPoints());

        assertEquals(user0ScoreWeekZero, uwt0.getPoints());
        assertEquals(user1ScoreWeekZero, uwt1.getPoints());
        assertEquals(user2ScoreWeekZero, uwt2.getPoints());
    }

    @Test
    public void editingPlayerStatsChangesPointsForJustThatWeek(){
        // Only editing one week
        CollegeTeam collegeTeam = new CollegeTeam("Woman's A");

        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "p", "s");
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, 0);
        PlayerPoints playerPoints1 = new PlayerPoints(0, 0, 0, false, 0, false, false, new Date(), player, 1);

        when(playerPointsRepo.findByPlayerByWeek(player, 0)).thenReturn(Optional.of(playerPoints));
        when(playerPointsRepo.findByPlayerByWeek(player, 1)).thenReturn(Optional.of(playerPoints1));
        when(playerRepo.findById(player.getId())).thenReturn(Optional.of(player));

        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");

        UsersWeeklyTeam uwt1 = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), 0);
        when(weeklyTeamRepo.findByPlayersAndWeek(player, 1)).thenReturn(Collections.singletonList(uwt1));

        PlayerPointsDTO editPoints = new PlayerPointsDTO(10,3,0,true,1,true,false, player.getId().toString(), 1);
        playerManager.editPoints(editPoints);

        Integer newScore = Constants.POINTS_PER_ATTACKER_GOAL*10 + Constants.POINTS_PER_ASSIST*3+Constants.MAN_OF_THE_MATCH_BONUS + Constants.POINTS_PER_YELLOW_CARD + Constants.POINTS_PER_RED_CARD;
        assertEquals(newScore, playerPoints1.getPoints());
        assertEquals(Integer.valueOf(0), playerPoints.getPoints());

        assertEquals(newScore, user.getTotalPoints());
        assertEquals(Integer.valueOf(10), playerPoints1.getNumberOfGoals());
        assertEquals(Integer.valueOf(3), playerPoints1.getNumberOfAssists());
        assertEquals(Integer.valueOf(0), playerPoints.getNumberOfAssists());
        assertEquals(Integer.valueOf(0), playerPoints.getNumberOfGoals());
    }

}
