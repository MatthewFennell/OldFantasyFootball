package uk.co.scottlogic.gradProject.server.routers.dto;

import java.util.List;

public class TransferDTO {

    private List<PlayerDTO> playersBeingAdded;
    private List<PlayerDTO> playersBeingRemoved;

    public TransferDTO(List<PlayerDTO> playersBeingAdded, List<PlayerDTO> playersBeingRemoved) {
        this.playersBeingAdded = playersBeingAdded;
        this.playersBeingRemoved = playersBeingRemoved;
    }

    public TransferDTO() {
    }

    public List<PlayerDTO> getPlayersBeingAdded() {
        return playersBeingAdded;
    }

    public void setPlayersBeingAdded(List<PlayerDTO> playersBeingAdded) {
        this.playersBeingAdded = playersBeingAdded;
    }

    public List<PlayerDTO> getPlayersBeingRemoved() {
        return playersBeingRemoved;
    }

    public void setPlayersBeingRemoved(List<PlayerDTO> playersBeingRemoved) {
        this.playersBeingRemoved = playersBeingRemoved;
    }
}
