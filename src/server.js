const express = require('express');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');

const app = express();
const PORT = process.env.PORT || 8080;

// Endpoint para gerar token Dialogflow
app.get('/api/dialogflow-token', async (req, res) => {
  try {
    // O GoogleAuth vai usar o caminho do arquivo da service account definido em GOOGLE_APPLICATION_CREDENTIALS
    const auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/dialogflow']
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();
    res.json({ token: token.token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Servir arquivos estáticos do Angular
app.use(express.static(path.join(__dirname, '../dist/browser')));

// Redirecionar todas as rotas que não sejam de API ou arquivos estáticos para o index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/browser', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});