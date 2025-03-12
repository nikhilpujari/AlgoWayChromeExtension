# 🚀 AlgoWay - LeetCode Helper (Hints & Complexity)

*A Chrome extension that provides progressive hints and complexity analysis for LeetCode problems.*

---

![AlgoWay Hint](https://raw.githubusercontent.com/nikhilpujari/AlgoWayChromeExtension/main/screenshots/ss1.png)
![AlgoWay Complexity Analysis](https://raw.githubusercontent.com/nikhilpujari/AlgoWayChromeExtension/main/screenshots/ss1.png)

## 📌 Features

✅ **Progressive Hint System** – Get increasingly detailed hints without revealing complete solutions.\
✅ **Pseudo-Code Generation** – Access structural guidance after exhausting all hints.\
✅ **Complexity Analysis** – Analyze your solution's time and space complexity with concise explanations.\
✅ **Problem Detection** – Automatically detects which LeetCode problem you're working on.\
✅ **AI-Powered Assistance** – Leverages OpenAI's GPT-3.5 Turbo for intelligent, context-aware help.

---

## 🛠️ How It Works

1. **Navigate to any LeetCode problem** you're working on.
2. **Click the AlgoWay extension icon** in your Chrome toolbar.
3. **Choose "Solution Hints"** to receive progressive guidance:
   - Start with Hint 1, unlocking additional hints as needed
   - Access pseudo-code after using all hints
4. **Or select "Time & Space Complexity"** to analyze your solution:
   - Paste your solution code
   - Click "Analyze Complexity" for instant feedback

**🔹 Note:** AlgoWay helps you learn while solving problems, not by giving away complete solutions.

---

## 🔧 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/nikhilpujari/AlgoWayChromeExtension.git
   ```
2. **Open Chrome and go to:**
   ```
   chrome://extensions/
   ```
3. **Enable Developer Mode** (top right corner).
4. **Click "Load unpacked"** and select the project folder.
5. **Add your OpenAI API key** in `background.js`:
   ```javascript
   const API_KEY = "your_openai_api_key_here";
   ```
6. The extension is now installed! 🎉

or

Download From Chrome Store: https://chromewebstore.google.com/detail/pgjiolangiadoljjendniibnbdpinghh?utm_source=item-share-cb

---

## 📝 Permissions Used

| Permission   | Reason                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| `activeTab`  | Allows the extension to access the current tab only when clicked.      |
| `host_permissions` | Enables API calls to OpenAI for generating hints and analysis.   |

---

## 🔹 Prepare Your Extension for Publishing

Before publishing, make sure:\
✅ All required files (`manifest.json`, `popup.html`, `popup.js`, `content.js`, `background.js`, `styles.css`, `logo.png`) are in a single folder.\
✅ Icons are included and properly referenced in the manifest file.\
✅ Your manifest version is `3` (already implemented in the code).\
✅ Replace the placeholder API key with your own OpenAI API key.\
✅ Works correctly after testing in `chrome://extensions/`.


---

## 💡 Future Improvements

- ✅ **UI/UX Enhancements** – The loader shows up in Hint 1 only and not on other button click.
- ✅ **Progress Tracking** – Track your problem-solving journey and improvement over time.

---

### 💬 Have Suggestions? Want to Contribute?

Help me fix above mentioned issue and feel free to **open an issue or pull request** on GitHub! Let's make AlgoWay even better. 🚀
