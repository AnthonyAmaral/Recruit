import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { App, AppProps } from "src/components/App";

import "src/styles/index.css";

declare global {
  interface Window {
    APP_PROPS: AppProps;
  }
}

hydrateRoot(
  document.getElementById("app")!,
  <StrictMode>
    <App {...window.APP_PROPS} />
  </StrictMode>
);
