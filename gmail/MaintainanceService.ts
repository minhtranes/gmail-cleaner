function cleanObsoletedMail() {
    var delayDays = 10;

    cleanOlderThanAndLabel(delayDays, 'Deal');
    cleanOlderThanAndLabel(delayDays, 'Advertisement');
    cleanOlderThanAndLabel(delayDays, 'Course');
    cleanOlderThanAndLabel(30, 'Inbox');
}

function cleanOlderThanAndLabel(numOfDay: number, labelName: string) {

    var threads: GoogleAppsScript.Gmail.GmailThread[] = [];
    var label = GmailApp.getUserLabelByName(labelName);
    if (label != null) {
        threads = label.getThreads();

    } else if (labelName == 'Inbox') {
        threads = GmailApp.getInboxThreads();
    } else {
        console.log('Could not find label [%s]', labelName);
    }

    var maxDate = new Date();
    maxDate.setDate(maxDate.getDate() - numOfDay);
    for (var i = 0; i < threads.length; i++) {
        if (threads[i].getLastMessageDate() < maxDate) {
            threads[i].moveToTrash();
        }
    }
}