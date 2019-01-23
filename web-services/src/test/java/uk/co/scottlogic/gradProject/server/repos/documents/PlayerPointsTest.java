package uk.co.scottlogic.gradProject.server.repos.documents;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

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
    public void settingAndGettingMinutesPlayed() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer minutesPlayed = 90;
        playerPoints.setMinutesPlayed(minutesPlayed);
        assertEquals(minutesPlayed, playerPoints.getMinutesPlayed());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingMinutesPlayedFailsWhenNegative() {
        PlayerPoints playerPoints = new PlayerPoints();
        Integer minutesPlayed = -50;
        playerPoints.setMinutesPlayed(minutesPlayed);
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

    @Test
    public void settingAndGettingDate() {
        PlayerPoints playerPoints = new PlayerPoints();
        Date date = new DateTime(new Date()).minusMonths(10).toDate();
        playerPoints.setDate(date);
        assertEquals(date, playerPoints.getDate());
    }

    @Test
    public void goalkeeperGetsSixPointsForEachGoal() {
        Integer goals = 2;
        Integer goalkeeperMultiplier = 6;
        Player player = new Player();
        player.setPosition(Player.Position.GOALKEEPER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals*goalkeeperMultiplier;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void defenderGetsSixPointsForEachGoal() {
        Integer goals = 2;
        Integer defenderMultiplier = 6;
        Player player = new Player();
        player.setPosition(Player.Position.DEFENDER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals*defenderMultiplier;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void midfielderGetsFivePointsForEachGoal() {
        Integer goals = 2;
        Integer goalkeeperMultiplier = 5;
        Player player = new Player();
        player.setPosition(Player.Position.MIDFIELDER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals*goalkeeperMultiplier;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void attackerGetsFourPointsForEachGoal() {
        Integer goals = 2;
        Integer goalkeeperMultiplier = 4;
        Player player = new Player();
        player.setPosition(Player.Position.ATTACKER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals*goalkeeperMultiplier;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void playerGetsThreePointsPerAssist() {
        Integer assists = 5;
        Integer assistMultiplier = 3;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, assists, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = assists*assistMultiplier;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void loseOnePointPerYellowCard() {
        Integer yellowCards = 2;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, yellowCards, false, false, null, player, 0);
        Integer numberOfPoints = yellowCards*-1;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void loseThreePointsForRedCard() {
        Integer recCardPenalty = -3;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, true, false, null, player, 0);
        assertEquals(recCardPenalty, playerPoints.calculateScore());
    }

    @Test
    public void getThreePointsForManOfTheMatch() {
        Integer manOfTheMatchBonus = 3;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, true, 0, false, false, null, player, 0);
        assertEquals(manOfTheMatchBonus, playerPoints.calculateScore());
    }

    @Test
    public void goalkeeperGetsFourPointsForCleanSheet() {
        Integer goalKeeperCleanSheetMultiplier = 4;
        Player player = new Player();
        player.setPosition(Player.Position.GOALKEEPER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(goalKeeperCleanSheetMultiplier, playerPoints.calculateScore());
    }

    @Test
    public void defenderGetsFourPointsForCleanSheet() {
        Integer defenderCleanSheetMultiplier = 4;
        Player player = new Player();
        player.setPosition(Player.Position.DEFENDER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(defenderCleanSheetMultiplier, playerPoints.calculateScore());
    }

    @Test
    public void midfielderGetsZeroPointsForCleanSheet() {
        Integer midfielderCleanSheetMultiplier = 0;
        Player player = new Player();
        player.setPosition(Player.Position.MIDFIELDER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(midfielderCleanSheetMultiplier, playerPoints.calculateScore());
    }

    @Test
    public void attackerGetsZeroPointsForCleanSheet() {
        Integer attackerCleanSheetMultiplier = 0;
        Player player = new Player();
        player.setPosition(Player.Position.ATTACKER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(attackerCleanSheetMultiplier, playerPoints.calculateScore());
    }
}
