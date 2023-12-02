
const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  ipcRenderer:ipcRenderer,
  notificationApi: {
    sendNotification(message) {
      console.log(message);
      ipcRenderer.send("notify", message);
    },
  },
  filesApi: {},
});
