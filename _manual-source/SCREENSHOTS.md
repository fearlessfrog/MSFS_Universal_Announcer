# Screenshot inventory

The eleven screenshots were originally supplied on 20 September 2026. Revision 2026-09-27.2 incorporates the maintainer's replacement Roles screenshot, preserving its supplied bytes; the other ten images remain unchanged. Images show English UI; Generated and Roles are Edge examples. The compatible API pages use text instructions, with no simulated screenshots.

## Included captures

1. `01-tray.png`, page 2: tray menu. The caption makes clear that the captured app is disconnected.
2. `02-sound-files.png`, page 4: sound root and Default files. The example root is named UA; the text explains that Preview is disabled until a file is selected.
3. `03-simbrief.png`, page 5: username and fetched BAW/A20N, EGLL to EHAM plan. The supplied public author handle remains as shown; no password or API key is present.
4. `04-toolbar.png`, page 9: connected Preflight panel. The instructions use the visible Seatbelt and Restart labels.
5. `05-camera-volumes.png`, page 11: 80% main volume and Cockpit 25%, Cabin 100%, External 0%. PA mix and cabin noise are identified as separate options.
6. `06-camera-rules.png`, page 12: B738 example. Quickview 2 is Cabin, Quickviews 3 and 4 are muted, and Quickview 6 is External. Readers are told to configure their own views rather than copy every row.
7. `07-generated.png`, page 14: Edge, BAW and template editor. Replacement options are enabled in this example, so the text explicitly calls them optional and explains how to preserve recordings.
8. `08-roles.png`, page 16: Ryan for Pilot and Brian for Flight Attendant on BAW/Edge. Replaced by the maintainer on 27 September; caption and surrounding prose now match.
9. `09-chaseplane.png`, page 13: General Functionality > Enable 3rd party plugins set to ON.
10. `10-discord-channels.png`, page 3: Announcement Hangar and both compatible pack categories, FENIX ANNOUNCEMENT PACKS and UNIVERSAL ANNOUNCEMENT PACKS. The FAQ repeats the compatibility point.

11. `11-tweaks.png`, page 32: the supplied Tweaks tab. Saved unchanged from the clipboard attachment. The caption and text distinguish the example values (15 minutes and 1.11g) from code defaults (10 minutes and 1.20g).

## Remaining live checks

- Walk through a clean installation and preview a recording on the selected audio device.
- Fly one GSX and one non-GSX sequence, checking the expected calls and manual controls.
- Switch native camera views and ChasePlane presets to confirm the chosen volume categories.
- Test the connected toolbar controls in the simulator and confirm the toolbar package in the release ZIP.
- Generate and listen to sample announcements using the suggested Edge voices.
- Walk through local and hosted OpenAI-compatible API generation, typed voices and role assignments. These were verified against source, not a live server.
- Confirm that the public Discord invitation and joining instructions still work for a new member.

Screenshots confirm visible UI, not successful completion of these live tests. Record their results in QA.md. The maintainer requested removal of the public review-copy status in revision .4.
