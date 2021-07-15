import Config from './config';
import { join } from 'path';

function getContentImage(type: string): string {
  const iconTheme = String(Config.get('iconTheme'));

  switch (iconTheme) {
    case 'appIconWithBadge':
      return join(__dirname, '..', `/images/atom-${atom.getReleaseChannel()}-${type}.png`);

    case 'badge':
      return join(__dirname, '..', `/images/badge-${type}.png`);

    default:
      throw Error(`Unsupported icon theme: ${iconTheme}`);
  }
}

function handleIconOverride(icon: string): string {
    const overrideSound: string = Config.get('overrides.icon');
    const defaultIcon = join(__dirname, '..', `/images/atom-${atom.getReleaseChannel()}.png`);

    switch (overrideSound) {
      case 'never':
        return undefined;

      case 'always':
        return icon || defaultIcon;

      default:
        return icon;
    }
}

function handleSoundOverride(playSound: boolean): boolean {
    const overrideSound = Config.get('overrides.sound');

    switch (overrideSound) {
      case 'never':
        return false;

      case 'always':
        return true;

      default:
        return playSound;
    }
}

function mapNotificationType(type: string): string {
  type = type.toLowerCase();

  switch(type) {
    case 'fatal':
    case 'fatalerror':
      return 'fatalError';

    case 'warning':
      return 'warn';

    default:
      return type;
  }
}

export {
  getContentImage,
  handleIconOverride,
  handleSoundOverride,
  mapNotificationType
};
