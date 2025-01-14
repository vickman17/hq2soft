package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.pusher.pushnotifications.PushNotifications;
import com.getcapacitor.LocalNotifications;
import com.getcapacitor.plugins.notification.LocalNotification;

public class MainActivity extends BridgeActivity {
        @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        PushNotifications.start(getApplicationContext(), "fef21ad9-18fb-4c2a-9bac-64eb6f197664");
        PushNotifications.addDeviceInterest("hello");
        // Register for local notifications
        LocalNotifications.registerPlugin();
    }
}
