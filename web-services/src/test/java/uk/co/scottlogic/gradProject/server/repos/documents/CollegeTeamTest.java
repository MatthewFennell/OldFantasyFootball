package uk.co.scottlogic.gradProject.server.repos.documents;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class CollegeTeamTest {

    @Before
    public void setUp() {
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

    @Test
    public void settingAndGettingDraws() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer draws = 20;
        collegeTeam.setDraws(draws);
        assertEquals(draws, collegeTeam.getDraws());
    }

    @Test
    public void settingAndGettingLosses() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer losses = 30;
        collegeTeam.setLosses(losses);
        assertEquals(losses, collegeTeam.getLosses());
    }

    @Test
    public void settingAndGettingGoalsFor() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer goalsFor = 40;
        collegeTeam.setGoalsFor(goalsFor);
        assertEquals(goalsFor, collegeTeam.getGoalsFor());
    }

    @Test
    public void settingAndGettingGoalsAgainst() {
        CollegeTeam collegeTeam = new CollegeTeam();
        Integer goalsAgainst = 50;
        collegeTeam.setGoalsAgainst(goalsAgainst);
        assertEquals(goalsAgainst, collegeTeam.getGoalsAgainst());
    }
}
