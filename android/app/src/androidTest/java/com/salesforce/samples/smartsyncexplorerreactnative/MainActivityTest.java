package com.salesforce.samples.smartsyncexplorerreactnative;

import android.support.test.InstrumentationRegistry;
import android.support.test.filters.LargeTest;
import android.support.test.runner.AndroidJUnit4;
import android.support.test.uiautomator.UiDevice;
import android.support.test.uiautomator.UiObject;
import android.support.test.uiautomator.UiSelector;

import org.junit.After;
import org.junit.Test;
import org.junit.Before;
import org.junit.runner.RunWith;

import static org.junit.Assert.*;

/**
 * Created by ibogdanov on 1/18/17.
 */
@LargeTest
@RunWith(AndroidJUnit4.class)
public class MainActivityTest {
    @After
    public void tearDown() throws Exception {

    }

    @Test
    public void shouldAuthenticate() throws Exception {

    }

    @Test
    public void getMainComponentName() throws Exception {

    }

    @Before
    public void startUiDevice() {
        UiDevice.getInstance(InstrumentationRegistry.getInstrumentation());
    }

    @Test
    public void testMainComponentName() throws Exception {
        UiObject uiObject;
        UiSelector uiSelector = new UiSelector();
        uiObject = new UiObject(uiSelector.descriptionStartsWith("testResult"));
        assertTrue("YES", uiObject.waitForExists(10000));
    }

}