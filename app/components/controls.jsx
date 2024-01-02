
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState, useEffect } from "react";
import moment from "moment";
import { days_per_second } from "@/app/util/motion";

export default function Controls(props) {

  const initialDate = new moment().format("YYYY-MM-DD");

  const [inputDate, setInputDate] = useState(initialDate);

  const [daySpeed, setDaySpeed] = useState(75.54);

  const handleDate = (num) => {
    props.handleDate(num);
    setInputDate(num);
  }

  useEffect(() => {
    const dps = days_per_second(props.speed);
    setDaySpeed((dps).toFixed(2));
  }, [props.speed]);

    return (
      <div className="h-18 border border-slate-800 bg-slate-900 shadow-md shadow-black p-2 md:px-6 rounded">
        <div className="flex justify-between flex-wrap">
          <div className="flex justify-center items-center py-2 flex-auto xl:flex-none">
            <button className={`outline-none px-4 py-1 rounded-s-lg hover:brightness-75 active:brightness-50 transition-all border active:bg-rose-500 active:border-rose-300 shadow-sm shadow-slate-950 z-20 ${ props.color ? "bg-rose-500 border-rose-300" : "bg-rose-900 border-rose-700"}`} onClick={e => props.handleColor(!props.color)}>Color</button>
            <button className={`px-4 py-1 rounded-e-lg hover:brightness-75 active:brightness-50 transition-all border active:bg-slate-400 active:border-slate-200 active:text-slate-950 shadow-sm shadow-slate-950 z-10 ${ props.gap ? "bg-slate-400 border-slate-200 text-slate-950" : "bg-slate-700 border-slate-500"}`} onClick={e => props.handleGap(!props.gap)}>Gap</button>
          </div>
          <div className="flex justify-center items-center flex-wrap py-2">
            <div className="">
              <label className="block ms-4 text-sm">Revolution speed: <span className="float-right text-xs text-slate-500 me-4">{daySpeed} days/s</span></label>
              <input type="range" className="slider slider-1 shadow-sm shadow-slate-950" id="speed-range" min="-6" max="6" step="0.01" value={props.speed} onChange={e => props.handleSpeed(e.target.value)} />
            </div>
            <div className="">
              <label className="block ms-4 text-sm">Planet size: <span className="float-right text-xs text-slate-500 me-4">21 days</span></label>
              <input type="range" className="slider slider-2 shadow-sm shadow-slate-950" id="planet-range" min="1" max="7" step="0.25" value={props.planetSize} onChange={e => props.handlePlanetSize(e.target.value)} />
            </div>
            <div className="">
              <label className="block ms-4 text-sm">Ring size: <span className="float-right text-xs text-slate-500 me-4">21 days</span></label>
              <input type="range" className="slider slider-3 shadow-sm shadow-slate-950" id="ring-range" min="0" max="12" step="0.5" value={props.ringSize} onChange={e => props.handleRingSize(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-center items-center py-2 flex-auto xl:flex-none">
            <button className="me-4 outline-none px-2 py-1 rounded-lg bg-slate-800 hover:brightness-75 active:brightness-50 transition-all border border-slate-600 active:bg-slate-950 active:border-slate-700 shadow-sm shadow-slate-950"><i className="bi bi-clipboard-data"></i></button>
            <input type="date" className="border border-slate-600 bg-slate-950 outline-none text-base h-9 ps-3 shadow-sm shadow-slate-950 w-48 rounded-s-lg" value={inputDate} onChange={e => handleDate(e.target.value)}></input>
            <button className="outline-none px-2.5 py-1 rounded-e-lg bg-slate-800 h-9 hover:brightness-75 active:brightness-50 transition-all border border-slate-600 active:bg-slate-400 active:border-slate-200 active:text-slate-950 shadow-sm shadow-slate-950" onClick={() => handleDate(inputDate)}><i className="bi bi-clock-history"></i></button>
          </div>
        </div>
      </div>
    )
}