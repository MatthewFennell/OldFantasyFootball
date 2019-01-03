package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;
import org.joda.time.DateTime;

import javax.persistence.*;
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
    private DateTime date;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public PlayerPoints(Integer goals, Integer assists, Integer mins, boolean motm, Integer yellow, boolean red, boolean clean, DateTime date) {
        this.numberOfGoals = goals;
        this.numberOfAssists = assists;
        this.minutesPlayed = mins;
        this.manOfTheMatch = motm;
        this.yellowCards = yellow;
        this.redCard = red;
        this.cleanSheet = clean;
        this.date = date;
        id = UUID.randomUUID();
    }

    public UUID getId() {
        return id;
    }

    public Integer getNumberOfGoals() {
        return numberOfGoals;
    }

    public void setNumberOfGoals(Integer numberOfGoals) {
        this.numberOfGoals = numberOfGoals;
    }

    public Integer getNumberOfAssists() {
        return numberOfAssists;
    }

    public void setNumberOfAssists(Integer numberOfAssists) {
        this.numberOfAssists = numberOfAssists;
    }

    public Integer getMinutesPlayed() {
        return minutesPlayed;
    }

    public void setMinutesPlayed(Integer minutesPlayed) {
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

    public DateTime getDate() {
        return date;
    }

    public void setDate(DateTime date) {
        this.date = date;
    }
}
