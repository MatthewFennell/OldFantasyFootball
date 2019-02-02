package uk.co.scottlogic.gradProject.server.routers.dto;

public class MakePlayerDTO {

    private String firstName;
    private String surname;
    private Integer position;
    private String collegeTeam;
    private double price;

    public MakePlayerDTO(String firstName, String surname, Integer position, String collegeTeam, double price) {
        this.firstName = firstName;
        this.surname = surname;
        this.position = position;
        this.collegeTeam = collegeTeam;
        this.price = price;
    }

    public MakePlayerDTO(){

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

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public String getCollegeTeam() {
        return collegeTeam;
    }

    public void setCollegeTeam(String collegeTeam) {
        this.collegeTeam = collegeTeam;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
