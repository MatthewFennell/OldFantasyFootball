package uk.co.scottlogic.gradProject.server.routers.dto;

public class GetAveragePointsDTO {

    private Integer week;

    public GetAveragePointsDTO(Integer week) {
        this.week = week;
    }

    public GetAveragePointsDTO() {

    }

    public Integer getWeek() {
        return week;
    }

    public void setWeek(Integer week) {
        this.week = week;
    }
}
