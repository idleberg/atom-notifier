import { getContentImage, handleIconOverride, handleSoundOverride } from './util';
import notifier from 'node-notifier';

export default {

  __notify__(type, notification) {
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
  },

  error(notification) {
    this.__notify__('error' ,notification);
  },

  fatalError(notification) {
    this.__notify__('fatal' ,notification);
  },

  info(notification) {
    this.__notify__('info' ,notification);
  },

  success(notification) {
    this.__notify__('success' ,notification);
  },

  warn(notification) {
    this.__notify__('warning' ,notification);
  }
};
