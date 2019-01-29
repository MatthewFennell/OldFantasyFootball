package uk.co.pampoomio.fennell.server.routers.dto;

import uk.co.pampoomio.fennell.server.repos.documents.ApplicationUser;

public class UserInLeagueReturnDTO {

    private String firstName;
    private String surname;
    private Integer points;
    private Integer position;

    public UserInLeagueReturnDTO(ApplicationUser user, Integer position) {
        this.firstName = user.getFirstName();
        this.surname = user.getSurname();
        this.points = user.getTotalPoints();
        this.position = position;
    }

    public UserInLeagueReturnDTO() {
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
