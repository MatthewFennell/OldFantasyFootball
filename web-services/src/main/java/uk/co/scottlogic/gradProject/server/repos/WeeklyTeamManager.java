package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class WeeklyTeamManager {

    private PlayerRepo playerRepo;

    private CollegeTeamRepo teamRepo;

    private ApplicationUserRepo applicationUserRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    private PlayerPointsRepo playerPointsRepo;

    @Autowired
    public WeeklyTeamManager(ApplicationUserRepo applicationUserRepo, PlayerRepo playeRepo, CollegeTeamRepo teamRepo, WeeklyTeamRepo weeklyTeamRepo, PlayerPointsRepo playerPointsRepo) {
        this.applicationUserRepo = applicationUserRepo;
        this.playerRepo = playeRepo;
        this.teamRepo = teamRepo;
        this.playerPointsRepo = playerPointsRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;

//        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");
//        if (user.isPresent()) {
//            List<UsersWeeklyTeam> weeklyTeam = weeklyTeamRepo.findByUser(user.get());
//            if (!weeklyTeam.isEmpty()){
//                UsersWeeklyTeam team = weeklyTeam.get(0);
//                System.out.println("Weekly team size = " + team.getPlayers().size());
//                System.out.println("Value of weekly team = " + findPointsOfWeeklyTeam(team));
//            }
//        }

//        addPlayersToWeeklyTeam();

    }


    // Adds to the first weekly team it finds
    private void addPlayerToWeeklyTeam(ApplicationUser user, Player player) {
        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()) {
            UsersWeeklyTeam team = teams.get(0);
            team.getPlayers().add(player);
            weeklyTeamRepo.save(team);
            System.out.println("Added player " + player.getFirstName() + " to user " + user.getFirstName());
        }
    }

    private void removePlayerFromWeeklyTeam(ApplicationUser user, Player player) {
        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()) {
            UsersWeeklyTeam team = teams.get(0);
            team.getPlayers().remove(player);
            weeklyTeamRepo.save(team);
            System.out.println("Removed player " + player.getFirstName() + " from user " + user.getFirstName());
        }
    }

    public UsersWeeklyTeam findWeeklyTeamWithMostPoints(Integer week){
        return weeklyTeamRepo.findUserWithMostPoints(week);
    }

    private double getValueOfActiveSquad(ApplicationUser user) {
        double totalValue = 0.0;
        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()) {
            UsersWeeklyTeam activeTeam = teams.get(0);
            List<Player> players = activeTeam.getPlayers();
            for (Player p : players) {
                totalValue += p.getPrice();
            }
        }
        return totalValue;
    }

    private ArrayList<Integer> getNumberOfEachPositionInActiveTeam(ApplicationUser user) {
        ArrayList<Integer> quantityPerPosition = new ArrayList<>();
        quantityPerPosition.add(0);     // GOALKEEPERS
        quantityPerPosition.add(0);     // DEFENDERS
        quantityPerPosition.add(0);     // MIDFIELDERS
        quantityPerPosition.add(0);     // ATTACKERS

        List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
        if (!teams.isEmpty()) {
            UsersWeeklyTeam activeTeam = teams.get(0);
            List<Player> players = activeTeam.getPlayers();
            for (Player p : players) {
                if (p.getPosition() == Player.Position.GOALKEEPER) {
                    quantityPerPosition.set(0, quantityPerPosition.get(0) + 1);
                } else if (p.getPosition() == Player.Position.DEFENDER) {
                    quantityPerPosition.set(1, quantityPerPosition.get(1) + 1);
                } else if (p.getPosition() == Player.Position.MIDFIELDER) {
                    quantityPerPosition.set(2, quantityPerPosition.get(2) + 1);
                } else if (p.getPosition() == Player.Position.ATTACKER) {
                    quantityPerPosition.set(3, quantityPerPosition.get(3) + 1);
                }
            }
        }
        return quantityPerPosition;
    }

    public Integer findPointsOfWeeklyTeam(UsersWeeklyTeam team){
        return team.getPoints();
    }

    public double findAveragePointsOfAllTeamsInWeek(Integer week){
        return weeklyTeamRepo.findAveragePointsInWeek(week);
    }

    public void addPlayersToWeeklyTeam(){
        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");
        if (user.isPresent()){
            ApplicationUser u = user.get();
            Optional<Player> player = playerRepo.findByFirstName("Ollie");            ;
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Eloka");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Herbie");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Eduardo");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));



            player = playerRepo.findByFirstName("John");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Phil");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Chris");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("David");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));




            player = playerRepo.findByFirstName("Bernado");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Kevin");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Paul");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Paco");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));



            player = playerRepo.findByFirstName("Marcus");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Romelu");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Dom");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Ed");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));



            player = playerRepo.findByFirstName("Joe");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));

            player = playerRepo.findByFirstName("Stevie");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1));
        }
    }
}
