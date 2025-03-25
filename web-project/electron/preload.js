const { contextBridge, ipcRenderer } = require('electron');

// Expõe funcionalidades seguras do Electron para ser usadas na aplicação web
contextBridge.exposeInMainWorld('electron', {
  getVersion: () => process.versions.electron,
  platform: process.platform,
  // Podemos adicionar mais funcionalidades aqui conforme necessário
});

// Exemplos de funções de comunicação com o processo principal
// Estas podem ser expandidas conforme necessário
contextBridge.exposeInMainWorld('api', {
  send: (channel, data) => {
    // Lista branca de canais que podem ser usados
    const validChannels = ['toMain', 'print', 'exportData'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = ['fromMain', 'printResponse', 'exportResponse'];
    if (validChannels.includes(channel)) {
      // Remover o listener antigo para evitar duplicatas
      ipcRenderer.removeAllListeners(channel);
      // Adicionar um novo listener
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
}); 