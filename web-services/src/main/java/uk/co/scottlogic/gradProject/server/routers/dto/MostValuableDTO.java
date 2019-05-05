package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;


public class MostValuableDTO {

    private Player mostValuablePlayer;
    private int mostValuablePlayerScore;

    private CollegeTeam mostValuableCollegeTeam;
    private int mostValuableCollegeTeamScore;

    public MostValuableDTO(Player mostValuablePlayer, int mostValuablePlayerScore, CollegeTeam mostValuableCollegeTeam, int mostValuableCollegeTeamScore) {
        this.mostValuablePlayer = mostValuablePlayer;
        this.mostValuablePlayerScore = mostValuablePlayerScore;
        this.mostValuableCollegeTeam = mostValuableCollegeTeam;
        this.mostValuableCollegeTeamScore = mostValuableCollegeTeamScore;
    }

    public MostValuableDTO() {
    }

    public Player getMostValuablePlayer() {
        return mostValuablePlayer;
    }

    public void setMostValuablePlayer(Player mostValuablePlayer) {
        this.mostValuablePlayer = mostValuablePlayer;
    }

    public int getMostValuablePlayerScore() {
        return mostValuablePlayerScore;
    }

    public void setMostValuablePlayerScore(int mostValuablePlayerScore) {
        this.mostValuablePlayerScore = mostValuablePlayerScore;
    }

    public CollegeTeam getMostValuableCollegeTeam() {
        return mostValuableCollegeTeam;
    }

    public void setMostValuableCollegeTeam(CollegeTeam mostValuableCollegeTeam) {
        this.mostValuableCollegeTeam = mostValuableCollegeTeam;
    }

    public int getMostValuableCollegeTeamScore() {
        return mostValuableCollegeTeamScore;
    }

    public void setMostValuableCollegeTeamScore(int mostValuableCollegeTeamScore) {
        this.mostValuableCollegeTeamScore = mostValuableCollegeTeamScore;
    }
}
