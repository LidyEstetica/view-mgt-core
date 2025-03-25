# Lidy Estética - Aplicativo Desktop

Sistema moderno para gerenciamento de estética, desenvolvido com Vue.js 3 e Electron.

## Tecnologias Utilizadas

- Vue.js 3
- Vue Router
- Pinia (Gerenciamento de Estado)
- Electron
- Sass
- Axios

## Requisitos do Sistema

- Node.js 18+ 
- npm 7+

## Configuração Inicial

1. Clone o repositório
2. Instale as dependências:

```
npm install
```

3. Converta a imagem do logo para formato ICO:

```
npm install jimp to-ico
node convert-icon.js
```

## Desenvolvimento

Para executar o aplicativo em modo de desenvolvimento:

```
npm run electron:dev
```

Isso irá iniciar o servidor de desenvolvimento do Vite e abrir o Electron com hot-reload.

## Construção

Para construir o aplicativo desktop:

```
npm run electron:build
```

Isso irá gerar o aplicativo na pasta `dist_electron`.

## Estrutura do Projeto

```
lidy-desktop/
├── electron/        # Arquivos do Electron
│   ├── main.js      # Processo principal do Electron
│   ├── preload.js   # Script de preload
│   └── about.html   # Página "Sobre"
├── src/             # Código-fonte do Vue
│   ├── assets/      # Recursos estáticos
│   ├── components/  # Componentes Vue reutilizáveis
│   ├── router/      # Configuração de rotas
│   ├── services/    # Serviços e APIs
│   ├── styles/      # Arquivos SCSS
│   ├── views/       # Componentes de página/view
│   ├── App.vue      # Componente raiz
│   └── main.js      # Ponto de entrada do Vue
├── index.html       # Template HTML
├── convert-icon.js  # Script para converter o logo
├── vite.config.js   # Configuração do Vite
└── package.json     # Dependências e scripts
```

## Comandos Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento web (sem Electron)
- `npm run build`: Compila o aplicativo web
- `npm run preview`: Visualiza a compilação web
- `npm run lint`: Executa o linter
- `npm run format`: Formata o código
- `npm run electron:dev`: Inicia o aplicativo Electron em modo de desenvolvimento
- `npm run electron:build`: Compila o aplicativo desktop

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.