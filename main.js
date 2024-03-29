const { app, BrowserWindow, globalShortcut, Menu, Tray } = require('electron')
const path = require('path');
const { existsSync, writeFileSync } = require('fs');
const constants = require('./constants');

var appIcon = null;
app.whenReady().then(() => {

    constants.init();
    if (!existsSync(constants.LIBRARY_PATH + "\\library.json")) {
        writeFileSync(constants.LIBRARY_PATH + "\\library.json", "[]");
    }
    let win = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: __dirname + '/icon.ico',
        title: 'Woodland Organizer'
    })
    appIcon = new Tray(path.join(__dirname, 'icon.ico'));
    actionBar(win, app, Menu, Tray, appIcon);
    win.setIcon(path.join(__dirname, 'icon.ico'));
    win.loadFile('main.html');
    configureEvents(win);

})


function actionBar(win, app, Menu, Tray, appIcon) {

    // appIcon = new Tray(path.join(__dirname, 'icon.ico'));
    var contextMenu = Menu.buildFromTemplate([{
            label: 'Show',
            click: function() {
                win.show();
            }
        },
        {
            label: 'Quit',
            click: function() {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    appIcon.setContextMenu(contextMenu);

    win.on('close', function(event) {
        if (!app.isQuiting) {
            event.preventDefault();
            win.hide();
        }
    });

}

function configureEvents(window) {
    let launchKey = 'F9';
    globalShortcut.register(launchKey, () => {
        if (window.isVisible()) {
            hideWindow(window);
        } else {
            window.show();
        }
    });

    const singleInstanceLock = app.requestSingleInstanceLock();
    if (!singleInstanceLock) {
        app.isQuiting = true;
        app.quit();
    } else {
        app.on('second-instance', () => {
            window.show();
        });
    }
}

function hideWindow(window) {
    window.hide();
}