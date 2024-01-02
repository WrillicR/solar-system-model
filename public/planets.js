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
var now = new Date();
var start = new Date(now.getFullYear(), 0, 0);
var diff = now - start;
var oneDay = 1000 * 60 * 60 * 24;
var day = Math.floor(diff / oneDay);
var relation = 24 * 60 * 60 * 100;
var r = 4;
var curr_rot = new Array(10).fill(0);
var julian = 2440423.17847;
var date = new Date(julian);
var vsop = vsop87a_nano;
const FRAMERATE = 60;

function fill_table() {
  let table = $(".table-speeds");
  let thead = $("<thead>");
  thead.append($("<th>").text("Planet"));
  thead.append($("<th>").text("Speed (km/h)"));
  table.append(thead);

  for (var i=1; i<9;i++) {
    let nr = $("<tr>");

    nr.append($("<td>").text(speeds[i][0]).addClass(speeds[i][0].toLowerCase() + " c-planet p-stat"));
    nr.append($("<td>").text(speeds[i][1]));

    nr.appendTo(table);
  }
}

// utilize the VSOP model to get (x,y) coordinates in an array
function get_positions() {

  const jd = julian; //TDB time scale 
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


// update the UI to the planetary positions
function set_rotation() {

  date = new Date(get_calendar_date(julian));

  if (!isNaN(date)) {

    $(".date-badge").html(get_short_date(date));

    const pos_array = get_positions();

    for (var i=0;i<pos_array.length;i++) {
      let planet_deg = radians_to_degrees(Math.atan2(pos_array[i][1],pos_array[i][0]));
      let planet_deg_abs = (360 - planet_deg).toFixed(3);
      curr_rot[i+1] = planet_deg_abs;
      $(".planet").eq(i+1).attr("style", "transform: rotate(" + planet_deg_abs + "deg); r: " + r/2 + ";");
    }
  } else {
    $(".date-badge").html("Invalid Date");
  }
}

function radians_to_degrees(radians) {
  var pi = Math.PI;
  return radians * (180/pi);
}

// 2459938.49994 - Dec 24, 2022 11:59:55
function get_julian_date(time) {
  let jdn = time / 86400000 + 2440587.5;
  return jdn;
}

function get_calendar_date(jdt) {
  let cal = (jdt - 2440587.5) * 86400000;
  return cal;
}

function get_short_date(date) {
  return date.toLocaleString("en-US", { month: "short" }) + " " + date.getUTCDate().toString().padStart(2, "0") + ", " + date.getFullYear();
}

function get_day_progress() {
  const now = new Date();
  const seconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const seconds_day = 24 * 3600;

  return seconds / seconds_day;
}


function handle_date_change() {
  $("#speed-range").val(0);
  let temp_date = new Date($("#datepick").val());
  julian = get_julian_date(temp_date.getTime());
}

$(document).ready (function() {

  let today = new Date();
  let date_string = today.getFullYear() + "-" + (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0");
  $("#datepick").val(date_string);

  set_rotation();

  $("#speed-range").val(0.72);

  if ($("#speed-range").val()) {

    fill_table();

    $("#btn-check-1").change(function () {
      if (!$(this).prop("checked")) {
        $(".planet").addClass("c-planet");
        $(".p-stat").addClass("c-planet");
      } else  {
        $(".planet").removeClass("c-planet");
        $(".p-stat").removeClass("c-planet");
      }
    });

    $("#btn-check-2").change(function () {
      if ($(this).prop("checked")) 
        $(".planet").addClass("b-planet");
      else 
        $(".planet").removeClass("b-planet");
    });

    $(".position").click(function () {handle_date_change()});
    $("#datepick").change(function () {handle_date_change()});

  }

  var zero_ind = 0;
  // runs every frame (60 times per second)
  setInterval(function() {

    // makes sure to only do the following IF this is in the interface
    if ($("#planet-range").length > 0 ) { 
      var usr_speed = Math.pow(1.6, Math.abs($("#speed-range").val()))-1;
      usr_speed *= Math.sign($("#speed-range").val());
      var sw = $("#ring-range").val();
      r = $("#planet-range").val();
      if (sw == 0) {
        $(".ring").attr("style", "stroke: transparent");
      } else {
        $(".ring").attr("style", "stroke-width: " + (sw/6));
      }
    } else {
      // otherwise use defaults
      var usr_speed = .5;
      var sw = 1;
      r = 3;
    }
    
    var e_deg_sec = 60 * (speeds[3][1] / 24) * usr_speed;   // degrees/second
    var e_sec_cyc = 360 / e_deg_sec;                        // (degrees/cycles)/(degrees/second)
    var e_day_sec = 365.25/e_sec_cyc;                       // (days/year)/(seconds/cycle) == days/second

    var units = " days/s";
    var relation_1 = "";
    var relation_2 = ""; 

    if (e_day_sec == "1") units = " day/s"; 

    if (e_day_sec == "0") {
      e_day_sec = 1 / (24 * 60 * 60); // one second
      relation_2 = "0.00000003";
      $(".speed").html("0" + units);
    } else {
      e_day_sec = e_deg_sec.toFixed(0);
      relation_1 = (24 * 60 * 60 * e_day_sec) + "x ";
      relation_2 = (e_day_sec/365.25).toFixed(4);
      $(".speed").html(e_day_sec + units);
    }

    julian += e_day_sec/FRAMERATE;

    $(".conversion").html(`Currently running at ` + relation_1 + `the speed of Earth's orbit`);
    $(".conversion-ex").html(`Every second in model Earth's orbit is ` + relation_2 + " Earth-years passing.");
    
    // console.log((new Date(get_calendar_date(julian))).toLocaleString());
    // console.log(get_short_date(get_calendar_date(julian)));
    set_rotation();
    
  }, 1000/FRAMERATE);

});
