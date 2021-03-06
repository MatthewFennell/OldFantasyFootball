package uk.co.scottlogic.gradProject.server.routers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import uk.co.scottlogic.gradProject.server.auth.JwtTokenProvider;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.routers.dto.RegisterDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserReturnDTO;

import static junit.framework.TestCase.assertEquals;

@RunWith(SpringRunner.class)
@ContextConfiguration
public class AuthenticationTest {

    @Value("${server.host}")
    private String host;

    @Value("${jwt.secret}")
    private String secret_str;

    @Mock
    private ApplicationUserRepo applicationUserRepo;

    @Mock
    private RefreshTokenRepo refreshTokenRepo;

    @Mock
    private JwtTokenProvider jwtTokenProvider;

    @Mock
    private WeeklyTeamRepo weeklyTeamRepo;

    @Mock
    private LeagueRepo leagueRepo;

    private Authentication authentication;
    private ApplicationUserManager applicationUserManager;

    @Before
    public void setUp() throws Exception {
        jwtTokenProvider = new JwtTokenProvider(host, secret_str, applicationUserRepo,
                refreshTokenRepo);
        authentication = new Authentication(applicationUserRepo, jwtTokenProvider, weeklyTeamRepo, leagueRepo, applicationUserManager);
    }

    @Test
    public void registeringAUserWithValidDetailsReturnsA201() {
        RegisterDTO registerDTO = new RegisterDTO("user", "123456", "first name", "surname", Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        authentication.register(registerDTO, response);
        assertEquals(201, response.getStatus());
    }

    @Test
    public void registeringAUserReturnsUserObjectWithCorrectUsername() {
        String username = "username";
        RegisterDTO registerDTO = new RegisterDTO(username, "123456", "first name", "surname", Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        UserReturnDTO returnUser = authentication.register(registerDTO, response);
        assertEquals(username, returnUser.getUsername());
    }

    @Test
    public void registeringAUserReturnsUserObjectWithCorrectFirstName() {
        String firstName = "first name";
        RegisterDTO registerDTO = new RegisterDTO("username", "123456", firstName, "surname", Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        UserReturnDTO returnUser = authentication.register(registerDTO, response);
        assertEquals(firstName, returnUser.getFirstName());
    }

    @Test
    public void registeringAUserReturnsUserObjectWithCorrectSurname() {
        String surname = "surname";
        RegisterDTO registerDTO = new RegisterDTO("username", "123456", "first name", surname, Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        UserReturnDTO returnUser = authentication.register(registerDTO, response);
        assertEquals(surname, returnUser.getSurname());
    }

    @Test
    public void registeringAUserReturnsWithAPasswordGreaterThan31DigitsThrows400() {
        String password = "a1234567890123456789012345678912";
        RegisterDTO registerDTO = new RegisterDTO("username", password, "first name", "surname", Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        authentication.register(registerDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void registeringAUserWithAFirstNameWithAnEmojiReturns400() {
        String firstName = "❤";
        RegisterDTO registerDTO = new RegisterDTO("username", "123456", firstName, "surname", Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        authentication.register(registerDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void registeringAUserWithASurnameWithAnEmojiReturns400() {
        String surname = "❤";
        RegisterDTO registerDTO = new RegisterDTO("username", "123456", "firstName", surname, Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        authentication.register(registerDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void registeringAUserWithAUsernameWithAnEmojiReturns400() {
        String username = "❤";
        RegisterDTO registerDTO = new RegisterDTO(username, "123456", "firstName", "surname", Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        authentication.register(registerDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void registeringAUserWithABlankSurnameReturns400() {
        String surname = "";
        RegisterDTO registerDTO = new RegisterDTO("username", "123456", "firstName", surname, Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        authentication.register(registerDTO, response);
        assertEquals(400, response.getStatus());
    }

    @Test
    public void registeringAUserWithABlankFirstNameReturns400() {
        String firstname = "";
        RegisterDTO registerDTO = new RegisterDTO("username", "123456", firstname, "surname", Constants.REGISTER_KEY_CODE);
        MockHttpServletResponse response = new MockHttpServletResponse();
        authentication.register(registerDTO, response);
        assertEquals(400, response.getStatus());
    }

}