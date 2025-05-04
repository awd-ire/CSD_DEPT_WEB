const firstPage = document.getElementById("first-page");
const secondPage = document.getElementById("second-page");
const thirdPage = document.getElementById("third-page");
const fourthPage = document.getElementById("fourth-page");
const fifthPage = document.getElementById("fifth-page");

// Main page flashcard data
const flashcardData = [
    { name: "2022-2023" },
    { name: "2023-2024" },
    { name: "2024-2025" },
    { name: "2024-2025" },
];

// Define related flashcard names for each main flashcard
const relatedFlashcardData = {
    "2022-2023": [
        { id: "2022-2023-1", name: "year 1", imageUrl: "image1.jpg" },
        { id: "2022-2023-2", name: "year 2", imageUrl: "image2.jpg" },
        { id: "2022-2023-3", name: "year 3", imageUrl: "image3.jpg" },
        { id: "2022-2023-4", name: "year 4", imageUrl: "image4.jpg" }
    ],
    "2023-2024": [
        { id: "2023-2024-1", name: "year 1 of 2023" },
        { id: "2023-2024-2", name: "Midyear Review 2023" },
        { id: "2023-2024-3", name: "2024 Kickoff" },
        { id: "2023-2024-4", name: "Year-End Insights" }
    ],
    "2024-2025": [
        { id: "2024-2025-1", name: "Key Events 2024" },
        { id: "2024-2025-2", name: "2024 Growth" },
        { id: "2024-2025-3", name: "Milestones of 2025" },
        { id: "2024-2025-4", name: "Future Outlook" }
    ],
};

// Define additional data for each second-page flashcard for the third page
const thirdPageData = {
    "2022-2023-1": [
        { id: "2022-2023-1-1", name: "Semester 1" },
        { id: "2022-2023-1-2", name: "Semester 2" }
    ],
    "2022-2023-2": [
        { id: "2022-2023-2-1", name: "First Semester" },
        { id: "2022-2023-2-2", name: "Second Semester" }
    ],
    // Add similar mappings for other second-page flashcards as needed
};

// Define additional data for each third-page flashcard for the fourth page
const fourthPageData = {
    "Semester 1": [
        { id: "semester-1-1", name: "math 1" },
        { id: "semester-1-2", name: "physics" },
        { id: "semester-1-3", name: "subject 3" },
        { id: "semester-1-4", name: "subject 4" },
        { id: "semester-1-5", name: "subject 5" }
    ],
    "Semester 2": [
        { id: "semester-2-1", name: "Module A" },
        { id: "semester-2-2", name: "Module B" }
    ],
    // Add more mappings as needed
};

// Define unique flashcards for each fourth-page flashcard for the fifth page
const fifthPageData = {
    "math 1": [
        { id: "subject-1-1", name: "module 1", downloadUrl: "1.pdf" },
        { id: "subject-1-2", name: "module 2", downloadUrl: "/downloads/topic2.pdf" },
        { id: "subject-1-3", name: "module 3", downloadUrl: "/downloads/topic3.pdf" },
        { id: "subject-1-4", name: "module 4", downloadUrl: "/downloads/topic3.pdf" },
        { id: "subject-1-5", name: "module 5", downloadUrl: "/downloads/topic3.pdf" },
        { id: "subject-1-6", name: "QB 1", downloadUrl: "/downloads/topic3.pdf" }
    ],
    "physics": [
        { id: "subject-2-1", name: "Concept A", downloadUrl: "/downloads/conceptA.pdf" },
        { id: "subject-2-2", name: "Concept B", downloadUrl: "/downloads/conceptB.pdf" }
    ],
    // Add other mappings as needed
};

// Function to generate flashcards on the main page
function generateFlashcards(flashcardData) {
    const count = flashcardData.length;
    const columns = Math.ceil(Math.sqrt(count));
    firstPage.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    firstPage.innerHTML = '';

    flashcardData.forEach((data) => {
        const flashcard = document.createElement("div");
        flashcard.className = "flashcard";

        if (data.name) {
            const name = document.createElement("p");
            name.textContent = data.name;
            flashcard.appendChild(name);
        }

        flashcard.addEventListener("click", (e) => {
            e.stopPropagation();
            showRelatedFlashcards(data.name);
        });

        firstPage.appendChild(flashcard);
    });
}

