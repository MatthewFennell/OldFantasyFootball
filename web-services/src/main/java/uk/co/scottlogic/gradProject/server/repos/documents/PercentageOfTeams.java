package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

import static uk.co.scottlogic.gradProject.server.misc.Regex.COLLEGE_NAME_PATTERN;

@Entity
@Table(indexes = {
        @Index(name = "idx_percentage_percentageTeamsIn", columnList = "percentageTeamsIn")})
public class PercentageOfTeams {

    @Column(nullable = false)
    private double percentageTeamsIn;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID playerId;

    public PercentageOfTeams(UUID playerId, double percentageTeamsIn) {
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

    public UUID getPlayerId() {
        return playerId;
    }

    public void setPlayerId(UUID playerId) {
        this.playerId = playerId;
    }
}
