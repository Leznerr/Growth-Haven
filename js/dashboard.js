// Ensure dashboard updates as soon as the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
  updateDashboard();
});

// Function to update all sections of the dashboard with latest data.
function updateDashboard() {
  const goals = getGoals();                // Retrieve saved goals.
  const journalEntries = getJournalEntries();  // Retrieve saved journal entries.
  const habits = getHabits();              // Retrieve saved habits.

  // Update Goals: Display total and completed goals.
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal =>
    goal.milestones.every(m => m.completed) // Check if all milestones in a goal are completed.
  ).length;
  document.getElementById('total-goals').textContent = totalGoals;
  document.getElementById('completed-goals').textContent = completedGoals;

  // Update Recent Journal Entries: Display the latest three entries.
  const recentJournalEntries = document.getElementById('recent-journal-entries');
  recentJournalEntries.innerHTML = ''; // Clear the list before re-rendering.
  journalEntries.slice(-3).forEach(entry => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = entry.title;
    recentJournalEntries.appendChild(li);
  });

  // Update Progress: Calculate overall progress based on completed milestones.
  const overallProgress = calculateOverallProgress(goals);
  const progressBar = document.getElementById('overall-progress-bar');
  progressBar.style.width = `${overallProgress}%`;
  progressBar.textContent = `${overallProgress}%`;
  progressBar.setAttribute('aria-valuenow', overallProgress);

  // Update Habits: Show number of active habits and longest streak.
  const activeHabits = habits.length;
  document.getElementById('active-habits').textContent = activeHabits;

  const longestStreak = Math.max(...habits.map(habit => habit.streak), 0);
  document.getElementById('longest-streak').textContent = `${longestStreak} days`;
}

// Retrieve and parse goals stored in localStorage.
function getGoals() {
  return JSON.parse(localStorage.getItem('goals')) || [];
}

// Retrieve and parse journal entries stored in localStorage.
function getJournalEntries() {
  return JSON.parse(localStorage.getItem('journalEntries')) || [];
}

// Retrieve and parse habits stored in localStorage.
function getHabits() {
  return JSON.parse(localStorage.getItem('habits')) || [];
}

// Calculate overall progress as a percentage of completed milestones.
function calculateOverallProgress(goals) {
  if (goals.length === 0) return 0; // Return 0% if no goals exist.

  const totalMilestones = goals.reduce((acc, goal) => acc + goal.milestones.length, 0);
  const completedMilestones = goals.reduce((acc, goal) =>
    acc + goal.milestones.filter(m => m.completed).length, 0
  );

  // Calculate progress percentage, handling edge case where no milestones exist.
  return totalMilestones === 0 ? 0 : Math.round((completedMilestones / totalMilestones) * 100);
}
