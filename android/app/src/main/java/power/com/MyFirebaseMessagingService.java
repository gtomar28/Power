import android.app.NotificationChannel;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.app.Notification;
import android.app.NotificationManager;
import androidx.core.app.NotificationCompat;
import android.content.Context;
import android.os.Build;
import android.util.Log;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private static final String CHANNEL_ID = "default_channel";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        if (remoteMessage.getNotification() != null) {
            sendNotification(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody());
        }
    }

    @Override
    public void onNewToken(String token) {
        // Log and handle token update
        Log.d("FCM_TOKEN", "New token: " + token);
    }

    private void sendNotification(String title, String body) {
        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    "Default Notifications",
                    NotificationManager.IMPORTANCE_DEFAULT
            );
            notificationManager.createNotificationChannel(channel);
        }

        NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle(title)
                .setContentText(body)
                .setSmallIcon(android.R.drawable.ic_dialog_info)  // System default icon
                .setAutoCancel(true);

        notificationManager.notify(0, notificationBuilder.build());
    }
}








// import android.app.NotificationChannel;
// import com.google.firebase.messaging.FirebaseMessagingService;
// import com.google.firebase.messaging.RemoteMessage;
// import android.app.Notification;
// import android.app.NotificationManager;
// import androidx.core.app.NotificationCompat;
// import android.content.Context;
// import android.os.Build;
// import android.util.Log;



// public class MyFirebaseMessagingService extends FirebaseMessagingService {

//     private static final String CHANNEL_ID = "default_channel";


//     @Override
// public void onMessageReceived(RemoteMessage remoteMessage) {
//     if (remoteMessage.getNotification() != null) {
//         sendNotification(remoteMessage.getNotification().getTitle(), remoteMessage.getNotification().getBody());
//     }
// }

// private void sendNotification(String title, String body) {
//     NotificationManager notificationManager =
//             (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

//     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//         NotificationChannel channel = new NotificationChannel(
//                 "default_channel",
//                 "Default Channel",
//                 NotificationManager.IMPORTANCE_DEFAULT
//         );
//         notificationManager.createNotificationChannel(channel);
//     }

//     NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, "default_channel")
//             .setSmallIcon(android.R.drawable.ic_dialog_info)  // System default icon
//             .setContentTitle(title)
//             .setContentText(body)
//             .setAutoCancel(true);

//     notificationManager.notify(0, notificationBuilder.build());
// }


//     // @Override
//     // public void onMessageReceived(RemoteMessage remoteMessage) {
//     //     // Handle message here

//     //     // Create Notification Channel for Android >= 8.0 (Oreo)
//     //     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//     //         NotificationChannel channel = new NotificationChannel(
//     //                 CHANNEL_ID,
//     //                 "Default Notifications",
//     //                 NotificationManager.IMPORTANCE_DEFAULT
//     //         );
//     //         NotificationManager notificationManager = getSystemService(NotificationManager.class);
//     //         notificationManager.createNotificationChannel(channel);
//     //     }

//     //     // Create notification
//     //     Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
//     //             .setContentTitle(remoteMessage.getNotification().getTitle())
//     //             .setContentText(remoteMessage.getNotification().getBody())
//     //             .setSmallIcon(android.R.drawable.ic_dialog_info)  // System default icon
//     //             .build();

//     //     NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//     //     notificationManager.notify(0, notification);
//     // }

//     // @Override
//     // public void onNewToken(String token) {
//     //     Log.d("FCM Token", "New token: " + token);
//     // }

//     // // Helper method to send the notification
//     // private void sendNotification(String title, String body) {
//     //     NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, "default_channel")
//     //             .setContentTitle(title)
//     //             .setContentText(body)
//     //             .setSmallIcon(android.R.drawable.ic_dialog_info)
//     //             .setAutoCancel(true);

//     //     NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//     //     notificationManager.notify(0, notificationBuilder.build());
//     // }
// }

                    
