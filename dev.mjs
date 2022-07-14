//@ts-check

import { createServer } from "http";
import { createServer as createViteServer } from "vite";

const vite = await createViteServer({
  appType: "custom",
  server: { middlewareMode: true, watch: { usePolling: true, interval: 100 } },
});

const server = createServer((req, res) => {
  vite.middlewares(req, res, async () => {
    try {
      /** @type {import('./src/render/render.server').render} */
      const render = (await vite.ssrLoadModule("/src/render/render.server.tsx")).render;

      let html = await render({ url: req.url || "/", manifest: {} });
      html = await vite.transformIndexHtml(req.url || "/", html);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      res.statusCode = 500;
      res.end(e.stack);
    }
  });
});

const port = parseInt(process.env.PORT || "4000");
server.listen(port, () => console.log(`\nhttp://localhost:${port}/\n`));

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
