import express from "express";
import fetch from "node-fetch";

const app = express();

const TOKEN = process.env.TOKEN;

// função pra converter data
function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}-${mes}-${ano}`;
}

app.get("/vendas", async (req, res) => {
  try {
    const { ini, fim } = req.query;

    if (!ini || !fim) {
      return res.status(400).json({ erro: "Informe 'ini' e 'fim'" });
    }

    const iniFormatado = formatarData(ini);
    const fimFormatado = formatarData(fim);

    const url = `https://casasdamamae.innovaro.com.br/api/izi/v1/vendas?ini=${iniFormatado}&fim=${fimFormatado}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.listen(3000, () => console.log("API rodando"));
