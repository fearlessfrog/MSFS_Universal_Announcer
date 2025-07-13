# How Detection of Flight State Works

This is a snapshot of v0.0.7 transition so might evolve. It should answer most questions on 'what fires when'.

## State Transition Table

| File to Play | Flight State | SimVars to Check | Timing Logic |
|--------------|--------------|------------------|--------------|
| BoardingWelcome | Ground Pre-boarding | **GSX Mode**: `IsOnGround=True` AND `IsGSXBoardingInProgress=True` AND `IsBeaconOn=False` <br>**Traditional Mode**: `IsOnGround=True` AND `IsLogoLightOn=True` AND `IsBeaconOn=False` | Play once when GSX boarding starts OR logo light first turns on, then repeat every 5 minutes until BoardingComplete |
| BoardingMusic | Boarding Active | `BoardingWelcome` played AND `BoardingComplete` not played | Loop continuously until BoardingComplete or next BoardingWelcome |
| BoardingComplete | Boarding Complete | `IsBeaconOn=True` AND `IsOnGround=True` | Play once when beacon first turned on |
| ArmDoors | Departure Preparation | `IsOnGround=True` AND (`IsEngineRunning=True` OR `GroundSpeed > 1`) | Play once when engines start or aircraft begins moving |
| PreSafetyBriefing | Pre-departure Briefing | `ArmDoors` played AND `IsEngineRunning=True` | **Wait for ArmDoors to finish playing** |
| SafetyBriefing | Safety Briefing | `PreSafetyBriefing` played | **Wait for PreSafetyBriefing to finish playing** |
| CabinDimTakeoff | Cabin Preparation | `SafetyBriefing` played AND `IsDaylight=False` | **Wait for SafetyBriefing to finish playing + 10 seconds** |
| CrewSeatsTakeoff | Final Takeoff Prep | `IsOnGround=True` AND `IsStrobeLightOn=True` | When strobe lights are turned on (takeoff imminent) |
| CallCabinSecureTakeoff | Takeoff Imminent | `CrewSeatsTakeoff` played AND `IsOnGround=True` | **Wait for CrewSeatsTakeoff to finish playing + 5 seconds** |
| AfterTakeoff | Post-takeoff | `AltitudeAGL > 3000` AND `IsOnGround=False` | **Wait 2 minutes after takeoff detected (independent timing)** |
| DescentSeatbelts | Descent Preparation | `AltitudeAGL < 10000` AND `VerticalSpeed < -500` AND `IsLandingLightOn=True` | When descending below 10000ft with landing lights on |
| CrewSeatsLanding | Landing Preparation | `AltitudeAGL < 3000` AND `VerticalSpeed < -300` AND `IsLandingLightOn=True` | During final approach phase with landing lights on |
| CallCabinSecureLanding | Final Landing Prep | `CrewSeatsLanding` played AND `AltitudeAGL < 5000` | **Wait for CrewSeatsLanding to finish playing + 10 seconds** |
| AfterLanding | Post-landing | `IsOnGround=True` AND (`SpoilersDeployed=False` OR `GroundSpeed < 25`) AND (previous phase was descent/approach OR descent announcements played) | After landing and spoilers retracted OR ground speed below 25 knots |
| DisarmDoors | Arrival at Gate | `AreEnginesOff=True` AND `AfterLanding` played | **Wait for AfterLanding to finish playing** |
| DisembarkStarted | Disembarkation | `DisarmDoors` played AND `IsBeaconOn=False` | **Wait for DisarmDoors to finish playing** |

## GSX Integration

The Universal Announcer now supports GSX (Ground Services eXtended) integration for more realistic boarding announcements. This feature must be enabled in the Settings → Integrations tab.

### GSX SimVar Integration

When GSX integration is enabled, the system monitors two GSX simvars:

**GSX Boarding State** - `L:FSDT_GSX_BOARDING_STATE`:
- **State 1**: Service can be called
- **State 2**: Service is not available
- **State 3**: Service has been bypassed
- **State 4**: Service has been requested
- **State 5**: Service is being performed ⭐ **ACTIVE BOARDING**
- **State 6**: Service has been completed

**GSX Refueling State** - `L:FSDT_GSX_REFUELING_STATE`:
- **State 1**: Service can be called
- **State 2**: Service is not available
- **State 3**: Service has been bypassed
- **State 4**: Service has been requested ⭐ **REFUELING REQUESTED**
- **State 5**: Service is being performed ⭐ **ACTIVE REFUELING**
- **State 6**: Service has been completed

### GSX Boarding Logic

When GSX integration is **enabled**:
- BoardingWelcome is triggered when `L:FSDT_GSX_BOARDING_STATE = 5` (service being performed)
- The traditional logo light trigger is **overridden** by GSX state
- Boarding announcements will only play when GSX boarding is actually active
- **Refueling variants**: When `L:FSDT_GSX_REFUELING_STATE = 4 or 5` (requested or being performed), sound files with [Refueling] tags are preferred over standard variants
- Provides more realistic timing aligned with actual ground service operations
### Non GSX Light-Based State Detection Logic

Without GSX (so far) here's how the lights are used.

1. **Logo Light**:
   - Triggers `BoardingWelcome` when first turned on
   - Used for flight state reset when turned off (final end of flight)
   - Turning off logo light resets all announcements and returns to boarding state. It's fine to use in the air all you want though.

2. **Beacon Light**:
   - Triggers `BoardingComplete` when turned on
   - Triggers `DisembarkStarted` when turned off (at gate/parking)

3. **Landing Light (replaces Seatbelt Sign for Descent)**:
   - Triggers `DescentSeatbelts` when on during descent
   - More reliable than seatbelt sign detection, which for most planes is missing a data ref 😞

4. **Strobe Light**:
   - Triggers `CrewSeatsTakeoff` when turned on, better late than never eh Captain?
   - Typically activated just before takeoff
   - More reliable than engine N1 detection for you Taxiway SpeedRacers