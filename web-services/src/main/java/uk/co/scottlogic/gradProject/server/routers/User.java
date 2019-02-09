package uk.co.scottlogic.gradProject.server.routers;

import io.swagger.annotations.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import uk.co.scottlogic.gradProject.server.misc.ExceptionLogger;
import uk.co.scottlogic.gradProject.server.misc.Icons;
import uk.co.scottlogic.gradProject.server.repos.ApplicationUserManager;
import uk.co.scottlogic.gradProject.server.repos.ApplicationUserRepo;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.routers.dto.UserPatchDTO;
import uk.co.scottlogic.gradProject.server.routers.dto.UserReturnDTO;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api")
@Api(value = "user", description = "Operations pertaining to User details (For authentication see"
        + " token)")
public class User {

    private static final Logger log = LoggerFactory.getLogger(User.class);

    private ApplicationUserRepo applicationUserRepo;

    private ApplicationUserManager applicationUserManager;

    @Autowired
    public User(ApplicationUserRepo applicationUserRepo,
                ApplicationUserManager applicationUserManager) {
        this.applicationUserRepo = applicationUserRepo;
        this.applicationUserManager = applicationUserManager;
    }


    @ApiOperation(value = Icons.key
            + " Gets all user details", notes = "Requires User role", response = UserReturnDTO.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Users successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/all")
    @PreAuthorize("hasRole('ADMIN')")
    public Iterable<ApplicationUser> getAll(@AuthenticationPrincipal ApplicationUser user,
                                            HttpServletResponse response) {
        try {
            return applicationUserRepo.findAll();
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        try {
            response.sendError(500, "Cannot be no users in the system if this is performed");
        } catch (IOException e) {
            response.setStatus(500);
        }
        return null;
    }

    @ApiOperation(value = Icons.key
            + " Gets current user details", notes = "Requires User role", response =
            UserReturnDTO.class, authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/current")
    @PreAuthorize("hasRole('USER')")
    public UserReturnDTO getCurrent(@AuthenticationPrincipal ApplicationUser user,
                                    HttpServletResponse response) {
        try {
            return new UserReturnDTO(user);
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        return null;
    }

    @ApiOperation(value = Icons.key
            + " Gets users remaining budget", notes = "Requires User role", response =
            UserReturnDTO.class, authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User successfully returned"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action")})
    @GetMapping("/user/budget")
    @PreAuthorize("hasRole('USER')")
    public double getRemainingBudget(@AuthenticationPrincipal ApplicationUser user,
                                    HttpServletResponse response) {
        try {
            return user.getRemainingBudget();
        } catch (Exception e) {
            ExceptionLogger.logException(e);
        }
        return 0;
    }

    @ApiOperation(value = Icons.key
            + " Set the users team name", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "Team Name Successfully Set"),
            @ApiResponse(code = 400, message = "Team name property not valid"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @PatchMapping("/user/teamName")
    @PreAuthorize("hasRole('USER')")
    public void patchTeamName(@AuthenticationPrincipal ApplicationUser user,
                              String teamName, HttpServletResponse response) {
        try {
            applicationUserManager.setTeamName(user, teamName);
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            ExceptionLogger.logException(e);
            response.setStatus(500);
        }
    }

    @ApiOperation(value = Icons.key
            + " Patches current user detail", notes = "Requires User role", response = void.class,
            authorizations = {
                    @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 200, message = "User Successfully Patched"),
            @ApiResponse(code = 400, message = "Patch property not valid"),
            @ApiResponse(code = 403, message = "You are not permitted to perform that action"),
            @ApiResponse(code = 409, message = "Patch property conflicts with existing resource or "
                    + "property"), @ApiResponse(code = 500, message = "Server Error")})
    @PatchMapping("/user/current")
    @PreAuthorize("hasRole('USER')")
    public void patchCurrent(@AuthenticationPrincipal ApplicationUser user,
                             @RequestBody UserPatchDTO dto, HttpServletResponse response) {
        try {
            applicationUserManager.patchUser(user, dto);
        } catch (IllegalArgumentException e) {
            try {
                response.sendError(400, e.getMessage());
            } catch (IOException e1) {
                e1.printStackTrace();
            }
            ExceptionLogger.logException(e);
            response.setStatus(500);
        }
    }

    @ApiOperation(value = Icons.key
            + " Deletes Current user", notes = "Requires User role", authorizations = {
            @Authorization(value = "jwtAuth")})
    @ApiResponses(value = {@ApiResponse(code = 204, message = "User Successfully deleted"),
            @ApiResponse(code = 403, message = "Not permitted to do that")})
    @DeleteMapping("/user/current")
    @PreAuthorize("hasRole('USER')")
    public void deleteCurrent(@AuthenticationPrincipal ApplicationUser user,
                              HttpServletResponse response) {
        applicationUserRepo.delete(user);
        response.setStatus(204);
    }
}