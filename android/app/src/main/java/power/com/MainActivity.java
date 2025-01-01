package power.com;

import android.os.Bundle;
import android.util.Log;

import com.getcapacitor.BridgeActivity;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Request the FCM token here
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(task -> {
                if (!task.isSuccessful()) {
                    Log.w("PushNotification", "Fetching FCM registration token failed", task.getException());
                    return;
                }
                // Get the FCM token
                String token = task.getResult();
                Log.d("PushNotification", "FCM Token: " + token);
            });
    }
}
