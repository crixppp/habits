// Store habit counters and reset time tracking
let habits = {
    habit1: { count: 0, lastTick: null },
    habit2: { count: 0, lastTick: null }
};

// Track habit function
function trackHabit(habitId) {
    let today = new Date().toDateString();
    let habit = habits[habitId];
    
    // Check if it's a new day
    if (habit.lastTick !== today) {
        habit.count += 1;
        habit.lastTick = today;
        
        // Check milestone
        if ([5, 10, 20].includes(habit.count)) {
            showPopup(habit.count);
        }

        // Update counter display
        document.getElementById(`counter-${habitId}`).textContent = habit.count;
    } else {
        alert("You've already ticked this habit today!");
    }
}

// Show milestone popup
function showPopup(count) {
    let popup = document.getElementById("popup");
    document.getElementById("milestone-count").textContent = `Streak of ${count}!`;
    popup.style.display = "block";
    
    // Hide popup after 2 seconds
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

// Reset counters at midnight
function resetCounters() {
    let now = new Date();
    let nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    let timeToMidnight = nextDay - now;

    setTimeout(() => {
        for (let habitId in habits) {
            habits[habitId].count = 0;
            habits[habitId].lastTick = null;
            document.getElementById(`counter-${habitId}`).textContent = 0;
        }
        resetCounters(); // Schedule next reset
    }, timeToMidnight);
}

resetCounters(); // Start the first reset cycle
