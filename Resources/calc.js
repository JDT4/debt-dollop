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
        // set amounts
        startamount = 1479000000000, //
        endamount = 1676000000000, //
        // calculate increment (£ per second)
        increase = endamount - startamount, //
        duration_ms = Math.abs(enddate.getTime() - startdate.getTime()), //
        duration = Math.ceil(duration_ms / (1000)), //
        increment = Math.ceil(increase / duration), //
        // time elapsed
        elapsed_ms = Math.abs(currentdate.getTime() - startdate.getTime()), //
        elapsed = Math.ceil(elapsed_ms / (1000)), // seconds since start date
        // calculate interest
        increment_interest = Math.ceil(increase / duration), //
        currentinterest_raw = commaSeparate(increment_interest * elapsed), //
        // calculate current total
        currentdebt_raw = Math.ceil(startamount + (increment * elapsed)), // start + accrued debt
        currentdebt = commaSeparate(currentdebt_raw), // format correctly (£0,000,000)
        // per household
        per_household_raw = commaSeparate(Math.ceil(currentdebt_raw / 26700000)), //26.7m households
        // per person
        per_person_raw = commaSeparate(Math.ceil(currentdebt_raw / 64600000)), //64.6m people
        // per child
        per_child_raw = commaSeparate(Math.ceil(currentdebt_raw / 13524254)); //13.5m u18s
    // write initial states
    $('.debt').html('£' + currentdebt);
    $('.person').html('£' + per_person_raw);
    $('.household').html('£' + per_household_raw);
    $('.child').html('£' + per_child_raw);
    $('.interest').html('£' + currentinterest_raw);
    document.title = 'UK Debt Clock | £' + currentdebt_raw;
}
$(document).ready(function () {
    "use strict";
    runMath();
    setInterval(runMath, 1000)();
});