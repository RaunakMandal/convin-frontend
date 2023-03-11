import React, { useEffect, useState } from "react";
import Home from "../Home/Home";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const hist = localStorage.getItem("history");
    setHistory(JSON.parse(hist));
  }, []);

  return (
    <Home>
      <div className="flex flex-row flex-wrap p-4">
        {history?.map((history) => (
          <div className="flex m-4" key={history.id}>
            <div>
              <h1>{history}</h1>
            </div>
          </div>
        ))}
      </div>
    </Home>
  );
};

export default History;
