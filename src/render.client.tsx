import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { App } from "./App";

import "./styles/index.css";

hydrateRoot(
  document.getElementById("app")!,
  <StrictMode>
    <App url={location.pathname + location.search} />
  </StrictMode>
);
