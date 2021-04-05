const sharp = require('sharp');
const { resolve } = require('path');
const { promises: fs } = require('fs');
const logSymbols = require('log-symbols');

const channels = [
  'beta',
  'dev',
  'nightly',
  'stable'
];

const types = [
  'error',
  'fatal',
  'info',
  'success',
  'warning'
];

async function copyFile(source, target) {
  let status;

  try {
    await fs.copyFile(source, target);
    status = logSymbols.success;
  } catch (err) {
    status = logSymbols.error;
  } finally {
    console.log(`${status} Copied ${target}`);
  }
}

(async () => {
  let dirStatus;

  try {
    await fs.mkdir('images');
    dirStatus = logSymbols.success;
  } catch (err) {
    dirStatus = logSymbols.error;
  } finally {
    console.log(`${dirStatus} Created output directory`);
  }

  await Promise.all(channels.map(async channel => {
    const imagePath = resolve(process.cwd(), `.app-icons/${channel}/png/1024.png`);
    const iconPath = resolve(process.cwd(), `.app-icons/${channel}/atom.ico`);

    await copyFile(iconPath, `images/atom-${channel}.ico`);
    await copyFile(imagePath, `images/atom-${channel}.png`);

    await Promise.all(types.map(async type => {
      const overlayImage = resolve(process.cwd(), `src/images/badge-${type}.png`);

      const badgePath = resolve(process.cwd(), `src/images/badge-${type}.png`);
      await copyFile(badgePath, `images/badge-${type}.png`);

      sharp(imagePath)
        .composite([
          {
            gravity: 'southeast',
            input: overlayImage,
            top: 592,
            left: 592

          }
        ])
        .toFile(`images/atom-${channel}-${type}.png`, err => {
          let imageStatus = err
            ? logSymbols.error
            : logSymbols.success;

          console.log(`${imageStatus} Created images/atom-${channel}-${type}.png`);
        });
    }));
  }));
})();

