package uk.co.scottlogic.gradProject.server.repos.documents;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CollegeTeamTest {

    @Before
    public void setUp() {
    }

    @Test
    public void constructorTest() {
        CollegeTeam collegeTeam = new CollegeTeam("name");
        assertEquals("name", collegeTeam.getName());
        assertEquals(Integer.valueOf(0), collegeTeam.getWins());
        assertEquals(Integer.valueOf(0), collegeTeam.getDraws());
        assertEquals(Integer.valueOf(0), collegeTeam.getLosses());
        assertEquals(Integer.valueOf(0), collegeTeam.getGoalsFor());
        assertEquals(Integer.valueOf(0), collegeTeam.getGoalsAgainst());
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

    @Test(expected = IllegalArgumentException.class)
    public void creatingCollegeTeamWithJustSpaceFails(){
        new CollegeTeam(" ");
    }

    @Test(expected = IllegalArgumentException.class)
    public void creatingCollegeTeamWithSpaceAtFrontFails(){
        new CollegeTeam(" College Team");
    }

    @Test(expected = IllegalArgumentException.class)
    public void creatingCollegeTeamWithNumbersFails(){
        new CollegeTeam("College N12");
    }

    @Test(expected = IllegalArgumentException.class)
    public void creatingCollegeTeamWithSpecialCharactersFails(){
        new CollegeTeam("Coll£");
    }
}
