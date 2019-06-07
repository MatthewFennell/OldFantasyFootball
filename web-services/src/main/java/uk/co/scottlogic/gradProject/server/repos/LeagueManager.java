package uk.co.scottlogic.gradProject.server.repos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.League;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;
import uk.co.scottlogic.gradProject.server.routers.dto.LeagueAdminDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.LeagueReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserInLeagueReturnDTO;

import javax.swing.text.html.Option;
import java.util.*;

@Service
public class LeagueManager {

    private LeagueRepo leagueRepo;
    private WeeklyTeamRepo weeklyTeamRepo;
    private ApplicationUserRepo applicationUserRepo;

    @Autowired
    public LeagueManager(LeagueRepo leagueRepo, WeeklyTeamRepo weeklyTeamRepo, ApplicationUserRepo applicationUserRepo) {
        this.leagueRepo = leagueRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.applicationUserRepo = applicationUserRepo;
    }

    public LeagueReturnDTO createLeague(ApplicationUser owner, String leagueName, Integer startWeek) {
        Optional<League> duplicate = leagueRepo.findByLeagueName(leagueName);
        if (duplicate.isPresent()) {
            throw new IllegalArgumentException("A league with that name already exists");
        }
        League league = new League(owner, leagueName, new ArrayList<>(), startWeek);
        league.addParticipant(owner);
        leagueRepo.save(league);
        return new LeagueReturnDTO(league);
    }

    private List<UserInLeagueReturnDTO> findUsersInLeague(League league) {
        List<ApplicationUser> participants = league.getParticipants();
        List<UserInLeagueReturnDTO> orderedUsers = new ArrayList<>();
        for (ApplicationUser u : participants) {
            List<UsersWeeklyTeam> weeklyTeams = weeklyTeamRepo.findByUserAfterWeek(u, league.getStartWeek());
            Integer userScore = 0;
            for (UsersWeeklyTeam uwt : weeklyTeams) {
                userScore += uwt.getPoints();
            }
            orderedUsers.add(new UserInLeagueReturnDTO(u, 0, userScore));
        }
        orderedUsers.sort(Comparator.comparing(UserInLeagueReturnDTO::getPoints).reversed());
        return orderedUsers;
    }

    public void leaveLeague(ApplicationUser user, String leagueName) {
        if (leagueName.equals(Constants.INITIAL_LEAGUE_NAME)) {
            throw new IllegalArgumentException("Can't leave this league");
        }
        Optional<League> league = leagueRepo.findByLeagueName(leagueName);
        if (league.isPresent()) {
            if (league.get().getOwner().getId().equals(user.getId()) && league.get().getParticipants().size() > 1){
                throw new IllegalArgumentException("An admin cannot leave the league if other players are in it!");
            }
            boolean removed = false;
            int index = -1;
            int correct = -1;
            for (ApplicationUser u : league.get().getParticipants()) {
                index += 1;
                if (u.getId().equals(user.getId())) {
                    correct = index;
                    removed = true;
                }
            }
            if (removed) {
                league.get().getParticipants().remove(correct);
                leagueRepo.save(league.get());
            } else {
                throw new IllegalArgumentException("User can't leave league because they are not in it");
            }
        } else {
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
                throw new IllegalArgumentException("You are already in that league");
            }
            String leagueCode = l.getCodeToJoin();
            if (leagueCode.equals(code)) {
                l.addParticipant(user);
                leagueRepo.save(l);
                int position = findPositionOfUserInLeague(user, l);
                return new LeagueReturnDTO(l.getLeagueName(), position, l.getCodeToJoin());
            } else {
                throw new IllegalArgumentException("Invalid code for league");  // Never happens?
            }
        } else {
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

    private Integer findPositionOfUserInLeague(ApplicationUser user, League league) {
        List<UserInLeagueReturnDTO> usersInLeague = findUsersInLeague(league);
        int position = 0;
        for (UserInLeagueReturnDTO u : usersInLeague) {
            position += 1;
            if (u.getUserID().equals(user.getId())) {
                return position;
            }
        }
        throw new IllegalArgumentException("User not in league?");
    }

    public LeagueAdminDTO isLeagueAdmin(ApplicationUser user, String leagueName){
        Optional<League> league = leagueRepo.findByLeagueName(leagueName);
        if (league.isPresent()){
            if (league.get().getOwner().getId().equals(user.getId())){
                return new LeagueAdminDTO(true, league.get().getCodeToJoin());
            }
            else {
                String leagueAdmin = league.get().getOwner().getFirstName() + " " + league.get().getOwner().getSurname();
                return new LeagueAdminDTO(false, leagueAdmin);
            }
        }
        else {
            throw new IllegalArgumentException("There is no league with that name");
        }
    }

    public boolean deleteLeague(ApplicationUser user, String leagueName){
        Optional<League> league = leagueRepo.findByLeagueName(leagueName);
        if (league.isPresent()){
            if (league.get().getOwner().getId().equals(user.getId())) {

                if (league.get().getLeagueName().equals(Constants.INITIAL_LEAGUE_NAME)){
                    throw new IllegalArgumentException("Even you can't delete the original league");
                }

                leagueRepo.delete(league.get());
                return true;
            }
            else {
                throw new IllegalArgumentException("You are not the admin of that league");
            }
        }
        else {
            throw new IllegalArgumentException("There is no league with that name");
        }
    }

    // TO:DO
    // SURELY this can be improved
    public List<LeagueReturnDTO> findLeaguesPlayerIsIn(String id) {

        Optional<ApplicationUser> user = applicationUserRepo.findById(UUID.fromString(id));
        if (user.isPresent()) {

            List<LeagueReturnDTO> returnDTOS = new ArrayList<>();
            Iterable<League> userLeagues = leagueRepo.findAll();

            List<League> allLeagues = new ArrayList<>();
            userLeagues.forEach(allLeagues::add);

            for (League l : allLeagues) {
                List<UserInLeagueReturnDTO> participants = findUsersInLeague(l);
                int position = 0;
                for (UserInLeagueReturnDTO u : participants) {
                    position += 1;
                    if (u.getUserID().equals(user.get().getId())) {
                        returnDTOS.add(new LeagueReturnDTO(l.getLeagueName(), position, l.getCodeToJoin()));
                        break;
                    }
                }
            }
            return returnDTOS;
        }
        else {
            throw new IllegalArgumentException("User does not exist");
        }
    }
}
