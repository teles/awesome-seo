# Awesome SEO
    A curated list of seo links!

{{#each this}}    
## {{@key}}
    {{#each this}}
* [{{link.title}}]({{link.href}}) {{#if link.description}}- {{link.description}} {{/if}}    
    {{/each}}
    
{{/each}}