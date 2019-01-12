package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.Player;

public class FilteredPlayerDTO {

    private String firstName;
    private String surname;
    private Player.Position position;
    private String team;
    private Integer totalScore;
    private Integer totalGoals;
    private Integer totalAssists;

    public FilteredPlayerDTO(Player player){
        this.firstName = player.getFirstName();
        this.surname = player.getSurname();
        this.position = player.getPosition();
        this.team = player.getActiveTeam().getName();
        this.totalScore = player.getTotalScore();
        this.totalGoals = player.getTotalGoals();
        this.totalAssists = player.getTotalAssists();
    }

    public FilteredPlayerDTO(){

    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Player.Position getPosition() {
        return position;
    }

    public void setPosition(Player.Position position) {
        this.position = position;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public Integer getTotalGoals() {
        return totalGoals;
    }

    public void setTotalGoals(Integer totalGoals) {
        this.totalGoals = totalGoals;
    }

    public Integer getTotalAssists() {
        return totalAssists;
    }

    public void setTotalAssists(Integer totalAssists) {
        this.totalAssists = totalAssists;
    }
}
