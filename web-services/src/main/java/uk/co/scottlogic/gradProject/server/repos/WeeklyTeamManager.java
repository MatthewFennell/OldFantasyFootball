package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.WeeklyPlayerReturnDTO;

import java.util.*;

@Service
public class WeeklyTeamManager {

    private PlayerRepo playerRepo;

    private CollegeTeamRepo teamRepo;

    private ApplicationUserRepo applicationUserRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    private PlayerPointsRepo playerPointsRepo;

    private PlayerManager playerManager;

    @Autowired
    public WeeklyTeamManager(ApplicationUserRepo applicationUserRepo, PlayerRepo playeRepo,
                             CollegeTeamRepo teamRepo, WeeklyTeamRepo weeklyTeamRepo,
                             PlayerPointsRepo playerPointsRepo, PlayerManager playerManager) {
        this.applicationUserRepo = applicationUserRepo;
        this.playerRepo = playeRepo;
        this.teamRepo = teamRepo;
        this.playerPointsRepo = playerPointsRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.playerManager = playerManager;

//        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");
//
//        if (user.isPresent()){
//            UsersWeeklyTeam team = new UsersWeeklyTeam(user.get(), new Date(), new ArrayList<>(), 0);
//            weeklyTeamRepo.save(team);
//        }

//        addPlayersToWeeklyTeam();

    }

    // Adds to the first weekly team it finds
    public void addPlayerToWeeklyTeam(ApplicationUser user, String id) {
        Optional<Player> player = playerRepo.findById(UUID.fromString(id));

        if (player.isPresent()) {
            Player p = player.get();
            List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
            if (!teams.isEmpty()) {
                UsersWeeklyTeam team = teams.get(0);
                System.out.println("week = " + team.getWeek());
                team.getPlayers().add(p);
                weeklyTeamRepo.save(team);
                System.out.println("Added player " + p.getFirstName() + " to user " + user.getFirstName());
            }
        } else {
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    public Integer getTotalNumberOfWeeks(){
        return weeklyTeamRepo.findNumberOfWeeks();
    }

    public void removePlayerFromWeeklyTeam(ApplicationUser user, String id) {

        Optional<Player> player = playerRepo.findById(UUID.fromString(id));

        if (player.isPresent()) {
            Player p = player.get();
            List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
            if (!teams.isEmpty()) {
                UsersWeeklyTeam team = teams.get(0);
                team.getPlayers().remove(p);
                weeklyTeamRepo.save(team);
                System.out.println("Removed player " + p.getFirstName() + " from user " + user.getFirstName());
            }
        } else {
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    public List<UsersWeeklyTeam> findWeeklyTeamWithMostPoints(Integer week) {
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

    public Integer findPointsOfWeeklyTeam(UsersWeeklyTeam team) {
        return team.getPoints();
    }

    public double findAveragePointsOfAllTeamsInWeek(Integer week) {
        return weeklyTeamRepo.findAveragePointsInWeek(week);
    }

    // Returns the list sorted by Goalkeeper - Defenders - Midfielder - Attacker
    public List<WeeklyPlayerReturnDTO> findAllPlayersInWeeklyTeam(ApplicationUser user, Integer week){
        Optional<UsersWeeklyTeam> team = weeklyTeamRepo.findByUserByWeek(user, week);
        List<WeeklyPlayerReturnDTO> playersToReturn = new ArrayList<>();

        if (team.isPresent()){
            System.out.println("team exists");
            List<Player> players = team.get().getPlayers();
            System.out.println("number of players = " + players.size());
            for (Player p : players){
                System.out.println("adding a player");
                playersToReturn.add(new WeeklyPlayerReturnDTO(p, playerManager.findPointsForPlayerInWeek(p, week)));
            }
        }
        else{
            throw new IllegalArgumentException("No weekly team for that user and date");
        }
        System.out.println("length = " + playersToReturn.size());
        playersToReturn.sort(Comparator.comparing(WeeklyPlayerReturnDTO::getPosition));
        return playersToReturn;
    }

    public void addPlayersToWeeklyTeam() {
        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");
        if (user.isPresent()) {
            ApplicationUser u = user.get();
            Optional<Player> player = playerRepo.findByFirstName("Ollie");

            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Eloka");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Herbie");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Eduardo");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));


            player = playerRepo.findByFirstName("John");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Phil");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Chris");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("David");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));


            player = playerRepo.findByFirstName("Bernado");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Kevin");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Paul");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Paco");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));


            player = playerRepo.findByFirstName("Marcus");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Romelu");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Dom");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Ed");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));


            player = playerRepo.findByFirstName("Joe");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));

            player = playerRepo.findByFirstName("Stevie");
            player.ifPresent(player1 -> addPlayerToWeeklyTeam(u, player1.getId().toString()));
        }
    }
}
