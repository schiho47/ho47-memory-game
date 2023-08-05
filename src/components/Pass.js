import React from "react";
import { animals } from "../data/animals";

const Pass = ({ onReset }) => {
  const data = animals.map((animal) => ({
    path: animal.path,
    alt: animal.alt,
  }));
  const animalImgData = new Set();
  animalImgData.add(data);
  console.log({ animalImgData: [...animalImgData] });
  return (
    <div>
      <h2 style={{ color: "#fec72b" }}>恭喜過關！🥳 </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {[...animalImgData][0].map((data) => {
          return (
            <img
              src={data.path}
              alt={data.alt}
              style={{
                height: "100px",
                width: "100px",
                marginRight: "5px",
                objectFit: "contain",
              }}
            />
          );
        })}
      </div>
      <div>
        <span className="button" onClick={onReset}>
          重來一次
        </span>
      </div>
    </div>
  );
};

export default Pass;
