export const holidayTemplate = `
<div class="content">
    <ul>
    {{@each(it.holidays) => holiday, index}}
        <li>{{holiday.title}} is on {{holiday.dateString}}</li>
    {{/each}}
    </ul>
</div>
`