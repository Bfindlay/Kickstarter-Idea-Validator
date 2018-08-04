
let Classifier = require('wink-naive-bayes-text-classifier');
let nlp = require('wink-nlp-utils');
let fs = require('fs');

let csv = require("fast-csv");
let HashMap = require('hashmap');
let nbc = new Classifier();

class AI {

    constructor(trainingFile){
        this.trainingFile = trainingFile;
        nbc.definePrepTasks([
            nlp.string.tokenize0,
            nlp.tokens.removeWords,  
            nlp.tokens.stem
        ]);
        nbc.defineConfig( { considerOnlyPresence: true, smoothingFactor: 0.5 });
        this.stream = fs.createReadStream(`Data/${trainingFile}`);
        this.dataSet = [];
        
    }

    initiate(){
        console.log("{{{{{{---- INITIATING TRAINING SEQUENCE ----}}}}}}}");
        csv.fromStream(this.stream, {headers : true}).on("data", data => {
            const { name, main_category} = data;
            this.dataSet.push(data);
            nbc.learn( name, main_category );
            
        
        }).on("end", function(){
            nbc.consolidate();
            console.log("{{{{{{---- TRAINING COMPLETE READY TO TAKE DATA ----}}}}}}}");
        });
    }

    predictClass(input){
        return new Promise((resolve, reject) => {

            const category = nbc.predict(input);
            let filtered = this.dataSet.filter((e) => {
                if(e.main_category === category){
                   return true;
                }
            });
        
            let mapped = filtered.map((e) => {
                if(e.main_category === category){
                    let {main_category, goal, backers, usd_pledged_real, name, state } = e;
                    goal = Number(goal);
                    backers = Number(backers);
                    usd_pledged_real = Number(usd_pledged_real);
                    return {main_category, goal, backers, usd_pledged_real, name, state };
                }
            });
        
            let names = new HashMap();
            let inputTokens = input.split(" ");
    
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
        
    
            let best = names.get(names.keys()[names.keys().length-1]);
        
            // Category Averages
            const avgGoal = (mapped.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.goal;
            }, 0)) / mapped.length;
            const avgBackers = (mapped.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.backers;
            }, 0)) / mapped.length;
            const avgPledge = (mapped.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.usd_pledged_real;
            }, 0)) / mapped.length;

            console.log(best);

            //Similar App Averages
            const similarGoalAvg = (best.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.goal;
            }, 0)) / best.length;
            const similarBackersAvg = (best.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.backers;
            }, 0)) / best.length;
            const similarPledgeAvg = (best.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.usd_pledged_real;
            }, 0)) / best.length;

            const successful = mapped.filter( e => e.state === 'successful').length;
            //console.log(keyArray);
           
            console.log("predicted category", category, 'dataset size', filtered.length, ' full size is', this.dataSet.length);

            let result = {
                category,
                successful,
                ratio: parseFloat((successful/mapped.length).toFixed(2)),
                similarGoalAvg,
                similarBackersAvg,
                similarPledgeAvg,
                categoryGoalAvg: Math.floor(avgGoal),
                categoryBackersAvg: Math.floor(avgBackers),
                categoryPledgeAvg: Math.floor(avgPledge),
            }

            resolve(result);
        })
    }
    
}

module.exports = AI;

