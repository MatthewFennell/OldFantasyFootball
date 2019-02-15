package uk.co.scottlogic.gradProject.server.repos.documents;

import org.junit.Before;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.UUID;

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
        League league = new League(owner, "League name", Collections.emptyList(), 0);
        assertEquals(owner, league.getOwner());
    }

    @Test
    public void getParticipants() {
        ArrayList<ApplicationUser> users = new ArrayList<>();
        users.add(new ApplicationUser("a", "123456", "a", "a", "a@a.com"));
        users.add(new ApplicationUser("b", "123456", "b", "b", "b@b.com"));
        users.add(new ApplicationUser("c", "123456", "c", "c", "c@c.com"));
        users.add(new ApplicationUser("d", "123456", "d", "d", "d@d.com"));

        League league = new League(null, "League name", users, 0);
        assertEquals(users, league.getParticipants());
    }

    @Test
    public void getAndSetStartWeek() {
        Integer startWeek = 15;
        League league = new League(null, "League name", null, startWeek);
        assertEquals(startWeek, league.getStartWeek());
    }

    @Test
    public void getAndSetID() {
        UUID id = UUID.randomUUID();
        League league = new League(null, "League name", null, 0);
        league.setId(id);
        assertEquals(id, league.getId());
    }

    @Test
    public void getAndSetPoints() {
        Integer points = 10;
        League league = new League(null, "League name", null, 0);
        league.setPoints(points);
        assertEquals(points, league.getPoints());
    }

    @Test
    public void changePoints() {
        Integer points = 10;
        League league = new League(null, "League name", null, 0);
        league.setPoints(points);
        league.changePoints(10);
        assertEquals(Integer.valueOf(20), league.getPoints());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingWinsFailsWhenNegative() {
        Integer startWeek = -5;
        League league = new League();
        league.setStartWeek(startWeek);
    }

    @Test
    public void setOwnerChangesTheOwner() {
        ApplicationUser u1 = new ApplicationUser("a", "123456", "a", "a", "a@a.com");
        ApplicationUser u2 = new ApplicationUser("b", "123456", "b", "b", "b@b.com");
        Integer startWeek = 15;
        League league = new League(u1, "League name", null, startWeek);
        league.setOwner(u2);
        assertEquals(u2, league.getOwner());
    }

    @Test
    public void addParticipant() {
        ArrayList<ApplicationUser> users = new ArrayList<>();
        users.add(new ApplicationUser("a", "123456", "a", "a", "a@a.com"));
        users.add(new ApplicationUser("b", "123456", "b", "b", "b@b.com"));
        users.add(new ApplicationUser("c", "123456", "c", "c", "c@c.com"));
        users.add(new ApplicationUser("d", "123456", "d", "d", "d@d.com"));

        ApplicationUser newUser = new ApplicationUser("new", "123456", "new", "new", "new@new.com");

        League league = new League(newUser, "League name", users, 0);
        league.addParticipant(newUser);
        users.add(newUser);
        assertEquals(users, league.getParticipants());
    }

    @Test(expected = IllegalArgumentException.class)
    public void creatingLeagueWithNoNameFails(){
        ApplicationUser newUser = new ApplicationUser("new", "123456", "new", "new", "new@new.com");
        new League(newUser, "", new ArrayList<>(), 0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void creatingLeagueWithNumbersInLeagueName(){
        ApplicationUser newUser = new ApplicationUser("new", "123456", "new", "new", "new@new.com");
        new League(newUser, "123", new ArrayList<>(), 0);
    }

    @Test(expected = IllegalArgumentException.class)
    public void creatingLeagueWithSpecialCharsFails(){
        ApplicationUser newUser = new ApplicationUser("new", "123456", "new", "new", "new@new.com");
        new League(newUser, "Lea&&", new ArrayList<>(), 0);
    }

}
