# Growth Haven  
#### Video Demo: [https://youtu.be/e8V6ZsiJ9NA]

---

## Description
Growth Haven is a lightweight, web-based productivity tool that enables users to manage personal growth by setting and tracking goals, building positive habits, and journaling their experiences. It consolidates three core features—goals, habits, and journal entries—into an intuitive interface, helping users stay organized and focused on self-improvement.

The project leverages **HTML**, **CSS**, **JavaScript**, and **Bootstrap** to create a responsive and engaging interface, with all data stored in **localStorage** for persistence across sessions without requiring a backend. The dashboard gives users an overview of their activities, making it easy to track milestones, maintain streaks, and reflect on their progress.

---

## Features Overview

### 1. Dashboard  
- Provides a high-level view of user data, such as the total number of goals, habits, and recent journal entries.  
- Visual progress bars track goal completion percentages dynamically.

### 2. Goals Module  
- Users can create, edit, and delete goals.  
- Each goal supports milestones, which update progress automatically.  
- Deadlines are displayed to help users stay accountable.

### 3. Habit Tracker  
- Users can add and delete daily habits.  
- Each habit tracks its completion status and maintains streaks for consistency.  
- Provides a toggle to mark habits as complete or incomplete for the day.

### 4. Journal  
- Users can write journal entries with a mood selector to track emotional well-being.  
- Entries are editable and deletable directly from the interface.  
- Provides a date and timestamp for each entry.

---

## Technologies Used
- **HTML**: Structure and layout of the web pages.  
- **CSS**: Styling for a clean, consistent, and responsive design.  
- **Bootstrap**: CSS framework for responsiveness and UI components.  
- **JavaScript**: Logic for user interactions, form handling, and data management.  
- **localStorage**: Persistent storage for user data on the client side.

---

## How It Works

- **Dashboard**: Displays an overview of goals, habits, and recent journal entries, with dynamic progress bars.  
- **Goals Module**: Users can create goals with deadlines and add milestones. Progress updates automatically when milestones are marked as completed.  
- **Habit Tracker**: Users track habits daily. Streaks are updated dynamically based on daily completions.  
- **Journal**: Users write journal entries, select moods, and manage entries through edit and delete options.

---

## Project Files Overview

- **`index.html`**: The main landing page with links to other sections of the app.  
- **`dashboard.html`**: Displays a summary of the user's goals, habits, and journal entries.  
- **`goals.html`**: Allows users to create and track personal goals with milestones.  
- **`habits.html`**: Manages daily habits and streaks.  
- **`journal.html`**: Provides a journaling feature with mood tracking.  
- **`css/styles.css`**: Custom CSS styles for consistent theming and layout.  
- **`js/dashboard.js`**: Handles data display and updates on the dashboard.  
- **`js/goals.js`**: Manages goal-related CRUD operations and milestone tracking.  
- **`js/habits.js`**: Handles habit tracking and streak calculation logic.  
- **`js/journal.js`**: Manages journal entries, including editing and deletion.

---

## Design Decisions
- **localStorage**: I opted for localStorage to avoid the complexity of setting up a backend or database. This makes the app simple to run and ensures that all data persists on the user’s machine.  
- **JavaScript-Only Logic**: All interactions are managed through JavaScript to keep the project lightweight. This design allows for smooth, fast user interactions without requiring server requests.  
- **Modular Structure**: Each feature—goals, habits, and journals—is separated into individual scripts and HTML files for easier maintenance and scalability.  

---

## Challenges and Lessons Learned
- **Managing State Without a Backend**: Using localStorage to maintain data integrity across sessions required careful planning. I implemented modular functions to ensure data consistency and reusability.  
- **Dynamic Progress Tracking**: Implementing real-time progress updates for goals and habits was a challenge. I optimized the use of event listeners and DOM manipulation for a smooth user experience.  
- **Responsive Design**: Using Bootstrap and CSS ensured that the app looks good on different screen sizes, but I had to tweak some elements to align properly.

---

## Future Enhancements
- **User Authentication**: Add a backend to allow for cross-device synchronization and secure login.  
- **Notifications**: Implement reminders to help users stay on top of their goals and habits.  
- **Data Visualization**: Integrate charts or graphs to provide visual feedback on user progress.

---

## Acknowledgement
This project is submitted as part of the **CS50 final project**. External tools like **ChatGPT** were used to assist in improving the efficiency and development process, but all work is original, with the essence of the project design and logic being my own.
