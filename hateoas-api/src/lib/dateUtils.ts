const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export function dashDateStringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(s => Number(s))
    return new Date(year, month - 1, day)
}

export function getOneYearsTime(d: Date): Date {
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    return new Date(year + 1, month, day)
}

export function toFriendlyDate(d: Date): string {
    return `${dayNames[d.getDay()]} ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`

}