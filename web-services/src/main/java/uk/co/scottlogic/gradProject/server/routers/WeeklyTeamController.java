package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.AddPlayerToWeeklyTeamDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.GetAveragePointsDTO;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to Weekly teams")
public class WeeklyTeamController {

    private static final Logger log = LoggerFactory.getLogger(Token.class);

    private WeeklyTeamManager weeklyTeamManager;

    @Autowired
    public WeeklyTeamController(WeeklyTeamManager weeklyTeamManager) {

        this.weeklyTeamManager = weeklyTeamManager;
    }

    @ApiOperation(value = Icons.key + " Adds a player to a team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "Note successfully set"),
            @ApiResponse(code = 404, message = "Note not found"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/weeklyteam/addplayer")
    @PreAuthorize("hasRole('USER')")
    public void addPlayerToWeeklyTeam(@AuthenticationPrincipal ApplicationUser user,
                                      @RequestBody AddPlayerToWeeklyTeamDTO addPlayerToWeeklyTeamDTO, HttpServletResponse response) {

        try {
            weeklyTeamManager.addPlayerToWeeklyTeam(user, addPlayerToWeeklyTeamDTO.getId());
        } catch (IllegalArgumentException e) {
            response.setStatus(403);
        } catch (Exception e) {
            response.setStatus(409);
        }
    }

    @ApiOperation(value = Icons.key + " Removes a player from the team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "Note successfully set"),
            @ApiResponse(code = 404, message = "Note not found"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/weeklyteam/removeplayer")
    @PreAuthorize("hasRole('USER')")
    public void removePlayerFromWeeklyTeam(@AuthenticationPrincipal ApplicationUser user,
                                           @RequestBody AddPlayerToWeeklyTeamDTO addPlayerToWeeklyTeamDTO, HttpServletResponse response) {

        try {
            weeklyTeamManager.removePlayerFromWeeklyTeam(user, addPlayerToWeeklyTeamDTO.getId());
        } catch (IllegalArgumentException e) {
            response.setStatus(403);
        } catch (Exception e) {
            response.setStatus(409);
        }
    }

    @ApiOperation(value = Icons.key
            + " Gets the total number of weeks that have been played",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/weeklyteam/numberOfWeeks")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid date / category"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public Integer getNumberOfWeeks(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response) {
        try {
            return weeklyTeamManager.getTotalNumberOfWeeks();
        } catch (Exception e) {
            response.setStatus(403);
        }
        return 0;
    }

}
