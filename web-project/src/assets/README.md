# Instruções para Conversão do Logo para Formato ICO

Para que o ícone da aplicação funcione corretamente no Electron, é necessário converter o arquivo LOGO-LIDY.jpeg para o formato ICO.

## Opções para Conversão

### 1. Usando Serviços Online (Recomendado para iniciantes)

1. Acesse um dos seguintes sites:
   - [ConvertICO](https://convertico.com/)
   - [ICOConvert](https://icoconvert.com/)
   - [favicon.io](https://favicon.io/favicon-converter/)

2. Faça upload do arquivo `LOGO-LIDY.jpeg`
3. Selecione as dimensões desejadas (recomendado: 256x256)
4. Baixe o arquivo ICO gerado
5. Salve-o como `LOGO-LIDY.ico` no mesmo diretório (`src/assets/`)

### 2. Usando ImageMagick (Linha de Comando)

Se você tem o ImageMagick instalado, execute o seguinte comando:

```
magick convert "CAMINHO_COMPLETO\src\assets\LOGO-LIDY.jpeg" -resize 256x256 "CAMINHO_COMPLETO\src\assets\LOGO-LIDY.ico"
```

Substitua `CAMINHO_COMPLETO` pelo caminho absoluto até o diretório do projeto.

### 3. Usando Node.js (Opção para Desenvolvedores)

1. Instale o pacote `jimp` e `to-ico`:
   ```
   npm install jimp to-ico
   ```

2. Crie um script `convert-icon.js` na raiz do projeto:
   ```javascript
   const Jimp = require('jimp');
   const toIco = require('to-ico');
   const fs = require('fs');
   const path = require('path');

   (async () => {
     const image = await Jimp.read(path.join(__dirname, 'src/assets/LOGO-LIDY.jpeg'));
     image.resize(256, 256);
     const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
     
     const ico = await toIco([buffer]);
     fs.writeFileSync(path.join(__dirname, 'src/assets/LOGO-LIDY.ico'), ico);
     
     console.log('Ícone gerado com sucesso!');
   })();
   ```

3. Execute o script:
   ```
   node convert-icon.js
   ```

## Após a Conversão

Uma vez que você tenha o arquivo ICO, verifique se o caminho no `package.json` está correto:

```json
"build": {
  "win": {
    "icon": "src/assets/LOGO-LIDY.ico"
  }
}
``` 