package uk.co.scottlogic.gradProject.server.repos.documents;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(indexes = {
        @Index(name = "idx_date_date", columnList = "date")})
public class LoginsPerDay {

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private String username;

    @Id
    @Column
    @Type(type = "uuid-char")
    private UUID id;

    public LoginsPerDay(String username) {
        this.username = username;
        this.id = UUID.randomUUID();
        this.date = new Date();
    }

    public LoginsPerDay(){

    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
