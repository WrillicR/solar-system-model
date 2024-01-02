import vsop87a_nano from "@/app/util/vsop87a_nano"

const vsop = vsop87a_nano;

const speeds = [
  ["Sun", 0],
  ["Mercury", 47.87],
  ["Venus", 35.02],
  ["Earth", 29.78],
  ["Mars", 24.077],
  ["Jupiter", 13.07],
  ["Saturn", 9.69],
  ["Uranus", 6.81],
  ["Neptune", 5.43],
  ["Pluto", 4.67]];

// utilize the VSOP model to get (x,y) coordinates in an array
export function get_positions(jd) {
  const t = (jd - 2451545.0) / 365250.0;
  const pos_array = [
    vsop.getMercury(t),
    vsop.getVenus(t),
    vsop.getEarth(t),
    vsop.getMars(t),
    vsop.getJupiter(t),
    vsop.getSaturn(t),
    vsop.getUranus(t),
    vsop.getNeptune(t)
  ];
  return pos_array;
}

export function radians_to_degrees(radians) {
  let pi = Math.PI;
  return radians * (180/pi);
}

// 2459938.49994 - Dec 24, 2022 11:59:55
export function get_julian_date(time) {
  let jdn = time / 86400000 + 2440587.5;
  return jdn;
}

export function unix_to_julian(time) {
  let jdn = time / 86400 + 2440587.5;
  return jdn;
}

export function get_calendar_date(jdt) {
  let cal = (jdt - 2440587.5) * 86400;
  return cal;
}

export function days_per_second(speed) {
  let e_deg_sec = 60 * (speeds[3][1] / 24) * speed;   // degrees/second
  let e_sec_cyc = 360 / e_deg_sec;                        // (degrees/cycles)/(degrees/second)
  let e_day_sec = 365.25/e_sec_cyc;                       // (days/year)/(seconds/cycle) == days/second
  return e_day_sec;
}
