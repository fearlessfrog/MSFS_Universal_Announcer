# Screenshot inventory

Revision 2026-11-06.1, application v1.0.2.3: ten included images across the 46-page manual. Six older supplied captures are retained, three captures show the current shared Announcement panel, and the maintainer supplied a complete replacement Tweaks image. Included source and output assets match byte for byte. HTML provides full-size links.

## Included captures

| File | PDF page | Content and provenance |
| --- | --- | --- |
| `02-sound-files.png` | 5 | Retained supplied sound-root example. The root is named UA; Preview needs a selected recording. |
| `03-simbrief.png` | 7 | Retained supplied username and fetched BAW/A20N, EGLL to EHAM plan. No password or API key is shown. |
| `04-toolbar.png` | 12 | New shared-panel overview, replacing the old toolbar screenshot. Actual packaged UI and live app status; MSFS disconnected. |
| `12-panel-details.png` | 13 | New shared-panel Flight details capture. The caption distinguishes the shared UI from desktop-only native controls. |
| `13-recordings.png` | 14 | New shared-panel All recordings capture showing the recording browser. |
| `05-camera-volumes.png` | 16 | Retained supplied main/category volumes. PA mix and cabin noise are separate options. |
| `09-chaseplane.png` | 18 | Retained supplied General Functionality > Enable 3rd party plugins setting. |
| `08-roles.png` | 21 | Maintainer's 27 September replacement: BAW/Edge, Ryan as Pilot and Brian as Flight Attendant. |
| `10-discord-channels.png` | 4 | Retained supplied Announcement Hangar screenshot showing both compatible pack categories. |
| `11-tweaks.png` | 42 | Complete 820 x 1303 image supplied by the maintainer on 6 November, saved unchanged from the clipboard and visually matched to the attachment. Caption distinguishes saved example values (7,000/5,000 ft, six minutes, 1.11g and NOAA live) from defaults. |

## Capture method and archived images

The three shared-panel images render the unchanged packaged `ControlPanel/index.html`, CSS and JavaScript in Chromium, connected to the running application. Only Initialize, GetCapabilities and GetAnnouncements were sent. No flight state, queue, text or native host controls were mocked, no settings were changed and no audio was played. These images have no native Windows title bar or Always on top control; captions explain that distinction. The maintainer confirmed that the app and MSFS toolbar share this announcement UI.

Native Windows capture stopped after Escape during the earlier capture attempt. The supplied Tweaks image resolves that missing illustration; no further screenshot is required for this edition.

Unused originals `01-tray.png`, `06-camera-rules.png` and `07-generated.png` remain archived but are not included in the manual. Their outdated controls are replaced by current text instructions. The `fenix-v3-review/` images are planning evidence only.

## Remaining live checks

- Walk through a clean installation and preview a recording on the selected audio device.
- Fly GSX and non-GSX sequences, including the new calls, queues and turnaround reset.
- Check smoke/tailhook bindings, connected toolbar behavior and the toolbar package in the release ZIP.
- Test Find current view, native camera rules and ChasePlane presets with the simulator.
- Generate and listen to saved and temporary speech, including compatible API providers and role assignments.
- Check live destination weather and SimBrief fallback in a simulator session.
- Confirm the Discord invitation and joining instructions for a new member.

Screenshots confirm visible UI, not successful completion of these live tests. Record live results in QA.md.
