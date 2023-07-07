import { useState, useEffect, useRef } from "react";

const CountBar = ({ startCount, setStartCount,setStep }) => {
  const [count, setCount] = useState(11);

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
          handleStart(3);
          return 10;
        }
      });
    }, 1000);
  };

  const handleStart=(step)=>{
    setStartCount(true);
    setStep(step);
    
  };

  useEffect(() => {
    handleCount();
    return () => {
      clearInterval(timerRef.current);
    };
  }, [startCount]);

  return (
    <div>
      {startCount ? (
        <div className="count">{count}</div>
      ) : (
        <div className="rules">
          遊戲規則：請於15秒內記住圖片相對應的位置，時間到後，如於10次內完成全部圖片配對，即可過關。
          <div onClick={()=>handleStart(2)}>開始</div>
        </div>
      )}
    </div>
  );
};

export default CountBar;
