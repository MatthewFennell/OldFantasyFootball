package uk.co.scottlogic.gradProject.server.routers;

import junit.framework.TestCase;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletResponse;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.repos.documents.*;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.TransferDTO;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class WeeksControllerTest {

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
    private TransferMarketRepo transferMarketRepo;

    private WeeksController weeksController;


    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        PlayerManager playerManager = new PlayerManager(teamRepo, playerRepo, playerPointsRepo, weeklyTeamRepo, applicationUserRepo, percentageOfTeamsRepo);
        WeeklyTeamManager weeklyTeamManager = new WeeklyTeamManager(applicationUserRepo, playerRepo, weeklyTeamRepo, playerManager, transferMarketRepo);
        weeksController = new WeeksController(weeklyTeamManager);
    }

    @Test
    public void updatingWeeklyTeamByAddingNoPlayersReturns400() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        MockHttpServletResponse response = new MockHttpServletResponse();

        TransferMarketOpen transferMarketOpen = new TransferMarketOpen(true);
        when(transferMarketRepo.findFirstByOrderByIsOpenAsc()).thenReturn(transferMarketOpen);

        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        List<UsersWeeklyTeam> weeklyTeams = new ArrayList<>();
        weeklyTeams.add(weeklyTeam);

        TransferDTO transferDTO = new TransferDTO(new ArrayList<>(), new ArrayList<>());
        weeksController.updateTeam(user, transferDTO, response);
        TestCase.assertEquals(400, response.getStatus());
    }

//    @Test
//    public void validUpdateReturns200() {
//
//        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
//        MockHttpServletResponse response = new MockHttpServletResponse();
//
//        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
//        weeklyTeam.setPlayers(Collections.emptyList());
//
//        TransferMarketOpen transferMarketOpen = new TransferMarketOpen(true);
//        when(transferMarketRepo.findFirstByOrderByIsOpenAsc()).thenReturn(transferMarketOpen);
//
//        Player player_one = new Player(new CollegeTeam(), Enums.Position.GOALKEEPER, 1, "firstname", "surname");
//        Player player_two = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 1, "firstname", "surname");
//        Player player_three = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 1, "firstname", "surname");
//        Player player_four = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 1, "firstname", "surname");
//        Player player_five = new Player(new CollegeTeam(), Enums.Position.DEFENDER, 1, "firstname", "surname");
//        Player player_six = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 1, "firstname", "surname");
//        Player player_seven = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 1, "firstname", "surname");
//        Player player_eight = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 1, "firstname", "surname");
//        Player player_nine = new Player(new CollegeTeam(), Enums.Position.MIDFIELDER, 1, "firstname", "surname");
//        Player player_ten = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 1, "firstname", "surname");
//        Player player_eleven = new Player(new CollegeTeam(), Enums.Position.ATTACKER, 1, "firstname", "surname");
//
//        when(playerRepo.findById(player_one.getId())).thenReturn(Optional.of(player_one));
//        when(playerRepo.findById(player_two.getId())).thenReturn(Optional.of(player_two));
//        when(playerRepo.findById(player_three.getId())).thenReturn(Optional.of(player_three));
//        when(playerRepo.findById(player_four.getId())).thenReturn(Optional.of(player_four));
//        when(playerRepo.findById(player_five.getId())).thenReturn(Optional.of(player_five));
//        when(playerRepo.findById(player_six.getId())).thenReturn(Optional.of(player_six));
//        when(playerRepo.findById(player_seven.getId())).thenReturn(Optional.of(player_seven));
//        when(playerRepo.findById(player_eight.getId())).thenReturn(Optional.of(player_eight));
//        when(playerRepo.findById(player_nine.getId())).thenReturn(Optional.of(player_nine));
//        when(playerRepo.findById(player_ten.getId())).thenReturn(Optional.of(player_ten));
//        when(playerRepo.findById(player_eleven.getId())).thenReturn(Optional.of(player_eleven));
//
//        when(weeklyTeamRepo.findActiveTeam(any())).thenReturn(Optional.of(weeklyTeam));
//
//        List<PlayerDTO> playersToAdd = new ArrayList<>();
//        playersToAdd.add(new PlayerDTO(player_one));
//        playersToAdd.add(new PlayerDTO(player_two));
//        playersToAdd.add(new PlayerDTO(player_three));
//        playersToAdd.add(new PlayerDTO(player_four));
//        playersToAdd.add(new PlayerDTO(player_five));
//        playersToAdd.add(new PlayerDTO(player_six));
//        playersToAdd.add(new PlayerDTO(player_seven));
//        playersToAdd.add(new PlayerDTO(player_eight));
//        playersToAdd.add(new PlayerDTO(player_nine));
//        playersToAdd.add(new PlayerDTO(player_ten));
//        playersToAdd.add(new PlayerDTO(player_eleven));
//
//        TransferDTO transferDTO = new TransferDTO(playersToAdd, new ArrayList<>());
//        weeksController.updateTeam(user, transferDTO, response);
//        TestCase.assertEquals(200, response.getStatus());
//    }

    @Test
    public void gettingNumberOfWeeksReturns200() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        MockHttpServletResponse response = new MockHttpServletResponse();

        when(weeklyTeamRepo.findNumberOfWeeks()).thenReturn(0);
        weeksController.getNumberOfWeeks(user, response);
        TestCase.assertEquals(200, response.getStatus());
    }

}

