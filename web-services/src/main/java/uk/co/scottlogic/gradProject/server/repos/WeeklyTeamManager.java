package uk.co.scottlogic.gradProject.server.repos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;
import uk.co.scottlogic.gradProject.server.routers.Token;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerDTO;

import java.util.*;

@Service
public class WeeklyTeamManager {

    private static final Logger log = LoggerFactory.getLogger(Token.class);

    private PlayerRepo playerRepo;


    private ApplicationUserRepo applicationUserRepo;

    private WeeklyTeamRepo weeklyTeamRepo;


    private PlayerManager playerManager;

    @Autowired
    public WeeklyTeamManager(ApplicationUserRepo applicationUserRepo, PlayerRepo playeRepo,
                             WeeklyTeamRepo weeklyTeamRepo, PlayerManager playerManager) {
        this.applicationUserRepo = applicationUserRepo;
        this.playerRepo = playeRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.playerManager = playerManager;

        Optional<ApplicationUser> user = applicationUserRepo.findByUsername("a");


//        addPlayersToWeeklyTeam();

    }


    // Adds to the first weekly team it finds
    void addPlayerToWeeklyTeam(ApplicationUser user, String id) {
        Optional<Player> player = playerRepo.findById(UUID.fromString(id));

        if (player.isPresent()) {
            Player p = player.get();
            List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
            if (!teams.isEmpty()) {
                UsersWeeklyTeam team = teams.get(0);
                team.getPlayers().add(p);
                weeklyTeamRepo.save(team);
                log.debug("Added player {} to user {}", p.getFirstName(), user.getFirstName());
            }
        } else {
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    public Integer getTotalNumberOfWeeks() {
        return weeklyTeamRepo.findNumberOfWeeks();
    }

    void removePlayerFromWeeklyTeam(ApplicationUser user, String id) {

        Optional<Player> player = playerRepo.findById(UUID.fromString(id));

        if (player.isPresent()) {
            Player p = player.get();
            List<UsersWeeklyTeam> teams = weeklyTeamRepo.findByUser(user);
            if (!teams.isEmpty()) {
                UsersWeeklyTeam team = teams.get(0);
                team.getPlayers().remove(p);
                weeklyTeamRepo.save(team);
                log.debug("Removed player {} from user {}", p.getFirstName(), user.getFirstName());
            } else {
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
    boolean checkTeamIsValid(List<Player> players) {
        double totalCost = 0;

        Integer numberOfGoalkeepers = 0;
        Integer numberOfDefenders = 0;
        Integer numberOfMidfielders = 0;
        Integer numberOfAttackers = 0;

        Map<UUID, Integer> numberInEachTeam = new HashMap<>();
        Map<UUID, Integer> playersAdded = new HashMap<>();

        for (Player p : players) {
            totalCost += p.getPrice();
            if (totalCost > Constants.INITIAL_BUDGET) {
                log.debug("too expensive");
                return false;
            }

            if (p.getPosition().equals(Enums.Position.GOALKEEPER)) {
                numberOfGoalkeepers += 1;
                if (numberOfGoalkeepers > Constants.MAX_GOALKEEPERS) {
                    return false;
                }
            } else if (p.getPosition().equals(Enums.Position.DEFENDER)) {
                numberOfDefenders += 1;
                if (numberOfDefenders > Constants.MAX_DEFENDERS) {
                    return false;
                }
            } else if (p.getPosition().equals(Enums.Position.MIDFIELDER)) {
                numberOfMidfielders += 1;
                if (numberOfMidfielders > Constants.MAX_MIDFIELDERS) {
                    return false;
                }
            } else if (p.getPosition().equals(Enums.Position.ATTACKER)) {
                numberOfAttackers += 1;
                if (numberOfAttackers > Constants.MAX_ATTACKERS) {
                    return false;
                }
            }

            UUID playerId = p.getId();
            UUID teamId = p.getActiveTeam().getId();
            if (playersAdded.containsKey(playerId)) {
                return false;
            } else {
                playersAdded.put(playerId, 1);
            }

            if (numberInEachTeam.containsKey(teamId)) {
                if (numberInEachTeam.get(teamId).equals(Constants.MAX_PLAYERS_PER_COLLEGE_TEAM)) {
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

    public boolean update(ApplicationUser user, List<PlayerDTO> playersBeingAdded, List<PlayerDTO> playersBeingRemoved) {

        if (weeklyTeamRepo.findByUser(user).isEmpty()) {
            throw new IllegalArgumentException("User does not have a weekly team");
        }

        if (playersBeingAdded.isEmpty()) {
            throw new IllegalArgumentException("Must attempt to transfer at least 1 player");
        }

        UsersWeeklyTeam activeTeam = weeklyTeamRepo.findByUser(user).get(0);

        if (activeTeam.getPlayers().size() + playersBeingAdded.size() - playersBeingRemoved.size() != Constants.MAX_TEAM_SIZE) {
            throw new IllegalArgumentException("Invalid team size");
        }

        ArrayList<Player> players = new ArrayList<>(activeTeam.getPlayers());


        for (PlayerDTO player : playersBeingAdded) {
            Optional<Player> p = playerRepo.findById(UUID.fromString(player.getId()));
            if (p.isPresent()) {
                players.add(p.get());
            } else {
                throw new IllegalArgumentException("Player being added does not exist");
            }
        }

        for (PlayerDTO player : playersBeingRemoved) {
            Optional<Player> p = playerRepo.findById(UUID.fromString(player.getId()));
            if (p.isPresent()) {
                players.remove(p.get());
            } else {
                throw new IllegalArgumentException("Player being removed does not exist");
            }
        }
        // Only save if the transfer is valid
        if (checkTeamIsValid(players)) {
            weeklyTeamRepo.save(activeTeam);
            return true;
        } else {
            return false;
        }
    }

    public double findAveragePointsOfAllTeamsInWeek(Integer week) {
        return weeklyTeamRepo.findAveragePointsInWeek(week);
    }

    // Returns the list sorted by Goalkeeper - Defenders - Midfielder - Attacker
    public List<PlayerDTO> findAllPlayersInWeeklyTeam(ApplicationUser user, Integer week) {
        Optional<UsersWeeklyTeam> team = weeklyTeamRepo.findByUserByWeek(user, week);
        List<PlayerDTO> playersToReturn = new ArrayList<>();

        if (team.isPresent()) {

            List<Player> players = team.get().getPlayers();
            for (Player p : players) {
                playersToReturn.add(new PlayerDTO(p, playerManager.findPointsForPlayerInWeek(p, week)));
            }
        } else {
            throw new IllegalArgumentException("No weekly team for that user and date");
        }
        playersToReturn.sort(Comparator.comparing(PlayerDTO::getPosition));

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
