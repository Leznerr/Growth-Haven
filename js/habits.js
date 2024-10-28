// DOM Elements
const habitNameInput = document.getElementById('habit-name');
const addHabitBtn = document.getElementById('add-habit-btn');
const habitList = document.getElementById('habit-list');

// Load habits from LocalStorage when the page loads
document.addEventListener('DOMContentLoaded', loadHabits);

// Add a new habit when the 'Add Habit' button is clicked
addHabitBtn.addEventListener('click', () => {
    const habitName = habitNameInput.value.trim();

    // Ensure habit name is provided
    if (!habitName) {
        alert('Please enter a habit.');
        return;
    }

    // Create a new habit object
    const habit = {
        id: Date.now(),
        name: habitName,
        datesCompleted: [], // Track completed dates
        streak: 0 // Initialize the streak count
    };

    saveHabit(habit); // Save habit to LocalStorage
    addHabitToDOM(habit); // Render the habit in the DOM
    habitNameInput.value = ''; // Clear input field
});

// Save a habit to LocalStorage
function saveHabit(habit) {
    const habits = getHabits(); // Retrieve current habits
    habits.push(habit); // Add new habit to list
    localStorage.setItem('habits', JSON.stringify(habits)); // Save updated list
}

// Load and display all saved habits
function loadHabits() {
    habitList.innerHTML = ''; // Clear existing habits to prevent duplication
    const habits = getHabits(); // Retrieve saved habits
    habits.forEach(addHabitToDOM); // Render each habit
}

// Add a habit to the DOM
function addHabitToDOM(habit) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = habit.name;

    const streakSpan = document.createElement('span');
    streakSpan.className = 'ms-2 text-muted';
    streakSpan.textContent = `Streak: ${habit.streak} days`;

    const completeBtn = document.createElement('button');
    completeBtn.className = 'btn btn-sm ' + 
        (isTodayCompleted(habit) ? 'btn-success' : 'btn-outline-success');
    completeBtn.textContent = isTodayCompleted(habit) ? 'Completed' : 'Mark Complete';
    completeBtn.addEventListener('click', () => toggleComplete(habit, completeBtn, streakSpan));

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteHabit(habit.id, li));

    li.appendChild(span);
    li.appendChild(streakSpan);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    habitList.appendChild(li);
}

// Check if the habit is completed today
function isTodayCompleted(habit) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return habit.datesCompleted.includes(today); // Check if today's date is in the list
}

// Toggle between 'Mark Complete' and 'Completed'
function toggleComplete(habit, button, streakSpan) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date

    if (!habit.datesCompleted.includes(today)) {
        habit.datesCompleted.push(today); // Mark as completed
        button.textContent = 'Completed';
        button.classList.remove('btn-outline-success');
        button.classList.add('btn-success');
    } else {
        habit.datesCompleted = habit.datesCompleted.filter(date => date !== today); // Undo completion
        button.textContent = 'Mark Complete';
        button.classList.remove('btn-success');
        button.classList.add('btn-outline-success');
    }

    habit.streak = calculateStreak(habit); // Recalculate streak
    streakSpan.textContent = `Streak: ${habit.streak} days`; // Update streak display
    updateHabit(habit); // Save updated habit
}

// Calculate the current streak for a habit
function calculateStreak(habit) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    let streak = 0;

    // Iterate through completed dates to determine consecutive streaks
    for (let i = habit.datesCompleted.length - 1; i >= 0; i--) {
        const date = new Date(habit.datesCompleted[i]);
        const difference = (new Date(today) - date) / (1000 * 60 * 60 * 24); // Calculate date difference

        if (difference === streak) {
            streak++; // Increment streak if consecutive
        } else {
            break; // Stop if non-consecutive
        }
    }

    return streak; // Return calculated streak
}

// Update habit in LocalStorage
function updateHabit(updatedHabit) {
    const habits = getHabits().map(habit =>
        habit.id === updatedHabit.id ? updatedHabit : habit
    );
    localStorage.setItem('habits', JSON.stringify(habits)); // Save updated habits
}

// Delete a habit from LocalStorage and remove it from the DOM
function deleteHabit(id, element) {
    element.remove(); // Remove from DOM
    const updatedHabits = getHabits().filter(habit => habit.id !== id); // Filter out deleted habit
    localStorage.setItem('habits', JSON.stringify(updatedHabits)); // Save updated list
}

// Retrieve all habits from LocalStorage
function getHabits() {
    return JSON.parse(localStorage.getItem('habits')) || []; // Default to empty array if no habits found
}
