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
    const days = [];
    let current = new Date(from);
    const end = new Date(to);

    while (current <= end) {
        const dayOfWeek = current.getDay();
        days.push({
            date: formatDate(current),
            isWeekend: dayOfWeek === 0 || dayOfWeek === 6
        });
        current.setDate(current.getDate() + 1);
    }
    return days;
}

export function formatDateWithDayName(dateString) {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return `${dayName} ${dateString}`;
}
