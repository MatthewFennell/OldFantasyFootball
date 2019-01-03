package uk.co.scottlogic.gradProject.server.repos.documents;

import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.UUID;

public class UsersWeeklyTeam {
    private ApplicationUser user;
    private DateTime date;
    private ArrayList<Player> players;
    private UUID id;

    public UsersWeeklyTeam(ApplicationUser user, DateTime date, ArrayList<Player> players) {
        this.user = user;
        this.date = date;
        this.players = players;
        id = UUID.randomUUID();
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

    public DateTime getDate() {
        return date;
    }

    public void setDate(DateTime date) {
        this.date = date;
    }

    public ArrayList<Player> getPlayers() {
        return players;
    }

    public void setPlayers(ArrayList<Player> players) {
        this.players = players;
    }
}
