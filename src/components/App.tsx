import { lazy, Suspense } from "react";


const Card = lazy(() => import("./Card"));
const Login = lazy(() => import("./Login"));

export interface AppProps {
  url: string;
  entries: any;
  timing: number;
}

export function App(props: AppProps) {
  return (
    <Suspense>
      <div>
        <h1>Vite + React</h1>

        <Card />

        <Login/>
        <pre>{JSON.stringify({ props }, null, 2)}</pre>
      </div>
    </Suspense>
  );
}
