package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.PlayerManager;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;

public class InputFilterPlayersDTO {
    private Player.Position position;
    private String team;
    private PlayerManager.SORT_BY sort_by;
    private Integer minimum;
    private Integer maximum;
    private String name;

    public InputFilterPlayersDTO(Player.Position position, String team, PlayerManager.SORT_BY sort_by, Integer minimum, Integer maximum, String name) {
        this.position = position;
        this.team = team;
        this.sort_by = sort_by;
        this.minimum = minimum;
        this.maximum = maximum;
        this.name = name;
    }

    public Player.Position getPosition() {
        return position;
    }

    public void setPosition(Player.Position position) {
        this.position = position;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public PlayerManager.SORT_BY getSort_by() {
        return sort_by;
    }

    public void setSort_by(PlayerManager.SORT_BY sort_by) {
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
