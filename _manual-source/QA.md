# Manual verification

Current edition: revision **2026-10-04.1**, application **1.0.0.0**. See [current revision checks](#revision-2026-10-041) below. The baseline summary that follows records revision 2026-09-27.2, application 0.9.9.8, source commit `6e521c7498eef05658cc0b4d435f512d0ce81fb9`.

## Passed

- Built matching HTML and PDF from the same Markdown with Marked 17.0.5 and Playwright 1.62.1 / Chromium 151.0.7922.34.
- PDF: 34 A4 pages, searchable text, tagged structure, outline/bookmarks and 98 link annotations. Text extraction found every expected heading and the correct version/page footer on every page, with no em dashes or replacement characters.
- All eleven supplied screenshots are embedded. Original source and output asset image hashes match exactly.
- Every page of the final PDF was rendered with Poppler and visually inspected. No clipped text, broken code blocks, overlaps or footer collisions were found. Sound setup and camera rules have separate pages to make room for the images.
- Printed contents page numbers match the 34 sections. Every section fits the printable height.
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
- Local or hosted OpenAI-compatible API synthesis, listening, typed voices and role assignments. These instructions were checked against the named source commit; no live server was contacted.
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

## Revision 2026-09-27.1

Added sections 16a and 16b on connecting an existing local TTS server and using compatible API voices, hosted services and troubleshooting. Covered the four provider settings, server-specific model/voice IDs, typed role voices, explicit provider directives, WAV requirements, ignored rate/pitch and five-minute synthesis timeout. Cross-linked the first-generation guide, provider overview, voice guidance, template reference and support page. Existing Edge examples are labelled. Existing section IDs and chapter numbers remain stable; the new sections are local-tts and compatible-api-voices on pages 18 and 19.

Built with the existing pinned Marked/Playwright versions, Node 24.19.0 and Chromium 151.0.7922.34 on Windows. Dependencies came from the installed runtime; the matching headless browser was downloaded into the ignored .qa directory. No builder or stylesheet changes were needed. Shortened surrounding prose to keep the existing font size and screenshot dimensions.

All 34 PDF pages were rendered with Poppler and visually inspected, with separate full-page checks of both additions. Programmatic checks verified every heading/footer, all printed contents page numbers, revision, bookmarks, tagged structure and 94 link annotations. All eleven screenshot source/output SHA-256 hashes match. Offline build checks passed at 390px and 1280px. Local HTTP checks passed at the published path prefix for both new contents links, all full-size image links and a byte-identical PDF download, with no browser errors. Desktop/mobile layouts were inspected. Source and QA records were updated; no public publishing, application changes, legacy-guide edits or release packaging occurred.

## Revision 2026-09-27.2

Rebuilt with the maintainer's replacement 08-roles.png. It shows BAW/Edge with Ryan as Pilot and Brian as Flight Attendant; updated the caption and accompanying prose. Preserved the supplied image bytes and its 120 mm print width, shortening surrounding wording to accommodate its taller proportions.

Added linked Qwen3-TTS, Kokoro-82M and Chatterbox examples to local TTS setup, distinguishing models from the required API server. Linked Qwen3 Audio API and Kokoro-FastAPI as server examples and pointed readers to server setup/hardware requirements. Verified primary project documentation; no live compatibility or audio test was performed.

The full build and offline checks passed. PDF remains 34 pages with 98 link annotations; every heading/footer, contents page number, revision, bookmark/tagged structure and all screenshot source/output hashes passed verification. Rendered all pages; PNG hashes confirm 31 pages are pixel-identical to the previously inspected edition. Visually inspected the three changed pages (cover, roles, local TTS) and desktop/mobile local TTS layouts. HTTP navigation, full-size images and byte-identical PDF download checks passed without browser errors. No application, legacy-guide or publishing changes.

## Revision 2026-10-04.1

Updated the edition to release 1.0.0.0. Added a route introduction in Choose the right recordings, a C1 filename-tag entry, route scores in C2 and the dedicated C3 Route Tags page with all supplied rules and examples. Corrected the nearby obsolete family-tag fallthrough warnings against the release source. Other sections retain their recorded research baselines; no full application re-audit was performed.

- Full Windows build passed with Node 24.19.0, Marked 17.0.5, Playwright 1.62.1 and Chromium 151.0.7922.34. All 35 sections fit the printable height; existing font sizes and screenshot dimensions were retained.
- PDF: 35 A4 pages, 105 link annotations, searchable route examples, tagged structure and bookmarks including Route Tags. Verified every heading, version/footer, printed contents page number and revision. Existing section anchors and order are preserved.
- Rendered all 35 pages with Poppler and visually inspected all nine contact sheets, with a full-page inspection of C3. No clipping, overlaps or footer collisions were found. After excluding changed version/page-count footers, all 29 unaffected page bodies are pixel-identical to the preceding edition.
- All eleven source and output screenshot SHA-256 hashes match; original asset bytes are unchanged. Updated the screenshot inventory's Tweaks page number to 33.
- Offline HTML checks passed at 390px and 1280px. Local HTTP checks passed for all 34 contents links, route guidance, all eleven full-size image links and a byte-identical PDF download, without browser errors. Visually inspected the revised main chapter and appendices on mobile and C3 on desktop.
- Documentation diff checks passed with CRLF treated as the existing line-ending convention. Changes are confined to manual source/maintenance records and generated HTML/PDF/build report; existing unrelated workspace changes are preserved.

No simulator, playback or synthesis tests were performed for this documentation update. Nothing was published or added to release packaging. Verification scripts, screenshots and before/after copies are retained only in the ignored `.qa/route-tags-2026-10-04/` directory.
