package uk.co.scottlogic.gradProject.server.routers.dto;

public class MakeCaptainDTO {

    private String username;
    private String teamname;

    public MakeCaptainDTO(String username, String teamname) {
        this.username = username;
        this.teamname = teamname;
    }

    public MakeCaptainDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTeamname() {
        return teamname;
    }

    public void setTeamname(String teamname) {
        this.teamname = teamname;
    }
}
