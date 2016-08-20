//THIS SHOULD BE EVERYTHING YOU NEED. IT JUST NEEDS RE-WRITING AND SIMPLYFYING

function commaSeparate(val) {
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  }
  return val;
}

function runMath() {

  // set dates
  var startdate = new Date("2015/04/05 00:00:00");
  var enddate = new Date("2016/04/05 00:00:00"); // last day
  var currentdate = new Date(); // time and date of page load

  // set amounts
  var startamount = 1479000000000;
  var endamount = 1676000000000;

  // calculate increment (£ per second)
  var increase = endamount - startamount;
  var duration_ms = Math.abs(enddate.getTime() - startdate.getTime());
  var duration = Math.ceil(duration_ms / (1000));
  var increment = Math.ceil(increase / duration);

  // time elapsed
  var elapsed_ms = Math.abs(currentdate.getTime() - startdate.getTime());
  var elapsed = Math.ceil(elapsed_ms / (1000)); // seconds since start date

  // calculate interest
  var increment_interest = Math.ceil(increase / duration);
  var currentinterest_raw = (0 + (increment_interest * elapsed));
  var currentinterest = commaSeparate(currentinterest_raw);

  // calculate current total
  var currentdebt_raw = Math.ceil(startamount + (increment * elapsed)); // start + accrued debt
  var currentdebt = commaSeparate(currentdebt_raw); // format correctly (£0,000,000)

  // per household
  var per_household_raw = Math.ceil(currentdebt_raw / 26700000); //26.7m households
  var per_household = commaSeparate(per_household_raw);

  // per person
  var per_person_raw = Math.ceil(currentdebt_raw / 64600000); //64.6m people
  var per_person = commaSeparate(per_person_raw);

  // per child
  var per_child_raw = Math.ceil(currentdebt_raw / 13524254); //13.5m u18s
  var per_child = commaSeparate(per_child_raw);

  // write initial states
  $('.debt').html(currentdebt);
  $('.person').html(per_person);
  $('.household').html(per_household);
  $('.child').html(per_child);
  $('.interest').html(currentinterest);

  document.title = 'UK Debt Clock | £' + currentdebt;

}
