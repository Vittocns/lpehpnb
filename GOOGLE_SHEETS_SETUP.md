# Configuração da planilha de leads (Google Sheets + Apps Script)

Este site envia os dados do formulário (Nome, Telefone, Origem e Página) para uma
planilha do Google sempre que alguém preenche o pop-up antes de ir para o WhatsApp.
Siga os passos abaixo para configurar isso do zero.

## 1. Criar a planilha

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha nova.
2. Na primeira linha, crie as colunas:

   | Timestamp | Nome | Telefone | Origem | Página |
   |---|---|---|---|---|

## 2. Criar o Apps Script

1. Na planilha, vá em **Extensões → Apps Script**.
2. Apague o conteúdo padrão e cole o código abaixo:

   ```js
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     sheet.appendRow([data.timestamp, data.name, data.phone, data.source, data.page]);
     return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Salve o projeto (ícone de disquete, ou `Ctrl+S`).

## 3. Publicar como App da Web

1. Clique em **Implantar → Nova implantação**.
2. Em "Selecionar tipo", escolha **App da Web**.
3. Configure:
   - **Executar como:** Eu (sua conta Google)
   - **Quem pode acessar:** Qualquer pessoa
4. Clique em **Implantar** e autorize as permissões solicitadas.
5. Copie a **URL do app da Web** gerada (algo como
   `https://script.google.com/macros/s/XXXX/exec`).

## 4. Configurar a URL no site

Essa URL precisa ser cadastrada como variável de ambiente `VITE_LEADS_WEBHOOK_URL`
em dois lugares:

1. **Localmente** (para testes): crie um arquivo `.env` na raiz do projeto com:

   ```
   VITE_LEADS_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
   ```

2. **No Netlify** (para o site publicado): vá em
   **Site settings → Environment variables** no painel do Netlify e adicione a
   mesma variável `VITE_LEADS_WEBHOOK_URL` com o valor da URL copiada. Depois,
   faça um novo deploy (ou aguarde o próximo push) para a variável entrar em vigor.

## 5. Acompanhar os leads

A planilha é atualizada em tempo real, assim que alguém envia o formulário no
site. Você pode deixá-la aberta ou compartilhar o acesso com quem precisar
acompanhar os contatos recebidos.
