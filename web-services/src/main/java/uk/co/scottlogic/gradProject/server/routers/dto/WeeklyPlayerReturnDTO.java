package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.Player;

import java.util.UUID;

public class WeeklyPlayerReturnDTO {

    private UUID id;
    private String firstName;
    private String surname;
    private Player.Position position;
    private Integer points;
    private double price;

    public WeeklyPlayerReturnDTO(Player player, Integer points) {
        this.id = player.getId();
        this.firstName = player.getFirstName();
        this.surname = player.getSurname();
        this.position = player.getPosition();
        this.points = points;
        this.price = player.getPrice();
    }

    public WeeklyPlayerReturnDTO() {

    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
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

    public Player.Position getPosition() {
        return position;
    }

    public void setPosition(Player.Position position) {
        this.position = position;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }
}
