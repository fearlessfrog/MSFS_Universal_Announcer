# Manual update plan: fenix-v3

Prepared 6 November 2026. Implementation is complete: a 46-page v1.0.2.3 manual with ten illustrations, including the supplied full Tweaks screenshot. Text, build, PDF and HTML checks are complete. The original plan below is retained for context; see QA.md and SCREENSHOTS.md for final verification and capture provenance.

## Baseline and scope

- Current manual: revision **2026-10-04.1**, app **1.0.0.0**, 35 pages; source baseline `3217cc79e926975658574cb0d2f9032b2e3ad52a`.
- Target: **1.0.2.3**, branch `fenix-v3`, commit **`b9e1d147d262b1c6c83b79d51a931972bd34dbab`**. The remote branch was checked with `git ls-remote` after the maintainer's update and matched the clean `D:\code\UniversalAnnouncer` checkout.
- Scope: explain new controls, choices, workflows and supported pack formats where users need them. Do not turn the manual into a changelog or include internal refactors, bug-fix histories, test infrastructure, protocol messages or developer build commands.
- Keep existing section anchors and established links. Edit `_manual-source/manual.md`, then generate HTML/PDF through the existing builder. Do not edit generated HTML by hand.
- Use desktop Announcement panel captures for the shared announcement UI, as confirmed by the maintainer. Retain separate instructions for installing/opening the MSFS toolbar and identify desktop-only features.
- Update inaccurate existing instructions even when the underlying change originated as a fix. Present the current procedure, without a fixes section.

## 1. Make the Announcement panel the main control walkthrough

**Existing sections:** 1 `getting-started`, 6 `arrival`, 7 `controls`, 8 `toolbar`, 17 `faq`, 19 `quick-reference`.

Add a short introduction in installation/first launch: open **Announcement panel** from **Status > Flight State Controls**, the tray menu, or **Announcements**. Desktop hosting needs WebView2 and the packaged `ControlPanel` folder. A desktop panel does not require a Community package. Existing Settings/tray controls remain available if the panel cannot open.

Keep section 7 for the distinction between actions:

- Announcement tiles request a call without advancing automatic flight steps. Speech queues behind speech; manual calls interrupt boarding/arrival music, which resumes after the queue and delay.
- **Play next** advances the automatic sequence, interrupts playback and clears queued manual clips.
- **Stop** clears the queue and pauses automation; **Resume** continues without resetting the flight.
- **Mute** silences playback without clearing progress or the queue.
- **Restart** in Settings and **Reset flight** in the panel reset announcement progress. The reset beside ICAO overrides is a different control.
- Manual flight-phase buttons remain separate from announcement tiles.

Expand section 8 into **Use the Announcement panel and MSFS toolbar**, keeping `toolbar` as its anchor. Split into two illustrated pages if needed; add `announcement-recordings` for the second page rather than crowding the existing page.

Teach this workflow:

1. Choose **Boarding**, **Departure**, **Cruise**, **Arrival** or **Ground**. The initial bank follows the flight stage; choosing a bank only changes the displayed calls.
2. Use separate **Seatbelt sign on** and **Seatbelt sign off** tiles, available in every bank. Replace references to a single toolbar Seatbelt button throughout the manual; the Settings Seatbelt control still exists.
3. Use the grid icon (**All stages**) for the full set, including **Emergency descent**. Turbulence is also available in Cruise and Arrival.
4. Use the folder icon (**All recordings**) to search and play an exact recording or variant. Explain why an exact manual selection differs from automatic condition matching. Hover for the full name and conditions.
5. Explain **Requested**, queued and playing feedback, amber/green states, and prevention of repeat requests while a tile is queued or playing.
6. Open **Flight details** with the ellipsis for Next Announcement, Waiting for, flight information, queue details, **Settings**, **Reset flight** and desktop **Always on top**.
7. Explain **Text size**: 80–200%, minus/plus, click the percentage to reset to 100%. Desktop and MSFS remember separate preferences. Window size/position are remembered on desktop.

