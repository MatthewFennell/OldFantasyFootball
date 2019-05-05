package uk.co.scottlogic.gradProject.server.routers.dto;

public class PatchPassword {

    private String originalPassword;
    private String newPasswordOne;
    private String newPasswordTwo;

    public PatchPassword(String originalPassword, String newPasswordOne, String newPasswordTwo) {
        this.originalPassword = originalPassword;
        this.newPasswordOne = newPasswordOne;
        this.newPasswordTwo = newPasswordTwo;
    }

    public String getOriginalPassword() {
        return originalPassword;
    }

    public void setOriginalPassword(String originalPassword) {
        this.originalPassword = originalPassword;
    }

    public String getNewPasswordOne() {
        return newPasswordOne;
    }

    public void setNewPasswordOne(String newPasswordOne) {
        this.newPasswordOne = newPasswordOne;
    }

    public String getNewPasswordTwo() {
        return newPasswordTwo;
    }

    public void setNewPasswordTwo(String newPasswordTwo) {
        this.newPasswordTwo = newPasswordTwo;
    }
}
