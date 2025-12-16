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

    // Full-year "max" values so counters can start from the top and count down
    const totalDaysInYearExact = (endOfYear - startOfYear) / msInDay;
    const totalWeeksInYearExact = totalDaysInYearExact / 7;
    const totalHoursInYearExact = totalDaysInYearExact * 24;

    const monthsLeftDisplay = totalMonthsRemainingExact.toFixed(1);
    const weeksLeftDisplay = totalWeeksRemainingExact.toFixed(1);
    const daysLeftDisplay = totalDaysRemainingExact.toFixed(1);
    const hoursLeftDisplay = totalHoursRemainingExact.toFixed(1);

    const monthsStartDisplay = (totalDaysInYearExact / averageDaysPerMonth).toFixed(1);
    const weeksStartDisplay = totalWeeksInYearExact.toFixed(1);
    const daysStartDisplay = totalDaysInYearExact.toFixed(1);
    const hoursStartDisplay = totalHoursInYearExact.toFixed(1);

    // Update the main message (current date + % of year left)
    document.getElementById('current-date').textContent = formattedDate;
    document.getElementById('current-year').textContent = currentYear;
    const percentLeftEl = document.getElementById('percent-left');
    // Show percentage immediately (no animation for the headline)
    percentLeftEl.textContent = `${percentLeftDisplay}%`;

    // Build a simple, region-agnostic message for the Months card
    const monthsMessageEl = document.getElementById('months-message');
    if (monthsMessageEl) {
        const wholeMonthsLeft = Math.max(0, Math.ceil(totalMonthsRemainingExact));
        if (wholeMonthsLeft === 0) {
            monthsMessageEl.textContent = 'No full months left. Every day counts.';
        } else if (wholeMonthsLeft === 1) {
            monthsMessageEl.textContent = 'You have 1 more fresh start this year.';
        } else {
            monthsMessageEl.textContent = `You have ${wholeMonthsLeft} more fresh starts this year.`;
        }

        const monthsCard = document.querySelector('[data-card=\"months\"]');
        if (monthsCard && !monthsCard.dataset.messageBound) {
            monthsCard.addEventListener('mouseenter', () => {
                monthsMessageEl.classList.add('is-visible');
            });
            monthsCard.addEventListener('mouseleave', () => {
                monthsMessageEl.classList.remove('is-visible');
            });
            monthsCard.dataset.messageBound = 'true';
        }
    }

    // Weeks message (weekends remaining)
    const weeksMessageEl = document.getElementById('weeks-message');
    if (weeksMessageEl) {
        const wholeWeeksLeft = Math.max(0, Math.ceil(totalWeeksRemainingExact));
        const weekendsLeft = wholeWeeksLeft;
        if (weekendsLeft === 0) {
            weeksMessageEl.textContent = 'No full weekends left. Make today count.';
        } else if (weekendsLeft === 1) {
            weeksMessageEl.textContent = 'You have 1 more weekend to enjoy.';
        } else {
            weeksMessageEl.textContent = `You have ${weekendsLeft} more weekends to enjoy.`;
        }

        const weeksCard = document.querySelector('[data-card=\"weeks\"]');
        if (weeksCard && !weeksCard.dataset.messageBound) {
            weeksCard.addEventListener('mouseenter', () => {
                weeksMessageEl.classList.add('is-visible');
            });
            weeksCard.addEventListener('mouseleave', () => {
                weeksMessageEl.classList.remove('is-visible');
            });
            weeksCard.dataset.messageBound = 'true';
        }
    }

    // Days message (sunrises and sunsets)
    const daysMessageEl = document.getElementById('days-message');
    if (daysMessageEl) {
        const wholeDaysLeft = Math.max(0, Math.ceil(totalDaysRemainingExact));
        if (wholeDaysLeft === 0) {
            daysMessageEl.textContent = 'This is your last sunrise and sunset of the year.';
        } else if (wholeDaysLeft === 1) {
            daysMessageEl.textContent = 'You\'ll see 1 more sunrise and 1 more sunset.';
        } else {
            daysMessageEl.textContent = `You'll see ${wholeDaysLeft} more sunrises and sunsets.`;
        }

        const daysCard = document.querySelector('[data-card=\"days\"]');
        if (daysCard && !daysCard.dataset.messageBound) {
            daysCard.addEventListener('mouseenter', () => {
                daysMessageEl.classList.add('is-visible');
            });
            daysCard.addEventListener('mouseleave', () => {
                daysMessageEl.classList.remove('is-visible');
            });
            daysCard.dataset.messageBound = 'true';
        }
    }

    // Hours message (sleep time)
    const hoursMessageEl = document.getElementById('hours-message');
    if (hoursMessageEl) {
        const wholeDaysLeft = Math.max(0, Math.ceil(totalDaysRemainingExact));
        const sleepHoursPerDay = 7;
        const totalSleepHours = Math.round(wholeDaysLeft * sleepHoursPerDay);

        if (wholeDaysLeft === 0) {
            hoursMessageEl.textContent = 'Make every waking hour count.';
        } else if (wholeDaysLeft === 1) {
            hoursMessageEl.textContent = `At 7 hours of sleep per night, ${sleepHoursPerDay} of these hours will be spent sleeping.`;
        } else {
            hoursMessageEl.textContent = `At 7 hours of sleep per night, ${totalSleepHours.toLocaleString()} of these hours will be spent sleeping.`;
        }

        const hoursCard = document.querySelector('[data-card=\"hours\"]');
        if (hoursCard && !hoursCard.dataset.messageBound) {
            hoursCard.addEventListener('mouseenter', () => {
                hoursMessageEl.classList.add('is-visible');
            });
            hoursCard.addEventListener('mouseleave', () => {
                hoursMessageEl.classList.remove('is-visible');
            });
            hoursCard.dataset.messageBound = 'true';
        }
    }

    // Helper: create a split-flap style digit animation for a given container,
    // counting down from a start value string to an end value string.
    const applySplitFlap = (containerId, startValue, endValue) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        const [startIntRaw, startDecRaw = ''] = startValue.split('.');
        const [endIntRaw, endDecRaw = ''] = endValue.split('.');

        const intWrapper = document.createElement('span');
        intWrapper.className = 'stat-int';

        const decWrapper = document.createElement('span');
        decWrapper.className = 'stat-decimal';

        const makeDigit = (startChar, targetChar, wrapper, digitIndex) => {
            // Non-numeric characters are rendered statically
            if (!/^\d$/.test(targetChar)) {
                const staticSpan = document.createElement('span');
                staticSpan.textContent = targetChar;
                wrapper.appendChild(staticSpan);
                return;
            }

            const digitSpan = document.createElement('span');
            digitSpan.textContent = startChar;
            wrapper.appendChild(digitSpan);

            const target = parseInt(targetChar, 10);
            const totalFlips = 20 + Math.floor(Math.random() * 10); // more flips per digit for a slower feel
            let flips = 0;
            let current = parseInt(startChar, 10);

            const startDelay = digitIndex * 120; // larger stagger per digit

            setTimeout(() => {
                const interval = setInterval(() => {
                    digitSpan.textContent = String(current);

                    if (flips >= totalFlips && current === target) {
                        clearInterval(interval);
                        return;
                    }

                    current = (current - 1 + 10) % 10; // 9→8→…→0→9…
                    flips += 1;
                }, 80); // slower tick speed
            }, startDelay);
        };

        // Integer part digits (right-aligned so we don't introduce extra leading zeros)
        const endInt = endIntRaw;
        const intLen = endInt.length;
        for (let i = 0; i < intLen; i++) {
            const endChar = endInt[i];
            const startIndexFromRight = startIntRaw.length - intLen + i;
            const startChar =
                startIndexFromRight >= 0
                    ? startIntRaw[startIndexFromRight]
                    : '9';
            makeDigit(startChar, endChar, intWrapper, i);
        }

        container.appendChild(intWrapper);

        // Decimal part digits (including the dot) if present
        if (endDecRaw.length > 0) {
            const dotSpan = document.createElement('span');
            dotSpan.textContent = '.';
            decWrapper.appendChild(dotSpan);

            const decLen = endDecRaw.length;
            for (let i = 0; i < decLen; i++) {
                const endChar = endDecRaw[i];
                const startIndexFromRight = startDecRaw.length - decLen + i;
                const startChar =
                    startIndexFromRight >= 0
                        ? startDecRaw[startIndexFromRight]
                        : '9';
                makeDigit(startChar, endChar, decWrapper, i);
            }

            container.appendChild(decWrapper);
        }
    };

    // Apply split-flap style animation to all four stat cards,
    // counting down from full-year values to the remaining values.
    applySplitFlap('total-months', monthsStartDisplay, monthsLeftDisplay);
    applySplitFlap('total-weeks', weeksStartDisplay, weeksLeftDisplay);
    applySplitFlap('total-days', daysStartDisplay, daysLeftDisplay);
    applySplitFlap('total-hours', hoursStartDisplay, hoursLeftDisplay);
}

// Update on page load
document.addEventListener('DOMContentLoaded', updateTimeLeft);

// Optional: Update every hour
setInterval(updateTimeLeft, 3600000);