Keep Community-folder installation and disconnected-panel troubleshooting concise. The desktop and simulator share the announcement UI; the simulator retains its own window frame. Do not describe Always on top as an in-simulator option or treat the toolbar toggle as a prerequisite for opening the desktop panel.

## 2. Update sound-pack setup and Fenix V3 selection

**Existing sections:** 2 `sound-packs`, 3 `sound-files`, 9 `tags`, 17 `faq`, C1 `file-tags`, C2 `file-selection`, C3 `route-tags`.

Revise folder instructions to accept an **Announcements** or **AirlinePacks** collection containing airline folders, including nested recordings/templates. Selecting a package containing one of these collections also works. **Default is optional**; show the existing layout as one example rather than a requirement. Selecting a collection does not automatically download a default pack. Preserve the explanation that Fenix ownership is unnecessary.

Add a short Fenix V3 setup subsection, with a longer reference page only if needed:

- Normal use: leave **Announcements > Advanced… > Recording selection** at **Automatic (recommended)**.
- Newly selected AirlinePacks collections use Fenix V3 rules; other new collections use UniversalAnnouncer rules. Existing collections retain their saved baseline. Do not imply upgrading converts every collection.
- The advanced override applies to the selected collection. Returning to Automatic restores its baseline. There is no pack-rules selector in the announcement panel.
- UniversalAnnouncer retains weighted specificity and ordinary per-flight variants. Fenix V3 uses specificity and retains its numbered selection through restarts/turnarounds, with variant-zero fallback. A new simulator connection or active pack/profile change starts a new selection session; reopening a panel does not.

Add the shared-name mappings to the filename/flight-step reference:

- `CrewTakeSeats` → takeoff and landing crew-seating calls.
- `CabinSecured` → takeoff and landing cabin-secure calls.
- `CabinDim` → takeoff and landing dimming calls.
- `SeatbeltSignOn` → `FastenSeatbelt`.
- `DeboardingStarted` → `DisembarkStarted`.

Eligible legacy names take precedence over their shared aliases; aliases do not create duplicate automatic events.

Revise C1/C2 rather than appending contradictory rules:

- Allow display names after an unbracketed `~`, for example `CabinService~Cabin service.ogg`. Keep `[CYVR~KSFO]` as route syntax. Replace the blanket statement that every suffix prevents matching.
- Cover phase tags, delivery modes, recognized aircraft/time alternatives, callsign prefixes, and both `Refueling`/`Refuelling` spellings.
- Explain that `[Manual]`, `[Prerecorded]` and `[Interphone]` describe delivery; `[Manual]` does not mean a button press is required. The app plays Windows audio and does not operate aircraft cabin systems.
- Explain the logical phase context of shared filenames, especially `PreFlight`, `Descent`, `Approach` and `Done`.
- Qualify the current score table as UniversalAnnouncer rules. Do not present it as the Fenix V3 algorithm; recheck the table against the new matching code when editing.
- Keep `[GA]` and `[Overwater]` restrictions explicit: unavailable conditions do not become unconditional automatic calls. Exact files can still be requested manually.
- Preserve the route and aircraft-family references; change only statements affected by the new selection profiles and tag parser.

## 3. Add the new announcement choices to the flight workflow

**Existing sections:** 5 `departure`, 6 `arrival`, 7 `controls`, A1 `flight-steps`, A2 `flight-steps-arrival`.

Expand the reference from 23 to **30 announcement types**, preserving the distinction between automatic steps and manually requested calls. Add an A3 page (`additional-announcements`) if the existing tables no longer fit.

- **Cabin service / `CabinService`:** cruise arrival, separate from the captain's top-of-climb call. Both may play, pilot first.
- **Descent started / `DescentStarted`:** established cruise/descent and planned-flight progress, separate from the captain's descent announcement. Explain the SimBrief dependency and manual alternative.
- **Seatbelt sign off / `SeatbeltSignOff`:** an airborne on-to-off transition after departure; observing an initial off state does not trigger it.
- **Dim lights for landing / `CabinDimLanding`:** nighttime landing preparation, between crew seating and the cabin-secure call.
- **Deboarding complete / `DeboardingComplete`:** GSX completion, with turnaround reset after the call is dealt with; use manual playback without GSX.
- **Emergency descent / `Decompression`:** manual only.
- **Turbulence / `Turbulence`:** manual only; do not imply automatic turbulence detection.

