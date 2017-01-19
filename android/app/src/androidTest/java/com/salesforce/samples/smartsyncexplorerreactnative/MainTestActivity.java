package com.salesforce.samples.smartsyncexplorerreactnative;

import android.os.Bundle;

import com.facebook.react.ReactActivityDelegate;

public class MainTestActivity extends MainActivity {

    private String _testName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "SmartSyncExplorerReactNativeTestApp";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new TestAppReactActivityDelegate(this, getMainComponentName());
    }
}