// Function to display the second page with related flashcards
function showRelatedFlashcards(mainFlashcardName) {
    firstPage.style.display = 'none';
    secondPage.style.display = 'flex'; // Ensure flex layout for alignment

    const relatedFlashcards = relatedFlashcardData[mainFlashcardName] || [];
    secondPage.innerHTML = ''; // Clear any existing flashcards

    relatedFlashcards.forEach((data) => {
        const flashcard = document.createElement("div");
        flashcard.className = "flashcard";
        flashcard.dataset.id = data.id;

        // Add image
        if (data.imageUrl) {
            const image = document.createElement("img");
            image.src = data.imageUrl;
            image.alt = data.name;
            flashcard.appendChild(image);
        }

        // Add hidden name
        const name = document.createElement("p");
        name.textContent = data.name;
        name.style.visibility = "hidden";
        flashcard.appendChild(name);

        // Add event listener to navigate to the third page
        flashcard.addEventListener("click", (e) => {
            e.stopPropagation();
            showThirdPage(data.id);
        });

        secondPage.appendChild(flashcard);
    });
}

// Function to display the third page with selected and additional flashcards
function showThirdPage(secondPageFlashcardId) {
    secondPage.style.display = 'none';
    thirdPage.style.display = 'grid';

    const selectedFlashcardData = thirdPageData[secondPageFlashcardId] || [];
    const columns = Math.ceil(Math.sqrt(selectedFlashcardData.length));
    thirdPage.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    thirdPage.innerHTML = '';
    selectedFlashcardData.forEach((data) => {
        const flashcard = document.createElement("div");
        flashcard.className = "flashcard";
        flashcard.dataset.id = data.id;

        if (data.name) {
            const name = document.createElement("p");
            name.textContent = data.name;
            flashcard.appendChild(name);
        }

        flashcard.addEventListener("click", (e) => {
            e.stopPropagation();
            showFourthPage(data.name);
        });

        thirdPage.appendChild(flashcard);
    });
}

// Function to display the fourth page with selected flashcards
function showFourthPage(thirdPageFlashcardName) {
    thirdPage.style.display = 'none';
    fourthPage.style.display = 'grid';

    const specificFlashcardData = fourthPageData[thirdPageFlashcardName] || [];
    const columns = Math.ceil(Math.sqrt(specificFlashcardData.length));
    fourthPage.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    fourthPage.innerHTML = '';
    specificFlashcardData.forEach((data) => {
        const flashcard = document.createElement("div");
        flashcard.className = "flashcard";
        flashcard.dataset.id = data.id;

        if (data.name) {
            const name = document.createElement("p");
            name.textContent = data.name;
            flashcard.appendChild(name);
        }

        flashcard.addEventListener("click", (e) => {
            e.stopPropagation();
            showFifthPage(data.name);
        });

        fourthPage.appendChild(flashcard);
    });
}

// Function to display the fifth page with dynamic flashcards
function showFifthPage(fourthPageFlashcardName) {
    fourthPage.style.display = 'none';
    fifthPage.style.display = 'grid';

    const specificFifthPageData = fifthPageData[fourthPageFlashcardName] || [];
    const columns = Math.ceil(Math.sqrt(specificFifthPageData.length));
    fifthPage.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    fifthPage.innerHTML = '';
    specificFifthPageData.forEach((data) => {
        const flashcard = document.createElement("div");
        flashcard.className = "flashcard";
        flashcard.dataset.id = data.id;

        if (data.name) {
            const name = document.createElement("p");
            name.textContent = data.name;
            flashcard.appendChild(name);
        }

        // Add download link if available
        if (data.downloadUrl) {
            const downloadLink = document.createElement("a");
            downloadLink.href = data.downloadUrl;
            downloadLink.textContent = "Download";
            downloadLink.target = "_blank";
            downloadLink.style.marginTop = "10px";
            downloadLink.style.color = "cyan";
            flashcard.appendChild(downloadLink);
        }

        fifthPage.appendChild(flashcard);
    });
}

// Initialize main page flashcards
generateFlashcards(flashcardData);