Tell upgrading users to enable the new automatic types individually on **Announcements**. Keep the captain calls, existing `DescentSeatbelts`, percentage cruise announcements and cabin service distinct. Explain the panel's **CruiseElapsed50Percent** label and supported `CruiseElapsed`, `CruiseElapsed50Percent`, `Cruise` names without changing the percentage-trigger explanation.

Replace the old app-version statement at the start of Appendix A. Correct the DescentSeatbelts threshold to **indicated altitude**, matching **Descent Detection Altitude (ft)**; takeoff and crew-seating heights remain AGL. Update the corresponding Tweaks explanation without describing the implementation fix.

## 4. Give temporary generated speech its own short walkthrough

**Existing sections:** 13 `generated`, 14 `templates`, 15 `voices`, 16 `generation-modes`, 16a `local-tts`, 16b `compatible-api-voices`, 17 `faq`.

Add a dedicated page (`temporary-generation`) beside section 16. Introduce it briefly on the first-generation page, then link to the full procedure:

1. Enable generated announcements, choose/configure a provider and voices.
2. Select **Use temporary generated announcements**; **+ Details** opens the explanation.
3. Use normal automation, Play next or announcement tiles. Speech uses eligible airline text, Default text, then bundled localized templates and the existing roles/placeholders.
4. Turn the mode off when you want to save generated recordings into the pack again.

Explain the practical differences: spoken pack recordings are bypassed; music, cabin noise and landing reactions retain their normal behavior; **All recordings** still plays exact files. Generated audio is temporary, outside the pack, and refreshed as relevant inputs change. This mode does not create airline folders or save generated audio/templates into the pack. Explicit template/role editing remains available and may save those edits.

Explain why **Generate**, **Generate As**, **Generate All** and replacement options are unavailable while this mode is active. Saved-mode preferences are retained. Failures skip the call rather than falling back to a recording; a new manual request can retry. Changing modes affects new requests, not clips already queued/playing.

Cross-link the local/hosted API pages so their existing save-generation steps clearly assume temporary mode is off. Mention the seven added localized templates without promising to overwrite or translate existing custom text. Do not add an Edge/Azure fixes narrative.

## 5. Document the new Tweaks choices where users need them

**Existing sections:** 7 `controls`, 9 `tags`, 14 `templates`, 16 `generation-modes`, B2 `dynamic-times`, E1–E3 `tweaks`, `tweaks-timing`, `tweaks-compatibility`.

Add one or two E-series pages rather than compressing the current screenshot and reference tables.

### Custom-tag fallback — default off

**Allow custom-tagged recordings as a last resort** permits otherwise matching recordings with unverified equipment labels such as WiFi/USB only when no fully matching recording is available. Matching aliases and enabled Default recordings still win. It does not relax aircraft, time, airport/route, callsign, GA or Overwater conditions, text-template selection or mute handling. Explain the user tradeoff: a clip may describe equipment the app cannot verify. Cross-link from pack troubleshooting and tags.

### Randomized variants — default off

**Randomize numbered variants for each announcement** chooses among equally matching alternatives for each new logical request, including unnumbered versions, avoiding the previously accepted alternative when possible. It works independently of custom-tag fallback and with both selection profiles. Exact All recordings choices are unaffected. Interrupted music resumes the same track.

Use a small practical example: `CabinService.txt`, `CabinService[1].txt`, `CabinService[2].txt`, with the same role/voice for consistent speakers. Explain Generate As for saved audio alternatives. Numeric aircraft-family tags such as `[320]` remain conditions. Link to the ordinary per-flight/session behavior when randomization is off.

### Destination weather source — SimBrief by default

Document **SimBrief OFP (default)**, **NOAA (live)** and **VATSIM (live)** on Tweaks. The live options use the current SimBrief destination, need no account/API key, and retrieve current real-world weather, which may differ from simulator weather or ATIS.

