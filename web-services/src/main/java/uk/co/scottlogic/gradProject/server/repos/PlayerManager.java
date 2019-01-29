package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.documents.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

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


    void makePlayer(CollegeTeam activeTeam, Enums.Position position, double price, String firstName, String surname) {
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
    void addPointsToPlayer(Player player, Date date, Integer goals, Integer assists, Boolean cleanSheet, Integer minutesPlayed, Integer yellowCards, Boolean redCard, Boolean manOfTheMatch, Integer week) {
        PlayerPoints newPlayerPoints = new PlayerPoints(goals, assists, minutesPlayed, manOfTheMatch, yellowCards, redCard, cleanSheet, date, player, week);
        playerPointsRepo.save(newPlayerPoints);
        Integer score = calculateScore(newPlayerPoints);

        player.changeScore(score);
        player.changeGoals(goals);
        player.changeAssists(assists);
        playerRepo.save(player);
        // Shouldn't this also filter by week? -> Only update the week that the points are being added to
        List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayer(player);
        for (UsersWeeklyTeam uwt : weeklyTeams) {

            // Increase the weekly team score
            uwt.changePoints(score);
            weeklyTeamRepo.save(uwt);

            // Increase the users total score
            ApplicationUser user = uwt.getUser();
            user.changeTotalPoints(score);
            applicationUserRepo.save(user);
        }
    }

    public Integer calculateScore(PlayerPoints playerPoints){
        Integer total = 0;
        Player player = playerPoints.getPlayer();
        if (player.getPosition() == Enums.Position.DEFENDER || player.getPosition() == Enums.Position.GOALKEEPER) {
            total += playerPoints.getNumberOfGoals() * Constants.POINTS_PER_DEFENDER_GOAL;
            if (playerPoints.isCleanSheet()) {
                total += Constants.POINTS_PER_CLEAN_SHEET;
            }
        } else if (player.getPosition() == Enums.Position.MIDFIELDER) {
            total += playerPoints.getNumberOfGoals() * Constants.POINTS_PER_MIDFIELDER_GOAL;
        } else if (player.getPosition() == Enums.Position.ATTACKER) {
            total += playerPoints.getNumberOfGoals() * Constants.POINTS_PER_ATTACKER_GOAL;
        }
        total += playerPoints.getNumberOfAssists() * Constants.POINTS_PER_ASSIST;

        if (playerPoints.getMinutesPlayed() > 60) {
            total += 2;
        } else if (playerPoints.getMinutesPlayed() > 0) {
            total += 1;
        }
        total += playerPoints.getYellowCards() * Constants.POINTS_PER_YELLOW_CARD;
        if (playerPoints.isRedCard()) {
            total += Constants.POINTS_PER_RED_CARD;
        }
        if (playerPoints.isManOfTheMatch()) {
            total += Constants.MAN_OF_THE_MATCH_BONUS;
        }
        return total;
    }

    public void addPointsToPlayer(PlayerPoints playerPoints){
        playerPointsRepo.save(playerPoints);
        Integer score = calculateScore(playerPoints);
        playerPoints.getPlayer().changeScore(score);
        playerPoints.getPlayer().changeGoals(playerPoints.getNumberOfGoals());
        playerPoints.getPlayer().changeAssists(playerPoints.getNumberOfAssists());
        playerRepo.save(playerPoints.getPlayer());

        List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayer(playerPoints.getPlayer());
        for (UsersWeeklyTeam uwt : weeklyTeams) {

            // Increase the weekly team score
            uwt.changePoints(score);
            weeklyTeamRepo.save(uwt);

            // Increase the users total score
            ApplicationUser user = uwt.getUser();
            user.changeTotalPoints(score);
            applicationUserRepo.save(user);
        }
    }

    // Possibly just need this to return 0 if the player doesn't exist
    Integer findPointsForPlayerInWeek(Player player, Integer week) {
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()) {
            return playerPoints.get().getPoints();
        } else if (week == 0) {
            return 0;
        } else {
            throw new IllegalArgumentException("Player doesn't exist");
        }
    }

    public List<PlayerPoints> findPlayerWithMostPointsInWeek(Integer week) {
        return playerPointsRepo.findPlayerWithMostPoints(week);
    }

    public List<Player> formatFilter(String team, Enums.Position position, Integer min, Integer max, String name, Enums.SORT_BY sortBy) {
        if (team.equals("All teams")) {
            if (position.equals(Enums.Position.ALL)) {
                return filter(null, null, min, max, name, sortBy);
            } else {
                return filter(null, position.ordinal(), min, max, name, sortBy);
            }
        } else {
            Optional<CollegeTeam> collegeTeam = teamRepo.findByName(team);
            if (collegeTeam.isPresent()) {
                if (position != Enums.Position.ALL) {
                    return filter(collegeTeam.get(), position.ordinal(), min, max, name, sortBy);
                } else {
                    return filter(collegeTeam.get(), null, min, max, name, sortBy);
                }
            } else {
                throw new IllegalArgumentException("College team does not exist");
            }
        }
    }

    private List<Player> filter(CollegeTeam team, Integer position, Integer minPrice, Integer maxPrice, String name, Enums.SORT_BY sorting) {
        String searchName = name;
        // Search for everything if the input is null
        if (name.equals("null")) {
            searchName = "%";
        }
        // Now searches for anything that contains 'searchName'
        else {
            searchName = "%" + searchName + "%";
        }
        // Order by price by default
        if (sorting == Enums.SORT_BY.GOALS) {
            return playerRepo.filterPlayersSortByGoals(team, position, minPrice, maxPrice, searchName);
        } else if (sorting == Enums.SORT_BY.ASSISTS) {
            return playerRepo.filterPlayersSortByAssists(team, position, minPrice, maxPrice, searchName);
        } else if (sorting == Enums.SORT_BY.TOTAL_POINTS) {
            return playerRepo.filterPlayersSortByScore(team, position, minPrice, maxPrice, searchName);
        } else {
            return playerRepo.filterPlayersSortByPrice(team, position, minPrice, maxPrice, searchName);
        }
    }
