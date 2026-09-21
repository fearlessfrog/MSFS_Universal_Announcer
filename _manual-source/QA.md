# Manual verification

Revision 2026-09-20.8, application 0.9.9.7.

## Passed

- Built matching HTML and PDF from the same Markdown with Marked 17.0.5 and Playwright 1.62.1 / Chromium 151.0.7922.34.
- PDF: 32 A4 pages, searchable text, tagged structure, outline/bookmarks and 80 link annotations. Text extraction found content and the correct footer on every page, with no em dashes or broken separator characters.
- All eleven supplied screenshots are embedded. Original source and output asset image hashes match exactly.
- Every page of the final PDF was rendered with Poppler and visually inspected. No clipped text, broken code blocks, overlaps or footer collisions were found. Sound setup and camera rules have separate pages to make room for the images.
- Printed contents page numbers match the 32 sections. Every section fits the printable height.
- HTML: all internal links resolve, all eleven images load, and no horizontal overflow occurs at 390px and 1280px. Each image has a full-size link.
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

All screenshot requests are complete. The application files remain unchanged. The older generated, flight-state and sound-file guides now have introductory links to the current manual, as requested; their existing content and URLs are preserved. No simulator flight was started or user settings changed to produce this manual. Public pages have not been published and release packaging has not been changed.

## Revision .4

Expanded the language guidance with the nine bundled template languages, the Default language control and saved-template precedence. Added French/Spanish flight-number examples and Ava/Emma Multilingual voice guidance. Explained the English wording in FLIGHT_TIME and LOCAL_TIME. Added the maintainer-confirmed statement that Announcement Hangar is an independent, unaffiliated third-party server and its packs come from their authors. Rebuilt both formats; all 20 PDF pages and the HTML checks pass. No new synthesis/listening test was performed.

## Revision .5

Added concrete filename troubleshooting: remove an unexpected 1- prefix, and convert MP3 recordings to OGG rather than only renaming the extension. Source matching in SoundFileManager uses announcement-name prefixes and .ogg files. Simplified the Synaptic A220 workaround to appropriate use of Play Next and removed the outdated PMDG note at the maintainer's request. Rebuilt both formats, checked the revised cover and FAQ page, and repeated the PDF structure and HTML checks. The document remains 20 pages with ten screenshots.

Added the maintainer-supplied Fenix double-announcement FAQ. Tightened neighbouring wording to preserve the 20-page layout and visually rechecked the final FAQ page.

## Revision .6

Added a two-column diagram above Choose how generation is used. The existing section text is unchanged. It distinguishes saved .ogg files reused offline from recordings refreshed with each flight's details. The diagram uses searchable HTML text and CSS, with no external runtime or image dependency; its columns stack on narrow screens. Visually checked the PDF cover and page 17 and desktop/mobile diagrams. PDF remains 20 pages with ten screenshots and 43 links; offline and HTTP checks pass.

## Revision .7

Added nine reference pages covering all 23 announcement types, auxiliary sounds, all 40 named placeholders, template syntax, supported filename tags, selection scores and all 29 aircraft-family helpers (114 mapped aircraft codes). The reference tables were checked against the current source; family rows and placeholder coverage were also checked programmatically. Earlier chapters link to the new stable anchors. Simplified the filename placement example.

The PDF has 29 pages and 80 link annotations, with ten unchanged screenshots. Rendered and inspected every PDF page, including the final numeric-family note. Checked all page headings and footers, revision, searchable text, bookmarks and tagged structure. The contents uses two columns to accommodate the appendices. Offline and local HTTP checks passed, including reference navigation, images, PDF download and desktop/mobile layouts. Added notices to generated.md, statemachine.md and howtofiles.md without rewriting their older content. No publishing or release-package changes were made.

## Revision .8

Added three Tweaks reference pages and the supplied screenshot, bringing the manual to 32 pages and eleven screenshots. Checked all 19 controls against the English UI and source: defaults, numeric ranges where given, trigger dependencies, music restart/resume, immediate-save controls, light overrides, toolbar restart and the AND/OR rules for landing reactions. The PMDG availability note comes from the maintainer, not a new simulator test.

Rendered and visually inspected all 32 PDF pages, with detailed checks of the contents and three new pages. PDF checks passed for every heading/footer, searchable text, revision, bookmarks, tagged structure, eleven images and 80 link annotations. Original screenshot bytes match output assets, including the new attachment. Offline checks passed at 390px and 1280px. Local HTTP checks passed for all new contents anchors, image loading, full-size image links and PDF download; desktop and mobile layouts were inspected. Existing source-coverage checks still pass for the placeholder and aircraft tables. No application code or old guide pages changed in this update.
