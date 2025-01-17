export function dashDateStringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(s => Number(s));
    return new Date(year, month - 1, day);
}

export function getOneYearsTime(d: Date): Date {
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    return new Date(year + 1, month, day);
}
