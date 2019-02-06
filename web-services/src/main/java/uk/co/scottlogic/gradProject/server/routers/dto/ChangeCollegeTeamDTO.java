package uk.co.scottlogic.gradProject.server.routers.dto;

public class ChangeCollegeTeamDTO {

    private String playerID;
    private String collegeName;

    public ChangeCollegeTeamDTO(String playerID, String collegeName) {
        this.playerID = playerID;
        this.collegeName = collegeName;
    }

    public ChangeCollegeTeamDTO() {
    }

    public String getPlayerID() {
        return playerID;
    }

    public void setPlayerID(String playerID) {
        this.playerID = playerID;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }
}
