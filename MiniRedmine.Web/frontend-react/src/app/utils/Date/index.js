// src/app/utils/dateUtils.js

export function formatDate(date) {
    return date.toISOString().split('T')[0];
}

export function calculateQuincena() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    if (today.getDate() <= 15) {
        return {
            from: formatDate(new Date(year, month, 1)),
            to: formatDate(new Date(year, month, 15)),
        };
    } else {
        const lastDay = new Date(year, month + 1, 0);
        return {
            from: formatDate(new Date(year, month, 16)),
            to: formatDate(lastDay),
        };
    }
}

export function calculateWorkdays(from, to) {
    const workdays = [];
    let current = new Date(from);
    const end = new Date(to);

    while (current <= end) {
        const day = current.getDay();
        if (day !== 0 && day !== 6) {
            workdays.push(formatDate(current));
        }
        current.setDate(current.getDate() + 1);
    }
    return workdays;
}

export function calculateDays(from, to) {
    const [year, month, day] = from.split('-').map(Number);
    let current = new Date(Date.UTC(year, month - 1, day));

    const [endYear, endMonth, endDay] = to.split('-').map(Number);
    const end = new Date(Date.UTC(endYear, endMonth - 1, endDay));

    const days = [];
    while (current <= end) {
        const dayOfWeek = current.getUTCDay();  // Correct day calculation in UTC
        days.push({
            date: formatDate(current),
            isWeekend: dayOfWeek === 0 || dayOfWeek === 6
        });
        current.setUTCDate(current.getUTCDate() + 1);  // Advance in UTC context
    }
    return days;
}

export function formatDateWithDayName(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day)); // Ensures correct day

    const dayName = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        timeZone: 'UTC' // Force UTC rendering
    });

    return `${dayName} ${dateString}`;
}
