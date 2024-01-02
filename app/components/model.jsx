"use client";

import { useEffect, useState, useRef } from "react";

import { get_positions, radians_to_degrees, days_per_second } from "@/app/util/motion";

export default function Model(props) {

  const [date, setDate] = useState(props.date);

  useEffect(() => {
    const framePositions = get_positions(props.date);
    for ( let i = 0 ; i < framePositions.length; i++ ) {
      let planet_deg = radians_to_degrees(Math.atan2(framePositions[i][1],framePositions[i][0]));
      let planet_deg_abs = (360 - planet_deg).toFixed(3);
      document.getElementsByClassName('planet')[i+1].style["transform"] = "rotate(" + planet_deg_abs + "deg)";
    }
  }, [props.date]);
  
  useEffect(() => {
    const rings = document.getElementsByClassName("planet");
    for ( let i = 0 ; i < rings.length; i++ ) {
      if (props.color) rings[i].classList.remove("no-color");
      else  rings[i].classList.add("no-color");
    }
  }, [props.color]);
  
  useEffect(() => {
    const rings = document.getElementsByClassName("planet");
    for ( let i = 0 ; i < rings.length; i++ ) {
      if (props.gap) rings[i].classList.add("bordered-planet");
      else  rings[i].classList.remove("bordered-planet");
    }
  }, [props.gap]);

  useEffect(() => {
    const rings = document.getElementsByClassName("planet");
    for ( let i = 0 ; i < rings.length; i++ ) {
      rings[i].style["r"] = (props.planetSize/2);
    }
  }, [props.planetSize]);

  useEffect(() => {
    const rings = document.getElementsByClassName("ring");
    for ( let i = 0 ; i < rings.length; i++ ) {
      if (props.ringSize == 0) {
        rings[i].style["stroke"] = "transparent";
      } else {
        rings[i].style["stroke"] = "white";
        rings[i].style["strokeWidth"] = (props.ringSize/6);
      }
    }
  }, [props.ringSize]);

  return (
    <div className="flex justify-center">
      <svg id="solar-system" xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200" className="w-1/3">
        <g id="rings">
          <circle className="ring" id="sun-ring" cx="0" cy="0" r="0" stroke="white" fill="none"></circle>
          <circle className="ring" id="mercury-ring" cx="0" cy="0" r="10" stroke="white" fill="none"></circle>
          <circle className="ring" id="venus-ring" cx="0" cy="0" r="20" stroke="white" fill="none"></circle>
          <circle className="ring" id="earth-ring" cx="0" cy="0" r="30" stroke="white" fill="none"></circle>
          <circle className="ring" id="mars-ring" cx="0" cy="0" r="40" stroke="white" fill="none"></circle>
          <circle className="ring" id="jupiter-ring" cx="0" cy="0" r="50" stroke="white" fill="none"></circle>
          <circle className="ring" id="saturn-ring" cx="0" cy="0" r="60" stroke="white" fill="none"></circle>
          <circle className="ring" id="uranus-ring" cx="0" cy="0" r="70" stroke="white" fill="none"></circle>
          <circle className="ring" id="neptune-ring" cx="0" cy="0" r="80" stroke="white" fill="none"></circle>
          <circle className="ring" id="pluto-ring" cx="0" cy="0" r="90" stroke="white" fill="none"></circle>
        </g>
        <g id="planets">
          <g><circle className="planet no-color" id="sun" cx="0" cy="0"         style={{ transform: "rotate(0deg)"}}></circle></g>
          <g><circle className="planet no-color" id="mercury" cx="10" cy="0"    style={{ transform: "rotate(222.775deg)"}}></circle></g>
          <g><circle className="planet no-color" id="venus" cx="20" cy="0"      style={{ transform: "rotate(349.25deg)"}}></circle></g>
          <g><circle className="planet no-color" id="earth" cx="30" cy="0"      style={{ transform: "rotate(417.043deg)"}}></circle></g>
          <g><circle className="planet no-color" id="mars" cx="40" cy="0"       style={{ transform: "rotate(438.501deg)"}}></circle></g>
          <g><circle className="planet no-color" id="jupiter" cx="50" cy="0"    style={{ transform: "rotate(528.909deg)"}}></circle></g>
          <g><circle className="planet no-color" id="saturn" cx="60" cy="0"     style={{ transform: "rotate(327.514deg)"}}></circle></g>
          <g><circle className="planet no-color" id="uranus" cx="70" cy="0"     style={{ transform: "rotate(535.99deg)"}}></circle></g>
          <g><circle className="planet no-color" id="neptune" cx="80" cy="0"    style={{ transform: "rotate(481.834deg)"}}></circle></g>
          <g><circle className="planet no-color" id="pluto" cx="90" cy="0"      style={{ transform: "rotate(15deg)"}}></circle></g>
        </g>
      </svg>
    </div>
  )
}