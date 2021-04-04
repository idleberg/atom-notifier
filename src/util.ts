import { getConfig } from './config';
import { join } from 'path';

function getContentImage(type) {
  const { iconTheme } = getConfig();

  switch (iconTheme) {
    case 'appIconWithBadge':
      return join(__dirname, '..', `/images/atom-${atom.getReleaseChannel()}-${type}.png`);

    case 'badge':
      return join(__dirname, '..', `/images/badge-${type}.png`);

    default:
      throw Error(`Unsupported icon theme: ${iconTheme}`);
  }
}

function handleIconOverride(icon) {
    const overrideSound = getConfig('overrides.icon');
    const defaultIcon = join(__dirname, '..', `/images/atom-${atom.getReleaseChannel()}.png`);

    switch (overrideSound) {
      case 'never':
        return undefined;

      case 'always':
        return icon || defaultIcon;

      default:
        icon;
    }
}

function handleSoundOverride(playSound) {
    const overrideSound = getConfig('overrides.sound');

    switch (overrideSound) {
      case 'never':
        return false;

      case 'always':
        return true;

      default:
        return playSound;
    }
}

function mapNotificationType(type) {
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
