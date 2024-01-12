"use client";

import "bootstrap-icons/font/bootstrap-icons.css";
import moment from "moment";
import { useEffect, useState, useRef } from "react";
import { unix_to_julian } from "@/app/util/motion";

import Header from "./components/header";
import Model from "./components/model";
import ModelThree from "./components/model-three";
import Controls from "./components/controls";

const FRAMERATE = 60;

export default function Home() {

  const [three, setThree] = useState(false);

  const [speed, setSpeed] = useState(1);
  const [viewDate, setViewDate] = useState(2440423.17847);
  const [planetSize, setPlanetSize] = useState(4);
  const [ringSize, setRingSize] = useState(2);
  const [color, setColor] = useState(false);
  const [gap, setGap] = useState(false);
  const speedRef = useRef(speed);

  const lastFrameTimeRef = useRef(performance.now());

  let myTimeout = useRef(null);

  const handleSpeed = (num) => {
    speedRef.current = num;
    setSpeed(num);
  }

  const handleViewDate = (num) => {
    handleSpeed(0)
    const momentDate = moment(num).unix();
    const julian = unix_to_julian(momentDate);
    setViewDate(julian);
  }

  const animate = () => {
    /*
    const now = performance.now();
    const deltaTime = now - lastFrameTimeRef.current;
    const currentFrameRate = 1000 / deltaTime;

    if(currentFrameRate < 50) console.log(currentFrameRate);
    lastFrameTimeRef.current = now;*/

    setViewDate(date => date + 1 * speedRef.current);
    myTimeout.current = setTimeout(() => { animate() }, 1000 / FRAMERATE );
  }

  useEffect(() => {
    speedRef.current = speed;
    const cleanup = () => {
      clearTimeout(myTimeout.current);
    };
    
    cleanup();
    animate();

    return cleanup;
  }, []);

  return (
    <div className="h-full">
      <div className="flex justify-center items-center relative w-full h-full">
        <Header date={viewDate} />
        {three ? 
          <ModelThree date={viewDate} />
          :
          <Model speed={speed} date={viewDate} planetSize={planetSize} ringSize={ringSize} color={color} gap={gap} />
        }
        <Controls speed={speed} handleSpeed={handleSpeed} 
          handleDate={handleViewDate} 
          planetSize={planetSize} handlePlanetSize={setPlanetSize} 
          ringSize={ringSize} handleRingSize={setRingSize}
          color={color} handleColor={setColor} 
          gap={gap} handleGap={setGap} />
      </div>
    </div>
  )
}