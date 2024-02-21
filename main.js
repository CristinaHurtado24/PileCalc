const {
  BrowserWindow,
  app,
  ipcMain,
  Notification,
  Menu,
  dialog,
} = require("electron");
const fs = require("fs");
const path = require("path");

const isDev = !app.isPackaged;
let win;

ipcMain.on("save-file", (event, data) => {
  dialog
    .showSaveDialog(win, {
      title: "Guardar archivo",
      buttonLabel: "Guardar",
      filters: [{ name: "Archivos de texto", extensions: ["pile"] }],
    })
    .then((result) => {
      if (!result.canceled && result.filePath) {
        const directory = path.dirname(result.filePath);
        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
        }

        fs.writeFile(result.filePath, data, (err) => {
          if (err) {
            console.error("Error al guardar el archivo:", err);
          } else {
            console.log("Archivo guardado exitosamente:", result.filePath);
          }
        });
      }
    })
    .catch((err) => {
      console.error(
        "Error al mostrar el cuadro de diálogo de guardar archivo:",
        err
      );
    });
});

ipcMain.on("open-file", (event) => {
  dialog
    .showOpenDialog(win, {
      title: "Abrir archivo",
      buttonLabel: "Abrir",
      filters: [{ name: "Archivos de texto", extensions: ["pile"] }],
      properties: ["openFile"],
    })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const filePath = result.filePaths[0];
        fs.readFile(filePath, "utf-8", (err, data) => {
          if (err) {
            console.error("Error al abrir el archivo:", err);
          } else {
            event.reply("opened-file", filePath, data); // Cambia "file-opened" por "opened-file"
          }
        });
      }
    })
    .catch((err) => {
      console.error(
        "Error al mostrar el cuadro de diálogo de abrir archivo:",
        err
      );
    });
});

// Definir la plantilla del menú
const template = [
  {
    label: "View",
    submenu: [
      {
        label: "developer",
        click: () => {
          win.webContents.openDevTools();
        },
      },
      {
        label: "Recargar",
        accelerator: "CmdOrCtrl+R", // Atajo de teclado para recargar la ventana
        click: () => {
          win.reload(); // Método para recargar la ventana principal
        },
      },
    ],
  },
];

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

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  win.loadFile("index.html");
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

ipcMain.on("open-popup", () => {
  createPopupWindow();
});

function createNewProjectWindow() {
  console.log("Creando nueva ventana...");
  const newWin = new BrowserWindow({
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

  const newMenu = Menu.buildFromTemplate(template); // Usa el mismo template de menú que para la ventana principal
  Menu.setApplicationMenu(newMenu);

  newWin.loadFile("index.html"); // Cambia "new_project.html" por el nombre del archivo HTML de tu nueva ventana

  newWin.show();
  newWin.on("closed", function () {
    // Maneja el cierre de la ventana correctamente
    newWin = null;
  });
}
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
  popupWindow.show();

  popupWindow.on("closed", function () {
    popupWindow = null;
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
  if (win === null) createWindow();
});
