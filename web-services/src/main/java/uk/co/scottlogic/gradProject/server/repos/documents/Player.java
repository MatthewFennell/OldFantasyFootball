package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(indexes = {
        @Index(name = "idx_player_price", columnList = "price"),
        @Index(name = "idx_player_team", columnList = "team")})
public class Player {

    @OneToOne
    @JoinColumn(name = "team")
    private CollegeTeam activeTeam;

    public enum Position {
        GOALKEEPER, DEFENDER, MIDFIELDER, ATTACKER
    }

    @Column(nullable = false)
    private Position position;

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

    public Player(CollegeTeam activeTeam, Position position, double price, String firstName, String surname) {
        this.activeTeam = activeTeam;
        this.position = position;
        this.price = price;
        id = UUID.randomUUID();
        setFirstName(firstName);
        setSurname(surname);
    }

    public Player() {

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

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
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
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}
