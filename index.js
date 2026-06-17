import express from "express";
import fetch from "node-fetch";

const app = express();

const TOKEN = process.env.TOKEN;

app.get("/vendas", async (req, res) => {
  try {
    const response = await fetch("https://casasdamamae.innovaro.com.br/api/izi/v1/vendas", {
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
