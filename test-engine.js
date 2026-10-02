var E = require('./engine.js'), n = 0, bad = 0;
function near(a, b, tol, m) { n++; if (!(Math.abs(a - b) <= tol)) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// 1:12 slope = 8.333% = 4.76 degrees
var s = E.slope(1, 12); near(s.percent, 8.333, 0.001, '1:12 pct'); near(s.degrees, 4.763, 0.001, '1:12 deg'); near(s.ratio, 12, 1e-9, 'ratio');
near(E.slope(1, 8).percent, 12.5, 1e-9, '1:8'); near(E.slope(1, 10).degrees, 5.711, 0.001, '1:10 deg');
// plan: 30 in rise is one run of 360 in (30 ft), the legal maximum single run, no landing
var p = E.plan(30); is(p.runs, 1, '30 in one run'); is(p.landings, 0, 'no landing'); near(p.runLength, 360, 1e-9, '30 ft run'); near(p.totalLength, 360, 1e-9, 'total');
// 31 in needs two runs and one 60 in landing
p = E.plan(31); is(p.runs, 2, '31 in two runs'); is(p.landings, 1, 'one landing'); near(p.totalLength, 31 * 12 + 60, 1e-9, '31 total'); near(p.risePerRun, 15.5, 1e-9, 'rise per run');
// 60 in rise: 2 runs, 1 landing; 61 in: 3 runs, 2 landings; 6 in rise: 72 in run (6 ft), handrails not needed; 7 in: needed
is(E.plan(60).runs, 2, '60 runs'); is(E.plan(61).runs, 3, '61 runs'); is(E.plan(61).landings, 2, '61 landings');
near(E.plan(6).runLength, 72, 1e-9, '6 in run'); is(E.plan(6).handrails, false, '6 in no rails'); is(E.plan(6.5).handrails, true, '6.5 in rails');
// typical porch: 24 in rise = 24 ft run (288 in)
near(E.plan(24).runLength, 288, 1e-9, 'porch');
// check verdicts
is(E.check(10, 120).status, 'Compliant', 'exactly 1:12'); is(E.check(10, 130).status, 'Compliant', 'gentler');
is(E.check(6, 65).status, 'Existing-site exception only', '1:10.8 rise 6'); is(E.check(8, 85).status, 'Too steep', '1:10.6 rise 8 in');
is(E.check(3, 27).status, 'Existing-site exception only', '1:9 rise 3'); is(E.check(4, 36).status, 'Too steep', '1:9 rise 4');
is(E.check(3, 23).status, 'Too steep', 'steeper than 1:8'); is(E.check(3, 24).status, 'Existing-site exception only', 'exactly 1:8');
is(E.check(36, 432).status, 'Needs landing', '36 in single run'); is(E.check(36, 432).issues.length, 1, 'landing issue');
near(E.check(10, 100).shortBy, 20, 1e-9, 'short by'); near(E.check(10, 130).shortBy, 0, 1e-9, 'not short');
// unit conversion
near(E.toIn(2.54, 'cm'), 1, 1e-9, 'cm to in'); near(E.fromIn(30, 'cm'), 76.2, 1e-9, '30 in cm'); near(E.fromIn(5, 'in'), 5, 1e-9, 'in');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
