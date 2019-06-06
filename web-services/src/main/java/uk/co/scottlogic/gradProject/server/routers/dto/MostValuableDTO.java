package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;


public class MostValuableDTO {

    private Player mostValuablePlayer;
    private int mostValuablePlayerScore;


    public MostValuableDTO(Player mostValuablePlayer, int mostValuablePlayerScore) {
        this.mostValuablePlayer = mostValuablePlayer;
        this.mostValuablePlayerScore = mostValuablePlayerScore;
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

}
