package uk.co.scottlogic.gradProject.server.routers;

import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletResponse;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.util.*;

import static org.mockito.ArgumentMatchers.any;
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

    @Mock
    private PercentageOfTeamsRepo percentageOfTeamsRepo;

    @Mock
    private CollegeTeamRepo collegeTeamRepo;


    private WeeklyTeamManager weeklyTeamManager;


    private ApplicationUserManager applicationUserManager;

    private PointsController pointsController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        PlayerManager playerManager = new PlayerManager(teamRepo, playerRepo, playerPointsRepo, weeklyTeamRepo, applicationUserRepo, percentageOfTeamsRepo);
        weeklyTeamManager = new WeeklyTeamManager(applicationUserRepo, playerRepo, weeklyTeamRepo, playerManager);
        applicationUserManager = new ApplicationUserManager(applicationUserRepo, weeklyTeamRepo, weeklyTeamManager, collegeTeamRepo);
        pointsController = new PointsController(weeklyTeamManager, applicationUserManager);
    }

    @Test
    public void findingThePlayerWithTheMostPointsReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        MockHttpServletResponse response = new MockHttpServletResponse();
        CollegeTeam collegeTeam = new CollegeTeam("name");
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
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(weeklyTeamManager.findWeeklyTeamWithMostPoints(0)).thenReturn(Collections.emptyList());
        pointsController.getUserWithMostPointsInWeek(user, response, 0);
        TestCase.assertEquals(400, response.getStatus());
    }

    @Test
    public void findingTheUserWithTheMostPointsReturns200() {
        List<ApplicationUser> users = new ArrayList<>();
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        users.add(user);
        MockHttpServletResponse response = new MockHttpServletResponse();
        when(applicationUserManager.findUsersWithLargestTotalPoints()).thenReturn(users);
        pointsController.userWithMostPoints(user, response);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void findingTheTotalPointsOfAUserReturns200() {
        String id = UUID.randomUUID().toString();
        when(applicationUserRepo.findById(any())).thenReturn(Optional.of(new ApplicationUser()));
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        MockHttpServletResponse response = new MockHttpServletResponse();
        pointsController.totalPoints(user, response, id);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void gettingThePointsForAUserInAWeekReturns200() {
        String id = UUID.randomUUID().toString();
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(weeklyTeamRepo.findPointsInWeekByUser(user, 0)).thenReturn(Optional.of(0));
        when(applicationUserRepo.findById(any())).thenReturn(Optional.of(new ApplicationUser()));
        MockHttpServletResponse response = new MockHttpServletResponse();
        pointsController.getUserPointsInWeek(user, response, id,0);
        TestCase.assertEquals(200, response.getStatus());
    }

    @Test
    public void getTheAveragePointsForAllUsersInWeekReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(weeklyTeamRepo.findAveragePointsInWeek(0)).thenReturn(Double.valueOf(0));
        MockHttpServletResponse response = new MockHttpServletResponse();
        pointsController.getAveragePointsForWeek(user, response, 0);
        TestCase.assertEquals(200, response.getStatus());
    }



}

