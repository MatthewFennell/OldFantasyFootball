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
import uk.co.scottlogic.gradProject.server.routers.dto.UpdateTeamPlayerDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.WeeklyPlayerReturnDTO;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to week based info")
public class WeeksController {

    private static final Logger log = LoggerFactory.getLogger(Token.class);

    private WeeklyTeamManager weeklyTeamManager;

    @Autowired
    public WeeksController(WeeklyTeamManager weeklyTeamManager) {

        this.weeklyTeamManager = weeklyTeamManager;
    }

    @ApiOperation(value = Icons.key + " Adds a player to a team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "Note successfully set"),
            @ApiResponse(code = 404, message = "Note not found"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/weeks/addPlayer")
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
    @PostMapping(value = "/weeks/removePlayer")
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

    @ApiOperation(value = Icons.key + " Attempt to update a team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "Note successfully set"),
            @ApiResponse(code = 404, message = "Note not found"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/weeks/update")
    @PreAuthorize("hasRole('USER')")
    public boolean updateTeam(@AuthenticationPrincipal ApplicationUser user,
                           @RequestBody List<UpdateTeamPlayerDTO> newTeam, HttpServletResponse response) {

        try {
            for (UpdateTeamPlayerDTO dto : newTeam){
                System.out.println("player name = " + dto.getFirstName());
            }
            return weeklyTeamManager.checkIfUpdateValid(user, newTeam);
        } catch (IllegalArgumentException e) {
            response.setStatus(403);
        } catch (Exception e) {
            response.setStatus(409);
        }
        return false;
    }

    @ApiOperation(value = Icons.key
            + " Gets the total number of weeks that have been played",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/weeks/total")
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
