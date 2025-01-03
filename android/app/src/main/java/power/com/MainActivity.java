package power.com;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {}




// package power.com;

// import android.os.Bundle;
// import android.util.Log;

// import com.getcapacitor.BridgeActivity;
// import com.google.firebase.messaging.FirebaseMessaging;

// public class MainActivity extends BridgeActivity {

//     @Override
//     protected void onCreate(Bundle savedInstanceState) {
//         super.onCreate(savedInstanceState);

//         // Request the FCM token here
//         FirebaseMessaging.getInstance().getToken()
//             .addOnCompleteListener(task -> {
//                 if (!task.isSuccessful()) {
//                     Log.w("PushNotification", "Fetching FCM registration token failed", task.getException());
//                     return;
//                 }
//                 // Get the FCM token
//                 String token = task.getResult();
//                 Log.d("PushNotification", "FCM Token: " + token);
//                 // You can send the token to your backend here
//             });
//     }
// }
