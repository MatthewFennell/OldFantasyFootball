package uk.co.scottlogic.gradProject.server.routers.dto;

public class MakeLeagueDTO {

    private String leagueName;
    private Integer startWeek;

    public MakeLeagueDTO(String leagueName, Integer startWeek) {
        this.leagueName = leagueName;
        this.startWeek = startWeek;
    }

    public String getLeagueName() {
        return leagueName;
    }

    public void setLeagueName(String leagueName) {
        this.leagueName = leagueName;
    }


    public Integer getStartWeek() {
        return startWeek;
    }

    public void setStartWeek(Integer startWeek) {
        this.startWeek = startWeek;
    }
}
