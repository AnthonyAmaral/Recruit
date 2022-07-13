import { lazy, Suspense } from "react";

const Card = lazy(() => import("./Card"));

export interface AppProps {
  url: string;
}

export function App({ url }: AppProps) {
  return (
    <Suspense>
      <div>
        <h1>Vite + React = {url}</h1>

        <Card />

        <p>Click on the Vite and React logos to learn more</p>
      </div>
    </Suspense>
  );
}
