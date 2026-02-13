# Virus Checker False Positives

## First, a Friendly Note

Hey there! If you've landed on this page, chances are your antivirus software has flagged Universal Announcer as suspicious. I wrote this page to help explain what is happening rather than reply each time the same way.

## Why Does This Happen?

Modern antivirus software increasingly relies on machine learning and heuristic analysis to detect threats. While this is generally a good thing for security, it can lead to **false positives**—legitimate software being incorrectly flagged as malicious.

Universal Announcer gets flagged occasionally because:

- **It's not widely distributed** – Antivirus ML models favour popular software. Niche applications like flight sim utilities don't have millions of users, so they look "unusual" to these systems.
- **It interacts with other processes** – The app uses SimConnect to communicate with Microsoft Flight Simulator, which some heuristics find suspicious.
- **It's unsigned** – More on this below.

## Why Don't I Just Sign the Application?

Great question! Code signing certificates exist precisely to help with this issue. However:

- **They're expensive** – A legitimate Extended Validation (EV) certificate costs several hundred dollars per year.
- **All it does is pay the signing company** – The certificate doesn't make the code any safer; it just tells Windows "someone paid money to vouch for this."
- **This is a hobby project** – Universal Announcer is free software that I develop in my spare time for the flight sim community. Spending hundreds of dollars annually on a certificate doesn't make sense for something I give away for free.

I'd rather spend that money on coffee ☕ and keep improving the app for everyone.

## My Track Record

Here's the thing: **I've made over 60 releases of Universal Announcer**, and every single virus detection has been a false positive. Not one. Every time someone has reported a detection, it's turned out to be a scanner getting it wrong.

That's not a guarantee of anything—you shouldn't blindly trust software just because someone on the internet says it's fine. But it is context worth considering.

## What Can You Do?

Ultimately, **the decision is yours**. Here are your options:

### Option 1: Verify with Multiple Scanners

Upload the release to [VirusTotal.com](https://www.virustotal.com/) and see what 70+ different antivirus engines think. You'll typically see that the vast majority give it a clean bill of health, with perhaps one or two flagging it (usually the more aggressive ML-based ones).

### Option 2: Add an Exception

If you're comfortable proceeding, you can add Universal Announcer to your antivirus software's exception/allowlist. The exact steps vary by product, but generally:

1. Open your antivirus settings
2. Find "Exceptions," "Exclusions," or "Allowlist"
3. Add the Universal Announcer folder or executable

### Option 3: Report the False Positive

This actually helps everyone! Most antivirus vendors have a way to report false positives:

- **Windows Defender**: [Submit a file for analysis](https://www.microsoft.com/en-us/wdsi/filesubmission)
- **Avast/AVG**: [False positive report form](https://www.avast.com/false-positive-file-form.php)
- **Kaspersky**: [Report a false positive](https://support.kaspersky.com/common/diagnostics/13931)
- **Norton**: [Submit a file](https://submit.norton.com/)
- **Bitdefender**: [Report false positive](https://www.bitdefender.com/consumer/support/answer/29358/)

When enough users report a false positive, the vendor updates their detection rules and the problem goes away for everyone.

### Option 4: Don't Use It

And that's completely fine too. I understand that security is personal, and if you're not comfortable, you shouldn't feel pressured. There are no hard feelings here.

## A Note on Trust

I get it—trusting software from the internet requires a leap of faith. Here's what I can offer:

- **The app is discussed openly** in flight sim communities and Discord servers
- **Updates are frequent and transparent** – you can see the release history on GitHub
- **There is some history** - the app has been around for a while and has over 30,000 downloads.

But again, do your own due diligence. Check VirusTotal, read the community discussions, and make the choice that feels right for you.

## Questions?

If you have concerns or questions, feel free to reach out through the GitHub issues page. I'm happy to discuss any specific detection or concern you might have.

Happy flying! ✈️

