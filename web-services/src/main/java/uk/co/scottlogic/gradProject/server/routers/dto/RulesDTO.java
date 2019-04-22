package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.misc.Constants;

public class RulesDTO {

    public Integer maxTeamSize;
    public Integer maxPlayersPerCollegeTeam;
    public Integer maxGoalkeepers;
    public Integer maxDefenders;
    public Integer maxMidfielders;
    public Integer maxAttackers;
    public Integer pointsPerCleanSheet;
    public Integer pointsPerDefenderGoal;
    public Integer pointsPerMidfielderGoal;
    public Integer pointsPerAttackerGoal;
    public Integer pointsPerAssists;
    public Integer pointsPerRedCard;
    public Integer pointsPerYellowCard;
    public Integer manOfTheMatchBonus;
    public Integer initialBudget;

    public RulesDTO() {
        this.maxTeamSize = Constants.MAX_TEAM_SIZE;
        this.maxPlayersPerCollegeTeam = Constants.MAX_PLAYERS_PER_COLLEGE_TEAM;
        this.maxGoalkeepers = Constants.MAX_GOALKEEPERS;
        this.maxDefenders = Constants.MAX_DEFENDERS;
        this.maxMidfielders = Constants.MAX_MIDFIELDERS;
        this.maxAttackers = Constants.MAX_ATTACKERS;
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
}
