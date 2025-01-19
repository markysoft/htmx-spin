export const holidayTemplate = `
<div class="content">
    <h2 class="title has-text-primary-15">Bank Holidays</h2>

    {{@each(it.holidays) => holiday, index}}
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">{{holiday.title}}</p>
            </header>
            <div class="card-content">
                <div class="content has-text-centered">
                    {{holiday.dateString}}
                </div>
            </div>
        </div>
    {{/each}}
</div>
`