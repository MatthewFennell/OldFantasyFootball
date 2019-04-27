package uk.co.scottlogic.gradProject.server.repos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.repos.documents.*;
import uk.co.scottlogic.gradProject.server.routers.dto.*;

import java.util.*;

@Service
public class PlayerManager {

    private static final Logger log = LoggerFactory.getLogger(PlayerManager.class);

    private CollegeTeamRepo teamRepo;

    private PlayerRepo playerRepo;

    private PlayerPointsRepo playerPointsRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    private ApplicationUserRepo applicationUserRepo;

    private PercentageOfTeamsRepo percentageOfTeamsRepo;

    @Autowired
    public PlayerManager(CollegeTeamRepo teamRepo, PlayerRepo playerRepo,
                         PlayerPointsRepo playerPointsRepo, WeeklyTeamRepo weeklyTeamRepo,
                         ApplicationUserRepo applicationUserRepo, PercentageOfTeamsRepo percentageOfTeamsRepo) {
        this.teamRepo = teamRepo;
        this.playerRepo = playerRepo;
        this.playerPointsRepo = playerPointsRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.applicationUserRepo = applicationUserRepo;
        this.percentageOfTeamsRepo = percentageOfTeamsRepo;
    }

    public void makePlayer(MakePlayerDTO makePlayerDTO) {
        Optional<CollegeTeam> team = teamRepo.findByName(makePlayerDTO.getCollegeTeam());
        if (team.isPresent()) {
            Player player = new Player(team.get(), makePlayerDTO.getPosition(), makePlayerDTO.getPrice(), makePlayerDTO.getFirstName(), makePlayerDTO.getSurname());
            playerRepo.save(player);
        } else {
            log.debug("Invalid team");
            throw new IllegalArgumentException("Invalid team");
        }
    }

