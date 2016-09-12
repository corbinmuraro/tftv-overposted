var numNuked = 0;

$('.block.main > a').each(function() {
	threadTitle = $(this).text();

	if ( (threadTitle.indexOf("overwatch") !== -1) || (threadTitle.indexOf("Overwatch") !== -1) ||
		(threadTitle.indexOf(" OW") !== -1) || (threadTitle.indexOf("OW ") !== -1))
	{
		$(this).parent().parent().parent().remove();
		numNuked++;
	}
});

var stringNuked = numNuked.toString();
chrome.runtime.sendMessage({ type: "setBadge", badgeText : stringNuked });