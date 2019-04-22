package uk.co.scottlogic.gradProject.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.documents.*;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerDTO;

import java.util.*;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class WeeklyTeamManagerTest {

    @Mock
    private PlayerRepo playerRepo;

    @Mock
    private CollegeTeamRepo teamRepo;

    @Mock
    private ApplicationUserRepo applicationUserRepo;

    @Mock
    private WeeklyTeamRepo weeklyTeamRepo;

    @Mock
    private PlayerPointsRepo playerPointsRepo;

    @Mock
    private PercentageOfTeamsRepo percentageOfTeamsRepo;

    private PlayerManager playerManager;

    private WeeklyTeamManager weeklyTeamManager;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        playerManager = new PlayerManager(teamRepo, playerRepo, playerPointsRepo, weeklyTeamRepo, applicationUserRepo, percentageOfTeamsRepo);
        weeklyTeamManager = new WeeklyTeamManager(applicationUserRepo, playerRepo, weeklyTeamRepo, playerManager);
    }

    @Test
    public void getNumberOfWeeks() {
        Integer numberOfWeeks = 10;
        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(numberOfWeeks);
        assertEquals(numberOfWeeks, weeklyTeamManager.getTotalNumberOfWeeks());
    }

    @Test
    public void findWeeklyTeamWithMost() {
        List<UsersWeeklyTeam> mostPoints = Collections.emptyList();
        when(weeklyTeamRepo.findUserWithMostPoints(0)).thenReturn(mostPoints);
        assertEquals(mostPoints, weeklyTeamManager.findWeeklyTeamWithMostPoints(0));
    }

    @Test
    public void averagePointsOfAllTeams() {
        double average = 10.5;
        when(weeklyTeamRepo.findAveragePointsInWeek(0)).thenReturn(average);
        assertEquals(average, weeklyTeamManager.findAveragePointsOfAllTeamsInWeek(0), 0.01);
    }

    @Test
    public void addPlayerToTeam() {
        Player player = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");


        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam(u1, new Date(), new ArrayList<>(), 0);

        when(playerRepo.findById(any())).thenReturn(Optional.of(player));
        when(weeklyTeamRepo.findActiveTeam(u1)).thenReturn(Optional.of(weeklyTeam));
        weeklyTeamManager.addPlayerToWeeklyTeam(u1, UUID.randomUUID().toString());
        assertEquals(1, weeklyTeam.getPlayers().size());
        assertEquals(10, weeklyTeam.getPlayers().get(0).getPrice(), 0.01);
    }

    @Test(expected = IllegalArgumentException.class)
    public void addingPlayerDoesNotExistThrowsIllegalArgument() {
        when(playerRepo.findById(any())).thenReturn(Optional.empty());
        weeklyTeamManager.addPlayerToWeeklyTeam(new ApplicationUser(), UUID.randomUUID().toString());
    }

    @Test
    public void removePlayerFromTeamWorksCorrectlyWhenPlayerExists() {
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        List<Player> originalPlayers = new ArrayList<>();
        List<Player> playersAfterRemove = new ArrayList<>();
        originalPlayers.add(player_one);
        originalPlayers.add(player_two);
        originalPlayers.add(player_three);

        playersAfterRemove.add(player_two);
        playersAfterRemove.add(player_three);

        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam(u1, new Date(), originalPlayers, 0);

        when(playerRepo.findById(any())).thenReturn(Optional.of(player_one));
        when(weeklyTeamRepo.findActiveTeam(u1)).thenReturn(Optional.of(weeklyTeam));
        weeklyTeamManager.removePlayerFromWeeklyTeam(u1, UUID.randomUUID().toString());
        assertEquals(2, weeklyTeam.getPlayers().size());
        assertEquals(playersAfterRemove, weeklyTeam.getPlayers());
    }

    @Test(expected = IllegalArgumentException.class)
    public void removePlayerFromTeamWhenUserHasNoWeeklyTeam() {
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");

        when(playerRepo.findById(any())).thenReturn(Optional.of(player_one));
        when(weeklyTeamRepo.findActiveTeam(u1)).thenReturn(Optional.empty());
        weeklyTeamManager.removePlayerFromWeeklyTeam(u1, UUID.randomUUID().toString());
    }

    @Test(expected = IllegalArgumentException.class)
    public void removingPlayerDoesNotExistThrowsIllegalArgument() {
        when(playerRepo.findById(any())).thenReturn(Optional.empty());
        weeklyTeamManager.removePlayerFromWeeklyTeam(new ApplicationUser(), UUID.randomUUID().toString());
    }

    @Test
    public void teamIsInvalidWhenPriceOver100() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 50, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 50.1, "firstname", "surname");
        players.add(player_one);
        players.add(player_two);
        assertFalse(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test
    public void teamIsInvalidWhenSamePlayerInItTwice() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 50, "firstname", "surname");
        players.add(player_one);
        players.add(player_one);
        assertFalse(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test
    public void teamIsInvalidWhenTooManyPlayersFromSameCollegeTeam() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_twelve = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);
        players.add(player_twelve);
        assertFalse(weeklyTeamManager.checkTeamIsValid(players));
    }


    @Test
    public void formationOf541Valid() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");

        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");

        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");

        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);
        assertTrue(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test(expected = IllegalArgumentException.class)
    public void formationOf640Invalid() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");

        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");

        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);
        weeklyTeamManager.checkTeamIsValid(players);
    }

    @Test
    public void formationOf532Valid() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");

        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");

        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");

        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);
        assertTrue(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test
    public void formationOf343Valid() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");

        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");

        Player player_five = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");

        Player player_nine = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);
        assertTrue(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test
    public void formationOf352Valid() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");

        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");

        Player player_five = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");

        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);
        assertTrue(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test
    public void formationOf442Valid() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);
        assertTrue(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test(expected = IllegalArgumentException.class)
    public void teamMustHave11Players() {
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");

        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");

        Player player_five = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");

        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        assertTrue(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test
    public void teamInvalidWhenTooManyFromSingleTeam() {
        CollegeTeam collegeTeam = new CollegeTeam("name");
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(collegeTeam, Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(collegeTeam, Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(collegeTeam, Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(collegeTeam, Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(collegeTeam, Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(collegeTeam, Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(collegeTeam, Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(collegeTeam, Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(collegeTeam, Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(collegeTeam, Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(collegeTeam, Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_twelve = new Player(collegeTeam, Enums.Position.ATTACKER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);
        players.add(player_twelve);
        assertFalse(weeklyTeamManager.checkTeamIsValid(players));
    }

    @Test
    public void findPlayersInWeeklyTeamCorrectly() {
        String id = UUID.randomUUID().toString();
        CollegeTeam collegeTeam = new CollegeTeam("name");
        List<Player> players = new ArrayList<>();
        Player player_one = new Player(collegeTeam, Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(collegeTeam, Enums.Position.DEFENDER, 5, "firstname", "surname");
        players.add(player_one);
        players.add(player_two);

        PlayerPoints playerPoints_one = new PlayerPoints(2, 1, 0, false, 0, false, false, new Date(), player_one, 0);
        PlayerPoints playerPoints_two = new PlayerPoints(4, 1, 0, false, 0, false, false, new Date(), player_two, 0);

        playerManager.addPointsToPlayer(player_one, new Date(), 2, 1, false, 0, 0, false, false, 0);
        playerManager.addPointsToPlayer(player_two, new Date(), 4, 1, false, 0, 0, false, false, 0);

        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");

        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam(u1, new Date(), players, 0);

        when(weeklyTeamRepo.findByUserByWeek(u1, 0)).thenReturn(Optional.of(weeklyTeam));
        when(playerPointsRepo.findByPlayerByWeek(player_one, 0)).thenReturn(Optional.of(playerPoints_one));
        when(playerPointsRepo.findByPlayerByWeek(player_two, 0)).thenReturn(Optional.of(playerPoints_two));
        when(applicationUserRepo.findById(any())).thenReturn(Optional.of(u1));

        List<PlayerDTO> squad = weeklyTeamManager.findAllPlayersInWeeklyTeam(id, 0);
        assertEquals(2, squad.size());
        assertEquals(Integer.valueOf(27), squad.get(0).getPoints());
        assertEquals(Integer.valueOf(15), squad.get(1).getPoints());

    }

    @Test(expected = IllegalArgumentException.class)
    public void findPlayersInWeeklyTeamThrowsExceptionIfTeamDoesNotExist() {
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(weeklyTeamRepo.findByUserByWeek(u1, 0)).thenReturn(Optional.empty());
        weeklyTeamManager.findAllPlayersInWeeklyTeam("", 0);

    }

    @Test(expected = IllegalArgumentException.class)
    public void whenUserHasNoTeamThrowIllegalArgumentWhenTryingToUpdate() {
        when(weeklyTeamRepo.findActiveTeam(any())).thenReturn(Optional.empty());
        List<PlayerDTO> playersBeingAdded = new ArrayList<>();
        playersBeingAdded.add(new PlayerDTO());
        playersBeingAdded.add(new PlayerDTO());
        weeklyTeamManager.update(null, playersBeingAdded, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void failUpdateWhenPlayersToBeAddedListIsEmpty() {
        weeklyTeamManager.update(null, Collections.emptyList(), null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void failIfSquadSizeAfterChangesIsNotElevenExtraAddition() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();

        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);

        weeklyTeam.setPlayers(players);

        List<PlayerDTO> playersToAdd = new ArrayList<>();
        playersToAdd.add(new PlayerDTO());

        weeklyTeamManager.update(null, playersToAdd, Collections.emptyList());
    }

    @Test(expected = IllegalArgumentException.class)
    public void failIfSquadSizeAfterChangesIsNotElevenExtraRemoval() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();

        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);

        weeklyTeam.setPlayers(players);

        List<PlayerDTO> playersToRemove = new ArrayList<>();
        playersToRemove.add(new PlayerDTO());

        weeklyTeamManager.update(null, Collections.emptyList(), playersToRemove);
    }

    @Test
    public void addingElevenPlayersIsValid() {
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        weeklyTeam.setPlayers(Collections.emptyList());

        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");


        when(playerRepo.findById(player_one.getId())).thenReturn(Optional.of(player_one));
        when(playerRepo.findById(player_two.getId())).thenReturn(Optional.of(player_two));
        when(playerRepo.findById(player_three.getId())).thenReturn(Optional.of(player_three));
        when(playerRepo.findById(player_four.getId())).thenReturn(Optional.of(player_four));
        when(playerRepo.findById(player_five.getId())).thenReturn(Optional.of(player_five));
        when(playerRepo.findById(player_six.getId())).thenReturn(Optional.of(player_six));
        when(playerRepo.findById(player_seven.getId())).thenReturn(Optional.of(player_seven));
        when(playerRepo.findById(player_eight.getId())).thenReturn(Optional.of(player_eight));
        when(playerRepo.findById(player_nine.getId())).thenReturn(Optional.of(player_nine));
        when(playerRepo.findById(player_ten.getId())).thenReturn(Optional.of(player_ten));
        when(playerRepo.findById(player_eleven.getId())).thenReturn(Optional.of(player_eleven));

        when(weeklyTeamRepo.findActiveTeam(any())).thenReturn(Optional.of(weeklyTeam));

        List<PlayerDTO> playersToAdd = new ArrayList<>();
        playersToAdd.add(new PlayerDTO(player_one));
        playersToAdd.add(new PlayerDTO(player_two));
        playersToAdd.add(new PlayerDTO(player_three));
        playersToAdd.add(new PlayerDTO(player_four));
        playersToAdd.add(new PlayerDTO(player_five));
        playersToAdd.add(new PlayerDTO(player_six));
        playersToAdd.add(new PlayerDTO(player_seven));
        playersToAdd.add(new PlayerDTO(player_eight));
        playersToAdd.add(new PlayerDTO(player_nine));
        playersToAdd.add(new PlayerDTO(player_ten));
        playersToAdd.add(new PlayerDTO(player_eleven));

        assertTrue(weeklyTeamManager.update(u1, playersToAdd, Collections.emptyList()));
    }

    @Test
    public void addingElevenPlayersIsInvalidDueToPrice() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        weeklyTeam.setUser(user);
        weeklyTeam.setPlayers(Collections.emptyList());

        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 10, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 10, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 10, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 10, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 10, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 10, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 10, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 10, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 10, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 10, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 10, "firstname", "surname");


        when(playerRepo.findById(player_one.getId())).thenReturn(Optional.of(player_one));
        when(playerRepo.findById(player_two.getId())).thenReturn(Optional.of(player_two));
        when(playerRepo.findById(player_three.getId())).thenReturn(Optional.of(player_three));
        when(playerRepo.findById(player_four.getId())).thenReturn(Optional.of(player_four));
        when(playerRepo.findById(player_five.getId())).thenReturn(Optional.of(player_five));
        when(playerRepo.findById(player_six.getId())).thenReturn(Optional.of(player_six));
        when(playerRepo.findById(player_seven.getId())).thenReturn(Optional.of(player_seven));
        when(playerRepo.findById(player_eight.getId())).thenReturn(Optional.of(player_eight));
        when(playerRepo.findById(player_nine.getId())).thenReturn(Optional.of(player_nine));
        when(playerRepo.findById(player_ten.getId())).thenReturn(Optional.of(player_ten));
        when(playerRepo.findById(player_eleven.getId())).thenReturn(Optional.of(player_eleven));

        when(weeklyTeamRepo.findActiveTeam(any())).thenReturn(Optional.of(weeklyTeam));

        List<PlayerDTO> playersToAdd = new ArrayList<>();
        playersToAdd.add(new PlayerDTO(player_one));
        playersToAdd.add(new PlayerDTO(player_two));
        playersToAdd.add(new PlayerDTO(player_three));
        playersToAdd.add(new PlayerDTO(player_four));
        playersToAdd.add(new PlayerDTO(player_five));
        playersToAdd.add(new PlayerDTO(player_six));
        playersToAdd.add(new PlayerDTO(player_seven));
        playersToAdd.add(new PlayerDTO(player_eight));
        playersToAdd.add(new PlayerDTO(player_nine));
        playersToAdd.add(new PlayerDTO(player_ten));
        playersToAdd.add(new PlayerDTO(player_eleven));

        assertFalse(weeklyTeamManager.update(null, playersToAdd, Collections.emptyList()));
    }

    @Test(expected = IllegalArgumentException.class)
    public void failWhenAddingAPlayerThatDoesNotExist() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();

        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);

        weeklyTeam.setPlayers(players);
        when(playerRepo.findById(any())).thenReturn(Optional.empty());

        List<PlayerDTO> playersToAdd = new ArrayList<>();
        playersToAdd.add(new PlayerDTO(player_one));

        List<PlayerDTO> playersToRemove = new ArrayList<>();
        playersToRemove.add(new PlayerDTO(player_two));

        weeklyTeamManager.update(null, playersToAdd, playersToRemove);
    }

    @Test
    public void addAndRemoveTwoPlayersToFullSquadIsValid() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        weeklyTeam.setUser(user);

        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");


        Player player_twelve = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_thirteen = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);

        weeklyTeam.setPlayers(players);
        when(weeklyTeamRepo.findActiveTeam(any())).thenReturn(Optional.of(weeklyTeam));
        when(playerRepo.findById(player_twelve.getId())).thenReturn(Optional.of(player_twelve));
        when(playerRepo.findById(player_thirteen.getId())).thenReturn(Optional.of(player_thirteen));
        when(playerRepo.findById(player_two.getId())).thenReturn(Optional.of(player_two));
        when(playerRepo.findById(player_six.getId())).thenReturn(Optional.of(player_six));

        List<PlayerDTO> playersToAdd = new ArrayList<>();
        playersToAdd.add(new PlayerDTO(player_twelve));
        playersToAdd.add(new PlayerDTO(player_thirteen));

        List<PlayerDTO> playersToRemove = new ArrayList<>();
        playersToRemove.add(new PlayerDTO(player_two));
        playersToRemove.add(new PlayerDTO(player_six));

        weeklyTeamManager.update(user, playersToAdd, playersToRemove);
    }

    @Test(expected = IllegalArgumentException.class)
    public void playerBeingRemovedDoesNotExist() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();

        List<Player> players = new ArrayList<>();
        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 5, "firstname", "surname");
        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");
        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");
        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 5, "firstname", "surname");


        Player player_twelve = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 5, "firstname", "surname");
        Player player_thirteen = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 5, "firstname", "surname");

        players.add(player_one);
        players.add(player_two);
        players.add(player_three);
        players.add(player_four);
        players.add(player_five);
        players.add(player_six);
        players.add(player_seven);
        players.add(player_eight);
        players.add(player_nine);
        players.add(player_ten);
        players.add(player_eleven);

        weeklyTeam.setPlayers(players);
        when(weeklyTeamRepo.findActiveTeam(any())).thenReturn(Optional.of(weeklyTeam));
        when(playerRepo.findById(player_twelve.getId())).thenReturn(Optional.of(player_twelve));
        when(playerRepo.findById(player_thirteen.getId())).thenReturn(Optional.of(player_thirteen));
        when(playerRepo.findById(player_two.getId())).thenReturn(Optional.of(player_two));
        when(playerRepo.findById(player_six.getId())).thenReturn(Optional.empty());

        List<PlayerDTO> playersToAdd = new ArrayList<>();
        playersToAdd.add(new PlayerDTO(player_twelve));
        playersToAdd.add(new PlayerDTO(player_thirteen));

        List<PlayerDTO> playersToRemove = new ArrayList<>();
        playersToRemove.add(new PlayerDTO(player_two));
        playersToRemove.add(new PlayerDTO(player_six));

        weeklyTeamManager.update(null, playersToAdd, playersToRemove);
    }


}
