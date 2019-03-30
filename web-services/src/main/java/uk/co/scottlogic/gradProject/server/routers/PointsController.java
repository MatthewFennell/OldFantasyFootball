package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.co.scottlogic.gradProject.server.misc.ExceptionLogger;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.ApplicationUserManager;
import uk.co.scottlogic.gradProject.server.repos.WeeklyTeamManager;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.TopWeeklyUserReturnDTO;
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

    private static final Logger log = LoggerFactory.getLogger(PointsController.class);

    private WeeklyTeamManager weeklyTeamManager;

    private ApplicationUserManager applicationUserManager;

    @Autowired
    public PointsController(WeeklyTeamManager weeklyTeamManager, ApplicationUserManager applicationUserManager) {
        this.weeklyTeamManager = weeklyTeamManager;
        this.applicationUserManager = applicationUserManager;
    }

    @ApiOperation(value = Icons.key
            + " Find the user with the most points in a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/points/user/week/{week-id}/most")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Unknown error"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public TopWeeklyUserReturnDTO getUserWithMostPointsInWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("week-id") Integer week) {
        try {
            // Currently just returns the randomly first selected
            // Should go back later and make it choose the top on some criteria
            response.setStatus(200);
            return applicationUserManager.findUsersWithMostPointsInWeek(week).get(0);
        } catch (Exception e) {
            response.setStatus(400);
        }
        return null;
    }

    @ApiOperation(value = Icons.key
            + " Returns the user(s) with the most points", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User obtained correctly"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @GetMapping("/points/year/everybody/most")
    @PreAuthorize("hasRole('USER')")
    public List<UserReturnDTO> userWithMostPoints(@AuthenticationPrincipal ApplicationUser user, HttpServletResponse response) {
        try {
            List<UserReturnDTO> topScoringDTOs = new ArrayList<>();
            List<ApplicationUser> topScoringUsers = applicationUserManager.findUsersWithLargestTotalPoints();
            for (ApplicationUser u : topScoringUsers) {
                topScoringDTOs.add(new UserReturnDTO(u));
            }
            response.setStatus(200);
            return topScoringDTOs;
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                log.debug(e1.getMessage());
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
            @ApiResponse(code = 500, message = "Server Error")})
    @GetMapping("/points/user/total/{id}")
    public Integer totalPoints(@AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
                               @PathVariable("id") String id) {
        try {
            response.setStatus(200);
            return applicationUserManager.findTotalPoints(id);
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
        } catch (Exception e) {
            response.setStatus(500);
        }
        return -1;
    }

    @ApiOperation(value = Icons.key
            + " Gets the number of points a user obtained in a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/points/user/{user-id}/week/{week-id}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid week"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public double getUserPointsInWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("user-id") String id,
            @PathVariable("week-id") Integer week) {
        try {
            response.setStatus(200);
            return applicationUserManager.findPointsInWeek(id, week);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            log.debug(e.getMessage());
        } catch (Exception e) {
            response.setStatus(500);
        }
        return 0;
    }

    @ApiOperation(value = Icons.key
            + " Gets the average points for the week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/points/everybody/week/{week-id}/average")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Unknown error"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public double getAveragePointsForWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("week-id") Integer week) {
        try {
            response.setStatus(200);
            return weeklyTeamManager.findAveragePointsOfAllTeamsInWeek(week);
        } catch (Exception e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
                log.debug(f.getMessage());
            }
        }
        return 0;
    }


}
