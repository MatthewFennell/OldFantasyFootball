package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

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

    @ManyToMany
    @JoinColumn(name = "players")
    @Column
    private List<Player> players;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public UsersWeeklyTeam(ApplicationUser user, Date date, List<Player> players) {
        this.user = user;
        this.date = date;
        this.players = players;
        id = UUID.randomUUID();
    }

    private UsersWeeklyTeam(){

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

    public void addPlayer(Player player){
        players.add(player);
    }
}
