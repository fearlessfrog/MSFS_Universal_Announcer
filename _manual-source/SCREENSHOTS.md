# Screenshot inventory

Revision 2026-11-22.4, application v1.0.3.2: twelve images across the 55-page manual. Nine earlier captures retain their bytes; three replacement captures show the current Generated tab, Roles dialog and Simulators section at native resolution as lossless PNGs. Included source/output hashes match. HTML provides full-size links.

## Included captures

| File | PDF page | Content and provenance |
| --- | --- | --- |
| `02-sound-files.png` | 5 | Retained supplied sound-root example. The root is named UA; Preview needs a selected recording. |
| `03-simbrief.png` | 6 | Retained supplied username and fetched BAW/A20N, EGLL to EHAM plan. No password or API key is shown. |
| `04-toolbar.png` | 11 | Retained 6 November shared-panel overview, replacing the old toolbar screenshot. Actual packaged UI and live app status; MSFS disconnected. |
| `12-panel-details.png` | 12 | Retained 6 November shared-panel Flight details capture. The caption distinguishes the shared UI from desktop-only native controls. |
| `13-recordings.png` | 13 | Retained 6 November shared-panel All recordings capture showing the recording browser. |
| `05-camera-volumes.png` | 15 | Retained supplied main/category volumes. PA mix and cabin noise are separate options. |
| `09-chaseplane.png` | 18 | Retained supplied General Functionality > Enable 3rd party plugins setting. |
| `15-roles-current.png` | 23 | Native-resolution crop (494 x 226) of the current Debug-build Roles dialog, Default/Edge with both roles Automatic / fallback. No assignments changed. |
| `10-discord-channels.png` | 4 | Retained supplied Announcement Hangar screenshot showing both compatible pack categories. |
| `11-tweaks.png` | 46 | Complete 820 x 1303 image supplied by the maintainer on 6 November, saved unchanged from the clipboard and visually matched to the attachment. Caption distinguishes saved example values (7,000/5,000 ft, six minutes, 1.11g and NOAA live) from defaults. |
| `14-generated-current.png` | 20 | Native-resolution content crop (750 x 1149) of the current Debug-build Generated tab with Temporary TTS, all text sources and Default selected for editing. Saved example choices, not fresh-install defaults. |
| `16-simulators-current.png` | 51 | Native-resolution crop (762 x 235) of the current Integrations tab showing the Simulators group, Auto, port 8086 and Aircraft switches. |

## Capture method and archived images

The three shared-panel images were captured on 6 November by rendering the unchanged packaged `ControlPanel/index.html`, CSS and JavaScript in Chromium, connected to the running application. Only Initialize, GetCapabilities and GetAnnouncements were sent. No flight state, queue, text or native host controls were mocked, no settings were changed and no audio was played. These images have no native Windows title bar or Always on top control; captions explain that distinction. The maintainer confirmed that the app and MSFS toolbar share this announcement UI.

On 22 November, launched the existing `D:\code\UniversalAnnouncer\bin\Debug\net8.0-windows\UniversalAnnouncer.exe` (file version 1.0.3.2) at the user's request. The initial computer-use captures were reduced-size images; Generated and Roles were JPEG data despite their `.png` extensions. They were replaced in revision 2026-11-22.3 after the maintainer reported blur.

Replacement captures use Windows Alt+Print Screen, pasted into Paint and saved as lossless PNG without scaling. Raw exports are retained locally as `.qa/v1032/generated-native.png`, `roles-native.png` and `integrations-native.png`. Paint's unused canvas area was excluded by rectangular cropping only. Generated uses `(20, 96, 770, 1245)`, Roles `(5, 40, 499, 266)`, and Simulators `(18, 664, 780, 899)`. Crops remove window chrome, blank space and unrelated controls; no UI text, values or controls were retouched. Generated is printed at 140 mm, Roles at 92 mm and Simulators at 130 mm. All included images exceed 120 dpi at their configured print size.

The simulator was disconnected. No simulator/playback/voice selections, templates or profiles were changed, and no audio or generation was requested. The Roles dialog was cancelled. The app was left open when the maintainer resumed interaction. The earlier capture limitations described in historical QA entries do not apply to these replacement images.

Unused originals `01-tray.png`, `06-camera-rules.png`, `07-generated.png` and `08-roles.png` remain archived but are not included in the manual. Their outdated controls are replaced by current text instructions. The `fenix-v3-review/` images are planning evidence only.

## Remaining live checks

- Verify X-Plane connection, pause/replay/reconnect, full-flight sequence and cabin calibration.
- Verify aircraft learning/import/export and model matching, including live MSFS learning and ToLiss switches.
- Exercise all three playback modes, source/refresh choices, selected-voice/template previews and existing-setting upgrades.

- Walk through a clean installation and preview a recording on the selected audio device.
- Fly GSX and non-GSX sequences, including the new calls, queues and turnaround reset.
- Check smoke/tailhook bindings, connected toolbar behavior and the toolbar package in the release ZIP.
- Test Find current view, native camera rules and ChasePlane presets with the simulator.
- Generate and listen to saved and temporary speech, including compatible API providers and role assignments.
- Check live destination weather and SimBrief fallback in a simulator session.
- Confirm the Discord invitation and joining instructions for a new member.

Screenshots confirm visible UI, not successful completion of these live tests. Record live results in QA.md.
