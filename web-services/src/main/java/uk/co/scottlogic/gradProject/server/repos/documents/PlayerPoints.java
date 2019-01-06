package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

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

    @ManyToOne
    @JoinColumn
    private Player player;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public PlayerPoints(Integer goals, Integer assists, Integer mins, boolean motm, Integer yellow, boolean red, boolean clean, Date date, Player player) {
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
    }

    private PlayerPoints() {

    }

    public UUID getId() {
        return id;
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

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double calculateScore(){
        double total = 0;
        if (player.getPosition() == Player.Position.DEFENDER || player.getPosition() == Player.Position.GOALKEEPER){
            total += numberOfGoals*6;
            if (cleanSheet){
                total += 4;
            }
        }
        else if (player.getPosition() == Player.Position.MIDFIELDER){
            total += numberOfGoals*5;
        }
        else if (player.getPosition() == Player.Position.ATTACKER){
            total += numberOfGoals*4;
        }
        total += numberOfAssists *3;

        if (minutesPlayed > 60){
            total += 2;
        }
        else if (minutesPlayed > 0){
            total += 1;
        }
        total -= yellowCards;
        if (redCard){
            total -= 3;
        }
        if (manOfTheMatch){
            total += 3;
        }
        return total;
    }
}
