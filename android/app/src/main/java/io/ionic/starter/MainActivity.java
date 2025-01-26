package io.ionic.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.plugins.notification.LocalNotifications;
import com.pusher.pushnotifications.PushNotifications;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Initialize Pusher Push Notifications
        PushNotifications.start(getApplicationContext(), "fef21ad9-18fb-4c2a-9bac-64eb6f197664");
        PushNotifications.addDeviceInterest("hello");

        // Initialize Local Notifications
        registerPlugin(LocalNotifications.class);
    }
}
