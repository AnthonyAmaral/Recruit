import { useState } from "react";

export default function Card() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button
        className="border-2 border-red-500 rounded px-2 py-1 hover:shadow-lg"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
}
