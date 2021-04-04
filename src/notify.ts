import { getContentImage, handleIconOverride, handleSoundOverride } from './util';
import notifier from 'node-notifier';

function __notify__(type: string, notification: Notification): void {
  notification = typeof notification === 'string' ? {
    message: notification
  } : notification;

  const params = {
    ...notification,
    sender: 'com.github.atom',
    appID: 'com.squirrel.atom.atom',
    icon: handleIconOverride(notification.icon),
    contentImage: getContentImage(type),
    sound: handleSoundOverride(notification.sound)
  };

  notifier.notify(params);
}

export default {
  error(notification: Notification): void {
    __notify__('error' ,notification);
  },

  fatalError(notification: Notification): void {
    __notify__('fatal' ,notification);
  },

  info(notification: Notification): void {
    __notify__('info' ,notification);
  },

  success(notification: Notification): void {
    __notify__('success' ,notification);
  },

  warn(notification: Notification): void {
    __notify__('warning' ,notification);
  }
};
