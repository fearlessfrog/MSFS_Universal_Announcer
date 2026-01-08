# How to Enable Debug Mode and Submit an Issue

If you're experiencing an issue with Universal Announcer, enabling debug mode will help us diagnose the problem. This guide walks you through the process.

## Step 1: Locate Your Config Folder

First, navigate to your Universal Announcer configuration folder. In Windows, you can access this by typing `%APPDATA%\UniversalAnnouncer` in the address bar of File Explorer or the Run dialog (Windows key + R).

**Note:** The `%APPDATA%` environment variable automatically expands to your AppData\Roaming folder (typically `C:\Users\YourUsername\AppData\Roaming`). Windows handles this expansion automatically, so you don't need to replace it manually.

In this folder, you'll see your configuration files, including `config.json`.

## Step 2: Enable Debug Mode

You have two options to enable debug logging:

### Option A: Using the App Interface

1. Open Universal Announcer
2. Go to the **Settings** tab, then select **Help & About**
3. Rapidly click the logo on the left side **four times**
4. You should see a message confirming that logging has been activated

### Option B: Manual Configuration

1. Open the `config.json` file in your `%APPDATA%\UniversalAnnouncer` folder using a text editor
2. Add the following line to the configuration:

   ```json
   "IsDebugModeEnabled": true,
   ```
3. Save the file

## Step 3: Reproduce the Issue

Since logging starts immediately when debug mode is enabled, it's best to:

1. **Restart the application** to ensure logging is active from the start
2. **Recreate the issue** you're experiencing
3. The log file (`debug.log`) will be created in your `%APPDATA%\UniversalAnnouncer` folder and will contain detailed information about what happens inside the app

## Step 4: Submit Your Issue

### Preferred Method: GitHub Issues

1. Go to [https://github.com/fearlessfrog/UniversalAnnouncer/issues](https://github.com/fearlessfrog/UniversalAnnouncer/issues)
2. Create a new issue describing the problem
3. Attach the `debug.log` text file from your `%APPDATA%\UniversalAnnouncer` folder
4. You can also include your `config.json` file if relevant—it contains no keys or personal information, just your settings

GitHub is the preferred method because it helps us track issues in one place and allows others in the community to help troubleshoot.

### Alternative Methods

If you prefer not to use GitHub, you can:

1. Upload the `debug.log` file (and optionally `config.json`) to a file sharing service
2. Contact me on Discord in the Cabin Announcements channel or on flightsim.to with a link to the files

However, GitHub is recommended for better issue tracking and community support.

## Step 5: Disable Debug Mode

After submitting your issue, you should disable debug mode. While the log file isn't a major problem, it will grow over time, and it's best to have a clean log file for each issue you report.

You can turn off debugging using the same method you used to enable it:

- **If you used Option A:** Rapidly click the logo four times again in the Help & About tab
- **If you used Option B:** Remove the `"IsDebugModeEnabled": true,` line from your `config.json` file or set it to `false`

## What Information Helps?

When submitting an issue, please include:

- A clear description of what happened
- Steps to reproduce the issue (if possible)
- The `debug.log` file from when the issue occurred
- Your `config.json` file (optional but helpful)
- Any error messages you saw

This information helps me identify and fix problems more quickly. Thanks!
