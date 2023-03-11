import React, { useEffect, useState } from "react";
import Home from "../Home/Home";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const hist = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(hist);
  }, []);

  return (
    <Home>
      <div className="flex flex-col items-center p-4 m-4">
        <span className="text-2xl font-bold">History</span>
        {history?.length > 0 &&
          history?.map((history) => (
            <div
              className="flex flex-col history-item m-2 p-2 w-1/2"
              key={history.last_watched}
            >
              <span className="text-lg font-bold">{history.name}</span>
              <span className="text-sm">{history.link}</span>
              <span className="text-sm">{history.last_watched}</span>
            </div>
          ))}
        {history?.length === 0 && (
          <span className="text-lg font-bold">No History</span>
        )}
      </div>
    </Home>
  );
};

export default History;
