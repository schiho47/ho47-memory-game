import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { animals } from "./data/animals";
import Card from "./components/Card";
import CountBar from "./components/CountBar";
import CardCover from "./components/CardCover";

function App() {
  const [data, setData] = useState(animals);
  const [isPicked, setIsPicked] = useState([]);
  const [startCount, setStartCount] = useState(false);
  const [step,setStep]=useState(1);

  const handlePick = (id, alt) => {
    setData((prev) =>
      prev.map((animal) =>
        animal.id === id ? { ...animal, isPicked: true } : animal
      )
    );
    if (isPicked.length < 2) {
      setIsPicked((prev) => [...prev, alt]);
      return;
    }
    setIsPicked([]);
  };



  return (
    <div className="App">
      <Header />
      <CountBar startCount={startCount} setStartCount={setStartCount} setStep={setStep}/>
      <div className="container">
        <React.Fragment>
          {data.map((animal) =>
            startCount || animal.isPicked ? (
              <Card animal={animal} startCount={startCount} />
            ) : (
              <CardCover onClick={() => handlePick(animal.id, animal.alt)} />
            )
          )}
        </React.Fragment>
      </div>
    </div>
  );
}

export default App;
