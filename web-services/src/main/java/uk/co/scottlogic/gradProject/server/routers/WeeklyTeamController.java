package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.*;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@EnableScheduling
@RequestMapping("/api")
@Api(value = "weeklyTeam", description = "Operations pertaining to retrieving weekly team info "
        + "from the database")
public class WeeklyTeamController {

    private static final Logger log = LoggerFactory.getLogger(User.class);

    private static final long ASSUMED_LOGOUT_AFTER_INACTIVE_TIME = 15 * 60 * 1000L;

    private PlayerRepo playerRepo;

    private CollegeTeamRepo teamRepo;

    private ApplicationUserRepo applicationUserRepo;

    private WeeklyTeamRepo weeklyTeamRepo;

    private WeeklyTeamManager weeklyTeamManager;

    @Autowired
    public WeeklyTeamController(ApplicationUserRepo applicationUserRepo, PlayerRepo playeRepo, CollegeTeamRepo teamRepo, WeeklyTeamRepo weeklyTeamRepo, WeeklyTeamManager weeklyTeamManager) {
        this.applicationUserRepo = applicationUserRepo;
        this.playerRepo = playeRepo;
        this.teamRepo = teamRepo;
        this.weeklyTeamRepo = weeklyTeamRepo;
        this.weeklyTeamManager = weeklyTeamManager;
    }

    @ApiOperation(value = Icons.key
            + " Gets all player in the active team", notes = "Requires User role",
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @GetMapping("/activeTeam/players")
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Successfully returned"),
            @ApiResponse(code = 400, message = "Invalid date"),
            @ApiResponse(code = 500, message = "Server Error")})
    @PreAuthorize("hasRole('USER')")
    public List<Player> getActiveTeamPlayers(@AuthenticationPrincipal ApplicationUser user,
                                             HttpServletResponse response) {
        try {
            System.out.println("returned a team of length " + weeklyTeamManager.getActiveTeam(user).size());
            return weeklyTeamManager.getActiveTeam(user);
        } catch (IllegalArgumentException e) {
            response.setStatus(400);
        }
        return null;
    }

}