// Load circular data and check if circulars have been read from localStorage
const circularData = {
    2022: {
        academics: [
            { id: 1, title: "Circular 1 - Exam Schedule", url: "./exam-schedule.jpg", read: false },
            { id: 2, title: "Circular 2 - Workshop on AI", url: "path/to/workshop-ai.pdf", read: false }
        ],
        miscellaneous: [
            { id: 3, title: "Circular 3 - Sports Day Notification", url: "path/to/sports-day.jpg", read: false }
        ]
    },
    2023: {
        academics: [
            { id: 4, title: "Circular 1 - Semester Start Date", url: "path/to/semester-start.pdf", read: false }
        ],
        miscellaneous: [
            { id: 5, title: "Circular 2 - Hackathon Announcement", url: "path/to/hackathon-announcement.pdf", read: false },
            { id: 6, title: "Circular 3 - Holiday List", url: "path/to/holiday-list.pdf", read: false }
        ]
    },
    // Add other batches similarly...
};

// Function to load read statuses from localStorage
function loadReadStatuses() {
    const readStatuses = JSON.parse(localStorage.getItem('readStatuses')) || {};
    Object.keys(circularData).forEach(batch => {
        circularData[batch].academics.forEach(circular => {
            circular.read = readStatuses[circular.id] || false;
        });
        circularData[batch].miscellaneous.forEach(circular => {
            circular.read = readStatuses[circular.id] || false;
        });
    });
}

// Function to save read statuses to localStorage
function saveReadStatus(circularId) {
    const readStatuses = JSON.parse(localStorage.getItem('readStatuses')) || {};
    readStatuses[circularId] = true;
    localStorage.setItem('readStatuses', JSON.stringify(readStatuses));
}

// Function to update notification alert count for each batch
function updateNotificationCounts() {
    Object.keys(circularData).forEach(batch => {
        const unreadCount = circularData[batch].academics.concat(circularData[batch].miscellaneous)
            .filter(circular => !circular.read).length;
        const batchCard = document.querySelector(`.batch-card[onclick="showCirculars(${batch})"]`);
        const notificationAlert = batchCard.querySelector('.notification-alert');
        if (unreadCount > 0) {
            notificationAlert.textContent = unreadCount;
            notificationAlert.style.display = "inline";
        } else {
            notificationAlert.style.display = "none"; // Hide if no unread circulars
        }
    });
}

// Call loadReadStatuses and updateNotificationCounts on page load
loadReadStatuses();
updateNotificationCounts();

function showCirculars(batch) {
    const content = document.getElementById("circulars-content");
    const title = document.querySelector(".batch-title");
    const academicList = document.querySelector(".academic-list");
    const miscellaneousList = document.querySelector(".miscellaneous-list");

    title.textContent = `${batch} Batch`;
    academicList.innerHTML = "";
    miscellaneousList.innerHTML = "";

    if (circularData[batch]) {
        const { academics, miscellaneous } = circularData[batch];

        academics.forEach(circular => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = circular.title;
            link.href = circular.url;
            link.target = "_blank";
            listItem.appendChild(link);
            if (!circular.read) {
                listItem.classList.add('unread'); // Mark unread items
            }
            link.onclick = () => markAsRead(batch, circular);
            academicList.appendChild(listItem);
        });

        miscellaneous.forEach(circular => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = circular.title;
            link.href = circular.url;
            link.target = "_blank";
            listItem.appendChild(link);
            if (!circular.read) {
                listItem.classList.add('unread'); // Mark unread items
            }
            link.onclick = () => markAsRead(batch, circular);
            miscellaneousList.appendChild(listItem);
        });
    }

    content.style.display = "block"; // Show the circulars content
}

function closeCirculars() {
    const content = document.getElementById("circulars-content");
    content.style.display = "none"; // Hide the circulars content
}

function markAsRead(batch, circular) {
    if (!circular.read) {
        circular.read = true;
        saveReadStatus(circular.id);
        updateNotificationCounts();
        showCirculars(batch); // Refresh the circulars list to remove unread styling
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const batchCards = document.querySelectorAll(".batch-card");
    const circularContent = document.querySelector(".circulars-content");
    const closeBtn = document.querySelector(".close-btn");

    // Open circulars modal on batch card click
    batchCards.forEach((card) => {
        card.addEventListener("click", () => {
            const countElement = card.querySelector(".notification-alert");
            const unreadItems = circularContent.querySelectorAll(".unread");

            // Show the circular content
            circularContent.style.display = "block";

            // Reduce notification count
            unreadItems.forEach((item) => {
                item.addEventListener("click", () => {
                    item.classList.remove("unread");
                    item.style.color = "#ccc"; // Mark as read
                });
            });

            // Update count in the notification alert
            if (countElement) {
                const remainingUnread = circularContent.querySelectorAll(".unread").length;
                countElement.textContent = remainingUnread;

                // Hide notification alert if no unread items
                if (remainingUnread === 0) {
                    countElement.style.display = "none";
                }
            }
        });
    });

    // Close the circulars modal
    closeBtn.addEventListener("click", () => {
        circularContent.style.display = "none";
    });
});
