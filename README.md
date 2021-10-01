## Olive - Frontend

### Configurando a IDE

Sugerimos a instalação do [Visual Studio Code](https://code.visualstudio.com/). O mesmo além de ser uma ótima ferramenta para desenvolvimento conta com extensões que serão essenciais para padronização do código do projeto.

Depois de instalar o Visual Studio Code, acesse sua aba de extensões e instale as seguintes:

- ESLint: Para que a IDE identifique padrões do React que estão sendo desrespeitados.
- Prettier: Para que a IDE realize a indentação do código de maneira correta.

Caso deseje também, baixe a extensão do Material (Material Theme) no seu VS Code para uma melhor apresentação visualmente da estrutura do projeto

Depois de adicionar as extensões necessárias, falta apenas uma configuração para podermos começar o desenvolvimento. No seu teclado pressione as teclas `ctrl` `shift` `p` para acessar a aba de pesquisa do Visual Studio Code. Pesquise por `settings` e abra o arquivo com nome `Preferences: Open Settings (JSON)`. Nesse arquivo adicione as seguintes linhas:

```
"editor.formatOnSave": true,
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
```

> Caso o mesmo já esteja presente, desconsidere.

### Executando

- Execução das dependências do projeto

        npm install

- Execução da aplicação

        npm start

#### Caso deseje acessar a aplicação PWA, realize os seguintes passos:

- Buildar o projeto

        npm run build

- Acessar a aplicação em PWA

        serve -s build
