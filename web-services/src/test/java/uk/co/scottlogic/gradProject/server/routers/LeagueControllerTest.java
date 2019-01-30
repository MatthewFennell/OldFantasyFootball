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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;

public class LeagueControllerTest {

    @Mock
    private LeagueRepo leagueRepo;

    private LeagueController leagueController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        LeagueManager leagueManager = new LeagueManager(leagueRepo);
        leagueController = new LeagueController(leagueManager);
    }

    @Test
    public void creatingALeagueReturns201() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        MakeLeagueDTO makeLeagueDTO = new MakeLeagueDTO("league name", "code", 0);
        leagueController.makeLeague(user, makeLeagueDTO, response);
        assertEquals(201, response.getStatus());
    }

    @Test
    public void creatingTwoLeaguesWithSameNameReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        MakeLeagueDTO makeLeagueDTO = new MakeLeagueDTO("league name", "code", 0);

        List<League> leagues = new ArrayList<>();
        leagues.add(new League(user, "league name", null, 0, "code"));
        leagues.add(new League(user, "league name", null, 0, "code"));

        when(leagueRepo.findAll()).thenReturn(leagues);

        leagueController.makeLeague(user, makeLeagueDTO, response);
        leagueController.makeLeague(user, makeLeagueDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void joiningLeagueReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        List<ApplicationUser> usersInLeague = new ArrayList<>();
        League league = new League(user, "league name", usersInLeague, 0, "code");
        when(leagueRepo.findByCodeToJoin("code")).thenReturn(Optional.of(league));
        leagueController.addPlayerToLeague(user, "code", response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void joiningLeagueUserAlreadyInReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        List<ApplicationUser> usersInLeague = new ArrayList<>();
        usersInLeague.add(user);
        League league = new League(user, "league name", usersInLeague, 0, "code");
        when(leagueRepo.findByCodeToJoin("code")).thenReturn(Optional.of(league));
        leagueController.addPlayerToLeague(user, "code", response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void findAllLeaguesUserIsInReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        leagueController.getLeaguesByUser(user, response);
        when(leagueRepo.findAll()).thenReturn(Collections.emptyList());
        assertEquals(200, response.getStatus());
    }

    @Test
    public void findAllUsersInSpecificLeagueAndTheirPositionsReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        League league = new League(user, "league name", new ArrayList<>(), 0, "code");
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


}
