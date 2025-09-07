# Generated Announcements

> ⚠️ **EXPERIMENTAL FEATURE** ⚠️
>
> 🧪 This is an **advanced, experimental feature** that I'm releasing early for feedback and ideas.
>
> 🔬 While fully functional, it may have unexpected behaviors or limitations. Your feedback will help shape its development!
>
> 💡 **Pro tip**: If you're new to the app, consider getting familiar with the basic features first.

## TL;DR Summary

🎯 **Use free Azure or ElevenLabs Text To Speech (TTS) to generate fully compatible sound files on the fly using your dynamic flight info**

## Important Note

> 💡 **Continue to use existing sound packs like normal - reality is best, but...**
>
> This feature doesn't replace your existing high-quality airline sound packs. It's designed to fill in the gaps when you don't have custom audio for specific announcements or airlines. Maybe you don't want to use English files all the time etc. Use real recordings when available, but let this TTS handle the rest!

## Why This Feature is Amazing

The Generated TTS feature is pretty interesting because:

- **Always Tailored**: You get announcements specifically tailored to your airline, no matter what aircraft or route you're flying
- **Local Language Support**: Announcements can be in your local language, just like real-life airline operations
- **Fully Customizable**: Edit announcements to say exactly what you want, incorporating real flight context and details
- **Cost-Effective**: Azure's free tier provides 8 hours of audio generation a month, and since these short clips are saved as reusable .ogg files in proper sound pack format, it's unlikely you'll need to pay for anything. You can use the nicer ElevenLabs as well, which has a great 'Clone Voice' feature.

## Overview

The Generated TTS feature automatically synthesizes missing airline announcements using Azure or ElevenLabs (will add more providers next) Text-to-Speech, providing a seamless fallback before default audio is used. This ensures your passengers always hear appropriate announcements, even when custom audio files are missing.

## Setting up a TTS Provider

So far we have Azure (free for 8 hours) or ElevenLabs (a limited free plan, 20 mins on Flash, although paid for voice clone/customization). Here's how to set up, as you'll need one of them work to use this feature:

### Getting Started with Azure TTS
To use this feature, you'll need to set up an Azure Text-to-Speech API key. I've found two excellent step-by-step guides that walk you through the entire process:

