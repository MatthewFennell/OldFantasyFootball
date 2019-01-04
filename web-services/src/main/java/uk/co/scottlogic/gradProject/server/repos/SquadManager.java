package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

@Service
public class SquadManager {

    private PlayerRepo playerRepo;

    private TeamRepo teamRepo;

    private ApplicationUserRepo applicationUserRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    @Autowired
    public SquadManager(ApplicationUserRepo applicationUserRepo, PlayerRepo playeRepo, TeamRepo teamRepo, WeeklyTeamRepo weeklyTeamRepo) {
        this.applicationUserRepo = applicationUserRepo;
        this.playerRepo = playeRepo;
        this.teamRepo = teamRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;

//        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");
//        if (user.isPresent()){
//            ApplicationUser u = user.get();
//            ArrayList<Player> players = new ArrayList<>();
//
//            Optional<Player> player = playeRepo.findByFirstName("Paco");
//            Optional<Player> player1 = playeRepo.findByFirstName("John");
//            if (player.isPresent() && player1.isPresent()){
//                players.add(player.get());
//                players.add(player1.get());
//                UsersWeeklyTeam weeklyTeam = new UsersWeeklyTeam(u, new Date(), players);
//                weeklyTeamRepo.save(weeklyTeam);
//                System.out.println("saved");
//                System.out.println("saved");
//                System.out.println("saved");
//                System.out.println("saved");
//            }
//            else{
//                System.out.println("hey");
//            }
//        }


    }

    public void addPlayerToSquad(ApplicationUser user, Player player){
        System.out.println("Username = " + user.getFirstName());

    }
}
