import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import { animals } from "./data/animals";
import Card from "./components/Card";
import CountBar from "./components/CountBar";
import CardCover from "./components/CardCover";
import Pass from "./components/Pass";
import Dialog from "./components/Dialog";

const initialData = animals.sort((a, b) => 0.5 - Math.random());
function App() {
  const [data, setData] = useState(() => initialData);
  const [startCount, setStartCount] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [remainChance, setRemainChance] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const isPicked = useRef([]);
  const successTimes = useRef(0);

  const checkPick = (alt) => {
    if (isPicked.current.length === 1 && isPicked.current[0] === alt) {
      setData((prev) =>
        prev.map((animal) =>
          animal.alt === isPicked.current[0]
            ? { ...animal, show: false }
            : animal
        )
      );
      setRemainChance((prev) => prev - 1);
      successTimes.current += 1;
      isPicked.current = [...isPicked.current, alt];
      return;
    }

    if (isPicked.current.length === 1 && isPicked.current[0] !== alt) {
      setShowModal(true);
      if (remainChance !== 1) {
        setRemainChance((prev) => prev - 1);
        setData((prev) =>
          prev.map((animal) =>
            animal.alt === isPicked.current[0] || animal.alt === alt
              ? { ...animal, isPicked: false }
              : animal
          )
        );
      }
      if (remainChance <= 1) {
        setRemainChance(0);
        setShowFailModal(true);
      }
    }
  };

  const handlePick = (id, alt) => {
    if (isPicked.current.length === 2 || isTimerRunning) return;
    setData((prev) =>
      prev.map((animal) =>
        animal.id === id ? { ...animal, isPicked: true } : animal
      )
    );
    if (isPicked.current.length === 0) {
      isPicked.current = [alt];
      return;
    }

    if (isPicked.current.length === 1) {
      setIsTimerRunning(true);
      setTimeout(() => {
        checkPick(alt);
        setIsTimerRunning(false);
      }, 800);
    }
  };

  const handleReset = () => {
    setShowFailModal(false);
    setIsInitial(true);
    setRemainChance(10);
    setData(initialData);
    setShowModal(false);
    isPicked.current = "";
    successTimes.current = 0;
    window.location.reload();
  };

  const onContainerClick = () => {
    setShowModal(false);
    setShowFailModal(false);
  };

  useEffect(() => {
    isPicked.current = [];
  }, [remainChance]);

  return (
    <div className="App">
      <Header />
      <CountBar
        startCount={startCount}
        setStartCount={setStartCount}
        isInitial={isInitial}
        setIsInitial={setIsInitial}
        countTitle={successTimes.current < 6 ? `剩餘${remainChance}次` : null}
      />
      <div className="container" onClick={onContainerClick}>
        {successTimes.current < 6 ? (
          <>
            {data.map((animal) =>
              startCount || animal.isPicked ? (
                <Card key={animal.id} animal={animal} startCount={startCount} />
              ) : (
                <CardCover
                  key={animal.id}
                  onClick={
                    isInitial || showModal
                      ? null
                      : () => handlePick(animal.id, animal.alt)
                  }
                />
              )
            )}
          </>
        ) : (
          <Pass onReset={handleReset} />
        )}
      </div>
      {showModal && (
        <Dialog
          onConfirm={() => setShowModal(false)}
          title={"❌❌❌ 錯了 ❌❌❌"}
        />
      )}
      {showFailModal && <Dialog onConfirm={handleReset} title={"失敗 😢"} />}
    </div>
  );
}

export default App;
