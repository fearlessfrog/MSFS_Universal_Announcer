# 🌐 Contributing Translations

Thanks for helping localize this project! We use standard `.resx` resource files for translations. You don’t need to be a developer to contribute—just follow the steps below.

---

## 1. Install the Translation Tool
We recommend the free **ResX Resource Manager (RRM)** app:

- Download the **ClickOnce standalone app** here:
  👉 [ResX Resource Manager ClickOnce Standalone](https://clickonce-tom-englert.azurewebsites.net/ResXResourceManager/ResXManager.application)

- Run the installer and launch the app (no Visual Studio required).

---

## 2. Get the Files
- Go to our GitHub repo and locate the `Strings.resx` files here.
- Files you’ll see:

  - `Strings.resx` → base English (**do not edit, will be added to over time**)
  - `Strings.de.resx` → German
  - `Strings.fr.resx` → French
  - `Strings.es.resx` → Spanish
  - `Strings.pt-BR.resx` → Portuguese (Brazil)
  - `Strings.ja.resx` → Japanese
  - `Strings.zh-Hans.resx` → Chinese (Simplified)
  - `Strings.ko.resx` → Korean

If your language is missing, copy `Strings.resx` → `Strings.xx.resx`, where `xx` is the [culture code](https://learn.microsoft.com/dotnet/api/system.globalization.cultureinfo?utm_source=chatgpt.com) (e.g. `it` for Italian).

---

## 3. Translate
1. Open ResX Resource Manager.
2. Load the `.resx` files (File → Open → select the folder with your `.resx`).
3. The tool shows all languages side-by-side.
4. Translate the **Value** column for your language:
   - Leave the **Name** keys untouched.
   - Keep placeholders like `{0}`, `{1}` intact.
   - Use complete sentences, not fragments.

💡 If unsure about a string, you can leave it in English.

---

## 4. Submit Your Contribution
1. **Fork** the repository on GitHub.
2. **Commit** your updated `Strings.xx.resx` file(s).
3. Use a clear message like `Update French translations` or `Add Portuguese (Brazil) translations`.
4. Open a **Pull Request**.

---

### Tips
- Keep style consistent (capitalization, punctuation).
- If you need help with culture codes or formatting, just open an issue.

---

✅ That’s it! With your help, the app can reach users around the world in their own language.
