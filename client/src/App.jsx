import "./App.css";

import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>MERN Stack Example</h1>
      <p>{data}</p>
    </div>
  );
}

export default App;
