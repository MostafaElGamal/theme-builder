import { useState } from "preact/hooks";

//
//

export const CounterComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter Component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
};
