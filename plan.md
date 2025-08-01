# Future Feature Ideas

- Improve use of Boarding Music.

    - Pause it rather than restart when interrupted

    - Use other variants e.g. BoardingMusic[1].ogg, BoardingMusic[2].ogg in the play loop, which sort of bends the rules a bit of the set numbers used (they are meant for consistent voices, as when randomized per flight they stick during the flight).

    - Maybe resume music after BoardingComplete and Arm Doors, so basically keep it around until ready for PreSafetyBriefing.

- In simulator MSFS 2020 Toolbar and MSFS 2024 EFB controls, basically duplicate what you can press in the windows app as needed. Useful in VR.

- 3D Positional Audio. Work out the likely output in the camera position per aircraft type and play the announcements with 3d channel balance.

- Add GSX automatic actions per aircraft, e.g. call 'Deboarding' automatically to GSX for aircraft that don't support that but we can tell are in that state. Essentially bring the 'automatic GSX' Fenix rules to all aircraft.

- Additional sounds/states not in the current Fenix spec, but will need sound pack support e.g.

  - Delay announcements (using simbrief ETD timings etc),

  - Cabin noise at different periods (that is not covered by GSX)

  - Dispatch Release (ground agent paperwork/load sheet info etc)

  - Accurate Dawn / Dusk algorithm for Cabin Dim announcement.

  - Turbulence announcements (using current weather etc),

  - Reached Cruise altitude announcement, for service etc

  - Periodic Food Service / Refreshments announcements (dependant on flight time, elapsed etc 'breakfast etc')

  - Diversion / Medical Emergency announcements, using the Alternate destination in flight plan etc.

  - Scenic landmark announcements using sim Points of Interest lookup.

- WASM experiment for Seat belt detection in add-ins, e.g. MobiFlight or WASimCommander open source etc
  Wasm thing to have to put in community folder and then check l:var request for?

- Some sort of Aircraft 'family' hierarchy for files e.g. [737] for [B737] [B738] etc so less tags needed in sound file combos.

- Summarize essential simbrief OFP data to make the UI a more succinct set of data (not really announcement related, I just want it in terms of ZFW/Block/PAX essentials rather than hunt around).

- Random events/sounds as part of cabin audio.

Feel free to create a blank issue if you want to comment on any of these in terms of importance.