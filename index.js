const {
    app,
    BrowserWindow,
    ipcMain,
    nativeTheme
} = require('electron')
const path = require('path')


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./web/index.html')

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })

    ipcMain.on('audiostart', (event, arg) => {


    });

}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})