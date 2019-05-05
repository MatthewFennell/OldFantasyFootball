package uk.co.scottlogic.gradProject.server.repos.documents;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.UUID;

import static org.junit.Assert.*;

public class PlayerPointsTest {

    @Before
    public void setUp() {
    }

    @Test
    public void settingAndGettingPoints() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer points = 1005;
        playerPoints.setPoints(points);
        assertEquals(points, playerPoints.getPoints());
    }

    @Test
    public void settingAndGettingID() {
        PlayerPoints playerPoints = new PlayerPoints();
        UUID id = UUID.randomUUID();
        playerPoints.setId(id);
        assertEquals(id, playerPoints.getId());
    }

    @Test
    public void settingAndGettingWeek() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer week = 50;
        playerPoints.setWeek(week);
        assertEquals(week, playerPoints.getWeek());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingWeekFailsWhenNegative() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer week = -50;
        playerPoints.setWeek(week);
    }

    @Test
    public void settingAndGettingPlayer() {
        PlayerPoints playerPoints = new PlayerPoints();
        Player player = new Player();
        playerPoints.setPlayer(player);
        assertEquals(player, playerPoints.getPlayer());
    }

    @Test
    public void settingAndGettingGoals() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer goals = 5;
        playerPoints.setNumberOfGoals(goals);
        assertEquals(goals, playerPoints.getNumberOfGoals());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingGoalsFailsWhenNegative() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer goals = -50;
        playerPoints.setNumberOfGoals(goals);
    }

    @Test
    public void settingAndGettingAssists() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer assists = 5;
        playerPoints.setNumberOfAssists(assists);
        assertEquals(assists, playerPoints.getNumberOfAssists());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingAssistsFailsWhenNegative() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer assists = -50;
        playerPoints.setNumberOfAssists(assists);
    }

    @Test
    public void settingAndGettingManOfTheMatch() {
        PlayerPoints playerPoints = new PlayerPoints();
        playerPoints.setManOfTheMatch(true);
        assertTrue(playerPoints.isManOfTheMatch());
        playerPoints.setManOfTheMatch(false);
        assertFalse(playerPoints.isManOfTheMatch());
    }

    @Test
    public void settingAndGettingYellowCards() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer yellowCards = 1;
        playerPoints.setYellowCards(yellowCards);
        assertEquals(yellowCards, playerPoints.getYellowCards());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingYellowCardsFailsWhenNegative() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer yellowCards = -1;
        playerPoints.setYellowCards(yellowCards);
    }

    @Test(expected = IllegalArgumentException.class)
    public void cannotHaveMoreThanTwoYellowCards() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer yellowCards = 3;
        playerPoints.setYellowCards(yellowCards);
    }

    @Test
    public void settingAndGettingRedCards() {
        PlayerPoints playerPoints = new PlayerPoints();
        playerPoints.setRedCard(true);
        assertTrue(playerPoints.isRedCard());
        playerPoints.setRedCard(false);
        assertFalse(playerPoints.isRedCard());
    }

    @Test
    public void settingAndGettingCleanSheet() {
        PlayerPoints playerPoints = new PlayerPoints();
        playerPoints.setCleanSheet(true);
        assertTrue(playerPoints.isCleanSheet());
        playerPoints.setCleanSheet(false);
        assertFalse(playerPoints.isCleanSheet());
    }
}
