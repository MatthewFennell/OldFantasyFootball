package uk.co.scottlogic.gradProject.server.routers.dto;

import org.springframework.security.core.GrantedAuthority;
import uk.co.scottlogic.gradProject.server.repos.documents.ApplicationUser;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

public class UserReturnDTO {

    private UUID id;

    private String username;

    private boolean accountExpired;

    private boolean credentialsExpired;

    private boolean locked;

    private boolean enabled;

    private Set<GrantedAuthority> authoritySet;

    private double remainingBudget;

    private String nickname;

    private String firstName;

    private String surname;

    private String email;

    public UserReturnDTO(ApplicationUser user) {
        this.id = user.getUuid();
        this.username = user.getUsername();
        this.accountExpired = !user.isAccountNonExpired();
        this.credentialsExpired = !user.isCredentialsNonExpired();
        this.locked = !user.isAccountNonLocked();
        this.enabled = user.isEnabled();
        this.authoritySet = new HashSet(user.getAuthorities());
        this.remainingBudget = user.getRemainingBudget();
        this.nickname = user.getNickname();
        this.firstName = user.getFirstName();
        this.surname = user.getSurname();
        this.email = user.getEmail();
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

    public double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(double remainingBudget) {
        this.remainingBudget = remainingBudget;
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

    public boolean isAccountExpired() {
        return accountExpired;
    }

    public boolean isCredentialsExpired() {
        return credentialsExpired;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public boolean isLocked() {
        return locked;
    }

    public String getNickname() {
        return nickname;
    }

}
