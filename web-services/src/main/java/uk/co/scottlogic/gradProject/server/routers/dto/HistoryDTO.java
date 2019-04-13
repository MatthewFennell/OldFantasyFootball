package uk.co.scottlogic.gradProject.server.routers.dto;

import java.util.ArrayList;

public class HistoryDTO {

    private ArrayList<TeamHistoryDTO> allHistory;

    public HistoryDTO(ArrayList<TeamHistoryDTO> allHistory) {
        this.allHistory = allHistory;
    }

    public HistoryDTO() {
    }

    public void addTeamHistory(TeamHistoryDTO dto){
        this.allHistory.add(dto);
    }

    public ArrayList<TeamHistoryDTO> getAllHistory() {
        return allHistory;
    }

    public void setAllHistory(ArrayList<TeamHistoryDTO> allHistory) {
        this.allHistory = allHistory;
    }
}
