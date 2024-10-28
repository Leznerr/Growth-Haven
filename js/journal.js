// DOM Elements
const journalTitleInput = document.getElementById('journal-title');
const journalInput = document.getElementById('journal-input');
const moodSelect = document.getElementById('mood');
const saveEntryBtn = document.getElementById('save-entry-btn');
const journalList = document.getElementById('journal-entries-list');

// Load journal entries when the page loads
document.addEventListener('DOMContentLoaded', loadEntries);

// Save a new journal entry when 'Save Entry' is clicked
saveEntryBtn.addEventListener('click', () => {
    const title = journalTitleInput.value.trim();
    const mood = moodSelect.value;
    const text = journalInput.value.trim();

    // Ensure all fields are filled
    if (!title || !text || !mood) {
        alert('Please enter a title, mood, and some thoughts.');
        return;
    }

    // Create a new journal entry object
    const entry = { 
        id: Date.now(), 
        title, 
        mood, 
        text, 
        date: new Date().toLocaleString() 
    };

    saveEntry(entry); // Save to LocalStorage
    addEntryToDOM(entry); // Render the entry in the DOM

    // Clear input fields
    journalTitleInput.value = '';
    journalInput.value = '';
    moodSelect.value = '';
});

// Save a journal entry to LocalStorage
function saveEntry(entry) {
    const entries = getEntries(); // Retrieve existing entries
    entries.push(entry); // Add new entry to the list
    localStorage.setItem('journalEntries', JSON.stringify(entries)); // Save updated list
}

// Load and display all journal entries
function loadEntries() {
    journalList.innerHTML = ''; // Clear existing entries to avoid duplicates
    const entries = getEntries(); // Retrieve entries from LocalStorage
    entries.forEach(addEntryToDOM); // Render each entry
}

// Add a journal entry to the DOM with edit and delete buttons
function addEntryToDOM(entry) {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    li.innerHTML = `
        <h5>${entry.title}</h5>
        <p><strong>Mood:</strong> ${entry.mood}</p>
        <p>${entry.text}</p>
        <small>${entry.date}</small>
        <button class="btn btn-warning btn-sm mt-2">Edit</button>
        <button class="btn btn-danger btn-sm mt-2">Delete</button>
    `;

    const editButton = li.querySelector('.btn-warning');
    const deleteButton = li.querySelector('.btn-danger');

    // Attach delete functionality
    deleteButton.addEventListener('click', () => deleteEntry(entry.id, li));

    // Attach edit functionality
    editButton.addEventListener('click', () => switchToEditMode(entry, li));

    journalList.appendChild(li); // Add the entry to the DOM
}

// Switch an entry to edit mode
function switchToEditMode(entry, li) {
    li.innerHTML = `
        <input type="text" class="form-control mb-2" value="${entry.title}" />
        <textarea class="form-control mb-2">${entry.text}</textarea>
        <select class="form-control mb-2">
            <option value="Happy" ${entry.mood === 'Happy' ? 'selected' : ''}>Happy 😊</option>
            <option value="Neutral" ${entry.mood === 'Neutral' ? 'selected' : ''}>Neutral 😐</option>
            <option value="Stressed" ${entry.mood === 'Stressed' ? 'selected' : ''}>Stressed 😰</option>
        </select>
        <button class="btn btn-success btn-sm mt-2">Save Changes</button>
    `;

    const saveChangesButton = li.querySelector('.btn-success');
    const titleInput = li.querySelector('input');
    const textArea = li.querySelector('textarea');
    const moodSelect = li.querySelector('select');

    // Save the changes when 'Save Changes' is clicked
    saveChangesButton.addEventListener('click', () => {
        entry.title = titleInput.value.trim();
        entry.text = textArea.value.trim();
        entry.mood = moodSelect.value;

        updateEntry(entry); // Update entry in LocalStorage
        li.innerHTML = ''; // Clear content before reloading
        addEntryToDOM(entry); // Reload updated entry in the DOM
    });
}

// Delete an entry from the DOM and LocalStorage
function deleteEntry(id, entryElement) {
    entryElement.remove(); // Remove from DOM
    const updatedEntries = getEntries().filter(entry => entry.id !== id); // Filter out deleted entry
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries)); // Save updated list
}

// Update an entry in LocalStorage
function updateEntry(updatedEntry) {
    const entries = getEntries().map(entry =>
        entry.id === updatedEntry.id ? updatedEntry : entry
    );
    localStorage.setItem('journalEntries', JSON.stringify(entries)); // Save updated entries
}

// Retrieve all journal entries from LocalStorage
function getEntries() {
    return JSON.parse(localStorage.getItem('journalEntries')) || []; // Return an empty array if no entries exist
}
