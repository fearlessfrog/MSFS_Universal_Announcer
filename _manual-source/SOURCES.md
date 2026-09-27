# Research and verification ledger

Current edition: 27 September 2026, UniversalAnnouncer 0.9.9.8, commit `6e521c7498eef05658cc0b4d435f512d0ce81fb9` in `D:\code\UniversalAnnouncer`. The compatible API update below was checked against committed source; the checkout's uncommitted help-link and label changes were excluded. Earlier research used 0.9.9.7, commit `5b55c0b1bebf5a45d4ecfc9d1026025c570fe8f7`, on 20 September, when that checkout was clean. Source code takes precedence over comments within that code and older Markdown guides.

This is a maintainer document, not part of the user manual.

## Source checks

- **Installation/runtime:** UniversalAnnouncer.csproj targets net8.0-windows/x64. scripts/New-ReleasePackage.ps1 publishes self-contained. Therefore the normal package includes the runtime; the old help's claim that .NET 8 is included with Windows is not repeated. No claim that users must install the developer SDK.
- **UI labels:** Strings.resx, SettingsForm.cs, SettingsForm.Designer.cs and CameraViewVolumeDialog.cs. The manual uses current English control names. The ten supplied screenshots confirm the pictured labels, including Mute in the camera rule grid and the Generated tab's Voice: (Set in Roles) state.
- **Setup and sound selection:** FirstTimeDialog.cs, DefaultPackInstaller.cs, SoundFileManager.cs and the UI. A selected root contains Default and airline folders; generation takes place before Default fallback when no airline sound matches. A muted matching airline recording overrides generation.
- **Flight sequence:** AnnouncementStateMachine.cs, especially boarding checks around lines 1140-1530, AfterTakeoff around 2079, AfterLanding around 2250, ResetFlightState around 426 and ForcePlayNext around 3223. The source uses groundspeed below 15 knots for AfterLanding, together with recognized arrival conditions. Outdated prose/comments mention spoilers or 25 knots; those are not used in the manual. Play Next interrupts playback, deactivates boarding music and bypasses cooldowns with the last received flight data. Manual phases mark earlier announcements played.
- **Stop and resume:** UniversalAnnouncerApp.cs, StopAnnouncements/ResumeAnnouncements and HandleStopResume. The manual does not promise sample-accurate recording resume.
- **SimBrief:** SimBriefClient.cs, SoundFileManager.cs and Strings.resx. Username, not numeric pilot ID; verify the last generated plan and returned airline/aircraft/route. Session overrides need explicit checking. The manual avoids asserting that imported airline alone always wins over callsign handling.
- **Generated text:** SettingsForm.cs SaveTemplateToPath around 1692, GenerateCurrentTemplate around 1723, RevertCurrentTemplateOverride around 2133, TestVoiceButton_Click around 2490. Saving uses the selected airline, including Default. Manual Generate rejects Default. Revert deletes an airline override when present, otherwise can delete Default. These are corrections to older generated.md instructions.
- **Generation and voice priority:** SoundFileManager.cs TryGenerateTtsIfConfigured around 480-850, ConfigurationManager.cs GetRoleVoice. Airline text, then Default text, then built-in seeding. Explicit Voice precedes Role; airline role precedes Default role, then main voice. Missing role can fall back to FA. Runtime generation has guards, so the guide deliberately avoids claiming every text/voice change immediately regenerates all audio.
- **Placeholders:** SoundFileManager.cs around 1180-1220 supplies name/code/place context; PlaceholderResolver.cs handles flight number, flight time, simulator local time and cruise altitude. Examples use supported uppercase tokens. Unknown values are not invented or translated automatically.
- **Edge:** Tts/EdgeTtsProvider.cs names Aria, Jenny, Sonia and Ryan in its catalog fallback; ConfigurationManager.cs defaults to Ava Multilingual. A live request to the public Edge voice-list endpoint on 20 September returned 322 entries and confirmed all five exact IDs used in the manual. The request used the same endpoint and signing algorithm as the source. Catalog availability does not prove successful live synthesis or voice quality. Candidate suggestions remain subject to the requested audition.
- **Camera:** AudioManager.cs CalculateCameraVolume around 1370-1520, CameraViewClassifier.cs, CameraViewVolumeDialog.cs. Volume is base volume times category multiplier. Recognized ChasePlane views bypass ordinary per-view rules. Cockpit-door override is GSX-dependent and does not apply to that ChasePlane override path. Unknown camera categories can be silent.
- **ChasePlane:** ChasePlaneBridgeClient.cs, ChasePlanePresetCatalog.cs and SimConnectManager.cs. Bridge/preferences requirement supported by source. The supplied screenshot confirms General Functionality > Enable 3rd party plugins. Live view mapping still needs a simulator test.
- **Toolbar:** Read `D:\code\UniversalAnnouncerToolbar\static\html_ui\InGamePanels\universalannouncer_toolbar\universalannouncer_toolbar.html` and companion JS, plus ToolbarWebSocketServer.cs/UniversalAnnouncerApp.cs. The initial static panel uses Seatbelts and Reset Flight, but ToolbarProtocol.cs supplies localized labels (buttonResetFlight = Strings.Btn_Restart and buttonSeatbelt = Strings.Btn_Seatbelt). The supplied connected panel confirms Play Next, Seatbelt, Settings... and Restart; the manual uses those visible labels.
- **Debug mode:** SettingsForm.cs LogoPictureBox_Click around 3195 uses three clicks, with a two-second inter-click window. Old debugmode.md says four. The manual uses three and avoids claiming that config/log files contain no personal information.

