# Awesome SEO
    A curated list of seo links!
[br]: https://upload.wikimedia.org/wikipedia/commons/4/40/Icons-flag-br.png  "Conteúdo disponível em português"
{{lastUpdateBadge}}

{{#each this}}    
## {{@key}}
    {{#each this}}
* [{{link.title}}]({{link.href}}) {{#if link.description}}- {{link.description}} {{/if}} {{#equal link.language 'Português'}}![brazilian flag][br]{{/equal}}
    {{/each}}
    
{{/each}}