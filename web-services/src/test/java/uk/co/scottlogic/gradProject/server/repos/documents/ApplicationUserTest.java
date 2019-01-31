package uk.co.scottlogic.gradProject.server.repos.documents;

import org.joda.time.DateTime;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import uk.co.scottlogic.gradProject.server.misc.StringGenerator;

import java.util.*;

import static org.assertj.core.api.Java6Assertions.fail;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class ApplicationUserTest {

    @Before
    public void setUp() {
    }

    @Test
    public void userNameOnlyAllowsValidChars() {
        String[] invalidUsernames = new String[]{"", "1\"", "r'", "ge54_-$", "🖤"};
        for (String username : invalidUsernames) {
            try {
                new ApplicationUser(username, "123456", "a", "a", "a@a.com");
            } catch (IllegalArgumentException e) {
                continue;
            }
            Assert.fail("Invalid username did not throw error: " + username);
        }
    }

    @Test
    public void passwordOnlyAllowsValidChars() {
        String[] invalidPasswords = new String[]{"", "1", "11111", "a111111", "111a111", "111111a"};
        for (String password : invalidPasswords) {
            try {
                new ApplicationUser("user", password, "a", "a", "a@a.com");
            } catch (IllegalArgumentException e) {
                continue;
            }
            Assert.fail("Invalid password did not throw error: " + password);
        }
    }

    @Test
    public void userCreation() {
        String[] invalidUsernames = new String[]{"User1", "admin_1", "user_-.2"};
        for (String username : invalidUsernames) {
            try {
                new ApplicationUser(username, "123456", "a", "a", "a@a.com");
            } catch (Exception e) {
                Assert.fail("Creating user \"" + username + "\" threw error:\n" + e.getMessage());
            }
        }
    }

    @Test(expected = IllegalArgumentException.class)
    public void creatingUserWithEmailWithoutAtSymbolShouldFail() {
        new ApplicationUser("user", "123456", "a", "a", "aa.com");
    }

    @Test
    public void standardEmailShouldPass() {
        new ApplicationUser("user", "123456", "a", "a", "user@test.com");
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingUserEmailToStringWithoutAtSymbolShouldFail() {
        ApplicationUser user = new ApplicationUser();
        user.setEmail("aaaa");
    }

    @Test
    public void settingUserEmailToStandardStringShouldPass() {
        ApplicationUser user = new ApplicationUser();
        user.setEmail("user@test.com");
    }

    @Test(expected = IllegalArgumentException.class)
    public void makingUserWithPasswordGreaterThan6DigitsThrowsError() {
        String password = "1234567";
        new ApplicationUser("user", password, "a", "a", "user@test.com");
    }

    @Test(expected = Exception.class)
    public void shouldNotCreateUserWithFirstNameLongerThan63Characters() {
        String firstName = StringGenerator.generateString(64);
        new ApplicationUser("a", "123456", firstName, "a", "a@a.com");
    }

    @Test
    public void shouldCreateUserWithFirstNameFewerThan64Characters() {
        String firstName = StringGenerator.generateString(63);
        new ApplicationUser("a", "123456", firstName, "a", "a@a.com");
    }

    @Test(expected = Exception.class)
    public void shouldNotCreateUserWithSurnameLongerThan63Characters() {
        String surname = StringGenerator.generateString(64);
        new ApplicationUser("a", "123456", "a", surname, "a@a.com");
    }

    @Test
    public void shouldCreateUserWithSurnameFewerThan64Characters() {
        String surname = StringGenerator.generateString(63);
        new ApplicationUser("a", "123456", "a", surname, "a@a.com");
    }

    @Test
    public void shouldCreateUserWhenFirstNameIncludesAccents() {
        String firstName = "Àéœôâêîôûŵŷäëé";
        new ApplicationUser("a", "123456", firstName, "a", "a@a.com");
    }

    @Test
    public void shouldCreateUserWhenSurnameIncludesAccents() {
        String surname = "Àéœôâêîôûŵŷäëé";
        new ApplicationUser("a", "123456", "a", surname, "a@a.com");
    }

    @Test(expected = IllegalArgumentException.class)
    public void emptyUsernameShouldNotMakeAUser() {
        new ApplicationUser("", "123456", "a", "a", "a@a.com");
    }

    @Test(expected = IllegalArgumentException.class)
    public void emptyFirstNameShouldNotMakeAUser() {
        new ApplicationUser("123", "123456", "", "a", "a@a.com");
    }

    @Test(expected = IllegalArgumentException.class)
    public void emptySurnameShouldNotMakeAUser() {
        new ApplicationUser("123", "123456", "a", "", "a@a.com");
    }

    @Test(expected = IllegalArgumentException.class)
    public void apostropheInUsernameShouldNotMakeAUser() {
        new ApplicationUser("bob'", "123456", "a", "a", "a@a.com");
    }

    @Test
    public void underscoreInUsernameShouldMakeAUser() {
        new ApplicationUser("bob_", "123456", "a", "a", "a@a.com");
    }

    @Test
    public void hyphenInUsernameShouldMakeAUser() {
        new ApplicationUser("billy-", "123456", "a", "a", "a@a.com");
    }

    @Test(expected = IllegalArgumentException.class)
    public void emojiInUsernameShouldNotMakeAUser() {
        new ApplicationUser("🖤", "123456", "a", "a", "a@a.com");
    }

    @Test(expected = IllegalArgumentException.class)
    public void emptyPasswordShouldNotMakeAUser() {
        new ApplicationUser("user'", "", "a", "a", "a@a.com");
    }

    @Test
    public void passwordWithLessThanSixCharactersShouldNotMakeAUser() {
        String[] invalidPasswords = new String[]{"1", "12", "123", "1234", "12345"};
        for (String password : invalidPasswords) {
            try {
                new ApplicationUser("user", password, "a", "a", "a@a.com");
                fail("Invalid password did not throw error: " + password);
            } catch (IllegalArgumentException e) {
                e.getMessage();
            }
        }
    }

    @Test
    public void emptyUserCreation() {
        new ApplicationUser();
    }

    @Test
    public void settingAndGettingActiveTokens() {
        ApplicationUser user = new ApplicationUser();
        RefreshToken rt1 = new RefreshToken();
        RefreshToken rt2 = new RefreshToken();
        RefreshToken rt3 = new RefreshToken();
        Collection<RefreshToken> rts = new ArrayList<>();
        rts.add(rt1);
        rts.add(rt2);
        rts.add(rt3);
        user.setActiveTokens(rts);
        assertEquals(rts, user.getActiveTokens());
    }

    @Test
    public void settingAndGettingLocked() {
        ApplicationUser user = new ApplicationUser();
        user.setLocked(true);
        assertTrue(user.isLocked());
        user.setLocked(false);
        assertFalse(user.isLocked());
    }

    @Test
    public void settingAndGettingAccountAndCredentialsExpiry() {
        ApplicationUser user = new ApplicationUser();
        Date date = new Date();
        user.setAccountExpiry(date);
        user.setCredentialsExpiry(date);
        assertEquals(date, user.getAccountExpiry());
        assertEquals(date, user.getCredentialsExpiry());
        Date badDate = new DateTime(date).minusDays(100).toDate();
        assertNotEquals(badDate, user.getAccountExpiry());
        assertNotEquals(badDate, user.getCredentialsExpiry());
    }

    @Test
    public void settingAndGettingAuthorityList() {
        ApplicationUser user = new ApplicationUser();
        UserAuthority userAuthority1 = new UserAuthority("a");
        UserAuthority userAuthority2 = new UserAuthority("b");
        UserAuthority userAuthority3 = new UserAuthority("c");
        Set<UserAuthority> userAuthorities = new HashSet<>();
        userAuthorities.add(userAuthority1);
        userAuthorities.add(userAuthority2);
        userAuthorities.add(userAuthority3);
        user.setAuthorityList(userAuthorities);
        assertEquals(userAuthorities, user.getAuthorityList());
    }

    @Test
    public void settingAndAddingToAuthorityList() {
        ApplicationUser user = new ApplicationUser();
        UserAuthority userAuthority1 = new UserAuthority("a");
        UserAuthority userAuthority2 = new UserAuthority("b");
        UserAuthority userAuthority3 = new UserAuthority("c");
        UserAuthority userAuthority4 = new UserAuthority("d");
        Set<UserAuthority> userAuthorities = new HashSet<>();
        userAuthorities.add(userAuthority1);
        userAuthorities.add(userAuthority2);
        userAuthorities.add(userAuthority3);
        user.setAuthorityList(userAuthorities);
        userAuthorities.add(userAuthority4);
        user.addAuthority(userAuthority4);
        assertEquals(userAuthorities, user.getAuthorityList());
    }

    @Test
    public void deletingAnAuthority() {
        ApplicationUser user = new ApplicationUser();
        UserAuthority userAuthority1 = new UserAuthority("a");
        UserAuthority userAuthority2 = new UserAuthority("b");
        UserAuthority userAuthority3 = new UserAuthority("c");
        UserAuthority userAuthority4 = new UserAuthority("d");
        Set<UserAuthority> userAuthorities = new HashSet<>();
        Set<UserAuthority> userAuthorities1 = new HashSet<>();
        userAuthorities.add(userAuthority1);
        userAuthorities.add(userAuthority2);
        userAuthorities.add(userAuthority3);
        userAuthorities1.add(userAuthority1);
        userAuthorities1.add(userAuthority2);
        userAuthorities1.add(userAuthority3);
        userAuthorities1.add(userAuthority4);
        user.setAuthorityList(userAuthorities1);
        user.delAuthority(userAuthority4);
        assertEquals(userAuthorities, user.getAuthorityList());
        assertNotEquals(userAuthorities1, user.getAuthorityList());
    }

    @Test
    public void settingAndGettingID() {
        ApplicationUser user = new ApplicationUser();
        UUID id = UUID.randomUUID();
        user.setId(id);
        assertEquals(id, user.getUuid());
    }

    @Test
    public void settingAndGettingTeamName() {
        ApplicationUser user = new ApplicationUser();
        String teamName = "team name";
        user.setTeamName(teamName);
        assertEquals(teamName, user.getTeamName());
    }

    @Test
    public void getAndSetRemainingBudget() {
        ApplicationUser user = new ApplicationUser();
        double budget = 10;
        user.setRemainingBudget(budget);
        assertEquals(budget, user.getRemainingBudget(), 0.01);
    }

    @Test
    public void changeRemainingBudget() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        double initialBudget = 10;
        double budgetChange = 5;
        user.setRemainingBudget(initialBudget);
        user.changeRemainingBudget(budgetChange);
        assertEquals(initialBudget + budgetChange, user.getRemainingBudget(), 0.01);
    }

    @Test
    public void changeTotalPoints() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        Integer initialPoints = 10;
        Integer pointsChange = 5;
        user.setTotalPoints(initialPoints);
        user.changeTotalPoints(pointsChange);
        assertEquals(Integer.valueOf(initialPoints + pointsChange), user.getTotalPoints());
    }

    @Test
    public void getAndSetPassword() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        String password = "password";
        user.setPassword(password);
        assertEquals(password, user.getPassword());
    }

    @Test
    public void getAndSetID() {
        ApplicationUser user = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        String id = UUID.randomUUID().toString();
        user.setId(id);
        assertEquals(id, user.getId());
    }

    @Test
    public void isAccountExpired() {
        ApplicationUser user = new ApplicationUser();
        Date date = new DateTime(new Date()).minusMonths(5).toDate();
        user.setAccountExpiry(date);
        assertFalse(user.isAccountNonExpired());
        date = new DateTime(new Date()).plusMonths(5).toDate();
        user.setAccountExpiry(date);
        assertTrue(user.isAccountNonExpired());
    }

    @Test
    public void isAccountLocked() {
        ApplicationUser user = new ApplicationUser();
        user.setLocked(true);
        assertFalse(user.isAccountNonLocked());
        user.setLocked(false);
        assertTrue(user.isAccountNonLocked());
    }

    @Test
    public void isCredentialsExpired() {
        ApplicationUser user = new ApplicationUser();
        Date date = new DateTime(new Date()).minusMonths(5).toDate();
        user.setCredentialsExpiry(date);
        assertFalse(user.isCredentialsNonExpired());
        date = new DateTime(new Date()).plusMonths(5).toDate();
        user.setCredentialsExpiry(date);
        assertTrue(user.isCredentialsNonExpired());
    }

    @Test
    public void isEnabled() {
        ApplicationUser user = new ApplicationUser();
        user.setEnabled(true);
        assertTrue(user.isEnabled());
        user.setEnabled(false);
        assertFalse(user.isEnabled());
    }


    @Test
    public void checkDisplayNameAndNickname() {
        ApplicationUser user = new ApplicationUser();
        String nickname = "nickname";
        user.setNickname(nickname);
        assertEquals(nickname, user.getNickname());
    }

}