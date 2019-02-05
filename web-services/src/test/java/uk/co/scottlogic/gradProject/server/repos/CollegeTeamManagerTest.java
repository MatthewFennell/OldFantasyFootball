package uk.co.scottlogic.gradProject.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.routers.dto.CollegeTeamStatsDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.MakePlayerDTO;

import java.util.*;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;

public class CollegeTeamManagerTest {

    @Mock
    private CollegeTeamRepo teamRepo;

    @Mock
    private PlayerRepo playerRepo;

    private CollegeTeamManager collegeTeamManager;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        collegeTeamManager = new CollegeTeamManager(teamRepo, playerRepo);
    }

    @Test
    public void makingCollegeTeamWithNormalNameThrowsNoErrors(){
        String collegeTeamName = "college team name";
        collegeTeamManager.makeTeam(collegeTeamName);

    }

    @Test(expected = IllegalArgumentException.class)
    public void deletingCollegeTeamThatDoesNotExistThrowsException(){
        String collegeTeamName = "college team name";
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.empty());
        collegeTeamManager.deleteTeam(collegeTeamName);
    }

    @Test(expected = IllegalArgumentException.class)
    public void deletingCollegeTeamThatExistsWithPlayersInItReturnsThrowsException(){
        String collegeTeamName = "college team name";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        List<Player> players = new ArrayList<>();
        players.add(new Player());
        when(playerRepo.findByCollegeTeam(collegeTeam)).thenReturn(players);
        collegeTeamManager.deleteTeam(collegeTeamName);
    }

    @Test
    public void deletingCollegeTeamThatExistsWithNoPlayersInItReturnsCorrectly(){
        String collegeTeamName = "college team name";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        List<Player> players = new ArrayList<>();
        when(playerRepo.findByCollegeTeam(collegeTeam)).thenReturn(players);
        collegeTeamManager.deleteTeam(collegeTeamName);
    }

    @Test
    public void shouldDamnPass(){
        Enums.COLLEGE_MATCH_RESULT x = Enums.COLLEGE_MATCH_RESULT.WIN;
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO("a", x, 0,0,0,0,0);
    }


    @Test(expected = IllegalArgumentException.class)
    public void addingStatsToCollegeTeamThrowsExceptionIfCollegeTeamDoesNotExist(){
        String collegeTeamName = "college team name";
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, Enums.COLLEGE_MATCH_RESULT.WIN, 10, 5, 2, 7,6);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.empty());
        collegeTeamManager.addStatsToCollegeTeam(dto);
    }

    @Test(expected = IllegalArgumentException.class)
    public void editingStatsToCollegeTeamThrowsExceptionIfCollegeTeamDoesNotExist(){
        String collegeTeamName = "college team name";
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, Enums.COLLEGE_MATCH_RESULT.WIN, 10, 5, 2, 7,6);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.empty());
        collegeTeamManager.editCollegeTeamStats(dto);
    }

    @Test
    public void addingStatsToCollegeTeamAddsValuesCorrectlyForWin(){
        Integer goalsFor = 10;
        Integer goalsAgainst = 5;
        Enums.COLLEGE_MATCH_RESULT result = Enums.COLLEGE_MATCH_RESULT.WIN;
        String collegeTeamName = "college team name";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, result, goalsFor, goalsAgainst, 0, 0,0);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        collegeTeamManager.addStatsToCollegeTeam(dto);
        assertEquals(goalsAgainst, collegeTeam.getGoalsAgainst());
        assertEquals(goalsFor, collegeTeam.getGoalsFor());
        assertEquals(Integer.valueOf(1), collegeTeam.getWins());
    }

    @Test
    public void addingStatsToCollegeTeamAddsValuesCorrectlyForDraw(){
        Integer goalsFor = 10;
        Integer goalsAgainst = 5;
        Enums.COLLEGE_MATCH_RESULT result = Enums.COLLEGE_MATCH_RESULT.DRAW;
        String collegeTeamName = "college team name";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, result, goalsFor, goalsAgainst, 0, 0,0);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        collegeTeamManager.addStatsToCollegeTeam(dto);
        assertEquals(goalsAgainst, collegeTeam.getGoalsAgainst());
        assertEquals(goalsFor, collegeTeam.getGoalsFor());
        assertEquals(Integer.valueOf(1), collegeTeam.getDraws());
    }

    @Test
    public void addingStatsToCollegeTeamAddsValuesCorrectlyForLoss(){
        Integer goalsFor = 10;
        Integer goalsAgainst = 5;
        Enums.COLLEGE_MATCH_RESULT result = Enums.COLLEGE_MATCH_RESULT.LOSS;
        String collegeTeamName = "college team name";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, result, goalsFor, goalsAgainst, 0, 0,0);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        collegeTeamManager.addStatsToCollegeTeam(dto);
        assertEquals(goalsAgainst, collegeTeam.getGoalsAgainst());
        assertEquals(goalsFor, collegeTeam.getGoalsFor());
        assertEquals(Integer.valueOf(1), collegeTeam.getLosses());
    }

    @Test
    public void editingStatsForCollegeTeamUpdatesValues(){
        Integer goalsFor = 10;
        Integer goalsAgainst = 5;
        Integer wins = 15;
        Integer draws = 250;
        Integer losses = 9;
        String collegeTeamName = "college team name";
        CollegeTeam collegeTeam = new CollegeTeam(collegeTeamName);
        CollegeTeamStatsDTO dto = new CollegeTeamStatsDTO(collegeTeamName, Enums.COLLEGE_MATCH_RESULT.WIN, goalsFor, goalsAgainst, wins, draws,losses);
        when(teamRepo.findByName(collegeTeamName)).thenReturn(Optional.of(collegeTeam));
        collegeTeamManager.editCollegeTeamStats(dto);
        assertEquals(goalsAgainst, collegeTeam.getGoalsAgainst());
        assertEquals(goalsFor, collegeTeam.getGoalsFor());
        assertEquals(losses, collegeTeam.getLosses());
        assertEquals(wins, collegeTeam.getWins());
        assertEquals(draws, collegeTeam.getDraws());
    }

}
