package uk.co.pampoomio.fennell.server.routers;

import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletResponse;
import uk.co.pampoomio.fennell.server.misc.Enums;
import uk.co.pampoomio.fennell.server.repos.*;
import uk.co.pampoomio.fennell.server.repos.documents.ApplicationUser;
import uk.co.pampoomio.fennell.server.repos.documents.CollegeTeam;
import uk.co.pampoomio.fennell.server.repos.documents.Player;
import uk.co.pampoomio.fennell.server.repos.documents.UsersWeeklyTeam;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.when;

public class PointsControllerTest {

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

    private WeeklyTeamManager weeklyTeamManager;


    private ApplicationUserManager applicationUserManager;

    private PointsController pointsController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        PlayerManager playerManager = new PlayerManager(teamRepo, playerRepo, playerPointsRepo, weeklyTeamRepo, applicationUserRepo);
        weeklyTeamManager = new WeeklyTeamManager(applicationUserRepo, playerRepo, teamRepo, weeklyTeamRepo, playerPointsRepo, playerManager);
        applicationUserManager = new ApplicationUserManager(applicationUserRepo, weeklyTeamRepo, weeklyTeamManager);
        pointsController = new PointsController(weeklyTeamManager, applicationUserManager);
    }

    @Test
    public void findingThePlayerWithTheMostPointsReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        CollegeTeam collegeTeam = new CollegeTeam("name", 5, 4, 3, 2, 1);
        Player player = new Player(collegeTeam, Enums.Position.ATTACKER, 10, "firstname", "surname");
        List<Player> players = new ArrayList<>();
        players.add(player);
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam(user, new Date(), players, 0);
        List<UsersWeeklyTeam> weeklyTeams = new ArrayList<>();
        weeklyTeams.add(weeklyTeam);
        when(weeklyTeamManager.findWeeklyTeamWithMostPoints(0)).thenReturn(weeklyTeams);
        pointsController.getUserWithMostPointsInWeek(user, response, 0);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void findingThePlayerWithTheMostPointsReturns400IfThereAreNoWeeklyTeamsForThatWeek() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(weeklyTeamManager.findWeeklyTeamWithMostPoints(0)).thenReturn(Collections.emptyList());
        pointsController.getUserWithMostPointsInWeek(user, response, 0);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void findingTheUserWithTheMostPointsReturns200() {
        List<ApplicationUser> users = new ArrayList<>();
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        users.add(user);
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(applicationUserManager.findUsersWithLargestTotalPoints()).thenReturn(users);
        pointsController.userWithMostPoints(user, response);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void findingTheTotalPointsOfAUserReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        pointsController.totalPoints(user, response);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void gettingThePointsForAUserInAWeekReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(weeklyTeamRepo.findPointsInWeekByUser(user, 0)).thenReturn(0);
        MockHttpServletResponse response = new MockHttpServletResponse();
        pointsController.getUserPointsInWeek(user, response, 0);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void getTheAveragePointsForAllUsersInWeekReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        when(weeklyTeamRepo.findAveragePointsInWeek(0)).thenReturn(Double.valueOf(0));
        MockHttpServletResponse response = new MockHttpServletResponse();
        pointsController.getAveragePointsForWeek(user, response, 0);
        TestCase.assertEquals(200, response.getStatus());
    }

}

