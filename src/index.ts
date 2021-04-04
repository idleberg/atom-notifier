import meta from '../package.json';

import { CompositeDisposable } from 'atom';
import { configSchema, getConfig } from './config';
import { mapNotificationType } from './util';
import notify from './notify';

export default {
  config: configSchema,
  contentImage: null,
  icon: null,
  showWhenFocused: false,
  subscriptions: new CompositeDisposable(),

  async activate(): Promise<void> {
    if (atom.inDevMode()) console.log('[notify] Activating package');

    this.showWhenFocused = getConfig('showWhenFocused');
    atom.config.observe(`${meta.name}.showWhenFocused`, currentValue => {
      this.showWhenFocused = currentValue;
    });

    this.subscriptions.add(atom.notifications.onDidAddNotification(Notification => {
      if (this.showWhenFocused || document.body.classList.contains('is-blurred')) {
          if (Notification) return this.intercept(Notification);
      }
    }));

    if (atom.inDevMode()) {
      if (getConfig('developer.enableCommands')) {
        this.subscriptions.add(
          atom.commands.add('atom-workspace', {
            'notify:show-error': () => this.notify({
              title: 'Error',
              message: 'This is a demo message',
              type: 'error'
            })
          }),

          atom.commands.add('atom-workspace', {
            'notify:show-fatal-error': () => this.notify({
              title: 'Fatal Error',
              message: 'This is a demo message',
              type: 'fatalError'
            })
          }),

          atom.commands.add('atom-workspace', {
            'notify:show-info': () => this.notify({
              title: 'Info',
              message: 'This is a demo message',
              type: 'info'
            })
          }),

          atom.commands.add('atom-workspace', {
            'notify:show-success': () => this.notify({
              title: 'Success',
              message: 'This is a demo message',
              type: 'success'
            })
          }),

          atom.commands.add('atom-workspace', {
            'notify:show-warning': () => this.notify({
              title: 'Warning',
              message: 'This is a demo message',
              type: 'warn'
            })
          }),
        );
      }

      if (getConfig('developer.exposeToWindow')) {
        window['notify'] = notify;
      }
    }
  },

  intercept(notification: Notification): void {
    const type = mapNotificationType(notification.getType().toLowerCase());
    const title = notification.getMessage();
    const message = notification.getDetail();
    const { dismissable } = notification.getOptions();

    const params = {
      type: type,
      title: title,
      message: message,
      wait: dismissable,
      timeout: dismissable
        ? undefined
        : atom.config.get('notifications.defaultTimeout')
    };

    this.notify(params);
  },

  notify(notifyOptions: Notification): void {
    const params = {
      ...notifyOptions,
      sender: 'com.github.atom',
      appID: 'com.squirrel.atom.atom',
    };

    notify[notifyOptions.type](params);
  },

  deactivate(): void {
    if (atom.inDevMode()) console.log('[notify] Deactivating package');

    this.subscriptions?.dispose();
  },


  provideNotify(): unknown {
    if (atom.inDevMode()) console.log('[notify] Providing service');

    return this.notify;
  }
};
