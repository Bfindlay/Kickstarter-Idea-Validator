
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
            const category = nbc.predict(input);
            let filtered = this.dataSet.filter((e) => {
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
           
            console.log("predicted category", category, 'dataset size', filtered.length, ' full size is', this.dataSet.length);
    }
    
}

module.exports = AI;