- **[docs.merkulov.design](https://docs.merkulov.design/how-to-get-microsoft-azure-tts-api-key/)** - Comprehensive guide from account creation to API key generation
- **[VitalPBX Blog](https://vitalpbx.com/blog/how-to-create-microsoft-azure-tts-api-key/)** - Detailed walkthrough with screenshots and specific steps

**Important**: You'll need **both** your API Key and your Azure Region/Location for the app to work properly. Make sure to note both values when setting up your Azure Speech service.

### Getting Started with ElevenLabs TTS
You can sign up for a free key and try out these voices. A paid plan allows you to clone your voice and do all sorts of weird and wonderful things. There are free voices to use as well but limited compared to Azure.

Here's a short guide on how to get your API key: [ElevenLabs API Key](https://docs.aicontentlabs.com/articles/elevenlabs-api-key/)

..or to create an API key you can go here once you have an account: [https://elevenlabs.io/app/settings/api-keys](https://elevenlabs.io/app/settings/api-keys)

**IMPORTANT** If you restrict the API key you'll need the follow permissions on it for this to work:
- Text to Speech = Has Access
- Voices = Read Only (so we can list the voices in the app)
- Models = Read Only (so we can list the models in the app, the default one is usually fine)

**Models** See the ElevenLabs documentation on the best model to use. Flash is cheaper than MultiLang for example but reduced quality. In this app's case it doesn't really matter about super low latency.

## How It All Works

### Source Text Priority
The system follows this lookup order to find announcement text to say:
1. **Airline-specific**: example: `Airline/BoardingWelcome.txt` (highest priority, an override used per airline, manually edit)
2. **Global default**: example: `Default/SafetyBriefing.txt` next priority if no airline one found (you can edit this in the app and it'll save your version in your `Default` folder)
3. **Built-in template**: Automatically copied to the airline folder on first use

### Output and Storage
Generated announcements are saved as `.ogg` files alongside their corresponding `.txt` files in the airline folder. Once created, these files are reused automatically on subsequent flights, eliminating the need for repeated API calls.

**To regenerate an announcement**: Simply edit the `.txt` file and **delete or rename** the associated `.ogg` file.

### Performance and Reliability
- **Generation timeout**: 5 seconds maximum, so generated on demand without you noticing
- **Fallback behavior**: If generation fails or times out, the normal audio fallback system takes over
- **Efficient caching**: Prevents unnecessary API usage for repeated announcements

## Example Use Case 1: Virtual Airline Setup - On the Fly Generated

Let's walk through setting up a virtual airline that doesn't have a sound pack yet and you want to generate the sound files as you go on a flight:

### Step-by-Step Setup

1. **Create Airline Folder**: Create an `XYZ` folder in your sound packs directory for your virtual 'XYZ Airlines'
2. **Pick a Voice**: In the new `Settings / Generated` tab choose the nationality and accent that works best for the airline, over 100 to choose from. Remember the 'Test Voice' uses your free credits, but you can select an existing announcement and try it out first. The generation uses the last one selected.
3. **Set Up Flight**: File a SimBrief plan or set a callsign in MSFS with `XYZ 123` as your flight id
43. **Automatic Generation**: The new announcements will be generated and play with your flight info, automatically saving `.ogg` sound files as it goes
5. **Add Music**: You'll still need your own `BoardingMusic.ogg` - go hunt for some disco or something classy to use! 🕺
6. **Customize Your Airline**:
   - Rename the generated files to match your preferences, e.g. `AfterTakeoff[1].ogg` to keep 'sets' of numbered files together.
   - Create airline-specific text files like `BoardingWelcome.txt` in your airline folder - remember it **doesn't have to be in English anymore** or use an English accent voice. The TTS works great across accents and languages.

> **Pro tip**: If you only have the `.txt` file (and no `.ogg`), the system will read it and generate the audio on demand


## Example Use Case 2: Virtual Airline Setup - Pregenerated

Here's the steps for setting up a series of announcements up front before you fly:

### Step-by-Step Setup

1. Create the airline folder
   - In your sound packs, create `XYZ` (e.g., `...\Announcements\XYZ`).

2. Open Settings → Generated
   - Pick your TTS voice (you can use Test Voice to hear it first).

3. Select the target airline
   - Set the Airline dropdown to `XYZ` (not Default). The Generate buttons will enable.

4. Pick a template
   - In the left template list, choose (for example) `BoardingWelcome`. Items in bold/green already have a matching `.ogg` in the selected airline.

5. Edit the text (optional)
   - Use the right editor to customize. You can use placeholders like `{AIRLINE_NAME}`, `{ORIGIN_CODE}`, `{DESTINATION_NAME}`, `{AIRCRAFT_NAME}`, `{TIME_OF_DAY}`.

6. Save the text to the airline folder
   - Click “Save txt”. This writes `XYZ\BoardingWelcome.txt` (you’ll be asked to overwrite if it already exists).

7. Generate the audio
   - Click “Generate” to create `XYZ\BoardingWelcome.ogg`, or
   - Click “Generate As..” to enter a different filename (e.g., `BoardingWelcome[1].ogg`) before saving.
   - Success is confirmed; the template list will refresh highlighting for files that now exist.

8. Preview and use
   - Switch to Sound Files to preview; the new `.ogg` appears under `XYZ`.
   - At runtime, the app will just play your pre‑generated `.ogg` (no TTS call needed).

Tips
- To build a set (e.g., multiple versions), repeat “Generate As..” with names like `AfterTakeoff[1].ogg`, `AfterTakeoff[2].ogg`.
- You can do the same flow with `Default` selected to pre‑generate fallback audio.

## Multi-Lingual Announcements

It is fine to put two or more languages in a single announcement, but on Azure they will work better if you use a 'Multilingual' type voice. This example shows such a voice (language-Country-Name+MultilingualNeural) in use with English and Cantonese:

<img src="images/multiling.jpg" alt="Picked Files" width="600">

## Configuration

Access the Generated TTS settings in **Settings → Generated**:
- **Enable/Disable**: Toggle the feature on or off. Default off.
- **Azure Region**: Select your preferred Azure service region e.g.'westus' or 'westeurope' as you set up in Azure earlier.
- **Model**: Select your preferred ElevenLabs model, fast/turbo is fine usually and less credits.
- **API Key**: Enter your Azure or Elevenlabs Text-to-Speech API key
- **Voice**: Choose from available Azure or ElevenLabs TTS voices. Pick an accent appropriate for the airline or region.

> 💡 **If the voices seem too 'clean' you can use the new 'Audio' tab 'PA Audio Mix' setting**
>
> This feature simulates the audio pattern of a PA system, with a few presets on how light or heavy. The generated voices will use this if this option is turned on (it is off by default)

### Testing Your Setup
Use the **"Test Voice"** button to verify your configuration:
- **First click**: Reads the selected template's editor text (if available) or a default test message
- **Second click**: Stops the playback

## Template Management

### Built-in Templates
The template editor displays all available built-in announcement templates. Select any template to load its content for editing.

### Template Actions
- **Save**: Writes your customizations to `Default/Name.txt` (creates a global override if no txt found in the airline)
- **Revert**: Removes the override, restoring the original built-in template

## Available Placeholders

Enhance your announcements with dynamic content using these placeholders, so you can place these in the text:

| Placeholder | Description |
|-------------|-------------|
| `{AIRLINE_CODE}` | Airline ICAO code (e.g., DAL) |
| `{AIRLINE_NAME}` | Airline name (e.g., Delta Air Lines) |
| `{ORIGIN_CODE}` | Origin airport ICAO code (e.g., KLAS) |
| `{ORIGIN_NAME}` | Origin airport name (e.g., Harry Reid International) |
| `{ORIGIN_CITY}` | Origin city/municipality (e.g., Las Vegas) |
| `{ORIGIN_FULLNAME}` | Origin full name (e.g., Harry Reid International, Las Vegas) |
| `{DESTINATION_CODE}` | Destination airport ICAO code (e.g., KJFK) |
| `{DESTINATION_NAME}` | Destination airport name (e.g., John F. Kennedy International) |
| `{DESTINATION_CITY}` | Destination city/municipality (e.g., New York) |
| `{DESTINATION_FULLNAME}` | Destination full name (e.g., John F. Kennedy International, New York) |
| `{AIRCRAFT_CODE}` | Aircraft type ICAO code (e.g., A320) |
| `{AIRCRAFT_NAME}` | Aircraft type name (e.g., Airbus A320) |
| `{TIME_OF_DAY}` | Morning, Afternoon, or Evening (based on local sim time) |

Notes:
- If a lookup isn’t found, the placeholder resolves to empty.
- Name/city data is loaded from Tools JSON datasets shipped with the app. Feel free to edit it.

> Example valid txt entry: "Ladies and gentlemen, good {TIME_OF_DAY}. Welcome on board our {AIRLINE_NAME} flight to {DESTINATION_FULLNAME}, on this {AIRCRAFT_NAME} aircraft. Our {ORIGIN_CITY} based crew is pleased to be with you."

### XML Placeholders

As of 0.4.5 you can also now directly address simbrief info from XML elements of the generated OFP.

What you do is check your simbrief generated OFP data in a web browser (e.g. https://www.simbrief.com/api/xml.fetcher.php?username=fearlessfrog) and then grab the elements you need and want to use in the announcement, e.g. these all work:

"Our captain today is ```{xml<api_params><cpt>}```."
"Flight number is ```{xml_digits<general><flight_number>}```."
"Distance today will be ```{xml_number<general><air_distance>}``` miles."

So 'xml' will just say it verbatim, 'xml_digits' will read each digit (good for a flight numbers etc) and 'xml_number' will use more human sounding number formats, e.g. '1024' is then said as 'one thousand and twenty four'.

## Best Practices

- **Keep text natural**: Write announcements as you would speak them naturally
- **Avoid complex formatting**: SSML and tag variants are not yet supported, but looking at it, e.g. pitch, speed
- **Test thoroughly**: Use the Test Voice feature to ensure your templates sound correct
- **Plan for fallbacks**: Design templates that work well even when some data is unavailable
- **Audio Mix**: I'll add some sort of 'PA mix overlay' to make the voice sound more PA ish, coming soon.

---

*Note: This feature provides a robust solution for missing announcements while maintaining the authentic airline experience your passengers expect.*


