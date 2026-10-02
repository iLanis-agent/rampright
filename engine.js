(function (root) {
  'use strict';
  // 2010 ADA Standards section 405 (access-board.gov/ada/guides/chapter-4-ramps-and-curb-ramps): running slope 1:12 max; cross slope 1:48 max; rise 30 in max per run;
  // landing at least 60 in long (405.7.3); handrails when rise is greater than 6 in (405.8); clear width 36 in min (405.5).
  // Table 405.2 (existing sites only): steeper than 1:12 up to 1:10 allowed for rise up to 6 in; steeper than 1:10 up to 1:8 for rise up to 3 in; steeper than 1:8 prohibited.
  var MAX_RISE_PER_RUN = 30, LANDING = 60, HANDRAIL_ABOVE = 6, MIN_WIDTH = 36, MM_PER_IN = 25.4;
  function slope(rise, run) { return { ratio: run / rise, percent: rise / run * 100, degrees: Math.atan(rise / run) * 180 / Math.PI }; }
  function runsNeeded(rise) { return Math.max(1, Math.ceil(rise / MAX_RISE_PER_RUN - 1e-9)); }
  // New construction: 1:12 -> 12 in of run per inch of rise
  function plan(rise) {
    var runs = runsNeeded(rise), landings = runs - 1, runLength = rise * 12;
    return { rise: rise, runs: runs, landings: landings, runLength: runLength, totalLength: runLength + landings * LANDING, handrails: rise > HANDRAIL_ABOVE, risePerRun: rise / runs };
  }
  // Check an existing ramp run (rise and run in inches)
  function check(rise, run) {
    var s = slope(rise, run), ratio = s.ratio, issues = [], status, exception = false;
    if (rise > MAX_RISE_PER_RUN) issues.push('Rise over 30 in needs a landing: split into runs of 30 in or less');
    if (ratio >= 12 - 1e-9) status = 'Compliant';
    else if (ratio >= 10 - 1e-9) { exception = true; if (rise <= 6 + 1e-9) status = 'Existing-site exception only'; else { status = 'Too steep'; issues.push('Between 1:12 and 1:10 is only allowed for a rise of 6 in or less (existing sites)'); } }
    else if (ratio >= 8 - 1e-9) { exception = true; if (rise <= 3 + 1e-9) status = 'Existing-site exception only'; else { status = 'Too steep'; issues.push('Between 1:10 and 1:8 is only allowed for a rise of 3 in or less (existing sites)'); } }
    else { status = 'Too steep'; issues.push('Steeper than 1:8 is prohibited'); }
    if (status === 'Compliant' && rise > MAX_RISE_PER_RUN) status = 'Needs landing';
    return { slope: s, status: status, issues: issues, handrails: rise > HANDRAIL_ABOVE, needRun: rise * 12, shortBy: Math.max(0, rise * 12 - run) };
  }
  function toIn(v, unit) { return unit === 'cm' ? v * 10 / MM_PER_IN : v; }
  function fromIn(v, unit) { return unit === 'cm' ? v * MM_PER_IN / 10 : v; }
  var api = { slope: slope, plan: plan, check: check, runsNeeded: runsNeeded, toIn: toIn, fromIn: fromIn, MAX_RISE_PER_RUN: MAX_RISE_PER_RUN, LANDING: LANDING, MIN_WIDTH: MIN_WIDTH };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Ramp = api;
})(typeof window !== 'undefined' ? window : this);
