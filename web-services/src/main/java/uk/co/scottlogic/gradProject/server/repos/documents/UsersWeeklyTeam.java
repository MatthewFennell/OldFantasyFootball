package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(indexes = {
        @Index(name = "idx_team_date", columnList = "date")})
public class UsersWeeklyTeam {


    @OneToOne
    @JoinColumn(name = "user")
    private ApplicationUser user;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Integer week;

    @Column(nullable = false)
    private Integer points;

    @ManyToMany
    @JoinColumn(name = "players")
    @Column
    private List<Player> players;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public UsersWeeklyTeam(ApplicationUser user, Date date, List<Player> players, Integer week) {
        this.user = user;
        this.date = date;
        this.players = players;
        this.week = week;
        id = UUID.randomUUID();
        this.points = 0;
    }

    private UsersWeeklyTeam() {

    }

    public void changePoints(Integer change) {
        this.points += change;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Integer getWeek() {
        return week;
    }

    public void setWeek(Integer week) {
        this.week = week;
    }

    public UUID getId() {
        return id;
    }

    public ApplicationUser getUser() {
        return user;
    }

    public void setUser(ApplicationUser user) {
        this.user = user;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public void addPlayer(Player player) {
        players.add(player);
    }

    public void removePlayer(Player player) {
        players.remove(player);
    }

}
