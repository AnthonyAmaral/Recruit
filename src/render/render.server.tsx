import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Manifest } from "vite";
import { App, AppProps } from "src/components/App";
import { Writable } from "stream";

export interface RenderProps {
  url: string;
  manifest: Manifest;
}

export function render({ url, manifest }: RenderProps): Promise<string> {
  return new Promise((resolve) => {
    const props: AppProps = { url };

    let body = "";
    const writer = new Writable();
    writer._write = (chunk) => (body += String(chunk));

    const stream = renderToPipeableStream(
      <StrictMode>
        <App {...props} />
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(writer);
          resolve(template(manifest, props, body));
        },
      }
    );
  });
}

function template(manifest: Manifest, props: AppProps, body: string) {
  const entry = "src/render/render.client.tsx";
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
    <div id="app">${body}</div>
    <script>window.APP_PROPS=${JSON.stringify(props)};</script>
    <script type="module" src="/${src.file || entry}"></script>
  </body>
</html>`;
}
