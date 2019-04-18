package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(indexes = {
        @Index(name = "idx_percentage_percentageTeamsIn", columnList = "percentageTeamsIn")})
public class PercentageOfTeams {

    @Column(nullable = false)
    private double percentageTeamsIn;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public PercentageOfTeams(UUID playerId, double percentageTeamsIn) {
        this.id = playerId;
        this.percentageTeamsIn = percentageTeamsIn;
    }

    public PercentageOfTeams() {

    }

    public double getPercentageTeamsIn() {
        return percentageTeamsIn;
    }

    public void setPercentageTeamsIn(double percentageTeamsIn) {
        this.percentageTeamsIn = percentageTeamsIn;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