## Existing documentation used as research

Read local README.md, generated.md, howtofiles.md, statemachine.md and debugmode.md. Existing public URLs remain untouched:

- https://fearlessfrog.github.io/MSFS_Universal_Announcer/
- https://fearlessfrog.github.io/MSFS_Universal_Announcer/generated.html
- https://fearlessfrog.github.io/MSFS_Universal_Announcer/statemachine.html
- https://fearlessfrog.github.io/MSFS_Universal_Announcer/debugmode.html
- https://fearlessfrog.github.io/MSFS_Universal_Announcer/viruscheckers.html

All tutorial prose was written for this manual rather than copied wholesale. The public reference links are for extra detail; their old trigger/default descriptions are not treated as authoritative.

## External research and limits

- https://flightsim.to/addon/94886/universal-announcer : publicly visible recent comments and maintainer replies informed questions about default aircraft, A20N versus [320], language/arrival tags, camera volume, seatbelts and the Synaptic A220 engine-signal workaround. The listing also gives the 0.9.9.7 ChasePlane note. This was a sample, not an audit of all 893 comments. A request for an older comments page did not return readable content. Revision .5 simplifies the A220 note at the maintainer's request and removes the resolved PMDG reference. Recheck aircraft behavior before future editions.
- https://discord.com/invite/P8ZYJgH3ZF : invitation taken from the project's existing README. Public fetch could not confirm server membership flow or channel names. No private channels were accessed. The maintainer subsequently confirmed that both the Fenix and Universal Announcer pack channels supply compatible packs. Revision 2026-09-20.2 adds that clarification to setup and the FAQ. Revision 2026-09-20.3 uses the supplied screenshot to confirm the server display name Announcement Hangar and categories FENIX ANNOUNCEMENT PACKS and UNIVERSAL ANNOUNCEMENT PACKS. The screenshot does not verify the public invitation or new-member onboarding.
- https://github.com/rany2/edge-tts : primary project referenced by the app's provider. Confirms online read-aloud service, no personal API-key requirement, voice catalog and rate/pitch controls. No guarantee of availability is inferred.
- https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts : official voice reference inspected for context. Azure availability is not used as proof of Edge availability.

## Not yet verified live

