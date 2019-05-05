package uk.co.scottlogic.gradProject.server.routers.dto;

import io.swagger.annotations.ApiModel;

import static uk.co.scottlogic.gradProject.server.misc.Regex.USERNAME_PATTERN;

@ApiModel(value = "UserPatch", description = "Body for User Patch Request")
public class UserPatchDTO {

    private String firstName;
    private String surname;
    private String username;
    private String password;

    public UserPatchDTO(String firstName, String surname, String username, String password) {
        this.firstName = firstName;
        this.surname = surname;
        this.username = username;
        this.password = password;
    }

    public boolean isValid() {
        return userNameIsValid();
    }

    private boolean userNameIsValid() {
        if (username != null) {
            return username.matches(USERNAME_PATTERN);
        }
        return true;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getSurname() {
        return surname;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

}
