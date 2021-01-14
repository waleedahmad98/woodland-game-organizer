const { LIBRARY_PATH } = require('./constants');
const fs = require('fs');
const { dirname, basename } = require('path');
const { dialog } = require('electron').remote
const { spawn } = require('child_process');

function readSavedGames() {
    window.arr = fs.readFileSync(LIBRARY_PATH + '\\library.json');
    return JSON.parse(window.arr);
}

window.readSavedGames = readSavedGames;

function saveJSON(obj) {
    fs.writeFileSync(LIBRARY_PATH + '\\library.json', obj);
}

window.saveJSON = saveJSON;

function executeGame(executablePath) {

    var child = spawn('starter.bat', [dirname(executablePath), basename(executablePath)], {
        detached: true
    });

    child.unref();

}

window.executeGame = executeGame;

function dialogBox(title, message) {

    dialog.showMessageBox(options = { title: title, message: message });

}

window.dialogBox = dialogBox;