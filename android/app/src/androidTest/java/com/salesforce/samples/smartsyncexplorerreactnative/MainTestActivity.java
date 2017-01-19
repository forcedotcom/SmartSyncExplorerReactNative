package com.salesforce.samples.smartsyncexplorerreactnative;

import com.facebook.react.ReactActivityDelegate;

public class MainTestActivity extends MainActivity {

    @Override
    public boolean shouldAuthenticate() {
        return false;
    }

    @Override
    protected String getMainComponentName() {
        return "SmartSyncExplorerReactNativeTestApp";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityTestAppDelegate(this, getMainComponentName());
    }
}
