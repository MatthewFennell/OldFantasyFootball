package uk.co.scottlogic.gradProject.server.repos.documents;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;

import static org.junit.Assert.assertEquals;

public class LeagueTest {

    @Before
    public void setUp() {
    }

    @Test
    public void settingAndGettingName() {
        League league = new League();
        String name = "all";
        league.setLeagueName(name);
        assertEquals(name, league.getLeagueName());
    }

    @Test
    public void getOwner() {
        ApplicationUser owner = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        League league = new League(owner, "league_name", Collections.emptyList(), 0, "code");
        assertEquals(owner, league.getOwner());
    }

    @Test
    public void getParticipants() {
        ArrayList<ApplicationUser> users = new ArrayList<>();
        users.add(new ApplicationUser("a", "123456", "a", "a", "a@a.com"));
        users.add(new ApplicationUser("b", "123456", "b", "b", "b@b.com"));
        users.add(new ApplicationUser("c", "123456", "c", "c", "c@c.com"));
        users.add(new ApplicationUser("d", "123456", "d", "d", "d@d.com"));

        League league = new League(null, "league_name", users, 0, "code");
        assertEquals(users, league.getParticipants());
    }

    @Test
    public void getAndSetStartWeek() {
        Integer startWeek = 15;
        League league = new League(null, null, null, startWeek, null);
        assertEquals(startWeek, league.getStartWeek());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingWinsFailsWhenNegative() {
        Integer startWeek = -5;
        League league = new League();
        league.setStartWeek(startWeek);
    }

    @Test
    public void addParticipant() {
        ArrayList<ApplicationUser> users = new ArrayList<>();
        users.add(new ApplicationUser("a", "123456", "a", "a", "a@a.com"));
        users.add(new ApplicationUser("b", "123456", "b", "b", "b@b.com"));
        users.add(new ApplicationUser("c", "123456", "c", "c", "c@c.com"));
        users.add(new ApplicationUser("d", "123456", "d", "d", "d@d.com"));

        ApplicationUser newUser = new ApplicationUser("new", "123456", "new", "new", "new@new.com");

        League league = new League(newUser, "league_name", users, 0, "code");
        league.addParticipant(newUser);
        users.add(newUser);
        assertEquals(users, league.getParticipants());
    }

}
