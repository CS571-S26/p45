import './App.css';
import { useState } from "react";
import { Button } from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount(count + 1)}>Increment Count</Button>
    </>
  )
}

export default App
