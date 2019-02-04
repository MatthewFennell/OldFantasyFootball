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
public class CollegeTeamController {

    private static final Logger log = LoggerFactory.getLogger(WeeksController.class);


    private CollegeTeamManager collegeTeamManager;

    @Autowired
    public CollegeTeamController(CollegeTeamManager collegeTeamManager) {
        this.collegeTeamManager = collegeTeamManager;
    }

    @ApiOperation(value = Icons.key + " Delete a player ", authorizations = {
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
    public void makeCollegeTeam(@AuthenticationPrincipal ApplicationUser user,
                             @RequestBody String name, HttpServletResponse response) {
        try {
            response.setStatus(200);
            collegeTeamManager.makeTeam(name);
        }
        catch (IllegalArgumentException e ){
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
}
