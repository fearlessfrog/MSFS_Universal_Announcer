# How Detection of Flight State Works

This is a snapshot of v0.3.3 transitions, so it might evolve. It should answer most questions on 'what fires when'.

## State Transition Table

| File to Play | Flight State | SimVars to Check | Timing Logic |
|--------------|--------------|------------------|--------------|
| BoardingWelcome | Ground Pre-boarding | **GSX Mode**: `IsOnGround=True` AND `IsGSXBoardingInProgress=True` AND `IsBeaconOn=False` <br>**Traditional Mode**: `IsOnGround=True` AND `IsLogoLightOn=True` AND `IsBeaconOn=False` | Play once when GSX boarding starts OR logo light first turns on, then repeat every X minutes (configurable, default 5) until BoardingComplete |
| BoardingMusic | Boarding Active | `BoardingWelcome` played AND `BoardingComplete` not played | Loop continuously until BoardingComplete or next BoardingWelcome |
| BoardingComplete | Boarding Complete | `IsBeaconOn=True` AND `IsOnGround=True` **OR** `GSX Boarding complete` (when GSX enabled) | Play once when beacon first turned on **OR** GSX boarding completed (whichever happens first) |
| ArmDoors | Departure Preparation | `IsOnGround=True` AND (`IsEngineRunning=True` OR `GroundSpeed > 1`) | Play once when engines start or aircraft begins moving |
| PreSafetyBriefing | Pre-departure Briefing | `ArmDoors` played AND `IsEngineRunning=True` | **Wait for ArmDoors to finish playing** |
| SafetyBriefing | Safety Briefing | `PreSafetyBriefing` played | **Wait for PreSafetyBriefing to finish playing** |
| CabinDimTakeoff | Cabin Preparation | `SafetyBriefing` played AND `IsDaylight=False` | **Wait for SafetyBriefing to finish playing + 10 seconds** |
| CrewSeatsTakeoff | Final Takeoff Prep | `IsOnGround=True` AND (`IsLandingLightOn=True` OR `IsStrobeLightOn=True`) AND `IsEngineRunning=True` | When landing lights (default) or strobe lights are turned on (takeoff imminent) |
| CallCabinSecureTakeoff | Takeoff Imminent | `CrewSeatsTakeoff` played AND `IsOnGround=True` | **Wait for CrewSeatsTakeoff to finish playing + 5 seconds** |
| AfterTakeoff | Post-takeoff | `AltitudeAGL > TakeoffDetectionAltitudeAGL` (3,000 ft) AND `IsOnGround=False` | **Wait 2 minutes after takeoff detected (independent timing)** |
| FastenSeatbelt | In-flight Seatbelt Reminder | `Climb/Cruise Phase` AND `AfterTakeoff` played AND `Seatbelt Sign OFF→ON transition` (CABIN SEATBELTS ALERT SWITCH or ANNUNCIATOR SWITCH binding) | **2 Minute Cooldown (Repeatable)** |
| DescentSeatbelts | Descent Preparation | (`AltitudeAGL < DescentDetectionAGL` (10,000 ft) AND `VerticalSpeed < -500`) OR `LandingLightJustTurnedOn=True` | When descending below configurable altitude OR when landing lights just turned on |
| CrewSeatsLanding | Landing Preparation | `AltitudeAGL < CrewSeatsLandingAGL` (3,000 ft) AND `VerticalSpeed < -300` AND `IsLandingLightOn=True` | During final approach phase with landing lights on (configurable altitude threshold) |
| CallCabinSecureLanding | Final Landing Prep | `CrewSeatsLanding` played AND `AltitudeAGL < CrewSeatsLandingAGL + 2000` (5,000 ft) | **Wait for CrewSeatsLanding to finish playing + 10 seconds** (uses CrewSeatsLandingAGL + 2000ft) |
| AfterLanding | Post-landing | `IsOnGround=True` AND (`SpoilersDeployed=False` OR `GroundSpeed < 15`) AND (previous phase was descent/approach OR descent announcements played) | After landing and spoilers retracted OR ground speed below 15 knots |
| DisarmDoors | Arrival at Gate | `AreEnginesOff=True` AND `IsParkingBrakeOn=True` AND `AfterLanding` played | **Wait for AfterLanding to finish playing** |
| DisembarkStarted | Disembarkation | `DisarmDoors` played AND (`IsBeaconOn=False` OR `IsGSXDeboardingInProgress=True`) | **Wait for DisarmDoors to finish playing** |

## GSX Integration

The Universal Announcer now supports GSX (Ground Services eXtended) integration for more realistic boarding announcements. This feature must be enabled in the Settings → Integrations tab.

### GSX SimVar Integration

When GSX integration is enabled, the system monitors three GSX simvars:

