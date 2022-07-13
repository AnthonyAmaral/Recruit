import { StrictMode } from "react";
import ReactDOMServer from "react-dom/server";
import { Manifest } from "vite";
import { App } from "src/App";

export interface RenderProps {
  url: string;
  manifest: Manifest;
}

export function render({ url, manifest }: RenderProps) {
  const app = ReactDOMServer.renderToString(
    <StrictMode>
      <App url={url} />
    </StrictMode>
  );

  return template(manifest).replace("<!--app-->", app);
}

function template(manifest: Manifest) {
  const entry = "src/render.client.tsx";
  const src = manifest[entry] || {};
  const css = src.css || [];

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    ${css.reduce((p, n) => `<link rel="stylesheet" href="/${n}">`, "")}
  </head>
  <body>
    <div id="app"><!--app--></div>
    <script type="module" src="/${src.file || entry}"></script>
  </body>
</html>`;
}