//
//    public void addPointsToPlayersWeek0() {
//        Optional<Player> player1 = playerRepo.findByFirstName("John");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 3, 6, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Phil");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 1, 2, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Chris");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 4, 1, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("David");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 2, 2, false, 90, 0, false, false, 0));
//
//
//        player1 = playerRepo.findByFirstName("Bernado");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 5, 3, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Kevin");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 1, 5, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Paul");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 2, 1, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Paco");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 3, 4, false, 90, 0, false, false, 0));
//
//
//        player1 = playerRepo.findByFirstName("Marcus");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 4, 8, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Romelu");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 1, 5, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Dom");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 2, 2, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Ed");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 9, 3, false, 90, 0, false, false, 0));
//
//
//        player1 = playerRepo.findByFirstName("Joe");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 10, 0, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Stevie");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 70, 1, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Ollie");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 21, 3, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Eloka");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 72, 4, false, 90, 0, false, false, 0));
//
//
//        player1 = playerRepo.findByFirstName("Herbie");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 23, 5, false, 90, 0, false, false, 0));
//
//        player1 = playerRepo.findByFirstName("Eduardo");
//        player1.ifPresent(player -> addPointsToPlayer(player, new Date(), 43, 1, false, 90, 0, false, false, 0));
//
//    }

//    public void makePlayers() {
//        Optional<CollegeTeam> team = teamRepo.findByName("A");
//        if (!team.isEmpty()) {
//            makePlayer(team.get(), Enums.Position.DEFENDER, 7.2, "John", "Terry");
//            makePlayer(team.get(), Enums.Position.DEFENDER, 5.4, "Phil", "Jones");
//            makePlayer(team.get(), Enums.Position.DEFENDER, 5.7, "Chris", "Smalling");
//            makePlayer(team.get(), Enums.Position.MIDFIELDER, 8.5, "David", "Silva");
//
//            makePlayer(team.get(), Enums.Position.MIDFIELDER, 8.2, "Bernado", "Silva");
//            makePlayer(team.get(), Enums.Position.MIDFIELDER, 9.8, "Kevin", "DeBruyne");
//            makePlayer(team.get(), Enums.Position.MIDFIELDER, 9.9, "Paul", "Pogba");
//            makePlayer(team.get(), Enums.Position.ATTACKER, 8.8, "Paco", "");
//
//            makePlayer(team.get(), Enums.Position.ATTACKER, 10.2, "Marcus", "Rashford");
//            makePlayer(team.get(), Enums.Position.ATTACKER, 10.2, "Romelu", "Lukaku");
//            makePlayer(team.get(), Enums.Position.GOALKEEPER, 12.5, "Dom", "Beesley");
//            makePlayer(team.get(), Enums.Position.DEFENDER, 8.5, "Ed", "Main");
//
//            makePlayer(team.get(), Enums.Position.DEFENDER, 7.5, "Joe", "Sutton");
//            makePlayer(team.get(), Enums.Position.DEFENDER, 6.5, "Stevie", "");
//            makePlayer(team.get(), Enums.Position.MIDFIELDER, 7.5, "Ollie", "Ferrao");
//            makePlayer(team.get(), Enums.Position.MIDFIELDER, 6.5, "Eloka", "Philips");
//
//            makePlayer(team.get(), Enums.Position.DEFENDER, 9.5, "Herbie", "");
//            makePlayer(team.get(), Enums.Position.ATTACKER, 10.5, "Eduardo", "Garcia");
//        }
//    }


}

