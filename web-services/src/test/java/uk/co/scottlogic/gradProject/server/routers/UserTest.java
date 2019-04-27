package uk.co.scottlogic.gradProject.server.routers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import uk.co.scottlogic.gradProject.server.repos.ApplicationUserManager;
import uk.co.scottlogic.gradProject.server.repos.ApplicationUserRepo;
import uk.co.scottlogic.gradProject.server.repos.WeeklyTeamManager;
import uk.co.scottlogic.gradProject.server.repos.WeeklyTeamRepo;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.UserPatchDTO;

import java.util.ArrayList;
import java.util.Optional;

import static junit.framework.TestCase.assertEquals;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@ContextConfiguration
public class UserTest {

    @Mock
    private ApplicationUserRepo applicationUserRepo;

    private User userController;

    @Mock
    private WeeklyTeamRepo weeklyTeamRepo;

    @Mock
    private WeeklyTeamManager weeklyTeamManager;

    @Before
    public void setUp() {
        ApplicationUserManager applicationUserManager = new ApplicationUserManager(applicationUserRepo, weeklyTeamRepo, weeklyTeamManager);
        userController = new User(applicationUserRepo, applicationUserManager);
    }

    @Test
    public void standardPatchReturns200Code() {
        MockHttpServletResponse response = new MockHttpServletResponse();
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, null, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(applicationUserRepo.findByUsername(userPatchDTO.getUsername())).thenReturn(
                Optional.of(user));
        userController.patchCurrent(user, userPatchDTO, response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void patchWithInvalidUsernameReturns400() {
        String username = "\uD83D\uDC40";
        MockHttpServletResponse response = new MockHttpServletResponse();
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, username, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(applicationUserRepo.findByUsername(userPatchDTO.getUsername())).thenReturn(
                Optional.of(user));
        userController.patchCurrent(user, userPatchDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void findAllUsersReturns200WhenNoErrors() {
        MockHttpServletResponse response = new MockHttpServletResponse();
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        ArrayList<ApplicationUser> users = new ArrayList<>();
        users.add(user);
        when(applicationUserRepo.findAll()).thenReturn(users);
        userController.getAll(user, response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void getCurrentUserReturns200WhenNoErrorsAndValuesAreCorrect() {
        MockHttpServletResponse response = new MockHttpServletResponse();
        ApplicationUser user = new ApplicationUser();
        userController.getCurrent(user, response);
        assertEquals(200, response.getStatus());
    }

    @Test
    public void patchWithEmojiInFirstNameReturns400() {
        String firstName = "❤";
        MockHttpServletResponse response = new MockHttpServletResponse();
        UserPatchDTO userPatchDTO = new UserPatchDTO(firstName, null, null, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(applicationUserRepo.findByUsername(userPatchDTO.getUsername())).thenReturn(
                Optional.of(user));
        userController.patchCurrent(user, userPatchDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void patchWithEmojiInSurnameReturns400() {
        String surname = "❤";
        MockHttpServletResponse response = new MockHttpServletResponse();
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, surname, null, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(applicationUserRepo.findByUsername(userPatchDTO.getUsername())).thenReturn(
                Optional.of(user));
        userController.patchCurrent(user, userPatchDTO, response);
        assertEquals(400, response.getStatus());
    }

}
