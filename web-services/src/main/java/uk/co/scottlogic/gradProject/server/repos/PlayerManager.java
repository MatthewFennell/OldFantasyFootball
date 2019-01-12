package uk.co.scottlogic.gradProject.server.repos;

import jdk.swing.interop.SwingInterOpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.*;

import java.util.*;
import java.util.zip.CheckedOutputStream;

@Service
public class PlayerManager {

    private CollegeTeamRepo teamRepo;

    private PlayerRepo playerRepo;

    private PlayerPointsRepo playerPointsRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    private ApplicationUserRepo applicationUserRepo;

    @Autowired
    public PlayerManager(CollegeTeamRepo teamRepo, PlayerRepo playerRepo, PlayerPointsRepo playerPointsRepo, WeeklyTeamRepo weeklyTeamRepo, ApplicationUserRepo applicationUserRepo) {
        this.teamRepo = teamRepo;
        this.playerRepo = playerRepo;
        this.playerPointsRepo = playerPointsRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.applicationUserRepo = applicationUserRepo;
//        makePlayers();
//        addPointsToPlayersWeek0();

    }


    private void makePlayer(CollegeTeam activeTeam, Player.Position position, double price, String firstName, String surname) {
        Optional<CollegeTeam> team = teamRepo.findById(activeTeam.getId());
        if (team.isPresent()) {
            Player player = new Player(team.get(), position, price, firstName, surname);
            playerRepo.save(player);
        } else {
            throw new IllegalArgumentException("Invalid Team ID");
        }
    }

    // When adding points to a player
    // Add points to all the weekly teams they belong to for the correct week
    // Update the users total score as well
    private void addPointsToPlayer(Player player, Date date, Integer goals, Integer assists, Boolean cleanSheet, Integer minutesPlayed, Integer yellowCards, Boolean redCard, Boolean manOfTheMatch, Integer week) {
        PlayerPoints newPlayerPoints = new PlayerPoints(goals, assists, minutesPlayed, manOfTheMatch, yellowCards, redCard, cleanSheet, date, player, week);
        playerPointsRepo.save(newPlayerPoints);
        Integer score = newPlayerPoints.calculateScore();

        player.changeScore(score);
        player.changeGoals(goals);
        player.changeAssists(assists);
        playerRepo.save(player);
        List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayers(player);
        for (UsersWeeklyTeam uwt : weeklyTeams){

            // Increase the weekly team score
            uwt.changePoints(score);
            weeklyTeamRepo.save(uwt);

            // Increase the users total score
            ApplicationUser user = uwt.getUser();
            user.changeTotalPoints(score);
            applicationUserRepo.save(user);
        }
    }

    public Integer findPointsForPlayerInWeek(Player player, Integer week){
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        System.out.println("made it here");
        if (playerPoints.isPresent()){
            return playerPoints.get().getPoints();
        }
        else{
            return 0;
        }
    }

    public List<PlayerPoints> findPlayerWithMostPointsInWeek(Integer week){
        return playerPointsRepo.findPlayerWithMostPoints(week);
    }

    public List<Player> formatFilter(String team, Player.Position position, Integer min, Integer max, String name, SORT_BY sortBy){

        if (team.equals("All teams")){
            if (position.equals(Player.Position.ALL)){
                return filter(null, null, min, max, name, sortBy);
            }
            else {
                return filter(null, position.ordinal(), min, max, name, sortBy);
            }
        }
        else {
            Optional<CollegeTeam> collegeTeam = teamRepo.findByName(team);
            if (collegeTeam.isPresent()){
                if (position != Player.Position.ALL) {
                    return filter(collegeTeam.get(), position.ordinal(), min, max, name, sortBy);
                }
                else {
                    return filter(collegeTeam.get(), null, min, max, name, sortBy);
                }
            }
            else {
                throw new IllegalArgumentException("College team does not exist");
            }
        }
    }

