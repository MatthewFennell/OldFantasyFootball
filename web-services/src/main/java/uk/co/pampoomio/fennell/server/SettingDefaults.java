package uk.co.pampoomio.fennell.server;

import uk.co.pampoomio.fennell.server.repos.documents.Setting;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

public class SettingDefaults {

    private static final Map<String, Serializable> defaults = new HashMap<>();

    static {
        defaults.put("enableRegistration", Boolean.valueOf(false));
    }

    public static Setting get(String key) {
        return new Setting(key, defaults.get(key));
    }

}
