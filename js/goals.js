// DOM Elements
const goalTitleInput = document.getElementById('goal-title');
const goalDescriptionInput = document.getElementById('goal-description');
const goalDeadlineInput = document.getElementById('goal-deadline');
const addGoalBtn = document.getElementById('add-goal-btn');
const goalList = document.getElementById('goal-list');

// Load goals from LocalStorage when the page loads
document.addEventListener('DOMContentLoaded', loadGoals);

// Save a new goal when the 'Add Goal' button is clicked
addGoalBtn.addEventListener('click', () => {
    const title = goalTitleInput.value.trim();
    const description = goalDescriptionInput.value.trim();
    const deadline = goalDeadlineInput.value;

    // Validation to ensure all fields are filled
    if (!title || !description || !deadline) {
        alert('Please fill out all fields.');
        return;
    }

    // Create a new goal object
    const goal = {
        id: Date.now(),
        title,
        description,
        deadline,
        milestones: [],
        completedMilestones: 0,
    };

    saveGoal(goal); // Save the goal to LocalStorage
    addGoalToDOM(goal); // Display the goal on the page

    // Clear input fields
    goalTitleInput.value = '';
    goalDescriptionInput.value = '';
    goalDeadlineInput.value = '';
});

// Save the goal in LocalStorage
function saveGoal(goal) {
    const goals = getGoals(); // Retrieve existing goals
    goals.push(goal); // Add new goal to the list
    localStorage.setItem('goals', JSON.stringify(goals)); // Save updated list
}

// Load and display all saved goals
function loadGoals() {
    goalList.innerHTML = ''; // Clear the list to prevent duplicates
    const goals = getGoals(); // Retrieve saved goals
    goals.forEach(addGoalToDOM); // Render each goal
}

// Display a goal in the DOM
function addGoalToDOM(goal) {
    const li = document.createElement('li');
    li.className = 'list-group-item mb-3';

    li.innerHTML = `
        <h5 class="text-center">${goal.title}</h5>
        <p class="text-center">${goal.description}</p>
        <small class="d-block text-center">Deadline: ${goal.deadline}</small>
        <div class="text-center mt-2">
            Progress: <strong class="progress-percentage">${getProgress(goal)}%</strong>
        </div>
        <div class="progress mt-2">
            <div class="progress-bar bg-success" role="progressbar" 
                 style="width: ${getProgress(goal)}%;" 
                 aria-valuenow="${getProgress(goal)}" aria-valuemin="0" aria-valuemax="100">
                ${getProgress(goal)}%
            </div>
        </div>
        <button class="btn btn-secondary btn-sm mt-3">Add Milestone</button>
        <ul class="milestone-list mt-2" id="milestones-${goal.id}"></ul>
        <button class="btn btn-danger btn-sm mt-2">Delete Goal</button>
    `;

    const addMilestoneBtn = li.querySelector('.btn-secondary');
    const deleteGoalBtn = li.querySelector('.btn-danger');
    const milestoneList = li.querySelector(`#milestones-${goal.id}`);
    const progressBar = li.querySelector('.progress-bar');
    const progressPercentage = li.querySelector('.progress-percentage');

    // Add a milestone to the goal
    addMilestoneBtn.addEventListener('click', () => {
        const milestone = prompt('Enter a new milestone:');
        if (milestone) {
            goal.milestones.push({ text: milestone, completed: false });
            updateGoal(goal); // Update goal in LocalStorage
            renderMilestones(goal, milestoneList, progressBar, progressPercentage); // Refresh UI
        }
    });

    // Delete a goal
    deleteGoalBtn.addEventListener('click', () => deleteGoal(goal.id, li));

    // Render existing milestones and append goal to the list
    renderMilestones(goal, milestoneList, progressBar, progressPercentage);
    goalList.appendChild(li);
}

// Render milestones for a specific goal
function renderMilestones(goal, milestoneList, progressBar, progressPercentage) {
    milestoneList.innerHTML = ''; // Clear existing milestones

    goal.milestones.forEach((milestone, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';

        li.innerHTML = `
            ${milestone.text}
            <button class="btn btn-sm ${milestone.completed ? 'btn-success' : 'btn-outline-success'}">
                ${milestone.completed ? 'Completed' : 'Mark Complete'}
            </button>
        `;

        const completeBtn = li.querySelector('button');
        completeBtn.addEventListener('click', () => {
            milestone.completed = !milestone.completed; // Toggle completion status
            goal.completedMilestones = goal.milestones.filter(m => m.completed).length;

            updateGoal(goal); // Update goal data
            renderMilestones(goal, milestoneList, progressBar, progressPercentage); // Refresh UI
            updateProgressBar(goal, progressBar, progressPercentage); // Update progress
        });

        milestoneList.appendChild(li);
    });

    updateProgressBar(goal, progressBar, progressPercentage); // Refresh progress bar
}

// Update the progress bar dynamically
function updateProgressBar(goal, progressBar, progressPercentage) {
    const progress = getProgress(goal); // Calculate progress percentage
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
    progressPercentage.textContent = `${progress}%`;

    // Change progress bar color if goal is fully completed
    if (progress === 100) {
        progressBar.classList.remove('bg-success');
        progressBar.classList.add('bg-primary');
    } else {
        progressBar.classList.remove('bg-primary');
        progressBar.classList.add('bg-success');
    }
}

// Calculate goal progress percentage
function getProgress(goal) {
    if (goal.milestones.length === 0) return 0; // No milestones, no progress
    return Math.round((goal.completedMilestones / goal.milestones.length) * 100);
}

// Delete a goal from LocalStorage and DOM
function deleteGoal(id, element) {
    element.remove(); // Remove from DOM
    const updatedGoals = getGoals().filter(goal => goal.id !== id); // Remove from list
    localStorage.setItem('goals', JSON.stringify(updatedGoals)); // Save updated list
}

// Update an existing goal in LocalStorage
function updateGoal(updatedGoal) {
    const goals = getGoals().map(goal =>
        goal.id === updatedGoal.id ? updatedGoal : goal
    );
    localStorage.setItem('goals', JSON.stringify(goals)); // Save updated list
}

// Retrieve goals from LocalStorage
function getGoals() {
    return JSON.parse(localStorage.getItem('goals')) || []; // Default to empty array
}
