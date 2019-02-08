package uk.co.scottlogic.gradProject.server.repos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.Application;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.League;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;
import uk.co.scottlogic.gradProject.server.routers.dto.LeagueReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserInLeagueReturnDTO;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class LeagueManager {

    private static final Logger log = LoggerFactory.getLogger(LeagueManager.class);

    private LeagueRepo leagueRepo;
    private WeeklyTeamRepo weeklyTeamRepo;

    @Autowired
    public LeagueManager(LeagueRepo leagueRepo, WeeklyTeamRepo weeklyTeamRepo) {
        this.leagueRepo = leagueRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
    }

    public String createLeague(ApplicationUser owner, String leagueName, Integer startWeek) {
        Optional<League> duplicate = leagueRepo.findByLeagueName(leagueName);
        if (duplicate.isPresent()){
            throw new IllegalArgumentException("A league with that name already exists");
        }
        League league = new League(owner, leagueName, new ArrayList<>(), startWeek);
        league.addParticipant(owner);
        leagueRepo.save(league);
        return league.getId().toString();
    }

    List<UserInLeagueReturnDTO> findUsersInLeague(League league) {
        List<ApplicationUser> participants = league.getParticipants();
        List<UserInLeagueReturnDTO> orderedUsers = new ArrayList<>();
        for (ApplicationUser u : participants){
            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByUserAfterWeek(u, league.getStartWeek());
            Integer userScore = 0;
            for (UsersWeeklyTeam uwt : weeklyTeams){
                userScore += uwt.getPoints();
            }
            orderedUsers.add(new UserInLeagueReturnDTO(u, 0, userScore));
        }
        orderedUsers.sort(Comparator.comparing(UserInLeagueReturnDTO::getPoints).reversed());
        return orderedUsers;
    }

    public void leaveLeague(ApplicationUser user, String leagueName){

        if (leagueName.equals("original")){
            log.debug("({}) ({}) attempted to leave the original league", user.getFirstName(), user.getSurname());
            throw new IllegalArgumentException("Can't leave this league");
        }

        Optional<League> league = leagueRepo.findByLeagueName(leagueName);

        if (league.isPresent()){
            boolean removed = false;
            int index  = -1;
            int correct = -1;
            for (ApplicationUser u : league.get().getParticipants()){
                index += 1;
                if (u.getId().equals(user.getId())){
                    correct = index;
                    removed = true;
                }
            }
            if (removed){
                league.get().getParticipants().remove(correct);
                leagueRepo.save(league.get());
            }
            else {
                log.debug("User ({}) ({}) is not in a league by name ){})", user.getFirstName(), user.getSurname(), leagueName);
                throw new IllegalArgumentException("User can't leave league because they are not in it");
            }
        }
        else {
            log.debug("League does not exist");
            throw new IllegalArgumentException("League does not exist");
        }
    }

    public List<UserInLeagueReturnDTO> findUsersInLeagueAndPositions(String leagueName) {
        Optional<League> league = leagueRepo.findByLeagueName(leagueName);
        if (league.isPresent()) {
            List<UserInLeagueReturnDTO> usersInLeague = findUsersInLeague(league.get());
            int position = 0;
            for (UserInLeagueReturnDTO u : usersInLeague) {
                position += 1;
                u.setPosition(position);
            }
            return usersInLeague;
        } else {
            throw new IllegalArgumentException("League does not exist with that league name");
        }
    }

    // Need to stop the same player joining a league multiple times
    public LeagueReturnDTO addPlayerToLeague(ApplicationUser user, String code) {
        Optional<League> league = leagueRepo.findByCodeToJoin(code);
        if (league.isPresent()) {
            League l = league.get();
            if (userExistsInLeague(user, l)) {
                log.debug("User ({}) ({}) is already in league ({})", user.getFirstName(), user.getSurname(), l.getLeagueName());
                throw new IllegalArgumentException("You are already in that league");
            }
            String leagueCode = l.getCodeToJoin();
            if (leagueCode.equals(code)) {
                l.addParticipant(user);
                leagueRepo.save(l);
                int position = findPositionOfUserInLeague(user, l);
                return new LeagueReturnDTO(l.getLeagueName(), position);
            } else {
                log.debug("Invalid code");
                throw new IllegalArgumentException("Invalid code for league");  // Never happens?
            }
        } else {
            log.debug("Invalid code for league");
            throw new IllegalArgumentException("Invalid code for league");
        }
    }

    boolean userExistsInLeague(ApplicationUser user, League league) {

        // Should make this not use the sorting method
        List<UserInLeagueReturnDTO> usersInLeague = findUsersInLeague(league);
        for (UserInLeagueReturnDTO u : usersInLeague) {
            if (u.getUserID().equals(user.getId())) {
                return true;
            }
        }
        return false;
    }

    Integer findPositionOfUserInLeague(ApplicationUser user, League league) {
        List<UserInLeagueReturnDTO> usersInLeague = findUsersInLeague(league);
        for (UserInLeagueReturnDTO u : usersInLeague){
            System.out.println("Points = " + u.getPoints());
            System.out.println("Name = " + u.getFirstName());
        }
        int position = 0;
        for (UserInLeagueReturnDTO u : usersInLeague) {
            position += 1;
            if (u.getUserID().equals(user.getId())) {
                return position;
            }
        }
        throw new IllegalArgumentException("User not in league?");
    }

    // TO:DO
    // SURELY this can be improved
    public List<LeagueReturnDTO> findLeaguesPlayerIsIn(ApplicationUser user) {

        List<LeagueReturnDTO> returnDTOS = new ArrayList<>();
        Iterable<League> userLeagues = leagueRepo.findAll();

        List<League> allLeagues = new ArrayList<>();
        userLeagues.forEach(allLeagues::add);

        for (League l : allLeagues) {
            List<UserInLeagueReturnDTO> participants = findUsersInLeague(l);
            int position = 0;
            for (UserInLeagueReturnDTO u : participants) {
                position += 1;
                if (u.getUserID().equals(user.getId())) {
                    returnDTOS.add(new LeagueReturnDTO(l.getLeagueName(), position));
                    break;
                }
            }
        }
        return returnDTOS;
    }

}
