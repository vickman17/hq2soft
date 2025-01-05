package io.ionic.starter;

import com.getcapacitor.BridgeActivity;

import com.getcapacitor.LocalNotifications;
import com.getcapacitor.plugins.notification.LocalNotification;

public class MainActivity extends BridgeActivity {
        @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Register for local notifications
        LocalNotifications.registerPlugin();
    }
}
