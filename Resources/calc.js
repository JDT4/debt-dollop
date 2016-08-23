/*jslint browser: true*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
/*global $, jQuery, alert*/
function commaSeparate(val) {
  "use strict";
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  return val;
}

function runMath() {
  "use strict";
  // set dates
  var startdate = new Date("2015/04/05 00:00:00"), //end
    enddate = new Date("2016/04/05 00:00:00"), // last day
    currentdate = new Date(), // time and date of page load
    // Calculate times
    duration_ms = Math.abs(enddate.getTime() - startdate.getTime()),
    duration = Math.ceil(duration_ms / (1000)),

    // time elapsed
    elapsed_ms = Math.abs(currentdate.getTime() - startdate.getTime()),
    elapsed = Math.ceil(elapsed_ms / (1000)), // seconds since start date

    // set amounts
    startamount = 1591000000000,
    endamount = 1638000000000,
    totalinterest = 35400000000,

    // calculate increment (£ per second)
    increase = endamount - startamount,
    increment = Math.ceil(increase / duration),
    interest_raw = Math.ceil(totalinterest / duration),
    currentinterest = commaSeparate(Math.ceil(interest_raw * elapsed)),
    // calculate current total
    currentdebt_raw = Math.ceil(startamount + (increment * elapsed)), // start + accrued debt
    currentdebt = commaSeparate(currentdebt_raw), // format correctly (£0,000,000)
    // per household
    per_household = commaSeparate(Math.ceil(currentdebt_raw / 27000000)), //27.0m households (2015)
    // per person
    per_person = commaSeparate(Math.ceil(currentdebt_raw / 65110000)), //65.1m people (2015)
    // per child
    per_child = commaSeparate(Math.ceil(currentdebt_raw / 13687654)); //13.6m under 18s (2014)
  // write initial states
  $('.debt').html('£' + currentdebt);
  $('.person').html('£' + per_person);
  $('.household').html('£' + per_household);
  $('.child').html('£' + per_child);
  $('.interest').html('£' + currentinterest);
  document.title = 'Debt Clock | £' + currentdebt;
}
$(document).ready(function () {
  "use strict";
  runMath();
  setInterval(runMath, 1000)();
});
