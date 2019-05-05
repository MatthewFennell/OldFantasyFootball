package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;

public class UserInLeagueReturnDTO {

    private String userID;
    private String firstName;
    private String surname;
    private Integer points;
    private Integer position;

    public UserInLeagueReturnDTO(ApplicationUser user, Integer position, Integer points) {
        this.userID = user.getId();
        this.firstName = user.getFirstName();
        this.surname = user.getSurname();
        this.points = user.getTotalPoints();
        this.position = position;
        this.points = points;
    }

    public UserInLeagueReturnDTO() {
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
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

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
