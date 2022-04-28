import * as Notifications from 'expo-notifications';

type Data = {
  [key: string]: unknown;
};

interface Content {
  title: string;
  body: string;
  data: Data;
  sound?: boolean;
}

interface ScheduleNotificationProps {
  content: Content;
  trigger: Notifications.NotificationTriggerInput;
}

const scheduleNotification = async ({
  content,
  trigger,
}: ScheduleNotificationProps): Promise<string> => {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: content.title,
      body: content.body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: content.data,
    },
    trigger,
  });

  return notificationId;
};

export { scheduleNotification };
