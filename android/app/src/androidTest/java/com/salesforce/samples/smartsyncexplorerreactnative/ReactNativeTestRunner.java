package com.salesforce.samples.smartsyncexplorerreactnative;

import android.app.Activity;
import android.content.pm.ActivityInfo;
import android.os.IBinder;

import android.content.Intent;


import android.support.test.runner.AndroidJUnitRunner;
import android.app.Application;
import android.content.Context;

/**
 * Created by ibogdanov on 1/17/17.
 */

public class ReactNativeTestRunner extends AndroidJUnitRunner {

    @Override
    public Application newApplication(ClassLoader cl, String className, Context context) throws InstantiationException, IllegalAccessException, ClassNotFoundException {
        return super.newApplication(cl, MainTestApplication.class.getName(), context);
    }


    @Override
    public Activity newActivity(Class<?> clazz,
                                Context context,
                                IBinder token,
                                Application application,
                                Intent intent,
                                ActivityInfo info,
                                CharSequence title,
                                Activity parent,
                                String id,
                                Object lastNonConfigurationInstance)
            throws InstantiationException, IllegalAccessException{
        return super.newActivity(MainTestActivity.class, context, token, application, intent, info, title, parent, id, lastNonConfigurationInstance);
    }

    @Override
    public Activity newActivity(ClassLoader cl, String className,
                                Intent intent)
            throws InstantiationException, IllegalAccessException,
            ClassNotFoundException {
        return super.newActivity(cl,MainTestActivity.class.getName(),intent);
    }


}