function updateTimeLeft() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);
    const startOfYear = new Date(currentYear, 0, 1);
    const msInHour = 1000 * 60 * 60;
    const msInDay = msInHour * 24;

    // Format current date
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-GB', options);

    // Calculate time remaining
    const msRemaining = endOfYear - now;
    const totalDaysRemainingExact = msRemaining / msInDay;
    const daysRemaining = Math.ceil(totalDaysRemainingExact);

    // Calculate total length of the year (handles leap years correctly)
    const totalMsInYear = endOfYear - startOfYear;
    const percentLeftExact = (msRemaining / totalMsInYear) * 100;
    const percentLeftDisplay = percentLeftExact.toFixed(1);

    // Calculate total remaining time in various units (with one decimal)
    const totalHoursRemainingExact = msRemaining / msInHour;
    const totalWeeksRemainingExact = totalDaysRemainingExact / 7;
    const averageDaysPerMonth = 365.2425 / 12; // average month length
    const totalMonthsRemainingExact = totalDaysRemainingExact / averageDaysPerMonth;

    const monthsLeftDisplay = totalMonthsRemainingExact.toFixed(1);
    const weeksLeftDisplay = totalWeeksRemainingExact.toFixed(1);
    const daysLeftDisplay = totalDaysRemainingExact.toFixed(1);
    const hoursLeftDisplay = totalHoursRemainingExact.toFixed(1);

    // Update the main message (current date + % of year left)
    document.getElementById('current-date').textContent = formattedDate;
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('percent-left').textContent = `${percentLeftDisplay}%`;

    // Helper to wrap decimal part in a smaller span
    const formatWithDecimalSpan = (value) => {
        const parts = value.split('.');
        if (parts.length === 1) {
            return value;
        }
        const [intPart, decimalPart] = parts;
        return `<span class="stat-int">${intPart}</span><span class="stat-decimal">.${decimalPart}</span>`;
    };

    // Update total stats cards (time left in the year) with styled decimals
    document.getElementById('total-months').innerHTML = formatWithDecimalSpan(monthsLeftDisplay);
    document.getElementById('total-weeks').innerHTML = formatWithDecimalSpan(weeksLeftDisplay);
    document.getElementById('total-days').innerHTML = formatWithDecimalSpan(daysLeftDisplay);
    document.getElementById('total-hours').innerHTML = formatWithDecimalSpan(hoursLeftDisplay);
}

// Update on page load
document.addEventListener('DOMContentLoaded', updateTimeLeft);

// Optional: Update every hour
setInterval(updateTimeLeft, 3600000);
