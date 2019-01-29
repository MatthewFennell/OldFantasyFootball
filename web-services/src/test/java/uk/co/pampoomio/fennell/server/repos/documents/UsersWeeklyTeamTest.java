package uk.co.pampoomio.fennell.server.repos.documents;

import org.joda.time.DateTime;
import org.junit.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.junit.Assert.assertEquals;

public class UsersWeeklyTeamTest {

    @Test
    public void settingAndGettingPoints() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        Integer points = 1005;
        weeklyTeam.setPoints(points);
        assertEquals(points, weeklyTeam.getPoints());
    }

    @Test
    public void settingAndGettingID() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        UUID id = UUID.randomUUID();
        weeklyTeam.setId(id);
        assertEquals(id, weeklyTeam.getId());
    }

    @Test
    public void changingWeeklyPoints() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        Integer points = 1005;
        weeklyTeam.setPoints(points);
        Integer changePoints = 500;
        weeklyTeam.changePoints(changePoints);
        Integer result = points + changePoints;
        assertEquals(result, weeklyTeam.getPoints());
    }

    @Test
    public void settingAndGettingWeek() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        Integer week = 10;
        weeklyTeam.setWeek(week);
        assertEquals(week, weeklyTeam.getWeek());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingWeekFailsWhenNegative() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        Integer week = -50;
        weeklyTeam.setWeek(week);
    }

    @Test
    public void settingAndGettingUser() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        ApplicationUser user = new ApplicationUser();
        weeklyTeam.setUser(user);
        assertEquals(user, weeklyTeam.getUser());
    }

    @Test
    public void settingAndGettingDate() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        Date date = new DateTime(new Date()).minusMonths(10).toDate();
        weeklyTeam.setDate(date);
        assertEquals(date, weeklyTeam.getDate());
    }

    @Test
    public void settingAndGettingPlayers() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();
        List<Player> players = new ArrayList<>();
        players.add(new Player());
        players.add(new Player());
        weeklyTeam.setPlayers(players);
        assertEquals(players, weeklyTeam.getPlayers());
    }

    @Test
    public void addingAPlayer() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();

        Player p1 = new Player();
        Player p2 = new Player();
        Player p3 = new Player();
        Player p4 = new Player();

        List<Player> players = new ArrayList<>();
        players.add(p1);
        players.add(p2);
        players.add(p3);
        weeklyTeam.setPlayers(players);
        weeklyTeam.addPlayer(p4);
        players.add(p4);
        assertEquals(players, weeklyTeam.getPlayers());

    }

    @Test
    public void removingAPlayer() {
        UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam();

        Player p1 = new Player(null, null, 0, "a", "b");
        Player p2 = new Player(null, null, 0, "c", "d");
        Player p3 = new Player(null, null, 0, "e", "f");
        Player p4 = new Player(null, null, 0, "g", "h");

        List<Player> players = new ArrayList<>();
        players.add(p1);
        players.add(p3);
        players.add(p4);

        List<Player> playersBeforeRemoval = new ArrayList<>();
        playersBeforeRemoval.add(p1);
        playersBeforeRemoval.add(p2);
        playersBeforeRemoval.add(p3);
        playersBeforeRemoval.add(p4);

        weeklyTeam.setPlayers(playersBeforeRemoval);
        weeklyTeam.removePlayer(p2);

        assertEquals(players, weeklyTeam.getPlayers());

    }
}
