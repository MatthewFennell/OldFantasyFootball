package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;
import uk.co.scottlogic.gradProject.server.misc.Constants;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

import static uk.co.scottlogic.gradProject.server.misc.Constants.PROFANITIES;
import static uk.co.scottlogic.gradProject.server.misc.Regex.LEAGUE_NAME_PATTERN;

@Entity
@Table(indexes = {
        @Index(name = "idx_league_name", columnList = "leagueName", unique = true)})
public class League {

    @OneToOne
    @JoinColumn(name = "owner")
    private ApplicationUser owner;

    @Column(nullable = false)
    private Integer startWeek;

    @Column(nullable = false)
    private String leagueName;

    @Column(nullable = false)
    private Integer points;

    @Column(nullable = false)
    private String codeToJoin;

    @ManyToMany
    @JoinColumn(name = "participants")
    @Column
    private List<ApplicationUser> participants;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public League(ApplicationUser owner, String leagueName, List<ApplicationUser> participants, Integer startWeek) {
        this.owner = owner;
        this.participants = participants;
        setStartWeek(startWeek);
        id = UUID.randomUUID();
        this.points = 0;
        setCodeToJoin(id.toString());
        setLeagueName(leagueName);
    }

    public League() {

    }

    public String getLeagueName() {
        return leagueName;
    }

    public void setLeagueName(String leagueName) {
        if (!leagueName.matches(LEAGUE_NAME_PATTERN)) {
            throw new IllegalArgumentException("League name does not match regex");
        }
        for (String PROFANITY : PROFANITIES) {
            if (leagueName.toLowerCase().contains(PROFANITY)) {
                throw new IllegalArgumentException(Constants.PROFANITY_ERROR_MESSAGE);
            }
        }

        this.leagueName = leagueName;
    }

    public void changePoints(Integer change) {
        this.points += change;
    }

    public String getCodeToJoin() {
        return codeToJoin;
    }

    public void setCodeToJoin(String codeToJoin) {
        this.codeToJoin = codeToJoin;
    }

    public ApplicationUser getOwner() {
        return owner;
    }

    public void setOwner(ApplicationUser owner) {
        this.owner = owner;
    }

    public List<ApplicationUser> getParticipants() {
        return participants;
    }

    public void setParticipants(List<ApplicationUser> participants) {
        this.participants = participants;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Integer getStartWeek() {
        return startWeek;
    }

    public void setStartWeek(Integer startWeek) {
        if (startWeek < 0) {
            throw new IllegalArgumentException("Start week cannot be negative");
        }
        this.startWeek = startWeek;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void addParticipant(ApplicationUser participant) {
        participants.add(participant);
    }

}
