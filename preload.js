const { LIBRARY_PATH } = require('./constants');
const fs = require('fs');
const request = require('request');
const { BrowserWindowProxy } = require('electron');
const { windowsStore } = require('process');

function readSavedGames() {
    window.arr = fs.readFileSync(LIBRARY_PATH + '\\library.json');
    return JSON.parse(window.arr);
}

window.readSavedGames = readSavedGames;

function saveJSON(obj) {
    fs.writeFileSync(LIBRARY_PATH + '\\library.json', obj);
}

window.saveJSON = saveJSON;

var child = require('child_process').execFile;

function executeGame(executablePath) {
    var spawn = require('child_process').spawn;

    var child = spawn(executablePath, [], {
        detached: true,
        stdio: ['ignore', 'ignore', 'ignore']
    });

    child.unref();

}

window.executeGame = executeGame;