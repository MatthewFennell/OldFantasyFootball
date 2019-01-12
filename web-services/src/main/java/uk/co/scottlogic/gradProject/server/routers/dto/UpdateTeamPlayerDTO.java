package uk.co.scottlogic.gradProject.server.routers.dto;

public class UpdateTeamPlayerDTO {
    private String firstName;
    private String id;
    private Integer points;
    private String position;
    private double price;
    private String surname;

    public UpdateTeamPlayerDTO(String firstName, String id, Integer points, String position, double price, String surname) {
        this.firstName = firstName;
        this.id = id;
        this.points = points;
        this.position = position;
        this.price = price;
        this.surname = surname;
    }

    public UpdateTeamPlayerDTO() {

    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
