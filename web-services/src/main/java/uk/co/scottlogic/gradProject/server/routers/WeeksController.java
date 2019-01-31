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
import uk.co.scottlogic.gradProject.server.routers.dto.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to week based info")
public class WeeksController {

    private static final Logger log = LoggerFactory.getLogger(WeeksController.class);

    private WeeklyTeamManager weeklyTeamManager;

    @Autowired
    public WeeksController(WeeklyTeamManager weeklyTeamManager) {
        this.weeklyTeamManager = weeklyTeamManager;
    }

    @ApiOperation(value = Icons.key + " Attempt to update a team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Transfer request updated"),
            @ApiResponse(code = 400, message = "Invalid transfer request"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/weeks/update")
    @PreAuthorize("hasRole('USER')")
    public boolean updateTeam(@AuthenticationPrincipal ApplicationUser user,
                              @RequestBody TransferDTO dto,
                              HttpServletResponse response) {

        try {
            response.setStatus(200);
            return weeklyTeamManager.update(user, dto.getPlayersBeingAdded(), dto.getPlayersBeingRemoved());
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
                log.debug(f.getMessage());
            }
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
            @ApiResponse(code = 400, message = "Unknown error"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public Integer getNumberOfWeeks(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response) {
        try {
            response.setStatus(200);
            return weeklyTeamManager.getTotalNumberOfWeeks();
        } catch (Exception e) {
            log.debug(e.getMessage());
            response.setStatus(400);
        }
        return 0;
    }
}
