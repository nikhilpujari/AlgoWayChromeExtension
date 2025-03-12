// Function to extract LeetCode problem title from URL
function getLeetCodeTitleFromURL() {
  let url = window.location.href;
  let match = url.match(/problems\/([^\/]+)/); // Extract problem slug from URL
  if (match && match[1]) {
      let formattedTitle = match[1].replace(/-/g, " "); // Convert dashes to spaces
      return formattedTitle.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
  } else {
      console.error("Failed to extract LeetCode title from URL.");
      return "Title not found";
  }
}

// Ensure content script listens and responds correctly
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received message:", request);

  if (request.action === "fetchQuestion") {
      let title = getLeetCodeTitleFromURL();
      sendResponse({ title: title }); // Send only the title
  }
});
