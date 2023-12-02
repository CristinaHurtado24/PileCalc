const { BrowserWindow, app, ipcMain, Notification } = require("electron");
const path = require("path");
const { mainModule } = require("process");

const isDev = !app.isPackaged;
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 600,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

// Escucha el evento 'open-popup' desde el proceso de renderizado
ipcMain.on("open-popup", () => {
  createPopupWindow();
});

function createPopupWindow() {
  const popupWindow = new BrowserWindow({
    width: 400,
    height: 300,
    parent: win,
    modal: true,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  popupWindow.loadFile("popup.html");

  popupWindow.once("ready-to-show", () => {
    popupWindow.show();
  });
}

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
