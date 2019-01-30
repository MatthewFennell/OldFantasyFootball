package uk.co.scottlogic.gradProject.server.repos.documents;

import org.junit.Before;
import org.junit.Test;
import uk.co.scottlogic.gradProject.server.misc.Enums;

import static org.junit.Assert.assertEquals;

public class PlayerTest {

    @Before
    public void setUp() {
    }

    @Test
    public void settingAndGettingFirstName() {
        Player player = new Player();
        String firstName = "firstname";
        player.setFirstName(firstName);
        assertEquals(firstName, player.getFirstName());
    }

    @Test
    public void settingAndGettingSurname() {
        Player player = new Player();
        String surname = "surname";
        player.setSurname(surname);
        assertEquals(surname, player.getSurname());
    }

    @Test
    public void settingAndGettingPrice() {
        Player player = new Player();
        double price = 5.5;
        player.setPrice(price);
        assertEquals(price, player.getPrice(), 0.01);
    }

    @Test
    public void settingAndGettingPosition() {
        Player player = new Player();
        Enums.Position position = Enums.Position.MIDFIELDER;
        player.setPosition(position);
        assertEquals(position, player.getPosition());
    }

    @Test
    public void settingAndGettingGoals() {
        Player player = new Player();
        Integer goals = 5;
        player.setTotalGoals(goals);
        assertEquals(goals, player.getTotalGoals());
    }

    @Test
    public void settingAndGettingAssists() {
        Player player = new Player();
        Integer assists = 5;
        player.setTotalAssists(assists);
        assertEquals(assists, player.getTotalAssists());
    }

    @Test
    public void settingAndGettingCollegeTeam() {
        Player player = new Player();
        CollegeTeam team = new CollegeTeam();
        player.setActiveTeam(team);
        assertEquals(team, player.getActiveTeam());
    }

    @Test
    public void settingAndGettingTotalScore() {
        Player player = new Player();
        Integer score = 105;
        player.setTotalScore(score);
        assertEquals(score, player.getTotalScore());
    }

    @Test
    public void changingScore() {
        Player player = new Player(null, null, 0, null, null);
        Integer changePositive = 10;
        player.changeScore(changePositive);
        assertEquals(changePositive, player.getTotalScore());

        Integer changeScoreNegative = -20;
        Integer expected = changePositive + changeScoreNegative;
        player.changeScore(changeScoreNegative);
        assertEquals(expected, player.getTotalScore());
    }
}
