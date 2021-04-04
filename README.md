# notify

[![apm](https://flat.badgen.net/apm/license/notify)](https://atom.io/packages/notify)
[![apm](https://flat.badgen.net/apm/v/notify)](https://atom.io/packages/notify)
[![apm](https://flat.badgen.net/apm/dl/notify)](https://atom.io/packages/notify)
[![David](https://flat.badgen.net/david/dep/idleberg/atom-notify)](https://david-dm.org/idleberg/atom-notify)

# Description

Native desktop notifications for Atom. This package is a fork of [atom-notifier][atom-notifier] by Benjamin Dean.

Differences:

- written in TypeScript
- service provider for third-party packages
- icon themes

## Installation

### apm

Install `notify` from Atom [install view](atom://settings-view/show-package?package=notify) or use the command-line equivalent:

`$ apm install notify`

### Using Git

Change to your Atom packages directory:

**Windows**

```powershell
# Powershell
$ cd $Env:USERPROFILE\.atom\packages
```

```cmd
:: Command Prompt
$ cd %USERPROFILE%\.atom\packages
```

**Linux & macOS**

```bash
$ cd ~/.atom/packages/
```

Clone the repository as `notify`:

```bash
$ git clone https://github.com/idleberg/atom-notify notify
```

Install dependencies:

```bash
cd notify && npm install
```

## Usage

### Service Provider

This package provides the service to notify users. To consume it, add the following to your `package.json`:

```json
{
  "consumedServices": {
    "notify": {
      "versions": {
        "0.1.0": "consumeNotify"
      }
    }
  }
}
```

## License

This work is licensed under the [MIT License](LICENSE)

[atom-notifier]: https://atom.io/packages/atom-notifier
