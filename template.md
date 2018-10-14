# Awesome SEO

{{lastUpdateBadge}}
[![Join the chat at https://gitter.im/teles/awesome-seo](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92%20-brightgreen.svg?style=flat-square)](https://gitter.im/teles/awesome-seo?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> A curated list of seo links!

[br]: https://upload.wikimedia.org/wikipedia/commons/4/40/Icons-flag-br.png  "Conteúdo disponível em português"

{{#each this}}    
## {{@key}}
    {{#each this}}
* [{{link.title}}]({{link.href}}) {{#if link.description}}- {{link.description}} {{/if}} {{#equal link.language 'Português'}}![brazilian flag][br]{{/equal}}
    {{/each}}
    
{{/each}}

## License

[![CC0](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)

To the extent possible under law, [Jota Teles](http://github.com/teles) has waived all copyright and related or neighboring rights to this work.