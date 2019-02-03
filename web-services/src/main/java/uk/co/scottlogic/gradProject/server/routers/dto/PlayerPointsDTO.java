package uk.co.scottlogic.gradProject.server.routers.dto;

import java.util.Date;

public class PlayerPointsDTO {

    private Integer goals;
    private Integer assists;
    private Integer mins;
    private boolean motm;
    private Integer yellowCards;
    private boolean red;
    private boolean clean;
    private String playerID;
    private Integer week;

    public PlayerPointsDTO(Integer goals, Integer assists, Integer mins, boolean motm, Integer yellowCards, boolean red, boolean clean, String playerID, Integer week) {
        this.goals = goals;
        this.assists = assists;
        this.mins = mins;
        this.motm = motm;
        this.yellowCards = yellowCards;
        this.red = red;
        this.clean = clean;
        this.playerID = playerID;
        this.week = week;
    }

    public void PlayerPointsDTO() {

    }

    public Integer getGoals() {
        return goals;
    }

    public Integer getAssists() {
        return assists;
    }

    public Integer getMins() {
        return mins;
    }

    public boolean isMotm() {
        return motm;
    }

    public Integer getYellowCards() {
        return yellowCards;
    }

    public boolean isRed() {
        return red;
    }

    public boolean isClean() {
        return clean;
    }

    public String getPlayerID() {
        return playerID;
    }

    public Integer getWeek() {
        return week;
    }
}