1. New-install walkthrough and real output device.
2. A complete GSX flight sequence and a complete logo-light sequence.
3. Native quickview volume rules and ChasePlane view mapping on the user's aircraft/version.
4. Successful live Edge synthesis and listening comparison of the suggested voices.
5. Discord invitation acceptance and new-member onboarding. The screenshot confirms both pack categories and their pack channels.
6. The exact toolbar files included in the user's current release ZIP.

The maintainer requested removal of the cover review status in revision .4. The live checks above remain unverified; source inspection is not a claim of live simulator testing.

## Multilingual update, revision 2026-09-20.4

- EmbeddedTemplates.ReadTemplateText uses CurrentUICulture with neutral/English fallback. TemplateStrings resources include English, French, Spanish, German, Italian, Brazilian Portuguese, Japanese, Korean and Simplified Chinese.
- SettingsForm's Help & About language dropdown and Strings.About_DefaultLanguageLabel confirm Default language; Program.cs applies it on restart. LoadSelectedTemplateIntoEditor checks airline and Default text before embedded resources. A language change does not translate saved overrides.
- PlaceholderResolver.BuildPlaceholders passes FLIGHT_NUMBER_DIGITS as digits extracted from the callsign. Pronunciation is supplied by the voice and surrounding text. FormatDurationSpoken and FormatLocalTimeSpoken currently emit English wording, so the manual distinguishes these from numeric placeholders.
- The maintainer reports that multilingual neural voices work well for French and Spanish. The supplied Generated screenshot shows en-US-EmmaMultilingualNeural; ConfigurationManager defaults to en-US-AvaMultilingualNeural. Microsoft's [voice-language reference](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts) was checked for multilingual voice naming. Azure's catalog is not a guarantee of availability through Edge. No new audio was synthesized or auditioned in this update.
- The maintainer confirms Announcement Hangar is an independent third-party server, not owned, operated or affiliated with Universal Announcer, and its packs are supplied by their authors.

## Filename and aircraft FAQ update, revision 2026-09-20.5

SoundFileManager.cs searches for announcement-name-prefixed .ogg files (including the matching routines around lines 1379 and 1562). A 1- prefix prevents BoardingWelcome matching, and .mp3 is outside that search. Preview does not prove that the automatic sequence will recognise a filename. The maintainer supplied the common preview example and confirmed that the PMDG issue no longer needs a workaround. The A220 prose describes unreliable signals and Play Next without making an unsupported claim about most other MSFS apps.

The maintainer also supplied the Fenix double-announcement fix: disable native calls through the EFB or radio-panel PA knob, or stop Universal Announcer to keep the Fenix calls. The FAQ uses this guidance; no Fenix cockpit interaction was performed during editing.

## Reference appendices, revision 2026-09-20.7

