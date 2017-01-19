package com.salesforce.samples.smartsyncexplorerreactnative;

import android.content.Intent;
import android.support.test.InstrumentationRegistry;
import android.support.test.filters.LargeTest;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.support.test.uiautomator.UiDevice;
import android.support.test.uiautomator.UiObject;
import android.support.test.uiautomator.UiSelector;

import org.junit.After;
import org.junit.Rule;
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

    @Rule
    public ActivityTestRule<MainActivity> mActivityRule = new ActivityTestRule<MainActivity>(
            MainActivity.class, false, false) {
    };

    @Before
    public void startUiDevice() {
        UiDevice.getInstance(InstrumentationRegistry.getInstrumentation());
    }

    @Test
    public void testSmartStoreBridge() throws Exception {
        runReactNativeTest("IntegrationTestSmartStoreBridgeTest");
    }

    private void runReactNativeTest(String testName){
        Intent intent = new Intent();
        intent.putExtra("testName",testName);
        mActivityRule.launchActivity(intent);
        UiObject uiObject;
        UiSelector uiSelector = new UiSelector();
        uiObject = new UiObject(uiSelector.descriptionStartsWith("testResult"));
        assertTrue(testName+" failed", uiObject.waitForExists(10000));
    }
}