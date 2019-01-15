package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;

public class PlayerDTO {
    private String id;
    private String firstName;
    private String surname;
    private String position;
    private Integer points;
    private double price;
    private Integer weeklyPoints;
    private Integer totalAssists;
    private Integer totalGoals;
    private String collegeTeam;

    public PlayerDTO(Player p){
        this.id = p.getId().toString();
        this.firstName = p.getFirstName();
        this.surname = p.getSurname();
        this.position = p.getPosition().toString();
        this.points = p.getTotalScore();
        this.price = p.getPrice();
        this.collegeTeam = p.getActiveTeam().getName();
        this.totalGoals = p.getTotalGoals();
        this.totalAssists = p.getTotalAssists();
    }

    public PlayerDTO(PlayerPoints playerPoints) {
        this.firstName = playerPoints.getPlayer().getFirstName();
        this.surname = playerPoints.getPlayer().getSurname();
        this.points = playerPoints.getPoints();
        this.collegeTeam = playerPoints.getPlayer().getActiveTeam().getName();
        this.position = playerPoints.getPlayer().getPosition().toString();
        this.id = playerPoints.getPlayer().getId().toString();
        this.totalGoals = playerPoints.getNumberOfGoals();
        this.totalAssists = playerPoints.getNumberOfAssists();
        this.price = playerPoints.getPlayer().getPrice();
        this.weeklyPoints = playerPoints.calculateScore();
    }

    public PlayerDTO(Player p, Integer points){
        this.id = p.getId().toString();
        this.firstName = p.getFirstName();
        this.surname = p.getSurname();
        this.position = p.getPosition().toString();
        this.points = p.getTotalScore();
        this.price = p.getPrice();
        this.collegeTeam = p.getActiveTeam().getName();
        this.totalGoals = p.getTotalGoals();
        this.totalAssists = p.getTotalAssists();
        this.weeklyPoints = points;
    }

    public PlayerDTO() {

    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getWeeklyPoints() {
        return weeklyPoints;
    }

    public void setWeeklyPoints(Integer weeklyPoints) {
        this.weeklyPoints = weeklyPoints;
    }

    public Integer getTotalAssists() {
        return totalAssists;
    }

    public void setTotalAssists(Integer totalAssists) {
        this.totalAssists = totalAssists;
    }

    public Integer getTotalGoals() {
        return totalGoals;
    }

    public void setTotalGoals(Integer totalGoals) {
        this.totalGoals = totalGoals;
    }

    public String getCollegeTeam() {
        return collegeTeam;
    }

    public void setCollegeTeam(String collegeTeam) {
        this.collegeTeam = collegeTeam;
    }
}
