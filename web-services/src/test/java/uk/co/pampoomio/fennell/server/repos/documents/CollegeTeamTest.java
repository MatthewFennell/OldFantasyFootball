package uk.co.pampoomio.fennell.server.repos.documents;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CollegeTeamTest {

    @Before
    public void setUp() {
    }

    @Test
    public void constructorTest() {
        CollegeTeam collegeTeam = new CollegeTeam("name", 5, 4, 3, 2, 1);
        assertEquals("name", collegeTeam.getName());
        assertEquals(Integer.valueOf(5), collegeTeam.getWins());
        assertEquals(Integer.valueOf(4), collegeTeam.getDraws());
        assertEquals(Integer.valueOf(3), collegeTeam.getLosses());
        assertEquals(Integer.valueOf(2), collegeTeam.getGoalsFor());
        assertEquals(Integer.valueOf(1), collegeTeam.getGoalsAgainst());
    }

    @Test
    public void settingAndGettingName() {
        CollegeTeam collegeTeam = new CollegeTeam();
        String name = "A";
        collegeTeam.setName(name);
        assertEquals(name, collegeTeam.getName());
    }

    @Test
    public void settingAndGettingWins() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer wins = 10;
        collegeTeam.setWins(wins);
        assertEquals(wins, collegeTeam.getWins());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingWinsFailsWhenNegative() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer wins = -10;
        collegeTeam.setWins(wins);
    }

    @Test
    public void settingAndGettingDraws() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer draws = 20;
        collegeTeam.setDraws(draws);
        assertEquals(draws, collegeTeam.getDraws());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingDrawsFailsWhenNegative() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer draws = -10;
        collegeTeam.setDraws(draws);
    }

    @Test
    public void settingAndGettingLosses() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer losses = 30;
        collegeTeam.setLosses(losses);
        assertEquals(losses, collegeTeam.getLosses());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingLossesFailsWhenNegative() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer losses = -10;
        collegeTeam.setLosses(losses);
    }

    @Test
    public void settingAndGettingGoalsFor() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer goalsFor = 40;
        collegeTeam.setGoalsFor(goalsFor);
        assertEquals(goalsFor, collegeTeam.getGoalsFor());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingGoalsForFailsWhenNegative() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer goalsFor = -10;
        collegeTeam.setGoalsFor(goalsFor);
    }

    @Test
    public void settingAndGettingGoalsAgainst() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer goalsAgainst = 50;
        collegeTeam.setGoalsAgainst(goalsAgainst);
        assertEquals(goalsAgainst, collegeTeam.getGoalsAgainst());
    }

    @Test(expected = IllegalArgumentException.class)
    public void settingGoalsAgainstFailsWhenNegative() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer goalsAgainst = -10;
        collegeTeam.setGoalsAgainst(goalsAgainst);
    }
}
