package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;

public class PlayerPointsDTO {
    private Integer goals;
    private Integer assists;
    private boolean manOfTheMatch;
    private Integer yellowCards;
    private boolean redCard;
    private boolean cleanSheet;
    private String playerID;
    private Integer week;

    public PlayerPointsDTO(Integer goals, Integer assists, boolean motm, Integer yellowCards, boolean red, boolean clean, String playerID, Integer week) {
        this.goals = goals;
        this.assists = assists;
        this.manOfTheMatch = motm;
        this.yellowCards = yellowCards;
        this.redCard = red;
        this.cleanSheet = clean;
        this.playerID = playerID;
        this.week = week;
    }

    public PlayerPointsDTO(PlayerPoints playerPoints) {
        this.goals = playerPoints.getNumberOfGoals();
        this.assists = playerPoints.getNumberOfAssists();
        this.manOfTheMatch = playerPoints.isManOfTheMatch();
        this.yellowCards = playerPoints.getYellowCards();
        this.redCard = playerPoints.isRedCard();
        this.cleanSheet = playerPoints.isCleanSheet();
        this.playerID = playerPoints.getPlayer().getId().toString();
        this.week = playerPoints.getWeek();
    }

    public void PlayerPointsDTO() {
    }

    public Integer getGoals() {
        return goals;
    }

    public Integer getAssists() {
        return assists;
    }

    public boolean isManOfTheMatch() {
        return manOfTheMatch;
    }

    public Integer getYellowCards() {
        return yellowCards;
    }

    public boolean isRedCard() {
        return redCard;
    }

    public boolean isCleanSheet() {
        return cleanSheet;
    }

    public String getPlayerID() {
        return playerID;
    }

    public Integer getWeek() {
        return week;
    }

    public void setGoals(Integer goals) {
        this.goals = goals;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public void setManOfTheMatch(boolean manOfTheMatch) {
        this.manOfTheMatch = manOfTheMatch;
    }

    public void setYellowCards(Integer yellowCards) {
        this.yellowCards = yellowCards;
    }

    public void setRedCard(boolean redCard) {
        this.redCard = redCard;
    }

    public void setCleanSheet(boolean cleanSheet) {
        this.cleanSheet = cleanSheet;
    }

    public void setPlayerID(String playerID) {
        this.playerID = playerID;
    }

    public void setWeek(Integer week) {
        this.week = week;
    }
}
