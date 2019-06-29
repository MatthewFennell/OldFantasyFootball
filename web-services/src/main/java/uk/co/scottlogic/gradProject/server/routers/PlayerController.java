package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.Enums;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.PlayerManager;
import uk.co.scottlogic.gradProject.server.repos.WeeklyTeamManager;
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

    private PlayerManager playerManager;
    private WeeklyTeamManager weeklyTeamManager;

    @Autowired
    public PlayerController(PlayerManager playerManager, WeeklyTeamManager weeklyTeamManager) {
        this.playerManager = playerManager;
        this.weeklyTeamManager = weeklyTeamManager;
    }

    @ApiOperation(value = "Find the player with the most points in a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/points/week/{week-id}/most")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Unknown error"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public PlayerDTO getMostPlayerPointsInWeek(
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

    @ApiOperation(value = "Find all players for the user in a given week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/{id}/week/{week-id}/team")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "No weekly team for that user and date"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<PlayerDTO> getAllPlayersForUserInWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("id") String id,
            @PathVariable("week-id") Integer week) {
        try {
            response.setStatus(200);
            return weeklyTeamManager.findAllPlayersInWeeklyTeam(id, week);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return Collections.emptyList();
    }

    @ApiOperation(value = "Find players based on some criteria",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/max/{max}/min/{min}/name/{name}/position/{position}/team/{team}/sort/{sort}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "College team does not exist"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
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
            response.setStatus(200);
            return playerManager.generateDTOFilterReturns(team, position, min, max, name, sort);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = "Find all players in a team",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/team/{team}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "College team does not exist"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<PlayerDTO> findPlayersByCollegeTeam(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("team") String team
    ) {
        try {
            response.setStatus(200);
            List<Player> filteredPlayers = playerManager.findPlayersByCollegeTeam(team);
            List<PlayerDTO> responses = new ArrayList<>();
            for (Player p : filteredPlayers) {
                responses.add(new PlayerDTO(p));
            }
            return responses;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = "Find your most valuable assets",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/value/{id}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "College team does not exist"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public MostValuableDTO findMostValuableAssets(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("id") String id) {
        try {
            // Currently just returns the randomly first selected
            // Should go back later and make it choose the top on some criteria
            MostValuableDTO mostValuableDTO = playerManager.findMostValuablePlayer(id);
            response.setStatus(200);
            return mostValuableDTO;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = "Get the history for a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/history/week/{id}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "College team does not exist"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<TeamHistoryDTO> getHistory(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("id") Integer id) {
        try {
            List<TeamHistoryDTO> historyDTO = playerManager.history(id);
            response.setStatus(200);
            return historyDTO;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = Icons.key + " Make a player ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "League successfully created"),
            @ApiResponse(code = 400, message = "League with that name already exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/player/make")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CAPTAIN')")
    public boolean makePlayer(@AuthenticationPrincipal ApplicationUser user,
                           @RequestBody MakePlayerDTO dto, HttpServletResponse response) {
        try {
            response.setStatus(201);
            playerManager.checkCaptainDoingCorrectly(user, dto.getCollegeTeam());
            playerManager.makePlayer(user, dto);
            return true;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        }
        catch (IllegalAccessError f){
            try {
                response.sendError(403, f.getMessage());
            } catch (Exception ff) {
            }
        }

        catch (Exception e) {
            response.setStatus(500);
        }
        return false;
    }

    @ApiOperation(value = Icons.key + " Change a players college team ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 204, message = "Player successfully deleted"),
            @ApiResponse(code = 400, message = "League with that name already exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/player/team/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public void changePlayersCollegeTeam(@AuthenticationPrincipal ApplicationUser user,
                                         @RequestBody ChangeCollegeTeamDTO dto, HttpServletResponse response) {
        try {
            response.setStatus(201);
            playerManager.changePlayersCollegeTeam(dto.getPlayerID(), dto.getCollegeName());
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(500);
        }
    }

    @ApiOperation(value = Icons.key + " Delete a player ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 204, message = "Player successfully deleted"),
            @ApiResponse(code = 400, message = "League with that name already exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/player/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deletePlayer(@AuthenticationPrincipal ApplicationUser user,
                             @RequestBody String id, HttpServletResponse response) {
        try {
            response.setStatus(200);
            playerManager.deletePlayer(user, id);
            return true;
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(500);
        }
        return false;
    }

    @ApiOperation(value = Icons.key + " Add points to multiple players", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Transfer request updated"),
            @ApiResponse(code = 400, message = "Invalid transfer request"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/player/points/multiple/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void addPointsToPlayers(@AuthenticationPrincipal ApplicationUser user,
                                   @RequestBody AddMultiplePointsDTO dto,
                                   HttpServletResponse response) {
        try {
            response.setStatus(201);
            playerManager.addPointsToSeveralPlayers(user, dto);
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(409);
        }
    }

    @ApiOperation(value = Icons.key + " Add points to a single player", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Transfer request updated"),
            @ApiResponse(code = 400, message = "Invalid transfer request"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/player/points/add")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean addPointsToSinglePlayer(@AuthenticationPrincipal ApplicationUser user,
                                        @RequestBody PlayerPointsDTO dto,
                                        HttpServletResponse response) {

        try {
            response.setStatus(201);
            playerManager.addPointsToSinglePlayer(user, dto);
            return true;
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        } catch (Exception e) {
            response.setStatus(409);
        }
        return false;
    }

    @ApiOperation(value = Icons.key + " Edit points for a single player", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Transfer request updated"),
            @ApiResponse(code = 400, message = "Invalid transfer request"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/player/points/edit")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CAPTAIN')")
    public boolean editPointsForPlayer(@AuthenticationPrincipal ApplicationUser user,
                                    @RequestBody PlayerPointsDTO dto,
                                    HttpServletResponse response) {

        try {
            response.setStatus(201);
            playerManager.checkPlayerBelongsToCaptain(user, dto.getPlayerID());
            playerManager.editPoints(user, dto);
            return true;
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        }
        catch (IllegalAccessError f){
            try {
                response.sendError(403, f.getMessage());
            } catch (Exception ff) {
            }
        }
        catch (Exception e) {
            response.setStatus(409);
        }
        return false;
    }

    @ApiOperation(value = "Find stats for a player in a given week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/player/{player-id}/week/{week-id}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "No weekly team for that user and date"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public PlayerPointsDTO findStatsForPlayerInWeek(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("player-id") String id, @PathVariable("week-id") Integer week) {
        try {
            response.setStatus(200);
            PlayerPoints playerPoints = playerManager.findStatsForPlayerInWeek(id, week);
            if (playerPoints == null){
                response.setStatus(204);
                return null;
            }
            return new PlayerPointsDTO(playerPoints);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        } catch (Exception e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = Icons.key + " Submit results for a team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Transfer request updated"),
            @ApiResponse(code = 400, message = "Invalid transfer request"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/player/result/submit")
    @PreAuthorize("hasRole('ADMIN') or hasRole('CAPTAIN')")
    public boolean submitResult(@AuthenticationPrincipal ApplicationUser user,
                             @RequestBody SubmitPointsDTO dto,
                             HttpServletResponse response) {
        try {
            response.setStatus(201);
            playerManager.checkCaptainDoingCorrectly(user, dto.getTeamName());
            playerManager.submitResults(user, dto);
            return true;

        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (Exception f) {
            }
        }
        catch (IllegalAccessError f){
            try {
                response.sendError(403, f.getMessage());
            } catch (Exception ff) {
            }
        }

        catch (Exception e) {
            response.setStatus(409);
        }
        return false;
    }
}
