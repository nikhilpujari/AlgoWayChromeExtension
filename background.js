const API_KEY = "YOUR_API_KEY";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchHint") {
        fetchHintFromOpenAI(request.title, request.level, sendResponse);
        return true; 
    } else if (request.action === "analyzeComplexity") {
        analyzeComplexityWithOpenAI(request.solution, sendResponse);
        return true;
    }
});

async function fetchHintFromOpenAI(title, level, sendResponse) {
    let messages = [
        { "role": "system", "content": "You are a helpful coding assistant." }
    ];

    if (level === 4) {
        // Only request pseudocode, removing the hint request
        messages.push({ "role": "user", "content": `Provide only the pseudocode for: '${title}'. No explanation, no description, just pure pseudocode.` });
    } else {
        // Request a normal hint for other levels
        messages.push({ "role": "user", "content": `Provide a hint level ${level} under 60 words for the LeetCode problem titled: '${title}'` });
    }

    try {
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 100
            })
        });

        let data = await response.json();

        if (data.error) {
            console.error("OpenAI API Error:", JSON.stringify(data.error, null, 2));
            sendResponse({ error: "OpenAI API Error: " + (data.error.message || "Unknown error") });
        } else {
            sendResponse({ result: data.choices[0]?.message?.content?.trim() || "No response received." });
        }
    } catch (error) {
        console.error("Failed to fetch hint:", error);
        sendResponse({ error: "Failed to fetch hint." });
    }
}

async function analyzeComplexityWithOpenAI(solution, sendResponse) {
    let messages = [
        { "role": "system", "content": "You are a helpful coding assistant." },
        { "role": "user", "content": `Analyze the time and space complexity of the following code and explain under 70 words:\n${solution}` }
    ];

    try {
        let response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: messages,
                max_tokens: 150
            })
        });

        let data = await response.json();

        if (data.error) {
            console.error("OpenAI API Error:", JSON.stringify(data.error, null, 2));
            sendResponse({ error: "OpenAI API Error: " + (data.error.message || "Unknown error") });
        } else {
            sendResponse({ result: data.choices[0]?.message?.content?.trim() || "No response received." });
        }
    } catch (error) {
        console.error("Failed to analyze complexity:", error);
        sendResponse({ error: "Failed to analyze complexity." });
    }
}
