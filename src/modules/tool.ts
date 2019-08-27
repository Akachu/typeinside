export function dateFormat(t: Date): string {
    return t.getFullYear() + [t.getMonth() + 1, t.getDate(), t.getHours()].map(n => ('0' + n).slice(-2)).join('');
};

