package uk.co.scottlogic.gradProject.server.routers.dto;

import java.util.List;

public class SubmitPointsDTO {

    private Integer goalsFor;
    private Integer goalsAgainst;
    private Integer week;
    private List<String> goalScorers;
    private List<String> assists;
    private List<String> cleanSheets;
    private String teamName;
    private String manOfTheMatch;

    public SubmitPointsDTO(Integer goalsFor, Integer goalsAgainst, Integer week, List<String> goalScorers, List<String> assists, List<String> cleanSheets, String teamName, String manOfTheMatch) {
        this.goalsFor = goalsFor;
        this.goalsAgainst = goalsAgainst;
        this.week = week;
        this.goalScorers  = goalScorers;
        this.assists = assists;
        this.cleanSheets = cleanSheets;
        this.teamName = teamName;
        this.manOfTheMatch = manOfTheMatch;
    }

    public SubmitPointsDTO(){

    }

    public String getManOfTheMatch() {
        return manOfTheMatch;
    }

    public void setManOfTheMatch(String manOfTheMatch) {
        this.manOfTheMatch = manOfTheMatch;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public List<String> getCleanSheets() {
        return cleanSheets;
    }

    public void setCleanSheets(List<String> cleanSheets) {
        this.cleanSheets = cleanSheets;
    }

    public List<String> getAssists() {
        return assists;
    }

    public void setAssists(List<String> assists) {
        this.assists = assists;
    }

    public List<String> getGoalScorers() {
        return goalScorers;
    }

    public void setGoalScorers(List<String> goalScorers) {
        this.goalScorers = goalScorers;
    }

    public Integer getWeek() {
        return week;
    }

    public void setWeek(Integer week) {
        this.week = week;
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
