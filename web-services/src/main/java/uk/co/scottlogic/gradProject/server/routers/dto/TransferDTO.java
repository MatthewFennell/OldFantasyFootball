package uk.co.scottlogic.gradProject.server.routers.dto;

import java.util.List;

public class TransferDTO {

    private List<UpdateTeamPlayerDTO> playersBeingAdded;
    private List<UpdateTeamPlayerDTO> playersBeingRemoved;

    public TransferDTO(List<UpdateTeamPlayerDTO> playersBeingAdded, List<UpdateTeamPlayerDTO> playersBeingRemoved) {
        this.playersBeingAdded = playersBeingAdded;
        this.playersBeingRemoved = playersBeingRemoved;
    }

    public TransferDTO() {
    }

    public List<UpdateTeamPlayerDTO> getPlayersBeingAdded() {
        return playersBeingAdded;
    }

    public void setPlayersBeingAdded(List<UpdateTeamPlayerDTO> playersBeingAdded) {
        this.playersBeingAdded = playersBeingAdded;
    }

    public List<UpdateTeamPlayerDTO> getPlayersBeingRemoved() {
        return playersBeingRemoved;
    }

    public void setPlayersBeingRemoved(List<UpdateTeamPlayerDTO> playersBeingRemoved) {
        this.playersBeingRemoved = playersBeingRemoved;
    }
}
