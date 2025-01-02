package power.com.capacitorbadge;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import androidx.core.app.NotificationManagerCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Method;

@CapacitorPlugin(name = "CapacitorBadge")
public class CapacitorBadgePlugin extends Plugin {

    // The channel ID for notifications
    private static final String CHANNEL_ID = "badge_channel";

    @Method
    public void setBadgeCount(PluginCall call) {
        int count = call.getInt("count", 0);

        if (count >= 0) {
            // Set badge count logic for Android
            setBadge(count);
            call.resolve(); // Resolving the call after setting the badge count
        } else {
            call.reject("Invalid count");
        }
    }

    // Method to set the badge count
    private void setBadge(int count) {
        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(getContext());

        // For Android Oreo (API level 26) and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Create a notification channel for badge count (necessary for API 26 and above)
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Badge Channel", NotificationManager.IMPORTANCE_DEFAULT);
            notificationManager.createNotificationChannel(channel);

            // Create a notification with the badge count
            Notification notification = new Notification.Builder(getContext(), CHANNEL_ID)
                    .setContentTitle("Badge Notification")
                    .setContentText("You have " + count + " new notifications")
                    .setSmallIcon(android.R.drawable.ic_notification_overlay)
                    .setNumber(count) // Set the badge count here
                    .build();

            // Send the notification
            notificationManager.notify(0, notification);

        } else {
            // Handle badge count for devices below Android Oreo
            // Note: Many devices (like Samsung) use custom methods for badge count
            // Example for Samsung devices (requires additional setup in manifest):
            // setBadgeCountForSamsung(count);

            // You can also try to use other methods like third-party libraries for badge management
        }
    }

    // Optionally, if you want to handle badges for older versions (like Samsung's badge management), you could implement a custom method
    // private void setBadgeCountForSamsung(int count) {
    //     // Samsung and other manufacturers might require custom handling
    // }
}