    private List<Player> filter(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name, SORT_BY sorting){

        String searchName = name;

        // Search for everything if the input is null
        if (name.equals("null")){
            searchName = "%";
        }
        // Now searches for anything that contains 'searchName'
        else {
            searchName = "%" + searchName + "%";
        }

        System.out.println("hiya");

        // Order by price by default
        if (sorting == SORT_BY.GOALS){
            return playerRepo.filterPlayersSortByGoals(team, position, minPrice, maxPrice, searchName);
        }
        else if (sorting == SORT_BY.ASSISTS) {
            return playerRepo.filterPlayersSortByAssists(team, position, minPrice, maxPrice, searchName);
        }
        else if (sorting == SORT_BY.TOTAL_POINTS) {
            return playerRepo.filterPlayersSortByScore(team, position, minPrice, maxPrice, searchName);
        }
        else {
            return playerRepo.filterPlayersSortByPrice(team, position, minPrice, maxPrice, searchName);
        }
    }

    public void addPointsToPlayersWeek0(){
        Optional<Player> player1 = playerRepo.findByFirstName("John");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 3, 6, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Phil");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 1, 2, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Chris");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 4, 1, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("David");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 2, 2, false, 90, 0, false, false, 0));


        player1 = playerRepo.findByFirstName("Bernado");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 5, 3, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Kevin");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 1, 5, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Paul");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 2, 1, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Paco");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 3, 4, false, 90, 0, false, false, 0));


        player1 = playerRepo.findByFirstName("Marcus");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 4, 8, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Romelu");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 1, 5, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Dom");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 2, 2, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Ed");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 9, 3, false, 90, 0, false, false, 0));


        player1 = playerRepo.findByFirstName("Joe");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 10, 0, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Stevie");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 70, 1, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Ollie");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 21, 3, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Eloka");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 72, 4, false, 90, 0, false, false, 0));


        player1 = playerRepo.findByFirstName("Herbie");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 23, 5, false, 90, 0, false, false, 0));

        player1 = playerRepo.findByFirstName("Eduardo");
        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 43, 1, false, 90, 0, false, false, 0));

    }

    public void makePlayers(){
                Optional<CollegeTeam> team = teamRepo.findByName("A");
        if (!team.isEmpty()){
            makePlayer(team.get(), Player.Position.DEFENDER, 7.2, "John", "Terry");
            makePlayer(team.get(), Player.Position.DEFENDER, 5.4, "Phil", "Jones");
            makePlayer(team.get(), Player.Position.DEFENDER, 5.7, "Chris", "Smalling");
            makePlayer(team.get(), Player.Position.MIDFIELDER, 8.5, "David", "Silva");

            makePlayer(team.get(), Player.Position.MIDFIELDER, 8.2, "Bernado", "Silva");
            makePlayer(team.get(), Player.Position.MIDFIELDER, 9.8, "Kevin", "DeBruyne");
            makePlayer(team.get(), Player.Position.MIDFIELDER, 9.9, "Paul", "Pogba");
            makePlayer(team.get(), Player.Position.ATTACKER, 8.8, "Paco", "");

            makePlayer(team.get(), Player.Position.ATTACKER, 10.2, "Marcus", "Rashford");
            makePlayer(team.get(), Player.Position.ATTACKER, 10.2, "Romelu", "Lukaku");
            makePlayer(team.get(), Player.Position.GOALKEEPER, 12.5, "Dom", "Beesley");
            makePlayer(team.get(), Player.Position.DEFENDER, 8.5, "Ed", "Main");

            makePlayer(team.get(), Player.Position.DEFENDER, 7.5, "Joe", "Sutton");
            makePlayer(team.get(), Player.Position.DEFENDER, 6.5, "Stevie", "");
            makePlayer(team.get(), Player.Position.MIDFIELDER, 7.5, "Ollie", "Ferrao");
            makePlayer(team.get(), Player.Position.MIDFIELDER, 6.5, "Eloka", "Philips");

            makePlayer(team.get(), Player.Position.DEFENDER, 9.5, "Herbie", "");
            makePlayer(team.get(), Player.Position.ATTACKER, 10.5, "Eduardo", "Garcia");
        }
    }

    public enum SORT_BY {
        TOTAL_POINTS, GOALS, ASSISTS, PRICE
    }

}
