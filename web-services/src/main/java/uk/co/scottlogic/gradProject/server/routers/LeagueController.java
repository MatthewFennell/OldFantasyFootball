package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.LeagueManager;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.LeagueAdminDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.LeagueReturnDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.MakeLeagueDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserInLeagueReturnDTO;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to Players")
public class LeagueController {

    private static final Logger log = LoggerFactory.getLogger(LeagueController.class);

    private LeagueManager leagueManager;

    @Autowired
    public LeagueController(LeagueManager leagueManager) {
        this.leagueManager = leagueManager;
    }

    @ApiOperation(value = Icons.key + " Make a league ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "League successfully created"),
            @ApiResponse(code = 400, message = "A league with that name already exists"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/league/make")
    public LeagueReturnDTO makeLeague(@AuthenticationPrincipal ApplicationUser user,
                             @RequestBody MakeLeagueDTO dto, HttpServletResponse response) {
        try {
            response.setStatus(201);
            return leagueManager.createLeague(user, dto.getLeagueName(), dto.getStartWeek());
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            log.debug(e.getMessage());
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
                log.debug(f.getMessage());
            }
        } catch (DuplicateKeyException e) {
            response.setStatus(409);
            log.debug(e.getMessage());
        } catch (Exception e) {
            response.setStatus(500);
            log.debug(e.getMessage());
        }
        return null;
    }



    @ApiOperation(value = Icons.key + " Join a league ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 400, message = "You are already in that league"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/league/join")
    public LeagueReturnDTO addPlayerToLeague(@AuthenticationPrincipal ApplicationUser user,
                                             @RequestBody String code, HttpServletResponse response) {
        try {
            response.setStatus(200);
            return leagueManager.addPlayerToLeague(user, code);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
                log.debug(f.getMessage());
            }
        } catch (Exception e) {
            response.setStatus(500);
            log.debug(e.getMessage());
        }
        return null;
    }

    @ApiOperation(value = Icons.key + " Leave a league ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 400, message = "You are already in that league"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/league/leave")
    public boolean leaveLeague(@AuthenticationPrincipal ApplicationUser user,
                            @RequestBody String name, HttpServletResponse response) {
        try {
            response.setStatus(200);
            leagueManager.leaveLeague(user, name);
            return true;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
                log.debug(f.getMessage());
            }
        } catch (Exception e) {
            response.setStatus(500);
            log.debug(e.getMessage());
        }
        return false;
    }

    @ApiOperation(value = Icons.key + " Delete a league ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 400, message = "You are already in that league"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/league/delete")
    public boolean deleteLeague(@AuthenticationPrincipal ApplicationUser user,
                               @RequestBody String name, HttpServletResponse response) {
        try {
            response.setStatus(200);
            leagueManager.deleteLeague(user, name);
            return true;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
                log.debug(f.getMessage());
            }
        } catch (Exception e) {
            response.setStatus(500);
            log.debug(e.getMessage());
        }
        return false;
    }

    @ApiOperation(value = Icons.key
            + " Find all leagues that the user is in",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/league/user/{id}/all")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Unknown error"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<LeagueReturnDTO> getLeaguesByUser(
            @AuthenticationPrincipal ApplicationUser user,  HttpServletResponse response,
            @PathVariable("id") String id) {
        try {
            return leagueManager.findLeaguesPlayerIsIn(id);
        } catch (Exception e) {
            response.setStatus(400);
        }
        return Collections.emptyList();
    }

    @ApiOperation(value = Icons.key
            + " Gets the users and their positions in a league",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/league/name/{league-name}/ranking")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "League does not exist with that league name"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<UserInLeagueReturnDTO> getPositionsOfUsersInLeague(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("league-name") String leagueName) {
        try {
            response.setStatus(200);
            return leagueManager.findUsersInLeagueAndPositions(leagueName);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            log.debug(e.getMessage());
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = Icons.key
            + " Gets the users and their positions in a league",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/league/{league-name}/admin")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "League does not exist with that league name"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public LeagueAdminDTO isAdmin(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("league-name") String leagueName) {
        try {
            response.setStatus(200);
            return leagueManager.isLeagueAdmin(user, leagueName);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            log.debug(e.getMessage());
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
                log.debug(f.getMessage());
            }
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

}
