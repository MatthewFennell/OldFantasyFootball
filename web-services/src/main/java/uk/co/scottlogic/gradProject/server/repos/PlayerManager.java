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

    public void checkCaptainDoingCorrectly(ApplicationUser user, String comparison){
        if (!isAdmin(user)){
            if (!user.getCaptainOf().getName().equals(comparison)){
                throw new IllegalAccessError("That is forbidden");
            }
        }
    }

    public void checkPlayerBelongsToCaptain(ApplicationUser user, String playerID) {
        if (!isAdmin(user)) {
            Optional<Player> player = playerRepo.findById(UUID.fromString(playerID));
            if (!player.isPresent()) {
                throw new IllegalArgumentException("Player does not exist");
            }
            if (!player.get().getActiveTeam().getName().equals(user.getCaptainOf().getName())) {
                throw new IllegalAccessError("That player does not belong to your team");
            }
        }
    }

    private boolean isAdmin(ApplicationUser user){
        Set<UserAuthority> roles = user.getAuthorityList();
        for (UserAuthority authority : roles){
            if (authority.getRole().equals(Constants.ADMIN_STRING)){
                return true;
            }
        }
        return false;
    }

    public void makePlayer(ApplicationUser user, MakePlayerDTO makePlayerDTO) {
        Optional<CollegeTeam> team = teamRepo.findByName(makePlayerDTO.getCollegeTeam());
        if (team.isPresent()) {

            Optional<Player> p = playerRepo.findByCollegeTeamByFirstnameBySurname(team.get(), makePlayerDTO.getFirstName(), makePlayerDTO.getSurname());
            if (p.isPresent()){
                throw new IllegalArgumentException("Cannot have two players with the same name in the same team");
            }

            Player player = new Player(team.get(), makePlayerDTO.getPosition(), makePlayerDTO.getPrice(), makePlayerDTO.getFirstName(), makePlayerDTO.getSurname());
            playerRepo.save(player);
            log.info("Username " + user.getUsername() + " made player " + player.getFirstName() + " " + player.getSurname() + " for team " + player.getActiveTeam().getName());
        } else {
            throw new IllegalArgumentException("Invalid team");
        }
    }

    public void deletePlayer(ApplicationUser user, String playerID) {
        Optional<Player> player = playerRepo.findById(UUID.fromString(playerID));
        if (player.isPresent()) {
            if (playerExistsInWeeklyTeam(player.get())) {
                throw new IllegalArgumentException("That player is in a weekly team - can't delete them");
            } else {
                playerRepo.delete(player.get());
                log.info("Username " + user.getUsername() + " deleted player " + player.get().getFirstName() + " " + player.get().getSurname());
            }
        } else {
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
    public void submitResults(ApplicationUser user, SubmitPointsDTO pointsDTO){
        setPercentagesOfPlayersInTeams();

        Integer maxWeek = weeklyTeamRepo.findNumberOfWeeks();
        if (pointsDTO.getWeek() > maxWeek){
            throw new IllegalArgumentException("Missing out a week of points. The next week should be " + (maxWeek));
        }

        if (pointsDTO.getWeek() < 0){
            throw new IllegalArgumentException("Cannot submit points for negative week");
        }

        if (pointsDTO.getManOfTheMatch().equals("")) {
            throw new IllegalArgumentException("Must select a man of the match");
        }

        Optional<Player> manOfTheMatchPlayer = playerRepo.findById(UUID.fromString(pointsDTO.getManOfTheMatch()));
        manOfTheMatchPlayer.ifPresent(player1 -> addManOfTheMatch(user, player1, pointsDTO.getWeek()));

        Optional<CollegeTeam> collegeTeam = teamRepo.findByName(pointsDTO.getTeamName());
        if (collegeTeam.isPresent()){

            if (pointsDTO.getGoalsFor().equals(pointsDTO.getGoalsAgainst())){
                collegeTeam.get().addDraw();
            }
            else if (pointsDTO.getGoalsFor() > pointsDTO.getGoalsAgainst()){
                collegeTeam.get().addWin();
            }
            else {
                collegeTeam.get().addLoss();
            }
            collegeTeam.get().addGoalsFor(pointsDTO.getGoalsFor());
            collegeTeam.get().addGoalsAgainst(pointsDTO.getGoalsAgainst());

            for (String goalScorerID : pointsDTO.getGoalScorers()){
                Optional<Player> player = playerRepo.findById(UUID.fromString(goalScorerID));
                if (player.isPresent()){
                    addGoalToPlayer(user, player.get(), pointsDTO.getWeek());
                }
                else {
                    throw new IllegalArgumentException("No player exists for player id " + goalScorerID);
                }
            }

            for (String assistsID : pointsDTO.getAssists()){
                Optional<Player> player = playerRepo.findById(UUID.fromString(assistsID));
                if (player.isPresent()){
                    addAssistToPlayer(user, player.get(), pointsDTO.getWeek());
                }
                else {
                    throw new IllegalArgumentException("No player exists for player id " + assistsID);
                }
            }

            for (String cleanSheetID : pointsDTO.getCleanSheets()){
                Optional<Player> player = playerRepo.findById(UUID.fromString(cleanSheetID));
                if (player.isPresent()){
                    addCleanSheet(user, player.get(), pointsDTO.getWeek());
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
                    throw new IllegalArgumentException("Player " + player.get().getFirstName() + " already has points assigned for week " + dto.getWeek());
                }
                PlayerPoints playerPoints = new PlayerPoints(dto, player.get());
                addPointsToPlayer(playerPoints);
            } else {
                throw new IllegalArgumentException("Player does not exist");
            }
        }
    }

    public void addPointsToSinglePlayer(PlayerPointsDTO dto) {

        Optional<Player> player = playerRepo.findById(UUID.fromString(dto.getPlayerID()));
        if (player.isPresent()) {

            Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player.get(), dto.getWeek());
            if (playerPoints.isPresent()) {
                throw new IllegalArgumentException("Player " + player.get().getFirstName() + " already has points assigned for week " + dto.getWeek());
            }
            PlayerPoints pPoints = new PlayerPoints(dto, player.get());
            addPointsToPlayer(pPoints);
        } else {
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    private void addGoalToPlayer(ApplicationUser requestMaker, Player player, Integer week){
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()){
            player.changeGoals(1);
            playerPoints.get().addGoal();
            playerPoints.get().setPoints(calculateScore(playerPoints.get()));
            playerPointsRepo.save(playerPoints.get());
            log.info("Username " + requestMaker.getUsername() + " added a goal in week " + week + " to " + player.toString());
            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.get().getPlayer(), week);
            for (UsersWeeklyTeam uwt : weeklyTeams) {
                ApplicationUser user = uwt.getUser();
                if (player.getPosition().equals(Enums.Position.ATTACKER)) {
                    uwt.changePoints(Constants.POINTS_PER_ATTACKER_GOAL);
                    user.changeTotalPoints(Constants.POINTS_PER_ATTACKER_GOAL);
                    player.changeScore(Constants.POINTS_PER_ATTACKER_GOAL);
                }
                else if (player.getPosition().equals(Enums.Position.MIDFIELDER)){
                    uwt.changePoints(Constants.POINTS_PER_MIDFIELDER_GOAL);
                    user.changeTotalPoints(Constants.POINTS_PER_MIDFIELDER_GOAL);
                    player.changeScore(Constants.POINTS_PER_MIDFIELDER_GOAL);
                }
                else {
                    uwt.changePoints(Constants.POINTS_PER_DEFENDER_GOAL);
                    user.changeTotalPoints(Constants.POINTS_PER_DEFENDER_GOAL);
                    player.changeScore(Constants.POINTS_PER_DEFENDER_GOAL);
                }
                playerRepo.save(player);
                weeklyTeamRepo.save(uwt);
                applicationUserRepo.save(user);
            }
        }
        else {
            PlayerPoints playerPoints1 = new PlayerPoints(0, 0, false, 0, false, false, player, week);
            playerPointsRepo.save(playerPoints1);
            addGoalToPlayer(requestMaker ,player, week);
        }
    }

    private void addManOfTheMatch(ApplicationUser requestMaker, Player player, Integer week){
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()){
            playerPoints.get().setManOfTheMatch(true);
            playerPoints.get().setPoints(calculateScore(playerPoints.get()));
            playerPointsRepo.save(playerPoints.get());
            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.get().getPlayer(), week);
            player.changeScore(Constants.MAN_OF_THE_MATCH_BONUS);
            playerRepo.save(player);
            log.info("Username " + requestMaker.getUsername() + " set Man of the Match in week " + week + " to " + player.toString());
            for (UsersWeeklyTeam uwt : weeklyTeams) {
                ApplicationUser user = uwt.getUser();
                uwt.changePoints(Constants.MAN_OF_THE_MATCH_BONUS);
                user.changeTotalPoints(Constants.MAN_OF_THE_MATCH_BONUS);
                weeklyTeamRepo.save(uwt);
                applicationUserRepo.save(user);
            }
        }
        else {
            PlayerPoints playerPoints1 = new PlayerPoints(0, 0, false, 0, false, false, player, week);
            playerPointsRepo.save(playerPoints1);
            addManOfTheMatch(requestMaker, player, week);
        }
    }

    private void addAssistToPlayer(ApplicationUser requestMaker, Player player, Integer week){
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()){
            player.changeAssists(1);
            playerPoints.get().addAssist();
            playerPoints.get().setPoints(calculateScore(playerPoints.get()));
            playerPointsRepo.save(playerPoints.get());
            player.changeScore(Constants.POINTS_PER_ASSIST);
            playerRepo.save(player);
            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.get().getPlayer(), week);
            log.info("Username " + requestMaker.getUsername() + " added an assist in week " + week + " to " + player.toString());
            for (UsersWeeklyTeam uwt : weeklyTeams) {
                ApplicationUser user = uwt.getUser();
                uwt.changePoints(Constants.POINTS_PER_ASSIST);
                user.changeTotalPoints(Constants.POINTS_PER_ASSIST);
                weeklyTeamRepo.save(uwt);
                applicationUserRepo.save(user);
            }
        }
        else {
            PlayerPoints playerPoints1 = new PlayerPoints(0, 0, false, 0, false, false, player, week);
            playerPointsRepo.save(playerPoints1);
            addAssistToPlayer(requestMaker, player, week);
        }
    }

    public MostValuableDTO findMostValuablePlayer(String id){
        Optional<ApplicationUser> user = applicationUserRepo.findById(UUID.fromString(id));
        if (user.isPresent()) {
            HashMap<UUID, Integer> pointsPerPlayer = new HashMap<>();
            Optional<UsersWeeklyTeam> mostRecent = weeklyTeamRepo.findActiveTeam(user.get());
            if (mostRecent.isPresent()) {
                for (Player player : mostRecent.get().getPlayers()) {
                    pointsPerPlayer.put(player.getId(), 0);
                }
                List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findWeeklyTeams(user.get());
                for (UsersWeeklyTeam weeklyTeam : weeklyTeams) {
                    for (Player player : weeklyTeam.getPlayers()) {
                        if (pointsPerPlayer.containsKey(player.getId())) {
                            Optional<Integer> points = playerPointsRepo.findScoreByPlayerByWeek(player, weeklyTeam.getWeek());
                            points.ifPresent(integer -> pointsPerPlayer.put(player.getId(), pointsPerPlayer.get(player.getId()) + integer));
                        }
                    }
                }
            } else {
                throw new IllegalArgumentException("No active team");
            }

            UUID maxPlayer = findMostValuableID(pointsPerPlayer);

            Optional<Player> player = playerRepo.findById(maxPlayer);

            if (!player.isPresent() || !pointsPerPlayer.containsKey(player.get().getId())) {
                throw new IllegalArgumentException("No max player");
            }

            int playerScore = pointsPerPlayer.get(player.get().getId());

            return new MostValuableDTO(player.get(), playerScore);
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

    private void addCleanSheet(ApplicationUser requestMaker, Player player, Integer week){
        Optional<PlayerPoints> playerPoints = playerPointsRepo.findByPlayerByWeek(player, week);
        if (playerPoints.isPresent()){
            playerPoints.get().setCleanSheet(true);
            playerPoints.get().setPoints(calculateScore(playerPoints.get()));
            playerPointsRepo.save(playerPoints.get());
            player.changeScore(Constants.POINTS_PER_CLEAN_SHEET);
            playerRepo.save(player);
            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByPlayersAndWeek(playerPoints.get().getPlayer(), week);
            log.info("Username " + requestMaker.getUsername() + " added a Clean Sheet in week " + week + " to " + player.toString());
            for (UsersWeeklyTeam uwt : weeklyTeams) {
                ApplicationUser user = uwt.getUser();
                uwt.changePoints(Constants.POINTS_PER_CLEAN_SHEET);
                user.changeTotalPoints(Constants.POINTS_PER_CLEAN_SHEET);
                weeklyTeamRepo.save(uwt);
                applicationUserRepo.save(user);
            }
        }
        else {
            PlayerPoints playerPoints1 = new PlayerPoints(0, 0, false, 0, false, false, player, week);
            playerPointsRepo.save(playerPoints1);
            addCleanSheet(requestMaker, player, week);
        }
    }

    public void editPoints(ApplicationUser requestMaker, PlayerPointsDTO dto) {
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
                Optional<Player> newPlayer = playerRepo.findById(UUID.fromString(dto.getPlayerID()));
                if (!newPlayer.isPresent()){
                    throw new IllegalArgumentException("Player does not exist");
                }
                PlayerPoints newStats = new PlayerPoints(dto.getGoals(), dto.getAssists(), dto.isManOfTheMatch(), dto.getYellowCards(), dto.isRedCard(), dto.isCleanSheet(), newPlayer.get(), dto.getWeek());
                player.get().changeScore(calculateScore(newStats));
                playerRepo.save(player.get());
                addPointsToPlayer(newStats);
            }
        } else {
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
            return playerPoints.orElse(null);
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
                throw new IllegalArgumentException("College team does not exist");
            }
        } else {
            throw new IllegalArgumentException("Player does not exist");
        }
    }

    List<Player> formatFilter(String team, Enums.Position position, Integer min, Integer max, String name, Enums.SORT_BY sortBy) {
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
        int totalNumberOfTeams = allTeams.size();

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
                    boolean addedGoalscorer = false;
                    for (SingleHistoryDTO stat : history.get(teamName).getGoalScorers()){
                            if (stat.getFirstname().equals(player.get().getFirstName()) && stat.getSurname().equals(player.get().getSurname())){
                                stat.setAmount(stat.getAmount() + points.getNumberOfGoals());
                                addedGoalscorer = true;
                            }
                    }
                    if (!addedGoalscorer) {
                        SingleHistoryDTO goalHistory = new SingleHistoryDTO(player.get().getFirstName(), player.get().getSurname(), points.getNumberOfGoals());
                        history.get(teamName).addGoalScorer(goalHistory);
                    }
                }
                if (points.getNumberOfAssists() > 0){
                    boolean addedAssist = false;
                    for (SingleHistoryDTO stat : history.get(teamName).getAssists()){
                        if (stat.getFirstname().equals(player.get().getFirstName()) && stat.getSurname().equals(player.get().getSurname())){
                            stat.setAmount(stat.getAmount() + points.getNumberOfAssists());
                            addedAssist = true;
                        }
                    }
                    if (!addedAssist) {
                        SingleHistoryDTO goalHistory = new SingleHistoryDTO(player.get().getFirstName(), player.get().getSurname(), points.getNumberOfAssists());
                        history.get(teamName).addAssist(goalHistory);
                    }
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

