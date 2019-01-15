package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.League;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;
import uk.co.scottlogic.gradProject.server.routers.dto.TopWeeklyUserReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserPatchDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ApplicationUserManager {

    private ApplicationUserRepo applicationUserRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    private WeeklyTeamManager weeklyTeamManager;

    private LeagueRepo leagueRepo;

    @Autowired
    public ApplicationUserManager(ApplicationUserRepo applicationUserRepo, WeeklyTeamRepo weeklyTeamRepo,
                                  WeeklyTeamManager weeklyTeamManager, LeagueRepo leagueRepo) {
        this.applicationUserRepo = applicationUserRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.weeklyTeamManager = weeklyTeamManager;
        this.leagueRepo = leagueRepo;
    }

    public void patchUser(ApplicationUser user, UserPatchDTO userPatchDTO) {
        if (!userPatchDTO.isValid()) {
            throw new IllegalArgumentException("Regex does not match");
        }

        if (userPatchDTO.getFirstName() != null) {
            user.setFirstName(userPatchDTO.getFirstName());
        }
        if (userPatchDTO.getSurname() != null) {
            user.setSurname(userPatchDTO.getSurname());
        }
        if (userPatchDTO.getPassword() != null) {
            user.savePassword(userPatchDTO.getPassword());
        }
        if (userPatchDTO.getUsername() != null) {
            Optional<ApplicationUser> appUser = applicationUserRepo.findByUsername(
                    userPatchDTO.getUsername());
            if (appUser.isPresent()) {
                throw new IllegalArgumentException("Username already exists");
            } else {
                user.setUsername(userPatchDTO.getUsername());
            }
        }
        if (userPatchDTO.getEmail() != null) {
            Optional<ApplicationUser> email = applicationUserRepo.findByEmail(userPatchDTO.getEmail());
            if (email.isPresent()) {
                throw new IllegalArgumentException("Email already exists");
            } else {
                user.setEmail(userPatchDTO.getEmail());
            }
        }

        // Will only update their details if there are no errors with any of their inputs
        applicationUserRepo.save(user);
    }

    public void setTeamName(ApplicationUser user, String teamName) {
        Optional<ApplicationUser> appUser = applicationUserRepo.findByUsername(user.getUsername());
        if (appUser.isPresent()) {
            ApplicationUser u = appUser.get();
            u.setTeamName(teamName);
            applicationUserRepo.save(u);
        }
    }

    public Integer findTotalPoints(ApplicationUser user) {
        return user.getTotalPoints();
    }

    public List<ApplicationUser> findUsersWithLargestTotalPoints() {
        return applicationUserRepo.findUserWithMostPoints();
    }

    public Integer findPointsInWeek(ApplicationUser user, Integer week) {
            return weeklyTeamRepo.findPointsInWeekByUser(user, week);
    }

    public List<TopWeeklyUserReturnDTO> findUsersWithMostPointsInWeek(Integer week) {
        List<TopWeeklyUserReturnDTO> topScoringUsers = new ArrayList<>();

        List<UsersWeeklyTeam> teams = weeklyTeamManager.findWeeklyTeamWithMostPoints(week);

        for (UsersWeeklyTeam uwt : teams) {
            topScoringUsers.add(new TopWeeklyUserReturnDTO(uwt));
        }
        return topScoringUsers;
    }


}