**GSX Boarding State** - `L:FSDT_GSX_BOARDING_STATE`:
- **State 1**: Service can be called
- **State 2**: Service is not available
- **State 3**: Service has been bypassed
- **State 4**: Service has been requested
- **State 5**: Service is being performed ⭐ **ACTIVE BOARDING**
- **State 6**: Service has been completed ⭐ **BOARDING COMPLETE**

**GSX Refueling State** - `L:FSDT_GSX_REFUELING_STATE`:
- **State 1**: Service can be called
- **State 2**: Service is not available
- **State 3**: Service has been bypassed
- **State 4**: Service has been requested ⭐ **REFUELING REQUESTED**
- **State 5**: Service is being performed ⭐ **ACTIVE REFUELING**
- **State 6**: Service has been completed

**GSX Deboarding State** - `L:FSDT_GSX_DEBOARDING_STATE`:
- **State 1**: Service can be called
- **State 2**: Service is not available
- **State 3**: Service has been bypassed
- **State 4**: Service has been requested ⭐ **DEBOARDING REQUESTED**
- **State 5**: Service is being performed ⭐ **ACTIVE DEBOARDING**
- **State 6**: Service has been completed

### GSX Boarding Logic

When GSX integration is **enabled**:
- BoardingWelcome is triggered when `L:FSDT_GSX_BOARDING_STATE = 5` (service being performed)
- **BoardingComplete is triggered when either**:
  - Beacon light turns on (traditional trigger)
  - `L:FSDT_GSX_BOARDING_STATE = 6` (service completed)
  - **Whichever happens first** provides the most realistic timing
- **Automatic Fallback**: If GSX is not available (not installed or not running), the system automatically falls back to logo light trigger
- **Smart Detection**: Uses `IsGSXAvailable` to determine if GSX data is actually being received
- **Refueling variants**: When `L:FSDT_GSX_REFUELING_STATE = 4 or 5` (requested or being performed), sound files with [Refueling] tags are preferred over standard variants
- **Deboarding trigger**: When `L:FSDT_GSX_DEBOARDING_STATE = 4 or 5` (requested or being performed), DisembarkStarted announcement is triggered (supplements beacon light off trigger)
- Provides more realistic timing aligned with actual ground service operations

When GSX integration is **disabled**:
- Traditional logo light trigger is used (`IsLogoLightOn=True`)
- [Refueling] sound variants are not selected
- Behavior remains unchanged from previous versions
- No dependency on GSX being installed or active

## Manual Flight State Override Menu

The Universal Announcer provides a comprehensive manual flight state override system accessible via the system tray menu. This allows users to jump to any flight phase and get appropriate announcements for that stage of flight.

### Menu Access
Right-click the system tray icon → **Flight State** submenu

### Control Options

| Menu Option | Description | State Set |
|-------------|-------------|-----------|
| **Resume** | Resume all announcements (only shown when stopped) | Resumes automatic detection |
| **Stop** | Stop all announcements (only shown when running) | Pauses all announcements |
| **Auto** | Return to automatic flight state detection | `null` (automatic detection) |
| **Restart** | Reset state machine to beginning of flight sequence | Clears all played announcements |

### Flight Phase Options

| Menu Option | Flight State | Announcements Marked as Played | What You'll Get Next |
|-------------|-------------|-------------------------------|---------------------|
| **Preflight** | `Preflight` | None | BoardingWelcome when logo light turns on |
| **Taxi** | `Taxi` | BoardingWelcome, BoardingMusic, BoardingComplete | ArmDoors when engines start or aircraft moves |
| **Takeoff** | `Takeoff` | BoardingWelcome, BoardingMusic, BoardingComplete, ArmDoors, PreSafetyBriefing, SafetyBriefing, CabinDimTakeoff | CrewSeatsTakeoff when landing/strobe lights turn on |
| **Climb** | `Climb` | BoardingWelcome, BoardingMusic, BoardingComplete, ArmDoors, PreSafetyBriefing, SafetyBriefing, CabinDimTakeoff, CrewSeatsTakeoff, CallCabinSecureTakeoff | AfterTakeoff after 2 minutes at altitude > TakeoffDetectionAltitudeAGL (3,000 ft) |
| **Cruise** | `Cruise` | All pre-cruise announcements (boarding through AfterTakeoff) | FastenSeatbelt when seatbelt sign turns on, DescentSeatbelts when descending |
| **Descent** | `Descent` | All pre-descent announcements (boarding through AfterTakeoff) | DescentSeatbelts when below DescentDetectionAGL (10,000 ft) OR when landing lights just turned on |
| **Approach** | `Approach` | All pre-approach announcements (boarding through AfterTakeoff) | CrewSeatsLanding when below CrewSeatsLandingAGL (3,000 ft) with landing lights |
| **Landing** | `Landing` | All pre-landing announcements (boarding through CallCabinSecureLanding) | AfterLanding when on ground with spoilers retracted |
| **Done** | `Done` | All announcements | No further announcements (flight complete) |
