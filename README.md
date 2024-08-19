# Git Change Tracker

## Descrição

`git-change-tracker` é uma extensão do Visual Studio Code que conta os arquivos modificados em um branch. Esta extensão é útil para desenvolvedores que desejam monitorar rapidamente as mudanças em seus repositórios Git diretamente no VS Code.

## Funcionalidades

- Conta o número de arquivos modificados no branch atual.
- Exibe a contagem de arquivos modificados na barra de status.
- Aponta se o limite de arquivos modificados está próximo ou foi atingido.

### Via Marketplace

1. Acesse o [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/).
2. Procure por `git-change-tracker`.
3. Clique em "Install" para adicionar a extensão ao seu VS Code.

## Instalação

1. Clone este repositório.
2. Abra o diretório do repositório no Visual Studio Code.
3. Execute `npm install` para instalar as dependências.
4. Pressione `F5` para iniciar a extensão em uma nova janela do VS Code.

## Uso

1. Abra um projeto Git no VS Code.
2. A contagem de arquivos modificados será exibida na barra de status.
3. Para executar o comando "Active", abra a paleta de comandos (`Ctrl+Shift+P` ou `Cmd+Shift+P` no Mac) e digite `Tracker Active`.

## Comandos

- `git-change-tracker.active`: Verifica se a extensão está ativa.

## Configuração

Não há configurações adicionais necessárias para esta extensão.

## Contribuindo

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça um push para a branch (`git push origin feature/nova-feature`).
5. Crie um novo Pull Request.
