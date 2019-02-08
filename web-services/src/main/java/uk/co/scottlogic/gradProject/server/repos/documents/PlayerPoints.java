package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;
import uk.co.scottlogic.gradProject.server.routers.dto.PlayerPointsDTO;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(indexes = {})
public class PlayerPoints {

    @Column(nullable = false)
    private Integer numberOfGoals;

    @Column(nullable = false)
    private Integer numberOfAssists;

    @Column(nullable = false)
    private Integer minutesPlayed;

    @Column(nullable = false)
    private boolean manOfTheMatch;

    @Column(nullable = false)
    private Integer yellowCards;

    @Column(nullable = false)
    private boolean redCard;

    @Column(nullable = false)
    private boolean cleanSheet;

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Integer week;

    @ManyToOne
    @JoinColumn
    private Player player;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    @Column(nullable = false)
    private Integer points;

    public PlayerPoints(Integer goals, Integer assists, Integer mins, boolean motm, Integer yellow, boolean red, boolean clean, Date date, Player player, Integer week) {
        this.numberOfGoals = goals;
        this.numberOfAssists = assists;
        this.minutesPlayed = mins;
        this.manOfTheMatch = motm;
        this.yellowCards = yellow;
        this.redCard = red;
        this.cleanSheet = clean;
        this.date = date;
        id = UUID.randomUUID();
        this.player = player;
        this.week = week;
        this.points = 0;
        this.date = new Date();
    }

    public PlayerPoints(PlayerPointsDTO dto, Player player) {
        this.numberOfGoals = dto.getGoals();
        this.numberOfAssists = dto.getAssists();
        this.minutesPlayed = dto.getMinutesPlayed();
        this.manOfTheMatch = dto.isManOfTheMatch();
        this.yellowCards = dto.getYellowCards();
        this.redCard = dto.isRedCard();
        this.cleanSheet = dto.isCleanSheet();
        this.minutesPlayed = dto.getMinutesPlayed();
        id = UUID.randomUUID();
        this.player = player;
        this.week = dto.getWeek();
        this.points = 0;
        this.date = new Date();
    }

    public PlayerPoints() {

    }

    public void setValues(PlayerPoints playerPoints) {
        setNumberOfGoals(playerPoints.getNumberOfGoals());
        setNumberOfAssists(playerPoints.getNumberOfAssists());
        setMinutesPlayed(playerPoints.getMinutesPlayed());
        setManOfTheMatch(playerPoints.isManOfTheMatch());
        setYellowCards(playerPoints.getYellowCards());
        setRedCard(playerPoints.isRedCard());
        setCleanSheet(playerPoints.isCleanSheet());
        setDate(playerPoints.getDate());
        setPoints(playerPoints.getPoints());

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
        if (week < 0) {
            throw new IllegalArgumentException("Week cannot be negative");
        }
        this.week = week;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public Integer getNumberOfGoals() {
        return numberOfGoals;
    }

    public void setNumberOfGoals(Integer numberOfGoals) {
        if (numberOfGoals < 0) {
            throw new IllegalArgumentException("Number of goals cannot be negative");
        }
        this.numberOfGoals = numberOfGoals;
    }

    public Integer getNumberOfAssists() {
        return numberOfAssists;
    }

    public void setNumberOfAssists(Integer numberOfAssists) {
        if (numberOfAssists < 0) {
            throw new IllegalArgumentException("Number of assists cannot be negative");
        }
        this.numberOfAssists = numberOfAssists;
    }

    public Integer getMinutesPlayed() {
        return minutesPlayed;
    }

    public void setMinutesPlayed(Integer minutesPlayed) {
        if (minutesPlayed < 0) {
            throw new IllegalArgumentException("Minutes played cannot be negative");
        }
        this.minutesPlayed = minutesPlayed;
    }

    public boolean isManOfTheMatch() {
        return manOfTheMatch;
    }

    public void setManOfTheMatch(boolean manOfTheMatch) {
        this.manOfTheMatch = manOfTheMatch;
    }

    public Integer getYellowCards() {
        return yellowCards;
    }

    public void setYellowCards(Integer yellowCards) {
        if (yellowCards < 0) {
            throw new IllegalArgumentException("Yellow cards cannot be negative");
        }
        if (yellowCards > 2) {
            throw new IllegalArgumentException("Cannot get more than 2 yellow cards");
        }
        this.yellowCards = yellowCards;
    }

    public boolean isRedCard() {
        return redCard;
    }

    public void setRedCard(boolean redCard) {
        this.redCard = redCard;
    }

    public boolean isCleanSheet() {
        return cleanSheet;
    }

    public void setCleanSheet(boolean cleanSheet) {
        this.cleanSheet = cleanSheet;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
