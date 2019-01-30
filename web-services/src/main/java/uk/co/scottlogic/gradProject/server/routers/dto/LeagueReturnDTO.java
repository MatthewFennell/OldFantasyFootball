package uk.co.scottlogic.gradProject.server.routers.dto;

public class LeagueReturnDTO {

    private String leagueName;
    private Integer position;

    public LeagueReturnDTO(String leagueName, Integer position) {
        this.leagueName = leagueName;
        this.position = position;
    }

    public LeagueReturnDTO() {

    }

    public String getLeagueName() {
        return leagueName;
    }

    public void setLeagueName(String leagueName) {
        this.leagueName = leagueName;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
