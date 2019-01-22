package uk.co.scottlogic.gradProject.server.repos.documents;

import org.junit.Before;
import org.junit.Test;

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
        Player.Position position = Player.Position.MIDFIELDER;
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
}
