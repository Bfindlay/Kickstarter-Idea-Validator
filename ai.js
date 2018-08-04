var Classifier = require('wink-naive-bayes-text-classifier');
var nbc = Classifier();
var nlp = require('wink-nlp-utils');
var fs = require('fs');
var stream = fs.createReadStream('Data/ks-projects-201612.csv');
var csv = require("fast-csv");
 
nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 0.5 });
csv.fromStream(stream, {headers : true}).on("data", function(data){
    const { name, main_category } = data;
    nbc.learn( name, main_category );

}).on("end", function(){
    nbc.consolidate();
    console.log("done");
    console.log(nbc.predict("pet feeding dog walking with human"));
    console.log(nbc.predict("cat food fishing"));
    console.log(nbc.predict("iphone app computer"));
    console.log(nbc.predict("draaw books testing studio"));
    console.log(nbc.predict("music sound facter"));
    console.log(nbc.predict("pet feeding dog walking with cat"));
    console.log(nbc.predict("pet feeding dog walking with turtle"));
    console.log(nbc.predict("cat dog turtle animal vet"));
});

nbc.definePrepTasks([
    nlp.string.tokenize0,
    nlp.tokens.removeWords,  
    nlp.tokens.stem
]);