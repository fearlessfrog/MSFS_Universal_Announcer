# Universal Announcer

![Universal Announcer Logo](images/logo.jpg)

Plays Fenix A320 compatible Cabin Announcements on any aircraft in Microsoft Flight Simulator.

Universal Announcer automatically detects your flight state and plays realistic cabin announcements based on your aircraft's conditions - boarding music, safety briefings, takeoff announcements, and more. Originally designed around the Fenix A320 sound files, it works with any aircraft in MSFS.

You do not need the Fenix A320 for this to work (although you should have it, it's great).

## ✈️ Features
- Automatic Flight State Detection: Monitors aircraft lights, engines, altitude, and ground status
- Airline-Specific Announcements: Supports airline folders (UAL, ACA, BAW, DAL, etc.)
- Aircraft Type Variants: Plays different announcements for A319, A320, A321, 737, etc.
- Time-Based Variants: Morning, afternoon, evening, and night announcements
- System Tray Integration: Minimal interface with volume control and flight state override
- Navigraph simbrief integration: Uses your last plan's Airline and Aircraft type (ICAO code is used).
- GSX Pro integration: Uses the Boarding, Deboarding and Refueling states automatically.
- (NEW!) Sound volume based on camera (WIP).
- (NEW!) Basic Seat Belt support (WIP).

This app follows the announcements detailed here:

https://support.fenixsim.com/hc/en-us/articles/12374580682383-Cabin-Announcements-Guide

## 🎵 Sound Files

⚠️ IMPORTANT: No sound files are included with this application. This application does not include any copyright sound files.

You can obtain compatible sound files from:

1. Fenix A320 Installation: If you own the Fenix A320, the sound files are already installed
2. Cabin Announcements Discord: join the [Cabin Announcements for Fenix](https://discord.com/invite/P8ZYJgH3ZF) Discord server for community-created sound files
3. Make You Own: Get your tray tables in an upright position and get recording, it's just plain sound files (see [here](https://support.fenixsim.com/hc/en-us/articles/12374580682383-Cabin-Announcements-Guide) for specs)

If you don't own the Fenix then it is worth considering taking one of the Cabin Announcement packs from Discord and dropping them in a folder Announcements\Default, so they can be used with or without any airline code as a fallback.

## 📋 System Requirements
Operating System: Windows 10 or Windows 11
Flight Simulator: Microsoft Flight Simulator 2020 (MSFS 2024 should work but untested, let me know)
Runtime: .NET 8 (included with Windows by default)
Sound Files: Compatible announcement files (see above)

## 📦 Installation
Extract: Unzip the downloaded file to any directory (e.g., D:\FunStuff\Universal Announcer\)
Run: Double-click UniversalAnnouncer.exe to start the application
The application will appear in your system tray and automatically try to locate your sound files.

## 🔧 Setup
First Launch

Run the application - It will appear in your system tray
Configure sound files path - The app will try to auto-detect your Fenix installation location, or you can browse to your sound files folder. If you don't have that, just create an Announcements folder somewhere, put a Default folder in it, and in that put a .ogg sound file.
Set up you simbrief username in the Settings / Integrations tab and fetch a plan.

You can also probably include this in your MSFS exe.xml eventually for automatic startup, although I haven't tried that yet. There are still bugs in start-up detections, so use Flight Status / Stop if annoying (you can Resume when ready).

## 🔧 Configuration

Set up your Simbrief username in the Settings / Integrations tab to fetch your last plan automatically.

The following step is an alternative to using the Navigraph simbrief plan support:

For airline-specific announcements, set your Call sign in MSFS:

In MSFS 2020 (similar names in MSFS 2024), go to World Map → Aircraft Selection → Customization (tab)
Set Call sign to your airline code (e.g., UAL, ACA, BAW, DAL just the letters alone are used, so ok to put UAL123)
The app will automatically detect your aircraft type (737, CRJ900, A320, etc.)
Remember to do it when setting a Livery!

Sound File Structure
Your sound files should be organized like this:

```
Announcements/
├── Default/           # Fallback announcements
├── UAL/              # United Airlines
├── ACA/              # Air Canada
├── BAW/              # British Airways
└── DAL/              # Delta Airlines
```

 Each folder contains files like:

- BoardingWelcome.ogg
- BoardingWelcome[CRJ9].ogg (aircraft-specific)
- BoardingWelcome[Morning][B738].ogg (time-specific and aircraft specific)

SafetyBriefing[1].ogg (you can have multiple sets and it'll pick at random)
AfterTakeoff.ogg[A359][2].ogg (tags can be combined)
And many more as per Fenix structure in the link above...

## 🎮 Usage

⚠️ IMPORTANT: If you are NOT using GSX, DISABLE IT and to start the sequence use the Logo Light to on to indicate passengers are now boarding.

If you're curious on what does what when, check out these rules, although these will get updated based on user feedback over time:

https://github.com/fearlessfrog/MSFS_Universal_Announcer/blob/main/statemachine.md

(updated above link for new simbrief and GSX integration info)

System Tray Menu:

Right-click the system tray icon to access:

Flight State: Override automatic detection or restart the sequence
Stop/Resume: Pause/resume all announcements
Audio Device: Select your preferred audio output
Volume: Adjust announcement volume
Settings: Configure sound paths and announcement types
About: Version information and pretty picture

🔧 Configuration

Announcement Types

Enable/disable specific announcements:

Boarding Welcome & Music
Safety Briefing
Takeoff Announcements
Landing Announcements
And more...

Audio Settings

Device Selection: Choose your preferred audio output
Volume Control: Adjust from 10% to 100%
Fallback Options: Use Default folder if airline-specific files are missing

## 🐛 Troubleshooting
FAQ and Common Issues:

I can't find the app and it says it is running!: Check your windows System Tray, it is hiding in there.
Nothing is happening: If not using GSX then turn that feature off (Settings/Integrations) and use the LOGO LIGHT to ON to indicate the passengers are boarding.
No sound playing: Check your sound files path in Settings or use Sounds 'Preview' to check them.
Wrong airline: Check your last simbrief generated plan or set your MSFS Callsign in the sim to the correct airline code, e.g. 'UAL123' for United (matches folder names).
No Seat Belt triggered sounds playing: Still working on it, some default aircraft work.
Audio device issues: Select your correct audio device in Settings
Boarding but no musac!: Again :) use the Logo On light to trigger the boarding manually.

## Settings & Log Files

Settings and logs are saved to: %APPDATA%\UniversalAnnouncer\. 

## 🤝 Support & Feedback

This is an initial release that I use myself. While there's no formal support, I'm interested in feedback and bug reports.

Thank you to those that bought me a coffee and to keep all this free - I'm now highly caffeinated!

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/fearlessfrog)

**Happy Flying!** ✈️

## 📜 Compatibility
- MSFS 2020: Fully tested and supported
- MSFS 2024: Should work but a little untested, let me know in the issues please.
- Other Addons: Compatible with most aircraft addons
- SimConnect: Uses standard MSFS SimConnect interface

## ⚖️ License & Disclaimer

This free software is provided "as is" without warranty. No copyrighted sound files included - users must obtain compatible files separately. For educational/entertainment purposes only. Users are responsible for compliance and assume all risks.

This app is in no way associated, approved or condoned by FenixSim Ltd, Navigraph or FSDreamTeam.