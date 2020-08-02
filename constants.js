const path = require('path');
const fs = require('fs');

exports = {
    LIBRARY_PATH: path.join(process.env.LOCALAPPDATA, 'Woodland'),
    init: init
}

module.exports = exports;

function init() {
    if (!fs.existsSync(exports.LIBRARY_PATH)) {
        fs.mkdirSync(exports.LIBRARY_PATH);
    }
}