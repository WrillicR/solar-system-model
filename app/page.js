import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  return (
    <div className="p-10 flex flex-col justify-between h-full">
      <div className="relative">
        <h1 className="text-4xl font-mono mb-2">Solar System Model</h1>
        <p className="text-xl">by Wilson Reeves</p>
        <div className="absolute right-0 top-0">
          <span className="px-4 py-1 text-base font-mono font-bold bg-white text-black rounded-lg">
            Jan 1, 1969
          </span>
          <span className="px-2">
            <i className="bi bi-info-circle text-xl hover:bg-white hover:text-slate-950 p-1 px-2 rounded-lg cursor-pointer active:brightness-75 transition-all"></i>
          </span>
        </div>
      </div>
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
            <g><circle className="planet c-planet" id="sun" cx="0" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="mercury" cx="10" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="venus" cx="20" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="earth" cx="30" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="mars" cx="40" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="jupiter" cx="50" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="saturn" cx="60" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="uranus" cx="70" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="neptune" cx="80" cy="0"></circle></g>
            <g><circle className="planet c-planet" id="pluto" cx="90" cy="0"></circle></g>
          </g>
        </svg>
      </div>
      <div className="h-18 border border-slate-800 bg-slate-900 shadow-md p-2 md:px-6 rounded">
        <div className="flex justify-between flex-wrap">
          <div className="flex justify-center items-center py-2 flex-auto xl:flex-none">
            <button className="outline-none px-4 py-1 rounded-s-lg bg-rose-900 hover:brightness-75 active:brightness-50 transition-all border border-rose-700 active:bg-rose-500 active:border-rose-300 shadow-sm shadow-slate-950 z-20">Color</button>
            <button className="px-4 py-1 rounded-e-lg bg-slate-700 hover:brightness-75 active:brightness-50 transition-all border border-slate-500 active:bg-slate-400 active:border-slate-200 active:text-slate-950 shadow-sm shadow-slate-950 z-10">Gap</button>
          </div>
          <div className="flex justify-center items-center flex-wrap py-2">
            <div className="">
              <label className="block ms-4 text-sm">Revolution speed: <span className="float-right text-xs text-slate-500 me-4">21 days/s</span></label>
              <input type="range" className="slider slider-1 shadow-sm shadow-slate-950" id="speed-range" />
            </div>
            <div className="">
              <label className="block ms-4 text-sm">Planet size: <span className="float-right text-xs text-slate-500 me-4">21 days</span></label>
              <input type="range" className="slider slider-2 shadow-sm shadow-slate-950" id="planet-range" />
            </div>
            <div className="">
              <label className="block ms-4 text-sm">Ring size: <span className="float-right text-xs text-slate-500 me-4">21 days</span></label>
              <input type="range" className="slider slider-3 shadow-sm shadow-slate-950" id="ring-range" />
            </div>
          </div>
          <div className="flex justify-center items-center py-2 flex-auto xl:flex-none">
            <button className="me-4 outline-none px-2 py-1 rounded-lg bg-slate-700 hover:brightness-75 active:brightness-50 transition-all border border-slate-500 active:bg-slate-950 active:border-slate-700 shadow-sm shadow-slate-950"><i className="bi bi-clipboard-data"></i></button>
            <input type="date" className="border border-slate-700 bg-slate-950 outline-none text-base h-9 ps-3 shadow-sm shadow-slate-950 w-48 rounded-s-lg"></input>
            <button className="outline-none px-2.5 py-1 rounded-e-lg bg-slate-800 h-9 hover:brightness-75 active:brightness-50 transition-all border border-slate-700 active:bg-slate-400 active:border-slate-200 active:text-slate-950 shadow-sm shadow-slate-950"><i className="bi bi-clock-history"></i></button>
          </div>
        </div>
      </div>
    </div>
  )
}