Replace B2's claim that weather always comes from the supplied OFP. All four weather/temperature placeholders use the chosen observation; direct XML placeholders still use the OFP. Live retrieval runs in the background, with immediate OFP fallback until usable data is available. Explain the ten-minute refresh, fifteen-minute cache lifetime and rejection of observations older than three hours in the reference, not the basic walkthrough. Weather changes affect newly generated speech; existing recordings require regeneration. Missing fields remain empty and can be guarded with IF.

### MSFS keyboard/controller bindings — default on

Add a short setup page (`simulator-controls`) after Everyday controls and cross-link it from Tweaks. Use the exact setting **Use MSFS Smoke and Tailhook controls for announcements** and these mappings:

- **Smoke On:** Play Next (`SMOKE_ON`).
- **Smoke Off:** Stop/pause (`SMOKE_OFF`); repeated presses do not resume.
- **Tailhook Up:** reset flight (`SET_TAIL_HOOK_HANDLE`, value `0`).
- **Tailhook Down:** toggle mute/unmute (`SET_TAIL_HOOK_HANDLE`, value `1`).

Describe single-press bindings and avoiding release/repeat assignments. No toolbar package or custom LVAR is needed. Use Resume in the app/panel to resume automation; Play Next can request one call while paused. Mention that enabling this option takes over the corresponding smoke/tailhook events, so users should turn it off when they need the aircraft's normal functions. Apply/OK takes effect without reconnecting; preserve an existing disabled preference. Put raw event names/values in an optional device-software note rather than the main setup flow.

## 6. Refresh camera setup and small supporting instructions

**Existing sections:** 11 `camera-rules`, 12 `chaseplane`, 17 `faq`, 18 `support`, 19 `quick-reference`.

- Rewrite camera-rule steps around switching to the desired simulator view, clicking **Find current view**, using the **Current** indicator, choosing Treat as/Mute, and saving with **OK**. Include pilot and instrument views as well as quickviews. Explain the no-data state, reopening after an aircraft change, and the ChasePlane message when native rules do not apply.
- Replace the old advanced-camera image and its specific row narrative. Retain the separate ChasePlane workflow and image unless its UI is shown to have changed.
- In support, explain the clickable **Debug mode active - click here to open log location** label. A short note about the large-log startup warning is sufficient; no new diagnostics chapter.
- Remove or generalize the stale Synaptic A220-specific engine-signal workaround after checking the new support path. Keep generic Play Next recovery guidance without claiming every aircraft is now verified.
- Refresh the preflight checklist: collection, selected rules only if overridden, enabled new calls, speech mode, panel and optional bindings. Keep it short.
- Clarify update packaging: keep the packaged desktop panel assets together and install the matching updated Community panel when using the toolbar. Verify the actual release ZIP before stating its exact contents.

## Screenshot plan

Desktop captures are sufficient for announcement UI. No separate in-simulator toolbar capture is required for this update.

Review captures already saved under `screenshots/fenix-v3-review/`:

- `12-announcement-panel.png`: compact Boarding bank and persistent seatbelt tiles.
- `13-announcement-panel-details.png`: expanded details, text-size controls, Settings, Reset flight and Always on top.
- `14-all-recordings.png`: populated recording browser and search field.

These are genuine captures from the target checkout with MSFS disconnected. The latter two use a maximized window and are **layout evidence, not print-ready illustrations**. Recapture with a readable, compact window and adequate height before including them. Do not describe the empty flight fields as a connected flight or include unrelated desktop content.

Required final image work:

1. Replace `04-toolbar.png` with a well-framed shared panel image; revise its caption to identify a desktop example. Add details/browser images only where the second page needs them.
2. Replace `06-camera-rules.png` with the new dialog. A meaningful Current/Find current view example needs a connected simulator and aircraft; a disconnected capture can document layout only.
3. Replace `07-generated.png` or add a companion image showing temporary mode and expanded Details, with disabled saved-generation actions visible. Avoid keys and unrelated provider/account data.
4. Replace `11-tweaks.png`; use a second cropped viewport if needed for custom-tag fallback, randomization, simulator bindings and weather source. Do not shrink a tall tab until labels are unreadable.
5. Capture **Announcements** with the new call choices and **Advanced… > Recording selection**. Keep the latter optional if a brief text instruction is clearer.
6. Refresh the tray image only if its missing Announcement panel entry makes the introductory instructions misleading. Keep other existing images unless their labels or examples conflict with the updated text.

