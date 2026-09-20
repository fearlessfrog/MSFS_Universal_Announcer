# Illustrated review-build checks

Revision 2026-09-20.4, application 0.9.9.7.

## Passed

- Built matching HTML and PDF from the same Markdown with Marked 17.0.5 and Playwright 1.62.1 / Chromium 151.0.7922.34.
- PDF: 20 A4 pages, searchable text, tagged structure, outline/bookmarks and 43 link annotations. Text extraction found content and the correct footer on every page, with no em dashes or broken separator characters.
- All ten supplied screenshots are embedded. Original source and output asset image hashes match exactly.
- Every page of the final PDF was rendered with Poppler and visually inspected. No clipped text, broken code blocks, overlaps or footer collisions were found. Sound setup and camera rules have separate pages to make room for the images.
- Printed contents page numbers match the 20 sections. Every section fits the printable height.
- HTML: all internal links resolve, all ten images load, and no horizontal overflow occurs at 390px and 1280px. Each image has a full-size link.
- Offline browser check blocks remote requests. The manual uses local images and styles with no remote fonts or scripts.
- HTTP check under `/MSFS_Universal_Announcer/manual/`: stylesheet and screenshots load, contents navigation works, full-size images open, and the PDF download returns a valid PDF. Browser errors are absent.
- Desktop and mobile HTML renderings visually inspected.
- Visible labels and examples were checked against the supplied screenshots, including toolbar Restart/Seatbelt, camera Mute, Generated role selection, ChasePlane preferences and both Discord pack categories.
- The generated-announcement screenshot's enabled replacement options are explicitly described as optional, not recommended defaults.
- Previous live Edge catalog query returned 322 voices and included Sonia, Ryan, Aria, Jenny and Ava Multilingual. This verifies catalog names/availability, not synthesis or listening quality.
- Editorial pass checked the revised prose for plain instructions, repetition and accurate captions.

## Live checks not performed

- In-simulator GSX, non-GSX, camera, ChasePlane and toolbar checks, plus a clean-install walkthrough and listening to the proposed voices.
- Confirm the public Discord invitation/onboarding and the release ZIP's toolbar version.
The cover status was removed at the maintainer's request. This is a presentation change, not a claim that the live checks above were performed.

All screenshot requests are complete. The existing documentation and application files remain unchanged. No simulator flight was started or user settings changed to produce this manual. Public pages have not been published and release packaging has not been changed.

## Revision .4

Expanded the language guidance with the nine bundled template languages, the Default language control and saved-template precedence. Added French/Spanish flight-number examples and Ava/Emma Multilingual voice guidance. Explained the English wording in FLIGHT_TIME and LOCAL_TIME. Added the maintainer-confirmed statement that Announcement Hangar is an independent, unaffiliated third-party server and its packs come from their authors. Rebuilt both formats; all 20 PDF pages and the HTML checks pass. No new synthesis/listening test was performed.
