package uk.co.scottlogic.gradProject.server.routers.dto;

import java.util.ArrayList;
import java.util.Comparator;

public class TeamHistoryDTO {

    private String teamName;
    private ArrayList<SingleHistoryDTO> goalScorers;
    private ArrayList<SingleHistoryDTO> assists;

    public TeamHistoryDTO(String teamName, ArrayList<SingleHistoryDTO> goalScorers, ArrayList<SingleHistoryDTO> assists) {
        this.teamName = teamName;
        this.goalScorers = goalScorers;
        this.assists = assists;
    }

    public TeamHistoryDTO() {
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public ArrayList<SingleHistoryDTO> getGoalScorers() {
        return goalScorers;
    }

    public void addGoalScorer(SingleHistoryDTO goalScorer){
        this.goalScorers.add(goalScorer);
    }

    public void setGoalScorers(ArrayList<SingleHistoryDTO> goalScorers) {
        this.goalScorers = goalScorers;
    }

    public void addAssist(SingleHistoryDTO assist){
        this.assists.add(assist);
    }

    public ArrayList<SingleHistoryDTO> getAssists() {
        return assists;
    }

    public void sortGoalScorers(){
        this.goalScorers.sort(Comparator.comparing(SingleHistoryDTO::getAmount).reversed());
    }

    public void sortAssists(){
        this.assists.sort(Comparator.comparing(SingleHistoryDTO::getAmount).reversed());
    }

    public void setAssists(ArrayList<SingleHistoryDTO> assists) {
        this.assists = assists;
    }
}
