package uk.co.scottlogic.gradProject.server.routers.dto;

import uk.co.scottlogic.gradProject.server.repos.documents.CollegeTeam;
import uk.co.scottlogic.gradProject.server.repos.documents.Player;

public class ActiveTeamDTO {

    private String id;
    private String firstName;
    private String surname;
    private double price;
    private Player.Position position;
    private CollegeTeam team;

}
