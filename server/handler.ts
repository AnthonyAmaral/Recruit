import { Handler } from "@netlify/functions";
import { render } from "src/render/render.server";

//@ts-ignore
import manifest from "../dist/manifest.json";

export const handler: Handler = async (event) => {
  const body = await render({ url: event.rawUrl, manifest });

  return {
    statusCode: 200,
    body: body,
  };
};
