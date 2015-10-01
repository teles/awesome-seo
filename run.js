GLOBAL = {};
GLOBAL.endpoint_url = "http://sheetsu.com/apis/736acdf9";
GLOBAL.template_url = "template.md";
GLOBAL.readme_url = "README.md";

var http = require("http");
var handlebars = require('handlebars');
var fs = require('fs');

handlebars.registerHelper('equal', function(lvalue, rvalue, options) {
    if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
    if( lvalue!=rvalue ) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

var request = http.get(GLOBAL.endpoint_url, function (response) {
    var buffer = "";
    var data;
    var result;

    response.on("data", function (chunk) {
        buffer += chunk;
    }); 

    response.on("end", function (err) {
        data = JSON.parse(buffer);
        var results = data.result;
        var links = parseResultToLinks(results);        
        var categoriesMap = arrayLinksToMap(links);
        imprimeLinksParaREADME(categoriesMap);        

    }); 
});

function Link(title, href, description, category, language, tags){
    this.title = title;
    this.href = href;
    this.description = description;
    this.category = category;
    this.language = language;
    this.tags = tags;
}

function Category(name, link){
    this.name =  name;
    this.link =  link;
}

function arrayLinksToMap(links){
    var categoriesMap = {};

    for(var i=0; i < links.length; i++) {
        var link = links[i];            
        var categoryName = link.category.toString().trim();
        var category = new Category(categoryName, link);

        if(!categoriesMap[categoryName]){
            categoriesMap[categoryName] = [category];
        }
        else{
            categoriesMap[categoryName].push(category)    
        }
    }    
    return categoriesMap;
}

function parseResultToLinks(results){
    var links = [];
    for(var i=results.length-1; i >= 0; i--){
        var result = results[i];
        var title = result['Título'];
        var href = result['Link'];
        var description = result['Descrição'];
        var category = result['Categoria'];
        var language = result['Idioma'];
        var tags = result['Tags'].split(",");
        var link = new Link(title, href, description, category, language, tags);
        links.push(link);
    }
    return links;
}

function imprimeLinksParaREADME(links){
	fs.readFile(GLOBAL.template_url, 'utf-8', function(error, source){
		var template = handlebars.compile(source);
		var markdown = template(links);
        console.log(markdown);
		fs.writeFile(GLOBAL.readme_url, markdown, function(err) {	
			if(err) {
		    	return console.log(err);
			}
		}); 
	});	
}