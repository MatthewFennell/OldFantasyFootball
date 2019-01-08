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
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;
import uk.co.scottlogic.gradProject.server.routers.dto.AddPlayerToWeeklyTeamDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.GetAveragePointsDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserReturnDTO;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to Players")
public class PlayerController {

    private static final Logger log = LoggerFactory.getLogger(Token.class);

    private PlayerManager playerManager;



    @Autowired
    public PlayerController(PlayerManager playerManager) {

        this.playerManager = playerManager;
    }

    @ApiOperation(value = Icons.key
            + " Find the player with the most points in a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/points/week/{week-id}/most")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid date / category"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public PlayerReturnDTO getUserPointsInWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("week-id") Integer week) {
        try {
            // Currently just returns the randomly first selected
            // Should go back later and make it choose the top on some criteria
            return new PlayerReturnDTO (playerManager.findPlayerWithMostPointsInWeek(week).get(0));
        } catch (Exception e) {
            response.setStatus(403);
        }
        return null;
    }

}
