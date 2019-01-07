package uk.co.scottlogic.gradProject.server.routers.dto;

public class AddPlayerToWeeklyTeamDTO {

    private String id;


    public AddPlayerToWeeklyTeamDTO(String id) {
        this.id = id;
    }

    public AddPlayerToWeeklyTeamDTO() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
