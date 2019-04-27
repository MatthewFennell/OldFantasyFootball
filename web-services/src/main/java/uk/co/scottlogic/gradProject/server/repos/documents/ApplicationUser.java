package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCrypt;
import uk.co.scottlogic.gradProject.server.misc.Constants;
import uk.co.scottlogic.gradProject.server.routers.dto.RegisterDTO;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

import static uk.co.scottlogic.gradProject.server.misc.Regex.*;

@Entity
@Table(indexes = {
        @Index(name = "idx_applicationuser_username", columnList = "username", unique = true),
        @Index(name = "idx_applicationuser_total_points", columnList = "totalPoints")})
public class ApplicationUser implements UserDetails, Serializable {

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Date accountExpiry;

    @Column(nullable = false)
    private Date credentialsExpiry;

    private String nickname;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false)
    private Integer totalPoints;

    @OneToOne
    @JoinColumn(name = "captainOf")
    private CollegeTeam captainOf;

    private boolean locked = false;

    private boolean enabled = true;

    private double remainingBudget;

    private String teamName;

    @Column
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "appuser_userauthority", joinColumns = @JoinColumn(name = "applicationuser_id"
            , referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "userauthority_id",
            referencedColumnName = "role"))
    private Set<UserAuthority> authorityList = new HashSet<>();

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "user")
    private Collection<RefreshToken> activeTokens;

    public ApplicationUser() {
    }

    public ApplicationUser(RegisterDTO dto) {
        this(dto.getUsername(), dto.getPassword(), dto.getFirstName(), dto.getSurname());
        if (!dto.getKeycode().equals(Constants.REGISTER_KEY_CODE)){
            System.out.println("invalid key");
            System.out.println("key = " + dto.getKeycode());
            throw new IllegalArgumentException("Invalid key code");
        }
    }

    public ApplicationUser(String username, String password, String firstname, String surname) {
        Calendar expiry = Calendar.getInstance();
        expiry.add(Calendar.YEAR, 1000);
        accountExpiry = expiry.getTime();
        credentialsExpiry = expiry.getTime();
        setUsername(username);
        savePassword(password);
        id = UUID.randomUUID();
        this.totalPoints = 0;
        this.remainingBudget = Constants.INITIAL_BUDGET;
        setFirstName(firstname);
        setSurname(surname);
        this.totalPoints = 0;
        this.teamName = "My Team";
        this.captainOf = null;
    }

    public CollegeTeam getCaptainOf() {
        return captainOf;
    }

    public void setCaptainOf(CollegeTeam captainOf) {
        this.captainOf = captainOf;
    }

    public Collection<RefreshToken> getActiveTokens() {
        return activeTokens;
    }

    public void setActiveTokens(Collection<RefreshToken> activeTokens) {
        this.activeTokens = activeTokens;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public Date getAccountExpiry() {
        return accountExpiry;
    }

    public void setAccountExpiry(Date accountExpiry) {
        this.accountExpiry = accountExpiry;
    }

    public Date getCredentialsExpiry() {
        return credentialsExpiry;
    }

    public void setCredentialsExpiry(Date credentialsExpiry) {
        this.credentialsExpiry = credentialsExpiry;
    }

    public Set<UserAuthority> getAuthorityList() {
        return authorityList;
    }

    public void setAuthorityList(Set<UserAuthority> auths) {
        this.authorityList = new HashSet<>(auths);
    }

    public void addAuthority(UserAuthority authority) {
        authorityList.add(authority);
    }

    public void delAuthority(GrantedAuthority authority) {
        if (authorityList.contains(authority)) {
            this.authorityList.remove(authority);
        }
    }

    @Override
    public Set<? extends GrantedAuthority> getAuthorities() {
        return new HashSet(authorityList);
    }

    public UUID getUuid() {
        return id;
    }

    public String getId() {
        return id.toString();
    }

    public void setId(UUID id) {
        this.id = id;
    }

    protected void setId(String id) {
        this.id = UUID.fromString(id);
    }

    @Override
    public String getPassword() {
        return password;
    }

    void setPassword(String password) {
        this.password = password;
    }

    public void savePassword(String password) {
        if (!password.matches(PASSWORD_PATTERN)) {
            throw new IllegalArgumentException("password");
        }
        this.password = BCrypt.hashpw(password, BCrypt.gensalt(10));
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        if (!username.matches(USERNAME_PATTERN)) {
            throw new IllegalArgumentException();
        }
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        if (!firstName.matches(FIRST_NAME_PATTERN)) {
            throw new IllegalArgumentException("First name does not match regex");
        }
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        if (!surname.matches(SURNAME_PATTERN)) {
            throw new IllegalArgumentException("Surname does not match regex");
        }
        this.surname = surname;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        System.out.println("setting team name to " + teamName);
        if (!teamName.matches(USER_TEAM_NAME_PATTERN)) {
            throw new IllegalArgumentException("Team name does not match regex");
        }
        this.teamName = teamName;
    }


    @Override
    public boolean isAccountNonExpired() {
        return new Date().before(accountExpiry);
    }

    @Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return new Date().before(credentialsExpiry);
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public double getRemainingBudget() {
        return remainingBudget;
    }

    public void setRemainingBudget(double remainingBudget) {
        this.remainingBudget = remainingBudget;
    }

    public void changeRemainingBudget(double change) {
        this.remainingBudget += change;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public void setTotalPoints(Integer totalPoints) {
        this.totalPoints = totalPoints;
    }

    public void changeTotalPoints(Integer totalPoints) {
        this.totalPoints += totalPoints;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

}
