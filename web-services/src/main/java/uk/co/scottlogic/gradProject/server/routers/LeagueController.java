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
import uk.co.scottlogic.gradProject.server.repos.documents.PlayerPoints;
import uk.co.scottlogic.gradProject.server.routers.dto.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to Players")
public class LeagueController {

    private static final Logger log = LoggerFactory.getLogger(Token.class);

    private LeagueManager leagueManager;

    @Autowired
    public LeagueController(LeagueManager leagueManager) {
        this.leagueManager = leagueManager;
    }

    @ApiOperation(value = Icons.key + " Make a league ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "Category successfully added"),
            @ApiResponse(code = 400, message = "Must provide valid category name"),
            @ApiResponse(code = 403, message = "Insufficient privileges"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/league/make")
    public void makeLeague(@AuthenticationPrincipal ApplicationUser user,
                           @RequestBody MakeLeagueDTO dto, HttpServletResponse response) {
        try {
            leagueManager.createLeague(user, dto.getLeagueName(), dto.getStartWeek(), dto.getCodeToJoin());
        } catch (DuplicateKeyException e) {
            response.setStatus(409);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        }
    }

    @ApiOperation(value = Icons.key + " Join a league ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "Category successfully added"),
            @ApiResponse(code = 400, message = "Must provide valid category name"),
            @ApiResponse(code = 403, message = "Insufficient privileges"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/league/join")
    public void addPlayerToLeague(@AuthenticationPrincipal ApplicationUser user,
                                  @RequestBody String code, HttpServletResponse response) {
        try {
            leagueManager.addPlayerToLeague(user, code);
        } catch (DuplicateKeyException e) {
            response.setStatus(409);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(400);
        }
    }

    @ApiOperation(value = Icons.key
            + " Find all leagues that the user is in",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/league/user/all")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid date / category"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<LeagueReturnDTO> getLeaguesByUser(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response) {
        try {
            // Currently just returns the randomly first selected
            // Should go back later and make it choose the top on some criteria
            return leagueManager.findLeaguesPlayerIsIn(user);
        } catch (Exception e) {
            response.setStatus(403);
        }
        return Collections.emptyList();
    }

    @ApiOperation(value = Icons.key
            + " Gets the users and their positions in a league",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/league/name/{league-name}/ranking")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Invalid date / category"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<UserInLeagueReturnDTO> getPositionsOfUsersInLeague(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("league-name") String leagueName) {
        try {
            return leagueManager.findUsersInLeagueAndPositions(leagueName);
        } catch (Exception e) {
            response.setStatus(403);
        }
        return null;
    }

}
