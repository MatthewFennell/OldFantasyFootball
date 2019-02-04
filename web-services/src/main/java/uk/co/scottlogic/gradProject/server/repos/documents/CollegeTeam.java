package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(indexes = {
        @Index(name = "idx_team_name", columnList = "name", unique = true),
        @Index(name = "idx_team_goalsFor", columnList = "goalsFor")})
public class CollegeTeam {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer wins;

    @Column(nullable = false)
    private Integer draws;

    @Column(nullable = false)
    private Integer losses;

    @Column(nullable = false)
    private Integer goalsFor;

    @Column(nullable = false)
    private Integer goalsAgainst;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public CollegeTeam(String name) {
        this.name = name;
        setWins(0);
        setDraws(0);
        setLosses(0);
        setGoalsFor(0);
        setGoalsAgainst(0);
        id = UUID.randomUUID();
    }

    public CollegeTeam() {

    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getWins() {
        return wins;
    }

    public void setWins(Integer wins) {
        if (wins < 0){
            throw new IllegalArgumentException("Number of wins cannot be negative");
        }
        this.wins = wins;
    }

    public Integer getDraws() {
        return draws;
    }

    public void setDraws(Integer draws) {
        if (draws < 0){
            throw new IllegalArgumentException("Number of draws cannot be negative");
        }
        this.draws = draws;
    }

    public Integer getLosses() {
        return losses;
    }

    public void setLosses(Integer losses) {
        if (losses < 0){
            throw new IllegalArgumentException("Number of losses cannot be negative");
        }
        this.losses = losses;
    }

    public Integer getGoalsFor() {
        return goalsFor;
    }

    public void setGoalsFor(Integer goalsFor) {
        if (goalsFor < 0){
            throw new IllegalArgumentException("Number of goals for cannot be negative");
        }
        this.goalsFor = goalsFor;
    }

    public Integer getGoalsAgainst() {
        return goalsAgainst;
    }

    public void setGoalsAgainst(Integer goalsAgainst) {
        if (goalsAgainst < 0){
            throw new IllegalArgumentException("Number of goals against for cannot be negative");
        }
        this.goalsAgainst = goalsAgainst;
    }
}
