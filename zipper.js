const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const activitiesPath = path.join(__dirname, './activities');
const zippedPath = path.join(__dirname, './zipped-files');

const makeSolutionFolder = (folderName, dirPath) => {
    return new Promise((resolve, reject) => {

        fs.stat(`${dirPath}/${folderName}-Solution`, function(err) {
            if (!err) {
                console.log('Directory Already Exists');
                resolve();
            }
            else if (err.code === 'ENOENT') {
                fs.mkdir(`${dirPath}/${folderName}-Solution`, err => {
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
            
            if (err) reject(err, 'Unable to scan directory.');

            directories.forEach(function (file, index) {
                fs.readdir(path.join(dirPath, file), function (err, folder) {
                    const currentFolder = directories[index]
                    const currentFolderPath = `${dirPath}/${currentFolder}`
                    const newZippedFolder = `${zippedPath}/${currentFolder}`;

                    if (err) return;

                    if (folder.includes('Solved') && (!currentFolderPath.includes('Solution'))) {
                        const oldPath = `${currentFolderPath}/Solved`;
                        const newPath = `${currentFolderPath}-Solution/Solved`;

                        makeSolutionFolder(currentFolder, dirPath)
                            .then(() => moveToSolutionFolder(oldPath, newPath))
                            .then(() => zipDirectory(`${currentFolderPath}-Solution`, `${newZippedFolder}-Solution.zip`))
                            .then(() => zipDirectory(`${currentFolderPath}`, `${newZippedFolder}.zip`))
                            .catch((err) => reject(err));
                    }

                    else {
                        zipDirectory(currentFolderPath, `${newZippedFolder}.zip`)
                            .catch((err) => reject(err))
                    }
                });
            });

            console.log('Zipped All Directories');
            resolve();
        });
    })
};

const zipDirectory = (source, out) => {
    const archive = archiver('zip', { zlib: { level: 9 }});
    const stream = fs.createWriteStream(out);

    return new Promise((resolve, reject) => {
        archive
        .directory(source, false)
        .on('error', err => reject(err))
        .pipe(stream);

        stream.on('close', () => resolve());
        archive.finalize();
    });
}

handleSiftDirectory(activitiesPath)
    .catch((err) => console.error(err));