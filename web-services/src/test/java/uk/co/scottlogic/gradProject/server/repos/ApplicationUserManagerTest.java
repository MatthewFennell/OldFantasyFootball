package uk.co.scottlogic.gradProject.server.repos;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.UserPatchDTO;

import java.util.Optional;

import static junit.framework.TestCase.assertEquals;
import static junit.framework.TestCase.assertTrue;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@ContextConfiguration
public class ApplicationUserManagerTest {

    @Mock
    private ApplicationUserRepo applicationUserRepo;

    @Mock
    private WeeklyTeamRepo weeklyTeamRepo;

    @Mock
    private CollegeTeamRepo collegeTeamRepo;

    @Mock
    private TransferMarketRepo transferMarketRepo;


    private ApplicationUserManager applicationUserManager;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        WeeklyTeamManager weeklyTeamManager = new WeeklyTeamManager(applicationUserRepo, null, weeklyTeamRepo, null, transferMarketRepo);
        applicationUserManager = new ApplicationUserManager(applicationUserRepo, weeklyTeamRepo,
                weeklyTeamManager, collegeTeamRepo);
    }

    @Test
    public void shouldPatchFirstNameIfJustFirstNameBeingChangedAndFirstNameValid() {
        String newFirstName = "new first name";
        UserPatchDTO userPatchDTO = new UserPatchDTO(newFirstName, null, null, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
        assertEquals(newFirstName, user.getFirstName());
    }

    @Test
    public void shouldPatchSurnameIfJustSurnameBeingChangedAndSurnameValid() {
        String newSurname = "new first name";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, newSurname, null, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
        assertEquals(newSurname, user.getSurname());
    }

    @Test
    public void settingTeamNameUpdatesTheTeamName() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(applicationUserRepo.findByUsername("username")).thenReturn(Optional.of(user));
        String newTeamName = "A team name";
        applicationUserManager.setTeamName(user, newTeamName);
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingTeamNameFailsWithSpecialCharacters() {
        ApplicationUser user = new ApplicationUser("username", "123456", "a", "a");
        when(applicationUserRepo.findByUsername("username")).thenReturn(Optional.of(user));
        String newTeamName = "£";
        applicationUserManager.setTeamName(user, newTeamName);
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingTeamNameFailsWithNumbers() {
        ApplicationUser user = new ApplicationUser("username", "123456", "a", "a");
        when(applicationUserRepo.findByUsername("username")).thenReturn(Optional.of(user));
        String newTeamName = "123";
        applicationUserManager.setTeamName(user, newTeamName);
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingTeamNameFailsSpace() {
        ApplicationUser user = new ApplicationUser("username", "123456", "a", "a");
        when(applicationUserRepo.findByUsername("username")).thenReturn(Optional.of(user));
        String newTeamName = "";
        applicationUserManager.setTeamName(user, newTeamName);
    }

    @Test
    public void shouldPatchUsernameIfJustUsernameBeingChangedAndUsernameValid() {
        String username = "user";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, username, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
        assertEquals(username, user.getUsername());
    }
    @Test(expected = IllegalArgumentException.class)
    public void shouldNotPatchUsernameIfJustUsernameBeingChangedAndUsernameNotValid() {
        String username = "❤❤❤";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, username, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotPatchUsernameIfJustUsernameBeingChangedAndUsernameTaken() {
        String username = "user";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, username, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        ApplicationUser alreadyExistingUser = new ApplicationUser();
        when(applicationUserRepo.findByUsername(userPatchDTO.getUsername())).thenReturn(
                Optional.of(alreadyExistingUser));
        applicationUserManager.patchUser(user, userPatchDTO);
    }

    @Test
    public void shouldPatchPasswordIfJustPasswordBeingChangedAndPasswordValid() {
        String password = "987654";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, null, password);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
        assertTrue(BCrypt.checkpw(password, user.getPassword()));
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotPatchPasswordIfJustPasswordBeingChangedAndPasswordTooShort() {
        String password = "12345";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, null, password);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotPatchPasswordIfJustPasswordBeingChangedAndPasswordTooLong() {
        String password = "a1234567890123456789012345678912";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, null, password);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
        assertTrue(BCrypt.checkpw(password, user.getPassword()));
    }

    @Test
    public void shouldPatchAllFieldsWhenAllFieldsValid() {
        String firstName = "first name";
        String surname = "surname";
        String username = "testuser";
        String password = "111111";
        UserPatchDTO userPatchDTO = new UserPatchDTO(firstName, surname, username, password);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
        assertEquals(firstName, user.getFirstName());
        assertEquals(surname, user.getSurname());
        assertEquals(username, user.getUsername());
        assertTrue(BCrypt.checkpw(password, user.getPassword()));
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotPatchWhenIllegalArgumentException() {
        String username = "user";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, username, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(applicationUserRepo.findByUsername(userPatchDTO.getUsername())).thenThrow(
                new IllegalArgumentException());
        applicationUserManager.patchUser(user, userPatchDTO);
    }

    @Test(expected = Exception.class)
    public void shouldNotPatchWhenException() {
        String username = "user";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, username, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        when(applicationUserRepo.findByUsername(userPatchDTO.getUsername())).thenThrow(new Exception());
        applicationUserManager.patchUser(user, userPatchDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotPatchWhenFirstNameContainsEmoji() {
        String firstName = "❤";
        UserPatchDTO userPatchDTO = new UserPatchDTO(firstName, null, null, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotPatchWhenSurnameContainsEmoji() {
        String surname = "❤";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, surname, null, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldNotPatchWhenUsernameContainsEmoji() {
        String username = "❤";
        UserPatchDTO userPatchDTO = new UserPatchDTO(null, null, username, null);
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a");
        applicationUserManager.patchUser(user, userPatchDTO);
    }

}
