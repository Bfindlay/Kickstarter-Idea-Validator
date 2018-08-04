var Classifier = require('wink-naive-bayes-text-classifier');
var nbc = Classifier();
var nlp = require('wink-nlp-utils');
var fs = require('fs');
var stream = fs.createReadStream('Data/ks-projects-201801.csv');
var csv = require("fast-csv");
 
nbc.definePrepTasks([
    nlp.string.tokenize0,
    nlp.tokens.removeWords,  
    nlp.tokens.stem
]);

var meanCal = (data) => {
    var sum = 0;
    for(var i = 0; i = len(data); ++i){
        sum += data[i];
    }
    return sum/len(data);
};

var std_devCal = (data) => {
    var sum = 0;
    var mean = meanCal(data);
    for(var i = 0; i = len(data); ++i){
        sum += data[i] - mean;
    }
    return sum/len(data);
};

var pdf = () => {

};
nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 0.5 });
var goal_success = [];
var goal_failure = [];
csv.fromStream(stream, {headers : true}).on("data", function(data){
    const { name, main_category , goal, state, country} = data;
    nbc.learn( name, main_category );
    if(state == "successful"){
        goal_success.push(goal);
    }
    else if(state == "failed"){
        goal_failure.push(goal);
    }

}).on("end", function(){
    nbc.consolidate();
    console.log("done");
    console.log(nbc.predict("pet feeding dog walking with human"));
    console.log(nbc.predict("cat food fishing"));
    console.log(nbc.predict("andriod computer"));
    console.log(nbc.predict("draaw books testing studio"));
    console.log(nbc.predict("music sound facter"));
    console.log(nbc.predict("pet feeding dog walking with cat"));
    console.log(nbc.predict("pet feeding dog walking with turtle"));
    console.log(nbc.predict("cat dog turtle animal vet"));
});