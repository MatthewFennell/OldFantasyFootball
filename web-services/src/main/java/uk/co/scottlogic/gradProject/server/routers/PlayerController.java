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
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.PlayerManager;
import uk.co.scottlogic.gradProject.server.repos.WeeklyTeamManager;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerDTO;
import uk.co.scottlogic.gradProject.server.misc.Enums;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to Players")
public class PlayerController {

    private static final Logger log = LoggerFactory.getLogger(PlayerController.class);

    private PlayerManager playerManager;
    private WeeklyTeamManager weeklyTeamManager;

    @Autowired
    public PlayerController(PlayerManager playerManager, WeeklyTeamManager weeklyTeamManager) {
        this.playerManager = playerManager;
        this.weeklyTeamManager = weeklyTeamManager;
    }

    @ApiOperation(value = Icons.key
            + " Find the player with the most points in a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/points/week/{week-id}/most")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Unknown error"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public PlayerDTO getUserPointsInWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("week-id") Integer week) {
        try {
            // Currently just returns the randomly first selected
            // Should go back later and make it choose the top on some criteria
            response.setStatus(200);
            return new PlayerDTO(playerManager.findPlayerWithMostPointsInWeek(week).get(0));
        } catch (Exception e) {
            response.setStatus(400);
        }
        return null;
    }

    @ApiOperation(value = Icons.key
            + " Find all players for the user in a given week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/week/{week-id}/team")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "No weekly team for that user and date"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<PlayerDTO> getAllPlayersForUserInWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("week-id") Integer week) {
        try {
            response.setStatus(200);
            return weeklyTeamManager.findAllPlayersInWeeklyTeam(user, week);
        } catch (IllegalArgumentException e) {
            log.debug(e.getMessage());
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return Collections.emptyList();
    }

    @ApiOperation(value = Icons.key
            + " Find the player with the most points in a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/max/{max}/min/{min}/name/{name}/position/{position}/team/{team}/sort/{sort}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "College team does not exist"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<PlayerDTO> filterPlayersAll(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("max") Integer max,
            @PathVariable("min") Integer min,
            @PathVariable("name") String name,
            @PathVariable("position") Enums.Position position,
            @PathVariable("team") String team,
            @PathVariable("sort") Enums.SORT_BY sort
    ) {
        try {
            // Currently just returns the randomly first selected
            // Should go back later and make it choose the top on some criteria
            response.setStatus(200);
            List<Player> filteredPlayers = playerManager.formatFilter(team, position, min, max, name, sort);
            List<PlayerDTO> responses = new ArrayList<>();
            for (Player p : filteredPlayers) {
                responses.add(new PlayerDTO(p));
            }
            return responses;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            log.debug(e.getMessage());
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

}
