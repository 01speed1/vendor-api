const fs = require('fs');
const path = require('path');

const indexed = folderPath =>
    fs
    .readdirSync(folderPath)
    .filter(name => !name.includes('index.js'))
    .map(filename => [filename, path.resolve(folderPath, filename)])
    .map(file => [file[0].split('.')[0], file[1]])
    .reduce((modelsList, currentModel) => {
        const filename = currentModel[0];
        const filepath = currentModel[1];
        modelsList[filename] = require(filepath);
        return modelsList;
    }, {});

module.exports = { indexed };