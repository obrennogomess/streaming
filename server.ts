import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy endpoint for Sigilo Pay PIX Creation
  app.post("/api/create-pix", async (req, res) => {
    const { email, name, document, amount } = req.body;
    
    const publicKey = process.env.SIGILO_PUBLIC_KEY;
    const secretKey = process.env.SIGILO_SECRET_KEY;

    if (!publicKey || !secretKey) {
      console.error("Sigilo Pay keys not configured in .env");
      return res.status(500).json({ error: "Configuração do servidor incompleta (chaves ausentes)" });
    }

    try {
      // Sanitize document (numbers only) - MUST be a valid CPF/CNPJ
      const sanitizedDocument = document ? document.replace(/\D/g, "") : "";
      
      const payload: any = {
        identifier: `rf_${Date.now()}`,
        amount: 10.0,
        client: {
          name: name || "Cliente Cineva",
          email: email,
          document: sanitizedDocument,
          phone: "1199999999"
        },
        products: [
          {
            title: "Ativacao Cineva VIP",
            price: 10.0,
            quantity: 1
          }
        ],
        shippingFee: 0,
        discount: 0,
        extraFee: 0,
        callbackUrl: "https://webhook.site/placeholder"
      };

      console.log("Sending payload to Sigilo Pay:", JSON.stringify(payload, null, 2));

      const response = await axios.post(
        "https://app.sigilopay.com.br/api/v1/gateway/pix/receive",
        payload,
        {
          headers: {
            "x-public-key": publicKey,
            "x-secret-key": secretKey,
            "Content-Type": "application/json"
          }
        }
      );

      // Return the PIX data from Sigilo Pay
      res.json(response.data);
    } catch (error: any) {
      if (error.response) {
        console.error("Sigilo Pay API Error Body:", JSON.stringify(error.response.data, null, 2));
        res.status(error.response.status).json(error.response.data);
      } else {
        console.error("Sigilo Pay Request Error:", error.message);
        res.status(500).json({ error: "Erro ao processar pagamento com Sigilo Pay", message: error.message });
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
