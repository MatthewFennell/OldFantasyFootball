package uk.co.scottlogic.gradProject.server.routers.dto;

import org.springframework.security.core.GrantedAuthority;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;
import uk.co.scottlogic.gradProject.server.repos.documents.UserAuthority;

import java.util.*;

public class UserReturnDTO {

    private UUID id;

    private String username;

    private Set<GrantedAuthority> authoritySet;

    private double remainingBudget;

    private String nickname;

    private String firstName;

    private String surname;

    private Integer totalPoints;

    private String teamName;

    private List<String> roles;

    public UserReturnDTO(ApplicationUser user) {
        this.id = user.getUuid();
        this.username = user.getUsername();
        this.authoritySet = new HashSet(user.getAuthorities());
        this.remainingBudget = user.getRemainingBudget();
        this.nickname = user.getNickname();
        this.firstName = user.getFirstName();
        this.surname = user.getSurname();
        this.totalPoints = user.getTotalPoints();
        this.teamName = user.getTeamName();
        roles = new ArrayList<>();

        for (UserAuthority ua : user.getAuthorityList()) {
            roles.add(ua.getRole());
        }
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSurname() {
        return surname;
    }

    public Set<GrantedAuthority> getAuthoritySet() {
        return authoritySet;
    }

    public void setAuthoritySet(Set<GrantedAuthority> authoritySet) {
        this.authoritySet = authoritySet;
    }

    public UUID getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getNickname() {
        return nickname;
    }

}
