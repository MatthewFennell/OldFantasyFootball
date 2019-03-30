package uk.co.scottlogic.gradProject.server.routers;


import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletResponse;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.League;
import uk.co.scottlogic.gradProject.server.routers.dto.MakeLeagueDTO;

import java.util.*;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class LeagueControllerTest {

    @Mock
    private LeagueRepo leagueRepo;

    @Mock
    private WeeklyTeamRepo weeklyTeamRepo;

    @Mock
    private ApplicationUserRepo applicationUserRepo;

    private LeagueController leagueController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        LeagueManager leagueManager = new LeagueManager(leagueRepo, weeklyTeamRepo, applicationUserRepo);
        leagueController = new LeagueController(leagueManager);
    }

    @Test
    public void creatingALeagueReturns201() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        MakeLeagueDTO makeLeagueDTO = new MakeLeagueDTO("league name", 0);
        leagueController.makeLeague(user, makeLeagueDTO, response);
        assertEquals(201, response.getStatus());
    }

    @Test
    public void creatingTwoLeaguesWithSameNameReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        MakeLeagueDTO makeLeagueDTO = new MakeLeagueDTO("league name", 0);

        List<League> leagues = new ArrayList<>();
        leagues.add(new League(user, "league name", null, 0));
        leagues.add(new League(user, "league name", null, 0));

        when(leagueRepo.findAll()).thenReturn(leagues);
        when(leagueRepo.findByLeagueName("league name")).thenReturn(Optional.of(new League()));

        leagueController.makeLeague(user, makeLeagueDTO, response);
        leagueController.makeLeague(user, makeLeagueDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void joiningLeagueReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        List<ApplicationUser> usersInLeague = new ArrayList<>();
        League league = new League(user, "league name", usersInLeague, 0);
        when(leagueRepo.findByCodeToJoin(league.getId().toString())).thenReturn(Optional.of(league));
        leagueController.addPlayerToLeague(user, league.getId().toString(), response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void joiningLeagueUserAlreadyInReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        List<ApplicationUser> usersInLeague = new ArrayList<>();
        usersInLeague.add(user);
        League league = new League(user, "league name", usersInLeague, 0);
        when(leagueRepo.findByCodeToJoin("code")).thenReturn(Optional.of(league));
        leagueController.addPlayerToLeague(user, "code", response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void findAllLeaguesUserIsInReturns200() {
        String id = UUID.randomUUID().toString();
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(leagueRepo.findAll()).thenReturn(Collections.emptyList());
        when(applicationUserRepo.findById(any())).thenReturn(Optional.of(user));
        leagueController.getLeaguesByUser(user, response, id);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void findAllUsersInSpecificLeagueAndTheirPositionsReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        League league = new League(user, "league name", new ArrayList<>(), 0);
        when(leagueRepo.findByLeagueName("league name")).thenReturn(Optional.of(league));
        leagueController.getPositionsOfUsersInLeague(user, response, "league name");
        assertEquals(200, response.getStatus());
    }

    @Test
    public void findAllUsersInSpecificLeagueThatDoesNotExistReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(leagueRepo.findByLeagueName("league name")).thenReturn(Optional.empty());
        leagueController.getPositionsOfUsersInLeague(user, response, "league name");
        assertEquals(400, response.getStatus());
    }

    @Test
    public void leavingLeagueSuccessfullyReturns200() {
        MockHttpServletResponse response = new MockHttpServletResponse();
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
        leagueController.leaveLeague(u1, "league", response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void leavingLeagueYouAreNotInReturns400() {
        MockHttpServletResponse response = new MockHttpServletResponse();
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
        leagueController.leaveLeague(u1, "league", response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void leavingLeagueThatDoesNotExistReturns400() {
        MockHttpServletResponse response = new MockHttpServletResponse();
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(leagueRepo.findByLeagueName("league")).thenReturn(Optional.empty());
        leagueController.leaveLeague(u1, "league", response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void leavingOriginalLeagueThrows400() {
        MockHttpServletResponse response = new MockHttpServletResponse();
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        leagueController.leaveLeague(u1, "original", response);
        assertEquals(400, response.getStatus());
    }


}
