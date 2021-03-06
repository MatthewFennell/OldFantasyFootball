package uk.co.scottlogic.gradProject.server.misc;

public class Constants {

    public static final Integer MAX_TEAM_SIZE = 11;
    public static final Integer MAX_PLAYERS_PER_COLLEGE_TEAM = 3;
    public static final Integer POINTS_PER_CLEAN_SHEET = 4;
    public static final Integer POINTS_PER_DEFENDER_GOAL = 6;
    public static final Integer POINTS_PER_MIDFIELDER_GOAL = 5;
    public static final Integer POINTS_PER_ATTACKER_GOAL = 4;
    public static final Integer POINTS_PER_ASSIST = 3;
    public static final Integer POINTS_PER_RED_CARD = -5;
    public static final Integer POINTS_PER_YELLOW_CARD = -2;
    public static final Integer MAN_OF_THE_MATCH_BONUS = 3;
    public static final Integer INITIAL_BUDGET = 100;
    public static final String INITIAL_LEAGUE_NAME = "Collingwood";
    public static final String REGISTER_KEY_CODE = "fjenrtknsjtnelsdmtltn";

    public static final String ADMIN_STRING = "ROLE_ADMIN";
    public static final String USER_STRING = "ROLE_USER";
    public static final String CAPTAIN_STRING = "ROLE_CAPTAIN";

    public static final String PROFANITY_ERROR_MESSAGE = "No profanities plz, or thou shalt be banned";
    public static final String[] PROFANITIES = {"fuck", "shit", "cunt", "nigga", "nigger", "fuker", "sh!t"};



    private Constants() {

    }

}
