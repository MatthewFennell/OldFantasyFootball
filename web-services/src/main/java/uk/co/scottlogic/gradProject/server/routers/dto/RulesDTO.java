package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.misc.Constants;

public class RulesDTO {

    private Integer maxTeamSize;
    private Integer maxPlayersPerCollegeTeam;
    private Integer pointsPerCleanSheet;
    private Integer pointsPerDefenderGoal;
    private Integer pointsPerMidfielderGoal;
    private Integer pointsPerAttackerGoal;
    private Integer pointsPerAssists;
    private Integer pointsPerRedCard;
    private Integer pointsPerYellowCard;
    private Integer manOfTheMatchBonus;
    private Integer initialBudget;

    public RulesDTO() {
        this.maxTeamSize = Constants.MAX_TEAM_SIZE;
        this.maxPlayersPerCollegeTeam = Constants.MAX_PLAYERS_PER_COLLEGE_TEAM;
        this.pointsPerCleanSheet = Constants.POINTS_PER_CLEAN_SHEET;
        this.pointsPerDefenderGoal = Constants.POINTS_PER_DEFENDER_GOAL;
        this.pointsPerMidfielderGoal = Constants.POINTS_PER_MIDFIELDER_GOAL;
        this.pointsPerAttackerGoal = Constants.POINTS_PER_ATTACKER_GOAL;
        this.pointsPerAssists = Constants.POINTS_PER_ASSIST;
        this.pointsPerRedCard = Constants.POINTS_PER_RED_CARD;
        this.pointsPerYellowCard = Constants.POINTS_PER_YELLOW_CARD;
        this.manOfTheMatchBonus = Constants.MAN_OF_THE_MATCH_BONUS;
        this.initialBudget = Constants.INITIAL_BUDGET;
    }

    public Integer getMaxTeamSize() {
        return maxTeamSize;
    }

    public void setMaxTeamSize(Integer maxTeamSize) {
        this.maxTeamSize = maxTeamSize;
    }

    public Integer getMaxPlayersPerCollegeTeam() {
        return maxPlayersPerCollegeTeam;
    }

    public void setMaxPlayersPerCollegeTeam(Integer maxPlayersPerCollegeTeam) {
        this.maxPlayersPerCollegeTeam = maxPlayersPerCollegeTeam;
    }

    public Integer getPointsPerCleanSheet() {
        return pointsPerCleanSheet;
    }

    public void setPointsPerCleanSheet(Integer pointsPerCleanSheet) {
        this.pointsPerCleanSheet = pointsPerCleanSheet;
    }

    public Integer getPointsPerDefenderGoal() {
        return pointsPerDefenderGoal;
    }

    public void setPointsPerDefenderGoal(Integer pointsPerDefenderGoal) {
        this.pointsPerDefenderGoal = pointsPerDefenderGoal;
    }

    public Integer getPointsPerMidfielderGoal() {
        return pointsPerMidfielderGoal;
    }

    public void setPointsPerMidfielderGoal(Integer pointsPerMidfielderGoal) {
        this.pointsPerMidfielderGoal = pointsPerMidfielderGoal;
    }

    public Integer getPointsPerAttackerGoal() {
        return pointsPerAttackerGoal;
    }

    public void setPointsPerAttackerGoal(Integer pointsPerAttackerGoal) {
        this.pointsPerAttackerGoal = pointsPerAttackerGoal;
    }

    public Integer getPointsPerAssists() {
        return pointsPerAssists;
    }

    public void setPointsPerAssists(Integer pointsPerAssists) {
        this.pointsPerAssists = pointsPerAssists;
    }

    public Integer getPointsPerRedCard() {
        return pointsPerRedCard;
    }

    public void setPointsPerRedCard(Integer pointsPerRedCard) {
        this.pointsPerRedCard = pointsPerRedCard;
    }

    public Integer getPointsPerYellowCard() {
        return pointsPerYellowCard;
    }

    public void setPointsPerYellowCard(Integer pointsPerYellowCard) {
        this.pointsPerYellowCard = pointsPerYellowCard;
    }

    public Integer getManOfTheMatchBonus() {
        return manOfTheMatchBonus;
    }

    public void setManOfTheMatchBonus(Integer manOfTheMatchBonus) {
        this.manOfTheMatchBonus = manOfTheMatchBonus;
    }

    public Integer getInitialBudget() {
        return initialBudget;
    }

    public void setInitialBudget(Integer initialBudget) {
        this.initialBudget = initialBudget;
    }
}
