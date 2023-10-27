const fs = require('fs');
const path = require('path');

const desktopPath = path.join(require('os').homedir(), 'Desktop'); // Отримуємо шлях до робочого столу

const outputFile = path.join(desktopPath, 'output.txt'); // Формуємо шлях до файлу на робочому столі

fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    let minAsset = null;
    for (const asset of jsonData) {
      if (!minAsset || asset.value < minAsset.value) {
        minAsset = asset;
      }
    }

    if (minAsset) {
      const resultString = `${minAsset.txt}:${minAsset.value}`;
      fs.writeFile(outputFile, resultString, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Дані записані у файл ${outputFile}`);
        }
      });
    } else {
      console.log(`Немає даних для обробки.`);
    }
  } catch (parseError) {
    console.error(`Помилка розбору JSON: ${parseError.message}`);
  }
});
