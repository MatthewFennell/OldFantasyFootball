package uk.co.scottlogic.gradProject.server.routers.dto;

import org.springframework.security.core.GrantedAuthority;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class UserReturnDTO {

    private UUID id;

    private String username;

    private Set<GrantedAuthority> authoritySet;

    private double remainingBudget;

    private String nickname;

    private String firstName;

    private String surname;

    private String email;

    private Integer totalPoints;

    private String teamName;

    private Integer remainingTransfers;

    public UserReturnDTO(ApplicationUser user) {
        this.id = user.getUuid();
        this.username = user.getUsername();
        this.authoritySet = new HashSet(user.getAuthorities());
        this.remainingBudget = user.getRemainingBudget();
        this.nickname = user.getNickname();
        this.firstName = user.getFirstName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
        this.totalPoints = user.getTotalPoints();
        this.teamName = user.getTeamName();
        this.remainingBudget = user.getRemainingBudget();
        this.remainingTransfers = user.getRemainingTransfers();
    }

    public double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }

    public Integer getRemainingTransfers() {
        return remainingTransfers;
    }

    public void setRemainingTransfers(Integer remainingTransfers) {
        this.remainingTransfers = remainingTransfers;
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

    public String getEmail() {
        return email;
    }

    public Set<GrantedAuthority> getAuthoritySet() {
        return authoritySet;
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
