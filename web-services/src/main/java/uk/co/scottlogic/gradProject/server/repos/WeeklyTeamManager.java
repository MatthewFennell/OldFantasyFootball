package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class WeeklyTeamManager {

    private PlayerRepo playerRepo;

    private CollegeTeamRepo teamRepo;

    private ApplicationUserRepo applicationUserRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    @Autowired
    public WeeklyTeamManager(ApplicationUserRepo applicationUserRepo, PlayerRepo playeRepo, CollegeTeamRepo teamRepo, WeeklyTeamRepo weeklyTeamRepo) {
        this.applicationUserRepo = applicationUserRepo;
        this.playerRepo = playeRepo;
        this.teamRepo = teamRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;

//        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");
//        if (user.isPresent()){
//            ApplicationUser u = user.get();
//            Optional<Player> player = playeRepo.findByFirstName("Paco");
//            player.ifPresent(player1 -> addPlayerToSquad(u, player1));
//        }
    }

    // Adds to the first weekly team it finds
    private void addPlayerToSquad(ApplicationUser user, Player player){
        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()){
            UsersWeeklyTeam team = teams.get(0);
            team.getPlayers().add(player);
            weeklyTeamRepo.save(team);
        }
    }

    private double getValueOfSquad(ApplicationUser user) {
        return 0;
    }
}
