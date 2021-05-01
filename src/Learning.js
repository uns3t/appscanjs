const boa = require('@pipcook/boa');
const { len } = boa.builtins();
const ensemble = boa.import('sklearn.ensemble');



class Learning {
    constructor(){
        this.clf=ensemble.RandomForestClassifier(boa.kwargs({
            criterion:'gini',
            max_features:'sqrt',
            n_estimators:150
          }))
    }

    fit(X,y){
        this.clf.fit(X,y);
        return this;
    }

    predict(X,threshold){
        const probabilities = this.clf.predict_proba(X).max(boa.kwargs({
            axis:1,
          }))
        const prediction = this.clf.predict(X)
        for(let i=0;i<len(prediction);i++){
            if(probabilities[i]<threshold){
                prediction[i]=-1
            }
        }
        return prediction;
    }

}

module.exports = Learning