# Research and verification ledger

Reviewed 20 September 2026. Application baseline: UniversalAnnouncer 0.9.9.7, commit `5b55c0b1bebf5a45d4ecfc9d1026025c570fe8f7` in `D:\code\UniversalAnnouncer`. The source checkout was clean when its baseline was recorded. Source code takes precedence over comments within that code and older Markdown guides.

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

- https://flightsim.to/addon/94886/universal-announcer : publicly visible recent comments and maintainer replies informed questions about default aircraft, A20N versus [320], language/arrival tags, camera volume, seatbelts and the Synaptic A220 engine-signal workaround. The listing also gives the 0.9.9.7 ChasePlane note. This was a sample, not an audit of all 893 comments. A request for an older comments page did not return readable content. The A220 note is explicitly dated and must be rechecked before future editions.
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