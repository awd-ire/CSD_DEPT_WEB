const baseURL = 'http://localhost:3000'; // Base API URL

// Function to fetch notes and display them
function fetchNotes() {
    fetch(`${baseURL}/notes`)
        .then(response => response.json())
        .then(data => {
            const notesContainer = document.getElementById('notesContainer');
            notesContainer.innerHTML = ''; // Clear existing notes

            data.forEach(note => {
                // Create flashcards
                const flashcard = document.createElement('div');
                flashcard.classList.add('flashcard');
                flashcard.innerHTML = `
                    <h2>${note.subject_name}</h2>
                    <button onclick="downloadFile(${note.notes_id})">Download</button>
                `;
                notesContainer.appendChild(flashcard);
            });
        })
        .catch(err => console.error('Error fetching notes:', err));
}

// Function to download file
function downloadFile(fileId) {
    const url = `${baseURL}/download-note/${fileId}`;
    window.location.href = url; // Redirect to download endpoint
}

// Fetch notes on page load
window.onload = fetchNotes;
