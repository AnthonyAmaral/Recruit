import { Handler } from "@netlify/functions";
import { render } from "./render.server";

//@ts-ignore
import manifest from "../dist/manifest.json";

export const handler: Handler = async (event) => {
  const body = render({ url: event.rawUrl, manifest });

  return {
    statusCode: 200,
    body: body,
  };
};
