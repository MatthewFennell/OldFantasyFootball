package uk.co.pampoomio.fennell.server.routers.dto;

import java.util.Optional;

import static uk.co.pampoomio.fennell.server.misc.Regex.PASSWORD_PATTERN;
import static uk.co.pampoomio.fennell.server.misc.Regex.USERNAME_PATTERN;

public class LoginDTO {

    private String username;

    private String password;

    private String refresh;

    public LoginDTO(Optional<String> username, Optional<String> password, Optional<String> refresh) {
        setUsername(username.orElse(null));
        setPassword(password.orElse(null));
        setRefresh(refresh.orElse(null));
    }

    public boolean isRefresh() {
        return refresh != null;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRefresh() {
        return refresh;
    }

    public void setRefresh(String refresh) {
        this.refresh = refresh;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public formatCode isValid() {
        if (refresh != null && username == null && password == null) {
            return formatCode.CORRECT;
        } else if (refresh == null && username != null && password != null) {
            if (!password.matches(PASSWORD_PATTERN)) {
                return formatCode.PASSWORD_ERROR;
            } else {
                return username.matches(USERNAME_PATTERN) ? formatCode.CORRECT : formatCode.USERNAME_ERROR;
            }
        } else {
            return formatCode.FIELD_ERROR;
        }
    }

    public enum formatCode {
        CORRECT, FIELD_ERROR, USERNAME_ERROR, PASSWORD_ERROR
    }

}