- **Coverage:** Models/AnnouncementType.cs lists 23 announcement types. Appendix A covers every type, the percentage-based CruiseElapsed filenames and the auxiliary LandingGreat, LandingTerrible and CabinNoise recordings. Appendix B covers all 40 named keys from PlaceholderResolver.BuildPlaceholders and SoundFileManager's common dictionary. Appendix D reproduces every entry in SoundFileManager._icaoToFamilyMap: 29 helpers and 114 aircraft codes.
- **Current flight rules:** AnnouncementStateMachine.cs is authoritative over stale comments and statemachine.md. TopOfDescentPilot uses a 30-second cruise-band requirement and 25% elapsed planned air time, not the older guide's two minutes and 50%. AfterLanding uses below 15 knots and recognised landing state, not spoiler position. Landing reaction defaults are 200 ft/min and 1.2g for great, 800 ft/min or 1.6g for terrible, as set in ConfigurationManager.cs.
- **Cruise milestones:** The current path checks Cruise/Descent/Approach after AfterTakeoff, polls about once a minute and compares simulator elapsed air time to SimBrief planned duration. Short-flight offsets are 12, 14, 18 or 22 percentage points. Milestones at or above 40% are guarded below 10,000 ft AGL or below -500 ft/min vertical speed. Selection favours the highest eligible available milestone; Cruise.ogg aliases 50%.
- **Template limits:** PlaceholderResolver processes XML values, then a single regex pass of IF blocks, then ordinary named values. IF stops at END, newline or end of text; multi-line/nested examples in generated.md are not reliable in the current implementation. Conditions check non-empty and not exactly 0. xml_number formats a rounded integer with grouping, not English number words. Delay/status values compare computer UTC to the plan, while LOCAL_TIME uses simulator time. Weather is derived from the supplied plan METAR, not a live request.
- **Tags and scoring:** SoundFileManager.EvaluateTagMatch adds tag scores (200 refueling, 100 exact aircraft or ARR/DEP airport, 95 wildcard airport, 80 family, 75 unqualified airport, 50 time, 10 variant). ARR/DEP airport patterns require 3 or 4 alphanumeric/# characters. # means zero or more characters; * is not supported. Multiple ARR/DEP airport tags are alternatives. A short alphabetic family helper such as CRJ can be parsed as an airport alternative in that context. Numeric family helpers can fall through to the numbered-variant match when the family does not match; the manual explicitly records this limitation. No application behavior was changed.
- **Airport context:** GetRelevantIcaoCode uses origin for the departure calls listed in Appendix C, but destination for the remaining types, including DepartureDelayed. Cabin noise uses BoardingMusic's origin context. This exception is recorded rather than assuming all preflight calls use origin.
- **Older guides:** The maintainer authorised short notices near the beginning of generated.md, statemachine.md and howtofiles.md. These link to the new instructions and appendices, identify the older content as reference material and preserve the original remainder of each file.

These additions were verified by source inspection and document/browser checks. They do not close the live simulator and synthesis checks listed above.

## Tweaks reference, revision 2026-09-20.8

- ConfigurationManager.Configuration supplies defaults: boarding interval 5 min; takeoff/crew landing 3,000 ft AGL; descent 10,000 ft AGL; departure delay 10 min; AfterLanding delay 0; music resume and landing-light takeoff selection on; boarding-music fallback, skip-first, auto-arm, PMDG SDK, ignore-lights and landing reactions off; toolbar on. Landing limits are 200 fpm/1.2g and 800 fpm/1.6g. The screenshot shows saved user choices, not new-install defaults.
- SettingsForm.Designer.cs sets numeric control ranges; SettingsForm.UpdateDescentAltitudeMinimum keeps descent height at least equal to crew landing height. ApplySettings saves timing/music controls. PMDG, ignore-lights, toolbar, landing reactions and landing thresholds also have immediate-save handlers, so Cancel is not a universal rollback.
- AnnouncementStateMachine checks confirm AGL thresholds are announcement conditions, welcome cadence runs from completion, skip-first still allows later welcomes, and automatic ArmDoors uses 30 seconds after BoardingComplete completion with the normal engine/movement trigger able to supersede it. AfterLanding delay starts when the normal trigger qualifies, not at touchdown. Music resumes after automatic interruptions when enabled and otherwise restarts; the manual FastenSeatbelt overlay resumes regardless of that setting.
- SoundFileManager.GetSoundFile applies the optional BoardingMusic fallback only after normal AfterLandingMusic lookup/generation and enabled Default lookup fail.
- SimConnectManager.OnRecvSimobjectData and the corresponding by-type handler force beacon/logo/landing/strobe states off for IgnoreIncompatibleAircraftLights. Custom L-var overrides are applied afterward and may force individual states on. This does not remove downstream light requirements or change actual aircraft switches.
- PMDG SDK data still subscribes to the PMDG 777X client-data structure and substitutes light states when available. The maintainer explicitly confirms it is no longer needed for current PMDG aircraft and is retained for future PMDG aircraft betas. The manual records that guidance without claiming a new PMDG beta test or promising automatic support for future aircraft.
- UniversalAnnouncerApp starts the toolbar server according to EnableMsfsToolbar during startup, so the reference tells users to restart the app after changing it. It does not install the Community panel.
- LandingRatingMonitor rates absolute last-airborne vertical speed and tracked peak G-force, with a 500 ms delay after touchdown to capture impact. Great requires both limits; terrible requires either and is checked after great. Other ratings are silent. Guards include a recognised in-flight view, running engines, at least 50 knots and a 10-second cooldown after a reaction. Custom matching reaction files precede embedded audio, and camera volumes apply.

