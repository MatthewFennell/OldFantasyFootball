package uk.co.scottlogic.gradProject.server.routers.dto;

import java.util.List;

public class AddMultiplePointsDTO {

    private List<PlayerPointsDTO> pointsToAdd;

    public AddMultiplePointsDTO(List<PlayerPointsDTO> pointsToAdd) {
        this.pointsToAdd = pointsToAdd;
    }

    public AddMultiplePointsDTO() {

    }

    public List<PlayerPointsDTO> getPointsToAdd() {
        return pointsToAdd;
    }

    public void setPointsToAdd(List<PlayerPointsDTO> pointsToAdd) {
        this.pointsToAdd = pointsToAdd;
    }

}
