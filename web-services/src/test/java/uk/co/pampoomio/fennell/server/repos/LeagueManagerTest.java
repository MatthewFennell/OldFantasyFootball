package uk.co.pampoomio.fennell.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.pampoomio.fennell.server.repos.documents.ApplicationUser;
import uk.co.pampoomio.fennell.server.repos.documents.League;
import uk.co.pampoomio.fennell.server.routers.dto.LeagueReturnDTO;
import uk.co.pampoomio.fennell.server.routers.dto.UserInLeagueReturnDTO;

import java.util.*;

import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertTrue;
import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;

public class LeagueManagerTest {

    @Mock
    private LeagueRepo leagueRepo;

    private LeagueManager leagueManager;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        leagueManager = new LeagueManager(leagueRepo);
    }

    @Test
    public void findUsersInLeagueShouldSortThemByTotalPoints() {

        ApplicationUser u1 = new ApplicationUser();
        u1.setTotalPoints(100);

        ApplicationUser u2 = new ApplicationUser();
        u2.setTotalPoints(30);

        ApplicationUser u3 = new ApplicationUser();
        u3.setTotalPoints(70);

        ApplicationUser u4 = new ApplicationUser();
        u4.setTotalPoints(150);

        ApplicationUser u5 = new ApplicationUser();
        u5.setTotalPoints(120);

        List<ApplicationUser> users = new ArrayList<>();

        League league = new League();
        league.setParticipants(users);

        users.add(u1);
        users.add(u2);
        users.add(u3);
        users.add(u4);
        users.add(u5);

        List<ApplicationUser> orderedUsers = leagueManager.findUsersInLeague(league);
        assertEquals(u4.getTotalPoints(), orderedUsers.get(0).getTotalPoints());
        assertEquals(u5.getTotalPoints(), orderedUsers.get(1).getTotalPoints());
        assertEquals(u1.getTotalPoints(), orderedUsers.get(2).getTotalPoints());
        assertEquals(u3.getTotalPoints(), orderedUsers.get(3).getTotalPoints());
        assertEquals(u2.getTotalPoints(), orderedUsers.get(4).getTotalPoints());

        assertEquals(u4, orderedUsers.get(0));

        assertTrue(true);
    }

    @Test
    public void findUsersInLeagueWithPosition() {
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        ApplicationUser u3 = new ApplicationUser("c", "123456", "c", "c", "c@c.com");
        ApplicationUser u4 = new ApplicationUser("d", "123456", "d", "d", "d@d.com");
        u1.setTotalPoints(25);
        u2.setTotalPoints(90);
        u3.setTotalPoints(10);
        u4.setTotalPoints(30);

        List<ApplicationUser> leagueUsers = new ArrayList<>();
        leagueUsers.add(u1);
        leagueUsers.add(u2);
        leagueUsers.add(u3);
        leagueUsers.add(u4);

        League league = new League(null, "league", null, 0, "code");
        league.setParticipants(leagueUsers);

        when(leagueRepo.findByLeagueName("league")).thenReturn(Optional.of(league));
        List<UserInLeagueReturnDTO> users = leagueManager.findUsersInLeagueAndPositions("league");

        // First place
        assertEquals(u2.getTotalPoints(), users.get(0).getPoints());
        assertEquals(Integer.valueOf(1), users.get(0).getPosition());
        assertEquals(u2.getFirstName(), users.get(0).getFirstName());
        assertEquals(u2.getSurname(), users.get(0).getSurname());

        // Second place
        assertEquals(u4.getTotalPoints(), users.get(1).getPoints());
        assertEquals(Integer.valueOf(2), users.get(1).getPosition());
        assertEquals(u4.getFirstName(), users.get(1).getFirstName());
        assertEquals(u4.getSurname(), users.get(1).getSurname());

        // Third place
        assertEquals(u1.getTotalPoints(), users.get(2).getPoints());
        assertEquals(Integer.valueOf(3), users.get(2).getPosition());
        assertEquals(u1.getFirstName(), users.get(2).getFirstName());
        assertEquals(u1.getSurname(), users.get(2).getSurname());

        // Fourth place
        assertEquals(u3.getTotalPoints(), users.get(3).getPoints());
        assertEquals(Integer.valueOf(4), users.get(3).getPosition());
        assertEquals(u3.getFirstName(), users.get(3).getFirstName());
        assertEquals(u3.getSurname(), users.get(3).getSurname());

    }

    @Test(expected = IllegalArgumentException.class)
    public void invalidLeagueNameThrowsIllegalArgument() {
        when(leagueRepo.findByLeagueName("league")).thenReturn(Optional.empty());
        leagueManager.findUsersInLeagueAndPositions("league");
    }

    @Test
    public void addPlayerToEmptyLeagueWithCorrectCode() {
        League league = new League(null, "league", new ArrayList<>(), 0, "code");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(leagueRepo.findByCodeToJoin("code")).thenReturn(Optional.of(league));
        LeagueReturnDTO dto = leagueManager.addPlayerToLeague(u1, "code");
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
        League league = new League(null, "league", new ArrayList<>(), 0, "code");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        league.addParticipant(u1);
        when(leagueRepo.findByCodeToJoin("code")).thenReturn(Optional.of(league));
        leagueManager.addPlayerToLeague(u1, "code");
    }

    @Test
    public void addPlayerToMiddleOfLeagueWithSeveralUsers() {
        League league = new League(null, "league", new ArrayList<>(), 0, "code");
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

        when(leagueRepo.findByCodeToJoin("code")).thenReturn(Optional.of(league));
        LeagueReturnDTO dto = leagueManager.addPlayerToLeague(u5, "code");
        List<ApplicationUser> users = league.getParticipants();
        assertEquals(5, users.size());
        assertEquals(Integer.valueOf(3), dto.getPosition());
    }

    @Test
    public void userDoesNotExistInLeague() {
        League league = new League(null, "league", new ArrayList<>(), 0, "code");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        assertFalse(leagueManager.userExistsInLeague(u1, league));
    }

    @Test
    public void userDoesExistInLeague() {
        League league = new League(null, "league", new ArrayList<>(), 0, "code");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        league.addParticipant(u1);
        assertTrue(leagueManager.userExistsInLeague(u1, league));
    }

    @Test
    public void findPositionOfUserInLeagueCorrectly() {
        League league = new League(null, "league", new ArrayList<>(), 0, "code");
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
        assertEquals(Integer.valueOf(3), leagueManager.findPositionOfUserInLeague(u4, league));
    }

    @Test
    public void findSingleLeagueUserIsIn() {
        League league = new League(null, "league", new ArrayList<>(), 0, "code");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        league.addParticipant(u1);
        Iterable<League> list = Collections.singletonList(league);
        when(leagueRepo.findAll()).thenReturn(list);
        List<LeagueReturnDTO> dtoList = leagueManager.findLeaguesPlayerIsIn(u1);
        assertEquals(Integer.valueOf(1), dtoList.get(0).getPosition());
    }

    @Test(expected = IllegalArgumentException.class)
    public void makingLeagueWithNameThatAlreadyExists() {
        League league = new League(null, "league", new ArrayList<>(), 0, "code");
        Iterable<League> list = Collections.singletonList(league);
        when(leagueRepo.findAll()).thenReturn(list);
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        leagueManager.createLeague(u1, "league", 0, "code_one");
    }

    @Test
    public void findMultipleLeaguesUserIsIn() {
        League league_one = new League(null, "league_one", new ArrayList<>(), 0, "code_one");
        League league_two = new League(null, "league_two", new ArrayList<>(), 0, "code_two");
        League league_three = new League(null, "league_three", new ArrayList<>(), 0, "code_three");
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
        League league = new League(null, "league_one", new ArrayList<>(), 0, "code_one");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        ApplicationUser u3 = new ApplicationUser("c", "123456", "c", "c", "c@c.com");
        u1.setTotalPoints(10);
        u2.setTotalPoints(20);
        u3.setTotalPoints(30);
        league.addParticipant(u1);
        league.addParticipant(u2);
        league.addParticipant(u3);
        Iterable<League> list = Collections.singletonList(league);
        when(leagueRepo.findAll()).thenReturn(list);
        List<LeagueReturnDTO> dtoList = leagueManager.findLeaguesPlayerIsIn(u1);
        assertEquals(1, dtoList.size());
        assertEquals(Integer.valueOf(3), dtoList.get(0).getPosition());
    }

    @Test
    public void findMultipleLeaguesWhereMultipleUsersInIt() {
        League league_one = new League(null, "league_one", new ArrayList<>(), 0, "code_one");
        League league_two = new League(null, "league_one", new ArrayList<>(), 0, "code_one");
        League league_three = new League(null, "league_one", new ArrayList<>(), 0, "code_one");
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        ApplicationUser u3 = new ApplicationUser("c", "123456", "c", "c", "c@c.com");
        ApplicationUser u4 = new ApplicationUser("d", "123456", "d", "d", "d@d.com");
        ApplicationUser u5 = new ApplicationUser("e", "123456", "e", "e", "e@e.com");

        u1.setTotalPoints(10);
        u2.setTotalPoints(20);
        u3.setTotalPoints(30);
        u4.setTotalPoints(50);
        u5.setTotalPoints(5);
        league_one.addParticipant(u1);
        league_one.addParticipant(u2);
        league_one.addParticipant(u3);
        league_one.addParticipant(u4);
        league_one.addParticipant(u5);

        league_two.addParticipant(u1);
        league_two.addParticipant(u5);
        league_two.addParticipant(u2);

        league_three.addParticipant(u1);
        league_three.addParticipant(u2);
        league_three.addParticipant(u5);
        league_three.addParticipant(u4);

        Iterable<League> list = Arrays.asList(league_one, league_two, league_three);
        when(leagueRepo.findAll()).thenReturn(list);
        List<LeagueReturnDTO> dtoList = leagueManager.findLeaguesPlayerIsIn(u1);
        assertEquals(3, dtoList.size());
        assertEquals(Integer.valueOf(4), dtoList.get(0).getPosition());
        assertEquals(Integer.valueOf(2), dtoList.get(1).getPosition());
        assertEquals(Integer.valueOf(3), dtoList.get(2).getPosition());
    }

}
