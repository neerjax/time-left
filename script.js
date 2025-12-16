function updateTimeLeft() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);
    const startOfYear = new Date(currentYear, 0, 1);

    // Format current date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-GB', options);

    // Calculate time remaining
    const msRemaining = endOfYear - now;
    const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));
    const weeksRemaining = Math.floor(daysRemaining / 7);
    const monthsRemaining = 11 - now.getMonth();

    // Calculate total time in year
    const totalDaysInYear = Math.ceil((endOfYear - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
    const totalWeeksInYear = Math.floor(totalDaysInYear / 7);
    const totalHoursInYear = totalDaysInYear * 24;

    // Update the main message
    document.getElementById('current-date').textContent = formattedDate;
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('months-remaining').textContent = monthsRemaining;
    document.getElementById('weeks-remaining').textContent = weeksRemaining;
    document.getElementById('days-remaining').textContent = daysRemaining;

    // Update total stats cards
    document.getElementById('total-months').textContent = '12';
    document.getElementById('total-weeks').textContent = totalWeeksInYear;
    document.getElementById('total-days').textContent = totalDaysInYear;
    document.getElementById('total-hours').textContent = totalHoursInYear.toLocaleString();
}

// Update on page load
document.addEventListener('DOMContentLoaded', updateTimeLeft);

// Optional: Update every hour
setInterval(updateTimeLeft, 3600000);
