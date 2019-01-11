package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.ExceptionLogger;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;
import uk.co.scottlogic.gradProject.server.routers.dto.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to Players")
public class PlayerController {

    private static final Logger log = LoggerFactory.getLogger(Token.class);

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

    @ApiOperation(value = Icons.key
            + " Find all players for the user in a given week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/week/{week-id}/team")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid date / category"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<WeeklyPlayerReturnDTO> getAllPlayersForUserInWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("week-id") Integer week) {
        try {
            // Currently just returns the randomly first selected
            // Should go back later and make it choose the top on some criteria
            return weeklyTeamManager.findAllPlayersInWeeklyTeam(user, week);
        } catch (Exception e) {
            response.setStatus(403);
        }
        return Collections.emptyList();
    }

    @ApiOperation(value = Icons.key + " Filter players accordingly ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "Category successfully added"),
            @ApiResponse(code = 400, message = "Must provide valid category name"),
            @ApiResponse(code = 403, message = "Insufficient privileges"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/players/filter")
    public List<Player> filterPlayers(@AuthenticationPrincipal ApplicationUser user,
                           @RequestBody InputFilterPlayersDTO dto, HttpServletResponse response) {
        try {
            System.out.println("sort by = " + dto.getSort_by());
            System.out.println("max = " + dto.getMaximum());
            System.out.println("min = " + dto.getMinimum());
            System.out.println("name = " + dto.getName());
            System.out.println("team = " + dto.getTeam());
            System.out.println("position = " + dto.getPosition());
            System.out.println("positions value = " + Player.Position.valueOf(dto.getPosition()));
            System.out.println("sort by value = " + PlayerManager.SORT_BY.valueOf(dto.getSort_by()));
            return playerManager.filterPlayers(dto.getTeam(), Player.Position.valueOf(dto.getPosition()), dto.getMinimum(), dto.getMaximum(), dto.getName(), PlayerManager.SORT_BY.valueOf(dto.getSort_by()));
        } catch (DuplicateKeyException e) {
            response.setStatus(409);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        }
        return null;
    }

}
