package uk.co.scottlogic.gradProject.server.routers.dto;

public class LeagueAdminDTO {
    private boolean userIsAdmin;
    private String code;

    public LeagueAdminDTO(boolean isAdmin, String code) {
        this.userIsAdmin = isAdmin;
        this.code = code;
    }

    public LeagueAdminDTO() {
    }

    public boolean isUserIsAdmin() {
        return userIsAdmin;
    }

    public void setUserIsAdmin(boolean userIsAdmin) {
        this.userIsAdmin = userIsAdmin;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
