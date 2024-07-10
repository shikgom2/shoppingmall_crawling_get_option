// popup.js
document.getElementById('view-url').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {message: "show_url", url: activeTab.url});
    });
});