const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const url = require('url');
const os = require('os');

// Mantém uma referência global da janela para evitar
// que ela seja fechada automaticamente quando o objeto JavaScript for coletado pelo garbage collector.
let mainWindow;

function createWindow() {
  const iconPath = path.join(__dirname, '../src/assets/LOGO-LIDY.jpeg');
  
  // Criar a janela do navegador.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: false,
    show: false
  });

  // Verifica se estamos em ambiente de desenvolvimento
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;

  // Carrega a URL adequada
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); // Porta padrão do Vite
    // Abre o DevTools automaticamente se estiver em desenvolvimento
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Mostra a janela somente quando o conteúdo for carregado
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Emitido quando a janela é fechada.
  mainWindow.on('closed', function () {
    // Desreferenciar o objeto da janela, geralmente você armazenaria janelas
    // em um array, se seu app suporta múltiplas janelas, este é o momento
    // que você deve excluir o elemento correspondente.
    mainWindow = null;
  });

  // Cria o menu da aplicação
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        { 
          label: 'Sair', 
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit() 
        }
      ]
    },
    {
      label: 'Editar',
      submenu: [
        { role: 'undo', label: 'Desfazer' },
        { role: 'redo', label: 'Refazer' },
        { type: 'separator' },
        { role: 'cut', label: 'Recortar' },
        { role: 'copy', label: 'Copiar' },
        { role: 'paste', label: 'Colar' },
        { role: 'delete', label: 'Excluir' },
        { role: 'selectAll', label: 'Selecionar Tudo' }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { role: 'reload', label: 'Recarregar' },
        { role: 'forceReload', label: 'Forçar Recarregamento' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom Padrão' },
        { role: 'zoomIn', label: 'Aumentar Zoom' },
        { role: 'zoomOut', label: 'Diminuir Zoom' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela Cheia' }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre Lidy Estética',
          click: () => {
            const aboutWindow = new BrowserWindow({
              width: 400,
              height: 300,
              parent: mainWindow,
              modal: true,
              icon: path.join(__dirname, '../src/assets/LOGO-LIDY.jpeg'),
              webPreferences: {
                nodeIntegration: false,
                contextIsolation: true
              }
            });

            aboutWindow.loadURL(url.format({
              pathname: path.join(__dirname, 'about.html'),
              protocol: 'file:',
              slashes: true
            }));

            aboutWindow.setMenu(null);
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// Este método será chamado quando o Electron terminar
// a inicialização e estiver pronto para criar janelas do navegador.
// Algumas APIs só podem ser usadas após este evento ocorrer.
app.whenReady().then(createWindow);

// Sai quando todas as janelas estiverem fechadas, exceto no macOS.
// No macOS, é comum que aplicativos e sua barra de menu
// permaneçam ativos até que o usuário saia explicitamente com Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // No macOS, é comum recriar uma janela no aplicativo quando o
  // ícone da doca é clicado e não há outras janelas abertas.
  if (mainWindow === null) createWindow();
}); 