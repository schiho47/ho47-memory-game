import { useState, useEffect, useRef } from "react";

const CountBar = ({
  startCount,
  setStartCount,
  setIsInitial,
  isInitial,
  countTitle,
}) => {
  const [count, setCount] = useState(10);

  const timerRef = useRef(null);

  const handleCount = () => {
    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        }
        if (prev === 0) {
          clearInterval(timerRef.current);
          setStartCount(false);
          return 10;
        }
      });
    }, 1000);
  };

  const handleStart = () => {
    setStartCount(true);
    setIsInitial(false);
  };

  useEffect(() => {
    if (startCount) {
      handleCount();
      return () => {
        clearInterval(timerRef.current);
      };
    }
  }, [startCount]);

  return (
    <div>
      {startCount && !isInitial && <div className="count">{count}</div>}

      {isInitial && (
        <div className="rules">
          遊戲規則：請於10秒內記住圖片相對應的位置，時間到後，如於10次內完成全部圖片配對，即可過關。
          <div onClick={handleStart}>開始</div>
        </div>
      )}

      {!startCount && !isInitial && <div className="rules">{countTitle}</div>}
    </div>
  );
};

export default CountBar;
