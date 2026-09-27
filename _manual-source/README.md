# Maintaining the manual

This directory is the sole authoring source for the new manual. The manual build does not edit existing documentation or site configuration. The maintainer has separately authorised introductory links in the older guides. GitHub Pages ignores this underscore-prefixed authoring directory; `../manual/` contains ready-to-serve static files with no Jekyll front matter or Liquid syntax.

## Build on Windows

Use Node.js 22 or later. From PowerShell in this directory:

```powershell
npm ci
npx playwright install chromium
npm run build
```

The dependencies are pinned in package.json and package-lock.json. Playwright 1.62.1 selects Chromium 151.0.7922.34. Font rendering uses Windows Segoe UI; build on Windows for consistent pagination. A normal build needs no network after dependencies and the browser have been installed.

`npm run check` regenerates/checks the HTML but leaves the PDF alone. Use a full build after any content changes before publishing. `build-report.json` records the browser, missing screenshots, page-height checks and source baseline. Build tools write only within these two new directories and the browser's own cache.

For a Codex bundled runtime, set MANUAL_NODE_MODULES to its Node package directory, and PLAYWRIGHT_BROWSERS_PATH to the matching installed browser cache. These overrides are optional and are not hard-coded into the builder.

## Edit and review

- Edit `manual.md`. Each `<!-- page: id | title -->` starts a new PDF page and creates an HTML section anchor. Keep IDs stable once published.
- Update `metadata.json` with the app version, revision, source commit and review status. The optional status is blank in the current edition, at the maintainer's request. Keep outstanding live checks in QA.md.
- Put screenshots in `screenshots/` using the filenames in `SCREENSHOTS.md`. Do not put blank placeholders or invented UI into the manual.
- Run the build. It fails on duplicate section IDs, broken anchors, missing included images, horizontal overflow or a section taller than the printable page. Do not shrink the whole document merely to fit one long section; shorten or split that section.
- If page count changes, contents numbers are generated from page sections. Verify actual PDF page count matches before delivery.
- All eleven supplied screenshots are included in the 34-page illustrated edition, including twelve reference pages and two compatible API setup pages. Keep original image bytes unchanged. Adjust each screenshot's `printWidthMm` in metadata when reflowing; HTML provides a full-size image link. Do not force a large window into a tiny fixed-height box.
- Inspect every PDF page visually. Confirm readable screenshots, footer spacing and no cropped text. Check a narrow browser window and open the HTML without internet access.
- Keep manual build changes under `_manual-source/` and `manual/`. The introductory notices in generated.md, statemachine.md and howtofiles.md link to the current manual; preserve their existing URLs and reference content. Do not change `_config.yml`.
- When updating the reference appendices, compare flight triggers with AnnouncementStateMachine.cs, placeholders with PlaceholderResolver.cs and SoundFileManager.cs, and tag rules/family mappings with SoundFileManager.cs. For Tweaks, also check ConfigurationManager.cs, SettingsForm.cs/Designer.cs, SimConnectManager.cs, LandingRatingMonitor.cs and toolbar startup in UniversalAnnouncerApp.cs. Recheck the counts and exceptions recorded in SOURCES.md; older guide text can be out of date.

## Deliver and publish

The website entry point is `manual/index.html`; its PDF link is relative. Commit the entire `manual` directory so images and styles accompany it. No homepage link or publishing action is performed by this builder. Publish the new files through the repository's existing Pages process when ready.

For an offline web copy, copy the whole `manual` directory. For the application package, copy only `manual/UniversalAnnouncer-User-Manual.pdf` manually as requested. There is no release-package integration.

## Remaining review

See `SCREENSHOTS.md` for the completed capture inventory and remaining live checks. See `SOURCES.md` for verified code behavior and limitations of external research. `QA.md` records checks performed on the illustrated review build.
