package uk.co.scottlogic.gradProject.server.routers.dto;

public class GetUsersPointsInWeekDTO {

    private String id;

    private Integer week;

    public GetUsersPointsInWeekDTO(String id, Integer week) {
        this.id = id;
        this.week = week;
    }

    public GetUsersPointsInWeekDTO() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getWeek() {
        return week;
    }

    public void setWeek(Integer week) {
        this.week = week;
    }
}
