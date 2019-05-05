package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.League;

public class LeagueReturnDTO {

    private String leagueName;
    private Integer position;
    private String id;

    public LeagueReturnDTO(String leagueName, Integer position, String id) {
        this.leagueName = leagueName;
        this.position = position;
        this.id = id;
    }

    public LeagueReturnDTO(League league){
        this.leagueName = league.getLeagueName();
        this.id = league.getId().toString();
        this.position = -1;
    }

    public LeagueReturnDTO() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
