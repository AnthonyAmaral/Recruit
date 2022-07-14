import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Manifest } from "vite";
import { App, AppProps } from "src/components/App";
import { Writable } from "stream";

export interface RenderProps {
  url: string;
  manifest: Manifest;
}

import { Sequelize, Model, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const Entry = sequelize.define("Entry", { date: DataTypes.STRING });

// await sequelize.sync();

export async function render({ url, manifest }: RenderProps): Promise<string> {
  let timing = performance.now();
  const entries = (await Entry.findOne())?.toJSON();
  timing = performance.now() - timing;

  const props: AppProps = { url, entries, timing };

  let body = "";
  const writer = new Writable();
  writer._write = (chunk) => (body += String(chunk));

  return new Promise((resolve) => {
    const stream = renderToPipeableStream(
      <StrictMode>
        <App {...props} />
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(writer);
          const html = template(manifest, props, body);
          resolve(html);
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
