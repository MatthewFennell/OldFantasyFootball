package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.Team;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerManager {

    private TeamRepo teamRepo;

    private PlayerRepo playerRepo;

    @Autowired
    public PlayerManager(TeamRepo teamRepo, PlayerRepo playerRepo) {
        this.teamRepo = teamRepo;
        this.playerRepo = playerRepo;

        List<Team> team = teamRepo.findByName("A");
        if (!team.isEmpty()){
//            makePlayer(team.get(0), Player.Position.DEFENDER, 7.1, "Nathan", "Nwach");
//            makePlayer(team.get(0), Player.Position.GOALKEEPER, 3.7, "Arthur", "Lewis");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 8.2, "Hugh", "Burden");
//            makePlayer(team.get(0), Player.Position.ATTACKER, 8.8, "Paco", "");
//            makePlayer(team.get(0), Player.Position.GOALKEEPER, 12.5, "Dom", "Beesley");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 8.5, "Ed", "Main");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 7.5, "Joe", "Sutton");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 6.5, "Stevie", "");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 7.5, "Ollie", "Ferrao");
//            makePlayer(team.get(0), Player.Position.MIDFIELDER, 6.5, "Eloka", "Philips");
//            makePlayer(team.get(0), Player.Position.DEFENDER, 9.5, "Herbie", "");
//            makePlayer(team.get(0), Player.Position.ATTACKER, 10.5, "Eduardo", "Garcia");
        }
    }


    private void makePlayer(Team activeTeam, Player.Position position, double price, String firstName, String surname){
        Optional<Team> team = teamRepo.findById(activeTeam.getId());
        if (team.isPresent()){
            Player player = new Player(team.get(), position, price, firstName, surname);
            playerRepo.save(player);
        }
        else{
            throw new IllegalArgumentException("Invalid Team ID");
        }
    }

}
