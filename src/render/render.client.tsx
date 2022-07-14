import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { App, AppProps } from "src/components/App";

import { Auth0Provider } from '@auth0/auth0-react';

import { getConfig } from "../config"


import "src/styles/index.css";

declare global {
  interface Window {
    APP_PROPS: AppProps;
  }
}



const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin
};

hydrateRoot(
  document.getElementById("app")!,
  <StrictMode>
    <Auth0Provider {...providerConfig}> 
        <App {...window.APP_PROPS} />
    </Auth0Provider>
   
  </StrictMode>
);
