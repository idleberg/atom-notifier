import meta from '../package.json';

export const configSchema = {
    showWhenFocused: {
        title: 'Show when focused',
        description: `Shows desktop notifications when the editor has focus`,
        type: 'boolean',
        default: false,
        order: 1
    },
    iconTheme: {
      title: 'Icon Theme',
      description: 'Choose an icon theme for your notifications',
      type: 'string',
      enum: [
        // {
        //   value: 'appIconWithBadge',
        //   description: 'App Icon with Badge'
        // },
        {
          value: 'badge',
          description: 'Badge'
        }
      ],
      default: 'appIconWithBadge',
      order: 3
    },
    overrides: {
      title: 'Overrides',
      description: 'The following settings only take effect when Atom runs in developer mode',
      type: 'object',
      order: 4,
      properties: {
        sound: {
          title: 'Sound',
          type: 'string',
          enum: [
            {
              value: 'default',
              description: '(default)'
            },
            {
              value: 'always',
              description: 'Always play sound'
            },
            {
              value: 'never',
              description: 'Never play sound'
            }
          ],
          default: 'default',
          order: 1
        },
        icon: {
          title: 'Icon',
          type: 'string',
          enum: [
            {
              value: 'default',
              description: '(default)'
            },
            {
              value: 'always',
              description: 'Always show icon'
            },
            {
              value: 'never',
              description: 'Never show icon'
            }
          ],
          default: 'default',
          order: 2
        }
      }
    },
    developer: {
      title: 'Developer',
      description: 'The following settings only take effect when Atom runs in developer mode.',
      type: 'object',
      order: 5,
      properties: {
        enableCommands: {
          title: 'Enable Commands',
          description: 'Exposes a number of demo commands to Atom',
          default: true,
          order: 1
        },
        exposeToWindow: {
          title: 'Expose to Window object ',
          description: 'Allows running `notify` methods directly from the console. Requires a restart to take effect.',
          type: 'boolean',
          default: true,
          order: 2
        }
      }
    }
};

export function getConfig(key = ''): any {
  return key?.length
    ? atom.config.get(`${meta.name}.${key}`)
    : atom.config.get(`${meta.name}`);
}
