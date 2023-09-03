
const { ipcRenderer, contextBridge } = require("electron");


contextBridge.exposeInMainWorld("electronApi", {
  notificationApi: {
    sendNotification(message) {
      console.log(message);
      ipcRenderer.send("notify", message);
    },
  },
  filesApi: {},
});