The new screenshot was saved without alteration as screenshots/11-tweaks.png. No credentials are visible. This update does not close the remaining live simulator checks.

## OpenAI-compatible API, revision 2026-09-27.1

- **Baseline:** the named commit adds the provider and sets VersionPrefix to 0.9.9.8. Read committed SettingsForm.cs, Strings.resx and voice-token parsing with `git show`; the provider, factory, RolesDialog and tests are unchanged in the working checkout. No application files were edited. The preceding flight-trigger and Tweaks references retain their explicitly stated 0.9.9.7 research baseline.
- **Connection and defaults:** Tts/OpenAiCompatibleTtsProvider.cs defines the exact provider name, localhost API base `http://127.0.0.1:8880/v1`, model `tts-1`, voice `Ryan` and 300-second synthesis timeout. The app appends `audio/speech`, sends model/input/voice/response_format=wav and optional Bearer authentication, checks the RIFF/WAVE header, and converts the result through the existing OGG path. Rate and pitch arguments are not included in the request. These defaults are not a guarantee that a server supports a particular model or voice.
- **UI and discovery:** SettingsForm uses API Base URL, API Key (optional), Model and Voice; model and voice controls are editable. Base URL, key and model changes schedule discovery. The provider tries several voice-list routes and can return an empty list; manual IDs remain usable. It returns the configured model for third-party servers rather than promising a discovered model catalog.
- **Roles and directives:** RolesDialog permits typed Pilot and Flight Attendant IDs for the compatible provider and retains saved IDs absent from discovery. SoundFileManager.TryParseVoiceToken splits the provider/voice on the first slash, supporting `##Voice: OpenAI-compatible API/Ryan`. Existing explicit-voice, airline/Default-role and main-voice precedence applies. The manual recommends manual assignments for predictable server-specific voices.
- **Local and hosted use:** both use the same configured provider. Local installation and model startup belong to the server, while hosted authentication, accepted models, voices and usage terms belong to the service. The manual describes the speech/WAV contract without endorsing a particular server or promising chat-API compatibility. Saved recordings are normal local OGG files.
- **Verification limits:** inspected OpenAiCompatibleTtsProviderTests for URL construction, discovery, caching, authentication, payload, invalid WAV and cancellation behavior, plus SoundFileManagerTtsTests for the timeout path. Tests were read, not executed, for this documentation-only change. No local/hosted synthesis, listening test, model installation, service billing request or simulator flight was performed.

## Local model examples and replacement screenshot, revision 2026-09-27.2

Primary project documentation checked on 27 September 2026:

- [Qwen3-TTS](https://github.com/QwenLM/Qwen3-TTS): official Qwen speech-model repository and local inference instructions. Linked as a model family, not a ready-made compatible API endpoint.
- [Qwen3 Audio API Python server](https://github.com/second-state/qwen3_audio_api/tree/main/python): documents `/v1/audio/speech`, model/input/voice parameters, WAV output and preset voices through CustomVoice models. Linked as a separate server example, without claiming it has been tested in Universal Announcer.
- [Kokoro-FastAPI](https://github.com/remsky/Kokoro-FastAPI): maintainer's wrapper for Kokoro-82M; documents an OpenAI-compatible speech endpoint, WAV output and deployment/hardware choices.
- [Chatterbox](https://github.com/resemble-ai/chatterbox): official model repository and local inference instructions. Listed as another model to explore, with the surrounding requirement for a compatible API server; no specific Chatterbox wrapper or tested compatibility is claimed.

The maintainer supplied a new Roles screenshot showing BAW, Edge, en-GB-RyanNeural and en-US-BrianNeural. Caption and prose follow the image. No new voice-catalog request or listening test was made; the older catalog check does not validate Brian's current availability.
