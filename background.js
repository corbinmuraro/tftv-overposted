chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.badgeText) {
        chrome.tabs.get(sender.tab.id, function(tab) {
            if (chrome.runtime.lastError) {
                return; // the prerendered tab has been nuked, happens in omnibox search
            }
            if (tab.index >= 0) { // tab is visible
                chrome.browserAction.setBadgeText({tabId:tab.id, text:message.badgeText});
            } else { // prerendered tab, invisible yet, happens quite rarely
                var tabId = sender.tab.id, text = message.badgeText;
                chrome.webNavigation.onCommitted.addListener(function update(details) {
                    if (details.tabId == tabId) {
                        chrome.browserAction.setBadgeText({tabId: tabId, text: text});
                        chrome.webNavigation.onCommitted.removeListener(update);
                    }
                });
            }
        });
    }
});