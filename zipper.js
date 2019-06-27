const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, './');

const makeSolutionFolder = (folderName) => {
    return new Promise((resolve, reject) => {
        fs.stat(`./${folderName}-Solution`, function(err) {
            if (!err) resolve();
            else if (err.code === 'ENOENT') {
                fs.mkdir(`./${folderName}-Solution`, err => {
                    if (err) reject(err);
                    resolve();
                })
            }
        });
    })
}

const moveToSolutionFolder = (oldP, newP) => {
    return new Promise((resolve, reject) => {
        fs.rename(oldP, newP, (err) => {    
            if(err) reject(err);
            resolve();
        });
    })
}


const handleSiftDirectory = (dirPath) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, function (err, directories) {
            
            if (err) reject(err, 'Unable to scan directory: ');

            directories.forEach(function (file, index) {
                fs.readdir(path.join(__dirname, file), function (err, folder) {
                    const currentFolder = directories[index]
                    if (err) return;
                    if (folder.includes('Solved')) {
                        const oldPath = `./${currentFolder}/Solved`;
                        const newPath = `./${currentFolder}-Solution/Solved`;
                        makeSolutionFolder(currentFolder)
                            .then(() => moveToSolutionFolder(oldPath, newPath))
                            .catch((err) => console.error(err));
                    }
                });
            });

            resolve();
        });
    })
};

handleSiftDirectory(directoryPath)
    .then(() => console.log('done'))
    .catch((err) => console.error(err));