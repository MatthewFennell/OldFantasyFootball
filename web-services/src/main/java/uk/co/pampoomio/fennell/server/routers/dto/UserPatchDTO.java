package uk.co.pampoomio.fennell.server.routers.dto;

import io.swagger.annotations.ApiModel;

import static uk.co.pampoomio.fennell.server.misc.Regex.EMAIL_PATTERN;
import static uk.co.pampoomio.fennell.server.misc.Regex.USERNAME_PATTERN;

@ApiModel(value = "UserPatch", description = "Body for User Patch Request")
public class UserPatchDTO {

    private String firstName;

    private String surname;

    private String username;

    private String email;

    private String password;

    public UserPatchDTO(String firstName, String surname, String username, String email,
                        String password) {
        this.firstName = firstName;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public boolean isValid() {
        return userNameIsValid() && emailIsValid();
    }

    private boolean userNameIsValid() {
        if (username != null) {
            return username.matches(USERNAME_PATTERN);
        }
        return true;
    }

    private boolean emailIsValid() {
        if (email != null) {
            return email.matches(EMAIL_PATTERN);
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

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
