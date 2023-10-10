const fs = require('fs');

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
      fs.writeFile('output.txt', resultString, (err) => {
        if(err){
          console.error(err);
        } else {
          console.log(`Дані записані у файл output.txt`);
        }
      });

    } else {
      console.log(`Немає даних для обробки.`);
    }
  } catch (parseError) {
    console.error(`Помилка розбору JSON: ${parseError.message}`);
  }
});
