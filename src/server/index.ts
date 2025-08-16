import express from "express";
import { createServer as createViteServer } from "vite";
import { render } from "../entry-server";

const app = express();
const PORT = 3000;

async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });

  app.use(vite.middlewares);

  app.get("/", async (req, res) => {
    try {
      const { html, initialData } = await render(req.url);

      const fullHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TMDb SSR App</title>
          </head>
          <body>
            <div id="root">${html}</div>
            <script>
              window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}
            </script>
            <script type="module" src="/src/main.tsx"></script>
          </body>
        </html>
      `;

      res.status(200).send(fullHtml);
    } catch (err: any) {
      vite.ssrFixStacktrace(err);
      res.status(500).send(err.message);
    }
  });

  app.listen(PORT, () => {
    console.log(`SSR running at http://localhost:${PORT}`);
  });
}

startServer();