    public void deletePlayer(String playerID) {
        Optional<Player> player = playerRepo.findById(UUID.fromString(playerID));
        if (player.isPresent()) {
            if (playerExistsInWeeklyTeam(player.get())) {
                log.debug("Player ({}) is already in a team", player.get().getFirstName());
                throw new IllegalArgumentException("That player is in a weekly team - can't delete them");
            } else {
                playerRepo.delete(player.get());
                log.debug("Deleted player ({})", player.get().getFirstName());
            }
        } else {
            log.debug("Cannot delete player - player does not exist");
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    private boolean playerExistsInWeeklyTeam(Player player) {
        Iterable<UsersWeeklyTeam> usersWeeklyTeams = weeklyTeamRepo.findAll();
        List<UsersWeeklyTeam> allWeeklyTeams = new ArrayList<>();
        usersWeeklyTeams.forEach(allWeeklyTeams::add);
        for (UsersWeeklyTeam uwt : allWeeklyTeams) {
            List<Player> players = uwt.getPlayers();
            for (Player p : players) {
                if (p.getId().equals(player.getId())) {
                    return true;
                }
            }
        }
        return false;
    }

    void makeNewWeek(Integer newWeek){
        Iterable<ApplicationUser> allUsers = applicationUserRepo.findAll();
        List<ApplicationUser> users = new ArrayList<>();
        allUsers.forEach(users::add);
        for (ApplicationUser user : users){
            Optional<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findActiveTeam(user);
            if (!weeklyTeams.isPresent()){
                UsersWeeklyTeam newUWT = new UsersWeeklyTeam(user, new Date(), new ArrayList<>(), newWeek);
                weeklyTeamRepo.save(newUWT);
            }
            else {
                UsersWeeklyTeam mostRecent = weeklyTeams.get();
                UsersWeeklyTeam newUWT = new UsersWeeklyTeam(user, new Date(), mostRecent.getPlayers(), newWeek);
                weeklyTeamRepo.save(newUWT);
            }
        }
    }

    // Should only add results once per team per match
    // TO:DO - Change max week per team
    public void submitResults(SubmitPointsDTO pointsDTO){

        setPercentagesOfPlayersInTeams();

        Integer maxWeek = weeklyTeamRepo.findNumberOfWeeks();
        if (pointsDTO.getWeek() > maxWeek){
            throw new IllegalArgumentException("Missing out a week of points. The next week should be " + (maxWeek));
        }

        System.out.println("submitting results");
        Optional<CollegeTeam> collegeTeam = teamRepo.findByName(pointsDTO.getTeamName());
        if (collegeTeam.isPresent()){

            if (pointsDTO.getGoalsFor().equals(pointsDTO.getGoalsAgainst())){
                System.out.println("added a college draw");
                collegeTeam.get().addDraw();
            }
            else if (pointsDTO.getGoalsFor() > pointsDTO.getGoalsAgainst()){
                System.out.println("added a college win");
                collegeTeam.get().addWin();
            }
            else {
                System.out.println("added a college loss");
                collegeTeam.get().addLoss();
            }
            System.out.println("added " + pointsDTO.getGoalsFor() + " goals for");
            collegeTeam.get().addGoalsFor(pointsDTO.getGoalsFor());

            System.out.println("added " + pointsDTO.getGoalsAgainst() + " goals against");
            collegeTeam.get().addGoalsAgainst(pointsDTO.getGoalsAgainst());

            for (String goalScorerID : pointsDTO.getGoalScorers()){
                Optional<Player> player = playerRepo.findById(UUID.fromString(goalScorerID));
                if (player.isPresent()){
                    System.out.println("adding a goal to " + player.get().getFirstName() + "  " + player.get().getSurname());
                    addGoalToPlayer(player.get(), pointsDTO.getWeek());
                }
                else {
                    throw new IllegalArgumentException("No player exists for player id " + goalScorerID);
                }
            }

            for (String assistsID : pointsDTO.getAssists()){
                Optional<Player> player = playerRepo.findById(UUID.fromString(assistsID));
                if (player.isPresent()){
                    System.out.println("adding an assist to " + player.get().getFirstName() + "  " + player.get().getSurname());
                    addAssistToPlayer(player.get(), pointsDTO.getWeek());
                }
                else {
                    throw new IllegalArgumentException("No player exists for player id " + assistsID);
                }
            }

            for (String cleanSheetID : pointsDTO.getCleanSheets()){
                Optional<Player> player = playerRepo.findById(UUID.fromString(cleanSheetID));
                if (player.isPresent()){
                    System.out.println("adding a clean sheet to " + player.get().getFirstName() + "  " + player.get().getSurname());
                    addCleanSheet(player.get(), pointsDTO.getWeek());
                }
                else {
                    throw new IllegalArgumentException("No player exists for player id " + cleanSheetID);
                }
            }
        }
        else {
            throw new IllegalArgumentException("College team ( " + pointsDTO.getTeamName() + " )  does not exist");
        }
    }

    void makePlayer(CollegeTeam activeTeam, Enums.Position position, double price, String firstName, String surname) {
        Optional<CollegeTeam> team = teamRepo.findById(activeTeam.getId());
        if (team.isPresent()) {
            Player player = new Player(team.get(), position, price, firstName, surname);
            playerRepo.save(player);
            log.debug("Made a player named ({})", player.getFirstName());
        } else {
            log.debug("Cannot make a player with that team ID");
            throw new IllegalArgumentException("Invalid Team ID");
        }
    }

    // When adding points to a player
    // Add points to all the weekly teams they belong to for the correct week
    // Update the users total score as well
    void addPointsToPlayer(Player player, Integer goals, Integer assists, Boolean cleanSheet, Integer yellowCards, Boolean redCard, Boolean manOfTheMatch, Integer week) {
        PlayerPoints newPlayerPoints = new PlayerPoints(goals, assists, manOfTheMatch, yellowCards, redCard, cleanSheet, player, week);
        newPlayerPoints.setPoints(calculateScore(newPlayerPoints));
        playerPointsRepo.save(newPlayerPoints);
        Integer score = calculateScore(newPlayerPoints);

        player.changeScore(score);
        player.changeGoals(goals);
        player.changeAssists(assists);
        playerRepo.save(player);
        // Shouldn't this also filter by week? -> Only update the week that the points are being added to
        List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(player, week);
        for (UsersWeeklyTeam uwt : weeklyTeams) {

            if (uwt.getWeek().equals(week)) {
                // Increase the weekly team score
                uwt.changePoints(score);
                weeklyTeamRepo.save(uwt);

                // Increase the users total score
                ApplicationUser user = uwt.getUser();
                user.changeTotalPoints(score);
                applicationUserRepo.save(user);
            }
        }
    }

    Integer calculateScore(PlayerPoints playerPoints) {
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
        total += playerPoints.getYellowCards() * Constants.POINTS_PER_YELLOW_CARD;
        if (playerPoints.isRedCard()) {
            total += Constants.POINTS_PER_RED_CARD;
        }
        if (playerPoints.isManOfTheMatch()) {
            total += Constants.MAN_OF_THE_MATCH_BONUS;
        }
        return total;
    }

    public List<Player> findPlayersByCollegeTeam(String team) {
        Optional<CollegeTeam> collegeTeam = teamRepo.findByName(team);
        if (collegeTeam.isPresent()) {
            return playerRepo.findByCollegeTeam(collegeTeam.get());
        } else {
            log.debug("Team does not exist");
            throw new IllegalArgumentException("Team does not exist");
        }

    }

    // Doesn't add points to players who already have had points added to them
    public void addPointsToSeveralPlayers(AddMultiplePointsDTO points) {

        for (PlayerPointsDTO dto : points.getPointsToAdd()) {
            Optional<Player> player = playerRepo.findById(UUID.fromString(dto.getPlayerID()));
            if (player.isPresent()) {
                Optional<PlayerPoints> pPoints = playerPointsRepo.findByPlayerByWeek(player.get(), dto.getWeek());
                if (pPoints.isPresent()) {
                    log.debug("Player ({}) already has points associated for week ({})", player.get().getFirstName(), dto.getWeek());
                    throw new IllegalArgumentException("Player " + player.get().getFirstName() + " already has points assigned for week " + dto.getWeek());
                }
                PlayerPoints playerPoints = new PlayerPoints(dto, player.get());
                addPointsToPlayer(playerPoints);
            } else {
                log.debug("Player does not exist");
                throw new IllegalArgumentException("Player does not exist");
            }
        }
    }

    public void addPointsToSinglePlayer(PlayerPointsDTO dto) {

        Optional<Player> player = playerRepo.findById(UUID.fromString(dto.getPlayerID()));
        if (player.isPresent()) {

            Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player.get(), dto.getWeek());
            if (playerPoints.isPresent()) {
                log.debug("Player ({}) already has points associated for week ({})", player.get().getFirstName(), dto.getWeek());
                throw new IllegalArgumentException("Player " + player.get().getFirstName() + " already has points assigned for week " + dto.getWeek());
            }
            PlayerPoints pPoints = new PlayerPoints(dto, player.get());
            addPointsToPlayer(pPoints);
        } else {
            log.debug("Player does not exist");
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    private void addGoalToPlayer(Player player, Integer week){
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()){
            player.changeGoals(1);
            playerRepo.save(player);
            System.out.println("gave them a goal");

            playerPoints.get().addGoal();
            playerPoints.get().setPoints(calculateScore(playerPoints.get()));
            System.out.println("SET PLAYER POINTS FOR PLAYER " + player.getFirstName() + " to : " + playerPoints.get().getPoints());
            playerPointsRepo.save(playerPoints.get());
            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.get().getPlayer(), week);
            for (UsersWeeklyTeam uwt : weeklyTeams) {
                ApplicationUser user = uwt.getUser();
                System.out.println("on user " + user.getFirstName());
                if (player.getPosition().equals(Enums.Position.ATTACKER)) {
                    uwt.changePoints(Constants.POINTS_PER_ATTACKER_GOAL);
                    user.changeTotalPoints(Constants.POINTS_PER_ATTACKER_GOAL);
                    System.out.println("changing the user total points by ATTACKER GOALS to" + user.getTotalPoints());
                }
                else if (player.getPosition().equals(Enums.Position.MIDFIELDER)){
                    uwt.changePoints(Constants.POINTS_PER_MIDFIELDER_GOAL);
                    user.changeTotalPoints(Constants.POINTS_PER_MIDFIELDER_GOAL);
                    System.out.println("changing the user total  points by MIDFIELDER GOALS to " + user.getTotalPoints());
                }
                else {
                    uwt.changePoints(Constants.POINTS_PER_DEFENDER_GOAL);
                    user.changeTotalPoints(Constants.POINTS_PER_DEFENDER_GOAL);
                    System.out.println("changing the user total points by  DEFENDER GOALS to " + user.getTotalPoints());
                }
                weeklyTeamRepo.save(uwt);
                applicationUserRepo.save(user);
            }
        }
        else {
            log.debug("player had no points object - made a new one");
            PlayerPoints playerPoints1 = new PlayerPoints(0, 0, false, 0, false, false, player, week);
            playerPointsRepo.save(playerPoints1);
            addGoalToPlayer(player, week);
        }
    }

    private void addAssistToPlayer(Player player, Integer week){
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()){
            player.changeAssists(1);
            playerRepo.save(player);
            playerPoints.get().addAssist();
            playerPoints.get().setPoints(calculateScore(playerPoints.get()));
            playerPointsRepo.save(playerPoints.get());

            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.get().getPlayer(), week);
            for (UsersWeeklyTeam uwt : weeklyTeams) {
                ApplicationUser user = uwt.getUser();
                uwt.changePoints(Constants.POINTS_PER_ASSIST);
                user.changeTotalPoints(Constants.POINTS_PER_ASSIST);
                weeklyTeamRepo.save(uwt);
                applicationUserRepo.save(user);
            }
        }
        else {
            log.debug("player had no points object - made a new one with 1 assist");
            PlayerPoints playerPoints1 = new PlayerPoints(0, 0, false, 0, false, false, player, week);
            playerPointsRepo.save(playerPoints1);
            addAssistToPlayer(player, week);
        }
    }

    public MostValuableDTO findMostValuablePlayer(String id){
        Optional<ApplicationUser> user = applicationUserRepo.findById(UUID.fromString(id));
        if (user.isPresent()) {
            HashMap<UUID, Integer> pointsPerPlayer = new HashMap<>();
            Optional<UsersWeeklyTeam> mostRecent = weeklyTeamRepo.findActiveTeam(user.get());

            HashMap<UUID, Integer> pointsPerCollegeTeam = new HashMap<>();

            if (mostRecent.isPresent()) {
                for (Player player : mostRecent.get().getPlayers()) {
                    pointsPerPlayer.put(player.getId(), 0);
                    pointsPerCollegeTeam.putIfAbsent(player.getActiveTeam().getId(), 0);
                }
                List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findWeeklyTeams(user.get());
                for (UsersWeeklyTeam weeklyTeam : weeklyTeams) {
                    for (Player player : weeklyTeam.getPlayers()) {
                        if (pointsPerPlayer.containsKey(player.getId())) {
                            Optional<Integer> points = playerPointsRepo.findScoreByPlayerByWeek(player, weeklyTeam.getWeek());
                            if (points.isPresent()) {
                                pointsPerPlayer.put(player.getId(), pointsPerPlayer.get(player.getId()) + points.get());
                                pointsPerCollegeTeam.put(player.getActiveTeam().getId(), pointsPerCollegeTeam.get(player.getActiveTeam().getId()) + points.get());
                            }
                        }
                    }
                }
            } else {
                throw new IllegalArgumentException("No active team");
            }

            UUID maxPlayer = findMostValuableID(pointsPerPlayer);
            UUID maxCollegeTeam = findMostValuableID(pointsPerCollegeTeam);

            Optional<Player> player = playerRepo.findById(maxPlayer);
            Optional<CollegeTeam> collegeTeam = teamRepo.findById(maxCollegeTeam);

            if (!player.isPresent() || !pointsPerPlayer.containsKey(player.get().getId())) {
                throw new IllegalArgumentException("No max player");
            }

            if (!collegeTeam.isPresent() || !pointsPerCollegeTeam.containsKey(collegeTeam.get().getId())) {
                throw new IllegalArgumentException("No max college team present");
            }

            int playerScore = pointsPerPlayer.get(player.get().getId());
            int collegeScore = pointsPerCollegeTeam.get(collegeTeam.get().getId());

            MostValuableDTO mostValuableDTO = new MostValuableDTO(player.get(), playerScore, collegeTeam.get(), collegeScore);

            System.out.println("Best player score = " + playerScore);
            System.out.println("Best college score = " + collegeScore);
            return mostValuableDTO;
        }
        else {
            throw new IllegalArgumentException("User does not exist");
        }
    }

    private UUID findMostValuableID(HashMap<UUID, Integer> hashMap){
        UUID maxID = null;
        int currentMaxScore = -100;
        for (Map.Entry<UUID, Integer> item : hashMap.entrySet()) {
            if (item.getValue() > currentMaxScore){
                currentMaxScore = item.getValue();
                maxID = item.getKey();
            }
        }
        return maxID;
    }

    private void addCleanSheet(Player player, Integer week){
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()){
            playerPoints.get().setCleanSheet(true);
            playerPoints.get().setPoints(calculateScore(playerPoints.get()));
            playerPointsRepo.save(playerPoints.get());

            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.get().getPlayer(), week);
            for (UsersWeeklyTeam uwt : weeklyTeams) {
                ApplicationUser user = uwt.getUser();
                uwt.changePoints(Constants.POINTS_PER_CLEAN_SHEET);
                user.changeTotalPoints(Constants.POINTS_PER_CLEAN_SHEET);
                weeklyTeamRepo.save(uwt);
                applicationUserRepo.save(user);
            }
        }
        else {
            System.out.println("player had no points object - made a new one with a clean sheet");
            PlayerPoints playerPoints1 = new PlayerPoints(0, 0, false, 0, false, false, player, week);
            playerPointsRepo.save(playerPoints1);
            addCleanSheet(player, week);
        }
    }

    public void editPoints(PlayerPointsDTO dto) {
        Optional<Player> player = playerRepo.findById(UUID.fromString(dto.getPlayerID()));
        if (player.isPresent()) {
            Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player.get(), dto.getWeek());
            if (playerPoints.isPresent()) {
                Integer goalsBefore = playerPoints.get().getNumberOfGoals();
                Integer goalsAssists = playerPoints.get().getNumberOfAssists();
                Integer previousScore = calculateScore(playerPoints.get());

                PlayerPoints newPlayerPoints = new PlayerPoints(dto, player.get());
                newPlayerPoints.setPoints(calculateScore(newPlayerPoints));

                Integer newScore = calculateScore(newPlayerPoints);
                playerPoints.get().setPoints(newScore);
                playerPoints.get().setValues(newPlayerPoints);
                Integer differenceInScores = newScore - previousScore;

                player.get().changeGoals(newPlayerPoints.getNumberOfGoals() - goalsBefore);
                player.get().changeAssists(newPlayerPoints.getNumberOfAssists() - goalsAssists);
                player.get().changeScore(differenceInScores);
                playerPointsRepo.save(playerPoints.get());
                playerRepo.save(player.get());

                List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.get().getPlayer(), dto.getWeek());
                for (UsersWeeklyTeam uwt : weeklyTeams) {
                    uwt.changePoints(differenceInScores);
                    weeklyTeamRepo.save(uwt);

                    ApplicationUser user = uwt.getUser();
                    user.changeTotalPoints(differenceInScores);
                    applicationUserRepo.save(user);
                }
            } else {
                log.debug("Player ({}) already has points associated for week ({})", player.get().getFirstName(), dto.getWeek());
                throw new IllegalArgumentException("Player " + player.get().getFirstName() + " does not have points assigned for week " + dto.getWeek());
            }
        } else {
            log.debug("Player does not exist");
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    public void addPointsToPlayer(PlayerPoints playerPoints) {
        Integer score = calculateScore(playerPoints);
        playerPoints.setPoints(score);
        playerPointsRepo.save(playerPoints);
        playerPoints.getPlayer().changeScore(score);
        playerPoints.getPlayer().changeGoals(playerPoints.getNumberOfGoals());
        playerPoints.getPlayer().changeAssists(playerPoints.getNumberOfAssists());
        playerRepo.save(playerPoints.getPlayer());
        List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.getPlayer(), playerPoints.getWeek());
        for (UsersWeeklyTeam uwt : weeklyTeams) {

            if (uwt.getWeek().equals(playerPoints.getWeek())) {
                // Increase the weekly team score
                uwt.changePoints(score);
                weeklyTeamRepo.save(uwt);

                // Increase the users total score
                ApplicationUser user = uwt.getUser();
                user.changeTotalPoints(score);
                applicationUserRepo.save(user);
            }
        }
    }

    public PlayerPoints findStatsForPlayerInWeek(String playerID, Integer week) {
        Optional<Player> player = playerRepo.findById(UUID.fromString(playerID));
        if (player.isPresent()) {
            Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player.get(), week);
            if (playerPoints.isPresent()) {
                return playerPoints.get();
            } else {
                log.debug("Player has no points for week ({})", week);
                throw new IllegalArgumentException("This player does not have any points for that week");
            }
        } else {
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    // Possibly just need this to return 0 if the player doesn't exist
    Integer findPointsForPlayerInWeek(Player player, Integer week) {
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()) {
            return calculateScore(playerPoints.get());
        } else if (week == 0) {
            return 0;
        } else {
            log.debug("Player has no points for that week");
            return 0;
        }
    }

    public List<PlayerPoints> findPlayerWithMostPointsInWeek(Integer week) {
        return playerPointsRepo.findPlayerWithMostPoints(week);
    }

    // Should be careful here -> could cause some teams to become invalid
    public void changePlayersCollegeTeam(String playerID, String collegeName) {

        Optional<Player> player = playerRepo.findById(UUID.fromString(playerID));
        if (player.isPresent()) {
            Optional<CollegeTeam> collegeTeam = teamRepo.findByName(collegeName);
            if (collegeTeam.isPresent()) {
                player.get().setActiveTeam(collegeTeam.get());
            } else {
                log.debug("College team does not exist");
                throw new IllegalArgumentException("College team does not exist");
            }
        } else {
            log.debug("Player does not exist");
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    public List<Player> formatFilter(String team, Enums.Position position, Integer min, Integer max, String name, Enums.SORT_BY sortBy) {
        System.out.println("received request - name = " + name);
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
                log.debug("College team ({}) does not exist", team);
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
        }
        else if (sorting == Enums.SORT_BY.PERCENTAGE){
            return playerRepo.filterPlayersSortByScore(team, position, minPrice, maxPrice, searchName);
        }

        else {
            return playerRepo.filterPlayersSortByPrice(team, position, minPrice, maxPrice, searchName);
        }
    }

    public List<PlayerDTO> generateDTOFilterReturns(String team, Enums.Position position, Integer min, Integer max, String name, Enums.SORT_BY sortBy){
        List<Player> filteredPlayers = formatFilter(team, position, min, max, name, sortBy);
        List<PlayerDTO> responses = new ArrayList<>();
        Map<UUID, Double> percentagesLookup = new HashMap<>();

        if (sortBy.equals(Enums.SORT_BY.PERCENTAGE)){
            List<PercentageOfTeams> allPercentages = percentageOfTeamsRepo.findAll();
            for (PercentageOfTeams playersPercentage : allPercentages){
                percentagesLookup.put(playersPercentage.getId(), playersPercentage.getPercentageTeamsIn());
            }
        }

        for (Player p : filteredPlayers) {
            PlayerDTO playerDTO = new PlayerDTO(p);
            playerDTO.setPercentages(percentagesLookup.getOrDefault(p.getId(), 0.0));
            responses.add(playerDTO);
        }

        if (sortBy.equals(Enums.SORT_BY.PERCENTAGE)){
            responses.sort(Comparator.comparing(PlayerDTO::getPercentages).reversed());
        }

        return responses;
    }


    private void setPercentagesOfPlayersInTeams(){
        percentageOfTeamsRepo.deleteAll();
        List<UsersWeeklyTeam> allTeams = weeklyTeamRepo.findAllActiveTeams();
        Integer totalNumberOfTeams = allTeams.size();

        HashMap<UUID, Double> percentages = new HashMap<>();

        for (UsersWeeklyTeam team : allTeams){
            for (Player player : team.getPlayers()){
                percentages.put(player.getId(), percentages.getOrDefault(player.getId(), 0.0) + 1);
            }
        }

        for (Map.Entry<UUID, Double> stats : percentages.entrySet()) {
            percentages.put(stats.getKey(), 100*stats.getValue()/totalNumberOfTeams);
            percentageOfTeamsRepo.save(new PercentageOfTeams(stats.getKey(), stats.getValue()));
        }
    }

    public List<TeamHistoryDTO> history(Integer week){
        List<PlayerPoints> playerPoints = week != -1 ? playerPointsRepo.findByWeek(week) : playerPointsRepo.findAll();
        Map<String, TeamHistoryDTO> history = new HashMap<>();
        for (PlayerPoints points : playerPoints){
            if (points.getNumberOfGoals() > 0 || points.getNumberOfAssists() > 0){
                Optional<Player> player = playerRepo.findById(points.getPlayer().getId());
                if (!player.isPresent()){
                    throw new IllegalArgumentException("Player does not exist");
                }
                String teamName = player.get().getActiveTeam().getName();
                history.putIfAbsent(teamName, new TeamHistoryDTO(teamName, new ArrayList<>(), new ArrayList<>()));
                if (points.getNumberOfGoals() > 0){
                    SingleHistoryDTO goalHistory = new SingleHistoryDTO(player.get().getFirstName(), player.get().getSurname(), points.getNumberOfGoals());
                    history.get(teamName).addGoalScorer(goalHistory);
                }
                if (points.getNumberOfAssists() > 0){
                    SingleHistoryDTO goalHistory = new SingleHistoryDTO(player.get().getFirstName(), player.get().getSurname(), points.getNumberOfAssists());
                    history.get(teamName).addAssist(goalHistory);
                }
            }
        }
        List<TeamHistoryDTO> allHistory = new ArrayList<>();
        for (Map.Entry<String, TeamHistoryDTO> stats : history.entrySet()) {
            stats.getValue().sortGoalScorers();
            stats.getValue().sortAssists();
            allHistory.add(stats.getValue());
        }
        allHistory.sort(Comparator.comparing(TeamHistoryDTO::getTeamName));
        return allHistory;
    }

}

