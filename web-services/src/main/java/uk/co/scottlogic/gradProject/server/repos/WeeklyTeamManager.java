package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UpdateTeamPlayerDTO;
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

    private Integer maxPerTeam;

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
        this.maxPerTeam = 11;


        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");

//        if (user.isPresent()){
//            UsersWeeklyTeam team = weeklyTeamRepo.findByUser(user.get()).get(0);
//            List<Player> players = team.getPlayers();
//            System.out.println("players size = " + players.size());
//            for (Player p : players){
//                System.out.println("name = " + p.getFirstName());
//            }
//            Optional<Player> p = playeRepo.findByFirstNameBySurname("Phil", "Jones");
//            if (p.isPresent()){
//                System.out.println("size before = " + players.size());
//                for (int x = 0; x < players.size(); x++){
//                    if (players.get(x).getFirstName().equals("Phil")){
//                        players.remove(x);
//                        break;
//                    }
//                }
//                System.out.println("size after = " + players.size());
//            }


//            UsersWeeklyTeam team = new UsersWeeklyTeam(user.get(), new Date(), new ArrayList<>(), 0);
//            weeklyTeamRepo.save(team);
//        }

//        addPlayersToWeeklyTeam();

    }


    public Integer getMaxPerTeam() {
        return maxPerTeam;
    }

    public void setMaxPerTeam(Integer maxPerTeam) {
        this.maxPerTeam = maxPerTeam;
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

    public Integer getTotalNumberOfWeeks() {
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
            else {
                throw new IllegalArgumentException("Player does not have a weekly team");
            }
        } else {
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    public List<UsersWeeklyTeam> findWeeklyTeamWithMostPoints(Integer week) {
        return weeklyTeamRepo.findUserWithMostPoints(week);
    }

    // Given a list of players, check that it is a valid squad
    private boolean checkTeamIsValid(List<Player> players) {
        double totalCost = 0;
        Map<UUID, Integer> numberInEachTeam = new HashMap<>();
        Map<UUID, Integer> playersAdded = new HashMap<>();

        for (Player p : players) {
            totalCost += p.getPrice();
            if (totalCost > 100) {
                return false;
            }
            UUID playerId = p.getId();
            UUID teamId = p.getActiveTeam().getId();
            if (playersAdded.containsKey(playerId)) {
                System.out.println("player already added");
                return false;
            } else {
                playersAdded.put(playerId, 1);
            }

            if (numberInEachTeam.containsKey(teamId)) {
                if (numberInEachTeam.get(teamId).equals(maxPerTeam)) {
                    System.out.println("too many from one team");
                    return false;
                } else {
                    numberInEachTeam.put(teamId, numberInEachTeam.get(teamId) + 1);
                }
            } else {
                numberInEachTeam.put(teamId, 1);
            }

        }
        return true;
    }

    public boolean update(ApplicationUser user, List<UpdateTeamPlayerDTO> playersBeingAdded, List<UpdateTeamPlayerDTO> playersBeingRemoved){

        if (weeklyTeamRepo.findByUser(user).isEmpty()){
            throw new IllegalArgumentException("User does not have a weekly team");
        }

        if (playersBeingAdded.size() == 0){
            throw new IllegalArgumentException("Must attempt to transfer at least 1 player");
        }

        UsersWeeklyTeam activeTeam = weeklyTeamRepo.findByUser(user).get(0);

        if (activeTeam.getPlayers().size() + playersBeingAdded.size() - playersBeingRemoved.size() != 11){
            System.out.println("incorrect team size");
            throw new IllegalArgumentException("Invalid team size");
        }

        List<Player> players = activeTeam.getPlayers();

        for (UpdateTeamPlayerDTO player : playersBeingAdded){
            Optional<Player> p = playerRepo.findByFirstNameBySurname(player.getFirstName(), player.getSurname());
            if (p.isPresent()) {
                players.add(p.get());
                System.out.println("added player " + p.get().getFirstName());
            } else {
                throw new IllegalArgumentException("Player being added does not exist");
            }
        }

        for (UpdateTeamPlayerDTO player : playersBeingRemoved) {
            Optional<Player> p = playerRepo.findByFirstNameBySurname(player.getFirstName(), player.getSurname());
            if (p.isPresent()) {
                players.remove(p.get());
                System.out.println("removed player " + p.get().getFirstName());
            } else {
                throw new IllegalArgumentException("Player being removed does not exist");
            }
        }
        // Only save if the transfer is valid
        if (checkTeamIsValid(players)){
            weeklyTeamRepo.save(activeTeam);
            return true;
        }
        else {
            return false;
        }
    }

    public double findAveragePointsOfAllTeamsInWeek(Integer week) {
        return weeklyTeamRepo.findAveragePointsInWeek(week);
    }

    // Returns the list sorted by Goalkeeper - Defenders - Midfielder - Attacker
    public List<WeeklyPlayerReturnDTO> findAllPlayersInWeeklyTeam(ApplicationUser user, Integer week) {
        System.out.println("user = " + user.getFirstName());
        System.out.println("week = " + week);
        Optional<UsersWeeklyTeam> team = weeklyTeamRepo.findByUserByWeek(user, week);
        List<WeeklyPlayerReturnDTO> playersToReturn = new ArrayList<>();

        if (team.isPresent()) {
            List<Player> players = team.get().getPlayers();
            System.out.println("number of players = " + players.size());
            for (Player p : players) {
                playersToReturn.add(new WeeklyPlayerReturnDTO(p, playerManager.findPointsForPlayerInWeek(p, week)));
            }
        } else {
            System.out.println("team not present");
            throw new IllegalArgumentException("No weekly team for that user and date");
        }
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
