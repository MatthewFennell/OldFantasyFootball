package uk.co.scottlogic.gradProject.server.routers.dto;

public class InputFilterPlayersDTO {
    private String position;
    private String team;
    private String sort_by;
    private Integer minimum;
    private Integer maximum;
    private String name;

    public InputFilterPlayersDTO(String position, String team, String sort_by, Integer minimum, Integer maximum, String name) {
        this.position = position;
        this.team = team;
        this.sort_by = sort_by;
        this.minimum = minimum;
        this.maximum = maximum;
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getSort_by() {
        return sort_by;
    }

    public void setSort_by(String sort_by) {
        this.sort_by = sort_by;
    }

    public Integer getMinimum() {
        return minimum;
    }

    public void setMinimum(Integer minimum) {
        this.minimum = minimum;
    }

    public Integer getMaximum() {
        return maximum;
    }

    public void setMaximum(Integer maximum) {
        this.maximum = maximum;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
