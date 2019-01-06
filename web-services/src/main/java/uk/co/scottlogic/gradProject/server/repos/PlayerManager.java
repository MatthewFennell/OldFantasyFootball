package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PlayerManager {

    private CollegeTeamRepo teamRepo;

    private PlayerRepo playerRepo;

    private PlayerPointsRepo playerPointsRepo;

    @Autowired
    public PlayerManager(CollegeTeamRepo teamRepo, PlayerRepo playerRepo, PlayerPointsRepo playerPointsRepo) {
        this.teamRepo = teamRepo;
        this.playerRepo = playerRepo;
        this.playerPointsRepo = playerPointsRepo;


//        List<CollegeTeam> team = teamRepo.findByName("A");
//        if (!team.isEmpty()){
//            makePlayer(team.get(0), Player.Position.DEFENDER, 7.2, "John", "Terry");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 5.4, "Phil", "Jones");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 5.7, "Chris", "Smalling");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 8.5, "David", "Silva");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 8.2, "Bernado", "Silva");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 9.8, "Kevin", "DeBruyne");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 9.9, "Paul", "Pogba");
//            makePlayer(team.get(0), Player.Position.ATTACKER, 8.8, "Paco", "");
//            makePlayer(team.get(0), Player.Position.ATTACKER, 10.2, "Marcus", "Rashford");
//            makePlayer(team.get(0), Player.Position.ATTACKER, 10.2, "Romelu", "Lukaku");
//            makePlayer(team.get(0), Player.Position.GOALKEEPER, 12.5, "Dom", "Beesley");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 8.5, "Ed", "Main");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 7.5, "Joe", "Sutton");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 6.5, "Stevie", "");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 7.5, "Ollie", "Ferrao");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 6.5, "Eloka", "Philips");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 9.5, "Herbie", "");
//            makePlayer(team.get(0), Player.Position.ATTACKER, 10.5, "Eduardo", "Garcia");
//        }

//        Optional<Player> player = playerRepo.findByFirstName("Eduardo");
//        if (player.isPresent()){
//            Player p = player.get();
//            addPointsToPlayer(p, new Date(), 3, 10, false, 90, 1, false, false);
//
//        }
        Optional<Player> player = playerRepo.findByFirstName("Eduardo");
        if (player.isPresent()) {
            System.out.println("Score for Eduardo is " + findPointsForPlayerInWeek(player.get(), new Date()));
        }
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

    private void addPointsToPlayer(Player player, Date date, Integer goals, Integer assists, Boolean cleanSheet, Integer minutesPlayed, Integer yellowCards, Boolean redCard, Boolean manOfTheMatch) {
        playerPointsRepo.save(new PlayerPoints(goals, assists, minutesPlayed, manOfTheMatch, yellowCards, redCard, cleanSheet, date, player));
    }

    private double findPointsForPlayerInWeek(Player player, Date date){
        List<PlayerPoints> playerPoints = playerPointsRepo.findByPlayer(player);

        if (!playerPoints.isEmpty()){
            return playerPoints.get(0).calculateScore();
        }
        else{
            return 0;
        }
    }

}
