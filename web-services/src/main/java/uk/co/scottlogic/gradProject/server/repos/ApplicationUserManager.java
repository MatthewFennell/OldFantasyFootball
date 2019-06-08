package uk.co.scottlogic.gradProject.server.repos;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.repos.documents.*;
import uk.co.scottlogic.gradProject.server.routers.dto.*;

import java.util.*;

@Service
public class ApplicationUserManager {

    private static final Logger log = LoggerFactory.getLogger(ApplicationUserManager.class);

    private ApplicationUserRepo applicationUserRepo;
    private WeeklyTeamRepo weeklyTeamRepo;
    private WeeklyTeamManager weeklyTeamManager;
    private CollegeTeamRepo collegeTeamRepo;

    @Autowired
    public ApplicationUserManager(ApplicationUserRepo applicationUserRepo, WeeklyTeamRepo weeklyTeamRepo,
                                  WeeklyTeamManager weeklyTeamManager, CollegeTeamRepo collegeTeamRepo) {
        this.applicationUserRepo = applicationUserRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.weeklyTeamManager = weeklyTeamManager;
        this.collegeTeamRepo = collegeTeamRepo;
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
        // Will only update their details if there are no errors with any of their inputs
        applicationUserRepo.save(user);
    }

    public void patchPassword(ApplicationUser user, PatchPassword dto){

        if (BCrypt.checkpw(dto.getOriginalPassword(), user.getPassword())) {
            if (dto.getNewPasswordOne().equals(dto.getNewPasswordTwo())){
                user.savePassword(dto.getNewPasswordOne());
                applicationUserRepo.save(user);
            }
            else {
                throw new IllegalArgumentException("Passwords don't match");
            }

        } else {
            throw new IllegalArgumentException("That is not your password");
        }

    }

    public void setTeamName(ApplicationUser user, String teamName) {
        Optional<ApplicationUser> appUser = applicationUserRepo.findByUsername(user.getUsername());
        if (appUser.isPresent()) {
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

    public double findRemainingBalance(String id){
        Optional<ApplicationUser> user = applicationUserRepo.findById(UUID.fromString(id));
        if (user.isPresent()){
            return user.get().getRemainingBudget();
        }
        else {
            throw new IllegalArgumentException("User does not exist");
        }
    }

    public boolean isAdmin(ApplicationUser user){
        Set<UserAuthority> roles = user.getAuthorityList();
        for (UserAuthority authority : roles){
            if (authority.getRole().equals(Constants.ADMIN_STRING)){
                return true;
            }
        }
        return false;
    }

    public boolean isCaptain(ApplicationUser user){
        Set<UserAuthority> roles = user.getAuthorityList();
        for (UserAuthority authority : roles){
            if (authority.getRole().equals(Constants.CAPTAIN_STRING)){
                return true;
            }
        }
        return false;
    }

    public void makeUserCaptainOfTeam(ApplicationUser requestMaker, String username, String collegeTeam){
        Optional<ApplicationUser> user = applicationUserRepo.findByUsername(username);
        if (!user.isPresent()){
            throw new IllegalArgumentException("User does not exist");
        }
        Optional<CollegeTeam> team = collegeTeamRepo.findByName(collegeTeam);
        if (!team.isPresent()){
            throw new IllegalArgumentException("College team does not exist");
        }
        user.get().addAuthority(new UserAuthority(Constants.CAPTAIN_STRING));
        user.get().setCaptainOf(team.get());
        applicationUserRepo.save(user.get());
        log.info("Username " + requestMaker.getUsername() + " made " + username + " a captain of " + collegeTeam);
    }

    public CollegeTeamDTO getTeamUserCaptainOf(ApplicationUser user){
        if (user.getCaptainOf() == null){
            return null;
        }
        else {
            return new CollegeTeamDTO(user.getCaptainOf());
        }
    }

    public void resetUserPassword(ApplicationUser requestMaker, String username){
        Optional<ApplicationUser> user = applicationUserRepo.findByUsername(username);
        if (!user.isPresent()){
            throw new IllegalArgumentException("There is no account with that username");
        }
        user.get().savePassword("123456");
        applicationUserRepo.save(user.get());
        log.info("Username " + requestMaker.getUsername() + " reset password of account " + username);
    }
}
