package uk.co.scottlogic.gradProject.server.repos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.UsersWeeklyTeam;
import uk.co.scottlogic.gradProject.server.routers.dto.TopWeeklyUserReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserPatchDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserReturnDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ApplicationUserManager {

    private ApplicationUserRepo applicationUserRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    private WeeklyTeamManager weeklyTeamManager;


    @Autowired
    public ApplicationUserManager(ApplicationUserRepo applicationUserRepo, WeeklyTeamRepo weeklyTeamRepo,
                                  WeeklyTeamManager weeklyTeamManager) {
        this.applicationUserRepo = applicationUserRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.weeklyTeamManager = weeklyTeamManager;
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
        System.out.println("here");
        Optional<ApplicationUser> appUser = applicationUserRepo.findByUsername(user.getUsername());
        if (appUser.isPresent()) {
            System.out.println("in here");
            ApplicationUser u = appUser.get();
            u.setTeamName(teamName);
            applicationUserRepo.save(u);
        }
    }

    public Integer findTotalPoints(String id) {
        Optional<ApplicationUser> user = applicationUserRepo.findById(UUID.fromString(id));
        if (user.isPresent()){
            return user.get().getTotalPoints();
        }
        else {
            throw new IllegalArgumentException("User does not exist");
        }
    }

    public List<ApplicationUser> findUsersWithLargestTotalPoints() {
        return applicationUserRepo.findUserWithMostPoints();
    }

    public Integer findPointsInWeek(String id, Integer week) {
        Optional<ApplicationUser> user = applicationUserRepo.findById(UUID.fromString(id));
        if (user.isPresent()) {
            Optional<Integer> points = weeklyTeamRepo.findPointsInWeekByUser(user.get(), week);
            return points.orElse(0);
        }
        else {
            throw new IllegalArgumentException("User does not exist");
        }
    }

    public List<TopWeeklyUserReturnDTO> findUsersWithMostPointsInWeek(Integer week) {
        List<TopWeeklyUserReturnDTO> topScoringUsers = new ArrayList<>();

        List<UsersWeeklyTeam> teams = weeklyTeamManager.findWeeklyTeamWithMostPoints(week);

        for (UsersWeeklyTeam uwt : teams) {
            topScoringUsers.add(new TopWeeklyUserReturnDTO(uwt));
        }
        return topScoringUsers;
    }


    public UserReturnDTO findUserStats(String id){
        Optional<ApplicationUser> optionalApplicationUser = applicationUserRepo.findById(UUID.fromString(id));
        if (optionalApplicationUser.isPresent()){
            return new UserReturnDTO(optionalApplicationUser.get());
        }
        else {
            throw new IllegalArgumentException("User does not exist");
        }

    }


}
