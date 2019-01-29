package uk.co.pampoomio.fennell.server.routers.dto;

public class MakeLeagueDTO {

    private String leagueName;
    private String codeToJoin;
    private Integer startWeek;

    public MakeLeagueDTO(String leagueName, String codeToJoin, Integer startWeek) {
        this.leagueName = leagueName;
        this.codeToJoin = codeToJoin;
        this.startWeek = startWeek;
    }

    public String getLeagueName() {
        return leagueName;
    }

    public void setLeagueName(String leagueName) {
        this.leagueName = leagueName;
    }

    public String getCodeToJoin() {
        return codeToJoin;
    }

    public void setCodeToJoin(String codeToJoin) {
        this.codeToJoin = codeToJoin;
    }

    public Integer getStartWeek() {
        return startWeek;
    }

    public void setStartWeek(Integer startWeek) {
        this.startWeek = startWeek;
    }
}
