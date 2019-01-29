package uk.co.pampoomio.fennell.server.repos.documents;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import uk.co.pampoomio.fennell.server.misc.Constants;
import uk.co.pampoomio.fennell.server.misc.Enums;

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
        Player player = new Player();
        player.setPosition(Enums.Position.GOALKEEPER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals * Constants.POINTS_PER_DEFENDER_GOAL;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void defenderGetsSixPointsForEachGoal() {
        Integer goals = 2;
        Player player = new Player();
        player.setPosition(Enums.Position.DEFENDER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals * Constants.POINTS_PER_DEFENDER_GOAL;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void midfielderGetsFivePointsForEachGoal() {
        Integer goals = 2;
        Player player = new Player();
        player.setPosition(Enums.Position.MIDFIELDER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals * Constants.POINTS_PER_MIDFIELDER_GOAL;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void attackerGetsFourPointsForEachGoal() {
        Integer goals = 2;
        Player player = new Player();
        player.setPosition(Enums.Position.ATTACKER);
        PlayerPoints playerPoints = new PlayerPoints(goals, 0, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = goals * Constants.POINTS_PER_ATTACKER_GOAL;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void playerGetsThreePointsPerAssist() {
        Integer assists = 5;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, assists, 0, false, 0, false, false, null, player, 0);
        Integer numberOfPoints = assists * Constants.POINTS_PER_ASSIST;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void loseOnePointPerYellowCard() {
        Integer yellowCards = 2;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, yellowCards, false, false, null, player, 0);
        Integer numberOfPoints = yellowCards * Constants.POINTS_PER_YELLOW_CARD;
        assertEquals(numberOfPoints, playerPoints.calculateScore());
    }

    @Test
    public void loseThreePointsForRedCard() {
        Integer recCardPenalty = Constants.POINTS_PER_RED_CARD;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, true, false, null, player, 0);
        assertEquals(recCardPenalty, playerPoints.calculateScore());
    }

    @Test
    public void getThreePointsForManOfTheMatch() {
        Integer manOfTheMatchBonus = Constants.MAN_OF_THE_MATCH_BONUS;
        Player player = new Player();
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, true, 0, false, false, null, player, 0);
        assertEquals(manOfTheMatchBonus, playerPoints.calculateScore());
    }

    @Test
    public void goalkeeperGetsFourPointsForCleanSheet() {
        Player player = new Player();
        player.setPosition(Enums.Position.GOALKEEPER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints.calculateScore());
    }

    @Test
    public void defenderGetsFourPointsForCleanSheet() {
        Player player = new Player();
        player.setPosition(Enums.Position.DEFENDER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(Constants.POINTS_PER_CLEAN_SHEET, playerPoints.calculateScore());
    }

    @Test
    public void midfielderGetsZeroPointsForCleanSheet() {
        Player player = new Player();
        player.setPosition(Enums.Position.MIDFIELDER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(Integer.valueOf(0), playerPoints.calculateScore());
    }

    @Test
    public void attackerGetsZeroPointsForCleanSheet() {
        Player player = new Player();
        player.setPosition(Enums.Position.ATTACKER);
        PlayerPoints playerPoints = new PlayerPoints(0, 0, 0, false, 0, false, true, null, player, 0);
        assertEquals(Integer.valueOf(0), playerPoints.calculateScore());
    }
}
