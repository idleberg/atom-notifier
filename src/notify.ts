import { getContentImage, handleIconOverride, handleSoundOverride } from './util';
import notifier from 'node-notifier';

function __notify__(type, notification) {
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
  error(notification) {
    __notify__('error' ,notification);
  },

  fatalError(notification) {
    __notify__('fatal' ,notification);
  },

  info(notification) {
    __notify__('info' ,notification);
  },

  success(notification) {
    __notify__('success' ,notification);
  },

  warn(notification) {
    __notify__('warning' ,notification);
  }
};
