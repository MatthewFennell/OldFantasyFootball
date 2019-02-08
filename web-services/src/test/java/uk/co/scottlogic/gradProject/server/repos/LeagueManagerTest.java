package uk.co.scottlogic.gradProject.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.League;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;
import uk.co.scottlogic.gradProject.server.routers.dto.LeagueReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserInLeagueReturnDTO;

import java.util.*;

import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertTrue;
import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;

public class LeagueManagerTest {

    @Mock
    private LeagueRepo leagueRepo;

    @Mock
    private WeeklyTeamRepo weeklyTeamRepo;

    private LeagueManager leagueManager;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        leagueManager = new LeagueManager(leagueRepo, weeklyTeamRepo);
    }

    @Test
    public void findUsersInLeagueShouldSortThemByTotalPoints() {

        League league_one = new League(null, "league_one", new ArrayList<>(), 0);

        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        ApplicationUser u3 = new ApplicationUser("c", "123456", "c", "c", "c@c.com");
        ApplicationUser u4 = new ApplicationUser("d", "123456", "d", "d", "d@d.com");

        UsersWeeklyTeam uwt1 = new UsersWeeklyTeam(u1, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt2 = new UsersWeeklyTeam(u2, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt3 = new UsersWeeklyTeam(u3, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt4 = new UsersWeeklyTeam(u4, new Date(), new ArrayList<>(), 0);

        uwt1.setPoints(10);
        uwt2.setPoints(30);
        uwt3.setPoints(20);
        uwt4.setPoints(15);

        List<UsersWeeklyTeam> weeklyTeams1 = new ArrayList<>();
        List<UsersWeeklyTeam> weeklyTeams2 = new ArrayList<>();
        List<UsersWeeklyTeam> weeklyTeams3 = new ArrayList<>();
        List<UsersWeeklyTeam> weeklyTeams4 = new ArrayList<>();

        weeklyTeams1.add(uwt1);
        weeklyTeams2.add(uwt2);
        weeklyTeams3.add(uwt3);
        weeklyTeams4.add(uwt4);

        league_one.addParticipant(u1);
        league_one.addParticipant(u2);
        league_one.addParticipant(u3);
        league_one.addParticipant(u4);


        when(leagueRepo.findByLeagueName("league_one")).thenReturn(Optional.of(league_one));

        when(weeklyTeamRepo.findByUserAfterWeek(u1, 0)).thenReturn(weeklyTeams1);
        when(weeklyTeamRepo.findByUserAfterWeek(u2, 0)).thenReturn(weeklyTeams2);
        when(weeklyTeamRepo.findByUserAfterWeek(u3, 0)).thenReturn(weeklyTeams3);
        when(weeklyTeamRepo.findByUserAfterWeek(u4, 0)).thenReturn(weeklyTeams4);

        List<UserInLeagueReturnDTO> sortedUsers = leagueManager.findUsersInLeagueAndPositions("league_one");
        assertEquals(u2.getFirstName(), sortedUsers.get(0).getFirstName());
        assertEquals(u3.getFirstName(), sortedUsers.get(1).getFirstName());
        assertEquals(u4.getFirstName(), sortedUsers.get(2).getFirstName());
        assertEquals(u1.getFirstName(), sortedUsers.get(3).getFirstName());

        assertEquals(uwt2.getPoints(), sortedUsers.get(0).getPoints());
        assertEquals(uwt3.getPoints(), sortedUsers.get(1).getPoints());
        assertEquals(uwt4.getPoints(), sortedUsers.get(2).getPoints());
        assertEquals(uwt1.getPoints(), sortedUsers.get(3).getPoints());

        assertEquals(Integer.valueOf(1), sortedUsers.get(0).getPosition());
        assertEquals(Integer.valueOf(2), sortedUsers.get(1).getPosition());
        assertEquals(Integer.valueOf(3), sortedUsers.get(2).getPosition());
        assertEquals(Integer.valueOf(4), sortedUsers.get(3).getPosition());

    }

    @Test
    public void findUsersInLeagueWithPosition() {

    }

    @Test(expected = IllegalArgumentException.class)
    public void invalidLeagueNameThrowsIllegalArgument() {
        when(leagueRepo.findByLeagueName("league")).thenReturn(Optional.empty());
        leagueManager.findUsersInLeagueAndPositions("league");
    }

    @Test
    public void addPlayerToEmptyLeagueWithCorrectCode() {
        League league = new League(null, "league", new ArrayList<>(), 0);
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(leagueRepo.findByCodeToJoin(league.getId().toString())).thenReturn(Optional.of(league));
        LeagueReturnDTO dto = leagueManager.addPlayerToLeague(u1, league.getId().toString());
        List<ApplicationUser> users = league.getParticipants();
        assertEquals(1, users.size());
        assertEquals(Integer.valueOf(1), dto.getPosition());
    }

    @Test(expected = IllegalArgumentException.class)
    public void addPlayerToEmptyLeagueWithInorrectCodeThrowsIllegalArgumentException() {
        when(leagueRepo.findByCodeToJoin("code")).thenReturn(Optional.empty());
        leagueManager.addPlayerToLeague(new ApplicationUser(), "code");
    }

    @Test(expected = IllegalArgumentException.class)
    public void addPlayerToLeagueHeIsAlreadyIn() {
        League league = new League(null, "league", new ArrayList<>(), 0);
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        league.addParticipant(u1);
        when(leagueRepo.findByCodeToJoin("code")).thenReturn(Optional.of(league));
        leagueManager.addPlayerToLeague(u1, "code");
    }

    @Test
    public void addPlayerToMiddleOfLeagueWithSeveralUsersReturnsTheCorrectPosition() {
        League league = new League(null, "league", new ArrayList<>(), 0);
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        ApplicationUser u3 = new ApplicationUser("c", "123456", "c", "c", "c@c.com");
        ApplicationUser u4 = new ApplicationUser("d", "123456", "d", "d", "d@d.com");
        u1.setTotalPoints(120);
        u2.setTotalPoints(45);
        u3.setTotalPoints(150);
        u4.setTotalPoints(90);
        league.addParticipant(u1);
        league.addParticipant(u2);
        league.addParticipant(u3);
        league.addParticipant(u4);

        ApplicationUser u5 = new ApplicationUser("e", "123456", "e", "e", "e@e.com");
        u5.setTotalPoints(100);

        UsersWeeklyTeam uwt1 = new UsersWeeklyTeam();
        uwt1.setUser(u1);
        uwt1.setPoints(120);

        UsersWeeklyTeam uwt2 = new UsersWeeklyTeam();
        uwt2.setUser(u2);
        uwt2.setPoints(45);

        UsersWeeklyTeam uwt3 = new UsersWeeklyTeam();
        uwt3.setUser(u3);
        uwt3.setPoints(150);

        UsersWeeklyTeam uwt4 = new UsersWeeklyTeam();
        uwt4.setUser(u4);
        uwt4.setPoints(90);

        UsersWeeklyTeam uwt5 = new UsersWeeklyTeam();
        uwt5.setUser(u5);
        uwt5.setPoints(100);

        ArrayList<UsersWeeklyTeam> wt1 = new ArrayList<>();
        wt1.add(uwt1);


        ArrayList<UsersWeeklyTeam> wt2 = new ArrayList<>();
        wt2.add(uwt2);

        ArrayList<UsersWeeklyTeam> wt3 = new ArrayList<>();
        wt3.add(uwt3);

        ArrayList<UsersWeeklyTeam> wt4 = new ArrayList<>();
        wt4.add(uwt4);

        ArrayList<UsersWeeklyTeam> wt5 = new ArrayList<>();
        wt5.add(uwt5);

        when(leagueRepo.findByCodeToJoin(league.getId().toString())).thenReturn(Optional.of(league));
        when(weeklyTeamRepo.findByUserAfterWeek(u1, 0)).thenReturn(wt1);
        when(weeklyTeamRepo.findByUserAfterWeek(u2, 0)).thenReturn(wt2);
        when(weeklyTeamRepo.findByUserAfterWeek(u3, 0)).thenReturn(wt3);
        when(weeklyTeamRepo.findByUserAfterWeek(u4, 0)).thenReturn(wt4);
        when(weeklyTeamRepo.findByUserAfterWeek(u5, 0)).thenReturn(wt5);
        LeagueReturnDTO dto = leagueManager.addPlayerToLeague(u5, league.getId().toString());
        List<ApplicationUser> users = league.getParticipants();
        assertEquals(5, users.size());
        assertEquals(Integer.valueOf(3), dto.getPosition());
    }

    @Test
    public void userDoesNotExistInLeague() {
        League league = new League(null, "league", new ArrayList<>(), 0);
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        assertFalse(leagueManager.userExistsInLeague(u1, league));
    }

    @Test
    public void userDoesExistInLeague() {
        League league = new League(null, "league", new ArrayList<>(), 0);
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        league.addParticipant(u1);
        assertTrue(leagueManager.userExistsInLeague(u1, league));
    }

    @Test
    public void findPositionOfUserInLeagueCorrectly() {
    }

    @Test
    public void findSingleLeagueUserIsIn() {
        League league = new League(null, "league", new ArrayList<>(), 0);
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        league.addParticipant(u1);
        Iterable<League> list = Collections.singletonList(league);
        when(leagueRepo.findAll()).thenReturn(list);
        List<LeagueReturnDTO> dtoList = leagueManager.findLeaguesPlayerIsIn(u1);
        assertEquals(Integer.valueOf(1), dtoList.get(0).getPosition());
    }

    @Test(expected = IllegalArgumentException.class)
    public void makingLeagueWithNameThatAlreadyExists() {
        League league = new League(null, "league", new ArrayList<>(), 0);
        Iterable<League> list = Collections.singletonList(league);
        when(leagueRepo.findAll()).thenReturn(list);
        when(leagueRepo.findByLeagueName("league")).thenReturn(Optional.of(league));
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        leagueManager.createLeague(u1, "league", 0);
    }

    @Test
    public void findMultipleLeaguesUserIsIn() {
        League league_one = new League(null, "league_one", new ArrayList<>(), 0);
        League league_two = new League(null, "league_two", new ArrayList<>(), 0);
        League league_three = new League(null, "league_three", new ArrayList<>(), 0);
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        league_one.addParticipant(u1);
        league_two.addParticipant(u1);
        league_three.addParticipant(u1);
        Iterable<League> list = Arrays.asList(league_one, league_two, league_three);
        when(leagueRepo.findAll()).thenReturn(list);
        List<LeagueReturnDTO> dtoList = leagueManager.findLeaguesPlayerIsIn(u1);
        assertEquals(3, dtoList.size());
    }

    @Test
    public void findLeagueWhereMultipleUsersInIt() {
    }

    @Test
    public void findMultipleLeaguesWhereMultipleUsersThemReturnsCorrectPositionForEachLeague() {

        League league_one = new League(null, "league_one", new ArrayList<>(), 0);
        League league_two = new League(null, "league_two", new ArrayList<>(), 0);
        League league_three = new League(null, "league_three", new ArrayList<>(), 0);


        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        ApplicationUser u3 = new ApplicationUser("c", "123456", "c", "c", "c@c.com");
        ApplicationUser u4 = new ApplicationUser("d", "123456", "d", "d", "d@d.com");

        UsersWeeklyTeam uwt1 = new UsersWeeklyTeam(u1, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt2 = new UsersWeeklyTeam(u2, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt3 = new UsersWeeklyTeam(u3, new Date(), new ArrayList<>(), 0);
        UsersWeeklyTeam uwt4 = new UsersWeeklyTeam(u4, new Date(), new ArrayList<>(), 0);

        uwt1.setPoints(10);
        uwt2.setPoints(30);
        uwt3.setPoints(20);
        uwt4.setPoints(15);

        List<UsersWeeklyTeam> weeklyTeams1 = new ArrayList<>();
        List<UsersWeeklyTeam> weeklyTeams2 = new ArrayList<>();
        List<UsersWeeklyTeam> weeklyTeams3 = new ArrayList<>();
        List<UsersWeeklyTeam> weeklyTeams4 = new ArrayList<>();

        weeklyTeams1.add(uwt1);
        weeklyTeams2.add(uwt2);
        weeklyTeams3.add(uwt3);
        weeklyTeams4.add(uwt4);

        league_one.addParticipant(u1);
        league_one.addParticipant(u2);
        league_one.addParticipant(u3);
        league_one.addParticipant(u4);

        league_two.addParticipant(u1);
        league_two.addParticipant(u2);

        league_three.addParticipant(u1);
        league_three.addParticipant(u2);
        league_three.addParticipant(u4);

        Iterable<League> list = Arrays.asList(league_one, league_two, league_three);
        when(leagueRepo.findAll()).thenReturn(list);
        when(weeklyTeamRepo.findByUserAfterWeek(u1, 0)).thenReturn(weeklyTeams1);
        when(weeklyTeamRepo.findByUserAfterWeek(u2, 0)).thenReturn(weeklyTeams2);
        when(weeklyTeamRepo.findByUserAfterWeek(u3, 0)).thenReturn(weeklyTeams3);
        when(weeklyTeamRepo.findByUserAfterWeek(u4, 0)).thenReturn(weeklyTeams4);

        List<LeagueReturnDTO> leaguesUserIsIn = leagueManager.findLeaguesPlayerIsIn(u1);


        for (LeagueReturnDTO dto : leaguesUserIsIn){
            System.out.println("league name = " + dto.getLeagueName() + ", position = " + dto.getPosition());
        }

        assertEquals(Integer.valueOf(4), leaguesUserIsIn.get(0).getPosition());
        assertEquals(Integer.valueOf(2), leaguesUserIsIn.get(1).getPosition());
        assertEquals(Integer.valueOf(3), leaguesUserIsIn.get(2).getPosition());

    }

    @Test(expected = IllegalArgumentException.class)
    public void leavingLeagueThatDoesNotExistThrowsException(){
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(leagueRepo.findByLeagueName("league")).thenReturn(Optional.empty());
        leagueManager.leaveLeague(u1, "league");
    }

    @Test(expected = IllegalArgumentException.class)
    public void leavingLeagueThatThatTheUserIsNotInThrowsException(){
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        ApplicationUser u3 = new ApplicationUser("c", "123456", "c", "c", "c@c.com");
        ApplicationUser u4 = new ApplicationUser("d", "123456", "d", "d", "d@d.com");

        List<ApplicationUser> users = new ArrayList<>();
        users.add(u2);
        users.add(u3);
        users.add(u4);

        League league_one = new League(null, "league_one", new ArrayList<>(), 0);
        league_one.setParticipants(users);

        when(leagueRepo.findByLeagueName("league")).thenReturn(Optional.of(league_one));
        leagueManager.leaveLeague(u1, "league");
    }

    @Test
    public void leavingLeagueThatThatTheUserIsInReducesItsLengthByOne(){
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        ApplicationUser u3 = new ApplicationUser("c", "123456", "c", "c", "c@c.com");
        ApplicationUser u4 = new ApplicationUser("d", "123456", "d", "d", "d@d.com");

        List<ApplicationUser> users = new ArrayList<>();
        users.add(u1);
        users.add(u2);
        users.add(u3);
        users.add(u4);

        League league_one = new League(null, "league_one", new ArrayList<>(), 0);
        league_one.setParticipants(users);

        when(leagueRepo.findByLeagueName("league")).thenReturn(Optional.of(league_one));
        leagueManager.leaveLeague(u1, "league");
        assertEquals(3, league_one.getParticipants().size());
    }

    @Test(expected = IllegalArgumentException.class)
    public void leavingTheOriginalLeagueThrowsAnException(){
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        leagueManager.leaveLeague(u1, "original");
    }

}
