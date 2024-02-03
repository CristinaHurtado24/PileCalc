const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  ipcRenderer: ipcRenderer,
  notificationApi: {
    sendNotification(message) {
      console.log(message);
      ipcRenderer.send("notify", message);
    },
  },
  openFile: () => {
    ipcRenderer.send("open-file");
  },

  receiveBool: (callback) => {
    ipcRenderer.on("boolean-from-main", (event, booleano) => {
      // Llama al callback proporcionado y pasa los datos recibidos
      callback(event, booleano);
    });
  },

  receiveBoolOpen: (callback) => {
    ipcRenderer.on("boolean-from-main2", (event, booleano) => {
      // Llama al callback proporcionado y pasa los datos recibidos
      callback(event, booleano);
    });
  },

  receiveFileData: (callback) => {
    ipcRenderer.on("opened-file", (event, filePath, fileData) => {
      callback(filePath, fileData);
    });
  },

  saveFile: (data) => {
    ipcRenderer.send("save-file", data);
  },
});
