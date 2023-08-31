const { BrowserWindow, app, ipcMain, Notification } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

let win;
let profileWindow;

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

function openModal() {
  profileWindow = new BrowserWindow({
    parent: win,
    modal: true,
    show: false,
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  profileWindow.loadFile("modal.html");
  profileWindow.setMenu(null);
  profileWindow.once("ready-to-show", () => {
    profileWindow.show();
  });
}

ipcMain.handle("showModal_1", async (_, args) => {
  const modal = await openModal;
  return modal;
});

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

ipcMain.on("notify", (_, message) => {
  new Notification({ title: "Notification", body: message }).show();
});

app.whenReady().then(createWindow);
