package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;

@Service
public class CollegeTeamManager {

    private CollegeTeamRepo teamRepo;

    @Autowired
    public CollegeTeamManager(CollegeTeamRepo teamRepo) {
        this.teamRepo = teamRepo;
//        makeTeam("A", 10, 0, 1, 50, 3);
//        makeTeam("B", 8, 2,1, 45,5);
//        makeTeam("C", 6, 5, 4, 35, 15);
//        makeTeam("D", 4, 4, 3, 30, 20);
//        makeTeam("E", 2, 7, 2, 25, 25);
    }


    public void makeTeam(String name, Integer wins, Integer draws, Integer losses, Integer goalsFor, Integer goalsAgainst){
        CollegeTeam team = new CollegeTeam(name, wins, draws, losses, goalsFor, goalsAgainst);
        teamRepo.save(team);
    }
}