var Classifier = require('wink-naive-bayes-text-classifier');
var nbc = Classifier();
var nlp = require('wink-nlp-utils');
var fs = require('fs');
var stream = fs.createReadStream('Data/ks-projects-201801.csv');
var stream2 = fs.createReadStream('Data/ks-projects-201801 (With duration).csv');
var csv = require("fast-csv");
let HashMap = require('hashmap');

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
        sum += (data[i] - mean)*(data[i] - mean);
    }
    return Math.sqrt(sum/len(data));
};

var pdf = (target, mean, std) => {
    return (1/(std * Math.sqrt(2 * Math.PI))) * Math.exp(-(target - mean)*(target - mean)/(2*std*std));
};

nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 0.5 });
var goal_success = [];
var goal_failure = [];
var pledged_success = [];
var pledged_failure = [];
var backers_success = [];
var backers_failure = [];
var usd_pledged_success = [];
var usd_pledged_failure = [];
var usd_pledged_real_success = [];
var usd_pledged_real_failure = [];
var usd_goal_real_success = [];
var usd_goal_real_failure = [];

//stage1
// Reads the user input to get the optimal category
let dataSet = [];
csv.fromStream(stream, {headers : true}).on("data", function(data){
    const { name, main_category} = data;
    dataSet.push(data);
    nbc.learn( name, main_category );
    
    //The function will predict the optimal category.
    // Currently test data
}).on("end", function(){
    nbc.consolidate();
    
    const input = "i love painting pictures and drawings";
    const category = nbc.predict(input);
    let filtered = dataSet.filter((e) => {
        if(e.main_category === category){
           return true;
        }
    });

    let mapped = filtered.map((e) => {
        if(e.main_category === category){
            let {main_category, goal, backers, usd_pledged_real, name } = e;
            goal = Number(goal);
            backers = Number(backers);
            usd_pledged_real = Number(usd_pledged_real);
            return {main_category, goal, backers, usd_pledged_real, name };
        }
    });

    let names = new HashMap();
    let inputTokens = input.split(" ");
    let highestCOunt = 0;
    mapped.forEach( e => {
        let tokens = e.name.split(" ");
        let count = 0;
        tokens.forEach(e => {
            inputTokens.forEach( g => {
                if( g === e){
                    count++;
                }
            })
        })
        if(count > 0){
            if(names.get(count)){
                let arr = names.get(count);
                arr.push(e);
            }else{
                names.set(count, [e]);
            }
        }
      
    })

    console.log("HIGHEST COUNT", highestCOunt);
    let best = names.keys()[names.keys().length-1];
    console.log(names.get(best));
    const avgGoal = (mapped.reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue.goal;
    }, 0)) / mapped.length;
    const avgBackers = (mapped.reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue.backers;
    }, 0)) / mapped.length;
    const avgPledge = (mapped.reduce((accumulator, currentValue, currentIndex, array) => {
        return accumulator + currentValue.usd_pledged_real;
    }, 0)) / mapped.length;
    console.log('avg goal', Math.floor(avgGoal));
    console.log('avg backers', Math.floor(avgBackers));
    console.log('avg pledge', Math.floor(avgPledge));
    //console.log(keyArray);
   
    console.log("predicted category", category, 'dataset size', filtered.length, ' full size is', dataSet.length);
    
});


//stage2
// Implement Naive Bayes
// 
// csv.fromStream(stream2, {headers : true}).on("data", function(data){
//     const { name, main_category, goal, state, country} = data;
//     const {goal, state, pledged, } = data;
//     nbc.learn( name, main_category );
//     //successful state
//     if(state == "successful"){
//         goal_success.push(goal);
//     }
//     //failed state
//     else if(state == "failed"){
//         goal_failure.push(goal);
//     }

// }).on("end", function(){
//     nbc.consolidate();
//     console.log("done");
//     console.log(nbc.predict("pet feeding dog walking with human"));
//     console.log(nbc.predict("cat food fishing"));
//     console.log(nbc.predict("andriod computer"));
//     console.log(nbc.predict("draaw books testing studio"));
//     console.log(nbc.predict("music sound facter"));
//     console.log(nbc.predict("pet feeding dog walking with cat"));
//     console.log(nbc.predict("pet feeding dog walking with turtle"));
//     console.log(nbc.predict("cat dog turtle animal vet"));
// });