The only image likely to need maintainer help is the live camera-identification example. A connected flight/queue example would be useful but is not required to explain the shared panel.

## Implementation and validation order

1. Recheck the branch SHA before editing; if it moved, review only the additional changes and update this baseline.
2. Edit the high-impact workflows first: panel, pack selection, temporary speech. Then update flight steps, new Tweaks, camera setup and cross-references.
3. Add new page anchors only where needed. A working allowance is **six to eight additional pages**, subject to actual layout; do not force the manual to remain at 35 pages or shrink body text to fit.
4. Capture final images and update `metadata.json` captions/widths, `SCREENSHOTS.md`, `SOURCES.md` and `QA.md`. Record app version 1.0.2.3 and the verified commit; use v1.0.2.3 without a beta suffix, as subsequently requested by the maintainer. Preserve the maintainer's blank cover review-status preference.
5. Run `npm run check` and `npm run build` in `_manual-source`. Verify anchors, image availability, overflow, generated contents numbers and actual PDF page count.
6. Render and visually inspect every PDF page; check narrow and desktop HTML, offline assets and full-size image links. Check that source and distributed screenshot bytes match.
7. Perform a focused wording audit for old single-seatbelt toolbar instructions, Restart/Reset labels, mandatory Default folders, the universal score table, rejected filename suffixes, OFP-only weather and descent AGL wording.
8. Record live checks separately: GSX/new automatic calls, non-GSX manual calls, smoke/tailhook bindings, current-view detection and temporary speech/provider playback. Source inspection and screenshots do not establish those results.
9. Deliver the updated authoring source and generated `manual/` HTML/PDF together. Publishing and release packaging are separate actions.

No application source changes or application tests are needed. The implementation updates the authoring source and generated local HTML/PDF; nothing has been published.

## Evidence for the editor

All application paths below were inspected in the clean target checkout. Use the pinned commit when following the repository links, since the branch can continue changing.

- [Target commit](https://github.com/fearlessfrog/UniversalAnnouncer/commit/b9e1d147d262b1c6c83b79d51a931972bd34dbab).
- [Fenix V3 and panel feature notes](https://github.com/fearlessfrog/UniversalAnnouncer/blob/b9e1d147d262b1c6c83b79d51a931972bd34dbab/docs/FENIX_V3.md), checked against `ControlPanel/panel.js`, `ControlPanelForm.cs`, `UniversalAnnouncerApp.ControlPanel.cs`, `SettingsForm.Packs.cs`, `AnnouncementFile.cs`, `SoundFileManager.Packs.cs` and `SoundFileManager.CustomTags.cs`.
- [Simulator control instructions](https://github.com/fearlessfrog/UniversalAnnouncer/blob/b9e1d147d262b1c6c83b79d51a931972bd34dbab/docs/SIMULATOR_CONTROLS.md), configuration defaults and current English strings.
- New speech mode: `SettingsForm.GeneratedModes.cs` and the temporary-generation section of the Fenix V3 notes.
- New flight calls: `Models/AnnouncementType.cs`, `AnnouncementStateMachine.Additional.cs`, `AnnouncementStateMachine.cs`, `ConfigurationManager.cs`.
- Weather: `SettingsForm.Weather.cs`, `DestinationWeatherService.cs`, `PlaceholderResolver.cs`, `public_readme.md`.
- Camera workflow: `CameraViewVolumeDialog.cs`, `Strings.resx`. Indicated altitude: `SimConnectManager.cs` and the descent trigger in `AnnouncementStateMachine.cs`.
- Observed live: the app launched through `dotnet run -- --control-panel`; the desktop panel, expanded controls and populated recording browser were inspected. MSFS remained disconnected; no announcements were played and no flight/control binding tests were performed. The panel was restored from maximized size after capture.
