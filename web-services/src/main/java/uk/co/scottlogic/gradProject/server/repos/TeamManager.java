package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.Team;

@Service
public class TeamManager {

    private TeamRepo teamRepo;

    @Autowired
    public TeamManager(TeamRepo teamRepo) {
        this.teamRepo = teamRepo;
        System.out.println("hello");
    }


    public void makeTeam(String name, Integer wins, Integer draws, Integer losses, Integer goalsFor, Integer goalsAgainst){
        Team team = new Team(name, wins, draws, losses, goalsFor, goalsAgainst);
        teamRepo.save(team);
    }
}
