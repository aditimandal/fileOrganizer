let fs = require("fs");
let path = require("path");

let folderPath = path.join(__dirname, "Download");

// let folderPath=process.argv[2];
// console.log(folderPath);

let folderExists = fs.existsSync(folderPath);

let extensions = {
    Audio: [".mp3"],
    video: [".mp4", ".mkv"],
    Document: [".doc", ".xslx", ".pdf", ".txt"],
    Image: [".jpeg", ".jpg", ".png", ".gif"],
    software: [".exe"]
}

if (folderExists) {
    // console.log("Path is valid !!!");

    let files = fs.readdirSync(folderPath);
    for (let i = 0; i < files.length; i++) {
        let ext = path.extname(files[i]);
        let nameOfFolder= giveFolderName(ext);
        // console.log(ext);
        // console.log("Ext--",ext,"Folder--",nameOfFolder);
        let pathOfFolder= path.join(folderPath,nameOfFolder);
        let exist = fs.existsSync(pathOfFolder);

        if(exist){
            moveFile(folderPath ,pathOfFolder ,files[i]);

        }else{
            fs.mkdirSync(pathOfFolder);
            moveFile(folderPath, pathOfFolder, files[i]);

        }
    }
    // console.log(files);

} else {
    console.log("Please enter a valid path!!!");

}

function giveFolderName(ext){
    for(let key in extensions){
        let extArr=extensions[key];
        for(let i=0;i<extArr.length;i++){
            if(extArr[i]==ext){
                return key;
            }
        }
    }
    return 'other'
}

function moveFile(folderPath, pathOfFolder,fileName){
    let sourcePath=path.join(folderPath,fileName);
    let destinationPath=path.join(pathOfFolder,fileName);
    fs.copyFileSync(sourcePath,destinationPath);
    fs.unlinkSync(sourcePath);

}