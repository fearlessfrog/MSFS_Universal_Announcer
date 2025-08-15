# Generated Announcements

## Why This Feature is Amazing

The Generated TTS feature revolutionizes your flight simulation experience by providing:

- **Always Tailored**: You get announcements specifically tailored to your airline, no matter what aircraft or route you're flying
- **Local Language Support**: Announcements can be in your local language, just like real-life airline operations
- **Fully Customizable**: Edit announcements to say exactly what you want, incorporating real flight context and details
- **Cost-Effective**: Azure's free tier provides 8 hours of audio generation a month, and since clips are saved as reusable .ogg files in proper sound pack format, you only pay for what you actually need

### Getting Started with Azure
To use this feature, you'll need to set up an Azure Text-to-Speech API key. I've found two excellent step-by-step guides that walk you through the entire process:

- **[docs.merkulov.design](https://docs.merkulov.design/how-to-get-microsoft-azure-tts-api-key/)** - Comprehensive guide from account creation to API key generation
- **[VitalPBX Blog](https://vitalpbx.com/blog/how-to-create-microsoft-azure-tts-api-key/)** - Detailed walkthrough with screenshots and specific steps

**Important**: You'll need **both** your API Key and your Azure Region/Location for the app to work properly. Make sure to note both values when setting up your Azure Speech service.

## Overview

The Generated TTS feature automatically synthesizes missing airline announcements using Azure (will add more providers next) Text-to-Speech, providing a seamless fallback before default audio is used. This ensures your passengers always hear appropriate announcements, even when custom audio files are missing.

## How It Works

### Source Text Priority
The system follows this lookup order to find announcement text to say:
1. **Airline-specific**: `Airline/BoardingWelcome.txt` (highest priority, an override used per airline)
2. **Global default**: `Default/BoardingWecome.txt` (you can edit this in the app and save it)
3. **Built-in template**: Automatically copied to the airline folder on first use

### Output and Storage
Generated announcements are saved as `.ogg` files alongside their corresponding `.txt` files in the airline folder. Once created, these files are reused automatically on subsequent flights, eliminating the need for repeated API calls.

**To regenerate an announcement**: Simply edit the `.txt` file and delete or rename the associated `.ogg` file.

### Performance and Reliability
- **Generation timeout**: 20 seconds maximum, so generated on demand without you noticing
- **Fallback behavior**: If generation fails or times out, the normal audio fallback system takes over
- **Efficient caching**: Prevents unnecessary API usage for repeated announcements

## Configuration

Access the Generated TTS settings in **Settings → Generated**:
- **Enable/Disable**: Toggle the feature on or off
- **Azure Region**: Select your preferred Azure service region
- **API Key**: Enter your Azure Text-to-Speech API key
- **Voice**: Choose from available Azure TTS voices

### Testing Your Setup
Use the **"Test Voice"** button to verify your configuration:
- **First click**: Reads the selected template's editor text (if available) or a default test message
- **Second click**: Stops the playback

## Template Management

### Built-in Templates
The template editor displays all available built-in announcement templates. Select any template to load its content for editing.

### Template Actions
- **Save**: Writes your customizations to `Default/Name.txt` (creates a global override)
- **Revert**: Removes the override, restoring the original built-in template

## Available Placeholders

Enhance your announcements with dynamic content using these placeholders, so you can place these in the text:

| Placeholder | Description | Fallback |
|-------------|-------------|----------|
| `{AIRLINE}` | Spoken airline name from ICAO code | Raw ICAO code if unknown |
| `{ORIGIN}` | Spoken origin airport name | ICAO code (e.g., "KLAS") |
| `{DESTINATION}` | Spoken destination airport name | ICAO code |
| `{AIRCRAFT}` | Simple aircraft type description | "aircraft" |
| `{TIME_OF_DAY}` | Contextual time greeting | Morning, Afternoon, or Evening based on sim time |

### Data Sources
Placeholder values are populated from SimBrief when available, with automatic fallback to current simulator data.

## Best Practices

- **Keep text natural**: Write announcements as you would speak them naturally
- **Avoid complex formatting**: SSML and tag variants are not yet supported, but looking at it
- **Test thoroughly**: Use the Test Voice feature to ensure your templates sound correct
- **Plan for fallbacks**: Design templates that work well even when some data is unavailable
- **Audio Mix**: I'll add some sort of 'PA mix overlay' to make the voice sound more PA ish, coming soon.

---

*Note: This feature provides a robust solution for missing announcements while maintaining the authentic airline experience your passengers expect.*


