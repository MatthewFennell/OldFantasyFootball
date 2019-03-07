package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.CollegeTeamManager;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.CollegeTeamDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.CollegeTeamStatsDTO;

import javax.servlet.http.HttpServletResponse;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
@Api(value = "Authentication", description = "Operations pertaining to week based info")
public class CollegeTeamController {

    private static final Logger log = LoggerFactory.getLogger(WeeksController.class);

    private CollegeTeamManager collegeTeamManager;

    @Autowired
    public CollegeTeamController(CollegeTeamManager collegeTeamManager) {
        this.collegeTeamManager = collegeTeamManager;
    }

    @ApiOperation(value = Icons.key + " Make a college team SCARY", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 204, message = "Player successfully deleted"),
            @ApiResponse(code = 400, message = "League with that name already exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 403, message = "League with that name already exists"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/college/make")
    @PreAuthorize("hasRole('ADMIN')")
    public CollegeTeamDTO makeCollegeTeam(@AuthenticationPrincipal ApplicationUser user,
                                @RequestBody String name, HttpServletResponse response) {
        try {
            response.setStatus(200);
            return collegeTeamManager.makeTeam(name);
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
            log.debug(e.getMessage());
        }
        return null;
    }

    @ApiOperation(value = Icons.key + " Delete a college team ", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 201, message = "League successfully created"),
            @ApiResponse(code = 204, message = "Team deleted successfully"),
            @ApiResponse(code = 400, message = "League with that name already exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 403, message = "League with that name already exists"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/college/delete")
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteCollegeTeam(@AuthenticationPrincipal ApplicationUser user,
                              @RequestBody String name, HttpServletResponse response) {
        try {
            response.setStatus(201);
            collegeTeamManager.deleteTeam(name);
            return true;
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
            log.debug(e.getMessage());
        }
        return false;
    }

    @ApiOperation(value = Icons.key + " Make a college team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 204, message = "Player successfully deleted"),
            @ApiResponse(code = 400, message = "League with that name already exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 403, message = "League with that name already exists"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/college/stats/add")
    @PreAuthorize("hasRole('ADMIN')")
    public void addStatsToCollegeTeam(@AuthenticationPrincipal ApplicationUser user,
                                      @RequestBody CollegeTeamStatsDTO dto, HttpServletResponse response) {
        try {
            response.setStatus(200);
            collegeTeamManager.addStatsToCollegeTeam(dto);
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
            log.debug(e.getMessage());
        }
    }

    @ApiOperation(value = Icons.key + " Edit a college team", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Never returned but swagger won't let me get rid of it"),
            @ApiResponse(code = 204, message = "Player successfully deleted"),
            @ApiResponse(code = 400, message = "League with that name already exists"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 403, message = "League with that name already exists"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PostMapping(value = "/college/stats/edit")
    @PreAuthorize("hasRole('ADMIN')")
    public void editCollegeTeamStats(@AuthenticationPrincipal ApplicationUser user,
                                     @RequestBody CollegeTeamStatsDTO dto, HttpServletResponse response) {
        try {
            response.setStatus(200);
            collegeTeamManager.editCollegeTeamStats(dto);
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
            log.debug(e.getMessage());
        }
    }

    @ApiOperation(value = Icons.key
            + " Find the player with the most points in a week",
            notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @GetMapping("/college/all/sort/{sort-id}")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Returned successfully"),
            @ApiResponse(code = 400, message = "Unknown error"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<CollegeTeamDTO> getAllCollegeTeams(
            @AuthenticationPrincipal ApplicationUser user, HttpServletResponse response,
            @PathVariable("sort-id") String sortBy) {
        try {
            // Currently just returns the randomly first selected
            // Should go back later and make it choose the top on some criteria
            response.setStatus(200);
            return collegeTeamManager.getAllCollegeTeams(sortBy);
        } catch (Exception e) {
            response.setStatus(400);
        }
        return Collections.emptyList();
    }
}
