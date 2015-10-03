# Awesome SEO
{{lastUpdateBadge}}

    A curated list of seo links!
[br]: https://upload.wikimedia.org/wikipedia/commons/4/40/Icons-flag-br.png  "Conteúdo disponível em português"

{{#each this}}    
## {{@key}}
    {{#each this}}
* [{{link.title}}]({{link.href}}) {{#if link.description}}- {{link.description}} {{/if}} {{#equal link.language 'Português'}}![brazilian flag][br]{{/equal}}
    {{/each}}
    
{{/each}}

## LICENSE

![CC0 Badge](http://mirrors.creativecommons.org/presskit/buttons/88x31/svg/publicdomain.svg)

You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission. See Other Information [in license file](LICENSE).