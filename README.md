# RampRight

Plan or check an accessible ramp. Enter a rise to get the ramp length, runs, landings and handrail rule; or enter an existing ramp's rise and run to get slope (ratio, percent, degrees) and an ADA verdict.

Source: 2010 ADA Standards section 405 (https://www.access-board.gov/ada/guides/chapter-4-ramps-and-curb-ramps/, https://www.corada.com/documents/2010ADAStandards/405, https://www.law.cornell.edu/cfr/text/36/appendix-D_to_part_1191): running slope 1:12 max, cross slope 1:48, rise 30 in max per run, 60 in landings, clear width 36 in, handrails when rise is over 6 in; existing-site exceptions per Table 405.2 (1:10 for 6 in rise, 1:8 for 3 in rise, steeper than 1:8 prohibited).
Tests: 35 checks (1:12 = 8.33% = 4.76 degrees, 30 in rise = 360 in single run, 31 in needs 2 runs and 1 landing, 6 and 6.5 in handrail edge, every Table 405.2 boundary, unit conversion).
Deviations: new-construction length uses exactly 1:12; landings counted at 60 in minimum (turning landings and door landings are not modelled); local codes can be stricter. Not a substitute for a design professional.

Static client-side. `node test-engine.js` runs the tests.
