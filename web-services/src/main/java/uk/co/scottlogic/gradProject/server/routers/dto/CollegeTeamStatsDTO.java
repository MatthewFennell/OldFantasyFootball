package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.misc.Enums;

public class CollegeTeamStatsDTO {

    private String collegeName;
    private Integer goalsFor;
    private Integer goalsAgainst;
    private Enums.Result result;

    private Integer wins;
    private Integer draws;
    private Integer losses;

    public CollegeTeamStatsDTO(String collegeName, Enums.Result result, Integer goalsFor, Integer goalsAgainst, Integer wins, Integer draws, Integer losses) {
        this.collegeName = collegeName;
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.result = result;
        this.wins = wins;
        this.draws = draws;
        this.losses = losses;
    }

    public Integer getWins() {
        return wins;
    }

    public void setWins(Integer wins) {
        this.wins = wins;
    }

    public Integer getDraws() {
        return draws;
    }

    public void setDraws(Integer draws) {
        this.draws = draws;
    }

    public Integer getLosses() {
        return losses;
    }

    public void setLosses(Integer losses) {
        this.losses = losses;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public Enums.Result getResult() {
        return result;
    }

    public void setResult(Enums.Result result) {
        this.result = result;
    }

    public Integer getGoalsFor() {
        return goalsFor;
    }

    public void setGoalsFor(Integer goalsFor) {
        this.goalsFor = goalsFor;
    }

    public Integer getGoalsAgainst() {
        return goalsAgainst;
    }

    public void setGoalsAgainst(Integer goalsAgainst) {
        this.goalsAgainst = goalsAgainst;
    }
}
