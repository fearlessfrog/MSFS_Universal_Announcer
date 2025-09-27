# Future Feature Ideas

- Additional sounds/states not in the current Fenix spec, but will need sound pack support e.g.

  - Cabin noise at different periods (that is not covered by GSX) e.g. murmurs etc

  - Dispatch Release (ground agent paperwork/load sheet info etc) step

  - Turbulence announcements (using cabin g-force and movement detection)

  - Reached TOC Cruise altitude announcement, for service etc other than CruiseElapsed, plus TOD

  - Diversion / Medical Emergency announcements, using the Alternate destination in flight plan etc.

  - Scenic landmark announcements using sim Points of Interest lookup. Relies more on generated tts

  - Landing quality cabin noise e.g. use the g-force of the landing to allow for various applause vs wilhelm scream (and things between) like reactions to how good the landing was.

- Improve use of Boarding Music. Use other variants e.g. BoardingMusic[1].ogg, BoardingMusic[2].ogg in the play loop, which sort of bends the rules a bit of the set numbers used (they are meant for consistent voices, as when randomized per flight they stick during the flight). This would be just to vary the music up a bit.

- In simulator MSFS 2020 Toolbar and MSFS 2024 EFB controls, basically duplicate what you can press in the windows app as needed. Useful in VR. Make it more like a sound board you can press things and show the next 'rule' that app is looking for. Would require community folder entry, so likely an installer.

- 3D Positional Audio. Work out the likely output in the camera position per aircraft type and play the announcements with 3d channel balance. Split channel for positions.

- WASM experiment for Seat belt detection in add-ins, e.g. MobiFlight or WASimCommander open source etc
  WASM thing to have to put in community folder and then check l:var request for? Would require community folder entry, so likely an installer.

- Some sort of Aircraft 'family' hierarchy for files e.g. [737] for [B737] [B738] etc so less tags needed in sound file combos.

- Summarize essential simbrief OFP data to make the UI a more succinct set of data (not really announcement related at all, I just want it in terms of ZFW/Block/PAX essentials rather than hunt around).

- Random events/sounds as part of cabin audio.

Feel free to create a blank issue if you want to comment on any of these in terms of importance.