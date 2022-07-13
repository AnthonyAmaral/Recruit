import { lazy, Suspense } from "react";
import "src/styles/App.css";

const Card = lazy(() => import("./Card"));

export interface AppProps {
  url: string;
}

export function App({ url }: AppProps) {
  return (
    <Suspense>
      <div className="App">
        <h1>Vite + React = {url}</h1>

        <Card />

        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>
    </Suspense>
  );
}
