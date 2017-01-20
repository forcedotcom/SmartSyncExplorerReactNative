package com.salesforce.samples.smartsyncexplorerreactnative;

import android.app.Activity;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;

import com.facebook.react.ReactActivityDelegate;

import javax.annotation.Nullable;

public class ReactActivityTestAppDelegate extends ReactActivityDelegate {

    private Activity activity;

    public ReactActivityTestAppDelegate(Activity activity, @Nullable String mainComponentName) {
        super(activity, mainComponentName);
        this.activity = activity;
    }

    @Override
    protected @Nullable
    Bundle getLaunchOptions() {

        Bundle b = activity.getIntent().getExtras();
        String testName = "";
        if(b != null)
            testName = b.getString("testName","");
        Bundle initialProps = new Bundle();
        initialProps.putString("testName", testName);
        return initialProps;
    }
}
