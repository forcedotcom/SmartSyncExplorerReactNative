package com.salesforce.samples.smartsyncexplorerreactnative;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.salesforce.androidsdk.analytics.security.Encryptor;
import com.salesforce.androidsdk.app.SalesforceSDKManager;
import com.salesforce.androidsdk.reactnative.app.SalesforceReactSDKManager;

import java.util.Arrays;
import java.util.List;

public class MainTestApplication extends Application implements ReactApplication {

    private final ReactNativeHost _mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    SalesforceReactSDKManager.getInstance().getReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "IntegrationTests/testapp.android";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return _mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
//        SoLoader.init(this, /* native exopackage */ false);
        SalesforceReactSDKManager.initReactNative(getApplicationContext(), new ReactNativeKeyImpl(), MainTestActivity.class);
    }

}
