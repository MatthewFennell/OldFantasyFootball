package uk.co.scottlogic.gradProject.server.routers;


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
import uk.co.scottlogic.gradProject.server.routers.dto.CollegeTeamStatsDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;

public class CollegeTeamControllerTest {

    @Mock
    private CollegeTeamRepo teamRepo;

    @Mock
    private PlayerRepo playerRepo;

    private CollegeTeamController collegeTeamController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        CollegeTeamManager collegeTeamManager = new CollegeTeamManager(teamRepo, playerRepo);
        collegeTeamController = new CollegeTeamController(collegeTeamManager);
    }


    @Test
    public void makingCollegeTeamReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        String collegeTeamName = "Men's A";
        collegeTeamController.makeCollegeTeam(user, collegeTeamName, response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void deletingCollegeTeamCorrectlyReturns204() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        String collegeTeamName = "Men's A";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        List<Player> players = new ArrayList<>();
        when(playerRepo.findByCollegeTeam(collegeTeam)).thenReturn(players);
        collegeTeamController.deleteCollegeTeam(user, collegeTeamName, response);
        assertEquals(201, response.getStatus());
    }

    @Test
    public void deletingCollegeTeamWhenPlayersInItReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        String collegeTeamName = "Men's A";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        List<Player> players = new ArrayList<>();
        players.add(new Player());
        when(playerRepo.findByCollegeTeam(collegeTeam)).thenReturn(players);
        collegeTeamController.deleteCollegeTeam(user, collegeTeamName, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void deletingCollegeTeamThatDoesNotExistReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        String collegeTeamName = "Men's A";
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.empty());
        collegeTeamController.deleteCollegeTeam(user, collegeTeamName, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void addStatsToCollegeTeamReturns200WhenSuccessful() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        Integer goalsFor = 10;
        Integer goalsAgainst = 5;
        Enums.CollegeMatchResult result = Enums.CollegeMatchResult.WIN;
        String collegeTeamName = "Men's A";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, result, goalsFor, goalsAgainst, 0, 0,0);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        collegeTeamController.addStatsToCollegeTeam(user, dto, response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void addStatsToCollegeTeamReturns400WhenCollegeTeamDoesNotExist() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        String collegeTeamName = "Men's A";
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, Enums.CollegeMatchResult.WIN, 10, 0, 0, 0,0);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.empty());
        collegeTeamController.addStatsToCollegeTeam(user, dto, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void editingCollegeStatsReturns200WhenSuccessful() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        Integer goalsFor = 10;
        Integer goalsAgainst = 5;
        Integer wins = 15;
        Integer draws = 250;
        Integer losses = 9;
        Enums.CollegeMatchResult result = Enums.CollegeMatchResult.WIN;
        String collegeTeamName = "Men's A";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, result, goalsFor, goalsAgainst, wins, draws,losses);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        collegeTeamController.editCollegeTeamStats(user, dto, response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void editingCollegeStatsReturns400WhenCollegeTeamDoesNotExist() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        String collegeTeamName = "Men's A";
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, Enums.CollegeMatchResult.WIN, 10, 5, 2, 7,6);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.empty());
        collegeTeamController.editCollegeTeamStats(user, dto, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void gettingAllCollegeTeamReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        MockHttpServletResponse response = new MockHttpServletResponse();
        CollegeTeam collegeTeam_one = new CollegeTeam("A");

        collegeTeam_one.setWins(10);

        List<CollegeTeam> returnedValue = new ArrayList<>();
        returnedValue.add(collegeTeam_one);

        when(teamRepo.findAll()).thenReturn(returnedValue);
        collegeTeamController.getAllCollegeTeams(user, response, "");
        assertEquals(200, response.getStatus());
    }

}
