import React, { useEffect, useState } from "react";
import Home from "../../Base/Home/Home";
import Bucket from "../Bucket/Bucket";

const Landing = () => {
  const [buckets, setBuckets] = useState([]);
  const fetchBuckets = async () => {
    await fetch("http://localhost:8080/buckets")
      .then((res) => res.json())
      .then((data) => {
        setBuckets(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBuckets();
  }, []);

  return (
    <Home>
      <div className="flex flex-row flex-wrap p-4">
        {buckets?.map((bucket) => (
          <div className="flex m-4" key={bucket.id}>
            <Bucket bucket={bucket} />
          </div>
        ))}
      </div>
    </Home>
  );
};

export default Landing;
