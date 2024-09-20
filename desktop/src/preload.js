const ipcRender = require('electron');

window.saveIP = (ip) => {
    ipcRender.send('save-ip', ip);
}