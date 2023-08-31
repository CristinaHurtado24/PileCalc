
const { ipcRenderer, contextBridge } = require("electron");


contextBridge.exposeInMainWorld("electronApi", {
  notificationApi: {
    sendNotification(message) {
      console.log(message);
      ipcRenderer.send("notify", message);
    },
  },
  answerShowModal:(args) =>{
    ipcRenderer.invoke('showModal_1', args)
  },
  filesApi: {},
});
