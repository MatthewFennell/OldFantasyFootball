package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;
import uk.co.scottlogic.gradProject.server.misc.Enums;

import javax.persistence.*;
import java.util.UUID;

import static uk.co.scottlogic.gradProject.server.misc.Regex.PLAYER_FIRST_NAME_PATTERN;
import static uk.co.scottlogic.gradProject.server.misc.Regex.PLAYER_SURNAME_PATTERN;

@Entity
@Table(indexes = {
        @Index(name = "idx_player_price", columnList = "price"),
        @Index(name = "idx_player_team", columnList = "college_team")})
public class Player {

    @OneToOne
    @JoinColumn(name = "college_team")
    private CollegeTeam activeTeam;

    @Column(nullable = false)
    private Enums.Position position;

    @Column(nullable = false)
    private double price;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String surname;

    private Integer totalScore;

    private Integer totalGoals;

    private Integer totalAssists;

    public Player(CollegeTeam activeTeam, Enums.Position position, double price, String firstName, String surname) {
        this.activeTeam = activeTeam;
        this.position = position;
        this.price = price;
        id = UUID.randomUUID();
        setFirstName(firstName);
        setSurname(surname);
        this.totalScore = 0;
        this.totalGoals = 0;
        this.totalAssists = 0;
    }

    public Player() {

    }

    public Integer getTotalScore() {
        return totalScore;
    }

    public void setTotalScore(Integer totalScore) {
        this.totalScore = totalScore;
    }

    public void changeScore(Integer change) {
        this.totalScore += change;
    }

    public Integer getTotalGoals() {
        return totalGoals;
    }

    public void setTotalGoals(Integer totalGoals) {
        this.totalGoals = totalGoals;
    }

    public Integer getTotalAssists() {
        return totalAssists;
    }

    public void setTotalAssists(Integer totalAssists) {
        this.totalAssists = totalAssists;
    }

    public void changeGoals(Integer change) {
        this.totalGoals += change;
    }

    public void changeAssists(Integer change) {
        this.totalAssists += change;
    }

    public UUID getId() {
        return id;
    }

    public CollegeTeam getActiveTeam() {
        return activeTeam;
    }

    public void setActiveTeam(CollegeTeam activeTeam) {
        this.activeTeam = activeTeam;
    }

    public Enums.Position getPosition() {
        return position;
    }

    public void setPosition(Enums.Position position) {
        this.position = position;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {

        if (!firstName.matches(PLAYER_FIRST_NAME_PATTERN)) {
            throw new IllegalArgumentException("Players first name does not match regex");
        }
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {

        if (!surname.matches(PLAYER_SURNAME_PATTERN)) {
            throw new IllegalArgumentException("Players first name does not match regex");
        }
        this.surname = surname;
    }

    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (obj.getClass() == Player.class) {
            Player comparison = (Player) obj;
            if (comparison.getPrice() == this.getPrice()) {
                if (comparison.getSurname().equals(this.getSurname())) {
                    if (comparison.getFirstName().equals(this.getFirstName())) {
                        if (comparison.getPosition() == this.getPosition()) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }


}
