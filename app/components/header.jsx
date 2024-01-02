import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect, useState } from "react";

import { get_calendar_date } from "@/app/util/motion";
import moment from "moment";
import Modal from "./modal";

export default function Header(props) {

  const [displayDate, setDisplayDate] = useState("Jul 20, 1969");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setDisplayDate(moment.unix(get_calendar_date(props.date)).format("MMM DD, YYYY"));
  }, [props.date]);

    return (
      <div className="relative">
        <Modal visible={showInfo} close={() => setShowInfo(false)}>
            <p className="mb-4">This model utilizes the VSOP87 (French acronym of "Secular Variation of the Planet's Orbits 1987") mathematical model of the solar system.</p>
            <p className="mb-4">The VSOP formulas take a given Julian Calendar Date value <span className="font-mono px-2 text-sm bg-slate-950 border border-slate-800">julian</span> and returns the (x,y) coordinate data of each planet. The angle is found using the <span className="font-mono px-2 text-sm bg-slate-950 border border-slate-800">arctan</span> function.</p>
            <p className="mb-4"><span className="font-mono px-2 text-sm bg-slate-950 border border-slate-800">(x, y) = getplanet ( julian ) </span></p>
            <p className="mb-4"><span className="font-mono px-2 text-sm bg-slate-950 border border-slate-800">angle = arctan ( y / x ) </span></p>
            <p className="mb-4">The revolution <span className="font-mono px-2 text-sm bg text-sm-slate-950 border border-slate-800">speed</span> (e.g. 1 day/s) is taken and divided by the framerate (e.g. 1/60 days/s) and added to the <span className="font-mono px-2 text-sm bg text-sm-slate-950 border border-slate-800">julian</span> date value. The operation is done 60 times every second, so that the date is updated to:</p>
            <p className="mb-4"><span className="font-mono px-2 text-sm bg-slate-950 border border-slate-800">julian = julian + ( speed / 60 ) </span></p>
            <a target="_blank" href="https://en.wikipedia.org/wiki/VSOP_model">Learn more about VSOP</a>
        </Modal>
        <h1 className="text-4xl font-mono mb-2">Solar System Model</h1>
        <p className="text-xl">by Wilson Reeves</p>
        <div className="absolute right-0 top-0">
          <span className="px-4 py-1 font-mono font-bold bg-white text-black rounded-lg">
            {displayDate}
          </span>
          <span className="px-2">
            <i className="bi bi-info-circle text-lg hover:bg-white hover:text-slate-950 py-1 px-2 rounded-full cursor-pointer active:brightness-75 transition-all"
              onClick={() => setShowInfo(true)}></i>
          </span>
        </div>
      </div>
    )
}