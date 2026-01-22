# Neon + Netlify Logger

## Como usar

1. Suba este projeto para seu GitHub
2. Conecte no Netlify
3. Vá em:
   Site settings → Environment variables
4. Crie a variável:
   NETLIFY_DATABASE_URL = (sua connection string do Neon)

## Tabela
A função cria automaticamente a tabela:
access_logs

## Teste
Acesse o site → ele redireciona → um log é salvo no banco.

## Onde editar os sites
Edite no index.html:
const sites = ["https://site1.com", "https://site2.com", "https://site3.com"];
