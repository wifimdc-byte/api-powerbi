import express from "express";
import fetch from "node-fetch";

const app = express();

const TOKEN = process.env.TOKEN;

// converte yyyy-mm-dd → dd-mm-aaaa
function formatarData(data) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}-${mes}-${ano}`;
}

app.get("/vendas", async (req, res) => {
  try {
    let { ini, fim } = req.query;

    if (!ini || !fim) {
      return res.status(400).json({
        erro: "Informe os parâmetros ini e fim (yyyy-mm-dd)"
      });
    }

    // formata datas
    const iniFormatado = formatarData(ini);
    const fimFormatado = formatarData(fim);

    const url = `https://casasdamamae.innovaro.com.br/api/izi/v1/vendas?ini=${iniFormatado}&fim=${fimFormatado}`;

    console.log("URL chamada:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
});

// rota raiz (pra teste)
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

app.listen(3000, () => console.log("API rodando"));
