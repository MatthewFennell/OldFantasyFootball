package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;

import java.util.UUID;

public class PlayerReturnDTO {

    private UUID id;
    private String firstName;
    private String surname;
    private double price;
    private Player.Position position;
    private CollegeTeam team;
    private Integer points;
    private Integer goals;
    private Integer assists;


    public PlayerReturnDTO(PlayerPoints playerPoints){
        this.firstName = playerPoints.getPlayer().getFirstName();
        this.surname = playerPoints.getPlayer().getSurname();
        this.points = playerPoints.getPoints();
        this.team = playerPoints.getPlayer().getActiveTeam();
        this.position = playerPoints.getPlayer().getPosition();
        this.id = playerPoints.getPlayer().getId();
        this.goals = playerPoints.getNumberOfGoals();
        this.assists = playerPoints.getNumberOfAssists();
        this.price = playerPoints.getPlayer().getPrice();
    }

    public PlayerReturnDTO(Player player, Integer points){
        this.firstName = player.getFirstName();
        this.surname = player.getSurname();
        this.team = player.getActiveTeam();
        this.id = player.getId();
        this.points = points;
        this.position = player.getPosition();
    }

    public PlayerReturnDTO() {

    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getGoals() {
        return goals;
    }

    public void setGoals(Integer goals) {
        this.goals = goals;
    }

    public Integer getAssists() {
        return assists;
    }

    public void setAssists(Integer assists) {
        this.assists = assists;
    }

    public CollegeTeam getTeam() {
        return team;
    }

    public void setTeam(CollegeTeam team) {
        this.team = team;
    }

    public Player.Position getPosition() {
        return position;
    }

    public void setPosition(Player.Position position) {
        this.position = position;
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

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}
