package uk.co.scottlogic.gradProject.server.repos.documents;

import org.junit.Before;
import org.junit.Test;

import java.util.Date;
import java.util.UUID;

import static org.junit.Assert.*;

public class SettingTest {

    @Before
    public void setUp() {
    }

    @Test
    public void settingCreation() {
        String option = "option";
        Integer object = 5;
        new Setting(option, object);
        new Setting(option);
        new Setting();
    }

    @Test
    public void settingAndGettingOptionAndValue() {
        String option = "option";
        Integer object = 5;
        Setting setting = new Setting(option, object);
        assertEquals(option, setting.getOption());
        assertEquals(object, setting.getValue());
        String newOption = "new option";
        setting.setOption(newOption);
        assertEquals(newOption, setting.getOption());
        Integer newNewObject = 20;
        setting.setValue(newNewObject);
        assertEquals(newNewObject, setting.getValue());
    }

    @Test
    public void settingGettingBoolValue() {
        String option = "option";
        Setting setting = new Setting(option, false);
        assertFalse(setting.getBool());
    }

    @Test
    public void settingGettingStr() {
        String option = "option";
        String object = "test";
        Setting setting = new Setting(option, object);
        assertEquals(object, setting.getStr());
    }

    @Test
    public void settingRefreshTokenIDShouldChangeIt() {
        UUID id = UUID.randomUUID();
        RefreshToken rt = new RefreshToken();
        rt.setRefresh(id);
        assertEquals(id, rt.getRefresh());
    }

    @Test
    public void settingRefreshTokenUserShouldChangeIt() {
        ApplicationUser user = new ApplicationUser();
        RefreshToken rt = new RefreshToken();
        rt.setUser(user);
        assertEquals(user, rt.getUser());
    }

    @Test
    public void settingRefreshTokenUsedShouldChangeIt() {
        RefreshToken rt = new RefreshToken();
        rt.setUsed(true);
        assertTrue(rt.isUsed());
        rt.setUsed(false);
        assertFalse(rt.isUsed());
    }

    @Test
    public void refreshTokenConstructorSetsCorrectly() {
        Date date = new Date();
        ApplicationUser user = new ApplicationUser();
        UUID id = UUID.randomUUID();
        RefreshToken rt = new RefreshToken(id, user, date);
        assertEquals(date, rt.getExpiry());
        assertEquals(user, rt.getUser());
        assertEquals(id, rt.getRefresh());
    }

}