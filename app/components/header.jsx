import "bootstrap-icons/font/bootstrap-icons.css";

import { useEffect, useState } from "react";

import { get_calendar_date } from "@/app/util/motion";
import moment from "moment";


export default function Header(props) {

  const [displayDate, setDisplayDate] = useState(props.date);

  useEffect(() => {
    setDisplayDate(moment.unix(get_calendar_date(props.date)).format("MMM DD, YYYY"));
  }, [props.date]);

    return (
      <div className="relative">
        <h1 className="text-4xl font-mono mb-2">Solar System Model</h1>
        <p className="text-xl">by Wilson Reeves</p>
        <div className="absolute right-0 top-0">
          <span className="px-4 py-1 text-base font-mono font-bold bg-white text-black rounded-lg">
            {displayDate}
          </span>
          <span className="px-2">
            <i className="bi bi-info-circle text-xl hover:bg-white hover:text-slate-950 p-1 px-2 rounded-lg cursor-pointer active:brightness-75 transition-all"></i>
          </span>
        </div>
      </div>
    )
}