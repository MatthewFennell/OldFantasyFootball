package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

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

    public League(ApplicationUser owner, String leagueName, List<ApplicationUser> participants, Integer startWeek, String codeToJoin) {
        this.owner = owner;
        this.participants = participants;
        this.startWeek = startWeek;
        id = UUID.randomUUID();
        this.points = 0;
        setCodeToJoin(codeToJoin);
        setLeagueName(leagueName);
    }

    private League() {

    }

    public String getLeagueName() {
        return leagueName;
    }

    public void setLeagueName(String leagueName) {
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
        this.startWeek = startWeek;
    }

    public UUID getId() {
        return id;
    }

    public void addParticipant(ApplicationUser participant) {
        participants.add(participant);
    }

}
