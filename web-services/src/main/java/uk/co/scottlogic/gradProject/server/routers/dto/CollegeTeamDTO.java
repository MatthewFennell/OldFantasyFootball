package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;

public class CollegeTeamDTO {

    private String id;
    private String name;
    private Integer wins;
    private Integer draws;
    private Integer losses;
    private Integer goalsFor;
    private Integer goalsAgainst;
    private Integer totalScore;

    public CollegeTeamDTO(CollegeTeam team) {
        this.name = team.getName();
        this.wins = team.getWins();
        this.draws = team.getDraws();
        this.losses = team.getLosses();
        this.goalsFor = team.getGoalsFor();
        this.goalsAgainst = team.getGoalsAgainst();
        this.id = team.getId().toString();
        setTotalScore();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public void setTotalScore() {
        this.totalScore = this.wins * 3 + this.draws;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
