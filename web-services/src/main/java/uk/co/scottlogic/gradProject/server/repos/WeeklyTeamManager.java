package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.lang.reflect.Array;
import java.util.*;

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

        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");
        if (user.isPresent()){
            ApplicationUser u = user.get();
            Optional<Player> player = playeRepo.findByFirstName("Phil");
            player.ifPresent(player1 -> removePlayerFromSquad(u, player1));
            ArrayList<Integer> positions = getNumberOfEachPositionInActiveTeam(u);
            System.out.println("squad = " + positions);
        }

    }

    // Adds to the first weekly team it finds
    private void addPlayerToSquad(ApplicationUser user, Player player){
        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()){
            UsersWeeklyTeam team = teams.get(0);
            team.getPlayers().add(player);
            weeklyTeamRepo.save(team);
            System.out.println("Added player " + player.getFirstName() + " to user " + user.getFirstName());
        }
    }

    private void removePlayerFromSquad(ApplicationUser user, Player player){
        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()){
            UsersWeeklyTeam team = teams.get(0);
            team.getPlayers().remove(player);
            weeklyTeamRepo.save(team);
            System.out.println("Removed player " + player.getFirstName() + " from user " + user.getFirstName());
        }
    }

    private double getValueOfActiveSquad(ApplicationUser user) {
        double totalValue = 0.0;
        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()){
            UsersWeeklyTeam activeTeam = teams.get(0);
            List<Player> players = activeTeam.getPlayers();
            for (Player p : players){
                totalValue += p.getPrice();
            }
        }
        return totalValue;
    }

    private ArrayList<Integer> getNumberOfEachPositionInActiveTeam(ApplicationUser user){
        ArrayList<Integer> quantityPerPosition = new ArrayList<>();
        quantityPerPosition.add(0);     // GOALKEEPERS
        quantityPerPosition.add(0);     // DEFENDERS
        quantityPerPosition.add(0);     // MIDFIELDERS
        quantityPerPosition.add(0);     // ATTACKERS

        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()) {
            UsersWeeklyTeam activeTeam = teams.get(0);
            List<Player> players = activeTeam.getPlayers();
            for (Player p : players){
                if (p.getPosition() == Player.Position.GOALKEEPER){
                    quantityPerPosition.set(0, quantityPerPosition.get(0)+1);
                }
                else if (p.getPosition() == Player.Position.DEFENDER){
                    quantityPerPosition.set(1, quantityPerPosition.get(1)+1);
                }
                else if (p.getPosition() == Player.Position.MIDFIELDER){
                    quantityPerPosition.set(2, quantityPerPosition.get(2)+1);
                }
                else if (p.getPosition() == Player.Position.ATTACKER){
                    quantityPerPosition.set(3, quantityPerPosition.get(3)+1);
                }
            }
        }
        return quantityPerPosition;
    }
}