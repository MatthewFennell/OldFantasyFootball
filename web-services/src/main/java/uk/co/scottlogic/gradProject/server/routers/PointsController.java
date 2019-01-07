package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.ExceptionLogger;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.AddPlayerToWeeklyTeamDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.GetAveragePointsDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.GetUsersPointsInWeekDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserReturnDTO;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to gathering points")
public class PointsController {

    private static final Logger log = LoggerFactory.getLogger(Token.class);


    private WeeklyTeamManager weeklyTeamManager;

    private ApplicationUserManager applicationUserManager;

    @Autowired
    public PointsController( WeeklyTeamManager weeklyTeamManager, ApplicationUserManager applicationUserManager) {
        this.weeklyTeamManager = weeklyTeamManager;
        this.applicationUserManager = applicationUserManager;
    }

    @ApiOperation(value = Icons.key
            + " Returns the user(s) with the most points in a given week", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User obtained correctly"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @GetMapping("/points/everybody/week/most")
    @PreAuthorize("hasRole('USER')")
    public List<UserReturnDTO> usersWithMostPointsInGivenWeek(@AuthenticationPrincipal ApplicationUser user, HttpServletResponse response, Integer week) {
        try {
            List<UserReturnDTO> topScoringDTOs = new ArrayList<>();
            List<ApplicationUser> topScoringUsers = applicationUserManager.findUsersWithMostPointsInWeek(week);
            for (ApplicationUser u : topScoringUsers) {
                topScoringDTOs.add(new UserReturnDTO(u));
            }
            return topScoringDTOs;
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            ExceptionLogger.logException(e);
            response.setStatus(500);
        }
        return Collections.emptyList();
    }

    @ApiOperation(value = Icons.key
            + " Returns the user(s) with the most points", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User obtained correctly"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @GetMapping("/points/year/everybody/most")
    @PreAuthorize("hasRole('USER')")
    public List<UserReturnDTO> userWithMostPoints(@AuthenticationPrincipal ApplicationUser user, HttpServletResponse response) {
        try {
            List<UserReturnDTO> topScoringDTOs = new ArrayList<>();
            List<ApplicationUser> topScoringUsers = applicationUserManager.findUsersWithLargestTotalPoints();
            for (ApplicationUser u : topScoringUsers) {
                topScoringDTOs.add(new UserReturnDTO(u));
            }
            return topScoringDTOs;
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            ExceptionLogger.logException(e);
            response.setStatus(500);
        }
        return Collections.emptyList();
    }

    @ApiOperation(value = Icons.key
            + " Gets the total points of the user", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Points obtained correctly"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @GetMapping("/points/user/total")
    public Integer totalPoints(@AuthenticationPrincipal ApplicationUser user, HttpServletResponse response) {
        try {
            return applicationUserManager.findTotalPoints(user);
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            ExceptionLogger.logException(e);
            response.setStatus(500);
        }
        return -1;
    }

    @ApiOperation(value = Icons.key
            + " Gets the number of points a user obtained in a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/points/user/week")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid date / category"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public double getAveragePointsForWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            GetUsersPointsInWeekDTO dto) {
        try {
            return applicationUserManager.findPointsInWeek(dto.getId(), dto.getWeek());
        } catch (Exception e) {
            response.setStatus(403);
        }
        return 0;
    }

    @ApiOperation(value = Icons.key
            + " Gets the average points for the week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/points/everybody/week/average")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid date / category"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public double getAveragePointsForWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            GetAveragePointsDTO dto) {
        try {
            return weeklyTeamManager.findAveragePointsOfAllTeamsInWeek(dto.getWeek());
        } catch (Exception e) {
            response.setStatus(403);
        }
        return 0;
    }

}
