package uk.co.pampoomio.fennell.server.routers.dto;

import uk.co.pampoomio.fennell.server.repos.documents.UsersWeeklyTeam;

public class TopWeeklyUserReturnDTO {

    private String firstName;
    private String surname;
    private Integer points;
    private String id;
    private String teamName;

    public TopWeeklyUserReturnDTO(UsersWeeklyTeam team) {
        this.firstName = team.getUser().getFirstName();
        this.surname = team.getUser().getSurname();
        this.points = team.getPoints();
        this.id = team.getUser().getId();
        this.teamName = team.getUser().getTeamName();
    }

    public TopWeeklyUserReturnDTO(){

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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }
}
