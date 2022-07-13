//@ts-check

import { Server } from "http";
import { createServer } from "vite";

const vite = await createServer({
  appType: "custom",
  server: { middlewareMode: true, watch: { usePolling: true, interval: 100 } },
});

const server = new Server((req, res) => {
  vite.middlewares(req, res, async () => {
    /** @type {import('./src/render/render.server').render} */
    const render = (await vite.ssrLoadModule("/server/render.server.tsx")).render;

    let html = render({ url: req.url || "/", manifest: {} });
    html = await vite.transformIndexHtml(req.url || "/", html);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(html);
  });
});

const port = parseInt(process.env.PORT || "4000");
server.listen(port, () => console.log(`\nhttp://localhost:${port}/\n`));

process.on("SIGINT", () => {
  server.close();
  process.exit(0);
});
