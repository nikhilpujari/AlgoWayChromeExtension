document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const elements = {
        output: document.getElementById('output'),
        spinner: document.getElementById('loading'),
        hint1: document.getElementById('hint1'),
        hint2: document.getElementById('hint2'),
        hint3: document.getElementById('hint3'),
        pseudocode: document.getElementById('pseudocode'),
        analyze: document.getElementById('analyze'),
        userSolution: document.getElementById('userSolution')
    };

    // Cache object to store hint responses
    const hintCache = {
        hints: {},
        hasHint: function(level) {
            return !!this.hints[level];
        },
        getHint: function(level) {
            return this.hints[level];
        },
        setHint: function(level, hint) {
            this.hints[level] = hint;
        }
    };

    // Show loading animation
    function showLoading() {
        if (elements.output) {
            elements.output.classList.add('loading');
        }
        if (elements.spinner) {
            elements.spinner.style.display = 'block';
        }
    }

    // Hide loading animation
    function hideLoading() {
        if (elements.output) {
            elements.output.classList.remove('loading');
        }
        if (elements.spinner) {
            elements.spinner.style.display = 'none';
        }
    }

    // Update showHint function to handle element existence checks
    function showHint(level, hintText) {
        if (elements.output) {
            elements.output.innerText = hintText;
        }

        // Show next hint button if available
        if (level < 4) {
            const nextButton = document.getElementById(`hint${level + 1}`);
            if (nextButton) {
                nextButton.style.display = 'block';
            }
            // Show pseudocode button after hint 3
            if (level === 3 && elements.pseudocode) {
                elements.pseudocode.style.display = 'block';
            }
        }

        // Hide loading after a brief delay to ensure smooth transition
        hideLoading(); 
    }

    function fetchHint(level) {
        showLoading(); // Always show loading first

        // Check if hint is already cached
        if (hintCache.hasHint(level)) {
            // Even for cached hints, show brief loading animation
            showHint(level, hintCache.getHint(level));
            return;
        }

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "fetchQuestion" }, (response) => {
                if (response && response.title !== "Title not found") {
                    chrome.runtime.sendMessage(
                        { action: "fetchHint", title: response.title, level: level },
                        (hintResponse) => {
                            const hintText = hintResponse?.result || "Error fetching hint.";
                            // Cache the hint
                            hintCache.setHint(level, hintText);
                            showHint(level, hintText);
                            hideLoading();
                        }
                    );
                } else {
                    if (elements.output) {
                        elements.output.innerText = "Couldn't detect the problem title. Please refresh and try again.";
                    }
                    hideLoading();
                }
            });
        });
    }

    function analyzeComplexity() {
        const userSolution = elements.userSolution?.value;
        if (!userSolution?.trim()) {
            if (elements.output) {
                elements.output.innerText = "Please paste your solution first.";
            }
            return;
        }

        showLoading();
        chrome.runtime.sendMessage(
            { action: "analyzeComplexity", solution: userSolution },
            (response) => {
                if (elements.output) {
                    elements.output.innerText = response?.result || "Error analyzing complexity.";
                }
                hideLoading();
            }
        );
    }

    // Tab switching functionality
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Update tab triggers
        tabTriggers.forEach(trigger => {
            trigger.classList.toggle('active', trigger.getAttribute('data-tab') === tabId);
            trigger.setAttribute('aria-selected', trigger.getAttribute('data-tab') === tabId);
        });

        // Update tab contents
        tabContents.forEach(content => {
            content.classList.toggle('active', content.getAttribute('data-tab') === tabId);
        });

        // Clear output when switching tabs
        if (elements.output) {
            elements.output.innerText = '';
        }
    }

    // Add click handlers to tabs
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            switchTab(trigger.getAttribute('data-tab'));
        });
    });

    // Event Listeners for hints and analysis
    elements.hint1?.addEventListener('click', () => fetchHint(1));
    elements.hint2?.addEventListener('click', () => fetchHint(2));
    elements.hint3?.addEventListener('click', () => fetchHint(3));
    elements.pseudocode?.addEventListener('click', () => fetchHint(4));
    elements.analyze?.addEventListener('click', analyzeComplexity);

    
});