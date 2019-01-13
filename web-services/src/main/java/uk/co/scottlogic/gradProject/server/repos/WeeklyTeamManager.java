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

//        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");
//
//        if (user.isPresent()){
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

    private boolean checkTeamIsValid(List<Player> players){
        double totalCost = 0;
        Map<UUID, Integer> numberInEachTeam = new HashMap<>();
        Map<UUID, Integer> playersAdded = new HashMap<>();

        for (Player p : players){
            totalCost += p.getPrice();
            if (totalCost > 100){
                return false;
            }
            UUID playerId = p.getId();
            UUID teamId = p.getActiveTeam().getId();
            if (playersAdded.containsKey(playerId)){
                System.out.println("player already added");
                return false;
            }
            else {
                playersAdded.put(playerId, 1);
            }

            if (numberInEachTeam.containsKey(teamId)){
                if (numberInEachTeam.get(teamId).equals(maxPerTeam)){
                    System.out.println("too many from one team");
                    return false;
                }
                else {
                    numberInEachTeam.put(teamId, numberInEachTeam.get(teamId) + 1);
                }
            }
            else{
                numberInEachTeam.put(teamId, 1);
            }

        }
        return true;
    }

    private boolean checkIfUpdateValid(ApplicationUser user, List<UpdateTeamPlayerDTO> playersBeingAdded, List<UpdateTeamPlayerDTO> playersBeingRemoved){

        UsersWeeklyTeam activeTeam = weeklyTeamRepo.findByUser(user).get(0);

        if (activeTeam.getPlayers().size() == 0){
            System.out.println("making initial team");
            System.out.println("Attempting to add " + playersBeingAdded.size() + " players");
            if (playersBeingAdded.size() != 11){
                System.out.println("must provide 11 players");
                return false;
            }
            else {
                System.out.println("Attempting to create entire squad");
                double totalSum = 0;
                Map<UUID, Integer> numberInEachTeam = new HashMap<>();
                Map<UUID, Integer> playersAdded = new HashMap<>();

                for (UpdateTeamPlayerDTO player : playersBeingAdded){

                    Optional<Player> p = playerRepo.findByFirstNameBySurname(player.getFirstName(), player.getSurname());
                    if (p.isPresent()){
                        Player currentPlayer = p.get();
                        UUID playerId = currentPlayer.getId();
                        UUID teamId = currentPlayer.getActiveTeam().getId();
                        totalSum += currentPlayer.getPrice();
                        if (totalSum > 100){
                            System.out.println("too expensive");
                            return false;
                        }
                        if (playersAdded.containsKey(playerId)){
                            System.out.println("player already added");
                            return false;
                        }
                        else {
                            playersAdded.put(playerId, 1);
                        }

                        if (numberInEachTeam.containsKey(teamId)){
                            if (numberInEachTeam.get(teamId).equals(maxPerTeam)){
                                System.out.println("too many from one team");
                                return false;
                            }
                            else {
                                numberInEachTeam.put(teamId, numberInEachTeam.get(teamId) + 1);
                            }
                        }
                        else{
                            numberInEachTeam.put(teamId, 1);
                        }
                    }

                    else {
                        System.out.println("player " + player.getFirstName() + " apparently doesn't exist");
                        return false;
                    }
                }
            }
        }
        else {
            System.out.println("they already have a team");
            if (playersBeingAdded.size() == playersBeingRemoved.size()){
                System.out.println("the lists are the correct size");
                UsersWeeklyTeam team = weeklyTeamRepo.findByUser(user).get(0);
                List<Player> players = team.getPlayers();
                for (UpdateTeamPlayerDTO player: playersBeingRemoved){
                    Optional<Player> p = playerRepo.findByFirstNameBySurname(player.getFirstName(), player.getSurname());
                    if (p.isPresent()){
                        players.remove(p.get());
                    }
                    else {
                        System.out.println("player does not exist");
                    }
                }
                for (UpdateTeamPlayerDTO player : playersBeingAdded){
                    Optional<Player> p = playerRepo.findByFirstNameBySurname(player.getFirstName(), player.getSurname());
                    if (p.isPresent()){
                        players.add(p.get());
                    }
                    else {
                        System.out.println("player does not exist");
                    }
                }
            return checkTeamIsValid(players);
            }
            else {
                System.out.println("Must be adding the same number of players as those being removed");
            }
            return false;
        }

        return true;
    }

    public boolean updateTeam(ApplicationUser user, List<UpdateTeamPlayerDTO> playersBeingAdded, List<UpdateTeamPlayerDTO> playersBeingRemoved) {

        if (checkIfUpdateValid(user, playersBeingAdded, playersBeingRemoved)){
            UsersWeeklyTeam weeklyTeam = weeklyTeamRepo.findByUser(user).get(0);
            for (UpdateTeamPlayerDTO player : playersBeingAdded){

                Optional<Player> p = playerRepo.findByFirstNameBySurname(player.getFirstName(), player.getSurname());
                if (p.isPresent()) {
                    System.out.println("adding player to weekly team");
                    weeklyTeam.addPlayer(p.get());
                }
            }

            for (UpdateTeamPlayerDTO player : playersBeingRemoved){
                Optional<Player> p = playerRepo.findByFirstNameBySurname(player.getFirstName(), player.getSurname());
                if (p.isPresent()) {
                    System.out.println("removing player from weekly team");
                    weeklyTeam.removePlayer(p.get());
                }
            }
            weeklyTeamRepo.save(weeklyTeam);
            return true;
        }
        else {
            return false;
        }
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
            List<Player> players = team.get().getPlayers();
            for (Player p : players){
                playersToReturn.add(new WeeklyPlayerReturnDTO(p, playerManager.findPointsForPlayerInWeek(p, week)));
            }
        }
        else{
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
